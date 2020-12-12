import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { set } from "lodash";
import { GameContext } from "../index";

const Container = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  box-sizing: border-box;
`;

const Table = styled.table`
  width: 100%;
  td {
    vertical-align: top;
  }
`;
export default function Interface(props) {
  const handleDiscard = () => {
    props.game.dispatchEvent(new Event("CLICK_DISCARD"));
  };
  const game = useContext(GameContext);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [table, setTable] = useState("30bead1b-e8d2-4918-bab8-a584b515b4ba");
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Mase</th>
            <th>Player1</th>
            <th>Selected</th>
            <th>Player2</th>
            <th>Selected</th>
            <th>Pile1</th>
            <th>Pile2</th>
            <th>Table</th>
            <th>Actions</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {state.mase.map((card, i) => {
                return Card(i, card);
              })}
            </td>
            <td>
              {state.players[0].hand.map((card, i) => {
                return Card(i, card);
              })}
            </td>
            <td>
              {state.selectedCards &&
                state.selectedCards[0] &&
                state.selectedCards[0].map((card, i) => {
                  return Card(i, card);
                })}
            </td>
            <td>
              {state.players[1].hand.map((card, i) => {
                return Card(i, card);
              })}
            </td>
            <td>
              {state.selectedCards &&
                state.selectedCards[1] &&
                state.selectedCards[1].map((card, i) => {
                  return Card(i, card);
                })}
            </td>
            <td>
              {state.piles[0].map((card, i) => {
                return Card(i, card);
              })}
            </td>
            <td>
              {state.piles[1].map((card, i) => {
                return Card(i, card);
              })}
            </td>
            <td>
              {state.table.map((card, i) => {
                return Card(i, card);
              })}
            </td>
            <td>
              <p>
                <button
                  onClick={() => {
                    dispatch({ type: "CREATE_TABLE" });

                    dispatch({ type: "DEAL" });
                  }}
                >
                  create table
                </button>
                <br />
                <br />
                <input
                  type="text"
                  value={table}
                  onChange={(e) => {
                    setTable(e.target.value);
                  }}
                />
                <br />
                <button
                  onClick={() => {
                    game.joinTable(table);
                  }}
                >
                  join table
                </button>
              </p>
              <ActionButtonn
                onClick={() => {
                  if (!state.takenMase) {
                    dispatch({ type: "TAKE_MASE" });
                  } else {
                    alert("You already took a card");
                  }
                }}
              >
                take mase
              </ActionButtonn>
              <br />
              <ActionButtonn
                onClick={() => {
                  dispatch({ type: "DISCARD" });
                }}
              >
                discard
              </ActionButtonn>
              <br />
              <ActionButtonn
                onClick={() => {
                  dispatch({ type: "TAKE_TABLE" });
                }}
              >
                Take Table
              </ActionButtonn>

              <br />
              <ActionButtonn
                onClick={() => {
                  dispatch({ type: "PUT_DOWN" });
                }}
              >
                Put Down
              </ActionButtonn>
              <br />
              <button
                onClick={() => {
                  dispatch({ type: "SORT_HAND", payload: table });
                }}
              >
                sort hand
              </button>
            </td>
            <td>
              Table:{game.tableUUID}
              <br />
              Owner:{state.tableOwnerID}
              <br />
              Status:{game.currentPlayer === 0 ? "Local" : "Remote"}
              <br />
              Player:{game.currentPlayer}
              <br />
              Turn:{state.currentTurn}
              <br />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function Card(i, card) {
  const icons = { H: "♥", D: "♦", S: "♠", C: "♣", J: "JK" };
  const dispatch = useDispatch();
  return (
    <div
      key={i}
      style={{
        color: card.set === "H" || card.set === "D" ? "red" : "black",
        border:
          "1px solid " +
          (card.set === "H" || card.set === "D" ? "red" : "black"),
        textAlign: " center",
        padding: "10px",
        fontSize: "20px",
        maxWidth: "40px",
      }}
      onClick={() => {
        dispatch({ type: "CARD_CLICK", payload: card });
      }}
    >
      {icons[card.set]}
      {card.value}
    </div>
  );
}

function ActionButtonn(props) {
  const game = useContext(GameContext);
  const state = useSelector((state) => state);

  return (
    <button
      onClick={() => {
        if (game.tableUUID) {
          if (game.currentPlayer === state.currentTurn) {
            props.onClick();
          } else {
            alert("Is not your turn");
          }
        } else {
          alert("join or create a game");
        }
      }}
    >
      {props.children}
    </button>
  );
}

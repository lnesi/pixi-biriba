import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { set } from "lodash";
const Container = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  box-sizing: border-box;
`;

const Table = styled.table`
  td {
    vertical-align: top;
  }
`;
export default function Interface(props) {
  const handleDiscard = () => {
    props.game.dispatchEvent(new Event("CLICK_DISCARD"));
  };

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [table, setTable] = useState("05339b44-92dd-4e89-99c6-a28d993b281f");
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Mase</th>
            <th>Player1</th>
            <th>Player2</th>
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
              {state.players[0].map((card, i) => {
                return Card(i, card);
              })}
            </td>
            <td>
              {state.players[1].map((card, i) => {
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
              <button
                onClick={() => {
                  dispatch({ type: "CREATE_TABLE" });
                  dispatch({ type: "DEAL" });
                }}
              >
                create table
              </button>
              <br />
              <input
                type="text"
                value={table}
                onChange={(e) => {
                  setTable(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  dispatch({ type: "JOIN_TABLE", payload: table });
                }}
              >
                join table
              </button>
              <br />
              <button>take mase</button>
              <br />
              <button>discard</button>
              <br />
              <button>take table</button>

              <br />
              <button>put down </button>
              <br />
            </td>
            <td>
              User:{state.user}
              <br />
              Status:{state.currentPlayer === 0 ? "Local" : "Remote"}
              <br />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function Card(i, card) {
  const icons = { H: "♥", D: "♦", S: "♠", C: "♣", J: "JOKER" };
  return (
    <div
      key={i}
      style={{ color: card.set === "H" || card.set === "D" ? "red" : "black" }}
    >
      {i}-{icons[card.set]}
      {card.value}
    </div>
  );
}

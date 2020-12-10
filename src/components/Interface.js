import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
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
  const icons = { H: "♥", D: "♦", S: "♠", C: "♣" };
  const state = useSelector((state) => state);
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
                return (
                  <div key={i}>
                    {i}-{icons[card.set]}
                    {card.value}
                  </div>
                );
              })}
            </td>
            <td>
              {state.players[0].map((card, i) => {
                return (
                  <div key={i}>
                    {i}-{icons[card.set]}
                    {card.value}
                  </div>
                );
              })}
            </td>
            <td>
              {state.players[1].map((card, i) => {
                return (
                  <div key={i}>
                    {i}-{icons[card.set]}
                    {card.value}
                  </div>
                );
              })}
            </td>
            <td>
              {state.piles[0].map((card, i) => {
                return (
                  <div key={i}>
                    {i}-{icons[card.set]}
                    {card.value}
                  </div>
                );
              })}
            </td>
            <td>
              {state.piles[1].map((card, i) => {
                return (
                  <div key={i}>
                    {i}-{icons[card.set]}
                    {card.value}
                  </div>
                );
              })}
            </td>
            <td>
              {state.table.map((card, i) => {
                return (
                  <div key={i}>
                    {i}-{icons[card.set]}
                    {card.value}
                  </div>
                );
              })}
            </td>
            <td>
              <button>take mase</button>
              <br />
              <button>discard</button>
              <br />
              <button>take table</button>
              <br />
              <button>put down </button>
              <br />
            </td>
            <td>CurrentPlayer:{state.currentPlayer}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
position:relative;
width: 100vw;
display: flex;
justify-content: flex-end;
padding: 1rem;
box-sizing: border-box;
`;

export default function Interface(props) {
    const handleDiscard = () => {
        props.game.dispatchEvent(new Event("CLICK_DISCARD"));
        
    }
    return <div><Container><button onClick={handleDiscard}>Discard</button><button>New Down Pile</button></Container></div>
}


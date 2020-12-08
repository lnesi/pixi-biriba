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

export default function Interface() {
    return <div><Container><button>Discard</button><button>New Down Pile</button></Container></div>
}


import React from 'react';
import styled from 'styled-components';

const Welcome = (props) => {
    
    return(
        <main>
            <h1>Welcome</h1>
            <button onClick={props.handlePlay}>PLAY</button>
        </main>
    );
}
export default Welcome;
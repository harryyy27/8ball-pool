import React from 'react';
import {Title, StartGame} from './styled';

const Welcome = (props) => {
    
    return(
        <>
            <Title>8 Ball Pool!</Title>
            <StartGame onClick={props.handlePlay}>PLAY</StartGame>
        </>
    );
}
export default Welcome;
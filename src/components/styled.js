import React from 'react'
import styled from 'styled-components'


const Canvas = styled.canvas`
    background-color: black;
    display:block;
    margin:auto;

    `

const Cue = styled.img`
    width: 475px;
    position: absolute;
    top: ${props=> props.yPos}px
    left: ${props=> props.xPos-475}px
    
`

export { Canvas, Cue }
// transform: rotate(${props=> props.ang}deg);
//     transform-origin: ${props=> props.wxPos} ${props=> props.wyPos}
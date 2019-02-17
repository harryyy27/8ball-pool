import styled from 'styled-components'


const Canvas = styled.canvas`
    background-color: black;
    display:block;
    margin:auto;
    overflow:hidden;
    `

const Cue = styled.img`
    width: 475px;
    position: absolute;
    top: ${props=> props.yPos}px
    left: ${props=> props.xPos-475}px
    transform: rotate(${props=> props.ang*360/(2*Math.PI)}deg);
    transform-origin: ${props=> (props.rad+475)*100/475}% 50%;
    overflow: hidden;
`

const GameWrapper= styled.main`
    width: 800px;
    height: 500px;
    overflow: hidden;
    margin: auto;
`
export { Canvas, Cue, GameWrapper }

import styled from 'styled-components'

const Title = styled.h1`
    text-align: center;
    text-shadow: 1px 1px red;
    font-weight: 500px;
    
`
const StartGame = styled.button`
    background-color: red;
    width: 200px;
    height: 30px;
    font-size: 20px;
    display: block;
    margin: auto;
`
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
    transform: translate()
    
`
const PowerBar = styled.div`
    height: 200px;
    width: 50px;
    position: absolute;
    right:50px;
    top: 150px;
    background: linear-gradient(red,yellow);
    border: 1px solid white;
`
const PowerMeter = styled.span`
    width:100%;
    display: block;
    margin: auto;
    height: 0px;
    border:2px solid black;
    position:absolute;
    bottom: ${props=>props.meter}px;
`
const GameWrapper= styled.main`
    width: 800px;
    height: 100vh;
    overflow-y: hidden;
    margin: auto;
`
export { Canvas, Cue, PowerBar, PowerMeter, GameWrapper, Title, StartGame}

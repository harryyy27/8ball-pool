import React from 'react';
import styled from 'styled-components';
import Ball from './Ball'
import cue from '../img/cue.png'
import {Canvas, Cue} from './styled'


class Game extends React.Component {
    state={
        white: false,
        whitey: '',
        balls: [ ],
        xPos: '',
        yPos: '',
        ang: ''
        }
        
    componentDidMount = () => {
        const table = document.getElementById('table');
        const canvas = table.getContext('2d');
        this.loadTable(canvas);
    }
    rackUp =(ballWidth, canvas) => {
        const xDev = ballWidth*Math.cos(Math.PI/6)
        const yDev = ballWidth*1/2;
        const ballArray = [];
        ballArray.push(new Ball('red',550-2*xDev,250, canvas));
        ballArray.push(new Ball('yellow', 550-xDev, 250+yDev,canvas));
        ballArray.push(new Ball('red', 550-xDev, 250-yDev,canvas));
        ballArray.push(new Ball('red', 550, 250+2*yDev,canvas));
        ballArray.push(new Ball('black', 550, 250, canvas));
        ballArray.push(new Ball('yellow',550, 250-2*yDev, canvas));
        ballArray.push(new Ball('yellow', 550+xDev, 250+3*yDev, canvas));
        ballArray.push(new Ball('red', 550+xDev, 250+yDev,canvas));
        ballArray.push(new Ball('yellow', 550+xDev, 250-yDev, canvas));
        ballArray.push(new Ball('red', 550+xDev, 250-3*yDev, canvas));
        ballArray.push(new Ball('yellow', 550+2*xDev,250+4*yDev, canvas));
        ballArray.push(new Ball('red', 550+2*xDev,250+2*yDev, canvas));
        ballArray.push(new Ball('yellow', 550+2*xDev, 250, canvas))
        ballArray.push(new Ball('red',550+2*xDev, 250-2*yDev, canvas));
        ballArray.push(new Ball('yellow', 550+2*xDev,250-4*yDev, canvas));
        this.setState((prevState)=>{
            return{balls: prevState.balls.concat(ballArray)}
        })
        for(let i=0; i<ballArray.length; i++){
        ballArray[i].update();
        }
    }
    placeWhite = (event) => {
        const table = document.getElementById('table');
        const canvas = table.getContext('2d');
        const xPos = event.clientX-(window.innerWidth-800)/2;
        console.log(this.state.white);
        if(220-xPos<=50&&220-xPos>=0&&250-event.clientY<=50&&250-event.clientY>=-50){
            console.log(event.clientY)
            
            const whitey = new Ball('white',xPos,event.clientY,canvas);
            console.log(whitey.y)
            whitey.update();
            this.setState((prevState)=>{
               return {white: !prevState.white} 
            })
            this.setState((prevState)=>{
                return {balls: prevState.balls.concat([whitey])}
            })
            this.setState({whitey: whitey});
            // let poolC = new Image();
            // poolC.src={cue}
            // poolC.addEventListener("load", ()=>{
            //     console.log('yes');
            //     canvas.drawImage(poolC,whitey.x,whitey.y, 400,250);
                
            // },false)
            
            // console.log(cue);
            }
            else{
                canvas.fillText('PLACE WHITE IN D', 400,250)
            }
    }
    handleCue = (event) => {
        
        const table = document.getElementById('table');
        const canvas = table.getContext('2d');
        const xPos = event.clientX-(window.innerWidth-800)/2;
        const yPos = event.clientY;
        
        const angle = Math.atan((this.state.whitey.y-yPos)/(this.state.whitey.x-xPos));
        this.setState({xPos: xPos, yPos: yPos, ang: angle})

        
    }
    loadTable = (canvas) => {
        const ballWidth = (50/3+25/24);
        //Width of coloured balls
        this.drawTable(ballWidth, canvas);
        this.rackUp(ballWidth, canvas);
    }

    drawTable = (ballWidth,canvas) => {
        //Distance between cushions on corner pockets
        const pWidth = ballWidth*1.6;
        //radius of pocket
        const pRadius= pWidth+Math.cos(Math.PI/4)
        //cushion width
        const cWidth = (50-pRadius)/2;
        //draw outline of pool table
        
        canvas.beginPath();
        canvas.moveTo(pWidth+50,50);
        canvas.arc(750-pWidth, 50+pWidth,pWidth,3*Math.PI/2, 2*Math.PI);
        canvas.lineTo(750, 450-pWidth);
        canvas.arc(750-pWidth, 450-pWidth,pWidth, 0,Math.PI/2);
        canvas.lineTo(50+pWidth, 450);
        canvas.arc(50+pWidth, 450-pWidth, pWidth, Math.PI/2, Math.PI);
        canvas.lineTo(50, 50+pWidth);
        canvas.arc(50+pWidth, 50+pWidth, pWidth, Math.PI,3*Math.PI/2);
        canvas.closePath();
        canvas.fillStyle="silver"
        canvas.fill();
        //pool table playable surface
        canvas.fillStyle="#3ab503";
        canvas.fillRect(100-cWidth,100-cWidth,600+2*cWidth,300+2*cWidth);
        
        // draw cushions
        //left
        canvas.beginPath();
        canvas.moveTo(100-cWidth, 100-cWidth+pWidth/2);
        canvas.lineTo(100-cWidth*(1-Math.cos(Math.PI/4)), 100-cWidth*(1-Math.cos(Math.PI/4))+pWidth/2);
        canvas.arc(100-cWidth,100-cWidth*(1-2*Math.cos(Math.PI/4))+pWidth/2, cWidth,-Math.PI/4,0);
        canvas.lineTo(100, 400+cWidth*(1-2*Math.cos(Math.PI/4))-pWidth/2);
        canvas.arc(100-cWidth, 400+cWidth*(1-2*Math.cos(Math.PI/4))-pWidth/2, cWidth, 0, Math.PI/4);
        canvas.lineTo(100-cWidth, 400+cWidth-pWidth/2);
        canvas.lineTo(100-cWidth, 100-cWidth+pWidth/2);
        canvas.fillStyle="red"
        canvas.fill();
        //topleft
        canvas.moveTo(100-cWidth+pWidth/2, 100-cWidth);
        canvas.lineTo(400-pWidth/2, 100-cWidth);
        canvas.lineTo(400-pWidth/2-cWidth*Math.cos(Math.PI/4),100+cWidth*(Math.cos(Math.PI/4)-1));
        canvas.arc(400-pWidth/2-2*cWidth*Math.cos(Math.PI/4), 100-cWidth, cWidth, Math.PI/4, Math.PI/2);
        canvas.lineTo(100-cWidth+pWidth/2+2*cWidth*Math.cos(Math.PI/4),100);
        canvas.arc(100-cWidth+pWidth/2+2*cWidth*Math.cos(Math.PI/4),100-cWidth,cWidth,Math.PI/2,3*Math.PI/4);
        canvas.closePath();
        canvas.fillStyle="red";
        canvas.fill();
        //topright
        canvas.moveTo(400+pWidth/2,100-cWidth);
        canvas.lineTo(700+cWidth-pWidth/2,100-cWidth);
        canvas.lineTo(700-pWidth/2+cWidth*(1-Math.cos(Math.PI/4)),100+cWidth*(Math.cos(Math.PI/4)-1))
        canvas.arc(700-pWidth/2+cWidth*(1-2*Math.cos(Math.PI/4)), 100-cWidth,cWidth,Math.PI/4,Math.PI/2);
        canvas.lineTo(400+pWidth/2+2*cWidth*Math.cos(Math.PI/4),100);
        canvas.arc(400+pWidth/2+2*cWidth*Math.cos(Math.PI/4),100-cWidth,cWidth,Math.PI/2,3*Math.PI/4);
        canvas.closePath();
        canvas.fillStyle="red";
        canvas.fill();
        //bottomleft
        canvas.moveTo(100-cWidth+pWidth/2, 400+cWidth);
        canvas.lineTo(400-pWidth/2, 400+cWidth);
        canvas.lineTo(400-pWidth/2-cWidth*Math.cos(Math.PI/4),400-cWidth*(Math.cos(Math.PI/4)-1));
        canvas.arc(400-pWidth/2-2*cWidth*Math.cos(Math.PI/4), 400+cWidth, cWidth, -Math.PI/4, -Math.PI/2,true);
        canvas.lineTo(100-cWidth+pWidth/2+2*cWidth*Math.cos(Math.PI/4),400);
        canvas.arc(100-cWidth+pWidth/2+2*cWidth*Math.cos(Math.PI/4),400+cWidth,cWidth,-Math.PI/2,-3*Math.PI/4,true);
        canvas.closePath();
        canvas.fillStyle="red";
        canvas.fill();
        // bottomright
        canvas.moveTo(400+pWidth/2,400+cWidth);
        canvas.lineTo(700+cWidth-pWidth/2,400+cWidth);
        canvas.lineTo(700-pWidth/2+cWidth*(1-Math.cos(Math.PI/4)),400-cWidth*(Math.cos(Math.PI/4)-1))
        canvas.arc(700-pWidth/2+cWidth*(1-2*Math.cos(Math.PI/4)), 400+cWidth,cWidth,-Math.PI/4,-Math.PI/2,true);
        canvas.lineTo(400+pWidth/2+2*cWidth*Math.cos(Math.PI/4),400);
        canvas.arc(400+pWidth/2+2*cWidth*Math.cos(Math.PI/4),400+cWidth,cWidth,-Math.PI/2,-3*Math.PI/4,true);
        canvas.closePath();
        canvas.fillStyle="red";
        canvas.fill();
        //right
        canvas.moveTo(700+cWidth, 100-cWidth+pWidth/2);
        canvas.lineTo(700+cWidth*(1-Math.cos(Math.PI/4)), 100-cWidth*(1-Math.cos(Math.PI/4))+pWidth/2);
        canvas.arc(700+cWidth,100-cWidth*(1-2*Math.cos(Math.PI/4))+pWidth/2, cWidth,-3*Math.PI/4,-Math.PI,true);
        canvas.lineTo(700, 400+cWidth*(1-2*Math.cos(Math.PI/4))-pWidth/2);
        canvas.arc(700+cWidth, 400+cWidth*(1-2*Math.cos(Math.PI/4))-pWidth/2, cWidth, -Math.PI, -5*Math.PI/4,true);
        canvas.lineTo(700+cWidth, 400+cWidth-pWidth/2);
        canvas.lineTo(700+cWidth, 100-cWidth+pWidth/2);
        canvas.fillStyle="red"
        canvas.fill();
        //lines
        canvas.beginPath();
        canvas.moveTo(220, 100);
        canvas.lineTo(220, 400);
        canvas.arc(220, 250, 50, Math.PI/2,3*Math.PI/2);
        canvas.strokeStyle="white"
        canvas.stroke();
        //black spot
        canvas.beginPath();
        canvas.arc(550,250,2,0,Math.PI*2)
        canvas.fillStyle="black"
        canvas.fill();
        //draw pockets
        canvas.beginPath();
        canvas.arc(100-cWidth, 100-cWidth, pWidth/2, 0,2*Math.PI);
        canvas.arc(400, 100-cWidth, pWidth/2,0,Math.PI*2 );
        canvas.arc(700+cWidth, 100-cWidth, pWidth/2,0,2*Math.PI);
        canvas.closePath();
        canvas.fillStyle="black";
        canvas.fill();
        canvas.beginPath();
        canvas.arc(700+cWidth, 400+cWidth, pWidth/2,0,2*Math.PI);
        canvas.arc(400, 400+cWidth, pWidth/2,0,Math.PI*2 )
        canvas.arc(100-cWidth, 400+cWidth, pWidth/2, 0,2*Math.PI);
        canvas.closePath();
        canvas.fillStyle="black";
        canvas.fill();
    }
    testPos = () => {
        console.log(Cue.innerHeight)
        console.log(Cue.innerWidth);
    }
    render() {
        
        return(
            <main>
                <Canvas id="table"
                        width="800" 
                        height="500" 
                        onClick={this.state.white===false ? this.placeWhite : this.testPos}
                        onMouseMove={this.state.white===true ? this.handleCue: null}
                        >
                        <h1>WHOOPS! YOUR PROVIDER CAN'T HACK IT! GET ON CHROME WITH THE REST OF HUMANITY</h1>
                </Canvas>
                <Cue src={this.state.white===true ? cue : null}
                     xPos={(window.innerWidth-800)/2+this.state.whitey.x-this.state.whitey.radius}
                     yPos={this.state.whitey.y-this.state.whitey.radius-5}

                    //  ang={this.state.ang}
                    //  wxPos={this.state.whitey.x}
                    //  wyPos={this.state.whitey.y}
                     />
            </main>
        )
    }
}
export default Game;

//pool table size = 7ft x 4ft**
//playing size 6ft x 4ft**
//cushion length =
//white 2in
//colour  2 1/8in**
//7/5ft position of D
//D 1/3W diameter
//Black spot 1/2 W
//Black spot 7/3 L
//Pocket hole width 1.6*coloured ball
//Pocket hole diameter = Pocket-hole-width*cos45*2

//Pool table drawn with canvas
//

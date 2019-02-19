import React from 'react';
import Ball from './Ball'
import cue from '../img/cue.png'
import {Canvas, Cue, GameWrapper, PowerBar,PowerMeter} from './styled'


class Game extends React.Component {
    constructor(props){
        super(props)
        this.state={
            white: false,
            whitey: '',
            cue: false,
            aim: false,
            meter: 100,
            shoot: false,
            aimX: 0,
            aimY: 0,
            balls: [ ],
            xPos: '',
            yPos: '',
            ang: ''
        }
        this.table= React.createRef()
            }
    
    componentDidMount = () => {
       
        const canvas = this.table.current.getContext('2d');
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
    loadTable = (canvas) => {
        const ballWidth = (50/3+25/24);
        //Width of coloured balls
        this.drawTable(ballWidth, canvas);
        this.rackUp(ballWidth, canvas);
    }
    placeWhite = (event) => {
        const canvas = this.table.current.getContext('2d');
        const xPos = event.clientX-(window.innerWidth-800)/2;
        if(220-xPos<=50&&220-xPos>=0&&250-event.clientY<=50&&250-event.clientY>=-50){
            
            const whitey = new Ball('white',xPos,event.clientY,canvas);
            console.log(event.clientY);
            whitey.update();
            this.setState((prevState)=>{
               return {white: !prevState.white} 
            })
            this.setState((prevState)=>{
                return {cue: !prevState.cue} 
             })
            this.setState((prevState)=>{
                return {balls: prevState.balls.concat([whitey])}
            })
            this.setState({whitey: whitey});
            }
            else{
                canvas.fillText('PLACE WHITE IN D', 400,250)
            }
    }
    handleCue = (event) => {
        const xPos = event.clientX-(window.innerWidth-800)/2;
        const yPos = event.clientY;

        const x = this.state.whitey.x-xPos;
        const y = this.state.whitey.y-yPos
        this.setState({xPos: xPos, yPos: yPos, ang: this.polarCoordinates(x,y)})
    }
    polarCoordinates=(x,y)=>{
        let angle =0;
        if(x===0 && y<0){
            angle =Math.PI/2
        }
        else if(x===0 && y>0){
            angle = 3*Math.PI/2
        }
        else if(x>=0 && y>=0){
            angle = Math.PI + Math.atan(y/x);
        }
        else if(x<=0 && y>0){
            angle = Math.atan(y/x)
        }
        else if(x<=0 && y<=0){
            angle = Math.atan(y/x)
        }
        else if (x>=0 && y<0){
            angle = Math.PI +Math.atan(y/x)
        }
        return angle;
    }
    toggleAim = () => {
        if(this.state.aim){
            this.setState({aimX: 10*Math.cos(this.state.ang),aimY: 10*Math.sin(this.state.ang)});
        }
        else{
            this.setState({aimX: -100*Math.cos(this.state.ang),aimY: -100*Math.sin(this.state.ang)});
        }
        this.setState((prevState)=>{
            return{aim: !prevState.aim}
        })
    }
    powerMeter=()=>{
        const startCount = Date.now();
        this.timer = setInterval(()=>{
            this.setState(()=>{
                return({meter:100+100*Math.sin((Date.now()-startCount)/100)})
            })
        },1)
    }
    stopMeter=()=>{
        clearInterval(this.timer);
    }
    aimWrap=()=>{
       this.toggleAim();
       this.powerMeter(); 
    }
    shoot = () => {
        console.log('here')
        this.setState((prevState)=>{
            return {cue: !prevState.cue}
        })
        this.setState((prevState)=>{
            return {shoot: !prevState.shoot}
        })

    }
    shootWrap = () => {
        this.stopMeter();
        this.toggleAim();
        setTimeout(()=>{
            this.shoot();
        },100)
        
    }
    testPos = () => {
    }
    render() {
        
        return(
            <GameWrapper>
                <Canvas id="table"
                        ref={this.table}
                        width="800" 
                        height="500" 
                        onClick={this.state.white===false ? this.placeWhite : null}
                        onMouseDown={this.state.white===true? this.aimWrap : null}
                        onMouseUp={this.state.aim===true? this.shootWrap: null}
                        onMouseMove={this.state.white===true
                                    &&this.state.aim===false
                                    &&this.state.shoot===false
                                    ? this.handleCue: null}
                        >
                        <h1>WHOOPS! YOUR PROVIDER CAN'T HACK IT!</h1>
                </Canvas>
                {this.state.aim===true ?
                    <PowerBar >
                        <PowerMeter meter={this.state.meter}/>
                    </PowerBar>: null
                }
                
                <Cue src={this.state.cue===true ? cue : null}
                     xPos={(window.innerWidth-800)/2+this.state.whitey.x+this.state.aimX-this.state.whitey.radius}
                     yPos={this.state.whitey.y+this.state.aimY-475*5/389}
                     ang={this.state.ang}
                     rad={this.state.whitey.radius}
                     />
                     
            </GameWrapper>
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

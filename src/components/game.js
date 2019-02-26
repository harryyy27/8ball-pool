import React from 'react';
import Ball from './Ball'
import cue from '../img/cue.png'
import {polarCoordinates} from './maths'
import {Cush,pWidth,pRadius,cWidth,ballWidth}from './cushions'
import {Ballpit, Table, Cue, GameWrapper, PowerBar,PowerMeter} from './styled'


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
        this.ballpit= React.createRef()
            }
    
    componentDidMount = () => {
       
        const canvas = document.getElementById('table').getContext('2d');
        this.loadTable(canvas);
    }
    rackUp =() => {
        const canvas = this.ballpit.current.getContext('2d');
        console.log(this.state.balls);
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
    drawTable = (canvas) => {
        
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
        const L = Cush.L;
        canvas.beginPath();
        canvas.moveTo(L.TLx, L.TLy);
        canvas.lineTo(L.TMx, L.TMy);
        canvas.arc(L.TArcx,L.TArcy, cWidth,-Math.PI/4,0);
        canvas.lineTo(100, L.BRx);
        canvas.arc(L.BArcx, L.BArcy, cWidth, 0, Math.PI/4);
        canvas.lineTo(L.BLx, L.BLy);
        canvas.closePath();
        canvas.fillStyle="red"
        canvas.fill();
        //topleft
        const TL = Cush.TL;
        canvas.beginPath();
        canvas.moveTo(TL.TLx, TL.TLy);
        canvas.lineTo(TL.TRx, TL.TRy);
        canvas.lineTo(TL.MRx,TL.MRy);
        canvas.arc(TL.RArcx, TL.RArcy, cWidth, Math.PI/4, Math.PI/2);
        canvas.lineTo(TL.BLx,100);
        canvas.arc(TL.LArcx,TL.LArcy,cWidth,Math.PI/2,3*Math.PI/4);
        canvas.closePath();
        canvas.fillStyle="red";
        canvas.fill();
        //topright
        const TR = Cush.TR;
        canvas.beginPath();
        canvas.moveTo(TR.TLx,TR.TLy);
        canvas.lineTo(TR.TRx,TR.TRy);
        canvas.lineTo(TR.MRx,TR.MRy)
        canvas.arc(TR.RArcx, TR.RArcy,cWidth,Math.PI/4,Math.PI/2);
        canvas.lineTo(TR.BLx,100);
        canvas.arc(TR.LArcx,TR.LArcy,cWidth,Math.PI/2,3*Math.PI/4);
        canvas.closePath();
        canvas.fillStyle="red";
        canvas.fill();
        //bottomleft
        const BL = Cush.BL
        canvas.moveTo(BL.BLx, BL.BLy);
        canvas.lineTo(BL.BRx, BL.BRy);
        canvas.lineTo(BL.MRx, BL.MRy);
        canvas.arc(BL.RArcx,BL.RArcy, cWidth, -Math.PI/4, -Math.PI/2,true);
        canvas.lineTo(BL.TLx,400);
        canvas.arc(BL.LArcx,BL.LArcy,cWidth,-Math.PI/2,-3*Math.PI/4,true);
        canvas.closePath();
        canvas.fillStyle="red";
        canvas.fill();
        // bottomright
        const BR = Cush.BR;
        canvas.moveTo(BR.BLx,BR.BLy);
        canvas.lineTo(BR.BRx,BR.BRy);
        canvas.lineTo(BR.MRx,BR.MRy)
        canvas.arc(BR.RArcx, BR.RArcy,cWidth,-Math.PI/4,-Math.PI/2,true);
        canvas.lineTo(BR.TLx,400);
        canvas.arc(BR.LArcx,BR.LArcy,cWidth,-Math.PI/2,-3*Math.PI/4,true);
        canvas.closePath();
        canvas.fillStyle="red";
        canvas.fill();
        //right
        const R = Cush.R;
        canvas.moveTo(R.TRx, R.TRy);
        canvas.lineTo(R.TMx, R.TMy);
        canvas.arc(R.TArcx,R.TArcy, cWidth,-3*Math.PI/4,-Math.PI,true);
        canvas.lineTo(700, R.BLx);
        canvas.arc(R.BArcx, R.BArcy, cWidth, -Math.PI, -5*Math.PI/4,true);
        canvas.lineTo(R.BRx, R.BRy);
        canvas.closePath();
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
        
        this.drawTable(canvas);
        this.rackUp(canvas);
    }
    placeWhite = (event) => {
        const canvas = this.ballpit.current.getContext('2d');
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
        this.setState({aimX:0, aimY:0})
        const xPos = event.clientX-(window.innerWidth-800)/2;
        const yPos = event.clientY;
        const x = this.state.whitey.x-xPos;
        const y = this.state.whitey.y-yPos
        this.setState({xPos: xPos, yPos: yPos, ang: polarCoordinates(x,y)})
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
        let length = this.state.balls.length;
        this.state.balls[length-1].dx=this.state.meter*Math.cos(this.state.ang)/4;
        this.state.balls[length-1].dy=this.state.meter*Math.sin(this.state.ang)/4;
        this.animate();
        
        
        
        
        

    }
    animate=()=>{
        
        window.requestAnimationFrame(this.animate)
        const ballpit = this.ballpit.current.getContext('2d');
        ballpit.clearRect(0,0,800,500)
        // this.ballpit.getContext('2d').requestAnimationFrame(animate);
        console.log(this.state.balls);
        let ballArray = [...this.state.balls];
        console.log(ballArray);
        for(let i=0; i<this.state.balls.length; i++){
            this.state.balls[i].update(this.state.balls);
        }
        if(this.state.balls.every(el=> el.dx===0 && el.dy===0)){
            this.setState({whitey: this.state.balls[this.state.balls.length-1]})
            window.cancelAnimationFrame(this.animate)
        }

    }
    shootWrap = () => {
        this.stopMeter();
        this.toggleAim();
        setTimeout(()=>{
            this.shoot();
        },(1000/this.state.meter))
        
    }
    testPos = () => {
    }
    render() {
        
        return(
            <GameWrapper>
                <Table id="table"
                        
                        width="800" 
                        height="500" 
                        
                        >
                        <h1>WHOOPS! YOUR PROVIDER CAN'T HACK IT</h1>
                </Table>
                <Ballpit id="ballpit"
                        ref={this.ballpit}
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
                        <h1>DOUBLE WHOOPS!</h1>
                </Ballpit>
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
                     meter={this.state.meter}
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

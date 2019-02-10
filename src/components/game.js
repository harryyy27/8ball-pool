import React from 'react';
import styled from 'styled-components';

class Game extends React.Component {
    state={

    }
    componentDidMount = () => {
        this.loadTable();
    }
    loadTable = () => {
        const table = document.getElementById('table');
        const canvas = table.getContext('2d');
        //Width of coloured balls
        const ballWidth = (50/3+25/24);
        //Distance between cushions on corner pockets
        const pWidth = ballWidth*1.6;
        //radius of pocket
        const pRadius= pWidth+Math.cos(Math.PI/4)
        //cushion width
        const cWidth = (50-pRadius)/2;
        //draw outline of pool table
        console.log(canvas);
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
        

    
        


        
        
        canvas.strokeStyle="black"
        canvas.stroke();
        // canvas.fillStyle="red";
        // canvas.fill();

        
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
    render() {
        const Canvas = styled.canvas`
        background-color: black;
        display:block;
        margin:auto;
    `
        return(
            <main>
                <Canvas id="table" width="800" height="500"><h1>WHOOPS! YOUR PROVIDER CAN'T HACK IT! GET ON CHROME WITH THE REST OF HUMANITY</h1></Canvas>
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
import {polarCoordinates, resolveCushions, distance,posIntersect,negIntersect,rotVelocity,ballCollision} from './maths'
import {Cush,pWidth,pRadius,cWidth,ballWidth} from './cushions';

class Ball {
    constructor(color,x,y,canvas){
        this.color=color;
        if(this.color==='white'){
            this.radius= 100/12
        }
        else{
            this.radius= 100/12+100/(12*16);
        }
        this.x=x;
        this.y=y;
        this.canvas=canvas;
        this.dy=0;
        this.dx=0;
        this.ddy=0.985;
        this.ddx=0.985;
        this.mass=1;
        this.potted = false;
        this.draw= () => {
            this.canvas.beginPath();
            this.canvas.arc(this.x,this.y,this.radius,0,2*Math.PI)
            this.canvas.fillStyle=this.color;
            this.canvas.fill();
            
        
    }
        this.update= (balls) => {
            //Distance between cushions on corner pockets
            
        const pWidth = this.radius*1.6;
        //radius of pocket
        const pRadius= pWidth+Math.cos(Math.PI/4);
        //cushion width
        const cWidth = (50-pRadius)/2;
        //draw outline of pool table
        function ballCollision(particle, otherParticle) {
            
        
            // Prevent accidental overlap of particles
            
        }
            if(this.potted===false){
                // collision detection left and right cushions
                
                let fPosX =this.x+this.dx;
                let fPosY = this.y+this.dy;
                if(balls !== undefined){
                for(let i = 0; i<balls.length; i++){
                    if(balls[i].potted===false){
                    if(distance(this.x,this.y,balls[i].x,balls[i].y)!==0){
                            if(distance(this.x,this.y,balls[i].x,balls[i].y)<balls[i].radius+this.radius){
                                const xVelocityDiff = this.dx - balls[i].dx;
                                const yVelocityDiff = this.dy - balls[i].dy;
                            
                                const xDist = balls[i].x - this.x;
                                const yDist = balls[i].y - this.y;
                                if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        
                                    // Grab angle between the two colliding particles
                                    const angle = -Math.atan2(balls[i].y - this.y, balls[i].x - this.x);
                            
                                    // Store mass in var for better readability in collision equation
                                    const m1 = this.mass;
                                    const m2 = balls[i].mass;
                            
                                    // Velocity before equation
                                    
                                    const u1 = rotVelocity(this.dx, this.dy, angle);
                                    
                                    const u2 = rotVelocity(balls[i].dx, balls[i].dy, angle);
                                   
                            
                                    // Velocity after 1d collision equation
                                    const v1 = { x: u1.u * (m1 - m2) / (m1 + m2) + u2.u * 2 * m2 / (m1 + m2), y: u1.v };
                                    const v2 = { x: u2.u * (m1 - m2) / (m1 + m2) + u1.u * 2 * m2 / (m1 + m2), y: u2.v };
                            
                                    // Final velocity after rotating axis back to original location
                                    const vFinal1 = rotVelocity(v1.x, v1.y, -angle);
                                    const vFinal2 = rotVelocity(v2.x, v2.y, -angle);
                            
                                    // Swap particle velocities for realistic bounce effect
                                    this.dx = vFinal1.u;
                                    this.dy = vFinal1.v;
                            
                                    balls[i].dx = vFinal2.u;
                                    balls[i].dy = vFinal2.v;
                                }
                            }
                        }
                        
                        }
                    }
                }
                
                
                const C = Cush;
                if(fPosX-this.radius<100 || fPosX+this.radius>700){
                    if(fPosY<C.R.BLy && fPosY>C.R.TLy){
                        this.dx = -this.dx;
                    }
                    //curved cushions
                    else if(distance(fPosX,fPosY,C.L.TArcx,C.L.TArcy)<this.radius+cWidth){
                        const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.L.TArcx-this.x,C.L.TArcy-this.y));
                        this.dx=newVel.x;
                        this.dy=newVel.y;
                    }
                    else if(distance(fPosX,fPosY,C.L.BArcx, C.L.BArcy)<this.radius+cWidth){
                        const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.L.BArcx-this.x,C.L.BArcy-this.y));
                        this.dx=newVel.u;
                        this.dy=newVel.v;
                    }
                    else if(distance(fPosX,fPosY,C.R.TArcx,C.R.TArcy)<this.radius+cWidth){
                        const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.R.TArcx-this.x,C.R.TArcy-this.y));
                        this.dx=newVel.u;
                        this.dy=newVel.v;
                    }
                    else if(distance(fPosX,fPosY,C.R.BArcx, C.R.BArcy)<this.radius+cWidth){
                        const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.R.BArcx-this.x,C.R.BArcy-this.y));
                        this.dx=newVel.u;
                        this.dy=newVel.v;
                    }
                        //return new ball direction
                        //topleft
                    else if(posIntersect(fPosX,fPosY,C.L.TLx,C.L.TLy).x<C.L.TMx
                            &&posIntersect(fPosX,fPosY,C.L.TLx,C.L.TLy).x>C.L.TLx) {
                                if(distance(fPosX,fPosY,posIntersect(fPosX,fPosY,C.L.TLx,C.L.TLy).x,posIntersect(fPosX,fPosY,C.L.TLx,C.L.TLy).y)<this.radius){
                                    const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(posIntersect(fPosX,fPosY,C.L.TLx,C.L.TLy).x-this.x,posIntersect(fPosX,fPosY,C.L.TLx,C.L.TLy).y-this.y));
                                    this.dx=newVel.u;
                                    this.dy=newVel.v;
                                }
                    }
                    //bottomright
                    else if(posIntersect(fPosX,fPosY,C.R.BRx, C.R.BRy).x<C.R.BRx
                            &&posIntersect(fPosX,fPosY,C.R.BRx, C.R.BRy).x>C.R.BMx) {
                                if(distance(fPosX,fPosY,posIntersect(fPosX,fPosY,C.R.BRx, C.R.BRy).x,posIntersect(fPosX,fPosY,C.R.BRx, C.R.BRy).y)<this.radius){
                                    const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(posIntersect(fPosX,fPosY,C.R.BRx,C.R.BRy).x-this.x,posIntersect(fPosX,fPosY,C.R.BRx,C.R.BRy).y-this.y));
                                    this.dx=newVel.u;
                                    this.dy=newVel.v;
                                }
                    }
                    //topright
                    else if(negIntersect(fPosX,fPosY,C.R.TRx, C.R.TRy).x<C.R.TRx
                            &&negIntersect(fPosX,fPosY,C.R.TRx, C.R.TRy).x>C.R.TMx) {
                                if(distance(fPosX,fPosY,negIntersect(fPosX,fPosY,C.R.TRx, C.R.TRy).x,negIntersect(fPosX,fPosY,C.R.TRx, C.R.TRy).y)<this.radius){
                                    const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(negIntersect(fPosX,fPosY,C.R.TRx,C.R.TRy).x-this.x,negIntersect(fPosX,fPosY,C.R.TRx,C.R.TRy).y-this.y));
                                    this.dx=newVel.u;
                                    this.dy=newVel.v;
                                }
                    }
                    // bottomleft
                    else if(negIntersect(fPosX,fPosY,C.L.BLx, C.L.BLy).x>C.L.BLx
                            &&negIntersect(fPosX,fPosY,C.L.BLx, C.L.BLy).x<C.L.BMx) {
                                if(distance(fPosX,fPosY,negIntersect(fPosX,fPosY,C.L.BLx, C.L.BLy).x,negIntersect(fPosX,fPosY,C.L.BLx, C.L.BLy).y)<this.radius){
                                    const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(negIntersect(fPosX,fPosY,C.L.BLx,C.L.BLy).x-this.x,negIntersect(fPosX,fPosY,C.L.BLx,C.L.BLy).y-this.y));
                                    this.dx=newVel.u;
                                    this.dy=newVel.v;
                                }
                            }
                    //pocket surface collision
                    // else if {
                        
                    // }
                    //sound effect
                }
                //collision detection
                
                if(fPosY-this.radius<100 || fPosY+this.radius>400){
                    if(fPosX>C.BL.TLx && fPosX<C.BR.TRx){
                        if(fPosX<=C.BL.TRx|| fPosX>=C.BR.TLx){
                            this.dy = -this.dy;
                        }
                        //central cushions curved
                        else if(distance(fPosX,fPosY,C.BL.RArcx,C.BL.RArcy)<this.radius+cWidth){
                            const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.BL.RArcx-this.x,C.BL.RArcy-this.y));
                            this.dx=newVel.x;
                            this.dy=newVel.y
                        }
                        else if(distance(fPosX,fPosY,C.TL.RArcx,C.TL.RArcy)<this.radius+cWidth){
                            const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.TL.RArcx-this.x,C.TL.RArcy-this.y));
                            this.dx=newVel.x;
                            this.dy=newVel.y
                        }
                        else if(distance(fPosX,fPosY,C.TR.LArcx,C.TR.LArcy)<this.radius+cWidth){
                            const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.TR.LArcx-this.x,C.TR.LArcy-this.y));
                            this.dx=newVel.x;
                            this.dy=newVel.y
                        }
                        else if(distance(fPosX,fPosY,C.BR.LArcx,C.BR.LArcy)<this.radius+cWidth){
                            const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.BR.LArcx-this.x,C.BR.LArcy-this.y));
                            this.dx=newVel.x;
                            this.dy=newVel.y
                        }
                        //central flat cushions
                        else if(posIntersect(fPosX,fPosY,C.BL.BRx,C.BL.BRy).x>C.BL.MRx
                        &&posIntersect(fPosX,fPosY,C.BL.BRx,C.BL.BRy).x<=C.BL.BRx) {
                            if(distance(fPosX,fPosY,posIntersect(fPosX,fPosY,C.BL.BRx,C.BL.BRy).x,posIntersect(fPosX,fPosY,C.BL.BRx,C.BL.BRy).y)<this.radius){
                                const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(posIntersect(fPosX,fPosY,C.BL.BRx,C.BL.BRy).x-this.x,posIntersect(fPosX,fPosY,C.BL.BRx,C.BL.BRy).y-this.y));
                                this.dx=newVel.u;
                                this.dy=newVel.v;
                            }
                        }
                        else if(negIntersect(fPosX,fPosY,C.TL.TRx,C.TL.TRy).x<=C.TL.TRx
                        &&negIntersect(fPosX,fPosY,C.TL.TRx,C.TL.TRy).x>C.TL.MRx) {
                            if(distance(fPosX,fPosY,negIntersect(fPosX,fPosY,C.TL.TRx,C.TL.TRy).x,negIntersect(fPosX,fPosY,C.TL.TRx,C.TL.TRy).y)<this.radius){
                                const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(negIntersect(fPosX,fPosY,C.TL.TRx,C.TL.TRy).x-this.x,negIntersect(fPosX,fPosY,C.TL.TRx,C.TL.TRy).y-this.y));
                                this.dx=newVel.u;
                                this.dy=newVel.v;
                            }
                        }
                        else if(posIntersect(fPosX,fPosY,C.TR.TLx,C.TR.TLy).x>=C.TR.TLx
                        &&posIntersect(fPosX,fPosY,C.TR.TLx,C.TR.TLy).x<C.TR.MLx) {
                            if(distance(fPosX,fPosY,posIntersect(fPosX,fPosY,C.TR.TLx,C.TR.TLy).x,posIntersect(fPosX,fPosY,C.TR.TLx,C.TR.TLy).y)<this.radius){
                                const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(posIntersect(fPosX,fPosY,C.TR.TLx,C.TR.TLy).x-this.x,posIntersect(fPosX,fPosY,C.TR.TLx,C.TR.TLy).y-this.y));
                                this.dx=newVel.u;
                                this.dy=newVel.v;
                            }
                        }
                        else if(negIntersect(fPosX,fPosY,C.BR.BLx,C.BR.BLy).x>=C.BR.BLx
                        &&negIntersect(fPosX,fPosY,C.BR.BLx,C.BR.BLy).x<C.BR.MLx) {
                            if(distance(fPosX,fPosY,negIntersect(fPosX,fPosY,C.BR.BLx,C.BR.BLy).x,negIntersect(fPosX,fPosY,C.BR.BLx,C.BR.BLy).y)<this.radius){
                                const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(negIntersect(fPosX,fPosY,C.BR.BLx,C.BR.BLy).x-this.x,negIntersect(fPosX,fPosY,C.BR.BLx,C.BR.BLy).y-this.y));
                                this.dx=newVel.u;
                                this.dy=newVel.v;
                            }
                        }

                    }
                     //curved cushions
                     else if(distance(fPosX,fPosY,C.TL.LArcx,C.TL.LArcy)<this.radius+cWidth){
                        const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.TL.LArcx-this.x,C.TL.LArcy-this.y));
                        this.dx=newVel.x;
                        this.dy=newVel.y;
                    }
                    else if(distance(fPosX,fPosY,C.BL.LArcx, C.BL.LArcy)<this.radius+cWidth){
                        const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.BL.LArcx-this.x,C.BL.LArcy-this.y));
                        this.dx=newVel.u;
                        this.dy=newVel.v;
                    }
                    else if(distance(fPosX,fPosY,C.TR.RArcx,C.TR.RArcy)<this.radius+cWidth){
                        const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.TR.RArcx-this.x,C.TR.RArcy-this.y));
                        this.dx=newVel.u;
                        this.dy=newVel.v;
                    }
                    else if(distance(fPosX,fPosY,C.BR.RArcx, C.BR.RArcy)<this.radius+cWidth){
                        const newVel = resolveCushions(this.dx, this.dy, polarCoordinates(C.BR.BArcx-this.x,C.BR.RArcy-this.y));
                        this.dx=newVel.u;
                        this.dy=newVel.v;
                    }
                    //topleft
                    else if(posIntersect(fPosX,fPosY,C.TL.TLx,C.TL.TLy).x<C.TL.MLx
                    &&posIntersect(fPosX,fPosY,C.TL.TLx,C.TL.TLy).x>C.TL.TLx) {
                        if(distance(fPosX,fPosY,posIntersect(fPosX,fPosY,C.TL.TLx,C.TL.TLy).x,posIntersect(fPosX,fPosY,C.TL.TLx,C.TL.TLy).y)<this.radius){
                            const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(posIntersect(fPosX,fPosY,C.TL.TLx,C.TL.TLy).x-this.x,posIntersect(fPosX,fPosY,C.TL.TLx,C.TL.TLy).y-this.y));
                            this.dx=newVel.u;
                            this.dy=newVel.v;
                        }
                    }
                    //bottomright
                    else if(posIntersect(fPosX,fPosY,C.BR.BRx, C.R.BRy).x<C.BR.BRx
                            &&posIntersect(fPosX,fPosY,C.BR.BRx, C.BR.BRy).x>C.BR.MRx) {
                                if(distance(fPosX,fPosY,posIntersect(fPosX,fPosY,C.BR.BRx, C.BR.BRy).x,posIntersect(fPosX,fPosY,C.BR.BRx, C.BR.BRy).y)<this.radius){
                                    const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(posIntersect(fPosX,fPosY,C.BR.BRx,C.BR.BRy).x-this.x,posIntersect(fPosX,fPosY,C.BR.BRx,C.BR.BRy).y-this.y));
                                    this.dx=newVel.u;
                                    this.dy=newVel.v;
                                }
                    }
                    //topright
                    else if(negIntersect(fPosX,fPosY,C.R.TRx, C.R.TRy).x<C.R.TRx
                            &&negIntersect(fPosX,fPosY,C.R.TRx, C.R.TRy).x>C.R.TMx) {
                                if(distance(fPosX,fPosY,negIntersect(fPosX,fPosY,C.TR.TRx, C.TR.TRy).x,negIntersect(fPosX,fPosY,C.TR.TRx, C.TR.TRy).y)<this.radius){
                                    const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(negIntersect(fPosX,fPosY,C.TR.TRx,C.TR.TRy).x-this.x,negIntersect(fPosX,fPosY,C.TR.TRx,C.TR.TRy).y-this.y));
                                    this.dx=newVel.u;
                                    this.dy=newVel.v;
                                }
                    }
                    // bottomleft
                    else if(negIntersect(fPosX,fPosY,C.BL.BLx, C.BL.BLy).x>C.BL.BLx
                            &&negIntersect(fPosX,fPosY,C.BL.BLx, C.BL.BLy).x<C.BL.BMx) {
                                if(distance(fPosX,fPosY,negIntersect(fPosX,fPosY,C.BL.BLx, C.BL.BLy).x,negIntersect(fPosX,fPosY,C.BL.BLx, C.BL.BLy).y)<this.radius){
                                    const newVel = resolveCushions(this.dx,this.dy,polarCoordinates(negIntersect(fPosX,fPosY,C.BL.BLx,C.BL.BLy).x-this.x,negIntersect(fPosX,fPosY,C.BL.BLx,C.BL.BLy).y-this.y));
                                    this.dx=newVel.u;
                                    this.dy=newVel.v;
                                }
                            }
                    //sound effect
                }
                //

                this.x+=this.dx;
                this.y+=this.dy
                this.dx*=this.ddx;
                this.dy*=this.ddy;
                this.draw();
            }
            
        }
    }
    
}

export default Ball;
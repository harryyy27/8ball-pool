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
        this.ddy=0;
        this.ddx=0;
        this.potted = false;
        this.draw= () => {
            this.canvas.beginPath();
            this.canvas.arc(this.x,this.y,this.radius,0,2*Math.PI)
            this.canvas.fillStyle=this.color;
            this.canvas.fill();
            
        
    }
        this.update= () => {
            if(this.potted===false){
                this.x+=this.dx;
                this.y+=this.dy
                this.draw();
            }
            
        }
    }
    
}

export default Ball;
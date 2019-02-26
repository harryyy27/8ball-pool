const polarCoordinates=(x,y)=>{
    let angle =0;
    if(x===0 && y<0){
        angle =Math.PI/2;
    }
    else if(x===0 && y>0){
        angle = 3*Math.PI/2;
    }
    else if(x>=0 && y>=0){
        angle = Math.PI + Math.atan(y/x);
    }
    else if(x<=0 && y>0){
        angle = Math.atan(y/x);
    }
    else if(x<=0 && y<=0){
        angle = Math.atan(y/x);
    }
    else if (x>=0 && y<0){
        angle = Math.PI +Math.atan(y/x);
    }
    return angle;
}

const distance=(x1,y1,x2,y2)=>{
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
}
const rotVelocity=(x,y,angle)=>{
    const rVel = {
        u: x*Math.cos(angle)-y*Math.sin(angle),
        v: x*Math.sin(angle)+y*Math.cos(angle)
    }
    return rVel;
    

}
const resolveCushions=(dx,dy, angle)=>{
    const rVel=rotVelocity(dx, dy, angle);
    const vel=rotVelocity(rVel.u,-rVel.v, -angle);
    let newVel = {
        x: vel.u,
        y: vel.v
    }
    return newVel;
}
const posIntersect = (x1,y1,x2,y2) => {
    //x1 y1 start of straight cushion
    const c1 = y1+x1;
    const c2 = y2-x2;
    const I = (c2-c1)/2;
    return {
            x: I,
            y: I+c2
        }
}
const negIntersect = (x1,y1,x2,y2) => {

    const c1 = y1-x1;
    const c2 = y2+x2;
    const I =  c1-c2/2;

    return {
        x: I,
        y: I+c2
    }

}
//vector equation that intersects cushion
//vector equation of cushion
//simultaneous equations of intersection point
//if interesection point I is between cushion boundaries
//calculate distance 
//if distance <r collision
//else ...

export {polarCoordinates, distance, resolveCushions, rotVelocity, posIntersect, negIntersect};
// distance, rotVelocity, 
// ,distance,resolveCushions
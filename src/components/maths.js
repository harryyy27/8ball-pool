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
//vector intersection
const posIntersect = (x1,y1,x2,y2) => {
    //x1 y1 start of straight cushion
    const c1 = y1-x1;
    const c2 = y2-x2;
    const I = (c2-c1)/2;
    return {
            x: I,
            y: I+c2
        }
}
//vector intersection
const negIntersect = (x1,y1,x2,y2) => {

    const c1 = y1-x1;
    const c2 = y2+x2;
    const I =  c1-c2/2;

    return {
        x: I,
        y: I+c2
    }

}
function ballCollision(particle, otherParticle) {
    const xVelocityDiff = particle.dx - otherParticle.dx;
    const yVelocityDiff = particle.dy - otherParticle.dy;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        console.log(particle);
        console.log(particle.dy);
        console.log(angle);
        const u1 = rotVelocity(particle.dx, particle.dy, angle);
        console.log(u1.u);
        console.log(u1.v);
        const u2 = rotVelocity(otherParticle.dx, otherParticle.dy, angle);
        console.log(u2.u);

        // Velocity after 1d collision equation
        const v1 = { x: u1.u * (m1 - m2) / (m1 + m2) + u2.u * 2 * m2 / (m1 + m2), y: u1.v };
        const v2 = { x: u2.u * (m1 - m2) / (m1 + m2) + u1.u * 2 * m2 / (m1 + m2), y: u2.v };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotVelocity(v1.x,v1.y, -angle);
        const vFinal2 = rotVelocity(v2.x,v2.y, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.dx = vFinal1.u;
        particle.dy = vFinal1.v;

        otherParticle.dx = vFinal2.x;
        otherParticle.dy = vFinal2.y;
    }
}
//vector equation that intersects cushion
//vector equation of cushion
//simultaneous equations of intersection point
//if interesection point I is between cushion boundaries
//calculate distance 
//if distance <r collision
//else ...

export {polarCoordinates, distance, resolveCushions, rotVelocity, posIntersect, negIntersect, ballCollision};
// distance, rotVelocity, 
// ,distance,resolveCushions
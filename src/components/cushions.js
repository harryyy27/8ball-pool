//Width of coloured balls
const ballWidth = (50/3+25/24);
//Distance between cushions on corner pockets
const pWidth = ballWidth*1.6;
//radius of pocket
const pRadius= pWidth+Math.cos(Math.PI/4)
//cushion width
const cWidth = (50-pRadius)/2;


const Cush = {
    L : {
        TLx: 100-cWidth,
        TLy: 100-cWidth+pWidth/2,
        TMx: 100-cWidth*(1-Math.cos(Math.PI/4)),
        TMy: 100-cWidth*(1-Math.cos(Math.PI/4))+pWidth/2,
        TRx: 100,
        TRy: 100-cWidth*(1-2*Math.cos(Math.PI/4))+pWidth/2,
        BRx: 100,
        BRy: 400+cWidth*(1-2*Math.cos(Math.PI/4))-pWidth/2,
        BMx: 100-cWidth*(1-Math.cos(Math.PI/4)),
        BMy: 400+cWidth*(1-Math.cos(Math.PI/4))-pWidth/2,
        BLx: 100-cWidth,
        BLy: 400+cWidth-pWidth/2,
        TArcx: 100-cWidth,
        TArcy: 100-cWidth*(1-2*Math.cos(Math.PI/4))+pWidth/2,
        BArcx: 100-cWidth,
        BArcy: 400+cWidth*(1-2*Math.cos(Math.PI/4))-pWidth/2
    },
    R: {
        TLx: 700,
        TLy: 100-cWidth*(1-2*Math.cos(Math.PI/4))+pWidth/2,
        TMx: 700+cWidth*(1-Math.cos(Math.PI/4)),
        TMy: 100-cWidth*(1-Math.cos(Math.PI/4))+pWidth/2,
        TRx: 700+cWidth,
        TRy: 100-cWidth+pWidth/2,
        BRx: 700+cWidth,
        BRy: 400+cWidth-pWidth/2,
        BMx: 700+cWidth*(1-Math.cos(Math.PI/4)),
        BMy: 400+cWidth*(1-Math.cos(Math.PI/4))-pWidth/2,
        BLx: 700,
        BLy: 400+cWidth*(1-2*Math.cos(Math.PI/4))-pWidth/2,
        TArcx: 700+cWidth,
        TArcy: 100-cWidth*(1-2*Math.cos(Math.PI/4))+pWidth/2,
        BArcx: 700+cWidth,
        BArcy: 400+cWidth*(1-2*Math.cos(Math.PI/4))-pWidth/2
    },
    TL : {
        TLx: 100-cWidth+pWidth/2,
        TLy: 100-cWidth,
        TRx: 400-pWidth/2,
        TRy: 100-cWidth,
        MRx: 400-pWidth/2-cWidth*Math.cos(Math.PI/4),
        MRy: 100+cWidth*(Math.cos(Math.PI/4)-1),
        BRx: 400-pWidth/2-2*cWidth*Math.cos(Math.PI/4),
        BRy: 100,
        BLx: 100-cWidth+pWidth/2+2*cWidth*Math.cos(Math.PI/4),
        BLy: 100,
        MLx: 100-cWidth+pWidth/2+cWidth*Math.cos(Math.PI/4),
        MLy: 100+cWidth*(Math.cos(Math.PI/4)-1),
        RArcx: 400-pWidth/2-2*cWidth*Math.cos(Math.PI/4),
        RArcy: 100-cWidth,
        LArcx: 100-cWidth+pWidth/2+2*cWidth*Math.cos(Math.PI/4),
        LArcy: 100-cWidth
    },
    TR : {
        TLx: 400+pWidth/2,
        TLy: 100-cWidth,
        TRx: 700+cWidth-pWidth/2,
        TRy: 100-cWidth,
        MRx: 700-pWidth/2+cWidth*(1-Math.cos(Math.PI/4)),
        MRy: 100+cWidth*(Math.cos(Math.PI/4)-1),
        BRx: 700-pWidth/2+cWidth*(1-2*Math.cos(Math.PI/4)),
        BRy: 100,
        BLx: 400+pWidth/2+2*cWidth*Math.cos(Math.PI/4),
        BLy: 100,
        MLx: 400+pWidth/2+cWidth*Math.cos(Math.PI/4),
        MLy: 100+cWidth*(Math.cos(Math.PI/4)-1),
        RArcx: 700-pWidth/2+cWidth*(1-2*Math.cos(Math.PI/4)),
        RArcy: 100-cWidth,
        LArcx: 400+pWidth/2+2*cWidth*Math.cos(Math.PI/4),
        LArcy: 100-cWidth

    },
    BL : {
        TLx: 100-cWidth+pWidth/2+2*cWidth*Math.cos(Math.PI/4),
        TLy: 400,
        TRx: 400-pWidth/2-2*cWidth*Math.cos(Math.PI/4),
        TRy: 400,
        MRx: 400-pWidth/2-cWidth*Math.cos(Math.PI/4),
        MRy: 400+cWidth*(1-Math.cos(Math.PI/4)),
        BRx: 400-pWidth/2,
        BRy: 400+cWidth,
        BLx: 100-cWidth+pWidth/2,
        BLy: 400+cWidth,
        MLx: 100-cWidth+pWidth/2+cWidth*Math.cos(Math.PI/4),
        MLy: 400+cWidth*(1-Math.cos(Math.PI/4)),
        RArcx: 400-pWidth/2-2*cWidth*Math.cos(Math.PI/4),
        RArcy: 400+cWidth,
        LArcx: 100-cWidth+pWidth/2+2*cWidth*Math.cos(Math.PI/4),
        LArcy: 400+cWidth
    },
    BR : {
        TLx: 400+pWidth/2+2*cWidth*Math.cos(Math.PI/4),
        TLy: 400,
        TRx: 700-pWidth/2+cWidth*(1-2*Math.cos(Math.PI/4)),
        TRy: 400,
        MRx: 700-pWidth/2+cWidth*(1-Math.cos(Math.PI/4)),
        MRy: 400+cWidth*(1-Math.cos(Math.PI/4)),
        BRx: 700+cWidth-pWidth/2,
        BRy: 400+cWidth,
        BLx: 400+pWidth/2,
        BLy: 400+cWidth,
        MLx: 400+pWidth/2+cWidth*Math.cos(Math.PI/4),
        MLy: 400+cWidth*(1-Math.cos(Math.PI/4)),
        RArcx: 700-pWidth/2+cWidth*(1-2*Math.cos(Math.PI/4)),
        RArcy: 400+cWidth,
        LArcx: 400+pWidth/2+2*cWidth*Math.cos(Math.PI/4),
        LArcy: 400+cWidth

    }
}

export {Cush,pWidth,pRadius,cWidth,ballWidth}
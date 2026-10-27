/*
* Computational Design Laboratory: Depth Estimator
* Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
* October 2026
* 
* This sketch draws hand pose, keypoints and connections.
* based on https://docs.ml5js.org/#/reference/handpose
*/

let video, model, hands = [], trail = [];

preload = async () => {
    model = await ml5.handPose();
}

setup = async () => {
    createCanvas(640,480);
    video=createCapture(VIDEO);
    video.size(640,480);
    video.hide();



    model.detectStart(video, (res) => {
        hands = res });
}


draw = () => {
    background(12);
   

    if(video) {
        image(video,0,0,width,height);

        for (let hand of hands) {
            noStroke();
            fill(0, 255, 0);

            // draw detected hand keypoints
            for (let keypoint of hand.keypoints) {
                circle(keypoint.x, keypoint.y, 10);
            }

            // draw trail
            const tip=hand.keypoints?.find(p=>p.name==='index_finger_tip');
            if(tip){
                trail.push({x:tip.x,y:tip.y});
                 if(trail.length>100) {
                    trail.shift();
                 }
            }
            
            fill(0, 255, 0);
            beginShape(LINES);
            for(let i= 0; i<trail.length; i++) {
                const p = trail[i];
                stroke(0, i * (255 / trail.length), 0);
                vertex(p.x, p.y);
            }
            endShape(CLOSE);
            
        }

    }
}

keyPressed = () => {
    if(key==='c'||key==='C') {
        trail=[];
    }
}

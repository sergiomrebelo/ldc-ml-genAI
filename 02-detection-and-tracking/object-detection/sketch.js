/*
* Computational Design Laboratory: Depth Estimator
* Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
* October 2026
* 
* This sketch display detected object labels, bounding boxes, and scores for an image or video.
* based on https://docs.ml5js.org/#/reference/object-detection
*/

let video, detector, detections=[];

preload = () => {
    // object detection using cocossd model (ml5.js currenlty do not support YOLO)
    // alternatively, you can load in async setup using wait
    detector = ml5.objectDetection('cocossd');
}

setup = async () => {
    createCanvas(640,480);
    video=createCapture(VIDEO);
    video.size(640,480);
    video.hide();    

    detector.detectStart(video, gotDetections);

    document.getElementById(`status`).textContent = ``;

}

const gotDetections = (res) => {
    detections = res;
}

draw = () => {
    background(20);

    if (video) {
        image(video,0,0,width,height);

        push();
        noFill();
        stroke(0,255,0);
        strokeWeight(2);
        for(const d of detections){
            rect(d.x,d.y, d.width, d.height);
            push();
            noStroke();
            fill(0,255,0);
            const s = `${d.label} ${(d.confidence*100).toFixed(0)}%`;
            rect(d.x,d.y-22,textWidth(s)+14,22);
            fill(0);
            text(s,d.x+6,d.y-6);
            pop();
        }
        pop();
    }
}
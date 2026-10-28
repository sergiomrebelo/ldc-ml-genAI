/*
 * Computational Design Laboratory: Teachable Machine Classification
 * Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
 * October 2026
 *
 * Uses a Teachable Machine image model to classify a webcam view of a room
 * as either empty or occupied.
 * based on https://docs.ml5js.org/#/reference/image-classifier-tm
 * 
 * see https://teachablemachine.withgoogle.com/
 */

// model trained with teachable machine (empty / full)
const imageModelURL = 'https://teachablemachine.withgoogle.com/models/0JJWimrWs/';
let video, model, results = [];
let el;

preload = () => {
    model = ml5.imageClassifier(imageModelURL + "model.json", {flipped: true});
}

setup = () => { 
    createCanvas(640, 480); 
    video = createCapture(VIDEO) 
    video.size(640, 480);
    video.hide();

    model.classifyStart(video, gotResult);
    el = document.getElementById(`status`);
}

const gotResult = (res) => {
    // Log the predictions for debugging.
    // console.log (res);
    results = res;
}

draw = () => {
     background(20);
     if (video !== undefined) {
        image(video, 0, 0, width, height);

        if (results.length > 0) {
            // Predictions are ordered by confidence; the first result is the strongest.
            // if not, first sort predictions by confidence.
            let r = results[0];
            let label = r.label === `Class 1` ? `full` : `empty`;
            const s = `The room is ${label}: (confidence: ${(r.confidence * 100).toFixed(1)}%).`;
            
            if (el.textContent !== s) {
                el.textContent = s;
            }
        }
     }
}
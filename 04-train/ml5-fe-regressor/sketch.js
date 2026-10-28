/*
 * Computational Design Laboratory: Classifier Example
 * Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
 * October 2026
 *
 * 
 * This example demonstrates training a regression model with ml5.featureExtractor and MobileNet. 
 * based on https://editor.p5js.org/ml5/sketches/kZkob6YQP
 * and https://docs.ml5js.org/#/reference/feature-extractor
*/

let predictor, video;

let slider, addButton, trainButton;
let sampleCount = 0, predictedValue = 0;

setup = async () => {
    // This choice also determines which methods you use after training: 
    // regression tasks use predict() / predictStart().
    predictor = await ml5.featureExtractor("MobileNet",
        { task: "regression" }
    );

    createCanvas(640, 480);
    video = createCapture(VIDEO, { flipped: true });
    video.hide();

    // slider: 0 = far from camera, 1 = close to camera
    slider = createSlider(0, 1, 0.5, 0.01);
    slider.style("width", "640px");

    addButton = createButton("Add sample");
    addButton.mousePressed(addSample);

    trainButton = createButton("Start training");
    trainButton.mousePressed(startTraining);

    textSize(16);
}

const addSample = () => {
    predictor.addImage(video, slider.value());
    sampleCount = sampleCount + 1;
    `Sample ${sampleCount} added with value: ${slider.value()}`;
}

const startTraining = () => {
    predictor.train(
        { epochs: 500, learningRate: 0.0001, debug: true },
        finishedTraining
    );
}

finishedTraining = () => {
    predictor.predictStart(video, gotResult);
}

function draw() {
    background(0);
    if (video !== undefined) {
        image(video, 0, 0, 640, 450);
    }

    // use predicted value if trained, otherwise follow the slider
    let currentValue = slider.value();
    if (predictor.isTrained) {
        currentValue = predictedValue;
    }

    // make sure predicted value stays within 0-1
    currentValue = constrain(currentValue, 0, 1);

    let circleSize = map(currentValue, 0, 1, 80, 300);
    push();
    fill(0, 255, 0, 100);
    ellipse(320, 250, circleSize, circleSize);

    noStroke();
    fill(255);
    text( `Value: ${(nf(currentValue, 1, 4), 10, height - 10)}`);
    pop();
}

const gotResult = (results) => {
    predictedValue = results[0].value;
}

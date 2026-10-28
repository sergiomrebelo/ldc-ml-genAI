/*
* Computational Design Laboratory: Body Segmentation
* Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
* October 2026
* 
* This sketch uses ML generated image captions to define the colour of background of a webpage.
*/

let video;
let model;
let label = 'waiting';
let score = 0;
let hue = 0;
let saturation = 0;

preload = () => {
    model = ml5.imageClassifier('MobileNet');
}

setup = () => {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);

    fill(0, 0, 100);
    textSize(22);

    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();

    model.classify(video, predict);
}

predict = (results) => {
    const prediction = results?.[0];
    if (prediction) {
        label = prediction.label;
        score = prediction.confidence;
        hue = hash(label);
        saturation = constrain(score, 0, 1) * 100;
    }

    setTimeout(() => {
        model.classify(video, predict);
    }, 1000);
}

draw = () => {
    if (video !== undefined) {
        background(hue, saturation, 100);
        image(video, 0, 0, 260, 195);
        fill(0, 0, 100);
        text(label, 20, 230);
        text(`confidence ${(score * 100).toFixed(1)}%`, 20, 260);
    } 
}

// Convert a label string into a repeatable hue in the HSB range [0, 359].
// Multiplying by 31 before adding each character code makes character order
// matter (so "cat" and "act" usually get different values). 31 is a common,
// simple prime-number choice for string hashes; it has no special color meaning.
hash = (string) => {
    let value = 0;
    for (let i = 0; i < string.length; i++) {
        value = (value * 31 + string.charCodeAt(i)) | 0;
    }
    return Math.abs(value) % 360;
}

/*
 * Computational Design Laboratory: Classifier Example
 * Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
 * October 2026
 *
 * This example demonstrates training an image classifier with ml5.featureExtractor and MobileNet.
 * based on https://editor.p5js.org/ml5/sketches/XSzNdRjCm
 * and https://docs.ml5js.org/#/reference/feature-extractor
*/

let classifier, video;
let classEls = [], bt;
let result = "";

setup = async () => {
    createCanvas(640, 480);
    video = createCapture(VIDEO, {flipped: true});
    video.hide();

    // This choice also determines which methods you use after training: 
    // regression tasks use classify() / classifyStart()
    classifier = await ml5.featureExtractor("MobileNet", {
        task: "classification",
    });

    for (let i = 0; i < 2; i++) {
        let input = createInput("");
        input.attribute("placeholder", "Class #" + (i + 1) + " label");
        classEls.push(input);
    }

    bt = createButton("Start collecting samples");
    bt.mousePressed(startSampling);
}

draw = () => {
    background(0);

    image(video, 0, 0, 640, 450);

    fill(255);
    textSize(16);
    text(result, 10, height - 10);
}

const startSampling = () => {
    for (let i = 0; i < classEls.length; i++) {
        let label = classEls[i].value();
        if (label.trim().length == 0) {
            label = "Class #" + (i + 1);
        }
        // we are storing the label and the number of samples seen as
        // custom properties in the p5.Element
        classEls[i].label = label;
        classEls[i].count = 0;
        // turn it into a button
        classEls[i].attribute("type", "button");
        classEls[i].value("Add " + label);
        classEls[i].mousePressed(() => addSample(i));
    }

    bt.html("Start training");
    bt.mousePressed(startTraining);
}

const addSample = (index) => {
    const classEl = classEls[index];
    classifier.addImage(video, classEl.label);
    classEl.count = classEl.count + 1;
    result = ``;
    result = classEls.map(el => `${el.label}: ${el.count}`).join(', ');
}

startTraining = () => {
    classifier.train({ epochs: 100, debug: true }, finishedTraining);
}

finishedTraining = () => {
    for (let i = 0; i < classEls.length; i++) {
        classEls[i].hide();
    }
    bt.hide();
    classifier.classifyStart(video, gotResult);
}

gotResult = (results) => {
    result = results[0].label + " (" + nf(results[0].confidence, 0, 2) + ")";
}

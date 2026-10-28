/*
 * Computational Design Laboratory: Classifier Example
 * Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
 * October 2026
 *
 * This example demonstrates training a color classifier through ml5.neuralNetwork.
 * based on https://editor.p5js.org/ml5/sketches/eGHBdmCLe
 * and https://docs.ml5js.org/#/reference/neural-network
*/

// load data (or interactively create some data)
let data = [
  { r: 255, g: 0, b: 0, color: "red-ish" },
  { r: 254, g: 0, b: 0, color: "red-ish" },
  { r: 253, g: 0, b: 0, color: "red-ish" },
  { r: 0, g: 255, b: 0, color: "green-ish" },
  { r: 0, g: 254, b: 0, color: "green-ish" },
  { r: 0, g: 253, b: 0, color: "green-ish" },
  { r: 0, g: 0, b: 255, color: "blue-ish" },
  { r: 0, g: 0, b: 254, color: "blue-ish" },
  { r: 0, g: 0, b: 253, color: "blue-ish" },
];

let classifer;
let r = 0, g = 0, b = 0;
let rSlider, gSlider, bSlider;
let trained = false;
const el = document.getElementById(`status`);

setup = () => {
  createCanvas(windowWidth, windowHeight);
  background (r,g,b);

  // For this example to work across all browsers
  // "webgl" or "cpu" needs to be set as the backend
  ml5.setBackend("webgl");

  rSlider = createSlider(0, 255, 255).position(10, height-100);
  gSlider = createSlider(0, 255, 0).position(10, height-70);
  bSlider = createSlider(0, 255, 0).position(10, height-40);

  let options = {
    task: "classification",
    debug: true,
  };

  classifier = ml5.neuralNetwork(options);

  // add data to the neural network
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let inputs = [item.r, item.g, item.b];
    let outputs = [item.color];
    classifier.addData(inputs, outputs);
  }

  // normalize your data;
  classifier.normalizeData();

  // train your neural network
  let trainingOptions = {
    epochs: 32,
    batchSize: 12,
  };
  classifier.train(trainingOptions, finishedTraining);
}
// use the trained model
const finishedTraining = () => {
  classify();
  el.textContent = ``;
  trained = true;
}

classify = () => {
    let input = [r, g, b];
    classifier.classify(input, handleResults);
}

draw = () => {
    let changed = false;
    classifyTimer = null;
    if (rSlider.value() !== r) {
        r = rSlider.value();
        changed = true;
    }
    if (gSlider.value() !== g) {
        g = gSlider.value();
        changed = true;
    }
    if (bSlider.value() !== b) {
        b = bSlider.value();
        changed = true;
    }

    if (changed === true) {
        clearTimeout(classifyTimer);

        classifyTimer = setTimeout(() => {
            classify();
        }, 100);
    }

    background (r,g,b);
}

function handleResults(res, err) {
    if (err) {
        console.error(error);
        return;
    }
    // Predictions are ordered by confidence; the first result is the strongest.
    // if not, first sort predictions by confidence.
    label = res[0].label;
    el.textContent = label;
}


/*
* Computational Design Laboratory: Sound Classifier
* Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
* October 2026
* 
* This sketch uses the pretrained `SpeechCommands18w` model to classify short audio patterns from the microphone
* based on https://docs.ml5js.org/#/reference/sound-classifier
*/

let classifier;
let listening = false;
const el = document.getElementById(`status`);
const labelEl = document.getElementById(`label`);
const confidenceEl = document.getElementById(`confidence`);
const bt = document.getElementById(`start`);

preload = () => {
   let options = { probabilityThreshold: 0.7 };
   classifier = ml5.soundClassifier("SpeechCommands18w", options); 
   el.textContent = `Model ready. Click to allow microphone access and start listening.`;
   bt.disabled = false;
}

setup = () => {
  noCanvas();
  bt.addEventListener('click', startListening);
}

const gotResults = (results) => {
  console.log(results);

  const top = results?.[0];
  if (top !== undefined) {
      labelEl.textContent = top.label;
      confidenceEl.textContent = `Confidence: ${(top.confidence * 100).toFixed(1)}%`;
    }

   el.textContent = `Listening. The model classifies audio patterns; it may mistake speech or background noise.`;
}

const startListening = () => {
  if (listening === true) {
    return;
  }

  listening = true;
  bt.disabled = true;
  el.textContent = `Requesting microphone access`;

  classifier.classifyStart(gotResults);
}

/*
*  Computational Design Laboratory: Getting Started with ML (image classifier)
*  Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
*  October 2026
*  
*  This sketch uses ml5.js to classify web camera streaming and displays
*  the predicted label and confidence on the webpage.
*/

let video, classifier, results = [];
let ready = false;
let el;

setup = () => {
  createCanvas(640, 480);
  el = document.querySelector('#status');
  document.querySelector('#camera').addEventListener('click', start);
  classifier = ml5.imageClassifier('MobileNet', () => {
    ready = true;
    el.textContent = "Model loaded. Start the camera.";
  });
}

start = () => {
  if (video == true) {
    return;
  }
  video = createCapture(VIDEO, () => {
    video.size(640, 480);
    video.hide();
    el.textContent = 'Camera running';
    next();
  });
}

next = () => {
  if (ready == false || video == false) {
    return;
  }

  classifier.classifyStart(video, (output) => {
    results = output || [];
  });
}

draw = () => {
  if (video) {
    background(25);
    image(video, 0, 0, width, height);
    fill(0, 190);
    noStroke();
    rect(0, height - 110, width, 110);
  }
  fill(255);
  textSize(17);
  results.slice(0, 3).forEach((r, i) => text(`${r.label} ${(r.confidence * 100).toFixed(1)}%`, 12, height - 84 + i * 25));
}

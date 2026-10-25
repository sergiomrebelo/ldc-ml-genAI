/*
*  Computational Design Laboratory: Getting Started with ML (sound classifier)
*  Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
*  October 2026
*  
*  This sketch uses ml5.js to classify sounds from the microphone and displays
*  the predicted sound label and confidence on the webpage.
*  uses `SpeechCommands18w` model
*/

let classifier, st, label, confidence, running = false;

setup = () => {
  noCanvas();
  st = document.querySelector('#status');
  label = document.querySelector('#label');
  confidence = document.querySelector('#confidence');

  // reference: https://docs.ml5js.org/#/reference/sound-classifier
  classifier = ml5.soundClassifier('SpeechCommands18w', { probabilityThreshold: 0.7 }, () => {
    st.textContent = 'Model ready. Click to enable the microphone.';
  });

  document.querySelector('#start').addEventListener('click', () => {
    if (running == true) {
      return;
    }
    running = true;

    classifier.classifyStart((results) => {
      const top = results?.[0]; // Get the first result if available.
      if (top) {
        label.textContent = top.label;
        confidence.textContent = `Score: ${(top.confidence * 100).toFixed(1)}%`;
      }
      st.textContent = 'Listening…';
    });
  });
}

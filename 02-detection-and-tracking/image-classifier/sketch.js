/*
* Computational Design Laboratory: Depth Estimator
* Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
* October 2026
* 
* This sketch using the MobileNet image classifier.
* based on https://docs.ml5js.org/#/reference/image-classifier
*/

let classifier, imageReady = false;
const el = document.getElementById(`status`);
const img = document.getElementById(`preview`);
const bt = document.getElementById(`classify`);
const result = document.getElementById(`predictions`);

preload = () => {
  const options = {
    version: 2, // The MobileNet version to use
    alpha: 1.0, // The width multiplier for the MobileNet. 
    topk: 3 // The number of labels to return<
  }

  // models available: mobilenet, darknet, doodlenet, or a URL to a compatible model file
  classifier = ml5.imageClassifier("mobilenet", options); 
  
  el.textContent = imageReady ? 'Model ready. You can classify the image.' : 'Model ready. Choose an image.';
}

setup = () => {
  noCanvas();
  document.getElementById(`image-file`).addEventListener('change', loadSelectedImage);
  bt.addEventListener('click', gotResults);
  updateButton();
}

// load img file
loadSelectedImage = (event) => {
  const file = event.target.files?.[0];
  result.replaceChildren();
  imageReady = false;
  updateButton();
  
  if (!file)  {
    return;
  }
  
  if (!file.type.startsWith('image/')) {
    statusElement.textContent = 'Please select an image file.';
    return;
  }

  img.onload = () => {
    imageReady = true;
    img.hidden = false;
    el.textContent = `Image ready. Click “Classify image”`;
    updateButton();
  };
  
  img.onerror = () => showError('The selected file could not be displayed as an image.');
  img.src = URL.createObjectURL(file);
}

updateButton = () => {
  bt.disabled = !imageReady;
}

gotResults = async () => {
  if (!imageReady) {
    return;
  }
  result.replaceChildren();
  classifier.classify(img, (res) => {
    // console.log (res);
    if (!res?.length) {
        el.textContent = `No predictions returned. Try another image.`;
        return;
    }

    for (const r of res.slice(0, 3)) {
      const item = document.createElement('li');
      item.textContent = `${r.label} — ${(r.confidence * 100).toFixed(1)}%`;
      result.append(item);
    }
    
  });
}

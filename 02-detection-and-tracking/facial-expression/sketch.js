/*
* Computational Design Laboratory: Facial expression predictions
* Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
* October 2026
* 
* Human 3.3.6 (TensorFlow.js) face detection and expression estimation.
* using Human.js (https://github.com/vladmandic/human)
*/

const human = new Human.Human({
  backend: 'webgl',
  modelBasePath: 'https://vladmandic.github.io/human-models/models/',
  face: {
    enabled: true,
    detector: { enabled: true },
    mesh: { enabled: false },
    attention: { enabled: false },
    iris: { enabled: false },
    description: { enabled: false },
    emotion: { enabled: true },
    antispoof: { enabled: false },
    liveness: { enabled: false }
  },
  body: { enabled: false },
  hand: { enabled: false },
  object: { enabled: false },
  segmentation: { enabled: false },
  gesture: { enabled: false }
});

const video = document.querySelector('#video');
const canvas = document.querySelector('#overlay');
const context = canvas.getContext('2d');
const statusElement = document.querySelector('#status');
const predictionElement = document.querySelector('#prediction');
const startButton = document.querySelector('#start');
let stream;
let running = false;
let busy = false;
let lastInferenceAt = 0;

const initialize = async () => {
  try {
    await human.load();
    await human.warmup();
    statusElement.textContent = 'Models ready. Start the camera when you are ready.';
    startButton.disabled = false;
  } catch (error) {
    console.error(error);
    statusElement.textContent = 'Could not load Human models. Check the internet connection and browser console, then reload.';
  }
}

const startCamera = async () => {
  if (running) return;
  startButton.disabled = true;
  statusElement.textContent = 'Requesting camera access…';
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, audio: false });
    video.srcObject = stream;
    await video.play();
    running = true;
    statusElement.textContent = 'Camera running. Waiting for a face…';
    requestAnimationFrame(processFrame);
  } catch (error) {
    console.error(error);
    statusElement.textContent = error.name === 'NotAllowedError'
      ? 'Camera access was denied. Allow access in browser settings and reload.'
      : 'Could not start the camera. Check that a camera is connected and try again.';
    startButton.disabled = false;
  }
}

startButton.addEventListener('click', startCamera);

const processFrame = async (now) => {
  if (!running) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    context.save();
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.restore();
    if (!busy && now - lastInferenceAt > 180) {
      busy = true;
      lastInferenceAt = now;
      try {
        const result = await human.detect(video);
        drawFaces(result.face || []);
      } catch (error) {
        console.error(error);
        statusElement.textContent = 'Face analysis failed. Check the browser console.';
        stopCamera();
      } finally {
        busy = false;
      }
    }
  }
  if (running) requestAnimationFrame(processFrame);
}

const drawFaces = (faces) => {
  if (!faces.length) {
    predictionElement.textContent = 'No face detected.';
    statusElement.textContent = 'Camera running. Adjust lighting or framing if no face is detected.';
    return;
  }
  const face = faces[0];
  const [x, y, width, height] = face.box;
  context.strokeStyle = '#80ff80';
  context.lineWidth = 3;
  context.strokeRect(canvas.width - x - width, y, width, height);
  const emotions = (Array.isArray(face.emotion) ? face.emotion : [])
    .filter(item => item && typeof item.emotion === 'string' && Number.isFinite(item.score))
    .sort((a, b) => b.score - a.score);
  if (!emotions.length) {
    statusElement.textContent = `Detected ${faces.length} face(s), but no expression scores were returned.`;
    predictionElement.textContent = 'Face detected; check the browser console and model configuration.';
    console.warn('Human detected a face without emotion scores:', face);
    return;
  }
  statusElement.textContent = `Camera running. ${faces.length} face(s) detected; showing the strongest expression estimates for the first face.`;
  predictionElement.replaceChildren();
  const heading = document.createElement('strong');
  heading.textContent = 'Model estimates (not feelings):';
  const list = document.createElement('ul');
  for (const item of emotions) {
    const row = document.createElement('li');
    row.textContent = `${item.emotion}: ${(item.score * 100).toFixed(1)}%`;
    list.append(row);
  }
  predictionElement.append(heading, list);
}

const stopCamera = () => {
  running = false;
  stream?.getTracks().forEach(track => track.stop());
  video.srcObject = null;
  startButton.disabled = false;
}

window.addEventListener('pagehide', stopCamera);
initialize();

let video;
let poseModel;
let poses = [];

const confidenceThreshold = 0.25;

// MoveNet keypoint names and the connections that form the skeleton.
const connections = [
  ['nose', 'left_eye'],
  ['left_eye', 'left_ear'],
  ['nose', 'right_eye'],
  ['right_eye', 'right_ear'],
  ['left_shoulder', 'right_shoulder'],
  ['left_shoulder', 'left_elbow'],
  ['left_elbow', 'left_wrist'],
  ['right_shoulder', 'right_elbow'],
  ['right_elbow', 'right_wrist'],
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],
  ['left_hip', 'left_knee'],
  ['left_knee', 'left_ankle'],
  ['right_hip', 'right_knee'],
  ['right_knee', 'right_ankle']
];

function preload() {
  poseModel = ml5.bodyPose('MoveNet');
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseModel.detectStart(video, results => {
    poses = results;
  });
}

function draw() {
  background(20);

  if (video) {
    image(video, 0, 0, width, height);
  }

  for (const person of poses) {
    const keypoints = person.keypoints || [];
    const pointsByName = Object.fromEntries(
      keypoints.map(point => [point.name, point])
    );

    // Draw a line only when both endpoint keypoints are confident enough.
    stroke(100, 220, 255);
    strokeWeight(3);
    for (const [startName, endName] of connections) {
      const start = pointsByName[startName];
      const end = pointsByName[endName];

      if (
        start && end &&
        (start.confidence ?? start.score ?? 0) > confidenceThreshold &&
        (end.confidence ?? end.score ?? 0) > confidenceThreshold
      ) {
        line(start.x, start.y, end.x, end.y);
      }
    }

    // Draw the visible keypoints over the lines.
    noStroke();
    fill(255, 90, 150);
    for (const point of keypoints) {
      if ((point.confidence ?? point.score ?? 0) > confidenceThreshold) {
        circle(point.x, point.y, 9);
      }
    }
  }
}

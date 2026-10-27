/*
* Computational Design Laboratory: Depth Estimator
* Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
* October 2026
* 
* This sketch display the predicted depth map from an image or camera frame.
* based on https://docs.ml5js.org/#/reference/facemesh
*/


let video, model, faces = [];

preload = async () => {

    const options = { 
        maxFaces: 1, // The maximum number of faces to detect. 
        refineLandmarks: false, // Refine the landmarks so the left and right iris keypoints are included.
        flipped: false, // Boolean: Flip the result horizontally. 
        runtime: 'tfjs' // The runtime to use. "tfjs" (default) or "mediapipe".
    };
    
    model = await ml5.faceMesh(options);
}

setup = async () => {
    createCanvas(640,480);
    video=createCapture(VIDEO);
    video.size(640,480);
    video.hide();

    model.detectStart(video,gotResults);
    
}


const gotResults = (res) => {
    // parameters
    // {
    // box: { width, height, xMax, xMin, yMax, yMin },
    // keypoints: [{ x, y, z, name }, ... ],
    // faceOval: { x, y, width, height, centerX, centerY, keypoints: [{ x, y, z }, ... ]},
    // leftEye: { x, y, width, height, centerX, centerY, keypoints: [{ x, y, z }, ... ]},
    // ... }

    faces = res;
}


draw = () => {
    background(20);
    if(video) {
        image(video,0,0,width,height);
        
        // noStroke();
        fill (0, 255, 0);
        stroke (0, 255, 0);

        for(const face of faces){
            for(const p of face.keypoints||[]) {
                circle(p.x,p.y,1);
            }

            const nose = face.keypoints?.[1];
            if(nose){
                circle(nose.x,nose.y,10);
            }
        }

        // returns UV coordinates for each keypoint in the form of 
        // console.log (model.getUVCoords());
        
        // returns vertex indices for the "edges" in the form of [[a,b], [a, b], ... ]
        // console.log (model.getConnections());

        // returns a nested array of keypoint indices. 
        // Each sub-array contains three indices, representing the keypoints that form a triangle.
        // console.log (model.getTriangles());
    }
}

/*
* Computational Design Laboratory: Depth Estimator
* Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
* October 2026
* 
* This sketch display the predicted depth map from an image or camera frame.
* based on https://docs.ml5js.org/#/reference/depthestimation
* 
* example resulting mesh: https://editor.p5js.org/ml5/sketches/CE2f9l38k
* example resulting point cloud: https://editor.p5js.org/ml5/sketches/7EOC8txJ1
*/


let video, estimator, result;

preload = async () => {

    const options = {
        flipHorizontal: false, 
        dilationFactor: 4, 
        colormap: 'grayscale',
        minDepth: 0.2,
        maxDepth: 0.75,
        normalizeDynamically: false,
        normalizationSmoothingFactor: 0.5
    }

    estimator = await ml5.depthEstimation(options);
    
}

setup = async () => {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();

    estimator.estimateStart(video, gotResults);

    document.getElementById(`status`).textContent = ``;
}

const gotResults = (res) => {
    result = res;
    // console.log (results);
}

draw = () => { 
    background(20); 

    let img = video;


    console.log (result);

    if (result !== undefined) {
        img = result.image;
    } 

    image(img, 0, 0, width, height);
}

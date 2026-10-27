/*
* Computational Design Laboratory: Body Segmentation
* Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
* October 2026
* 
* This sketch uses ml5.js to cisualise the segmentation mask before using it 
* to separate, recolor, or layer a person and background. 
* based on https://docs.ml5js.org/#/reference/body-segmentation
*/

let video, segmentation, result = []; 

setup = async () => {
    createCanvas(640,480);
    video = createCapture(VIDEO);
    video.size(640,480);
    video.hide();

    const options = {
        runtime: "tfjs", // "tfjs" or "mediapipe"
        modelType: "general", // "general" or "landscape"
        maskType: "parts", // "background", "person", or "parts" (used to change the type of segmentation mask output)
        flipped: false,
    };

    // mode
    // SelfieSegmentation
    segmentation = await ml5.bodySegmentation("BodyPix", options, () => {
        segmentation.detectStart(video, gotResults);
    });
    
    const gotResults = (res) => {
        result = res;
    }
}


function draw(){
   background(15);
   
   if(video) {
    image(video, 0, 0,width,height);
   } 
   
    if(result.mask !== undefined){
        console.log (result);

        // data structure
        // {
        // mask: {}, // a p5 Image object, can be directly passed into p5 image() function
        // maskImageData: {}, // the mask as an ImageData object
        // data: [], // an array of raw detection results
        // imageData: {}, // an ImageData object of the raw detection results
        // }

        // parts on imageData are defined at 
        // let parts = segmentation.getPartsId();
        // console.log (`parts: ${JSON.stringify(parts)}`);

        image(result.mask,0,0,width,height);
    }
}

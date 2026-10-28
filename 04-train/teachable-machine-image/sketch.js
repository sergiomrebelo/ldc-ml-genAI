const MODEL_URL='https://teachablemachine.withgoogle.com/models/REPLACE_ME/';
let video,model,results=[],ready=false;
function setup(){createCanvas(640,480);video=createCapture(VIDEO,()=>{video.size(640,480);video.hide();});if(MODEL_URL.includes('REPLACE_ME'))return;model=ml5.imageClassifier(MODEL_URL,()=>{ready=true;predict();});}
function predict(){if(!ready)return;model.classify(video,(e,r)=>{if(!e)results=r||[];setTimeout(predict,150);});}
function draw(){background(20);if(video)image(video,0,0,width,height);fill(0,180);rect(0,height-100,width,100);fill(255);textSize(18);results.slice(0,3).forEach((r,i)=>text(`${r.label}: ${(r.confidence*100).toFixed(1)}%`,12,height-70+i*24));if(MODEL_URL.includes('REPLACE_ME'))text('Replace MODEL_URL in sketch.js',12,30);}

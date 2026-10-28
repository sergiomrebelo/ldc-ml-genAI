const MODEL_URL='https://teachablemachine.withgoogle.com/models/REPLACE_ME/';
let model;
function setup(){noCanvas();if(MODEL_URL.includes('REPLACE_ME'))return;model=ml5.soundClassifier(MODEL_URL,{probabilityThreshold:.2},()=>model.classify((e,r)=>{if(e){console.error(e);return;}document.querySelector('#label').textContent=`${r[0].label}: ${(r[0].confidence*100).toFixed(1)}%`;}));}

/*
* Computational Design Laboratory: Depth Estimator
* Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
* October 2026
* 
* This sketch uses the `movieReviews` sentiment model, returning a score from 0 (more negative) to 1 (more positive).
* based on https://docs.ml5js.org/#/reference/sentiment
* 
*/


let sentiment;
const el = document.getElementById(`status`);
const textEl = document.getElementById(`text`);
const analiseBt = document.getElementById(`analyse`);
const scoreEl = document.querySelector('#score');

preload = () => {
  sentiment = ml5.sentiment("MovieReviews");
  el.textContent = ``;
}

setup = async () => {
  noCanvas();
  analiseBt.addEventListener('click', getSentiment);
}

const getSentiment = async () => {
  const text = textEl.value.trim();
  el.textContent = ``;
  if (text === undefined) {
    el.textContent = 'Enter some text before analysing.';
    return;
  }

  sentiment.predict(text, gotResult);
}

const gotResult = (res) => {
  // new version of ML5 return `confidence` but older examples expose the same value as `score`.
  const r = res?.score ?? res?.confidence;
  const score = Math.max(0, Math.min(1, r));
  const interpretation = score > 0.6 ? 'more positive' : score < 0.4 ? 'more negative' : 'mixed or near the middle';
  scoreEl.textContent = `Score: ${score.toFixed(3)} — ${interpretation}`;
}
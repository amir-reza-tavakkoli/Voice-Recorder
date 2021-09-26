
const recordAudio = () =>

  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });

  });

    // document.getElementById('error').style.opacity = '1';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));



function w() {
  o = 1;
}

// let anim = document.getElementById('v').style.animation;
// document.getElementById('v').style.animation = '0s';
// x.addEventListener('click', () => handleAction)
const handleAction = async () => {
  // document.getElementById('v').style.animation = anim
  // document.getElementById('x').textContent = 'stop';
  // document.getElementById('x').onclick = handleAction2();
  let o = 0;
  // s.addEventListener('click', () => {
  //   o = 1;
  // })
    const recorder = await recordAudio();
    recorder.start();

  while (o == 0){
    await sleep(10);
  }
  const audio = await recorder.stop();
  audio.play();
  // document.getElementById('v').style.animation = '0s';
  // document.getElementById('x').textContent = 'stop';
}

// const handleAction2 = async () => {


// //   await sleep(3000);fix
// //   actionButton.disabled = false;
//     recorder = null;

// }

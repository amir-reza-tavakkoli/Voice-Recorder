
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
const recorder = null;
const handleAction = async () => {
    // const recorder;
    // try {
        recorder = await recordAudio();
    // } catch {
    //     document.getElementById('error').style.opacity = '1';
    // }

  // const actionButton = document.getElementById('action');
  document.getElementById('action').style.animation = 'i 4s ease-in-out 0ms infinite'
//   actionButton.disabled = true;

  recorder.start();
}

const handleAction2 = async () => {
  document.getElementById('action').style.animation = 'none'
  const audio = await recorder.stop();
  audio.play();
//   await sleep(3000);fix
//   actionButton.disabled = false;
recorder = null;

}

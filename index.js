
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

const handleAction = async () => {
    // const recorder;
    // try {
        const recorder = await recordAudio();
    // } catch {
    //     document.getElementById('error').style.opacity = '1';
    // }

  const actionButton = document.getElementById('action');
  actionButton.disabled = true;
  recorder.start();
  while(document.querySelector('button:active')){
  await sleep(10);
  }
  const audio = await recorder.stop();
  audio.play();
//   await sleep(3000);
  actionButton.disabled = false;

}

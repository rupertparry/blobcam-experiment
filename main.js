const videoWidth = 600;
const videoHeight = 500;

async function setupCamera() {
  const video = document.querySelector("video");
  
  video.width = videoWidth;
  video.height = videoHeight;
  
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      width: videoWidth,
      height: videoHeight
    }
  });
  
  video.srcObject = stream;
  
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo() {
  const video = await setupCamera();
  video.play();
  return video;
}

async function start() {
  const video = await loadVideo();
  draw(video);
}

start();


const source = document.querySelector("#source");
const sourceContext = source.getContext("2d");
source.width = videoWidth;
source.height = videoHeight;

const displayElement = document.querySelector("#display");
displayElement.width = videoWidth;
displayElement.height = videoHeight;
const display = displayElement.getContext("2d");

function draw(video) {
  sourceContext.clearRect(0, 0, videoWidth, videoHeight);
  sourceContext.save();
  sourceContext.scale(-1, 1);
  sourceContext.translate(-videoWidth, 0);
  sourceContext.drawImage(video, 0, 0, videoWidth, videoHeight);

  display.clearRect(0, 0, videoWidth, videoHeight);
  display.save();
  for (i=1; i < 30; i++) {
    for (j=1; j < 25; j++) {
      const rgb = sourceContext.getImageData(
        i * 20, j * 20, 1, 1).data;
      display.moveTo(i * 20, j * 20);
      display.beginPath();
      const radius = ((255 * 3 - rgb[0] - rgb[1] - rgb[2]) / 3) * 10/255;
      display.arc(i * 20, j * 20, radius, 0, 2 * Math.PI);
      display.fillStyle = "#60a5ff"; // #333
      display.fill();
    }
  }
  display.restore();
  sourceContext.restore();

  

  requestAnimationFrame(() => { draw(video) });
}









// const canvas = document.querySelector("canvas");
// const context = canvas.getContext("2d");
// const size = window.innerWidth;
// const dpr = window.devicePixelRatio;

// canvas.imageSmoothingEnabled = true;
// canvas.width = size * dpr;
// canvas.height = size * dpr;
// canvas.style.width = size + "px";
// canvas.style.height = size + "px";
// context.scale(dpr, dpr);

// context.lineWidth = 2;

// context.moveTo(0, 0)

// window.addEventListener('mousemove', (event) => {
//   context.lineTo(event.clientX + 0.5, event.clientY);
//   context.stroke();
// })



// let i = 0;
// function animate() {
//   angle = 0.1 * i;
//   x=(1+angle)*Math.cos(angle);
//   y=(1+angle)*Math.sin(angle);
//   context.lineTo(x, y);
//   context.stroke();
//   i++;
//   if (i < 720) {
//     requestAnimationFrame(animate);
//   }
// }
// animate();
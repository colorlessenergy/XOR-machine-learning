let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let nn;

let training_data = [
  {
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [0, 1],
    outputs: [1]
  },
  {
    inputs: [1, 0],
    outputs: [1]
  },
  {
    inputs: [1, 1],
    outputs: [0]
  },
]

function setup () {
  canvas.width = 400;
  canvas.height = 400;
  nn = new NeuralNetwork(2, 4, 1);

  draw();
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 1000; i++) {
    let data = training_data[Math.floor(Math.random() * training_data.length)];
    nn.train(data.inputs, data.outputs);
  }

  nn.learning_rate = 0.5;

  let resolution = 10;
  let cols = canvas.width / resolution;
  let rows = canvas.height / resolution;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      let inputs = [x1, x2];
      let y = nn.predict(inputs)
      let rgb = 255*y;
      ctx.fillStyle = "rgb("+rgb+", "+rgb+", "+rgb+")";
      ctx.fillRect(i * resolution, j * resolution, resolution, resolution)
    }
  }

  window.requestAnimationFrame(draw)
}

setup();
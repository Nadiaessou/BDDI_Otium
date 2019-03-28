'use strict';

const circleCount = 30;
const circlePropCount = 8;
const circlePropsLength = circleCount * circlePropCount;
const baseSpeed = 0.1;
const rangeSpeed = 1;
const baseTTL = 200;
const rangeTTL = 100;
const baseRadius = 100;
const rangeRadius = 200;
const rangeHue = 60;
const xOff = 0.055;
const yOff = 0.055;
const zOff = 0.055;
const backgroundColor = '#E5E5FD';

let container;
let canvas;           
let ctx;
let circles;
let circleProps;
let simplex;
let baseHue;

function setup() {
	createCanvas();
  resize();
  initCircles();
	draw();
}

function initCircles() {
  circleProps = new Float32Array(circlePropsLength);
  simplex = new SimplexNoise();
  baseHue = 220;

  let i;

  for (i = 0; i < circlePropsLength; i += circlePropCount) {
    initCircle(i);
  }
}

function initCircle(i) {
  let x, y, n, t, speed, vx, vy, life, ttl, radius, hue;

  x = rand(canvas.a.width);
  y = rand(canvas.a.height);
  n = simplex.noise3D(x * xOff, y * yOff, baseHue * zOff);
  t = rand(TAU);
  speed = baseSpeed + rand(rangeSpeed);
  vx = speed * cos(t);
  vy = speed * sin(t);
  life = 0;
  ttl = baseTTL + rand(rangeTTL);
  radius = baseRadius + rand(rangeRadius);
  hue = baseHue + n * rangeHue;

  circleProps.set([x, y, vx, vy, life, ttl, radius, hue], i);
}

function updateCircles() {
  let i;

  baseHue++;

  for (i = 0; i < circlePropsLength; i += circlePropCount) {
    updateCircle(i);
  }
}

function updateCircle(i) {
  let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=5+i, i8=5+i;
  let x, y, vx, vy, life, ttl, radius, hue;

  x = circleProps[i];
  y = circleProps[i2];
  vx = circleProps[i3];
  vy = circleProps[i4];
  life = circleProps[i5];
  ttl = circleProps[i6];
  radius = circleProps[i7];
  hue = circleProps[i8];

  drawCircle(x, y, life, ttl, radius, hue);

  life++;

  circleProps[i] = x + vx;
  circleProps[i2] = y + vy;
  circleProps[i5] = life;

  (checkBounds(x, y, radius) || life > ttl) && initCircle(i);
}

function drawCircle(x, y, life, ttl, radius, hue) {
  ctx.a.save();
  ctx.a.fillStyle = `hsla(${hue},95%,84%,${fadeInOut(life,ttl)})`;
  ctx.a.beginPath();
  ctx.a.arc(x,y, radius, 0, TAU);
  ctx.a.fill();
  ctx.a.closePath();
  ctx.a.restore();
}

function checkBounds(x, y, radius) {
  return (
    x < -radius ||
    x > canvas.a.width + radius ||
    y < -radius ||
    y > canvas.a.height + radius
  );
}

function createCanvas() {
  container = document.querySelector('.content--canvas');
	canvas = {
		a: document.createElement('canvas'),
		b: document.createElement('canvas')
	};
	canvas.b.style = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
    height: 100%;
    opacity: 0.5;
	`;
	container.appendChild(canvas.b);
	ctx = {
		a: canvas.a.getContext('2d'),
		b: canvas.b.getContext('2d')
	};
}

function resize() {
	const { innerWidth, innerHeight } = window;
	
	canvas.a.width = innerWidth;
  canvas.a.height = innerHeight;

  ctx.a.drawImage(canvas.b, 0, 0);

	canvas.b.width = innerWidth;
  canvas.b.height = innerHeight;
  
  ctx.b.drawImage(canvas.a, 0, 0);
}

function render() {
  ctx.b.save();
  ctx.b.filter = 'blur(60px)';
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}

function draw() {
  ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
  ctx.b.fillStyle = backgroundColor;
  ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);
  updateCircles();
  render();
	window.requestAnimationFrame(draw);
}

/* util */

window.addEventListener('load', setup);
window.addEventListener('resize', resize);

const { PI, cos, sin, abs, sqrt, pow, round, random, atan2 } = Math;
const HALF_PI = 0.5 * PI;
const TAU = 2 * PI;
const TO_RAD = PI / 180;
const floor = n => n | 0;
const rand = n => n * random();
const randIn = (min, max) => rand(max - min) + min;
const randRange = n => n - rand(2 * n);
const fadeIn = (t, m) => t / m;
const fadeOut = (t, m) => (m - t) / m;
const fadeInOut = (t, m) => {
	let hm = 0.5 * m;
	return abs((t + hm) % m - hm) / (hm);
};
const dist = (x1, y1, x2, y2) => sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1);
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;
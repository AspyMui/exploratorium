import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // 70
  window.innerWidth / window.innerHeight,
  0.1, // 1
  10000 // 1000
);
camera.position.set(0, 250, 1000);
scene.add(camera);

// Lighting
const light = new THREE.SpotLight(0xffffff, 1.5);
light.position.set(0, 1500, 200);
light.angle = Math.PI * 0.2;
light.castShadow = true;
light.shadow.camera.near = 200;
light.shadow.camera.far = 2000;
light.shadow.bias = -0.000222;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
scene.add(light);

// Shadow Plane
const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
planeGeometry.rotateX(-Math.PI / 2);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);

// Grid
const grid = new THREE.GridHelper(2000, 100);
grid.position.y = 0;
grid.material.opacity = 0.25;
grid.material.transparent = true;
scene.add(grid);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.damping = 0.2;
controls.addEventListener('change', render);

// Some basic materials to work with
const materials = {
  red: new THREE.MeshLambertMaterial({ color: 0xff0000 }),
  green: new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
  blue: new THREE.MeshLambertMaterial({ color: 0x0000ff }),
  aspyAmber: new THREE.MeshLambertMaterial({ color: 0xf4c430 }),
  desCyan: new THREE.MeshLambertMaterial({ color: 0x00fffa })
};

// Helper stats to show fps
const stats = new Stats();
document.body.appendChild(stats.dom);

// They got me guys....
function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}
animate();

function render() {
  renderer.render(scene, camera);
}

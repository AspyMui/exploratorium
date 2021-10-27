// Path Data
import paths from './paths.json';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { PointLightShadow } from 'three';

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

// const transformControl = new TransformControls(camera, renderer.domElement);
// transformControl.addEventListener('change', render);
// transformControl.addEventListener('dragging-changed', function (event) {
//   controls.enabled = !event.value;
// });
// scene.add(transformControl);

// Some basic materials to work with
const materials = {
  red: new THREE.MeshLambertMaterial({ color: 0xff0000 }),
  green: new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
  blue: new THREE.MeshLambertMaterial({ color: 0x0000ff }),
  aspyAmber: new THREE.MeshLambertMaterial({ color: 0xf4c430 }),
  desCyan: new THREE.MeshLambertMaterial({ color: 0x00fffa })
};

// Simple Cube Class
class Cube {
  constructor(material, scene) {
    this.material = material;
    this.geometry = new THREE.BoxGeometry(10, 10, 10);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.y = 10;

    scene.add(this.mesh);
  }

  animate() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}

// const testCube = new Cube(materials.aspyAmber, scene);

class Path {
  constructor(points, scene, options = {}) {
    this.points = points.map(point => new THREE.Vector3(point[0], 0, point[1]));
    this.material = options.hasOwnProperty('material')
      ? options.material
      : new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.mesh = new THREE.Line(this.geometry, this.material);

    // Line Vertices
    this.pointRadius = options.hasOwnProperty('pointRadius')
      ? options.pointRadius
      : 0;
    points.forEach(point => {
      const geometry = new THREE.CircleGeometry(this.pointRadius, 32);
      const circle = new THREE.Mesh(geometry, this.material);
      circle.position.x = point[0];
      circle.position.z = point[1];
      circle.rotateX(-Math.PI / 2);
      scene.add(circle);
    });

    scene.add(this.mesh);
  }
}

paths.forEach(set => {
  // Build path set
  // set.nodes
  // set.id
  let path = new Path(set.nodes, scene, { pointRadius: 1 });
});

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
  // testCube.animate();
}

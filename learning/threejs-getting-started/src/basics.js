import * as THREE from 'three';

// Say hi to des!
console.log('Hello Des!');

// Setup scene
const scene = new THREE.Scene();

// Setup camera (There are more types but tut shows off this one)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Render for doing the rendering (this what makes thing show on screen woot)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Some basic materials to work with
const materials = {
  red: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  green: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  blue: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  aspyAmber: new THREE.MeshBasicMaterial({ color: 0xf4c430, wireframe: true }),
  desCyan: new THREE.MeshBasicMaterial({ color: 0x00fffa, wireframe: true })
};

//////////////////////////
// LEARNING ABOUT CUBES //
//////////////////////////

// BoxGeometry | I believe geometries are used to define basic shapes in three.js
const boxGeo = new THREE.BoxGeometry();
// Setting up an array of cubes
const cubes = [
  new THREE.Mesh(boxGeo, materials.aspyAmber),
  new THREE.Mesh(boxGeo, materials.desCyan)
];

// Just setting some basic positioning
cubes[0].translateX(-2.5);
cubes[1].translateX(2.5);

// Add cubes to scene
scene.add(...cubes);

//////////////////////////
// LEARNING ABOUT LINES //
//////////////////////////

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 5 });
const points = [];
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(1, 0, 0));
points.push(new THREE.Vector3(1, 1, 0));
points.push(new THREE.Vector3(0, 1, 0));
points.push(new THREE.Vector3(0, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);

scene.add(line);

// Set camera z location to 5? Why 5?
camera.position.z = 5;

// They got me guys....
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });
}
animate();

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

// Lets make a cube, yay!
// Setup a basic box geometry. I assume this is some sort of mesh
const geometry = new THREE.BoxGeometry();

// Setup a basic mesh material. Looks like color is in hex format and needs leading 0x
const mat1 = new THREE.MeshBasicMaterial({ color: 0xf4c430 });
const mat2 = new THREE.MeshBasicMaterial({ color: 0xf40000 });

// Setup an actual mesh with the geometry mesh and the material mesh
const cubes = [new THREE.Mesh(geometry, mat1), new THREE.Mesh(geometry, mat2)];

cubes[0].translateX(-2.5);
cubes[1].translateX(2.5);

scene.add(...cubes);

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

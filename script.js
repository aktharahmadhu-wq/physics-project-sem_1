// Create 3D scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Magnetic poles
const poleGeometry = new THREE.BoxGeometry(0.3, 1.2, 1.2);
const northMat = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const southMat = new THREE.MeshPhongMaterial({ color: 0x0000ff });

const north = new THREE.Mesh(poleGeometry, northMat);
north.position.set(-1.5, 0, 0);
scene.add(north);

const south = new THREE.Mesh(poleGeometry, southMat);
south.position.set(1.5, 0, 0);
scene.add(south);

// Coil (copper ring)
const coilGeometry = new THREE.TorusGeometry(0.6, 0.07, 16, 100);
const coilMaterial = new THREE.MeshPhongMaterial({ color: 0xff8c00 });
const coil = new THREE.Mesh(coilGeometry, coilMaterial);
scene.add(coil);

// Shaft (gray cylinder)
const shaftGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5);
const shaftMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
shaft.rotation.z = Math.PI / 2;
scene.add(shaft);

// Magnetic field arrows (cyan)
const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const arrowGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1);
for (let i = -0.5; i <= 0.5; i += 0.25) {
  const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
  arrow.rotation.z = Math.PI / 2;
  arrow.position.set(0, i, 0);
  scene.add(arrow);
}

// Camera position
camera.position.z = 4;

// Animate rotation (simulate motor movement)
let angle = 0;
function animate() {
  requestAnimationFrame(animate);
  
  angle += 0.05;
  coil.rotation.y = angle; // Spin coil
  shaft.rotation.y = angle;

  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

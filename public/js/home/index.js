// jshint esversion: 6
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
// import * as dat from 'dat.gui';

console.log("hello");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();



// When referencing properties of the window object ie. window.innerWidth you dont need to add the window. prefix as the browser will know what your refrencing
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio); //to make rendered objects less jagged and more clear on bad resolutions
document.body.appendChild(renderer.domElement);

camera.position.z = 5; //moves camera along z axis by 5 unit !look up units in mongoose doc


// When inserting objects into three.js you need a geometry (objects vertices) and you need a material (what goes in on top to fill in space between vertices)
const planeGeometry = new THREE.PlaneGeometry(6, 6, 6, 6);
const planeMaterial = new THREE.MeshPhongMaterial({color: 0x89CFF0, side: THREE.DoubleSide, flatShading: THREE.FlatShading});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(planeMesh); //adds object to scene
const {array} = planeMesh.geometry.attributes.position;
for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i+2] = z + Math.random()
    
}

// const gui = new dat.GUI();
// const world = {
//     plane: {
//         width: 10
//     }
// };
// gui.add(world.plane, 'width', 1, 500);


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0,0, 1); //x y and z arguement
scene.add(light);


function animate (){  //creates an animation loop to constantly show object when it changes is
    requestAnimationFrame(animate);
    renderer.render(scene, camera); //renders object
    // planeMesh.rotation.x += 0.01;
    // planeMesh.rotation.y +=0.01;
}

animate();
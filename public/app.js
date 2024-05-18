import * as THREE from "three";


import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const container = document.getElementById( 'canvas' );
const renderer = new THREE.WebGLRenderer({ antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth,window.innerHeight);
container.appendChild(renderer.domElement)



let wing;
let car;
const loader = new GLTFLoader().setPath( '3Dmodels/' );
loader.load('ma7.glb', function ( gltf ) {

        scene.add(gltf.scene);
        
        wing = gltf.scene.getObjectByName("Wing")
        console.log(wing)
        car = gltf.scene.getObjectByName("Car")
        console.log(car)
        wing.visible=false
        car.children[0].material.color=({b:0,g:0,isColor:true,r:0});
        

    }
);
new RGBELoader()
			        .setPath( 'textures/' )
					.load( 'royal_esplanade_1k.hdr', function ( texture ) {

						texture.mapping = THREE.EquirectangularReflectionMapping;

						scene.background = new THREE.Color( 0x202b2d );
						scene.environment = texture;
                    });

// const ambientLight=new THREE.AmbientLight(0xffffff,0.5);
// scene.add(ambientLight);

// const spotLight=new THREE.SpotLight(0xffffff,0.5);
// spotLight.position.set(100,1000,100);
// spotLight.map = new THREE.TextureLoader().load( 'textures/royal_esplanade_1k.hdr' );
// spotLight.castShadow = true;

// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;

// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;
// scene.add(spotLight);


// const spotLightHelper=new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper)

camera.position.set(6,3,0);

const controls=new OrbitControls(camera,renderer.domElement);
controls.maxPolarAngle = Math.PI/2; 
controls.minDistance = 6.5;
controls.maxDistance = 10;


function standard(){
    requestAnimationFrame(standard)
    renderer.render(scene, camera);
}
function animate(){
    renderer.render(scene, camera);
}

let selectTune=document.querySelector('.parts');
selectTune.addEventListener("change",(e) => {
    requestAnimationFrame(animate)
    console.log(e.target.value)
    if(e.target.value==="0"){
        wing.visible=false;
    }else if(e.target.value==="1"){
        wing.visible=true;
    }
})
let colorChange=document.getElementById("color");
colorChange.addEventListener("input",(e) =>{
    requestAnimationFrame(animate)
    const color = e.target.value
    const r = parseInt(color.substr(1,2), 16)/255
    const g = parseInt(color.substr(3,2), 16)/255
    const b = parseInt(color.substr(5,2), 16)/255
    car.children[0].material.color=({b:b,g:g,isColor:true,r:r});
})
standard()
controls.update();
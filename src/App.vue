<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import * as THREE from 'three';
import { onMounted } from 'vue';
import { threadId } from 'worker_threads';

import { use3DBackground } from './stores/use3DBackground';

import {RectAreaLightUniformsLib} from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

const background3D = use3DBackground()

// We use this class to pass to lil-gui
// so when it manipulates near or far
// near is never > far and far is never < near
// Also when lil-gui manipulates color we'll
// update both the fog and background colors.
class FogGUIHelper {

fog : any
backgroundColor : any

constructor(fog, backgroundColor) {
  this.fog = fog;
  this.backgroundColor = backgroundColor;
}
get near() {
  return this.fog.near;
}
set near(v) {
  this.fog.near = v;
  this.fog.far = Math.max(this.fog.far, v);
}
get far() {
  return this.fog.far;
}
set far(v) {
  this.fog.far = v;
  this.fog.near = Math.min(this.fog.near, v);
}
get color() {
  return `#${this.fog.color.getHexString()}`;
}
set color(hexString) {
  this.fog.color.set(hexString);
  this.backgroundColor.set(hexString);
}
}


class ColorGUIHelper {
  object: any
  prop : any
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}



const background = 'black'

const scene = new THREE.Scene();

scene.background = new THREE.Color(background)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
RectAreaLightUniformsLib.init();
onMounted(()=>{
  document.getElementById("render").appendChild(renderer.domElement);

})

let composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera));

let afterimagePass = new AfterimagePass()
afterimagePass.uniforms['damp'].value = 0.90
composer.addPass(afterimagePass);



const loader = new THREE.TextureLoader();
const texture = loader.load('./assets/metal.jpg')
const texture_cloud = loader.load('./assets/cloud.jpg');
const texture_point =  loader.load('./assets/images/lensflare0.png')
texture.colorSpace = THREE.SRGBColorSpace;

//groundlight 
const ground_light_color = 0x0000ff
const ground_light_intensity = 5000000
const ground_light_width = 10
const ground_light_height = 10
const ground_light = new THREE.RectAreaLight(ground_light_color, ground_light_intensity, ground_light_width, ground_light_height);
ground_light.position.set(0, 0, 4);
ground_light.rotation.x = THREE.MathUtils.degToRad(0);
const ground_light_helper = new RectAreaLightHelper(ground_light);
//ground_light.add(ground_light_helper)

const numberOfcubes = 100


const material = new THREE.MeshPhysicalMaterial({color:'white'});

const color = 0xeeeeee;
const intensity = 2;
const light = new THREE.AmbientLight(color, intensity);


//const ground_light = new THREE.

const cameraLight = new THREE.AmbientLight(0xffffff, 400)

//cameraLight.position.z = 10
//cameraLight.target.position.set(0,0,-5)

const gridSize = 10; // Number of cubes per row/column
const spacing = 3; // Spacing between cubes

for (let x = 0; x < gridSize; x++) {
  for (let y = 0; y < gridSize; y++) {
    const geometry = new THREE.BoxGeometry(2,2,Math.random()*10);
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
      x * spacing - (gridSize * Math.random()*4) / 2, // Center the grid
      y * spacing - (gridSize * spacing) / 2, // Center the grid
      20
      
    );
    scene.add(cube);
  }
}

// ground
const gound = new THREE.PlaneGeometry(100,100);

// Here are my 4 points which turn around 
class Point{
  color : number
  pointLight : any

  //Position is the same for the light and the material
  position : {x:number, y:number, z:number} = {x:0, y:0, z:21}

  // Material 
  material : any | null
  geometry : any | null
  mesh : any | null

  constructor(color:number, position:any){
    this.color = color
    this.pointLight = new THREE.PointLight(this.color, 100)
    this.position = position
    this.material = new THREE.MeshPhysicalMaterial({color : this.color})
    this.geometry = new THREE.SphereGeometry(0.2, 16,16);
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    /// Init Three caract
    this.geometry.blending = THREE.AdditiveBlending;
    this.geometry.transparent = true;
    this.geometry.opacity = 0.7;
  }

  UpdatePosition(newPositon : {x:number, y:number, z:number}){
    this.position = newPositon
    this.pointLight.position.set(newPositon.x, newPositon.y, newPositon.z);
    this.mesh.position.set(newPositon.x, newPositon.y, newPositon.z - 0.34)
  }
}
//Point
let points : Point[] = [new Point(0xff0000,{x:0, y:0, z:21}), 
new Point(0x00ff00, {x:4, y:-3, Z:22}),
new Point(0xaaaa00, {x:10, y:10, z:23} )
]



scene.add(new THREE.Mesh(gound, new THREE.MeshStandardMaterial({color:0x000000, map:texture_cloud})))
//scene.add(light)
//scene.add(cameraLight)
//scene.add(cameraLight.target)
scene.add(ground_light)
scene.add(light);
for (const point of points) {
  scene.add(point.pointLight);
  scene.add(point.mesh)
}
//FOG
const fog_exp = 0.08
const near = 1
var far = 22
scene.fog = new THREE.Fog(background, near, far);


// !!!!!! Helpers


const gui = new GUI();
const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);
gui.add(fogGUIHelper, 'near', 1, 100).name('Fog Near');
gui.add(fogGUIHelper, 'far', 1, 100).name('Fog Far');
gui.addColor(fogGUIHelper, 'color').name('Fog Color');

gui.add(camera.position, 'z', -100, 100)

gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2000, 0.03);

/* gui.add(points.red, 'intensity', 0, 100, 0.01)
gui.add(points.red.position, 'x', -50, 50 );
gui.add(points.red.position, 'y', -100, 100)
gui.add(points.red.position, 'z', -100, 100) */

function animate(){
  requestAnimationFrame(animate);
  composer.render();

  // Camera animation
  const time = performance.now() * 0.001; // time in sec
  const radius = 0.1 ; // camera movement radius

  camera.position.x = radius * Math.cos( time );
  camera.position.y = radius * Math.sin(time)

  const point1X = 10 * Math.sin(time* 0.3)
  const point1Y = 2.5 * Math.sin(4* time * 0.3)

  const point2X = 5 * Math.sin(time* 0.3)
  const point2Y = 0.5 * Math.sin(7* time * 0.3)

  points[0].UpdatePosition({x:point1X, y:point1Y, z:21})
  points[1].UpdatePosition({x:point2X, y:point2Y, z:22})
  points[2].UpdatePosition({x:(Math.cos( time *0.2) * 10), y:(Math.sin(time * 0.2) * 10), z:22})

  // Moving 
  // To change for calues
  if( background3D.updatingCameraZ == true){
    animateCamera()
  }
}

function animateCamera(){
  if(camera.position.z < background3D.cameraZ){
    camera.position.z += 0.1
    if (camera.position.z >= background3D.cameraZ){
      camera.psoition.z = background3D.cameraZ
      background3D.updatingCameraZ = false
    }
  }
}

function view1(){
  const startPos = camera.position
  const endPos = new THREE.Vector3(startPos.x, startPos.y, 50);
  let elapsedTime = 0; 
  const duration = 2;

  const delta = new THREE.clock.getDelta();
  elapsedTime += delta

  let t = elapsedTime / duration
  if (t < 1 ) t = 1;

  
}

animate();
</script>

<template>
  <div id="render"></div>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
      </nav>
  </header>

  <Transition mode="in-out" name="fade">

      <RouterView />
   
   
  </Transition>
  
</template>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
#render{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;

}
header {
  line-height: 1.5;
  max-height: 100vh;
  position: fixed;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  padding-block: 1rem;
  top: 10px;
  z-index: 800;
}


.wrapper{
  padding-inline: 20px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  margin: unset;
  position: relative;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-flow: row nowrap;
  text-align: center;
  border-radius: 2rem;
  padding-inline: 20px;
  backdrop-filter: blur(2rem);
  -webkit-backdrop-filter: blur(2rem);
}

nav a.router-link-exact-active {
  color: var(--color-text);
  background-color: rgba(255,255,255,1);
  border-radius: 2rem;
  color: black;
}


nav a {
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 40px;
    margin-top: 1rem;
  }
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import FogGUIHelper from '@/models/FogGUIHelper'

import * as THREE from 'three';
import { onMounted } from 'vue';
import { threadId } from 'worker_threads';

import { backgroundPosition, use3DBackground } from './stores/use3DBackground';

import {RectAreaLightUniformsLib} from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

const background3D = use3DBackground()





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



const background = 0x3e3e3e

const scene = new THREE.Scene();

scene.background = new THREE.Color(background)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 44


const renderer = new THREE.WebGLRenderer({
  antialias:true, 
  alpha:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
RectAreaLightUniformsLib.init();
onMounted(()=>{
  document.getElementById("render").appendChild(renderer.domElement);
})

let composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera));

let afterimagePass = new AfterimagePass()
afterimagePass.uniforms['damp'].value =   0.80
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
    this.material = new THREE.MeshPhongMaterial({color : this.color})
   /*  this.material = new THREE.PointsMaterial({
      size:0.0005,
      color: this.color,
      tranparent: true,
      fog:false
    }) */
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
let points : Point[] = [new Point( background3D.position == backgroundPosition.down ? 0xff0000 : 0x0000aa ,{x:0, y:0, z:21}), 
new Point(background3D.position == backgroundPosition.down ? 0x00ff00 : 0x0000aa, {x:4, y:-3, Z:22}),
new Point(background3D.position == backgroundPosition.down ? 0xaaaa00 : 0x0000aa, {x:10, y:10, z:23} )
]



//scene.add(new THREE.Mesh(gound, new THREE.MeshStandardMaterial({color:0x000000, map:texture_cloud})))
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

  if(background3D.position == backgroundPosition.down){
    const point1X = 10 * Math.sin(time* 0.3)
    const point1Y = 2.5 * Math.sin(4* time * 0.3)

    const point2X = 5 * Math.sin(time* 0.3)
    const point2Y = 0.5 * Math.sin(7* time * 0.3)

    points[0].UpdatePosition({x:point1X, y:point1Y, z:21})
    points[1].UpdatePosition({x:point2X, y:point2Y, z:22})
    points[2].UpdatePosition({x:(Math.cos( time *0.2) * 10), y:(Math.sin(time * 0.2) * 10), z:22})
  }
  if (background3D.position == backgroundPosition.up){
    points[2].UpdatePosition({x:(Math.cos(time*2 + 10)), y:(Math.sin(time+10)), z:35})
    points[1].UpdatePosition({x:(Math.cos(-time)), y:(Math.sin(-time)), z : 34})
    points[0].UpdatePosition({x:(Math.sin(-time)), y:(Math.cos(-time)), z : 34})
  }


  // Moving 
  // To change for calues
  if( background3D.updatingCameraZ){
    animateCamera(time)
  }
}

const cameraSpeedFactor = 0.006
function animateCamera(time : number){
  // Linear interpolation
  camera.position.z = THREE.MathUtils.lerp(camera.position.z, background3D.cameraZ, time * cameraSpeedFactor);

  if (Math.abs(camera.position.z - background3D.cameraZ) < 0.01){
    camera.position.z = background3D.cameraZ;
    background3D.updatingCameraZ = false;
  }
}
animate();
</script>

<template>
  <div id="render"></div>
  <header>

        <transition name="fade">
          <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/projects">Projects</RouterLink>
          </nav>
         
        </transition>
  </header>

  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="$route.fullPath"></component>
    </transition>
   
  </RouterView>

</template>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transform: translateY(0px);
  opacity: 1s;
  transition: all 0.4s ease;
  
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  transform: translateY(300px);
  opacity: 0;
  transition: all .4s ease;
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
  display: block;
  flex-flow: row nowrap;
  justify-content: center;
  padding-block: 1rem;
  top: 10px;
  z-index: 800; 
  padding-inline: unset;
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
  display: block;
  flex-flow: row nowrap;
  text-align: center;
  padding-inline: 20px;
  backdrop-filter: blur(2rem);
  -webkit-backdrop-filter: blur(2rem);
}

nav a.router-link-exact-active {
  color: var(--color-text);
  background-color: rgba(255,255,255,1);
  color: black;
  opacity: 1;
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

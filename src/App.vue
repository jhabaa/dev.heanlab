<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import FogGUIHelper from '@/models/FogGUIHelper'

import * as THREE from 'three';
import { onMounted , ref} from 'vue';

import { backgroundPosition, use3DBackground } from './stores/use3DBackground';

import {RectAreaLightUniformsLib} from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
const background3D = use3DBackground()


const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

class ColorGUIHelper {
  object: any
  prop : any
  constructor(object: any, prop: any) {
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
camera.focus = 0.1

const renderer = new THREE.WebGLRenderer({
  alpha:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
RectAreaLightUniformsLib.init();
onMounted(()=>{
  const renderElement = document.getElementById("render");
  if (renderElement) {
    renderElement.appendChild(renderer.domElement);
  }

  document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX -  windowHalf.x) ;
    mouse.y =(event.clientY - windowHalf.y) ;
  }, false);
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

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
const ground_light_color = 0x3EE2FF
const ground_light_intensity = 50
const ground_light_width = 10
const ground_light_height = 10
const ground_light = new THREE.RectAreaLight(ground_light_color, ground_light_intensity, ground_light_width, ground_light_height);
ground_light.position.set(0, 0, -1);
ground_light.rotation.x = THREE.MathUtils.degToRad(180);
const ground_light_helper = new RectAreaLightHelper(ground_light);
//ground_light.add(ground_light_helper)

const numberOfcubes = 100


const material = new THREE.MeshPhysicalMaterial({color:'white'});

const color = 0xeeeeee;
const intensity = 5;
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
const cubeMaterial =   new THREE.MeshPhysicalMaterial({
    metalness: 0.5,
    roughness: 0.5,
    envMapIntensity: 0.9, 
    clearcoat: 0.5,
    transparent: true,
    opacity : 0.8,
    reflectivity: 0.8,
    ior:0.9,
    side: THREE.DoubleSide,
    thickness: 0.1,
    transmission: 0.9,
  })
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 0.5),
  cubeMaterial
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  cubeMaterial
);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  cubeMaterial
);

scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
cube3.position.set(0, -4, 32);
cube2.position.set(-5, 4, 32);
cube1.position.set(10, -5, 30);

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
let points : Point[] = [new Point( background3D.position == backgroundPosition.down ? 0x3EE2FF : 0x0000aa ,{x:0, y:0, z:21}), 
new Point(background3D.position == backgroundPosition.down ? 0x3EE2FF : 0x0000aa, {x:4, y:-3, Z:22}),
new Point(background3D.position == backgroundPosition.down ? 0x3EE2FF : 0x0000aa, {x:10, y:10, z:23} )
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


/* const gui = new GUI();
const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);
gui.add(fogGUIHelper, 'near', 1, 100).name('Fog Near');
gui.add(fogGUIHelper, 'far', 1, 100).name('Fog Far');
gui.addColor(fogGUIHelper, 'color').name('Fog Color');

gui.add(camera.position, 'z', -100, 100)

gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2000, 0.03); */

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

  target.x = (1 -  mouse.x) * 0.0002;
  target.y = (1 - mouse.y) * 0.0002;
  camera.rotation.x += (target.x - camera.rotation.x) * 0.05;
  camera.rotation.y += (target.y - camera.rotation.y) * 0.05;
 
  //Cube movements
  cube1.rotation.x = time * 0.05;
  cube1.rotation.y = time * 0.05;

  cube2.rotation.x = time * 0.1;
  cube2.rotation.y = time * 0.1;

  cube3.rotation.x = time * 0.2;
  cube3.rotation.y = time * 0.2;
  cube3.rotation.z = time * 0.2;

/*   camera.position.x = radius * Math.cos( time );
  camera.position.y = radius * Math.sin(time) */

  if(background3D.position == backgroundPosition.down){
    const point1X = 10 * Math.sin(time* 0.3)
    const point1Y = 2.5 * Math.sin(4* time * 0.3)

    const point2X = 5 * Math.sin(time* 0.3)
    const point2Y = 0.1 * Math.sin(7* time * 0.3)

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

const cameraSpeedFactor = 0.0006
function animateCamera(time : number){
  // Linear interpolation
  camera.position.z = THREE.MathUtils.lerp(camera.position.z, background3D.cameraZ, time * cameraSpeedFactor);

  if (Math.abs(camera.position.z - background3D.cameraZ) < 0.01){
    camera.position.z = background3D.cameraZ;
    background3D.updatingCameraZ = false;
  }
}
animate();

// Navbar options
const navbarExtended = ref(false)
</script>

<template>
  <div id="render"></div>
  <div class="back" v-if="background3D.position.toString() == '1'">
  </div>
  <header>

        <transition name="fade">
          <nav :class="navbarExtended ? 'extended' : ''" @click="navbarExtended = !navbarExtended">
            <div class="pill" :class="navbarExtended ? 'extended' : ''">
              <span class="text">Menu</span>
              <div class="bars" >
                <span></span>
                <span></span>
                <span></span>
              </div>
              
            </div>
            <div class="links">
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/about">About</RouterLink>
              <RouterLink to="/projects">Projects</RouterLink>
              <RouterLink to="/prototypes">Prototypes</RouterLink>
            </div>
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
  z-index: 1;
}

.back{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  z-index: 2;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 1s ease-in-out;
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
  display: flex;
  place-items: center;
  flex-flow: row nowrap;
  text-align: center;
  padding-inline: 20px;
  backdrop-filter: blur(2rem);
  -webkit-backdrop-filter: blur(2rem);
}

nav a.router-link-exact-active {
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
@media screen and (max-width: 800px) {
  header {
    display: flex;
    text-align: center;
    height: 100px;
  }

  .logo {
    margin: 0 auto 2rem;
  }

  nav .pill {
    display: flex;
    z-index: 100;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 33px;
    font-weight: 400;
    color: white;
  }

  nav .pill .bars > span {
    display: block;
    width: 30px;
    height: 3px;
    background-color: white;
    margin: 5px auto;
    transition: all 0.4s ease-in-out;
  }

  nav .links {
    display: none;
  }

  nav .pill.extended .bars > span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  nav .pill.extended .bars > span:nth-child(2) {
    opacity: 0;
  }
  nav .pill.extended .bars > span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
  nav .pill:hover {
    cursor: pointer;
  }

  nav.extended {
    flex-flow: column nowrap;
    height: fit-content;
    max-height: fit-content;
    gap: 30px;
    padding-block: 2rem;
    transition: all 0.4s ease-in-out;
  }

  nav.extended .links {
      display: flex;
      flex-flow: column nowrap;
      width: 100%;  
      font-size: 30px;
      padding: 0 1rem;
      gap: 20px;
      transition: all 0.4s ease;
  }
  
}

@media (min-width: 801px) {

  nav .pill {
    display: none;
  }
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

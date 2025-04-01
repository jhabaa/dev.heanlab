<script lang="ts" setup>
    import TitleItem  from '@/components/TitleItem.vue';
    import  { use3DBackground } from '@/stores/use3DBackground'
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { onMounted } from 'vue';
    import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

    import modelURL from '@/assets/model_me.glb';
import { titlePosition } from '@/models/TittleItem';

/*     const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1.6
    camera.position.y = 1

    const loader = new GLTFLoader();
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff, 10);
    light2.castShadow = true
    light2.position.y = 10
    light2.target.x = 0
    light2.target.y = 1
    light2.target.z = 2
    //scene.add(light2)

    const plane_geometry = new THREE.PlaneGeometry(1,3);
    const plane_material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide});
    const plane = new THREE.Mesh(plane_geometry, plane_material)
    plane.rotateX(1.4)
    plane.receiveShadow = true;
    scene.add(plane)


    let mixer = new THREE.AnimationMixer()
    loader.load(modelURL, function (gltf) {
        scene.add(gltf.scene);
        //Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
        const clip = Object.values(gltf.animations)[0]
        const action = mixer.clipAction(clip)
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play();

        mixer.addEventListener('finished', () => {
            console.log ("animaiton finished")
            // Now, we'll free this memory
            renderer.dispose()
            // Now hide and show the text a bit 
            document.getElementById("render1")?.classList.add("hide")
        })
    })

    const renderer = new THREE.WebGLRenderer({
        antialias:true, 
        alpha:true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop( animate )
    renderer.shadowMap.enabled = true

    onMounted( () => {
        document.getElementById("render1").appendChild(renderer.domElement)
    })

    const gui = new GUI()
    //Camera gui
    gui.add(camera.position,'z', -100, 100)
    gui.add(camera.position,'y', -100, 100)
    gui.add(camera.position,'x', -100, 100)

    let then = 0;
    function animate(){
        const time = performance.now() * 0.001
        const delta = time - then
        then = time
        renderer.render(scene, camera)
        mixer.update(delta)
    } */

</script>
<template>

  <div class="wrapper">

    <TitleItem title="About" subtitle="bio | awards | client | services | contact" :position="titlePosition.Top"></TitleItem>
    
    <Transition>
        <div id="render1"></div>
    </Transition>
   
    <div class="content">
      <p>
          Passionate about innovation and creativity, I specialize in developing cutting-edge solutions at the intersection of <strong>web</strong>, <strong>mobile</strong>, <strong>AI</strong>, and <strong>immersive technologies</strong>. My expertise spans from <strong>full-stack development</strong> to <strong>3D interactive experiences</strong> and advanced software architectures.
      </p>
      <br>
      <h2>My Approach</h2>
      <p>
          Always striving for efficiency and optimization, I build modern applications leveraging technologies such as <strong>Flask</strong>, <strong>.NET</strong>, <strong>Vue.js</strong>, <strong>React</strong>, and <strong>Three.js</strong>. My workflow integrates <strong>Docker</strong> for scalability, <strong>RabbitMQ</strong> for message-driven architectures, and <strong>microservices</strong> for high-performance systems.
      </p>
      <p>
          I focus on delivering <strong>high-performance and immersive user experiences</strong>, using advanced tools like <strong>WebGL</strong> and <strong>Framer Motion</strong> to create seamless and captivating animations.
      </p>
      <br>
      <h2>Experience & Expertise</h2>
      <p>
          I have worked on a wide range of projects, from healthcare platforms to immersive digital experiences. My expertise extends to <strong>cloud computing</strong>, <strong>DevOps</strong>, and <strong>distributed systems</strong>. My mission: blending **technology and creativity** to craft impactful digital solutions.
      </p>
      <br>
      <h2>Key Technologies</h2>
      <p>
          🔹 Backend: Python (Flask, FastAPI), .NET, Node.js <br>
          🔹 Frontend: Vue.js, React, Three.js <br>
          🔹 DevOps: Docker, CI/CD, Kubernetes <br>
          🔹 3D & Motion: WebGL, GSAP, Framer Motion <br>
      </p>
      <br>
      <h2>Vision</h2>
      <p>
          My goal is to push the boundaries of digital innovation by merging <strong>artificial intelligence</strong>, <strong>interactive design</strong>, and <strong>cutting-edge technologies</strong>. I am constantly exploring new possibilities to craft experiences that redefine how people interact with the digital world.
      </p>

    </div>
  </div>
</template>

<style>

#render1{
    min-width: 300px;
    min-height: 500px;
}

#render1.hide{
    display: none;
}

.wrapper{
    padding: 20px;
    display: flex;
    flex-flow: column wrap;
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    justify-content: center;
    align-items: center;
    width: 100%;
    top: 10px;
    position: relative;
    background-color: unset;
    z-index: 1;
}

.content{
    width: 100%;
    max-width: 1000px;
    padding: 20px;
    display: flex;
    flex-flow: column wrap;
    gap: 20px;
}

p{
    font-size: clamp(20px, 2vw, 30px);
    line-height: 1.5;
    opacity: .8;
}
</style>

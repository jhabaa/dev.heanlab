<script lang="ts" setup>
import { useProjectsStore } from '@/stores/useProjects'
import  Project  from '@/models/Project'
import TitleItem from '@/components/TitleItem.vue'
import Card1 from '@/components/Card1.vue'
//import '@splidejs/vue-splide/css';
import '@splidejs/splide/css/core';
import FogGUIHelper from '@/models/FogGUIHelper';
const projectsStore = useProjectsStore()
const splideref = ref<any>(null)
projectsStore.fetch()

import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { onMounted, ref } from 'vue';
    import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

    import modelURL from '@/assets/model_me_time_3.glb';
    import { isTypeQueryNode } from 'typescript';
    import { titlePosition } from '@/models/TittleItem';

    const selectedProject  = ref(Project) 

/*     const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2
    camera.position.y = 1

    const sceneFogFar = 100
    const sceneFogNear = 1 
    scene.fog = new THREE.Fog(0x3e3e3e, sceneFogNear, sceneFogFar )

    const background_img = new THREE.TextureLoader();


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

    const planeLight1 = new THREE.DirectionalLight(0xffffff, 10);
    planeLight1.castShadow = true
    planeLight1.position.z = -40
    planeLight1.target.x = 0
    scene.add(planeLight1)

    const planeLight2 = new THREE.DirectionalLight(0xffffff, 100);
    planeLight2.castShadow = true
    planeLight2.position.z = -40
    planeLight2.target.x = 0
    planeLight2.target.y = 2
    planeLight2.target.z = -50
    scene.add(planeLight2)


    // CAMERA ANimation 
    const loopDuration = 20;
    const basePosition = {x:0, y:1, z:1}
    const amplitude = { x: 0.2, y:0.5, z:.2}


    let mixer = new THREE.AnimationMixer()
    loader.load(modelURL, function (gltf) {
        scene.add(gltf.scene);

        //Adding head target 
        const faceTarget = new THREE.Object3D()
        faceTarget.position.set(0.00144, 1, 0)
        gltf.scene.add(faceTarget)
        console.log(gltf.scene.children[0].children[2])
        window.faceTarget = faceTarget;

        //Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
        const clip = Object.values(gltf.animations)[0]
        const action = mixer.clipAction(clip)
        //action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play();
    })
 */


/*     function getImageURL(name:String){
        return new URL(`/src/assets/images/${name}`, import.meta.url).href
    }

    onMounted( () => {
        const renderer = new THREE.WebGLRenderer({
        antialias:true, 
        alpha:true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop( animate )
        renderer.shadowMap.enabled = true

        document.getElementById("back_projects").appendChild(renderer.domElement)
        const canvas = document.querySelector('.c')
        //, Listen SPlide moves
        const splideInstance = splideref.value.splide
        splideInstance.on('moved', (newIndex: number) => {
            let t = projectsStore.projects[newIndex]
            scene.remove(background_img)
            background_img.load(getImageURL(t.Image), (texture) => {
                //scene.background = texture
                // Now Let's draw our plane 
                const placeGeometry = new THREE.PlaneGeometry(150, 120)
                const planeMaterial = new THREE.MeshPhysicalMaterial({map:texture});

                const backgroundPlane = new THREE.Mesh(placeGeometry, planeMaterial);
                backgroundPlane.position.set(0,2,-50);
                scene.add(backgroundPlane)
            })
            
            console.log(t.Image)
        })

        let then = 0;

        

        function animate(){
            const time = performance.now() * 0.001
            const delta = time - then
            then = time
           

            // CAMERA
            const t = (time % loopDuration)/loopDuration
            const twopPI = Math.PI * 2
            camera.position.x = basePosition.x + amplitude.x * Math.cos(twopPI * t)
            camera.position.y = basePosition.y + amplitude.y * Math.sin(twopPI * t)
            camera.position.z = basePosition.z - amplitude.z * Math.sin(twopPI * t)
            //camera.lookAt({x:0, y:1, z:2})

            if (window.faceTarget){
                const targetPos = new THREE.Vector3();
                window.faceTarget.getWorldPosition(targetPos);
                targetPos.y += .5

                camera.lookAt(targetPos)
            }


            renderer.render(scene, camera)
            mixer.update(delta)
        }

        
        const gui = new GUI()
        //Camera gui
        const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);
        gui.add(fogGUIHelper, 'near', 1, 100).name('Fog Near');
        gui.add(fogGUIHelper, 'far', 1, 100).name('Fog Far');
        gui.addColor(fogGUIHelper, 'color').name('Fog Color');
        gui.add(camera.position,'z', -100, 100, 0.0001)
        gui.add(camera.position,'y', -100, 100)
        gui.add(camera.position,'x', -100, 100)

    })

    function overProject(project : Project){
        projectsStore.selectedProject = project
    }
    function quitProject(){
        projectsStore.selectedProject = null
    }
 */

</script>
<template>
    <div id="back_projects"></div>
    <div class="c"></div>
    <main>
        <TitleItem title="Projects" subtitle="visual fx | AI | web | mobile | game " :position="titlePosition.Top"></TitleItem>
        <div class="project_infos">
            <div class="content">
                <h1></h1>
            </div>
        </div>
        <div class="list">
                <div v-for="project in projectsStore.projects" :key="project.id">
                    <Card1 :project="project"></Card1>
                </div>
        </div>

    </main>

</template>

<style scoped>

#back_projects{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 2;
}
main{
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    padding: unset;
    margin: unset;
    width: 100%;
    height: 100vh;
    padding-top: 10vmin;
    align-items: center;
    z-index: 3;
}

.list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: calc(50px + 2vmin);
    width: 100%;
    max-width: 1900px;
    scrollbar-width: none;
    padding-inline: 20px;
}
</style>
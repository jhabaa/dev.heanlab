<script lang="ts" setup>
import TitleItem  from '@/components/TitleItem.vue';
import { onBeforeMount, onMounted } from 'vue';

import { titlePosition } from '@/models/TittleItem';
import { useAboutStore } from '@/stores/useAbout';
import { useTechnologiesStore } from '@/stores/useTechnologies';
import Award from '@/components/Award.vue';

const aboutStore = useAboutStore()
const techStore = useTechnologiesStore()
function getImageurl(_image: string) {
    return new URL(`/src/assets/images/${_image}`, import.meta.url).href;
}

onBeforeMount( async () => {
    await aboutStore.fetch()
    await techStore.fetch()
})

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
        <div id="render1" class="hide"></div>
    </Transition>
   <class class="brief">[Bio]</class>
    <img :src="getImageurl('me_desk.jpg')" alt="Working" id="me_working"/>
    <div class="content">
        <div v-html="aboutStore.data?.content"></div>
    </div>
    <class class="brief">[Stack]</class>
    <class class="stack">
        <div v-for="tech in techStore.data" :key="tech.name" class="logo">
            <img :src="getImageurl(tech.logo)" :alt="tech.name">
        </div>
    </class>

    <class class="brief">[Awards | Recognitions]</class>
    <div class="stack">
        <Award :object="{
            name: 'Python | Basics',
            logo: 'hackerrank.png',
            link: 'https://www.hackerrank.com/certificates/0e2a20cc416b'
        }"></Award>
        <Award :object="{
            name: 'Javascript | Basics',
            logo: 'hackerrank.png',
            link: 'https://www.hackerrank.com/certificates/iframe/e031cb9efb5e'
        }"></Award>
        <Award :object="{
            name: 'Swift | Expert',
            logo: 'codingame.png',
            link: 'https://www.codingame.com/certification/Cr15k0fUmpe9lD8k_2JJEw'
        }"></Award>
        <Award :object="{
            name: 'Hacking | Pentitionner',
            logo: 'hts.png',
            link: 'https://www.hackthissite.org/user/view/Hean/'
        }"></Award>
        
    </div>

    <class class="brief">[Booking | Contact | Connect]</class>
    <div class="stack">
            <Award :object="{
        name: '',
        logo: 'mail.png',
        link: 'mailto:jhubert@heanlab.com'
    }"></Award>
    <Award :object="{
        name: '',
        logo: 'linkedin.png',
        link: 'https://www.linkedin.com/in/hean/'
    }"></Award>
    <Award :object="{
        name: '',
        logo: 'github.png',
        link: 'https://github.com/jhabaa'
    }"></Award>
    <Award :object="{
        name: '',
        logo: 'gitlab.png',
        link: 'https://dev.heanlab.com/dashboard/projects/personal'
    }"></Award>
    <Award :object="{
        name: '',
        logo: 'youtube.png',
        link: 'https://www.youtube.com/channel/UCxH_ZLYyHog1q7Ul7rhXaHg'
    }"></Award>
    </div>

  </div>
</template>

<style scoped>

#render1{
    min-width: 300px;
    min-height: 500px;
}

#render1.hide{
    display: none;
}
#me_working{
    width: 100%;
    max-width: 800px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    margin-bottom: 20px;
}

.wrapper{
    padding: 20px;
    display: flex;
    flex-flow: column wrap;
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    justify-content: start;
    align-items: center;
    width: 100%;
    top: 10px;

    position: relative;
    background-color: unset;
    z-index: 3;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-bottom: 100px;
    overflow: hidden;
}


.wrapper::-webkit-scrollbar{
    display: none;
}

.content{
    width: 100%;
    max-width: 2000px;
    padding: 20px;
    display: flex;
    flex-flow: column wrap;
    gap: 20px;
    z-index: 2;
    padding-bottom: 100px;
    text-align: justify;
}
.content div{
    gap: 20px;
    display: flex;
    flex-flow: column wrap;
}

.content div h1{
    font-size: clamp(30px, 3vw, 50px);
    font-weight: 600;
    text-align: center;
    margin: 0;
    padding: 0;
    color: turquoise;
}

p{
    font-size: clamp(20px, 1.4, 30px);
    line-height: 1.5;
    opacity: .8;
}

.stack{
    width: 100%;
    max-width: 1000px;
    padding: 20px;
    display: flex;
    flex-flow: row wrap;
    gap: 1vw;
    z-index: 2;
    padding-bottom: 100px;
    align-items: center;
    justify-content: center;
}

@media only screen and (max-width: 800px) {
    .stack{
        gap: 20px;
    }
}

</style>

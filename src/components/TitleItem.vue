<script setup lang="ts">
import { onMounted, ref } from 'vue';
import anime from 'animejs/lib/anime.es.js'
import Project from '@/models/Project';

import { useProjectsStore } from '@/stores/useProjects';
import type { titlePosition } from '@/models/TittleItem';

const projectsStore = useProjectsStore()

    const props = defineProps<{
        title: String,
        subtitle: String,
        project: Project | null
        position: titlePosition
    }>()

    onMounted(()=>{
        let t = document.querySelectorAll(".block")
    if( t){
        window.addEventListener('scroll', (e)=>{
            
        if (window.scrollY > 100){
            anime({
                targets: t,
                opacity : 0,
                duration : 800,
                translateY: 200

            })
        }else{
            anime({
                targets: t,
                opacity : 1,
                duration : 800,
                translateY : 0
            })
        }
    })
    }
    })





</script>
<template>
    <div class="wrapper" :class="position">
       
        <div :class="projectsStore.getSelectedProject ? 'dark' : ''"></div>
        <div :class="position" class="block">
            <h1>
            {{ projectsStore.getSelectedProject ? projectsStore.getSelectedProject.Name : title  }}
            </h1>
            <h3>
             {{ projectsStore.getSelectedProject ? projectsStore.getSelectedProject.Title : subtitle }}
            </h3>
            <div class="content">
                <p>{{ projectsStore.getSelectedProject?.Description }}</p>
                
            </div>
        </div>
       
    </div>
</template>
<style scoped>
.wrapper{
    padding: unset;
    margin: unset;
    display: flex;
    flex-flow: column wrap;
    text-align: left;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 100%;
    height: 100%;
    top:0px;
}

.wrapper.left {
    position: fixed;
}

.wrapper.top{
    padding-top: 10vmin;
    position: relative;
}

.wrapper .dark{
    width: 100%;
    height: 100%;
    background: rgb(15,15,15);
    background: radial-gradient(circle, rgba(15,15,15,0) 0%, rgba(15,15,15,0.6551412801448704) 10%, rgba(0,0,0,1) 100%);
    transition: all .4s ease-in-out ;
}
.content{
    width: 100%;
    max-width: 800px;
    margin: auto;
    padding: 20px;
    display: flex;
    flex-flow: column wrap;
}
.content p{
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding-left: unset;
    margin-left: unset;
    max-width: 500px;
    height: 150px;
    text-overflow: ellipsis;
}
.link{
    padding-top: 30px;
}
.content a.router-link-exact-active{
    background-color: white;
    color: blue;
    font-weight: 700;
    font-size: clamp(25px, 2vw, 5vh);
    padding-inline: 20px;
    padding-block: 10px;
}

.block{
    padding: 10px;
    left: 10px;
    position: fixed;
    top: 15vmin;
}
.block.top{
    position: relative;
    text-align: center;
    top: unset;
}
h1{
    font-size: clamp(50px, 8vw, 70px);
    opacity: .6;

}
h3{
    font-size: clamp(10px, 2vw, 4ch);
    letter-spacing: 3px;
    text-transform: uppercase;
}
</style>
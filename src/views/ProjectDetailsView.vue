<script lang="ts" setup>
import TitleItem from '@/components/TitleItem.vue';
import Project from '@/models/Project';
import { titlePosition } from '@/models/TittleItem';
import router from '@/router';
import { useProjectsStore } from '@/stores/useProjects';
import { nextTick, onBeforeMount, onMounted, watch } from 'vue';
import { ref } from 'vue';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import  'videojs-youtube/dist/Youtube.min.js';

const projectsStore = useProjectsStore()
const project = ref<Project>()
const videoPlayer = ref<HTMLVideoElement | null>(null)
const frames = ref<string[]>([])

//projectsStore.select(currentProjectName)

async function onLoad() {
    await projectsStore.fetch()
    const currentProjectName = router.currentRoute.value.params.name
    // get project 
    project.value = projectsStore.projects.find(p => 
        p.Name == currentProjectName
    ) as Project

    project.value?.Frames.split(';').forEach(e => {
            frames.value.push(e)
    })

}

function getImageurl(_image: string) {
    if (!_image) return
    console.log(_image)
    const img_url = `/src/assets/images/${_image}`
    return new URL(img_url, import.meta.url).href;
} 

onMounted(async ()=>{
    await onLoad()
    //GithubButton()
    await nextTick();
    if (project.value?.video && videoPlayer.value){
        videojs(videoPlayer.value, {
        //Options
        sources: [{
        type: 'video/youtube',
        // Essayez avec l'URL "watch" au lieu de "embed" si nécessaire
        src: project.value.video
      }], 
      fluid:true
    });
    }


})




</script>

<template>
    <div class="wrapper-project-details">
        <div class="back"></div>
        <TitleItem :title="project?.Name" :subtitle="project?.keywords" :position="titlePosition.Top" :github-link="project?.Git"></TitleItem>

        <div v-if="project?.video">
            <div class="screen">
                    <video id="my-video" class="video-js" ref="videoPlayer" controls preload="auto" ></video>
            </div>
        </div>
        
        <div v-else="project?.Image">
            <div class="screen">
                <img :src="getImageurl(project?.Image)" class="project-image" :alt=" project?.Name ">
            </div>
        </div>

        <div class="project-data">
            <div class="data">
                <span>Client : </span>
                <span>{{ project?.Client }}</span>
            </div>
            <div class="data">
                <span>Role : </span>
                <span>{{ project?.Role }}</span>
            </div>
            <a :href="project.Link" v-if="project?.Link" class="external-link"> See the project </a>
        </div>

        <div class="content">
            <span class="brief">[Brief]</span>
            <div v-html="project?.Description" class="text"></div>
        </div>

        <div class="content">
            <span class="brief">[ selected frames | concept art | media ]</span>
            <div>{{ frames[0] }}</div>
            <div v-if="project?.Frames?.length" class="project-frames">
                <div class="project-frames-vertical">
                    <div v-for="frame in frames.filter(e => e.includes('vertical'))" :key="frame" class="project-frame-vertical">
                        <img :src="getImageurl(frame)" :alt="frame">
                    </div>
                </div>
                <div class="project-frames-horizontal">
                    <div v-for="frame in frames.filter(e => e.includes('horizontal'))" :key="frame" class="project-frame-horizontal">
                            <img :src="getImageurl(frame)" :alt="frame">
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped>

.wrapper-project-details{
    width: 100%;
    min-width: 300px;
    z-index: 5;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    max-width: 1500px;
    align-self: center;
    padding-bottom: 20vmin;
    gap: 10vmin;
    display: flex;
    flex-flow: column nowrap;
    scrollbar-width: 0px;
    -ms-overflow-style: none;
}
.wrapper-project-details::-webkit-scrollbar{
    display: none;
}

.project-frames{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    align-items: center;
    justify-content: center;
}
.project-frame-horizontal{
    width: 100%;
    aspect-ratio: 16/10;
    object-fit: fill;

}
.project-frame-vertical{
    width: 300px;
    aspect-ratio: 9/16;
    background-color: black;

}
.project-frame-vertical > img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.project-frame-horizontal > img{
    width: 100%;
}
img{
    overflow: auto;
    overflow-clip-margin: unset;
}
.project-frames-horizontal, .project-frames-vertical {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
.project-frames-vertical{
    flex-flow: row wrap;
}
.project-frames-horizontal{
    flex-flow: column nowrap;
}
.screen{
    display: flex;
    width: 100%;
    aspect-ratio: 16/9;
    background-color: rgba(0, 0, 0, 0.088);
    padding-inline: 10px;
    margin-block: 20px;
    place-content: center;
}

.brief{
    text-transform: uppercase;
    opacity: .8;
}
.project-data{
    display: flex;
    text-align: center;
    flex-flow: column wrap;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: clamp(20px, 1.3vw, 30px);
}

.external-link{
    margin-top: 30px;
    background-color: black;
    padding-inline: 30px;
    padding-block: 10px;
    border: 1px whitesmoke solid;
}

.data :first-child{
    font-family: 'Open Sans';
    font-weight: bold;
    opacity: 1;
    color: white;
}

.project-image{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.video-js{
    display: block;
    width: 90%;
    height: 90%;
    align-self: center;
    justify-self: center;
}

.content{
    padding-block: 10vmin;
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    align-self: center;
    gap: 100px;
    font-size: clamp(20px, 4ch, 30px);
    text-align: justify;
    text-wrap: pre;
    white-space: wrap;
    padding-inline: 20px;
}
.back{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.184);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: -1;
    opacity: 1;
}

@media screen and (max-width:800px){
    .content{
        padding-block: 10px;
        gap: 20px;
        font-size: 20px;
    }

    .brief{
        font-size: 15px;
    }
}
</style>
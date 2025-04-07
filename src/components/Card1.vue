<script setup lang="ts">
import  Project  from '@/models/Project';
import VanillaTilt from 'vanilla-tilt';
import { onMounted, Transition } from 'vue';

defineProps<{ project: Project }>()
function getImageurl(_image: string) {
    return new URL(`/src/assets/images/${_image}`, import.meta.url).href;
}

onMounted(()=>{
    // Lets load and init vanilla tilt 
    const cards = document.querySelectorAll(".card");
    VanillaTilt.init(Array.from(cards) as HTMLElement[], {
        max:25,
        speed:600,
        transition: true 
    })
})

</script>

<template>
    <RouterLink :to="`/projects/${project.Name}`">
        <div class="card">
        <img :src="getImageurl(project.Image)"  alt="" />
        <div class="infos">
            <h1 class="title">
                {{ project.Title }}
            </h1>
            <h2 class="description">
                {{ project.keywords }}
            </h2>
        </div>
    </div>
    </RouterLink>

</template>

<style scoped>
.card {
    display: flex;
    width: clamp(300px, 95vw, 700px);
    aspect-ratio: 19/9;
    position: relative;
    filter: grayscale(.7);
    -webkit-filter: grayscale(.7);
    z-index: 5;
    opacity: 1;
}

a{
    opacity: 1;
}

.infos{
    height: 100px;
    width: 100%;
    background-color: rgba(0, 0, 0, .8);
    color: whitesmoke;
    padding-left: 10px;
    opacity: 0.0;
}
.card:hover{
    cursor: pointer;
    filter: grayscale(0);
    -webkit-filter: grayscale(0);
    transition: all .4s ease-in-out;
}
.card:hover .infos{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}


h1{
    font-size: clamp(20px, 3vw, 40px);
}

h2{
    font-size: clamp(10px, 2vw, 20px);
    letter-spacing: 3px;
    opacity: .7;
}

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

@media screen and (max-width: 800px) {
    .card{
        aspect-ratio: 16/10;
        filter: unset;
    }

    .infos{
        opacity: 1;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        max-height: 80px;
    }
}


</style>
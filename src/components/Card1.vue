<script setup lang="ts">
import  Project  from '@/types/Project'

defineProps(['project' as Project])
function getImageurl(_image: string) {
    return new URL(`/src/assets/images/${_image}`, import.meta.url).href;
}
</script>

<template>
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
</template>

<style scoped>
.card {
    display: flex;
    width: clamp(300px, 95vw, 800px);
    aspect-ratio: 19/9;
    position: relative;
    filter: brightness(.7);
    -webkit-filter: brightness(.7);
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
    filter: brightness(1);
    -webkit-filter: brightness(1);
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


</style>
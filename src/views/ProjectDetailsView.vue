<script lang="ts" setup>
import TitleItem from '@/components/TitleItem.vue';
import Project from '@/models/Project';
import { titlePosition } from '@/models/TittleItem';
import router from '@/router';
import { useProjectsStore } from '@/stores/useProjects';
import { onMounted } from 'vue';
import type { Router } from 'vue-router';

const projectsStore = useProjectsStore()


//projectsStore.select(currentProjectName)



onMounted(()=>{
    projectsStore.fetch()
const currentProjectName = router.currentRoute.value.params.name
    // get project 
    const project = projectsStore.projects.find(p => 
        p.Name == currentProjectName
    )
    console.log(project)
})

//const selectedProject = projects.find
</script>

<template>
    <div class="wrapper">
        <TitleItem :title="projectsStore.projects" subtitle="visual fx | AI | web | mobile | game " :position="titlePosition.Top"></TitleItem>
        <div class="screen">
            nogljfnkjgbfn
        </div>
    </div>
</template>

<style scoped>

.wrapper{
    width: 100%;
    min-width: 300px;
    height: fit-content;
    background-color: cadetblue;
}
.screen{
    display: block;
    width: 100%;
}
</style>
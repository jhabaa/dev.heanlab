<script lang="ts" setup>
import { useProjectsStore } from '@/stores/useProjects'
import  Project  from '@/types/Project'
import TitleItem from '@/components/TitleItem.vue'
import Card1 from '@/components/Card1.vue'

const projectsStore = useProjectsStore()
</script>
<template>
    <main>
        <TitleItem title="Projects" subtitle="visual fx | AI | web | mobile | game"></TitleItem>
        <div class="list">
            <div v-for="project in projectsStore.projects" :key="project.id">
                <Card1 :project="project" />
            </div>
        </div>

    </main>

</template>

<style scoped>
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
}

.list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    width: 100%;
    max-width: 1900px;
    scrollbar-width: none;
}
</style>
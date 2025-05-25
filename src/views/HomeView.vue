<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import JHName from "../components/JHName.vue";
import { useProjectsStore } from "@/stores/useProjects";
import Project from "@/models/Project";
const projectsStore = useProjectsStore();
const test = projectsStore.test;

projectsStore.fetch();
const projects: Project[] = projectsStore.projects;
</script>

<template>
  <main>
    <JHName />
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  padding: unset;
  margin: unset;
  z-index: 2;
  height: 100%;
  width: 100%;
}
</style>

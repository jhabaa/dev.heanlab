<script lang="ts" setup>
import TitleItem from "@/components/TitleItem.vue";
import type Prototype from "@/models/Prototype";
import { titlePosition } from "@/models/TittleItem";
import { nextTick, onMounted, ref } from "vue";
import { usePrototypeStore } from "@/stores/usePrototypes";
import router from "@/router";
const prototype = ref<Prototype>();
const prototypeStore = usePrototypeStore();
// Lets load the prototype data
async function load() {
  await prototypeStore.fetch();

  const currentPrototypeName = router.currentRoute.value.params.name;
  console.log(currentPrototypeName);
  prototype.value = prototypeStore.data.find(
    (p) => p.Name == currentPrototypeName,
  ) as Prototype;
  await nextTick();
}

onMounted(async () => {
  await load();
  //GithubButton()
});
</script>

<template>
  <main>
    <TitleItem
      :title="prototype?.Title"
      :subtitle="prototype?.keywords"
      :position="titlePosition.Top"
    ></TitleItem>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  padding: unset;
  margin: unset;
  width: 100%;
  height: 100vh;
  padding-top: 10vmin;
  padding-bottom: 20vmin;
  align-items: center;
  z-index: 400;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: hidden;
}
</style>

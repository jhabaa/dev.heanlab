<script setup lang="ts">
import JHName from "../components/JHName.vue";
import { useProjectsStore } from "@/stores/useProjects";
import { onBeforeUnmount, onMounted, ref } from "vue";

const projectsStore = useProjectsStore();
const borderSize = ref(0);

projectsStore.fetch();

function updateBorderSize() {
  // Richard-style cinematic letterbox that always appears.
  const raw = window.innerHeight * 0.075;
  borderSize.value = Math.max(Math.min(raw, 96), 44);
}

onMounted(() => {
  updateBorderSize();
  window.addEventListener("resize", updateBorderSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateBorderSize);
});
</script>

<template>
  <main>
    <div class="border border-top" :style="{ height: `${borderSize}px` }"></div>
    <div
      class="border border-bottom"
      :style="{ height: `${borderSize}px` }"
    ></div>
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

.border {
  position: fixed;
  left: 0;
  width: 100vw;
  background: #000;
  z-index: 450;
  pointer-events: none;
}

.border-top {
  top: 0;
  animation: dropFromTop 700ms ease-out 300ms both;
}

.border-bottom {
  bottom: 0;
  animation: riseFromBottom 700ms ease-out 300ms both;
}

@keyframes dropFromTop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes riseFromBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>

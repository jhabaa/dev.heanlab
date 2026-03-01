<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

const blockEl = ref<HTMLElement | null>(null);
const nameEl = ref<HTMLElement | null>(null);
const titleEl = ref<HTMLElement | null>(null);
const nameScale = ref(1);
const titleScale = ref(1);

let resizeObserver: ResizeObserver | null = null;

function syncLineWidths() {
  if (!blockEl.value || !nameEl.value || !titleEl.value) return;
  const targetWidth = blockEl.value.clientWidth;
  const nameWidth = nameEl.value.offsetWidth;
  const titleWidth = titleEl.value.offsetWidth;
  if (!targetWidth || !nameWidth || !titleWidth) return;

  // Both lines stretch to the same target width from the same left origin.
  nameScale.value = targetWidth / nameWidth;
  titleScale.value = targetWidth / titleWidth;
}

onMounted(async () => {
  await nextTick();
  syncLineWidths();
  requestAnimationFrame(syncLineWidths);

  if (typeof document !== "undefined" && "fonts" in document) {
    document.fonts.ready.then(() => {
      syncLineWidths();
      requestAnimationFrame(syncLineWidths);
    });
  }

  window.addEventListener("resize", syncLineWidths);
  if (blockEl.value && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => syncLineWidths());
    resizeObserver.observe(blockEl.value);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", syncLineWidths);
  resizeObserver?.disconnect();
  resizeObserver = null;
});
</script>

<template>
  <div class="wrapper">
    <div ref="blockEl" class="text-block">
      <h1 ref="nameEl" class="name" :style="{ transform: `scaleX(${nameScale})` }">
        J-HUBERT ABA'A
      </h1>
      <h2
        ref="titleEl"
        class="title"
        :style="{ transform: `scaleX(${titleScale})` }"
      >
        Engineer | Developer | Designer
      </h2>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "JetBrains Mono", monospace;
  font-optical-sizing: auto;
  width: 100%;
}

.text-block {
  width: min(92vw, 1300px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.name {
  font-size: clamp(1rem, 8vw, 10rem);
  letter-spacing: 0.045em;
  font-weight: 200;
  color: #3ee2ff;
  text-shadow:
    #3ee2ff 0px 0px 30px,
    #3ee2ff 0px 0px 20px,
    #3ee2ff 0px 0px 10px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  white-space: nowrap;
  transform-origin: left center;
  margin: 0;
}

.title {
  font-size: clamp(20px, 4.8vw, 5ch);
  letter-spacing: 0.085em;
  white-space: nowrap;
  transform-origin: left center;
  margin: 0.6rem 0 0 0;
}

@media only screen and (max-width: 800px) {
  .wrapper {
    padding-inline: 12px;
  }

  .text-block {
    width: 100%;
  }

  .name {
    font-size: clamp(1.5rem, 10.8vw, 4.2rem);
    letter-spacing: 0.025em;
  }

  .title {
    font-size: clamp(0.82rem, 5vw, 1.7rem);
    letter-spacing: 0.055em;
  }
}
</style>

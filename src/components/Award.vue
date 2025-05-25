<script lang="ts" setup>
import Award from "@/models/Award";

function getImageurl(_image: string) {
  return new URL(`/src/assets/images/${_image}`, import.meta.url).href;
}

defineProps<{ object: Award }>();
</script>

<template>
  <a class="award" :href="object.link" target="_blank">
    <img :src="getImageurl(object.logo)" alt="" />
    <div class="infos">
      <h6 class="title">
        {{ object.name }}
      </h6>
    </div>
  </a>
</template>

<style scoped>
.award {
  display: flex;
  width: clamp(50px, 2vw, 100px);
  aspect-ratio: 1/1;
  flex-flow: column nowrap;
  justify-content: center;
}
.title {
  font-size: 0.6rem;
}
</style>

<script setup lang="ts">
console.log(import.meta.env.VITE_APP_VERSION);
</script>

<template>
  <div class="wrapper">
    <h1 class="name">J-Hubert ABA'A</h1>
    <h2 class="title">Engineer | Developer | Designer</h2>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: 100vh;
  text-align: center;
  font-family: "JetBrains Mono", monospace;
  font-optical-sizing: auto;
}
h1 {
  font-size: clamp(1rem, 8vw, 10rem);
  letter-spacing: 5px;
  font-weight: 200;
  color: #3ee2ff;
  text-shadow:
    #3ee2ff 0px 0px 30px,
    #3ee2ff 0px 0px 20px,
    #3ee2ff 0px 0px 10px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-wrap: nowrap;
}
h2 {
  font-size: clamp(20px, 5vw, 5ch);
  letter-spacing: 3px;
}
</style>

<script lang="ts" setup>
    import TitleItem  from '@/components/TitleItem.vue';
    import  { use3DBackground } from '@/stores/use3DBackground'

    // change fog density
    const background3D = use3DBackground()
     
    //background.cameraFogFar = 14
    // background.updatingFogFar = true
    background3D.cameraZ = 60
    background3D.updatingCameraZ = true

</script>
<template>
  <div class="wrapper">
    <TitleItem title="About" subtitle="bio | awards | client | services | contact"></TitleItem>
    <div class="content">

      <img src="../assets/images/me.png">

      <p>
          Passionate about innovation and creativity, I specialize in developing cutting-edge solutions at the intersection of <strong>web</strong>, <strong>mobile</strong>, <strong>AI</strong>, and <strong>immersive technologies</strong>. My expertise spans from <strong>full-stack development</strong> to <strong>3D interactive experiences</strong> and advanced software architectures.
      </p>
      <br>
      <h2>My Approach</h2>
      <p>
          Always striving for efficiency and optimization, I build modern applications leveraging technologies such as <strong>Flask</strong>, <strong>.NET</strong>, <strong>Vue.js</strong>, <strong>React</strong>, and <strong>Three.js</strong>. My workflow integrates <strong>Docker</strong> for scalability, <strong>RabbitMQ</strong> for message-driven architectures, and <strong>microservices</strong> for high-performance systems.
      </p>
      <p>
          I focus on delivering <strong>high-performance and immersive user experiences</strong>, using advanced tools like <strong>WebGL</strong> and <strong>Framer Motion</strong> to create seamless and captivating animations.
      </p>
      <br>
      <h2>Experience & Expertise</h2>
      <p>
          I have worked on a wide range of projects, from healthcare platforms to immersive digital experiences. My expertise extends to <strong>cloud computing</strong>, <strong>DevOps</strong>, and <strong>distributed systems</strong>. My mission: blending **technology and creativity** to craft impactful digital solutions.
      </p>
      <br>
      <h2>Key Technologies</h2>
      <p>
          🔹 Backend: Python (Flask, FastAPI), .NET, Node.js <br>
          🔹 Frontend: Vue.js, React, Three.js <br>
          🔹 DevOps: Docker, CI/CD, Kubernetes <br>
          🔹 3D & Motion: WebGL, GSAP, Framer Motion <br>
      </p>
      <br>
      <h2>Vision</h2>
      <p>
          My goal is to push the boundaries of digital innovation by merging <strong>artificial intelligence</strong>, <strong>interactive design</strong>, and <strong>cutting-edge technologies</strong>. I am constantly exploring new possibilities to craft experiences that redefine how people interact with the digital world.
      </p>

    </div>
  </div>
</template>

<style>

.wrapper{
    padding: 20px;
    display: flex;
    flex-flow: column wrap;
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    justify-content: center;
    align-items: center;
    width: 100%;
    top: 10px;
    position: relative;
    background-color: unset;
}

.content{
    width: 100%;
    max-width: 1000px;
    padding: 20px;
    display: flex;
    flex-flow: column wrap;
    gap: 20px;
}

p{
    font-size: clamp(20px, 2vw, 30px);
    line-height: 1.5;
    opacity: .8;
}
</style>

<script setup lang="ts">
    defineProps<{
        title: String,
        subtitle: String
    }>()
</script>
<template>
    <div class="wrapper">
        <div class="block">
            <h1>
            {{ title }}
            </h1>
            <h3>
             {{ subtitle }}
            </h3>
        </div>
       
    </div>
</template>
<style scoped>
.wrapper{
    padding: 20px;
    display: flex;
    flex-flow: column wrap;
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 300px;
    max-width: 800px;
    top: 10px;
    position: relative;
}
.content{
    width: 100%;
    max-width: 800px;
    margin: auto;
    padding: 20px;
    display: flex;
    flex-flow: column wrap;
}
.block{
    padding: 10px;
    position: fixed;
    top: 15vmin;
}
h1{
    font-size: clamp(50px, 8vw, 70px);
    opacity: .6;

}
h3{
    font-size: clamp(10px, 2vw, 4ch);
    letter-spacing: 3px;
    text-transform: uppercase;
}
</style>
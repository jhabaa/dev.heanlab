<script setup lang="ts">
    import { titlePosition } from '@/models/TittleItem'
    import TitleItem from '@/components/TitleItem.vue'

    import { usePrototypeStore } from '@/stores/usePrototypes';
    import Card1 from '@/components/Card1.vue';
import { ref } from 'vue';
import type Prototype from '@/models/Prototype';

        const prototypeStore = usePrototypeStore()
        prototypeStore.fetch()

</script>

<template>
    <main>
        <TitleItem title="Protos" subtitle="Mockups | 3D | UI | UX | Prototypes " :position="titlePosition.Top"></TitleItem>

        <div class="list">
            <div v-for="prototype in prototypeStore.data" :key="prototype.id">
                <Card1 :object="prototype" />
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
        padding-bottom: 20vmin;
        align-items: center;
        z-index: 400;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow-x: hidden;
    }

    .list{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: calc(50px + 2vmin);
        width: 100%;
        max-width: 1900px;
        scrollbar-width: none;
        padding-inline: 20px;
    }
</style>

import { defineStore } from "pinia";
import { ref } from 'vue';


export const use3DBackground = defineStore('3D', () => {
    const cameraFogFar = ref(0)
    const updatingFogFar = ref(false)

    const cameraZ = ref(0)
    const updatingCameraZ = ref(false)

    return {cameraFogFar, updatingFogFar, cameraZ, updatingCameraZ}
})
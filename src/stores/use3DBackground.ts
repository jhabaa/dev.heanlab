import { defineStore } from "pinia";
import { ref } from "vue";

enum backgroundPosition {
  down,
  up,
}

export { backgroundPosition };

export const use3DBackground = defineStore("3D", () => {
  const cameraFogFar = ref(0);
  const updatingFogFar = ref(false);

  const cameraZ = ref(0);
  const updatingCameraZ = ref(false);
  const position = ref<backgroundPosition>(backgroundPosition.down);

  return { cameraFogFar, updatingFogFar, cameraZ, updatingCameraZ, position };
});

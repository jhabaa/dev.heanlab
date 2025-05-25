import { defineStore } from "pinia";
import Prototype from "@/models/Prototype";
import axios from "axios";
import { ref } from "vue";

export const usePrototypeStore = defineStore("prototypes", () => {
  const data = ref<Prototype[]>([]);
  const fetch = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_API_URL + "/getproto",
      );
      data.value = response.data.map((prototype: Prototype) => {
        return new Prototype(prototype);
      });
    } catch (error) {
      console.error("Error fetching prototypes:", error);
    }
  };

  return { data, fetch };
});

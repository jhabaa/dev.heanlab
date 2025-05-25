import { defineStore } from "pinia";
import axios from "axios";
import Technology from "@/models/Technology";
import { ref } from "vue";

export const useTechnologiesStore = defineStore("technologies", () => {
  const data = ref<Technology[]>([]);

  const fetch = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_API_URL + "/gettechnologies",
      );
      data.value = response.data.map((technology: Technology) => {
        return new Technology(technology);
      });
    } catch (error) {
      console.error("Error fetching technologies:", error);
    }
  };

  return { data, fetch };
});

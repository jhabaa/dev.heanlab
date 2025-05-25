import About from "@/models/About";
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAboutStore = defineStore("about", () => {
  const data = ref<About | null>(null);
  const fetch = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/getabout`,
      );
      data.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { data, fetch };
});

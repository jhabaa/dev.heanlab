import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios, { Axios } from 'axios'
import Project from '../models/Project'




export const useProjectsStore = defineStore('projects', () => {
	const test = ref(0)
	const projects = ref([] as Project[])
	const splideRef = ref()
	const selectedProject =  ref<Project | null>(null)
	const getSelectedProject = computed(() => selectedProject.value)

	const fetch = async () => {
		console.log('Fetching data...')
		try {
			const response = await axios.get(import.meta.env.VITE_SERVER_API_URL +'/getprojects')
			const data = response.data
			projects.value = data.map((project : Project) => {
				return new Project(project)
			})
		}
		catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	function select(projectName : string){
		selectedProject.value = projects.value.find(p => p.Name == projectName) as Project
	}

	return {test, projects, fetch, splideRef, selectedProject, getSelectedProject, select}
})


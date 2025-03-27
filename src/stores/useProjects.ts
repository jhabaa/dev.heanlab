import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios, { Axios } from 'axios'
import Project from '../models/Project'




export const useProjectsStore = defineStore('projects', () => {
	const test = ref(0)
	const projects = ref([] as Project[])

	const fetch = async () => {
		console.log('Fetching data...')
		try {
			const response = await axios.get('http://localhost:8000/')
			const data = response.data
			projects.value = data.map((project : Project) => {
				return new Project(project)
			})
		}
		catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	return {test, projects, fetch}
})


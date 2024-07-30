import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const initialUsername = localStorage.getItem('username') || ''
  const username = ref(initialUsername)

  function setUsername(payload: string) {
    localStorage.setItem('username', payload)
    username.value = payload
  }

  return {
    username,
    setUsername
  }
})

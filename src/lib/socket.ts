import { reactive } from 'vue'
import { io } from 'socket.io-client'

type Message = { author: string; content: string }

export const useSocket = () => {
  const socket = io('http://localhost:3000')
  const state = reactive({
    connected: false,
    messages: [] as Message[]
  })

  socket.on('connect', () => {
    state.connected = true
  })

  socket.on('disconnect', () => {
    state.connected = false
  })

  socket.on('message', (message: Message) => {
    state.messages.push(message)
  })

  const sendMessage = (message: Message) => {
    socket.emit('message', message)
    state.messages.push(message)
  }

  return {
    state,
    sendMessage
  }
}

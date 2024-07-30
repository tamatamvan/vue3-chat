<script setup lang="ts">
import { ref } from 'vue'
import { useSocket } from './lib/socket'
import { useUserStore } from './store/user'

const usernameInput = ref('')
const messageInput = ref('')
const store = useUserStore()
const { sendMessage, state } = useSocket()

const login = () => {
  console.log('login', usernameInput.value)
  store.setUsername(usernameInput.value)
}

const onEnterMessage = () => {
  sendMessage({
    author: store.username,
    content: messageInput.value
  })
  messageInput.value = ''
}
</script>

<template>
  <main class="container mx-auto mt-4">
    <h1 class="text-3xl mb-4">Hi, {{ store.username }}!</h1>
    <div class="flex" v-if="!store.username">
      <input type="text" class="border-2 px-2 rounded border-black" v-model="usernameInput" />
      <button
        type="button"
        class="mx-2 bg-slate-600 rounded px-4 py-2 text-white hover:bg-slate-800 active:bg-slate-900"
        @click="login"
      >
        Login
      </button>
    </div>
    <p v-if="state.connected">Connected</p>
    <p v-else>Not connected</p>
    <div class="relative w-full my-8 rounded border-2 border-black p-8">
      <div class="h-[70vh] overflow-y-auto">
        <p v-for="(message, idx) in state.messages" :key="`msg-${idx}`">
          <strong>{{ message.author }}</strong
          >: {{ message.content }}
        </p>
      </div>
      <input
        type="text"
        class="w-full border-2 border-black rounded p-2"
        placeholder="Type your message, press enter to send..."
        v-model="messageInput"
        @keypress="
          (event) => {
            if (event.key === 'Enter') {
              onEnterMessage()
            }
          }
        "
      />
    </div>
  </main>
</template>

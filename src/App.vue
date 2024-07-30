<script setup lang="ts">
import { useSocket } from './lib/socket'

const { sendMessage, state } = useSocket()

const handleClick = () => {
  console.log('handleClick')
  sendMessage({
    author: 'Tama',
    content: 'Hello World!'
  })
}
</script>

<template>
  <main>
    <h1 class="text-3xl">Hello World!</h1>
    <ul>
      <li v-for="(message, idx) in state.messages" :key="idx">{{ message }}</li>
    </ul>
    <button @click="handleClick">Send Message</button>
  </main>
</template>

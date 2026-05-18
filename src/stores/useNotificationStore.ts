import { defineStore } from 'pinia'

export interface ToastMessage {
  id: number
  text: string
  type: 'success' | 'info' | 'warning' | 'error'
}

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    toasts: [] as ToastMessage[],
    nextId: 1
  }),
  actions: {
    addToast(text: string, type: ToastMessage['type'] = 'info') {
      const id = this.nextId++
      this.toasts.push({ id, text, type })
      
      // Limit to max 5 toasts so it doesn't spam infinitely
      if (this.toasts.length > 5) {
        this.toasts.shift()
      }
      
      setTimeout(() => {
        this.removeToast(id)
      }, 2500)
    },
    removeToast(id: number) {
      const index = this.toasts.findIndex(t => t.id === id)
      if (index !== -1) {
        this.toasts.splice(index, 1)
      }
    }
  }
})

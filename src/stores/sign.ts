import { defineStore } from 'pinia'
import { ref } from 'vue'
import router, { ROUTE_NAME_INDEX } from '@/router'

export default defineStore(
  'sign',
  () => {
    const user_token = ref(),
      is_sign = computed(() => Boolean(user_token.value))

    const tokenSet = (token: string) => {
        user_token.value = token
      },
      tokenRemove = () => {
        user_token.value = null
      },
      signIn = () => {
        window.location.href = '/sign'
      },
      signOut = async () => {
        tokenRemove()
        await router.replace({
          name: ROUTE_NAME_INDEX,
        })
      }

    return {
      user_token,
      is_sign,
      tokenSet,
      tokenRemove,
      signIn,
      signOut,
    }
  },
  {
    persist: {
      pick: ['user_token'],
    },
  },
)

import ky from 'ky'
import signStore from '@/stores/sign.ts'
import { nLoadingBar, nMessage } from '@/utils/naive'

export { ky }

const instance = ky.create({
  timeout: 1000 * 30,
  retry: 0,
  hooks: {
    beforeRequest: [
      () => {
        nLoadingBar().start()
      },
      (request) => {
        let token = signStore().user_token

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        switch (response.status) {
          case 401:
            nMessage().info('请登录后使用')
            await signStore().signOut()
            break
          case 404:
            nMessage().error('资源不存在 请检查地址是否正确')
            break
          case 422:
            let response_422 = (await response.json()) as any
            nMessage().warning(response_422.error || response_422.message)
            break
          case 500:
            nMessage().error('系统错误 请稍后再试')
            break
          case 502:
            nMessage().error('系统维护中 请过会再试')
            break
        }

        if (response.ok) {
          nLoadingBar().finish()
        } else {
          nLoadingBar().error()
        }
      },
    ],
  },
})

export default instance

<template>
  <div class="index">
    <n-card :title="`MEDB, ${user_info.username || '请登录后使用'}`">
      <template #header-extra>
        <div class="header">
          <div class="sign">
            <n-button
              v-if="user_info.is_sign"
              type="warning"
              text
              @click="
                () => {
                  nMessage().success('退出成功')
                  storeSign.signOut()
                }
              "
            >
              退出登录
            </n-button>
            <n-button v-else type="primary" text @click="storeSign.signIn()"> 点击登录 </n-button>
          </div>
        </div>
      </template>

      <media_list />

      <template #footer>
        如有侵犯您的权益，请发送
        <n-button text tag="a" href="mailto:contact@medb.lat" target="_blank">邮件</n-button>
        告知，我们将在核实后及时删除相关内容。
      </template>

      <template #action>
        <div class="action">
          <p>
            感谢
            <n-button text tag="a" href="https://vps.town?ref=medb" target="_blank" type="primary"> VPS.Town </n-button>
            提供赞助,
          </p>
          <n-button style="margin-left: 4px" text tag="a" href="https://github.com/somebyteorg/medb_web" target="_blank" type="primary"> API 文档</n-button>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import instance from '@/utils/ky'
  import signStore from '@/stores/sign.ts'
  import { nDialog, nMessage, nModel } from '@/utils/naive'

  const storeSign = signStore(),
    router = useRouter()

  const user_info = ref({
      username: 'loading',
    }),
    getUserInfo = async () => {
      user_info.value = await instance.get('/sign/info').json()
    }

  getUserInfo()
</script>

<style lang="stylus">
  .index
    padding 40px 20px
    max-width 1000px
    margin-inline auto

    .header, .action
      display flex
</style>

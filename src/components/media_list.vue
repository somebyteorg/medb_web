<template>
  <n-data-table striped :bordered="false" :single-line="false" :columns="columns" :data="data" :loading="loading" :scroll-x="800" />
  <div class="page">
    <n-pagination
      show-size-picker
      :page="page.page"
      :page-size="page.page_size"
      :item-count="page.total"
      :page-sizes="[5, 10, 20, 50, 100, 200]"
      @update-page="pageChange"
      @update-page-size="pageChangeSize"
    />
  </div>
</template>

<script lang="tsx" setup>
  const DICT_STATUS = {
    unknown: '未知',
    online: '在线',
    maintenance: '维护中',
    offline: '离线',
    bankrupt: '破产',
  }

  let data_status_options = []
  for (let value in DICT_STATUS) {
    data_status_options.push({
      label: DICT_STATUS[value],
      value,
    })
  }

  import type { DataTableColumns } from 'naive-ui'
  import { ref } from 'vue'
  import instance from '@/utils/ky'
  import { nDialog, nMessage, nModel } from '@/utils/naive'
  import { dayjs } from '@/utils/dayjs'

  const page = ref({
      page_size: 5,
    }),
    pageChange = (number) => {
      page.value.page = number
      getData()
    },
    pageChangeSize = (number) => {
      page.value.page = 1
      page.value.page_size = number
      getData()
    }

  const loading = ref(true),
    columns: DataTableColumns = [
      {
        key: 'id',
        title: 'ID',
        width: 80,
      },
      {
        key: 'name',
        title: '名称',
        resizable: true,
        minWidth: 120,
        render: (row) => (
          <div style="display: flex">
            <n-avatar lazy size="small" src={row.icon_url} />
            <span style="margin-left: 10px">
              {{
                default: () => row.name,
              }}
            </span>
          </div>
        ),
      },
      {
        key: 'is_subscribe',
        title: '已拥有',
        width: 110,
        filter: (value, row) => value == row.is_subscribe,
        filterOptions: [
          {
            label: '已有',
            value: 1,
          },
          {
            label: '未有',
            value: 0,
          },
        ],
        render: (row) => (
          <n-checkbox
            v-model:checked={row.is_subscribe}
            onUpdate:checked={(value) => {
              instance
                .put('/media/list/subscribe', {
                  searchParams: {
                    id: row.id,
                  },
                })
                .then(async (res) => {
                  nMessage().success('已更新集邮状态')
                  let json = await res.json()
                  row.is_subscribe = json.is_subscribe
                  row.subscribe_count = json.subscribe_count
                })
                .catch(() => {
                  row.is_subscribe = false
                })
            }}
          >
            {{
              default: () => (row.subscribe_count ? `/${row.subscribe_count}` : ''),
            }}
          </n-checkbox>
        ),
      },
      {
        key: 'establish_date',
        title: '成立时间',
        width: 120,
        sorter: 'default',
      },
      {
        key: 'status',
        title: '状态',
        width: 80,
        filter: (value, row) => value == row.status,
        filterOptions: data_status_options,
        render: (row) => DICT_STATUS[row.status],
      },
      {
        key: 'report_at',
        title: '报告时间',
        render: (row) => (row.report_at ? dayjs(row.report_at).fromNow() : '未曾汇报'),
        sorter: 'default',
        width: 100,
      },
      {
        key: 'movie',
        title: '电影数',
        sorter: 'default',
        width: 100,
      },
      {
        key: 'series',
        title: '总剧数',
        sorter: 'default',
        width: 100,
      },
      {
        key: 'episode',
        title: '总集数',
        sorter: 'default',
        width: 100,
      },
    ],
    data = ref([]),
    getData = async () => {
      loading.value = true

      let row = await instance
        .get('/media/list/index', {
          searchParams: {
            page: page.value.page,
            page_size: page.value.page_size,
          },
        })
        .json()
      loading.value = false

      let items = []
      for (let item of row.items) {
        items.push({
          ...item,
          ...item.counts,
        })
      }

      data.value = items

      page.value = {
        page: row.page,
        page_size: row.page_size,
        total: row.total,
      }
    }
  getData()
</script>

<style lang="stylus">
  .page
    margin-top 20px
    float right
</style>

# medb = media db

媒体库统计工具

# 媒体库图标

> 目前已兼容 `emby`

- `https://medb.lat/media/icon/library`

# api

文档地址 https://www.postman.com/somebyteorg/medb

## 登录

- `https://medb.lat/sign=[url]`

存在 `url` 时会携带 `token` 自动重定向到此地址

## 通过接口更新媒体数量信息

```bash
curl --location 'https://medb.lat/media/statistics/save' \
--form 'media_list_id="[media_list_id]"' \
--form 'token="[token]"' \
--form 'movie="[count_movie]"' \
--form 'series="[count_series]"' \
--form 'episode="[count_episode]"'
```

- `media_list_id` `媒体id` 在 `媒体 > 列表 > 媒体列表` `/media/list/index` 接口中获得
- `token` `媒体token` 在 `媒体 > 列表 > 媒体列表` `/media/list/index` 接口中获得
- `count_movie` 电影总数
- `count_series` 电视总季数
- `count_episode` 电视总集数

# 赞助商

感谢 [`VPS.Town`](https://vps.town?ref=medb) 赞助

![image](https://avatars.githubusercontent.com/u/201592618?s=200&v=4)

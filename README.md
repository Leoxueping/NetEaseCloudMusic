# NetEaseCloudMusic

> vue版网易云音乐web app

## 在线地址
http://119.29.201.53(服务器用于其他项目了，暂时不能访问)

## 接口来自
[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 技术栈
vue2 + vuex + vue-router + axios

## 运行

### 运行API接口

``` bash
git clone https://github.com/Binaryify/NeteaseCloudMusicApi
cd NeteaseCloudMusicApi
npm install
node app.js
```
### 把`src/main.js`中的 `axios.defaults.baseURL` 改成API所监听的端口地址

### 然后运行此项目 

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

### 若有跨域问题，需把API代码 NeteaseCloudMusicApi/app.js 中的跨域相关代码的注释去掉

## 打包
``` bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```




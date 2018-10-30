var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware')
var devApi = "http://rap.huixiaoer.com/rapApi/app/mock/1"

var middleware = proxy('/api/**', { // **：为每次请求路径单独写代理
	target: devApi, 
	changeOrigin: true, 
	pathRewrite: {'^/api' : '/api'}}); //重写路由

function Server() {
	var bs = browserSync.init({
		port: 3700,
		server: {
			directory: true,
			baseDir: ['./'],
		},
		open: false,
		middleware: [middleware],
		startPath: '/index.html'
	})
	browserSync.watch('**').on('change', browserSync.reload); // 添加监听，项目文件改动保存，浏览器自动刷新
}
Server();
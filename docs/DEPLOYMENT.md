# GitHub Pages部署说明

## 本地验证

~~~bash
npm test
npm run build
npm run serve
~~~

Node.js 20+和Python3；访问http://localhost:4173。使用原生ES Modules，不支持直接用file://双击打开。

## 首次Pages配置

仓库管理员打开：https://github.com/1998x-stack/zhouYi/settings/pages

进入 Build and deployment → Source，选择GitHub Actions。推送main或手动触发：

https://github.com/1998x-stack/zhouYi/actions/workflows/pages.yml

部署链接按仓库名称为 https://1998x-stack.github.io/zhouYi/ 。

## 流水线

CI与Pages分别运行npm test和npm run build。Pages进一步执行configure-pages@v5、upload-pages-artifact@v4及deploy-pages@v4。若提示Not Found或Get Pages site failed，优先排查是否在Settings启用了Pages和Source；不能凭仓库公开就断言部署成功。

## 完成标准

1. npm test构建验证成功。
2. 最新main对应的Pages workflow成功。
3. 公开网址可以在真实浏览器访问，64卦数据与JS无404。
4. 手机、键盘、搜索、逐条揭晓和卦象按钮均通过人工烟雾测试。

遇P0问题，可git revert问题提交，再运行验证与部署。
# 架构与数据流

~~~text
GitHub main
 ├─ CI：npm test → npm run build
 └─ Pages：npm test → npm run build → 上传 dist/ → deploy-pages

浏览器静态应用
  index.html / styles.css / app.js
       │
       └─ data/index.js
            ├─ data/hexagrams-01-16.js
            ├─ data/hexagrams-17-32.js
            ├─ data/hexagrams-33-48.js
            └─ data/hexagrams-49-64.js

浏览器自身数据
  location.hash = #hex-序号
  localStorage = saved, last, font, theme
~~~

## 关键对象

- HEXAGRAMS：按文王卦序1—64的只读记录。
- 八卦TRIGRAMS：各自3位编码、名称、物象和八卦符号。
- 六位bits字符串：**索引0为最下方初爻，索引5为最上方上爻**，阴0、阳1，下卦三位在前。
- byBits、changeLine、oppositeOf、reversedOf：确定性纯函数；不接受不合法卦象或爻位。
- readingCard：渲染单独原文、按钮和默认hidden的白话；转换为DOM时采用textContent。
- renderWings：彖传/大象传/小象传在独立折叠区域，不能混入卦爻辞。

## 浏览器状态

每次切卦重新生成该卦的7项经辞和乾坤的额外1项，因而每条白话恢复隐藏。字号只改CSS变量不重建；按用户操作才持久化主题、字号、收藏与上次阅读。没有账户、追踪代码、数据提交或LLM外部API。

## 发布

所有资源路径相对站点根目录，适应 /zhouYi/ 仓库子路径。scripts/build.mjs生成完整dist/，deploy-pages上传成品。
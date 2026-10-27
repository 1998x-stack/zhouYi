# 工程：原典、卦象与阅读交互

- 入口：index.html、styles.css、app.js（原生ES Modules）。
- 原典：data/hexagrams-01-16.js等4个模块；data/index.js导出64卦、八卦表、条目和符号变换函数。
- 来源：古文电子文本经维基文库来源整理，保留sourceUrl/sourceRevision；现代白话导读来自DaviRain-Su项目，CC BY-SA 4.0，详见CONTENT-ATTRIBUTION.md。
- renderReadings(h)输出1条卦辞、6条爻辞及特殊经辞，每个解释有唯一aria-controls、aria-expanded=false和真实hidden=true；切卦必须重新隐藏全部，字号只修改CSS变量。
- renderWings独立展示《彖》《大象》《小象》原文，不与古经合并为伪造的“整章原文”。
- 阴阳字符串从下到上（index0初、index5上），renderDiagram从上向下画才能与实体卦图一致。按钮翻转对应pos，不可上下颠倒。
- 客户端搜索、偏好收藏使用浏览器localStorage，无后端、无第三方追踪。古籍文本通过textContent渲染。
- 资源地址相对路径以适应GitHub Pages /zhouYi/ 子路径。
- npm test校验64卦、386条爻辞以及《彖》《象》层与各卦编码的结构完整性；npm run build生成dist/。CI和Pages成功不等于完成实际视觉、读屏和学术训诂人工验收。
# 项目贡献与校勘准则

## 经传版本

本仓库当前固定为通行文王卦序的六十四卦原典与《彖》《象》，不与帛书卦序或王弼、朱熹各本混成不知出处的单一文本。修订经文需给出卦名、六爻位置、原字、改字、电子底本及修订号、影印或出版页码和原因。

## 文本版权

古籍经文本身属于公版；现代白话说明来自DaviRain-Su / Classical Atlas并遵循CC BY-SA 4.0，务必保留CONTENT-ATTRIBUTION.md，不可改称本站原创MIT译文。保存改动前独立比对现代释读是否真的与所呈现的经文相合。

## 代码

遵守docs/ARCHITECTURE.md、docs/READING-INTERACTION.md和references/hexagram-methodology.md。初爻为bits[0]，上爻为bits[5]；图形从上向下排列不代表数据爻位反转。卦辞与各爻原文在上，现代白话在下并保持初始hidden；原文与传文分层，动态文字只通过textContent写入。需兼容手机、键盘、减少动画、深色模式。

运行 npm test 和 npm run build；同时核实Actions CI、Pages真实部署和公开浏览器的访问情况。
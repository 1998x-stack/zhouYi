# zhouYi Agent 仓库规则

用户请求用《周易》思考生活问题：首先阅读SKILL.md与references/decision-framework.md，精准核对相关卦的经辞。区分经/传，真实引文与出处，解释适用的现实条件，不把卦象当确定预测或命运判决，不提供博彩指导。

用户要求修改网站：先读docs/ARCHITECTURE.md、docs/CONTENT-MODEL.md、docs/READING-INTERACTION.md。64文王卦序、384六爻辞、用九/用六两条特殊辞，来源修订号与现代CC BY-SA 4.0授权必须不变。六爻从下到上索引，图上可自上而下显示；每条原文在上，白话隐藏于对应按钮之后，切卦全部恢复初始隐藏。

前端原文一律textContent渲染，无第三方API、无预测未来保证。修改后运行npm test与npm run build，核对GitHub CI和Pages真实状态。
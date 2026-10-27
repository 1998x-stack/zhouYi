# 周易智慧 · 可直接复制的 Codex/OpenCode 提示词

## 当前仓库内（优先）

~~~text
请完整读取 SKILL.md、references/decision-framework.md 和 references/quotation-guide.md，再通过 data/hexagrams-*.js 逐字核对古文。

请使用 zhouyi-wisdom Skill 分析现实问题。先辨清目标、证据、风险和约束，再选恰当卦辞、爻辞或传文；引用真实短文与《周易·卦名·位置/层次》的准确出处，附白话说明和现代适用边界，最后提出1–3项可验证行动。语言清雅而清晰，不能凭卦象预测结果或替代事实，不能编造经文。我的问题：________
~~~

## Codex

~~~text
$zhouyi-wisdom 请用《周易》真实经传思想帮我分析问题：________
~~~

## OpenCode

~~~text
请加载 .agents/skills/zhouyi-wisdom/SKILL.md 对应的Skill，完整阅读根目录 SKILL.md，然后用准确《周易》经传出处回答：________
~~~

## 比较具体的问题

~~~text
$zhouyi-wisdom 我在团队里负责一个新项目，需求和资源尚未验证，但负责人希望立即全面投入。请以《周易》的阶段、时机、审慎思路分析选项，不做吉凶预测；给出试点方案、决策阈值和退出条件。
~~~

## 全局发现

根目录Skill是完整行为协议，.agents/skills/zhouyi-wisdom/SKILL.md是代理标准发现入口，AGENTS.md适用于本仓库工程任务。仅粘贴一句提示词并不意味着客户端已经完整读过文件。
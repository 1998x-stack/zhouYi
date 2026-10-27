# 周易 · 观变知时

> **天行健，君子以自强不息。** ——《周易·乾·大象传》

本项目是一座以**古代六爻结构、东方宣纸和青铜矿物色**为设计主题的《周易》数字研读馆，也提供 Codex / OpenCode 可直接加载的 **zhouyi-wisdom** Skill：借卦象与经传思想思考现实的变化、时机、风险、进退与长期选择。

[阅读网站（GitHub Pages）](https://1998x-stack.github.io/zhouYi/) · [SKILL.md](./SKILL.md) · [专业文档](./docs/README.md) · [部署记录](https://github.com/1998x-stack/zhouYi/actions)

## 核心能力

| 模块 | 已实现 |
| --- | --- |
| 六十四卦 | 通行文王卦序，**上经30、下经34卦**；八卦相重形成完整六十四个唯一卦象 |
| 经辞研读 | **64卦辞 + 384条六爻辞 + 乾坤用九/用六2条**；原文在上，每条现代白话导读在下且默认隐藏、独立点击显示 |
| 易传分层 | 每卦《彖传》、大象传和6条小象传，以独立原典层展示，不混入卦辞、爻辞 |
| 交互卦象 | 六爻从下到上编号；点击某一爻可查看单爻翻转所得卦、错卦和综卦的确定符号关系 |
| 阅读工具 | 全文搜索、上/下经筛选、书签、字号、明暗主题、64卦目录、卦内深链接 |
| AI Skill | 真实引用原文及《周易·卦名·卦辞/爻位/传名》，紧跟释义，解释古今适用边界并给现实可验证的行动 |

**文献声明：** 本站使用逐卦对应维基文库修订号的电子经传文献。经文与现代白话导读分层、来源和版权独立：古籍属公版，现代导读采用 **DaviRain-Su / Classical Atlas** 的 **CC BY-SA 4.0** 说明性文本，不是本站原创权威译本。见 [CONTENT-ATTRIBUTION.md](./CONTENT-ATTRIBUTION.md)。

## 在 Codex / OpenCode 中启用 Skill

### 方式一：直接复制提示词

在本仓库目录中，粘贴下面的提示词：

~~~text
请完整读取当前仓库 SKILL.md，并按需阅读 references/decision-framework.md、references/quotation-guide.md 以及 data/hexagrams-*.js 中的真实《周易》原文。

此后请使用 zhouyi-wisdom Skill 帮助我思考现实问题：
1. 先理解我的具体目标、真实证据、约束、参与者、风险与可选行动。
2. 从《周易》的阴阳变化、审时度势、知止知变、持盈守正等思想中选择确实相关的卦或爻，不用随机卦象替我预测结果。
3. 用清雅、明晰、克制而易懂的中文回答；准确引用1–2句真实《周易》古文，必须标明卦名和卦辞/爻辞/《易传》出处。例如：「天行健，君子以自强不息。」——《周易·乾·大象传》。
4. 紧跟现代白话释义，解释与我的实际问题的关联、历史语境和今天不能直接照搬的地方。
5. 最后给出1–3项合法、安全、可执行且可验证的具体行动；现代法律、医学、财务等事项以可靠证据为先。
6. 不编造引文、版本、爻位；不把《易传》称为古代卦辞，不以卦象提供确定性的吉凶、命运或收益预测。

我的问题：________
~~~

### 方式二：让代理按项目配置自动发现

此仓库提供 [根目录 SKILL.md](./SKILL.md)、[.agents/skills/zhouyi-wisdom/SKILL.md](./.agents/skills/zhouyi-wisdom/SKILL.md) 和 [AGENTS.md](./AGENTS.md)。

~~~bash
git clone https://github.com/1998x-stack/zhouYi.git
cd zhouYi
codex
# 或
opencode
~~~

**Codex 中复制：**

~~~text
$zhouyi-wisdom 请以真实《周易》卦辞、爻辞和传文分析我在学习、工作和人生选择中的问题：________
~~~

**OpenCode 中复制：**

~~~text
请加载本项目 zhouyi-wisdom Skill；若未自动发现，请读取 .agents/skills/zhouyi-wisdom/SKILL.md 和根目录 SKILL.md。引用真实《周易》经传并给具体行动：________
~~~

### 方式三：全局安装

~~~bash
git clone https://github.com/1998x-stack/zhouYi.git "$HOME/zhouyi-wisdom-source"
mkdir -p "$HOME/.agents/skills"
ln -s "$HOME/zhouyi-wisdom-source/.agents/skills/zhouyi-wisdom"   "$HOME/.agents/skills/zhouyi-wisdom"
~~~

请先检查是否已经存在同名目录，避免覆盖；若客户端尚未加载Skill，可重启后再试。更多示例见 [prompts/codex-opencode.md](./prompts/codex-opencode.md)。

## 本地开发与测试

~~~bash
git clone https://github.com/1998x-stack/zhouYi.git
cd zhouYi
npm test
npm run build
npm run serve
# 浏览器访问 http://localhost:4173
~~~

要求 Node.js 20+；serve脚本使用Python 3。浏览器访问ES Modules必须经本地HTTP服务，不要直接用 file:// 打开。

| 项目路径 | 用途 |
| --- | --- |
| data/hexagrams-*.js | 64卦的原文、彖象、六爻、白话导读及逐卦来源修订号 |
| data/index.js | 64卦索引、八卦结构、单爻变化、错卦、综卦的确定性映射 |
| index.html / styles.css / app.js | 可视化网站、搜索、阅读与逐条揭晓 |
| SKILL.md / .agents/skills/ / references/ | 现代现实问题的经义推理Skill及准确引经规范 |
| docs/ / scripts/ / .github/workflows/ | 内容模型、古籍来源、交互测试、静态Pages发布 |

## 学术、预测与许可边界

《易经》的卦辞、爻辞和《易传》的彖、象需区分成书层次；本站**未声称完整收录独立《系辞》《说卦》《序卦》《杂卦》与《文言》**，这些仍列在版本扩充路线图。现代导读是有出处的编辑性辅助学习稿，可能存在有争议的训诂或断句，仍待人工逐卦复核。

卦象结构本身可以计算和验证，但不能据此推断现代世界中的结果必然发生。本站**不以卦象替代科学、医疗、财务或法律判断**，不提供博彩或盈利预测。

仓库原创软件以 [MIT](./LICENSE) 提供；现代白话导读衍生内容遵照 [CC BY-SA 4.0](./CONTENT-ATTRIBUTION.md) 保持原署名与同方式共享。

[经传来源](./docs/TEXTUAL-SOURCES.md) · [卦象模型](./docs/CONTENT-MODEL.md) · [阅读交互](./docs/READING-INTERACTION.md) · [设计系统](./docs/DESIGN-SYSTEM.md) · [验证](./docs/QA.md) · [发布](./docs/DEPLOYMENT.md) · [阶段路线](./docs/ROADMAP.md)

---

**穷则变，变则通，通则久。** ——《周易·系辞下传》（引文属于《易传》，非卦辞）
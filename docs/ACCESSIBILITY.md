# 阅读无障碍要求

- HTML结构有跳转到阅读正文的skip link，原生可聚焦按钮与输入框。
- 每条白话导读使用真正的hidden初态；按钮的aria-expanded反映展开状态、aria-controls准确指向专属译文。
- 六爻从上到下绘出，但button标签清楚说明位次，保留有意义的可访问名称；用户可用Tab和Enter/Space独立操作。
- 搜索结果数、展开计数和复制提示使用role=status和aria-live=polite。
- 文本最小字号与用户调整范围16—30px；不破坏展开内容。动态古文通过textContent安全渲染。
- 手机375px、缩放200%时原文和白话始终上下排列，不得强制横向拖动阅读正文。
- 用户操作prefers-reduced-motion后禁用循环阴阳环动画和渐入动画；内容必须立即可见。
- 自动化测试验证DOM契约，屏幕阅读器、对比度、小屏真实体验仍需在浏览器手工验收。
# Chint.Prd

这是一个面向 VS Code GitHub Copilot 自定义 Agent 的配置仓库，用于沉淀正泰场景下的蓝图生成、PRD 编写与评审规则。

仓库当前主要提供五类能力：

- Blueprint Writer：根据业务需求生成/优化 IT 系统蓝图，作为 PRD 输入材料
- Blueprint Editor：对已有蓝图做增量编辑、补充、修订和图文联动同步
- PRD Writer：按分层确认流程生成 B 端 PRD
- PRD Editor：对已有 PRD 做增量编辑、补充、修订和联动同步
- PRD Reviewer：按统一标准评审 PRD 质量、结构和图表规范

## 目录结构

```text
.
├─ .github/
│  ├─ agents/
│  │  ├─ c.blueprint.agent.md
│  │  ├─ c.blueprint-editor.agent.md
│  │  ├─ c.prd.agent.md
│  │  ├─ c.prd-editor.agent.md
│  │  ├─ c.prd-reviewer.agent.md
│  ├─ prompts/
│  │  ├─ c.blueprint.prompt.md
│  │  ├─ c.blueprint-editor.prompt.md
│  │  ├─ drawio-business-flow.prompt.md
│  └─ resources/
│     ├─ c.blueprint/
│     │  ├─ Blueprint.consistency.md
│     │  └─ templates/
│     │     └─ Blueprint.template.md
│     └─ c.prd/
│        └─ templates/
│           ├─ example-iteration.md
│           └─ example-new-system.md
├─ docs/
│  └─ bp/        # 蓝图正文与 business-flow.drawio 的统一输出目录
└─ README.md
```

## 当前现状

- 已配置 5 个自定义 Agent：Blueprint Writer、Blueprint Editor、PRD Writer、PRD Editor、PRD Reviewer
- 蓝图模板位于 `.github/resources/c.blueprint/templates/Blueprint.template.md`
- 蓝图共享一致性规范位于 `.github/resources/c.blueprint/Blueprint.consistency.md`
- PRD 参考模板位于 `.github/resources/c.prd/templates/`
- `docs/bp/` 为蓝图正文与蓝图业务流程图的统一输出目录

## Agent 说明

### Blueprint Writer

文件：.github/agents/c.blueprint.agent.md

职责：

- 根据用户需求生成 `docs/bp/Blueprint.md`
- 当需求导致既有蓝图需要结构级重构时，负责整体重写并保持模板结构
- 按 `.github/resources/c.blueprint/templates/Blueprint.template.md` 保持统一蓝图结构
- 与 `.github/resources/c.blueprint/Blueprint.consistency.md` 共享同一套路径、引用、图表和联动同步规则
- 新建蓝图时先复制模板到 `docs/bp/Blueprint.md`，再在副本上填充和修改
- 以业务视角描述系统信息、业务流程、功能蓝图、集成关系、权限范围和 PRD 承接建议

### Blueprint Editor

文件：.github/agents/c.blueprint-editor.agent.md

职责：

- 编辑已有 `docs/bp/Blueprint.md`
- 根据批注、评审意见或新增需求做增量修订
- 同步更新蓝图正文、流程步骤说明、改造需求清单和 `docs/bp/business-flow.drawio`
- 与 Blueprint Writer 共用 `.github/resources/c.blueprint/Blueprint.consistency.md`，保障生成与编辑口径一致

核心约束：

- 不从零开始生成完整蓝图
- 不整体重写无关章节
- 涉及主业务流、角色、关键节点或异常回退时，必须同步更新 Draw.io 图表
- 需要用户决策的固定选项问题优先使用点击式提问

核心约束：

- 面向业务用户确认系统建设方案
- 仅保留系统边界、上下游关系、交互时机等必要技术信息
- 不输出接口设计、数据库设计、技术架构、部署方案或代码实现
- 不替代 PRD，蓝图是后续 PRD Writer 的输入材料

### PRD Writer

文件：.github/agents/c.prd.agent.md

职责：

- 分析 BRD、需求方案或口头需求描述
- 区分系统迭代需求与全新复杂系统需求
- 严格按“大纲 -> 模块中粒度 -> 模块细节 -> 汇总落盘”推进
- 约束 PRD 正文结构、菜单规范、页面关系表达和图表标准

核心约束：

- 不输出技术实现、接口设计、字段编码
- 不在 PRD 中写“待确认”或“待补充”
- 不一次性生成完整 PRD
- 所有不确定项优先在对话中澄清

### PRD Reviewer

文件：.github/agents/c.prd-reviewer.agent.md

职责：

- 评审 PRD 结构完整性
- 检查菜单结构、页面关系、字段定义、业务规则和边界 case
- 校验图表规范、命名规则和引用方式是否符合约束

评审重点：

- 菜单最多 2 级
- 页面关系用结构化文字描述，不额外绘制页面关系图
- 图表仅检查业务流程图和用户旅程图
- 图表文件名必须使用英文且符合 draw.io 命名规范

## 参考模板

蓝图模板位于 .github/resources/c.blueprint/templates/：

- Blueprint.template.md：IT 系统蓝图统一结构模板；生成时复制为 `docs/bp/Blueprint.md` 后再编辑

PRD 参考模板位于 .github/resources/c.prd/templates/：

- example-iteration.md：系统迭代需求模板
- example-new-system.md：全新复杂系统模板

使用 agent 生成或评审内容前，应先读取对应模板，再按模板结构组织内容，避免章节漂移。

蓝图共享规则位于 .github/resources/c.blueprint/：

- Blueprint.consistency.md：Blueprint Writer 与 Blueprint Editor 共用的一致性约束，固定蓝图路径、章节结构、图表路径、引用方式和联动同步规则

## 使用方式

在 VS Code 中通过 GitHub Copilot 调用仓库内 Agent，典型流程如下：

1. 提供需求输入或说明业务背景
2. 调用 Blueprint Writer 新建蓝图，或在需要结构级重构时重写 `docs/bp/Blueprint.md`
3. 蓝图进入修改、补充、评审修订阶段时，调用 Blueprint Editor 做增量编辑与图文同步
4. 蓝图确认后，调用 PRD Writer 进行分层澄清与输出
5. 调用 PRD Reviewer 对结果进行复核

## 当前仓库注意事项

- 当前 .gitignore 采用“默认忽略全部，仅放行指定内容”的策略
- Agent 规则是这个仓库的核心资产，变更前应优先确认 writer 与 reviewer 口径一致
- Blueprint Writer 与 Blueprint Editor 必须先读取 `.github/resources/c.blueprint/Blueprint.consistency.md`，再读取 `.github/resources/c.blueprint/templates/Blueprint.template.md`
- Blueprint Writer 负责新建与结构级重构；Blueprint Editor 负责已有蓝图的增量修订
- 蓝图业务流程图统一落在 `docs/bp/business-flow.drawio`，并在蓝图正文中使用同级相对路径引用
- PRD Writer 的参考模板当前统一收敛在 `.github/resources/c.prd/templates/`，不再放在 agents 目录下
- 业务流程图默认按真实参与主体划分泳道，系统处理优先表示为节点，只有满足特定条件时才单独使用系统泳道

(function (window) {
  const componentName = 'CostOverviewPage';

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      return {
        nowText: '',
        timer: null,
        todos: [
          { id: 'FC-202606-011', name: '核算单等待 OA 审批状态回传', owner: '刘一鸣', time: '今天 10:30', status: '审批中', route: '#/cost/calculation-orders' },
          { id: 'PC-202606-018', name: '预测价已入台账，待确认订单测算同步', owner: '沈佳怡', time: '今天 11:00', status: '待复核', route: '#/cost/price-ledger' },
          { id: 'PV-ATTR-006', name: '玻璃工艺存在未识别属性值', owner: '周航', time: '今天 14:00', status: '异常', route: '#/cost/config' }
        ],
        risks: [
          { title: '压延1 未映射标准值', level: '高', scope: '玻璃 / 玻璃工艺', action: '维护别名映射' },
          { title: '预测价同步订单测算失败', level: '中', scope: 'PC-202605-066', action: '查看同步日志' },
          { title: '正式价多供应商对比口径未配置', level: '中', scope: '预实对比', action: '确认业务口径' }
        ],
        metrics: [
          { label: '审批中核算单', value: '18', sub: '正式价 9 / 预测价 9' },
          { label: '本月预测版本', value: '42', sub: '覆盖 218 个物料' },
          { label: '规则未命中', value: '7', sub: '玻璃品类 5 项', warning: true },
          { label: '订单测算同步失败', value: '3', sub: '待重推', warning: true }
        ]
      };
    },
    mounted() {
      this.refreshNow();
      this.timer = window.setInterval(this.refreshNow, 60000);
    },
    beforeUnmount() {
      if (this.timer) window.clearInterval(this.timer);
    },
    methods: {
      refreshNow() {
        this.nowText = new Date().toLocaleString('zh-CN', { hour12: false });
      },
      go(route) {
        window.location.hash = route;
      }
    },
    template: `
      <div class="overview-home-shell">
        <section class="welcome-banner" data-tour="overview-welcome">
          <div>
            <div class="welcome-eyebrow">采购云成本管理模块</div>
            <h2>成本管理与价格预测工作台</h2>
            <p>聚焦正式价审批闭环、预测价版本台账、价格走势、预实复盘和品类权限管控。</p>
          </div>
          <div class="welcome-meta">
            <el-tag type="primary">玻璃品类 UAT</el-tag>
            <span>{{ nowText }}</span>
          </div>
        </section>

        <section class="kpi-grid is-fixed-4" data-tour="overview-kpi">
          <div v-for="item in metrics" :key="item.label" class="kpi-card" :class="{ 'is-warning': item.warning }">
            <div class="kpi-icon"><i class="ri-bar-chart-box-line"></i></div>
            <div class="kpi-content">
              <div class="kpi-label">{{ item.label }}</div>
              <div class="kpi-value">{{ item.value }}</div>
              <div class="kpi-sub">{{ item.sub }}</div>
            </div>
          </div>
        </section>

        <section class="overview-home-bottom-row">
          <div class="overview-home-todo-panel panel" data-tour="overview-todos">
            <div class="panel-head">
              <div class="panel-title"><span class="bar"></span>今日待办</div>
            </div>
            <div class="panel-body">
              <el-table :data="todos" stripe class="flow-grid-table">
                <el-table-column prop="id" label="单据编号" width="150"></el-table-column>
                <el-table-column prop="name" label="任务名称" min-width="240"></el-table-column>
                <el-table-column prop="owner" label="责任人" width="90"></el-table-column>
                <el-table-column prop="time" label="处理时限" width="120"></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                  <template #default="{ row }">
                    <el-tag :type="row.status === '异常' ? 'danger' : row.status === '审批中' ? 'warning' : 'primary'">{{ row.status }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                  <template #default="{ row }">
                    <el-button link type="primary" @click="go(row.route)">处理</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <div class="overview-home-message-panel panel" data-tour="overview-risks">
            <div class="panel-head">
              <div class="panel-title"><span class="bar"></span>风险提醒</div>
            </div>
            <div class="panel-body">
              <div class="cost-card-list">
                <div v-for="risk in risks" :key="risk.title" class="item">
                  <div style="display:flex;justify-content:space-between;gap:8px;">
                    <strong>{{ risk.title }}</strong>
                    <el-tag size="small" :type="risk.level === '高' ? 'danger' : 'warning'">{{ risk.level }}</el-tag>
                  </div>
                  <div style="color:var(--el-text-color-secondary);font-size:12px;margin-top:6px;">{{ risk.scope }} · {{ risk.action }}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/cost/overview',
    name: '成本管理总览',
    menuKey: 'costOverview',
    component: componentName,
    breadcrumbs: ['采购云成本管理', '成本管理总览'],
    tabInfo: '帮助成本管理员和品类负责人识别待办、规则风险与同步异常。',
    guideSteps: [
      { target: '[data-tour="overview-welcome"]', title: '工作台定位', description: '查看当前原型覆盖的正式价、预测价、台账和分析范围。' },
      { target: '[data-tour="overview-kpi"]', title: '关键指标', description: '快速识别审批中、未命中和同步失败等需要处理的事项。' },
      { target: '[data-tour="overview-todos"]', title: '待办处理', description: '从待办直接跳转到对应核算单、台账或配置页面。' },
      { target: '[data-tour="overview-risks"]', title: '风险提醒', description: '查看影响取价、同步和分析口径的关键风险。' }
    ],
    noteSections: [
      { title: '业务目标与适用角色', content: '本页面向成本管理员、品类负责人和采购领导，集中呈现采购云成本管理模块的核算、台账、同步和分析风险。' },
      { title: '状态流转', content: '正式价和预测价都先由采购云核算单审批，通过后才进入台账；正式价继续同步 OA，预测价继续同步订单测算平台。',
        diagram: { type: 'flow', nodes: [
          { id: 'calc', title: '核算单', meta: '规则算价', tone: 'primary' },
          { id: 'approve', title: '采购云审批', meta: '通过/拒绝', tone: 'warning' },
          { id: 'ledger', title: '价格台账', meta: '正式价/预测价', tone: 'success' },
          { id: 'downstream', title: '外部协同', meta: 'OA/订单测算', tone: 'info' }
        ], edges: [
          { from: 'calc', to: 'approve', label: '提交' },
          { from: 'approve', to: 'ledger', label: '通过' },
          { from: 'ledger', to: 'downstream', label: '同步' }
        ] }
      },
      { title: '边界说明', content: '首页只承载摘要、待办和风险入口，不替代各业务对象的完整列表、配置和分析页面。' }
    ]
  });
})(window);

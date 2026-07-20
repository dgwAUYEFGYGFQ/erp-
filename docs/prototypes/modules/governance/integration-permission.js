(function (window) {
  const componentName = 'IntegrationPermissionPage';

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      return {
        keyword: '',
        activeTab: 'logs',
        logs: [
          { id: 'LOG-20260601-001', system: 'OA', object: 'FC-202606-011', action: '创建调价单', status: '成功', reason: '-', time: '2026-06-01 09:31' },
          { id: 'LOG-20260601-002', system: '订单测算平台', object: 'PC-202605-066', action: '同步预测价', status: '失败', reason: '预测版本未被目标平台识别', time: '2026-06-01 09:42' },
          { id: 'LOG-20260601-003', system: 'PLM', object: 'ATTR-GL-CRAFT', action: '同步属性值', status: '成功', reason: '-', time: '2026-06-01 08:55' }
        ],
        permissions: [
          { user: '沈佳怡', role: '品类成本管理员', categories: '玻璃', actions: '查看/编辑/发布/提交/导出', status: '启用' },
          { user: '刘一鸣', role: '品类采购员', categories: '玻璃', actions: '查看/新增核算单/提交', status: '启用' },
          { user: '陈卓', role: '采购领导', categories: '玻璃、结构件', actions: '查看看板/导出', status: '启用' }
        ]
      };
    },
    computed: {
      currentRows() {
        const rows = this.activeTab === 'logs' ? this.logs : this.permissions;
        return rows.filter((row) => JSON.stringify(row).includes(this.keyword));
      }
    },
    methods: {
      retry(row) {
        row.status = '成功';
        row.reason = '-';
        ElementPlus.ElMessage.success(row.object + ' 已重试成功');
      },
      savePermission() {
        ElementPlus.ElMessage.success('权限配置已保存，后续查询和导出按授权品类过滤');
      },
      exportRows() {
        ElementPlus.ElMessage.success('已导出当前授权范围数据');
      }
    },
    template: `
      <div class="flow-progress-layout">
        <section class="control-panel flow-panel-shell" data-tour="governance-control">
          <el-tabs v-model="activeTab" class="tabbed-list-inline-tabs">
            <el-tab-pane label="接口日志与异常" name="logs"></el-tab-pane>
            <el-tab-pane label="品类权限配置" name="permissions"></el-tab-pane>
          </el-tabs>
          <div class="filter-bar">
            <el-input v-model="keyword" placeholder="按用户、系统、单据、状态搜索" clearable></el-input>
            <el-button @click="keyword=''">重置</el-button>
          </div>
          <div class="table-toolbar flow-action-bar">
            <div class="toolbar-left">
              <el-button type="primary" v-if="activeTab==='permissions'" @click="savePermission"><i class="ri-save-3-line"></i> 保存权限</el-button>
              <el-button @click="exportRows">导出</el-button>
            </div>
            <div class="toolbar-right"><el-tag>导出权限单独控制</el-tag></div>
          </div>
        </section>

        <section class="table-panel flow-panel-shell" data-tour="governance-table">
          <div class="flow-grid-table-wrap" v-if="activeTab==='logs'">
            <el-table :data="currentRows" stripe class="flow-grid-table">
              <el-table-column prop="id" label="日志编号" width="170"></el-table-column>
              <el-table-column prop="system" label="目标系统" width="130"></el-table-column>
              <el-table-column prop="object" label="来源单据/对象" width="160"></el-table-column>
              <el-table-column prop="action" label="接口动作" width="140"></el-table-column>
              <el-table-column prop="status" label="状态" width="90">
                <template #default="{ row }"><el-tag :type="row.status==='成功'?'success':'danger'">{{ row.status }}</el-tag></template>
              </el-table-column>
              <el-table-column prop="reason" label="失败原因" min-width="220"></el-table-column>
              <el-table-column prop="time" label="时间" width="160"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right"><template #default="{ row }"><el-button link type="primary" @click="retry(row)" v-if="row.status==='失败'">重试</el-button></template></el-table-column>
            </el-table>
          </div>
          <div class="flow-grid-table-wrap" v-else>
            <el-table :data="currentRows" stripe class="flow-grid-table">
              <el-table-column prop="user" label="用户" width="120"></el-table-column>
              <el-table-column prop="role" label="角色" width="150"></el-table-column>
              <el-table-column prop="categories" label="授权品类" min-width="170"></el-table-column>
              <el-table-column prop="actions" label="操作权限" min-width="260"></el-table-column>
              <el-table-column prop="status" label="状态" width="90"></el-table-column>
              <el-table-column label="操作" width="120" fixed="right"><template #default><el-button link type="primary">编辑</el-button></template></el-table-column>
            </el-table>
          </div>
          <div class="table-footer"><span>共 {{ currentRows.length }} 条</span><el-pagination layout="prev, pager, next" :total="currentRows.length" :page-size="10"></el-pagination></div>
        </section>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/cost/governance',
    name: '集成日志与权限',
    menuKey: 'integrationPermission',
    component: componentName,
    breadcrumbs: ['采购云成本管理', '协同管控', '集成日志与权限'],
    tabInfo: '帮助管理员监控外部系统同步异常，并按品类配置成本数据权限。',
    guideSteps: [
      { target: '[data-tour="governance-control"]', title: '日志与权限切换', description: '在接口日志和品类权限配置之间切换处理。' },
      { target: '[data-tour="governance-table"]', title: '明细处理', description: '查看 OA、PLM、SAP、订单测算同步结果和用户授权范围。' },
      { target: '.table-toolbar', title: '重试与保存', description: '对失败同步进行重试，或保存品类权限配置。' }
    ],
    noteSections: [
      { title: '业务目标与适用角色', content: '本页面向成本管理员和系统管理员，用于处理外部集成异常和品类权限配置。' },
      { title: '系统边界', content: '采购云负责同步 OA 调价单、接收 OA 状态、同步预测价至订单测算平台；OA 同步 SAP 价格库不属于采购云功能。' },
      { title: '权限边界', content: '所有台账、看板和导出都按用户授权品类过滤；系统管理员是否可查看敏感价格需单独确认。' }
    ]
  });
})(window);

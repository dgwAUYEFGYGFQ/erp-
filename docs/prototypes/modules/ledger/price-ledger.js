(function (window) {
  const componentName = 'PriceLedgerPage';

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      return {
        activeTab: 'all',
        keyword: '',
        drawerVisible: false,
        current: null,
        rows: ChintPrototypeShell.getMockData('cost.ledgers', []),
        tabs: [
          { key: 'all', label: '全部价格' },
          { key: '正式价', label: '正式价台账' },
          { key: '预测价', label: '预测价台账' },
          { key: '版本对比', label: '预测版本' }
        ]
      };
    },
    computed: {
      tabCounts() {
        return this.tabs.reduce((map, tab) => {
          map[tab.key] = tab.key === 'all' || tab.key === '版本对比' ? this.rows.length : this.rows.filter((row) => row.type === tab.key).length;
          return map;
        }, {});
      },
      filteredRows() {
        return this.rows.filter((row) => {
          const matchTab = this.activeTab === 'all' || this.activeTab === '版本对比' || row.type === this.activeTab;
          const text = [row.id, row.material, row.plant, row.supplier, row.source].join(' ');
          return matchTab && (!this.keyword || text.includes(this.keyword));
        });
      }
    },
    methods: {
      openDrawer(row) {
        this.current = row;
        this.drawerVisible = true;
      },
      voidRow(row) {
        ElementPlus.ElMessageBox.confirm('作废后将保留记录并按需同步下游状态，是否继续？', '作废价格记录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.status = '作废';
          ElementPlus.ElMessage.success('价格记录已作废');
        }).catch(() => {});
      },
      exportRows() {
        ElementPlus.ElMessage.success('已按授权品类导出台账');
      }
    },
    template: `
      <div class="flow-progress-layout">
        <section class="control-panel flow-panel-shell tabbed-list-control-panel" data-tour="ledger-control">
          <el-tabs v-model="activeTab" class="tabbed-list-inline-tabs">
            <el-tab-pane v-for="tab in tabs" :key="tab.key" :name="tab.key">
              <template #label>{{ tab.label }} <el-tag size="small">{{ tabCounts[tab.key] }}</el-tag></template>
            </el-tab-pane>
          </el-tabs>
          <div class="filter-bar">
            <el-input v-model="keyword" placeholder="台账编号/物料/工厂/来源单据" clearable></el-input>
            <el-select model-value="玻璃" placeholder="品类" :teleported="false">
              <el-option label="玻璃" value="玻璃"></el-option>
            </el-select>
            <el-button @click="keyword=''">重置</el-button>
          </div>
          <div class="table-toolbar flow-action-bar">
            <div class="toolbar-left">
              <el-button @click="exportRows"><i class="ri-download-line"></i> 导出</el-button>
            </div>
            <div class="toolbar-right"><el-tag>台账来自采购云核算单审批通过后同步</el-tag></div>
          </div>
        </section>

        <section class="table-panel flow-panel-shell" data-tour="ledger-table">
          <div class="flow-grid-table-wrap">
            <el-table :data="filteredRows" stripe class="flow-grid-table">
              <el-table-column type="selection" width="46"></el-table-column>
              <el-table-column prop="id" label="台账编号" width="160"></el-table-column>
              <el-table-column prop="type" label="价格类型" width="100">
                <template #default="{ row }"><el-tag :type="row.type === '正式价' ? 'primary' : 'success'">{{ row.type }}</el-tag></template>
              </el-table-column>
              <el-table-column prop="material" label="物料编码" width="130"></el-table-column>
              <el-table-column prop="plant" label="工厂" width="120"></el-table-column>
              <el-table-column prop="supplier" label="供应商" min-width="160">
                <template #default="{ row }">{{ row.type === '预测价' ? '不适用' : row.supplier }}</template>
              </el-table-column>
              <el-table-column prop="month" label="价格月份" width="110"></el-table-column>
              <el-table-column prop="price" label="价格" width="100"></el-table-column>
              <el-table-column prop="source" label="来源核算单" width="150"></el-table-column>
              <el-table-column prop="status" label="状态" width="90"></el-table-column>
              <el-table-column label="操作" width="180" fixed="right">
                <template #default="{ row }">
                  <el-button link type="primary" @click="openDrawer(row)">来源穿透</el-button>
                  <el-button link type="danger" @click="voidRow(row)">作废</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table-footer"><span>共 {{ filteredRows.length }} 条，预测价不含供应商字段</span><el-pagination layout="prev, pager, next" :total="filteredRows.length" :page-size="10"></el-pagination></div>
        </section>

        <el-drawer v-model="drawerVisible" title="价格来源与版本详情" size="45%">
          <el-descriptions :column="1" border v-if="current">
            <el-descriptions-item label="台账编号">{{ current.id }}</el-descriptions-item>
            <el-descriptions-item label="价格类型">{{ current.type }}</el-descriptions-item>
            <el-descriptions-item label="来源核算单">{{ current.source }}</el-descriptions-item>
            <el-descriptions-item label="价格月份">{{ current.month }}</el-descriptions-item>
            <el-descriptions-item label="价格">{{ current.price }}</el-descriptions-item>
            <el-descriptions-item label="供应商口径">{{ current.type === '预测价' ? '预测价不关联供应商' : current.supplier }}</el-descriptions-item>
          </el-descriptions>
          <el-divider></el-divider>
          <div class="cost-flow-strip">
            <span class="cost-flow-node is-active">核算单审批通过</span>
            <span class="cost-flow-node is-active">同步台账</span>
            <span class="cost-flow-node">来源穿透</span>
            <span class="cost-flow-node">分析看板</span>
          </div>
        </el-drawer>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/cost/price-ledger',
    name: '价格台账',
    menuKey: 'priceLedger',
    component: componentName,
    breadcrumbs: ['采购云成本管理', '台账分析', '价格台账'],
    tabInfo: '帮助业务用户查询正式价和预测价台账，并穿透来源核算单与版本。',
    guideSteps: [
      { target: '[data-tour="ledger-control"]', title: '台账分组', description: '在正式价、预测价和预测版本之间切换查询。' },
      { target: '[data-tour="ledger-table"]', title: '台账明细', description: '查看物料、工厂、价格月份、来源单据和状态。' },
      { target: '.el-table__fixed-right', title: '来源穿透', description: '打开台账来源详情，复核核算单审批通过后的同步链路。' }
    ],
    noteSections: [
      { title: '业务目标与适用角色', content: '本页为价格数据底座，服务采购员、成本管理员、品类负责人和采购领导。' },
      { title: '关键口径', content: '正式价台账可含供应商字段；预测价台账不含供应商字段。两类台账均来自采购云核算单审批通过后同步。' },
      { title: '下游影响', content: '台账数据支撑价格走势图、预实对比、价差分析、目标绩效和订单测算同步。' }
    ]
  });
})(window);

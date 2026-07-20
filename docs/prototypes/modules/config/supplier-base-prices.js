(function (window) {
  const componentName = 'SupplierBasePricePage';

  function emptySupplierRule() {
    return {
      id: '',
      category: '玻璃',
      supplierCode: '',
      supplierName: '',
      factorName: '玻璃基础价',
      basePrice: 0,
      effectiveMonth: '2026-06',
      version: 'V2026.06',
      status: '正常',
      creator: '陆中定',
      remark: ''
    };
  }

  function cloneRule(row) {
    return Object.assign(emptySupplierRule(), row || {});
  }

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      return {
        activeTab: '正常',
        keyword: '',
        factor: '',
        selectedRows: [],
        page: 1,
        pageSize: 10,
        dialogOpen: false,
        dialogMode: 'create',
        editingRow: null,
        form: emptySupplierRule(),
        tabs: [
          { label: '正常', value: '正常' },
          { label: '删除', value: '删除' },
          { label: '全部', value: '全部' }
        ],
        factorOptions: ['玻璃基础价', '镀膜费用', '涂釉费用', '打孔单价', '运费'],
        rows: [
          { id: 'SRJ0000000159', category: '玻璃', supplierCode: '0060000159', supplierName: '新福兴玻璃工业集团有限公司', factorName: '玻璃基础价', basePrice: 0.5, effectiveMonth: '2026-06', version: 'V2026.06', status: '正常', creator: '陆中定', remark: '正式价供应商专属差异' },
          { id: 'SRJ0000004932', category: '玻璃', supplierCode: '0010004932', supplierName: '中国南玻集团股份有限公司', factorName: '镀膜费用', basePrice: 0.3, effectiveMonth: '2026-06', version: 'V2026.06', status: '正常', creator: '陆中定', remark: '正式价供应商专属差异' },
          { id: 'SRJ0000005622', category: '玻璃', supplierCode: '0010005622', supplierName: '浙江宁海旗滨新能源管理有限公司', factorName: '打孔单价', basePrice: -0.5, effectiveMonth: '2026-06', version: 'V2026.06', status: '正常', creator: '陆中定', remark: '供应商工艺优惠' },
          { id: 'SRJ0000005364', category: '玻璃', supplierCode: '0010005364', supplierName: '信义光伏玻璃控股（安徽）有限公司', factorName: '运费', basePrice: 1, effectiveMonth: '2026-05', version: 'V2026.05', status: '删除', creator: '陆中定', remark: '旧运费规则' }
        ]
      };
    },
    computed: {
      tabCounts() {
        return {
          '正常': this.rows.filter((item) => item.status === '正常').length,
          '删除': this.rows.filter((item) => item.status === '删除').length,
          '全部': this.rows.length
        };
      },
      filteredRows() {
        const kw = this.keyword.trim().toLowerCase();
        return this.rows.filter((row) => {
          if (this.activeTab !== '全部' && row.status !== this.activeTab) return false;
          if (this.factor && row.factorName !== this.factor) return false;
          if (kw && ![row.supplierCode, row.supplierName, row.factorName, row.remark].join(' ').toLowerCase().includes(kw)) return false;
          return true;
        });
      },
      pagedRows() {
        const start = (this.page - 1) * this.pageSize;
        return this.filteredRows.slice(start, start + this.pageSize);
      },
      dialogTitle() {
        return this.dialogMode === 'create' ? '新增供应商基础价' : '编辑供应商基础价';
      }
    },
    watch: {
      activeTab() { this.page = 1; },
      keyword() { this.page = 1; },
      factor() { this.page = 1; }
    },
    methods: {
      handleSelection(rows) {
        this.selectedRows = rows;
      },
      openCreate() {
        this.dialogMode = 'create';
        this.editingRow = null;
        this.form = emptySupplierRule();
        this.dialogOpen = true;
      },
      openEdit(row) {
        this.dialogMode = 'edit';
        this.editingRow = row;
        this.form = cloneRule(row);
        this.dialogOpen = true;
      },
      saveRule() {
        if (!this.form.supplierName) {
          ElementPlus.ElMessage.warning('供应商基础价必须选择供应商');
          return;
        }
        if (!this.form.factorName) {
          ElementPlus.ElMessage.warning('请选择价格因子');
          return;
        }
        const payload = cloneRule(this.form);
        if (this.dialogMode === 'create') {
          payload.id = 'SRJ' + String(Date.now()).slice(-10);
          this.rows.unshift(payload);
        } else if (this.editingRow) {
          Object.assign(this.editingRow, payload);
        }
        this.dialogOpen = false;
        ElementPlus.ElMessage.success('供应商基础价已保存，仅用于正式价核算');
      },
      deleteRule(row) {
        ElementPlus.ElMessageBox.confirm('删除后该供应商不再使用专属价，正式价核算将直接取物料属性基础价，是否继续？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.status = '删除';
          ElementPlus.ElMessage.success('已标记删除');
        }).catch(() => {});
      },
      batchDelete() {
        if (!this.selectedRows.length) {
          ElementPlus.ElMessage.warning('请先选择需要删除的供应商规则');
          return;
        }
        this.selectedRows.forEach((row) => { row.status = '删除'; });
        ElementPlus.ElMessage.success('已批量标记删除');
      },
      resetFilter() {
        this.keyword = '';
        this.factor = '';
      },
      importRules() {
        ElementPlus.ElMessage.info('导入时校验供应商、价格因子、有效期和正式价适用范围');
      },
      exportRules() {
        ElementPlus.ElMessage.success('已导出供应商基础价维护列表');
      },
      showLog(row) {
        ElementPlus.ElMessage.info(row.supplierName + '：正式价取价命中供应商基础价；无供应商基础价时取物料属性基础价');
      }
    },
    template: `
      <div class="flow-progress-layout">
        <section class="control-panel flow-panel-shell tabbed-list-control-panel" data-tour="supplier-tabs">
          <div class="panel-body">
            <el-tabs v-model="activeTab" class="tabbed-list-inline-tabs">
              <el-tab-pane v-for="tab in tabs" :key="tab.value" :name="tab.value">
                <template #label>{{ tab.label }} <el-tag size="small" :type="tab.value === '删除' ? 'danger' : 'primary'">{{ tabCounts[tab.value] }}</el-tag></template>
              </el-tab-pane>
            </el-tabs>
            <div class="filter-bar" data-tour="supplier-filter">
              <el-input v-model="keyword" placeholder="搜索供应商编码、名称、备注" clearable style="width: 280px"></el-input>
              <el-select v-model="factor" placeholder="价格因子" clearable :teleported="false" style="width: 180px">
                <el-option v-for="item in factorOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-button @click="resetFilter">重置</el-button>
            </div>
            <div class="table-toolbar flow-action-bar" data-tour="supplier-actions">
              <div class="toolbar-left">
                <el-button type="primary" @click="openCreate"><i class="ri-add-line"></i> 新增</el-button>
                <el-button type="danger" @click="batchDelete"><i class="ri-delete-bin-line"></i> 删除</el-button>
                <el-button @click="importRules"><i class="ri-upload-2-line"></i> 批量导入</el-button>
                <el-button @click="exportRules"><i class="ri-download-2-line"></i> 导出</el-button>
              </div>
              <div class="toolbar-right">
                <el-tag type="success">仅正式价适用</el-tag>
                <el-tag type="info">未维护供应商价时取物料属性基础价</el-tag>
              </div>
            </div>
          </div>
        </section>
        <section class="table-panel flow-panel-shell">
          <div class="panel-body">
            <div class="flow-grid-table-wrap" data-tour="supplier-table">
              <el-table :data="pagedRows" stripe class="flow-grid-table" @selection-change="handleSelection">
                <el-table-column type="selection" width="48"></el-table-column>
                <el-table-column type="index" label="序号" width="70"></el-table-column>
                <el-table-column prop="category" label="品类" width="110"></el-table-column>
                <el-table-column prop="supplierCode" label="供应商ERP编码" min-width="150"></el-table-column>
                <el-table-column prop="supplierName" label="供应商名称" min-width="220"></el-table-column>
                <el-table-column prop="factorName" label="价格因子" min-width="140"></el-table-column>
                <el-table-column prop="basePrice" label="基础价" width="110"></el-table-column>
                <el-table-column prop="effectiveMonth" label="生效月份" width="120"></el-table-column>
                <el-table-column prop="creator" label="创建人" width="100"></el-table-column>
                <el-table-column prop="remark" label="备注" min-width="190"></el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="{ row }">
                    <div class="table-actions">
                      <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
                      <el-button link type="danger" @click="deleteRule(row)">删除</el-button>
                      <el-button link type="primary" @click="showLog(row)">日志</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="table-footer">
              <span>共 {{ filteredRows.length }} 条，已选 {{ selectedRows.length }} 条</span>
              <el-pagination layout="sizes, prev, pager, next" v-model:current-page="page" v-model:page-size="pageSize" :total="filteredRows.length" :page-sizes="[10, 20, 50]" background></el-pagination>
            </div>
          </div>
        </section>
        <el-dialog v-model="dialogOpen" :title="dialogTitle" width="620px" :close-on-click-modal="false" data-tour="supplier-dialog">
          <el-form :model="form" label-width="120px">
            <el-form-item label="品类" required>
              <el-select v-model="form.category" :teleported="false"><el-option label="玻璃" value="玻璃"></el-option></el-select>
            </el-form-item>
            <el-form-item label="供应商" required>
              <el-input v-model="form.supplierName" placeholder="请选择供应商">
                <template #suffix><i class="ri-search-line"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item label="供应商编码">
              <el-input v-model="form.supplierCode"></el-input>
            </el-form-item>
            <el-form-item label="价格因子" required>
              <el-select v-model="form.factorName" :teleported="false" placeholder="从本品类物料基础价已有价格因子中选择">
                <el-option v-for="item in factorOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="基础价" required>
              <el-input-number v-model="form.basePrice" :precision="2" style="width: 100%"></el-input-number>
            </el-form-item>
            <el-form-item label="生效月份">
              <el-input v-model="form.effectiveMonth"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
          <div class="drawer-tip">本页不维护品类通用价，物料属性基础价维护列表中的价格就是品类通用价。本页只维护正式价场景下某供应商在某个价格因子上的专属差异；价格因子只能从该品类物料属性基础价已有价格因子中选择。</div>
          <template #footer>
            <el-button @click="dialogOpen = false">取消</el-button>
            <el-button type="primary" @click="saveRule">确定</el-button>
          </template>
        </el-dialog>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/cost/supplier-base-prices',
    name: '供应商基础价维护列表',
    menuKey: 'supplierBasePrice',
    component: componentName,
    breadcrumbs: ['采购云成本管理', '核算管理', '供应商基础价维护列表'],
    tabInfo: '沿用现有供应商基础价维护列表，并改造为正式价场景下多个价格因子的供应商差异规则。',
    guideSteps: [
      { target: '[data-tour="supplier-tabs"]', title: '状态分组', description: '按正常、删除、全部查看供应商基础价规则。' },
      { target: '[data-tour="supplier-filter"]', title: '供应商筛选', description: '搜索供应商并按价格因子过滤正式价规则。' },
      { target: '[data-tour="supplier-actions"]', title: '维护动作', description: '延续新增、删除、批量导入、导出等现有动作。' },
      { target: '[data-tour="supplier-table"]', title: '规则列表', description: '查看供应商、价格因子、基础价和生效月份。' },
      { target: '[data-tour="supplier-dialog"]', title: '编辑弹窗', description: '维护某供应商在某个价格因子上的正式价专属差异。' }
    ],
    noteSections: [
      { title: '业务目标与适用角色', content: '本页由品类成本管理员维护供应商基础价，沿用现有独立列表页和编辑弹窗。' },
      { title: '本次优化点', content: '将原来按供应商维护一个基础价的能力，改造成品类 + 供应商 + 价格因子的正式价专属差异规则。' },
      { title: '关键边界', content: '本页不维护品类通用价；物料属性基础价就是品类通用价。供应商基础价仅用于正式价核算，预测价不关联供应商。' }
    ]
  });
})(window);

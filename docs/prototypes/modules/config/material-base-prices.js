(function (window) {
  const componentName = 'MaterialBasePricePage';

  function createEmptyRule() {
    return {
      id: '',
      category: '玻璃',
      factorCode: 'PF-BASE',
      factorName: '玻璃基础价',
      priceType: '正式价',
      basePrice: 0,
      effectiveMonth: '2026-06',
      version: 'V2026.06',
      status: '正常',
      remark: '',
      conditions: [
        { attr: '厚度（mm）', mode: '值集', op: '=', value: '3.2mm' },
        { attr: '玻璃工艺', mode: '值集', op: '=', value: '压延1' },
        { attr: '玻璃位置分类', mode: '值集', op: '=', value: '正玻' }
      ]
    };
  }

  function cloneRule(row) {
    const source = row || createEmptyRule();
    return {
      id: source.id || '',
      category: source.category || '玻璃',
      factorCode: source.factorCode || 'PF-BASE',
      factorName: source.factorName || '玻璃基础价',
      priceType: source.priceType || '正式价',
      basePrice: Number(source.basePrice || 0),
      effectiveMonth: source.effectiveMonth || '2026-06',
      version: source.version || 'V2026.06',
      status: source.status || '正常',
      remark: source.remark || '',
      conditions: (source.conditions || []).map((item) => Object.assign({}, item))
    };
  }

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      return {
        activeTab: '正常',
        keyword: '',
        priceType: '',
        factor: '',
        selectedRows: [],
        page: 1,
        pageSize: 10,
        dialogOpen: false,
        dialogMode: 'create',
        editingRow: null,
        form: createEmptyRule(),
        tabs: [
          { label: '正常', value: '正常' },
          { label: '删除', value: '删除' },
          { label: '全部', value: '全部' }
        ],
        factorOptions: ['玻璃基础价', '镀膜费用', '涂釉费用', '打孔单价', '运费'],
        attrOptions: [
          '长',
          '宽',
          '玻璃位置分类',
          '厚度（mm）',
          '玻璃工艺',
          '面积',
          '镀膜类型',
          '外观',
          '开孔情况',
          '透光率%',
          '开孔形状',
          '开孔尺寸'
        ],
        valueSetMap: {
          '玻璃位置分类': ['正玻', '背玻'],
          '厚度（mm）': ['3.2mm', '4.0mm', '5.2mm'],
          '玻璃工艺': ['压延1', '镀膜', '钢化'],
          '镀膜类型': ['LowE', 'AR', '无镀膜'],
          '外观': ['透明', '磨砂', '太阳纹'],
          '开孔情况': ['有孔', '无孔'],
          '开孔形状': ['圆孔', '方孔', '异形孔']
        },
        rows: [
          { id: 'SXJ0000000098', category: '玻璃', factorCode: 'PF-BASE', factorName: '玻璃基础价', priceType: '正式价', basePrice: 17, effectiveMonth: '2026-06', version: 'V2026.06', status: '正常', remark: '正式价规则', conditions: [{ attr: '厚度（mm）', mode: '值集', op: '=', value: '3.2mm' }, { attr: '玻璃工艺', mode: '值集', op: '=', value: '压延1' }, { attr: '玻璃位置分类', mode: '值集', op: '=', value: '正玻' }] },
          { id: 'SXJ0000000099', category: '玻璃', factorCode: 'PF-BASE', factorName: '玻璃基础价', priceType: '预测价', basePrice: 16.5, effectiveMonth: '2026-08', version: '2026-06预测版', status: '正常', remark: '预测价规则，不关联供应商', conditions: [{ attr: '厚度（mm）', mode: '值集', op: '=', value: '3.2mm' }, { attr: '玻璃工艺', mode: '值集', op: '=', value: '压延1' }] },
          { id: 'SXJ0000000100', category: '玻璃', factorCode: 'PF-COAT', factorName: '镀膜费用', priceType: '正式价', basePrice: 13, effectiveMonth: '2026-06', version: 'V2026.06', status: '正常', remark: '按镀膜类型值集命中', conditions: [{ attr: '镀膜类型', mode: '值集', op: '=', value: 'LowE' }] },
          { id: 'SXJ0000000101', category: '玻璃', factorCode: 'PF-PUNCH', factorName: '打孔单价', priceType: '预测价', basePrice: 10, effectiveMonth: '2026-09', version: '2026-06预测版', status: '正常', remark: '订单测算同步使用', conditions: [{ attr: '开孔情况', mode: '值集', op: '=', value: '有孔' }, { attr: '开孔形状', mode: '值集', op: '=', value: '圆孔' }] },
          { id: 'SXJ0000000102', category: '玻璃', factorCode: 'PF-FREIGHT', factorName: '运费', priceType: '正式价', basePrice: 9.5, effectiveMonth: '2026-05', version: 'V2026.05', status: '删除', remark: '旧规则已停用', conditions: [{ attr: '面积', mode: '固定值', op: '=', value: '1.2-1.6' }] }
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
          if (this.priceType && row.priceType !== this.priceType) return false;
          if (this.factor && row.factorName !== this.factor) return false;
          if (kw && ![row.id, row.factorName, row.category, row.remark].join(' ').toLowerCase().includes(kw)) return false;
          return true;
        });
      },
      pagedRows() {
        const start = (this.page - 1) * this.pageSize;
        return this.filteredRows.slice(start, start + this.pageSize);
      },
      dialogTitle() {
        return this.dialogMode === 'create' ? '新增物料属性基础价' : '编辑物料属性基础价';
      }
    },
    watch: {
      activeTab() { this.page = 1; },
      keyword() { this.page = 1; },
      priceType() { this.page = 1; },
      factor() { this.page = 1; }
    },
    methods: {
      handleSelection(rows) {
        this.selectedRows = rows;
      },
      openCreate() {
        this.dialogMode = 'create';
        this.editingRow = null;
        this.form = createEmptyRule();
        this.dialogOpen = true;
      },
      openEdit(row) {
        this.dialogMode = 'edit';
        this.editingRow = row;
        this.form = cloneRule(row);
        this.dialogOpen = true;
      },
      attrValues(attrName) {
        return this.valueSetMap[attrName] || [];
      },
      hasValueSet(attrName) {
        return this.attrValues(attrName).length > 0;
      },
      conditionValuePlaceholder(item) {
        if (!item.attr) return '先选择属性名称';
        return this.hasValueSet(item.attr) ? '从外部系统值集中选择属性值' : '该属性暂无值集，可手工输入';
      },
      onConditionAttrChange(item) {
        item.value = '';
        item.mode = this.hasValueSet(item.attr) ? '值集' : '手工输入';
      },
      addCondition() {
        this.form.conditions.push({ attr: '', mode: '', op: '=', value: '' });
      },
      resetConditions() {
        this.form.conditions = createEmptyRule().conditions;
      },
      removeCondition(index) {
        this.form.conditions.splice(index, 1);
      },
      saveRule() {
        if (!this.form.factorName || !this.form.priceType || !this.form.basePrice) {
          ElementPlus.ElMessage.warning('请补全价格因子、价格类型和基础价');
          return;
        }
        if (this.form.conditions.some((item) => !item.attr || !item.value)) {
          ElementPlus.ElMessage.warning('请补全关联属性组合；有值集的属性值必须从值集中选择');
          return;
        }
        const payload = cloneRule(this.form);
        payload.factorCode = payload.factorCode || 'PF-' + String(payload.factorName).slice(0, 2).toUpperCase();
        if (this.dialogMode === 'create') {
          payload.id = 'SXJ' + String(Date.now()).slice(-10);
          this.rows.unshift(payload);
        } else if (this.editingRow) {
          Object.assign(this.editingRow, payload);
        }
        this.dialogOpen = false;
        ElementPlus.ElMessage.success('物料属性基础价已保存，模板发布校验将使用最新规则');
      },
      deleteRule(row) {
        ElementPlus.ElMessageBox.confirm('删除后规则保留为删除状态，并提示受影响模板，是否继续？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.status = '删除';
          ElementPlus.ElMessage.success('已标记删除，影响 2 个模板版本');
        }).catch(() => {});
      },
      batchDelete() {
        if (!this.selectedRows.length) {
          ElementPlus.ElMessage.warning('请先选择需要删除的规则');
          return;
        }
        this.selectedRows.forEach((row) => { row.status = '删除'; });
        ElementPlus.ElMessage.success('已批量标记删除');
      },
      resetFilter() {
        this.keyword = '';
        this.priceType = '';
        this.factor = '';
      },
      importRules() {
        ElementPlus.ElMessage.info('导入时将校验属性、外部值集、价格类型、有效期和版本');
      },
      exportRules() {
        ElementPlus.ElMessage.success('已导出当前筛选范围的物料属性基础价');
      },
      showLog(row) {
        ElementPlus.ElMessage.info(row.id + ' 命中日志：厚度、工艺、位置分类均匹配外部系统值集');
      }
    },
    template: `
      <div class="flow-progress-layout">
        <section class="control-panel flow-panel-shell tabbed-list-control-panel" data-tour="base-tabs">
          <div class="panel-body">
            <el-tabs v-model="activeTab" class="tabbed-list-inline-tabs">
              <el-tab-pane v-for="tab in tabs" :key="tab.value" :name="tab.value">
                <template #label>{{ tab.label }} <el-tag size="small" :type="tab.value === '删除' ? 'danger' : 'primary'">{{ tabCounts[tab.value] }}</el-tag></template>
              </el-tab-pane>
            </el-tabs>
            <div class="filter-bar" data-tour="base-filter">
              <el-input v-model="keyword" placeholder="搜索基础价编码、价格因子、备注" clearable style="width: 260px"></el-input>
              <el-select v-model="priceType" placeholder="价格类型" clearable :teleported="false" style="width: 160px">
                <el-option label="正式价" value="正式价"></el-option>
                <el-option label="预测价" value="预测价"></el-option>
              </el-select>
              <el-select v-model="factor" placeholder="价格因子" clearable :teleported="false" style="width: 180px">
                <el-option v-for="item in factorOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-button @click="resetFilter">重置</el-button>
            </div>
            <div class="table-toolbar flow-action-bar" data-tour="base-actions">
              <div class="toolbar-left">
                <el-button type="primary" @click="openCreate"><i class="ri-add-line"></i> 新增</el-button>
                <el-button type="danger" @click="batchDelete"><i class="ri-delete-bin-line"></i> 删除</el-button>
                <el-button @click="importRules"><i class="ri-upload-2-line"></i> 批量导入</el-button>
                <el-button @click="exportRules"><i class="ri-download-2-line"></i> 导出</el-button>
              </div>
              <div class="toolbar-right">
                <el-tag type="success">关联属性仅限当前品类 PLM 字段</el-tag>
                <el-tag type="info">正式价/预测价规则隔离</el-tag>
                <el-tag type="warning">属性值按外部值集选择</el-tag>
              </div>
            </div>
          </div>
        </section>
        <section class="table-panel flow-panel-shell">
          <div class="panel-body">
            <div class="flow-grid-table-wrap" data-tour="base-table">
              <el-table :data="pagedRows" stripe class="flow-grid-table" @selection-change="handleSelection">
                <el-table-column type="selection" width="48"></el-table-column>
                <el-table-column type="index" label="序号" width="70"></el-table-column>
                <el-table-column prop="id" label="基础价编码" min-width="150"></el-table-column>
                <el-table-column prop="category" label="品类" width="110"></el-table-column>
                <el-table-column prop="factorCode" label="属性编码" min-width="140"></el-table-column>
                <el-table-column prop="factorName" label="属性名称" min-width="150"></el-table-column>
                <el-table-column label="价格类型" width="120">
                  <template #default="{ row }"><el-tag :type="row.priceType === '预测价' ? 'warning' : 'success'">{{ row.priceType }}</el-tag></template>
                </el-table-column>
                <el-table-column prop="basePrice" label="基础价" width="110"></el-table-column>
                <el-table-column prop="effectiveMonth" label="生效月份" width="120"></el-table-column>
                <el-table-column prop="version" label="版本" min-width="140"></el-table-column>
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
        <el-dialog v-model="dialogOpen" :title="dialogTitle" width="78%" :close-on-click-modal="false" data-tour="base-dialog">
          <el-form :model="form" label-width="110px" class="cost-two-col">
            <el-form-item label="品类" required>
              <el-select v-model="form.category" :teleported="false"><el-option label="玻璃" value="玻璃"></el-option></el-select>
            </el-form-item>
            <el-form-item label="属性" required>
              <el-select v-model="form.factorName" :teleported="false">
                <el-option v-for="item in factorOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格类型" required>
              <el-select v-model="form.priceType" :teleported="false">
                <el-option label="正式价" value="正式价"></el-option>
                <el-option label="预测价" value="预测价"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="基础价" required>
              <el-input-number v-model="form.basePrice" :min="0" :precision="2" style="width: 100%"></el-input-number>
            </el-form-item>
            <el-form-item label="生效月份">
              <el-input v-model="form.effectiveMonth"></el-input>
            </el-form-item>
            <el-form-item label="版本">
              <el-input v-model="form.version"></el-input>
            </el-form-item>
            <el-form-item label="备注" style="grid-column: 1 / -1">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
          <div class="drawer-panel">
            <div class="drawer-form-title">关联属性组合</div>
            <div v-for="(item, index) in form.conditions" :key="index" class="filter-bar">
              <el-tag type="info">{{ index + 1 }}</el-tag>
              <el-select v-model="item.attr" placeholder="属性名称" filterable clearable :teleported="false" style="width: 210px" @change="onConditionAttrChange(item)">
                <el-option v-for="attr in attrOptions" :key="attr" :label="attr" :value="attr"></el-option>
              </el-select>
              <el-select v-model="item.mode" :teleported="false" style="width: 140px" disabled>
                <el-option label="值集" value="值集"></el-option>
                <el-option label="手工输入" value="手工输入"></el-option>
              </el-select>
              <el-select v-model="item.op" :teleported="false" style="width: 90px"><el-option label="=" value="="></el-option></el-select>
              <el-select v-if="hasValueSet(item.attr)" v-model="item.value" filterable clearable :placeholder="conditionValuePlaceholder(item)" :teleported="false" style="flex: 1">
                <el-option v-for="value in attrValues(item.attr)" :key="value" :label="value" :value="value"></el-option>
              </el-select>
              <el-input v-else v-model="item.value" :placeholder="conditionValuePlaceholder(item)" style="flex: 1"></el-input>
              <el-button type="danger" @click="removeCondition(index)"><i class="ri-delete-bin-line"></i></el-button>
            </div>
            <div class="drawer-tip">属性名称只允许选择“属性与规则配置-核算属性字典”中当前品类的 PLM 属性；若该属性在“属性值标准化”中维护了外部值集，则属性值必须直接从值集下拉选择；没有值集的 PLM 属性才允许手工输入。</div>
            <el-button type="primary" @click="addCondition"><i class="ri-add-line"></i> 添加关联属性</el-button>
            <el-button @click="resetConditions">重置</el-button>
          </div>
          <template #footer>
            <el-button @click="dialogOpen = false">取消</el-button>
            <el-button type="primary" @click="saveRule">确定</el-button>
          </template>
        </el-dialog>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/cost/material-base-prices',
    name: '物料属性基础价维护列表',
    menuKey: 'materialBasePrice',
    component: componentName,
    breadcrumbs: ['采购云成本管理', '核算管理', '物料属性基础价维护列表'],
    tabInfo: '沿用现有物料属性基础价维护列表，关联属性仅允许选择当前品类 PLM 属性，并联动属性值标准化。',
    guideSteps: [
      { target: '[data-tour="base-tabs"]', title: '状态分组', description: '按正常、删除、全部查看基础价规则。' },
      { target: '[data-tour="base-filter"]', title: '规则筛选', description: '按价格类型和价格因子筛选正式价或预测价规则。' },
      { target: '[data-tour="base-actions"]', title: '维护动作', description: '延续新增、删除、批量导入、导出等现有动作。' },
      { target: '[data-tour="base-table"]', title: '基础价列表', description: '查看价格因子、价格类型、生效月份、版本和规则状态。' },
      { target: '[data-tour="base-dialog"]', title: '编辑弹窗', description: '在现有编辑弹窗基础上维护关联属性组合和外部值集条件。' }
    ],
    noteSections: [
      { title: '业务目标与适用角色', content: '本页由品类成本管理员维护物料属性基础价，现有功能沿用列表、编辑、导入、导出和日志能力。' },
      { title: '本次优化点', content: '新增价格类型、版本、生效月份、外部值集条件和命中追溯，确保正式价规则和预测价规则隔离。' },
      { title: '关键边界', content: '关联属性只能选择当前品类 PLM 属性；OA/SAP/手工维护字段不作为物料属性基础价条件。预测价规则不包含供应商。' }
    ]
  });
})(window);

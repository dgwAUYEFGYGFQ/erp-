(function (window) {
  const componentName = 'TemplateCenterPage';

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      return {
        keyword: '',
        type: '',
        dialogVisible: false,
        previewVisible: false,
        checkVisible: false,
        current: null,
        rows: [
          { id: 'TPL-GL-F-001', name: '玻璃正式价核算模板', type: '正式价', category: '玻璃', version: 'V3.2', status: '已发布', org: '新能源采购组织', updated: '2026-05-30' },
          { id: 'TPL-GL-P-001', name: '玻璃预测价核算模板', type: '预测价', category: '玻璃', version: 'V2.4', status: '已发布', org: '新能源采购组织', updated: '2026-05-28' },
          { id: 'TPL-GL-F-002', name: '玻璃正式价供应商差异模板', type: '正式价', category: '玻璃', version: 'V1.0', status: '草稿', org: '海宁工厂', updated: '2026-06-01' }
        ],
        dictionaryFields: [
          { code: 'ATTR-OA-END-DATE', name: '价格截止有效期', source: 'OA', category: '全品类' },
          { code: 'ATTR-OA-TAX', name: '销售税代码', source: 'OA', category: '全品类' },
          { code: 'ATTR-OA-SUPPLIER-CODE', name: '供应商编码', source: 'OA', category: '全品类' },
          { code: 'ATTR-SAP-MAT-CODE', name: '物料编码', source: 'SAP', category: '全品类' },
          { code: 'ATTR-SAP-MAT-DESC', name: '物料描述', source: 'SAP', category: '全品类' },
          { code: 'ATTR-GL-THICK', name: '厚度（mm）', source: 'PLM', category: '玻璃' },
          { code: 'ATTR-GL-CRAFT', name: '玻璃工艺', source: 'PLM', category: '玻璃' },
          { code: 'ATTR-GL-POS', name: '玻璃位置分类', source: 'PLM', category: '玻璃' },
          { code: 'ATTR-MANUAL-REMARK', name: '核算备注', source: '手工维护', category: '全品类' }
        ],
        templateFields: [
          { sort: 1, code: 'ATTR-OA-END-DATE', name: '价格截止有效期', block: '基本信息', source: 'OA', alias: '价格截止有效期', component: '日期', visible: true, editable: true, required: true },
          { sort: 2, code: 'ATTR-OA-TAX', name: '销售税代码', block: '基本信息', source: 'OA', alias: '销售税代码', component: '单行文本', visible: true, editable: true, required: true },
          { sort: 3, code: 'ATTR-SAP-MAT-CODE', name: '物料编码', block: '待核算物料', source: 'SAP', alias: '物料编码', component: '单行文本', visible: true, editable: false, required: true },
          { sort: 4, code: 'ATTR-SAP-MAT-DESC', name: '物料描述', block: '待核算物料', source: 'SAP', alias: '物料描述', component: '单行文本', visible: true, editable: false, required: false },
          { sort: 5, code: 'ATTR-GL-THICK', name: '厚度（mm）', block: '待核算物料', source: 'PLM', alias: '厚度（mm）', component: '单行文本', visible: true, editable: false, required: false },
          { sort: 6, code: 'ATTR-GL-CRAFT', name: '玻璃工艺', block: '待核算物料', source: 'PLM', alias: '玻璃工艺', component: '单行文本', visible: true, editable: false, required: false },
          { sort: 7, code: 'ATTR-MANUAL-REMARK', name: '核算备注', block: '基本信息', source: '手工维护', alias: '备注', component: '多行文本', visible: true, editable: true, required: false }
        ],
        checks: [
          { item: '公式循环引用校验', result: '通过', level: 'success', detail: '未发现循环引用' },
          { item: 'OA 必填字段校验', result: '通过', level: 'success', detail: '价格单位、税码、供应商编码均已配置' },
          { item: '预测模板供应商规则校验', result: '通过', level: 'success', detail: '预测价模板未引用供应商规则' },
          { item: '取价依赖校验', result: '警告', level: 'warning', detail: '镀膜费用缺少 2026-09 预测价规则' }
        ]
      };
    },
    computed: {
      filteredRows() {
        return this.rows.filter((row) => {
          const matchKeyword = !this.keyword || [row.id, row.name, row.category].some((value) => String(value).includes(this.keyword));
          const matchType = !this.type || row.type === this.type;
          return matchKeyword && matchType;
        });
      }
    },
    methods: {
      openEdit(row) {
        this.current = row ? { ...row } : { id: 'TPL-NEW', name: '', type: '正式价', category: '玻璃', version: 'V1.0', status: '草稿', org: '新能源采购组织', updated: '2026-06-01' };
        this.dialogVisible = true;
      },
      saveTemplate() {
        if (!this.current.name) {
          ElementPlus.ElMessage.warning('请填写模板名称');
          return;
        }
        const index = this.rows.findIndex((item) => item.id === this.current.id);
        if (index >= 0) this.rows.splice(index, 1, { ...this.current });
        else this.rows.unshift({ ...this.current });
        this.dialogVisible = false;
        ElementPlus.ElMessage.success('模板已保存，请执行发布校验');
      },
      openPreview(row) {
        this.current = row;
        this.previewVisible = true;
      },
      openCheck(row) {
        this.current = row;
        this.checkVisible = true;
      },
      validateExportFields() {
        ElementPlus.ElMessage.info('已生成导入导出字段清单');
      },
      publish() {
        this.checkVisible = false;
        ElementPlus.ElMessage.success('发布校验完成，模板已发布');
      },
      addTemplateField() {
        const exists = new Set(this.templateFields.map((item) => item.code));
        const field = this.dictionaryFields.find((item) => !exists.has(item.code));
        if (!field) {
          ElementPlus.ElMessage.warning('核算属性字典中暂无可新增字段');
          return;
        }
        this.templateFields.push({
          sort: this.templateFields.length + 1,
          code: field.code,
          name: field.name,
          block: '待核算物料',
          source: field.source,
          alias: field.name,
          component: '单行文本',
          visible: true,
          editable: field.source === '手工维护' || field.source === 'OA',
          required: false
        });
        ElementPlus.ElMessage.success('已从核算属性字典新增字段，数据来源自动带出');
      },
      onTemplateFieldChange(row) {
        const field = this.dictionaryFields.find((item) => item.code === row.code);
        if (!field) return;
        row.name = field.name;
        row.source = field.source;
        row.alias = field.name;
        row.editable = field.source === '手工维护' || field.source === 'OA';
      },
      removeTemplateField(row) {
        this.templateFields = this.templateFields.filter((item) => item !== row);
      },
      sourceTagType(source) {
        return source === 'PLM' ? 'success' : source === 'OA' ? 'warning' : source === 'SAP' ? 'primary' : 'info';
      }
    },
    template: `
      <div class="flow-progress-layout">
        <section class="control-panel flow-panel-shell" data-tour="template-filter">
          <div class="filter-bar">
            <el-input v-model="keyword" placeholder="模板编号/名称/品类" clearable></el-input>
            <el-select v-model="type" placeholder="价格类型" clearable :teleported="false">
              <el-option label="正式价" value="正式价"></el-option>
              <el-option label="预测价" value="预测价"></el-option>
            </el-select>
            <el-button @click="keyword='';type=''">重置</el-button>
          </div>
          <div class="table-toolbar flow-action-bar">
            <div class="toolbar-left">
              <el-button type="primary" @click="openEdit(null)"><i class="ri-add-line"></i> 新增模板</el-button>
              <el-button @click="validateExportFields">导入导出字段校验</el-button>
            </div>
            <div class="toolbar-right">
              <el-tag>正式价/预测价模板隔离</el-tag>
            </div>
          </div>
        </section>

        <section class="table-panel flow-panel-shell" data-tour="template-table">
          <div class="flow-grid-table-wrap">
            <el-table :data="filteredRows" stripe class="flow-grid-table">
              <el-table-column prop="id" label="模板编号" width="150"></el-table-column>
              <el-table-column prop="name" label="模板名称" min-width="220"></el-table-column>
              <el-table-column prop="type" label="价格类型" width="100">
                <template #default="{ row }">
                  <el-tag :type="row.type === '正式价' ? 'primary' : 'success'">{{ row.type }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="category" label="品类" width="90"></el-table-column>
              <el-table-column prop="version" label="版本" width="90"></el-table-column>
              <el-table-column prop="status" label="状态" width="100"></el-table-column>
              <el-table-column prop="org" label="适用组织" width="150"></el-table-column>
              <el-table-column prop="updated" label="更新时间" width="120"></el-table-column>
              <el-table-column label="操作" width="230" fixed="right">
                <template #default="{ row }">
                  <el-button link type="primary" @click="openPreview(row)">预览</el-button>
                  <el-button link type="primary" @click="openCheck(row)">校验</el-button>
                  <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table-footer">
            <span>共 {{ filteredRows.length }} 个模板</span>
            <el-pagination layout="prev, pager, next" :total="filteredRows.length" :page-size="10"></el-pagination>
          </div>
        </section>

        <el-dialog v-model="dialogVisible" title="模板新增/编辑" width="82%" :close-on-click-modal="false">
          <el-form :model="current" label-width="110px" class="cost-two-col" v-if="current">
            <el-form-item label="模板名称" required><el-input v-model="current.name"></el-input></el-form-item>
            <el-form-item label="价格类型" required>
              <el-select v-model="current.type" :teleported="false">
                <el-option label="正式价" value="正式价"></el-option>
                <el-option label="预测价" value="预测价"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品类"><el-input v-model="current.category"></el-input></el-form-item>
            <el-form-item label="适用组织"><el-input v-model="current.org"></el-input></el-form-item>
          </el-form>
          <div class="drawer-panel" data-tour="template-field-source">
            <div class="config-section-head">
              <div>
                <div class="drawer-form-title">属性配置</div>
                <div class="drawer-tip">字段从“核算属性字典”选择；数据来源根据字典自动带出，只显示 OA、SAP、PLM、手工维护，不在模板里手工选择来源。</div>
              </div>
              <el-button type="primary" @click="addTemplateField"><i class="ri-add-line"></i> 批量选择属性</el-button>
            </div>
            <el-table :data="templateFields" stripe class="flow-grid-table" height="360">
              <el-table-column type="selection" width="48"></el-table-column>
              <el-table-column label="排序" width="80">
                <template #default="{ row }"><el-input v-model="row.sort"></el-input></template>
              </el-table-column>
              <el-table-column label="编码" width="150">
                <template #default="{ row }">
                  <el-select v-model="row.code" filterable :teleported="false" @change="onTemplateFieldChange(row)">
                    <el-option v-for="item in dictionaryFields" :key="item.code" :label="item.code" :value="item.code"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="名称" min-width="150"></el-table-column>
              <el-table-column label="区块" width="150">
                <template #default="{ row }">
                  <el-select v-model="row.block" :teleported="false">
                    <el-option label="基本信息" value="基本信息"></el-option>
                    <el-option label="待核算物料" value="待核算物料"></el-option>
                    <el-option label="子级物料" value="子级物料"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="数据来源" width="110">
                <template #default="{ row }">
                  <el-tag :type="sourceTagType(row.source)">{{ row.source }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="别名" min-width="150">
                <template #default="{ row }"><el-input v-model="row.alias"></el-input></template>
              </el-table-column>
              <el-table-column label="组件类型" width="140">
                <template #default="{ row }">
                  <el-select v-model="row.component" :teleported="false">
                    <el-option label="单行文本" value="单行文本"></el-option>
                    <el-option label="多行文本" value="多行文本"></el-option>
                    <el-option label="日期" value="日期"></el-option>
                    <el-option label="数字" value="数字"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="显示" width="80">
                <template #default="{ row }"><el-switch v-model="row.visible"></el-switch></template>
              </el-table-column>
              <el-table-column label="可编辑" width="90">
                <template #default="{ row }"><el-switch v-model="row.editable"></el-switch></template>
              </el-table-column>
              <el-table-column label="必输" width="80">
                <template #default="{ row }"><el-switch v-model="row.required"></el-switch></template>
              </el-table-column>
              <el-table-column label="操作" width="90" fixed="right">
                <template #default="{ row }"><el-button link type="danger" @click="removeTemplateField(row)">删除</el-button></template>
              </el-table-column>
            </el-table>
          </div>
          <template #footer>
            <el-button type="primary" @click="saveTemplate">保存</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </template>
        </el-dialog>

        <el-drawer v-model="previewVisible" title="模板预览" size="50%">
          <el-descriptions :column="2" border v-if="current">
            <el-descriptions-item label="基本信息">{{ current.name }} / {{ current.type }}</el-descriptions-item>
            <el-descriptions-item label="字段来源">OA / SAP / PLM / 手工维护，来源从核算属性字典自动带出</el-descriptions-item>
            <el-descriptions-item label="物料区块">SAP 物料编码、物料描述 + PLM 玻璃属性</el-descriptions-item>
            <el-descriptions-item label="取价字段">取物料属性基础价、供应商基础价或公式结果，不在此处维护字段来源</el-descriptions-item>
            <el-descriptions-item label="OA 字段">正式价模板展示 OA 调价单字段，预测价模板隐藏</el-descriptions-item>
            <el-descriptions-item label="供应商规则">仅正式价模板允许</el-descriptions-item>
          </el-descriptions>
        </el-drawer>

        <el-drawer v-model="checkVisible" title="发布前校验" size="50%">
          <el-table :data="checks" stripe>
            <el-table-column prop="item" label="校验项" min-width="180"></el-table-column>
            <el-table-column prop="result" label="结果" width="90">
              <template #default="{ row }"><el-tag :type="row.level">{{ row.result }}</el-tag></template>
            </el-table-column>
            <el-table-column prop="detail" label="说明" min-width="220"></el-table-column>
          </el-table>
          <template #footer>
            <el-button type="primary" @click="publish">确认发布</el-button>
            <el-button @click="checkVisible=false">关闭</el-button>
          </template>
        </el-drawer>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/cost/templates',
    name: '核算模板中心',
    menuKey: 'templateCenter',
    component: componentName,
    breadcrumbs: ['采购云成本管理', '基础配置', '核算模板中心'],
    tabInfo: '帮助成本管理员配置、预览、校验和发布正式价/预测价核算模板。',
    guideSteps: [
      { target: '[data-tour="template-filter"]', title: '筛选与操作', description: '按价格类型和品类定位模板，并执行新增、校验等动作。' },
      { target: '[data-tour="template-table"]', title: '模板列表', description: '查看模板版本、发布状态和适用组织。' },
      { target: '.el-table__fixed-right', title: '预览与校验', description: '在发布前查看核算单效果并检查公式、OA 字段和规则依赖。' },
      { target: '[data-tour="template-field-source"]', title: '字段来源自动带出', description: '模板只选择字段，数据来源从核算属性字典自动继承。' }
    ],
    noteSections: [
      { title: '业务目标与适用角色', content: '本页承接现有核算模板管理能力，重点在字段配置时从核算属性字典自动带出 OA、SAP、PLM、手工维护来源。' },
      { title: '发布校验边界', content: '预测价模板不得配置供应商价格规则；正式价模板如同步 OA，必须配置 OA 必填字段；字段来源不在模板中手工维护。' },
      { title: '下游影响', content: '已发布模板被核算单引用，模板类型决定本次核算是正式价还是预测价，模板版本会随核算单记录进入计算追溯。' }
    ]
  });
})(window);

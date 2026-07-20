(function (window) {
  const componentName = 'CalculationOrderPage';

  function createEmptyOrder() {
    return {
      id: 'HS202606020001',
      templateId: 'TPL-GL-F-001',
      templateName: '玻璃正式价核算模板',
      templateType: '正式价',
      businessType: '生产',
      scene: '管理端',
      category: '玻璃',
      status: '待提交',
      owner: '沈佳怡',
      updated: '2026-06-02 10:20',
      launchMonth: '',
      targetMonth: '',
      materials: []
    };
  }

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      return {
        activeTab: '待提交',
        keyword: '',
        dialogVisible: false,
        materialDialogVisible: false,
        traceVisible: false,
        current: null,
        selectedMaterials: [],
        tabs: [
          { key: '待提交', label: '待提交' },
          { key: '审批中', label: '审批中' },
          { key: '审批通过', label: '审批通过' },
          { key: '审批拒绝', label: '审批拒绝' },
          { key: '已作废', label: '已作废' },
          { key: '全部', label: '全部' }
        ],
        templates: [
          { id: 'TPL-GL-F-001', name: '玻璃正式价核算模板', type: '正式价', category: '玻璃' },
          { id: 'TPL-GL-P-001', name: '玻璃预测价核算模板', type: '预测价', category: '玻璃' }
        ],
        rows: [
          { id: 'HS202606020001', templateId: 'TPL-GL-F-001', templateName: '玻璃正式价核算模板', templateType: '正式价', businessType: '生产', scene: '管理端', category: '玻璃', status: '待提交', owner: '杨秋', updated: '2026-06-02 09:40', launchMonth: '', targetMonth: '', materials: [] },
          { id: 'HS202606020002', templateId: 'TPL-GL-P-001', templateName: '玻璃预测价核算模板', templateType: '预测价', businessType: '生产', scene: '管理端', category: '玻璃', status: '审批中', owner: '孙晓秋', updated: '2026-06-02 09:12', launchMonth: '2026-06', targetMonth: '2026-08', materials: [] },
          { id: 'HS202605290004', templateId: 'TPL-GL-F-001', templateName: '玻璃正式价核算模板', templateType: '正式价', businessType: '生产', scene: '管理端', category: '玻璃', status: '审批通过', owner: '李思锦', updated: '2026-05-29 15:06', launchMonth: '', targetMonth: '', materials: [] }
        ],
        materialRows: [
          { materialCode: '000000001050000208', materialName: '镀膜压延钢化玻璃_182单玻2272*1128*3.2mm', plantCode: 'YC11', plantName: '盐城太阳能工厂', unit: 'ST', groupDesc: '玻璃', supplierCode: '0060000159', supplierName: '新福兴玻璃工业集团有限公司', length: 2272, width: 1128, position: '正玻', thickness: '3.2mm', craft: '压延1', area: 2.56, coating: 'LowE', appearance: '太阳纹', hole: '无孔' },
          { materialCode: '000000001050000209', materialName: '正面双层镀膜高透钢化玻璃_182双玻2272*1128*2.0mm', plantCode: 'YC11', plantName: '盐城太阳能工厂', unit: 'PC', groupDesc: '玻璃', supplierCode: '0010004932', supplierName: '中国南玻集团股份有限公司', length: 2272, width: 1128, position: '背玻', thickness: '2.0mm', craft: '镀膜', area: 2.56, coating: 'LowE', appearance: '透明', hole: '无孔' },
          { materialCode: '000000001050000225', materialName: '镀膜压延钢化玻璃_182单玻1716*1128*3.2mm', plantCode: 'HN01', plantName: '海宁新能源工厂', unit: 'PC', groupDesc: '玻璃', supplierCode: '0010005622', supplierName: '浙江宁海旗滨新能源管理有限公司', length: 1716, width: 1128, position: '正玻', thickness: '3.2mm', craft: '压延1', area: 1.94, coating: '无镀膜', appearance: '透明', hole: '有孔' }
        ]
      };
    },
    computed: {
      isForecast() {
        return this.current && this.current.templateType === '预测价';
      },
      tabCounts() {
        return this.tabs.reduce((map, tab) => {
          map[tab.key] = tab.key === '全部' ? this.rows.length : this.rows.filter((row) => row.status === tab.key).length;
          return map;
        }, {});
      },
      filteredRows() {
        const kw = this.keyword.trim();
        return this.rows.filter((row) => {
          const tabOk = this.activeTab === '全部' || row.status === this.activeTab;
          const text = [row.id, row.templateName, row.category, row.owner].join(' ');
          return tabOk && (!kw || text.includes(kw));
        });
      }
    },
    methods: {
      openEdit(row) {
        this.current = row ? { ...row, materials: row.materials || [] } : createEmptyOrder();
        this.dialogVisible = true;
      },
      onTemplateChange() {
        const tpl = this.templates.find((item) => item.id === this.current.templateId);
        if (!tpl) return;
        this.current.templateName = tpl.name;
        this.current.templateType = tpl.type;
        this.current.category = tpl.category;
      },
      openMaterialDialog() {
        this.selectedMaterials = [];
        this.materialDialogVisible = true;
      },
      handleMaterialSelection(rows) {
        this.selectedMaterials = rows;
      },
      confirmMaterials() {
        if (!this.selectedMaterials.length) {
          ElementPlus.ElMessage.warning('请先选择物料');
          return;
        }
        this.current.materials = this.selectedMaterials.map((item) => ({
          ...item,
          basePrice: item.thickness === '3.2mm' ? 17 : 13,
          coatingFee: item.coating === 'LowE' ? 3.2 : 0,
          finalPrice: item.thickness === '3.2mm' ? 22.68 : 18.4
        }));
        this.materialDialogVisible = false;
        ElementPlus.ElMessage.success('已获取 SAP 物料编码/物料名称，并带出 PLM 属性值');
      },
      submitOrder() {
        if (!this.current.templateId) {
          ElementPlus.ElMessage.warning('请选择核算模板');
          return;
        }
        if (!this.current.materials.length) {
          ElementPlus.ElMessage.warning('请先获取物料');
          return;
        }
        this.current.status = '审批中';
        const index = this.rows.findIndex((row) => row.id === this.current.id);
        if (index >= 0) this.rows.splice(index, 1, { ...this.current });
        else this.rows.unshift({ ...this.current });
        this.dialogVisible = false;
        ElementPlus.ElMessage.success(this.isForecast ? '预测模板核算单已提交，审批通过后进入预测价台账' : '正式价模板核算单已提交，审批通过后进入正式价台账并同步 OA');
      },
      exportRows() {
        ElementPlus.ElMessage.success('已导出核算单明细列表');
      },
      openTrace(row) {
        this.current = { ...row, materials: row.materials || [] };
        this.traceVisible = true;
      }
    },
    template: `
      <div class="flow-progress-layout">
        <section class="control-panel flow-panel-shell tabbed-list-control-panel" data-tour="calc-control">
          <div class="panel-body">
            <el-tabs v-model="activeTab" class="tabbed-list-inline-tabs">
              <el-tab-pane v-for="tab in tabs" :key="tab.key" :name="tab.key">
                <template #label>{{ tab.label }} <el-tag size="small">{{ tabCounts[tab.key] }}</el-tag></template>
              </el-tab-pane>
            </el-tabs>
            <div class="filter-bar">
              <el-input v-model="keyword" placeholder="核算单号/模板/品类/创建人" clearable style="width: 320px"></el-input>
              <el-button @click="keyword=''">重置</el-button>
            </div>
            <div class="table-toolbar flow-action-bar">
              <div class="toolbar-left">
                <el-button type="primary" @click="openEdit(null)"><i class="ri-add-line"></i> 新增</el-button>
                <el-button @click="exportRows"><i class="ri-download-2-line"></i> 导出</el-button>
              </div>
              <div class="toolbar-right">
                <el-tag type="info">是否预测由所选模板决定</el-tag>
                <el-tag type="success">获取物料自动带出 SAP + PLM 数据</el-tag>
              </div>
            </div>
          </div>
        </section>

        <section class="table-panel flow-panel-shell" data-tour="calc-table">
          <div class="flow-grid-table-wrap">
            <el-table :data="filteredRows" stripe class="flow-grid-table">
              <el-table-column type="selection" width="46"></el-table-column>
              <el-table-column prop="id" label="单据编码" width="160"></el-table-column>
              <el-table-column prop="status" label="状态" width="110">
                <template #default="{ row }"><el-tag :type="row.status === '审批通过' ? 'success' : row.status === '审批拒绝' ? 'danger' : 'warning'">{{ row.status }}</el-tag></template>
              </el-table-column>
              <el-table-column prop="businessType" label="业务类型" width="100"></el-table-column>
              <el-table-column prop="category" label="视图品类" width="110"></el-table-column>
              <el-table-column prop="templateName" label="核算名称" min-width="210"></el-table-column>
              <el-table-column label="是否预测" width="100">
                <template #default="{ row }"><el-tag :type="row.templateType === '预测价' ? 'success' : 'info'">{{ row.templateType === '预测价' ? '是' : '否' }}</el-tag></template>
              </el-table-column>
              <el-table-column prop="owner" label="创建人" width="100"></el-table-column>
              <el-table-column label="操作" width="180" fixed="right">
                <template #default="{ row }">
                  <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
                  <el-button link type="primary" @click="openTrace(row)">追溯</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table-footer"><span>共 {{ filteredRows.length }} 条</span><el-pagination layout="prev, pager, next" :total="filteredRows.length" :page-size="10"></el-pagination></div>
        </section>

        <el-drawer v-model="dialogVisible" title="核算单明细编辑" size="86%" data-tour="calc-edit">
          <el-form :model="current" label-width="120px" class="cost-two-col" v-if="current">
            <el-form-item label="公司"><el-input model-value="正泰新能源科技股份有限公司" disabled></el-input></el-form-item>
            <el-form-item label="采购组织"><el-input model-value="新能源采购组织" disabled></el-input></el-form-item>
            <el-form-item label="业务类型"><el-input v-model="current.businessType"></el-input></el-form-item>
            <el-form-item label="业务场景"><el-input v-model="current.scene"></el-input></el-form-item>
            <el-form-item label="视图品类"><el-input v-model="current.category" disabled></el-input></el-form-item>
            <el-form-item label="核算模板" required>
              <el-select v-model="current.templateId" :teleported="false" @change="onTemplateChange">
                <el-option v-for="item in templates" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否预测"><el-tag :type="isForecast ? 'success' : 'info'">{{ isForecast ? '是' : '否' }}</el-tag></el-form-item>
            <el-form-item label="预测发起月份" v-if="isForecast"><el-input v-model="current.launchMonth" placeholder="如 2026-06"></el-input></el-form-item>
            <el-form-item label="被预测月份" v-if="isForecast"><el-input v-model="current.targetMonth" placeholder="如 2026-08"></el-input></el-form-item>
          </el-form>

          <div class="drawer-panel">
            <div class="config-section-head">
              <div>
                <div class="drawer-form-title">待核算物料父级</div>
                <div class="drawer-tip">点击获取物料后，系统获取 SAP 的物料编码、物料名称，并同步带出该物料在 PLM 中维护的玻璃属性值。</div>
              </div>
              <div class="config-section-actions">
                <el-button @click="openMaterialDialog"><i class="ri-add-line"></i> 获取物料</el-button>
                <el-button><i class="ri-upload-2-line"></i> 批量导入料工费</el-button>
              </div>
            </div>
            <el-table :data="current ? current.materials : []" stripe class="flow-grid-table" height="300">
              <el-table-column prop="materialCode" label="SAP物料编码" width="170"></el-table-column>
              <el-table-column prop="materialName" label="SAP物料名称" min-width="240"></el-table-column>
              <el-table-column prop="plantCode" label="工厂编码" width="100"></el-table-column>
              <el-table-column prop="supplierCode" label="供应商编码" width="130">
                <template #default="{ row }"><el-input v-if="!isForecast" v-model="row.supplierCode" size="small"></el-input><span v-else>-</span></template>
              </el-table-column>
              <el-table-column prop="supplierName" label="供应商名称" width="210">
                <template #default="{ row }"><el-input v-if="!isForecast" v-model="row.supplierName" size="small"></el-input><span v-else>-</span></template>
              </el-table-column>
              <el-table-column prop="position" label="玻璃位置分类" width="120"></el-table-column>
              <el-table-column prop="thickness" label="厚度（mm）" width="110"></el-table-column>
              <el-table-column prop="craft" label="玻璃工艺" width="110"></el-table-column>
              <el-table-column prop="area" label="面积" width="90"></el-table-column>
              <el-table-column prop="coating" label="镀膜类型" width="110"></el-table-column>
              <el-table-column prop="hole" label="开孔情况" width="100"></el-table-column>
              <el-table-column prop="basePrice" label="基础价" width="90"></el-table-column>
              <el-table-column prop="finalPrice" label="核算价格" width="100"></el-table-column>
            </el-table>
          </div>

          <template #footer>
            <el-button type="primary" @click="submitOrder">提交</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </template>
        </el-drawer>

        <el-dialog v-model="materialDialogVisible" title="获取物料" width="80%" :close-on-click-modal="false">
          <div class="filter-bar">
            <el-input placeholder="物料编码" style="width: 260px"></el-input>
            <el-input placeholder="物料描述" style="width: 260px"></el-input>
            <el-button type="primary">查询</el-button>
          </div>
          <el-table :data="materialRows" stripe class="flow-grid-table" height="420" @selection-change="handleMaterialSelection">
            <el-table-column type="selection" width="48"></el-table-column>
            <el-table-column prop="materialCode" label="物料编码" width="170"></el-table-column>
            <el-table-column prop="materialName" label="物料描述" min-width="260"></el-table-column>
            <el-table-column prop="plantCode" label="工厂编码" width="100"></el-table-column>
            <el-table-column prop="plantName" label="工厂名称" width="150"></el-table-column>
            <el-table-column prop="unit" label="基本单位" width="90"></el-table-column>
            <el-table-column prop="groupDesc" label="物料组描述" width="120"></el-table-column>
            <el-table-column prop="position" label="PLM-玻璃位置分类" width="150"></el-table-column>
            <el-table-column prop="thickness" label="PLM-厚度" width="110"></el-table-column>
            <el-table-column prop="craft" label="PLM-玻璃工艺" width="130"></el-table-column>
            <el-table-column prop="area" label="PLM-面积" width="100"></el-table-column>
            <el-table-column prop="coating" label="PLM-镀膜类型" width="130"></el-table-column>
          </el-table>
          <template #footer>
            <el-button @click="materialDialogVisible=false">取消</el-button>
            <el-button type="primary" @click="confirmMaterials">确定</el-button>
          </template>
        </el-dialog>

        <el-dialog v-model="traceVisible" title="计算过程追溯" width="760px">
          <el-table :data="[{ f: '物料取数', s: 'SAP + PLM', r: '物料编码/物料名称来自 SAP，玻璃属性来自 PLM' }, { f: '是否预测', s: '核算模板', r: current && current.templateType === '预测价' ? '选择预测价模板，生成预测价台账' : '选择正式价模板，生成正式价台账并同步 OA' }, { f: '取价', s: '价格规则', r: '按物料属性基础价、供应商基础价和公式计算价格' }]" stripe>
            <el-table-column prop="f" label="节点"></el-table-column>
            <el-table-column prop="s" label="来源"></el-table-column>
            <el-table-column prop="r" label="说明"></el-table-column>
          </el-table>
        </el-dialog>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/cost/calculation-orders',
    name: '核算单明细列表',
    menuKey: 'calculationOrders',
    component: componentName,
    breadcrumbs: ['采购云成本管理', '核算执行', '核算单明细列表'],
    tabInfo: '沿用现有核算单界面，是否预测由所选核算模板决定；获取物料自动带出 SAP 物料信息和 PLM 属性值。',
    guideSteps: [
      { target: '[data-tour="calc-control"]', title: '统一核算单列表', description: '正式价和预测价共用一个核算单列表，按状态筛选。' },
      { target: '[data-tour="calc-table"]', title: '模板决定场景', description: '是否预测由核算单选择的模板类型决定。' },
      { target: '[data-tour="calc-edit"]', title: '获取物料', description: '获取 SAP 物料编码/名称，并带出 PLM 属性值。' }
    ],
    noteSections: [
      { title: '业务目标与适用角色', content: '本页承接现有核算单明细列表和编辑页，不拆正式价/预测价两个界面。' },
      { title: '关键规则', content: '核算单是否为预测，取决于所选核算模板是否为预测价模板；预测模板不展示供应商字段，正式价模板可维护供应商。' },
      { title: '上下游关系', content: '获取物料时从 SAP 获取物料编码、物料名称等主数据，从 PLM 获取玻璃属性值，用于后续基础价规则命中和公式计算。' }
    ]
  });
})(window);

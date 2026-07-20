(function (window) {
  const componentName = 'CostConfigPage';

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      return {
        active: 'attributes',
        dirty: false,
        lastSaved: '2026-06-01 09:20',
        categories: [
          { key: 'attributes', name: '核算属性字典', icon: 'ri-file-list-3-line' },
          { key: 'values', name: '属性值标准化', icon: 'ri-git-merge-line' }
        ],
        rows: {
          attributes: [
            { code: 'ATTR-OA-END-DATE', name: '价格截止有效期', source: 'OA', category: '全品类', externalCode: 'oa.priceEndDate', externalName: '价格截止有效期', dataType: '日期', hasValues: '否', remark: '正式价调价单字段', status: true },
            { code: 'ATTR-OA-UNIT', name: '价格单位', source: 'OA', category: '全品类', externalCode: 'oa.priceUnit', externalName: '价格单位', dataType: '枚举', hasValues: '是', remark: '正式价调价单字段', status: true },
            { code: 'ATTR-OA-TAX', name: '销售税代码', source: 'OA', category: '全品类', externalCode: 'oa.taxCode', externalName: '销售税代码', dataType: '枚举', hasValues: '是', remark: '正式价调价单字段', status: true },
            { code: 'ATTR-OA-MONTHS', name: '月数', source: 'OA', category: '全品类', externalCode: 'oa.monthQty', externalName: '月数', dataType: '数字', hasValues: '否', remark: '正式价调价单字段', status: true },
            { code: 'ATTR-OA-DEMAND', name: '需求量', source: 'OA', category: '全品类', externalCode: 'oa.demandQty', externalName: '需求量', dataType: '数字', hasValues: '否', remark: '正式价调价单字段', status: true },
            { code: 'ATTR-OA-MAT-UNIT', name: '物料计量单位', source: 'OA', category: '全品类', externalCode: 'oa.materialUnit', externalName: '物料计量单位', dataType: '枚举', hasValues: '是', remark: '正式价调价单字段', status: true },
            { code: 'ATTR-OA-SUPPLIER-NAME', name: '供方名称', source: 'OA', category: '全品类', externalCode: 'oa.supplierName', externalName: '供方名称', dataType: '文本', hasValues: '否', remark: '核算单按供应商接口带出', status: true },
            { code: 'ATTR-OA-PUR-ORG', name: '采购组织', source: 'OA', category: '全品类', externalCode: 'oa.purchaseOrg', externalName: '采购组织', dataType: '文本', hasValues: '否', remark: '核算单按公司/工厂带出', status: true },
            { code: 'ATTR-OA-SUPPLIER-CODE', name: '供应商编码', source: 'OA', category: '全品类', externalCode: 'oa.supplierCode', externalName: '供应商编码', dataType: '文本', hasValues: '否', remark: '核算单按供应商接口带出', status: true },
            { code: 'ATTR-OA-BUYER-ENTITY', name: '采购主体', source: 'OA', category: '全品类', externalCode: 'oa.buyerEntity', externalName: '采购主体', dataType: '文本', hasValues: '否', remark: '核算单按采购组织带出', status: true },
            { code: 'ATTR-OA-PAYMENT', name: '付款方式', source: 'OA', category: '全品类', externalCode: 'oa.paymentTerm', externalName: '付款方式', dataType: '文本', hasValues: '否', remark: '核算单按供应商接口带出', status: true },
            { code: 'ATTR-SAP-MAT-CODE', name: '物料编码', source: 'SAP', category: '全品类', externalCode: 'sap.materialCode', externalName: '物料编码', dataType: '文本', hasValues: '否', remark: 'SAP 物料主数据字段', status: true },
            { code: 'ATTR-SAP-MAT-DESC', name: '物料描述', source: 'SAP', category: '全品类', externalCode: 'sap.materialDesc', externalName: '物料描述', dataType: '文本', hasValues: '否', remark: 'SAP 物料主数据字段', status: true },
            { code: 'ATTR-GL-LEN', name: '长', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.length', externalName: '长', dataType: '数字', hasValues: '否', remark: '玻璃品类 PLM 属性', status: true },
            { code: 'ATTR-GL-WIDTH', name: '宽', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.width', externalName: '宽', dataType: '数字', hasValues: '否', remark: '玻璃品类 PLM 属性', status: true },
            { code: 'ATTR-GL-POS', name: '玻璃位置分类', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.positionType', externalName: '玻璃位置分类', dataType: '枚举', hasValues: '是', remark: '维护基础价时下拉选择外部值集', status: true },
            { code: 'ATTR-GL-THICK', name: '厚度（mm）', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.thickness', externalName: '厚度（mm）', dataType: '枚举', hasValues: '是', remark: '维护基础价时下拉选择外部值集', status: true },
            { code: 'ATTR-GL-CRAFT', name: '玻璃工艺', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.craft', externalName: '玻璃工艺', dataType: '枚举', hasValues: '是', remark: '维护基础价时下拉选择外部值集', status: true },
            { code: 'ATTR-GL-AREA', name: '面积', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.area', externalName: '面积', dataType: '数字', hasValues: '否', remark: '玻璃品类 PLM 属性', status: true },
            { code: 'ATTR-GL-COAT', name: '镀膜类型', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.coatingType', externalName: '镀膜类型', dataType: '枚举', hasValues: '是', remark: '维护基础价时下拉选择外部值集', status: true },
            { code: 'ATTR-GL-APPEAR', name: '外观', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.appearance', externalName: '外观', dataType: '枚举', hasValues: '是', remark: '维护基础价时下拉选择外部值集', status: true },
            { code: 'ATTR-GL-HOLE', name: '开孔情况', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.holeFlag', externalName: '开孔情况', dataType: '枚举', hasValues: '是', remark: '维护基础价时下拉选择外部值集', status: true },
            { code: 'ATTR-GL-LIGHT', name: '透光率%', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.transmittance', externalName: '透光率%', dataType: '数字', hasValues: '否', remark: '玻璃品类 PLM 属性', status: true },
            { code: 'ATTR-GL-HOLE-SHAPE', name: '开孔形状', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.holeShape', externalName: '开孔形状', dataType: '枚举', hasValues: '是', remark: '维护基础价时下拉选择外部值集', status: true },
            { code: 'ATTR-GL-HOLE-SIZE', name: '开孔尺寸', source: 'PLM', category: '玻璃', externalCode: 'plm.glass.holeSize', externalName: '开孔尺寸', dataType: '文本', hasValues: '否', remark: '玻璃品类 PLM 属性', status: true },
            { code: 'ATTR-MANUAL-REMARK', name: '核算备注', source: '手工维护', category: '全品类', externalCode: '', externalName: '', dataType: '文本', hasValues: '否', remark: '模板需要时人工填写', status: true }
          ],
          values: [
            { code: 'VAL-GL-POS-01', category: '玻璃', attrName: '玻璃位置分类', value: '正玻', source: 'PLM', remark: 'PLM 值集', status: true },
            { code: 'VAL-GL-POS-02', category: '玻璃', attrName: '玻璃位置分类', value: '背玻', source: 'PLM', remark: 'PLM 值集', status: true },
            { code: 'VAL-GL-THICK-32', category: '玻璃', attrName: '厚度（mm）', value: '3.2mm', source: 'PLM', remark: 'PLM 值集', status: true },
            { code: 'VAL-GL-CRAFT-01', category: '玻璃', attrName: '玻璃工艺', value: '压延1', source: 'PLM', remark: 'PLM 值集', status: true },
            { code: 'VAL-GL-CRAFT-02', category: '玻璃', attrName: '玻璃工艺', value: '镀膜', source: 'PLM', remark: 'PLM 值集', status: true },
            { code: 'VAL-GL-COAT-01', category: '玻璃', attrName: '镀膜类型', value: 'LowE', source: 'PLM', remark: 'PLM 值集', status: true },
            { code: 'VAL-GL-HOLE-01', category: '玻璃', attrName: '开孔情况', value: '有孔', source: 'PLM', remark: 'PLM 值集', status: true },
            { code: 'VAL-GL-APPEAR-01', category: '玻璃', attrName: '外观', value: '太阳纹', source: 'PLM', remark: 'PLM 值集', status: false }
          ]
        }
      };
    },
    computed: {
      activeCategory() {
        return this.categories.find((item) => item.key === this.active) || this.categories[0];
      },
      currentRows() {
        return this.rows[this.active] || [];
      }
    },
    methods: {
      switchCategory(key) {
        if (!this.dirty) {
          this.active = key;
          return;
        }
        ElementPlus.ElMessageBox.confirm('当前配置尚未保存，切换分类会保留未保存状态，是否继续？', '切换分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.active = key;
        }).catch(() => {});
      },
      addRule() {
        const prefix = this.active.toUpperCase().slice(0, 3);
        if (this.active === 'attributes') {
          this.rows.attributes.unshift({
            code: prefix + '-' + Math.floor(Math.random() * 900 + 100),
            name: '手工补充字段',
            source: '手工维护',
            category: '全品类',
            externalCode: '',
            externalName: '',
            dataType: '文本',
            hasValues: '否',
            remark: '模板需要时人工填写',
            status: false
          });
        } else {
          this.rows.values.unshift({
            code: prefix + '-' + Math.floor(Math.random() * 900 + 100),
            category: '玻璃',
            attrName: '玻璃位置分类',
            value: '待维护',
            source: 'PLM',
            remark: '外部系统值集',
            status: false
          });
        }
        this.dirty = true;
        ElementPlus.ElMessage.success('已新增配置行，请保存后生效');
      },
      removeRule(row) {
        ElementPlus.ElMessageBox.confirm('删除后会影响引用该配置的模板和规则，是否确认删除？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.rows[this.active] = this.rows[this.active].filter((item) => item !== row);
          this.dirty = true;
        }).catch(() => {});
      },
      markDirty() {
        this.dirty = true;
      },
      saveAll() {
        this.dirty = false;
        this.lastSaved = new Date().toLocaleString('zh-CN', { hour12: false });
        ElementPlus.ElMessage.success('配置已保存，发布校验将使用最新规则');
      },
      discard() {
        ElementPlus.ElMessageBox.confirm('确认放弃本页未保存修改？', '放弃修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dirty = false;
          ElementPlus.ElMessage.info('已放弃未保存修改');
        }).catch(() => {});
      }
    },
    template: `
      <div class="aside-config-layout">
        <section class="config-shell">
          <aside class="config-aside" data-tour="config-aside">
            <div v-for="item in categories" :key="item.key" class="sub-item" :class="{ 'is-active': active === item.key }" @click="switchCategory(item.key)">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </div>
          </aside>
          <main class="config-main">
            <div class="panel-head" data-tour="config-head">
              <div>
                <div class="panel-title"><span class="bar"></span>{{ activeCategory.name }}</div>
                <div class="panel-subtitle">字段来源只维护 OA、SAP、PLM、手工维护；所属品类用“全品类/具体品类”表达适用范围。</div>
              </div>
              <el-button type="primary" @click="addRule"><i class="ri-add-line"></i> 新增配置</el-button>
            </div>
            <div class="config-body" data-tour="config-table">
              <div class="drawer-tip" v-if="active === 'attributes'">OA 调价单字段与 SAP 字段均为全品类；PLM 字段按品类同步。物料属性基础价维护时，只能选择当前品类下来源为 PLM 的属性。</div>
              <div class="drawer-tip" v-else>属性值标准化只维护外部系统已有值集。外部系统叫什么值，系统就维护什么值；物料基础价选择这些属性时，直接从该值集中下拉选择。</div>
              <el-table :data="currentRows" stripe class="flow-grid-table">
                <el-table-column prop="code" label="编码" width="150"></el-table-column>
                <el-table-column v-if="active === 'attributes'" prop="name" label="属性名称" min-width="160"></el-table-column>
                <el-table-column v-if="active === 'attributes'" label="字段来源" width="110">
                  <template #default="{ row }">
                    <el-tag :type="row.source === 'PLM' ? 'success' : row.source === 'OA' ? 'warning' : row.source === 'SAP' ? 'primary' : 'info'">{{ row.source }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column v-if="active === 'attributes'" prop="category" label="所属品类" width="110"></el-table-column>
                <el-table-column v-if="active === 'attributes'" prop="externalCode" label="外部字段编码" min-width="180"></el-table-column>
                <el-table-column v-if="active === 'attributes'" prop="externalName" label="外部字段名称" min-width="150"></el-table-column>
                <el-table-column v-if="active === 'attributes'" prop="dataType" label="数据类型" width="100"></el-table-column>
                <el-table-column v-if="active === 'attributes'" label="是否有值集" width="110">
                  <template #default="{ row }">
                    <el-tag :type="row.hasValues === '是' ? 'success' : 'info'">{{ row.hasValues }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column v-if="active === 'attributes'" prop="remark" label="备注" min-width="220"></el-table-column>
                <el-table-column v-if="active === 'values'" prop="category" label="品类" width="100"></el-table-column>
                <el-table-column v-if="active === 'values'" prop="attrName" label="属性名称" min-width="160"></el-table-column>
                <el-table-column v-if="active === 'values'" prop="value" label="属性值" min-width="180"></el-table-column>
                <el-table-column v-if="active === 'values'" label="值来源" width="110">
                  <template #default="{ row }">
                    <el-tag type="success">{{ row.source }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column v-if="active === 'values'" prop="remark" label="备注" min-width="180"></el-table-column>
                <el-table-column label="启用" width="90">
                  <template #default="{ row }">
                    <el-switch v-model="row.status" @change="markDirty"></el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="120" fixed="right">
                  <template #default="{ row }">
                    <el-button link type="primary" @click="markDirty">编辑</el-button>
                    <el-button link type="danger" @click="removeRule(row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-divider></el-divider>
              <el-form label-width="120px" class="cost-two-col">
                <el-form-item label="字段来源">
                  <el-select model-value="OA / SAP / PLM / 手工维护" :teleported="false" @change="markDirty">
                    <el-option label="OA / SAP / PLM / 手工维护" value="OA / SAP / PLM / 手工维护"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属品类口径">
                  <el-select model-value="全品类或具体品类" :teleported="false" @change="markDirty">
                    <el-option label="全品类或具体品类" value="全品类或具体品类"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </main>
        </section>
        <section class="save-bar" data-tour="config-save">
          <div class="save-status" :class="{ 'is-dirty': dirty }">{{ dirty ? '存在未保存修改，保存后影响模板发布校验和核算取价' : '最近保存：' + lastSaved }}</div>
          <div>
            <el-button type="primary" @click="saveAll">保存全部</el-button>
            <el-button @click="discard">放弃修改</el-button>
          </div>
        </section>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/cost/config',
    name: '属性与规则配置',
    menuKey: 'costConfig',
    component: componentName,
    breadcrumbs: ['采购云成本管理', '基础配置', '属性与规则配置'],
    tabInfo: '帮助成本管理员维护 OA、SAP、PLM、手工维护四类核算属性，以及外部系统已有值集。',
    guideSteps: [
      { target: '[data-tour="config-aside"]', title: '配置分类', description: '切换核算属性字典和属性值标准化配置。' },
      { target: '[data-tour="config-head"]', title: '新增配置', description: '新增字段或外部系统值集，并进入保存校验流程。' },
      { target: '[data-tour="config-table"]', title: '规则明细', description: '查看配置来源、用途、适用范围和启用状态。' },
      { target: '[data-tour="config-save"]', title: '保存生效', description: '保存后配置才会进入模板发布校验和核算取价链路。' }
    ],
    noteSections: [
      { title: '业务目标与适用角色', content: '本页由品类成本管理员维护统一属性字典和属性值标准化，沿用现有核算属性维护页能力并增强字段治理。' },
      { title: '关键规则', content: '字段来源只维护 OA、SAP、PLM、手工维护；所属品类用全品类或具体品类表达适用范围。' },
      { title: '上下游关系', content: 'OA/SAP 字段用于核算模板和核算单接口取值；PLM 字段按品类同步，并作为物料属性基础价维护的唯一可选条件来源。' }
    ]
  });
})(window);

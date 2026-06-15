(function (window) {
  const componentNames = {
    supplierList: 'SupplierReconciliationListPage',
    buyerList: 'BuyerReconciliationListPage',
    buyerDetail: 'BuyerReconciliationDetailPage',
    supplierDetail: 'SupplierReconciliationDetailPage',
    invoiceCreate: 'SupplierInvoiceCreatePage',
    invoiceCheck: 'InvoiceCheckReadonlyPage'
  };

  const statusTabs = ['待确认', '已确认', '已校验', '已作废', '全部'];
  const adjustmentTypes = [
    '索赔',
    '贴息',
    '应收抵扣-包材回收',
    '应收抵扣-认证费',
    '应收抵扣-其他',
    '认证费（负数发票）',
    '其他（负数发票）',
    '折让（负数发票）'
  ];

  const appState = {
    currentStatementId: 'RK009202606120003',
    currentInvoiceStatementId: 'RK009202606120002',
    statements: [
      {
        id: 'RK009202606120003',
        status: '待确认',
        factoryCode: 'HN01',
        factoryName: '海宁新能源工厂',
        supplierCode: '0010001404',
        supplierName: '杭州萧山江海实业有限公司',
        taxExcludedAmount: 1598.6,
        taxIncludedAmount: 1806.42,
        inboundTime: '2026-06-12 17:21:59',
        invoiceSaveNo: '',
        warehouse: 'JZ01',
        accountingSubject: '海宁新能源工厂/HN01',
        amountText: '壹仟伍佰玖拾捌元陆角',
        settlementAmount: 0,
        details: [
          { seq: 1, receiptDate: '2026-06-12', materialCode: '000000001070000207', materialDesc: '工字轮汇流条 4*0.3mm，13±0.5kg/卷', quantity: 20, unit: '千克', price: 79.93, amount: 1598.6, plant: 'HN01', location: 'JZ01', erpPo: '4900014482', erpLine: '00010', type: '标准采购', orderNo: 'PO20260612001' }
        ],
        fees: [
          { id: 'FEE-001', selected: false, type: '索赔', serial: 'OA-SP-20260613-001', amount: 12800, remark: '包装破损索赔，随本次发票校验扣减', attachment: '索赔附件.pdf' },
          { id: 'FEE-002', selected: false, type: '应收抵扣-认证费', serial: 'RC-RZ-20260613-002', amount: 123, remark: '认证费用抵扣', attachment: '' }
        ]
      },
      {
        id: 'RK009202606120002',
        status: '已确认',
        factoryCode: 'HN01',
        factoryName: '海宁新能源工厂',
        supplierCode: '0010001404',
        supplierName: '杭州萧山江海实业有限公司',
        taxExcludedAmount: 3636.3,
        taxIncludedAmount: 4109.02,
        inboundTime: '2026-06-12 16:51:08',
        invoiceSaveNo: 'FP009202606120002',
        warehouse: 'JZ01',
        accountingSubject: '海宁新能源工厂/HN01',
        amountText: '叁仟陆佰叁拾陆元叁角',
        settlementAmount: 0,
        details: [
          { seq: 1, receiptDate: '2026-06-12', materialCode: '000000001070000247', materialDesc: '工字轮圆形互联条0.24mm，13±0.5kg/卷', quantity: 40, unit: '千克', price: 90.91, amount: 3636.3, plant: 'HN01', location: 'JZ01', erpPo: '4500142570', erpLine: '00010', type: '标准采购', orderNo: 'PO20260612002' }
        ],
        fees: [
          { id: 'FEE-101', selected: false, type: '贴息', serial: 'OA-HTPS-20260612-016', amount: 36.3, remark: '合同贴息随对账单固化展示', attachment: '贴息说明.pdf' }
        ]
      },
      {
        id: 'RK009202606110008',
        status: '已校验',
        factoryCode: 'HN01',
        factoryName: '海宁新能源工厂',
        supplierCode: '0010001404',
        supplierName: '杭州萧山江海实业有限公司',
        taxExcludedAmount: 593631.2,
        taxIncludedAmount: 670803.26,
        inboundTime: '2026-06-11 13:36:24',
        invoiceSaveNo: 'FP009202405200007',
        warehouse: 'JZ01',
        accountingSubject: '海宁新能源工厂/HN01',
        amountText: '伍拾玖万叁仟陆佰叁拾壹元贰角',
        settlementAmount: 0,
        details: [
          { seq: 1, receiptDate: '2026-05-20', materialCode: '000000001070000247', materialDesc: '工字轮圆形互联条0.24mm，13±0.5kg/卷', quantity: 7600, unit: '千克', price: 78.11, amount: 593631.2, plant: 'HN01', location: 'JZ01', erpPo: '4500142570', erpLine: '00010', type: '标准采购', orderNo: 'PO20240520007' }
        ],
        fees: [
          { id: 'FEE-201', selected: false, type: '折让（负数发票）', serial: 'ZR-20260611-003', amount: -1200, remark: '质量折让，开负数发票', attachment: '折让确认单.pdf' }
        ]
      },
      {
        id: 'RK009202606090006',
        status: '已作废',
        factoryCode: 'HN01',
        factoryName: '海宁新能源工厂',
        supplierCode: '0010001404',
        supplierName: '杭州萧山江海实业有限公司',
        taxExcludedAmount: 8560,
        taxIncludedAmount: 9672.8,
        inboundTime: '2026-06-09 09:18:30',
        invoiceSaveNo: '',
        warehouse: 'JZ01',
        accountingSubject: '海宁新能源工厂/HN01',
        amountText: '捌仟伍佰陆拾元整',
        settlementAmount: 0,
        details: [
          { seq: 1, receiptDate: '2026-06-09', materialCode: '000000001070000288', materialDesc: '边框辅材包', quantity: 100, unit: '套', price: 85.6, amount: 8560, plant: 'HN01', location: 'JZ01', erpPo: '4900014499', erpLine: '00020', type: '标准采购', orderNo: 'PO20260609006' }
        ],
        fees: []
      }
    ]
  };

  const ledgerRows = {
    索赔: [
      { checked: false, no: 'OA-SP-20260613-001', factoryCode: 'HN01', factoryName: '海宁新能源工厂', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司', material: '包装破损组件', qty: 12, amount: 12800, remark: '运输包装破损索赔', invoiced: '否', subject: 'HN01', factory: '海宁新能源工厂', supplier: '江海实业', companyCode: '1000', closed: '否', endTime: '2026-06-13 09:30', materialType: '包材', companyName: '正泰新能科技股份有限公司', creator: '王一帆' },
      { checked: false, no: 'OA-SP-20260608-004', factoryCode: 'HN01', factoryName: '海宁新能源工厂', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司', material: '汇流条批次偏差', qty: 5, amount: 6200, remark: '来料偏差扣款', invoiced: '否', subject: 'HN01', factory: '海宁新能源工厂', supplier: '江海实业', companyCode: '1000', closed: '是', endTime: '2026-06-08 16:20', materialType: '原材料', companyName: '正泰新能科技股份有限公司', creator: '赵晨' }
    ],
    贴息: [
      { checked: false, no: 'OA-HTPS-20260612-016', contractNo: 'HT20260612016', ownerNo: 'E10238', contractAmount: 280000, detailNo: '10', payDate: '2026-06-20', payment: 120000, interest: 36.3, afterInterest: 119963.7, point: '0.03%', days: 30, dueDate: '2026-07-20', nextNegative: '否', invoiced: '否', executed: '未付款', supplier: '杭州萧山江海实业有限公司', payer: '正泰新能科技股份有限公司', sap: '4100098821', applyNo: 'FK20260612001', partyA: '正泰新能科技股份有限公司', partyB: '杭州萧山江海实业有限公司', applyLine: 'FK20260612001-10', method: '电汇', payBill: 'PAY20260612001' },
      { checked: false, no: 'OA-HTPS-20260610-003', contractNo: 'HT20260610003', ownerNo: 'E08616', contractAmount: 96000, detailNo: '20', payDate: '2026-06-18', payment: 50000, interest: 28.6, afterInterest: 49971.4, point: '0.02%', days: 28, dueDate: '2026-07-16', nextNegative: '是', invoiced: '否', executed: '待执行', supplier: '杭州萧山江海实业有限公司', payer: '正泰新能科技股份有限公司', sap: '4100097712', applyNo: 'FK20260610003', partyA: '正泰新能科技股份有限公司', partyB: '杭州萧山江海实业有限公司', applyLine: 'FK20260610003-20', method: '银企直连', payBill: 'PAY20260610003' }
    ]
  };

  function injectStyles() {
    if (document.getElementById('order-erp-style')) return;
    const style = document.createElement('style');
    style.id = 'order-erp-style';
    style.textContent = `
      .order-erp-page{background:#eaf2ff;min-height:calc(100vh - 92px);padding:12px;}
      .order-panel{background:#fff;border-radius:4px;margin-bottom:12px;border:1px solid #e4ebf5;}
      .order-panel-head{height:46px;padding:0 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #d9e3f2;font-weight:600;color:#1f2d3d;}
      .order-panel-head .title{display:flex;align-items:center;gap:8px;font-size:16px}.order-panel-head .title:before{content:"";width:4px;height:20px;background:#2d7df0;border-radius:2px}
      .order-panel-body{padding:16px}.order-search-grid{display:grid;grid-template-columns:1.4fr 1.4fr 1fr;gap:16px 24px;align-items:center}.order-search-actions{grid-column:1/-1;text-align:right}
      .order-tabs .el-tabs__header{margin:0}.order-tabs .el-tabs__nav-wrap:after{height:1px;background:#d9e3f2}
      .order-table-wrap{overflow:auto;border:1px solid #d9e3f2}.order-table-wrap .el-table{min-width:1200px}.fee-table-wrap .el-table{min-width:1100px}
      .amount-summary{display:inline-flex;align-items:center;gap:6px;background:#f5f7fa;border:1px solid #dce3ee;border-radius:4px;padding:4px 12px;color:#7b8493;font-weight:600}
      .detail-form-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px 32px}.field-read{display:flex;align-items:center;gap:10px}.field-read .label{width:120px;text-align:right;color:#606266}.field-read .value{flex:1;min-height:32px;line-height:32px;background:#f3f6fa;border:1px solid #dce3ee;border-radius:4px;padding:0 12px;color:#606266}
      .fee-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}.fee-left{display:flex;align-items:center;gap:8px}.fee-left .diff-input{width:210px}
      .readonly-cell{color:#606266;white-space:nowrap}.file-uploader{height:32px;border:1px solid #dcdfe6;border-radius:4px;padding:0 10px;display:flex;align-items:center;justify-content:space-between;gap:8px;background:#fff;cursor:pointer;color:#909399}.file-uploader:hover{border-color:#409eff;background:#f5f9ff}.file-link{color:#2d7df0;cursor:pointer}.file-remove{color:#f56c6c;margin-left:8px;cursor:pointer}.hidden-file-input{display:none}
      .ledger-dialog .el-dialog__body{padding-top:8px}.ledger-search{display:flex;gap:8px;margin-bottom:12px}.ledger-table-wrap{overflow-x:auto;border:1px solid #d9e3f2}.ledger-table{min-width:1800px}
      .table-footer{display:flex;align-items:center;justify-content:space-between;margin-top:12px;color:#606266}.link-disabled{color:#a8abb2;cursor:not-allowed}.statement-status-tip{font-size:12px;color:#7b8493;margin-left:8px}
      .invoice-readonly-block{margin-top:14px;border-top:1px solid #e4ebf5;padding-top:14px}
      @media (max-width:1200px){.order-search-grid,.detail-form-grid{grid-template-columns:1fr}.field-read .label{text-align:left;width:110px}}
    `;
    document.head.appendChild(style);
  }

  function money(value) {
    return Number(value || 0).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function statusType(status) {
    return { 待确认: 'warning', 已确认: 'success', 已校验: 'primary', 已作废: 'info' }[status] || 'info';
  }

  function getStatement(id) {
    return appState.statements.find((item) => item.id === id) || appState.statements[0];
  }

  function go(hash) {
    window.location.hash = hash;
  }

  function createListPage(role) {
    return {
      name: role === 'buyer' ? componentNames.buyerList : componentNames.supplierList,
      data() {
        return {
          statusTabs,
          activeTab: '待确认',
          keyword: '',
          supplierName: '',
          factory: '',
          selectedRows: [],
          page: 1,
          pageSize: 10
        };
      },
      computed: {
        rows() {
          const kw = this.keyword.trim().toLowerCase();
          return appState.statements.filter((row) => {
            if (this.activeTab !== '全部' && row.status !== this.activeTab) return false;
            if (this.supplierName && !row.supplierName.includes(this.supplierName)) return false;
            if (this.factory && !row.factoryName.includes(this.factory)) return false;
            if (kw && ![row.id, row.supplierName, row.factoryName, row.invoiceSaveNo].join(' ').toLowerCase().includes(kw)) return false;
            return true;
          });
        },
        tabCounts() {
          const result = { 全部: appState.statements.length };
          appState.statements.forEach((row) => {
            result[row.status] = (result[row.status] || 0) + 1;
          });
          return result;
        },
        pagedRows() {
          return this.rows.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        },
        isBuyer() {
          return role === 'buyer';
        }
      },
      watch: {
        activeTab() { this.page = 1; },
        keyword() { this.page = 1; },
        supplierName() { this.page = 1; },
        factory() { this.page = 1; }
      },
      methods: {
        money,
        statusType,
        openDetail(row) {
          appState.currentStatementId = row.id;
          go(role === 'buyer' ? '#/buyer/reconciliation-detail' : '#/supplier/reconciliation-detail');
        },
        createInvoice(row) {
          if (row.status !== '已确认') {
            ElementPlus.ElMessage.warning('仅已确认状态的对账单允许进入开票流程');
            return;
          }
          appState.currentInvoiceStatementId = row.id;
          go('#/supplier/invoice-create');
        },
        resetQuery() {
          this.keyword = '';
          this.supplierName = '';
          this.factory = '';
        },
        handleSelection(rows) {
          this.selectedRows = rows;
        },
        voidBill(row) {
          ElementPlus.ElMessage.info(row.id + ' 当前仅用于原型展示，不执行作废流转');
        }
      },
      template: `
        <div class="order-erp-page flow-progress-layout">
          <section class="order-panel control-panel flow-panel-shell">
            <div class="order-panel-body">
              <div class="order-search-grid">
                <el-form-item label="供应商名称">
                  <el-input v-model="supplierName" placeholder="请选择供应商" clearable>
                    <template #suffix><i class="ri-search-line"></i></template>
                  </el-input>
                </el-form-item>
                <el-form-item label="生成时间">
                  <el-date-picker type="daterange" start-placeholder="开始时间" end-placeholder="结束时间" style="width:100%"></el-date-picker>
                </el-form-item>
                <el-form-item label="入库单号">
                  <el-input v-model="keyword" placeholder="请输入入库单号" clearable></el-input>
                </el-form-item>
                <el-form-item label="工厂">
                  <el-input v-model="factory" placeholder="请选择工厂" clearable>
                    <template #suffix><i class="ri-search-line"></i></template>
                  </el-input>
                </el-form-item>
                <div class="order-search-actions">
                  <el-button @click="resetQuery">重置</el-button>
                  <el-button type="primary">查询</el-button>
                  <el-button link type="primary">收起<i class="ri-arrow-up-s-line"></i></el-button>
                </div>
              </div>
            </div>
          </section>

          <section class="order-panel table-panel flow-panel-shell">
            <div class="order-panel-body">
              <el-tabs v-model="activeTab" class="order-tabs tabbed-list-inline-tabs">
                <el-tab-pane v-for="tab in statusTabs" :key="tab" :name="tab">
                  <template #label><span>{{ tab }}</span><el-tag size="small" effect="plain" style="margin-left:6px">{{ tabCounts[tab] || 0 }}</el-tag></template>
                </el-tab-pane>
              </el-tabs>
              <div class="order-table-wrap flow-grid-table-wrap" style="margin-top:12px">
                <el-table :data="pagedRows" stripe class="flow-grid-table" @selection-change="handleSelection">
                  <el-table-column type="selection" width="46"></el-table-column>
                  <el-table-column prop="id" label="入库单号" min-width="180">
                    <template #default="{ row }"><el-button link type="primary" @click="openDetail(row)">{{ row.id }}</el-button></template>
                  </el-table-column>
                  <el-table-column prop="factoryCode" label="工厂编码" width="100"></el-table-column>
                  <el-table-column prop="factoryName" label="工厂名称" min-width="150"></el-table-column>
                  <el-table-column prop="supplierCode" label="供应商编号" min-width="150"></el-table-column>
                  <el-table-column prop="supplierName" label="供应商名称" min-width="220"></el-table-column>
                  <el-table-column label="不含税金额" width="140" align="right">
                    <template #default="{ row }">{{ money(row.taxExcludedAmount) }}</template>
                  </el-table-column>
                  <el-table-column prop="status" label="状态" width="110">
                    <template #default="{ row }"><el-tag :type="statusType(row.status)">{{ row.status }}</el-tag></template>
                  </el-table-column>
                  <el-table-column prop="inboundTime" label="入库单时间" width="180"></el-table-column>
                  <el-table-column prop="invoiceSaveNo" label="发票保存号" min-width="150"></el-table-column>
                  <el-table-column label="操作" width="170" fixed="right">
                    <template #default="{ row }">
                      <el-button link type="primary" @click="openDetail(row)">详情</el-button>
                      <el-button v-if="!isBuyer && row.status === '已确认'" link type="primary" @click="createInvoice(row)">开票</el-button>
                      <span v-else-if="!isBuyer && row.status === '待确认'" class="link-disabled">待采购确认</span>
                      <el-button v-if="isBuyer && row.status === '待确认'" link type="danger" @click="voidBill(row)">作废</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="table-footer">
                <span>共 {{ rows.length }} 条，已选 {{ selectedRows.length }} 条</span>
                <el-pagination v-model:current-page="page" v-model:page-size="pageSize" :total="rows.length" layout="sizes, prev, pager, next" :page-sizes="[10,20,50]"></el-pagination>
              </div>
            </div>
          </section>
        </div>
      `
    };
  }

  function createDetailPage(role) {
    return {
      name: role === 'buyer' ? componentNames.buyerDetail : componentNames.supplierDetail,
      data() {
        return {
          adjustmentTypes,
          statement: getStatement(appState.currentStatementId),
          selectedFees: [],
          ledgerVisible: false,
          ledgerType: '',
          ledgerKeyword: '',
          ledgerSelected: null
        };
      },
      computed: {
        editable() {
          return role === 'buyer' && this.statement.status === '待确认';
        },
        adjustmentTotal() {
          return this.statement.fees.reduce((sum, row) => sum + Number(row.amount || 0), 0);
        },
        allFeeSelected: {
          get() {
            return this.statement.fees.length > 0 && this.statement.fees.every((row) => row.selected);
          },
          set(value) {
            this.statement.fees.forEach((row) => { row.selected = value; });
            this.syncSelectedFees();
          }
        },
        ledgerColumns() {
          if (this.ledgerType === '贴息') {
            return ['OA合同评审单号', '合同号', '合同经办人工号', '合同金额', 'OA明细行号', '货款日期', '货款（元）', '贴息额(元)', '贴息后需支付金额（元）', '贴息点', '贴息期限（天数）', '付款到期日', '是否下次开负值发票[名称]', '是否已开票', '是否执行（付款）', '贴息供应商', '支付主体', 'SAP凭证号（41）', '付款申请单号', '合同甲方', '合同乙方', '付款申请单号+行号', '付款方式（贴息后）', '付款单单号'];
          }
          return ['OA索赔申请编号', '工厂编码', '工厂名称', '供应商编号', '供应商名称', '物料描述', '索赔数量', '含税金额', '备注', '是否已开票', '核算主体', '工厂', '供应商', '公司编码', '是否已完结', '采购审批结束时间', '物料类型', '公司名称', '发起人'];
        },
        ledgerData() {
          return ledgerRows[this.ledgerType] || [];
        }
      },
      watch: {
        'statement.fees': {
          deep: true,
          handler() {
            this.syncSelectedFees();
          }
        }
      },
      methods: {
        money,
        statusType,
        syncSelectedFees() {
          this.selectedFees = this.statement.fees.filter((row) => row.selected);
        },
        addFee() {
          if (!this.editable) return;
          this.statement.fees.push({ id: 'FEE-' + Date.now(), selected: false, type: '', serial: '', amount: 0, remark: '', attachment: '' });
        },
        removeFee(row) {
          if (!this.editable) return;
          this.statement.fees = this.statement.fees.filter((item) => item.id !== row.id);
          this.syncSelectedFees();
        },
        batchRemove() {
          if (!this.selectedFees.length) {
            ElementPlus.ElMessage.warning('请先选择需要删除的数据');
            return;
          }
          ElementPlus.ElMessageBox.confirm('确认删除已选中的附加费用信息吗？', '删除确认', { type: 'warning' }).then(() => {
            const selectedIds = new Set(this.selectedFees.map((row) => row.id));
            this.statement.fees = this.statement.fees.filter((row) => !selectedIds.has(row.id));
            this.syncSelectedFees();
            ElementPlus.ElMessage.success('已删除选中的附加费用信息');
          }).catch(() => {});
        },
        handleTypeChange(row) {
          if (row.type === '索赔' || row.type === '贴息') {
            this.ledgerType = row.type;
            this.ledgerSelected = null;
            this.ledgerVisible = true;
            this.activeFeeRow = row;
          }
        },
        chooseLedger(row) {
          this.ledgerSelected = row;
        },
        confirmLedger() {
          if (!this.ledgerSelected) {
            ElementPlus.ElMessage.warning('请选择一条台账数据');
            return;
          }
          const target = this.activeFeeRow;
          target.serial = this.ledgerSelected.no;
          target.amount = this.ledgerType === '贴息' ? Number(this.ledgerSelected.interest || 0) : Number(this.ledgerSelected.amount || 0);
          this.ledgerVisible = false;
        },
        onFileChange(event, row) {
          const file = event.target.files && event.target.files[0];
          if (file) row.attachment = file.name;
          event.target.value = '';
        },
        triggerFile(row) {
          const ref = this.$refs['fileInput' + row.id];
          const input = Array.isArray(ref) ? ref[0] : ref;
          if (input) input.click();
        },
        viewAttachment(name) {
          if (name) window.alert('查看附件：' + name);
        },
        removeAttachment(row) {
          row.attachment = '';
        },
        confirmStatement() {
          if (!this.editable) return;
          ElementPlus.ElMessageBox.confirm('确认后对账单将变为已确认状态，供应商可基于该对账单开票，是否确认？', '确认对账单', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.statement.status = '已确认';
            this.statement.fees.forEach((row) => { row.selected = false; });
            this.syncSelectedFees();
            ElementPlus.ElMessage.success('对账单已确认，供应商可进入开票流程');
          }).catch(() => {});
        },
        backList() {
          go(role === 'buyer' ? '#/buyer/reconciliation-list' : '#/supplier/reconciliation-list');
        },
        ledgerCell(row, column) {
          const map = this.ledgerType === '贴息'
            ? [row.no, row.contractNo, row.ownerNo, row.contractAmount, row.detailNo, row.payDate, row.payment, row.interest, row.afterInterest, row.point, row.days, row.dueDate, row.nextNegative, row.invoiced, row.executed, row.supplier, row.payer, row.sap, row.applyNo, row.partyA, row.partyB, row.applyLine, row.method, row.payBill]
            : [row.no, row.factoryCode, row.factoryName, row.supplierCode, row.supplierName, row.material, row.qty, row.amount, row.remark, row.invoiced, row.subject, row.factory, row.supplier, row.companyCode, row.closed, row.endTime, row.materialType, row.companyName, row.creator];
          return map[column] == null ? '' : map[column];
        }
      },
      mounted() {
        this.syncSelectedFees();
      },
      template: `
        <div class="order-erp-page flow-progress-layout">
          <section class="order-panel">
            <div class="order-panel-head">
              <div><el-button circle text type="primary" @click="backList"><i class="ri-arrow-left-s-line"></i></el-button><strong>入库对账单明细详情</strong><span class="statement-status-tip">当前状态：<el-tag size="small" :type="statusType(statement.status)">{{ statement.status }}</el-tag></span></div>
              <div>
                <el-button v-if="editable" type="primary" @click="confirmStatement">确认</el-button>
                <el-button>保存</el-button>
                <el-button>同步</el-button>
              </div>
            </div>
          </section>

          <section class="order-panel">
            <div class="order-panel-head"><div class="title">基本信息</div></div>
            <div class="order-panel-body detail-form-grid">
              <div class="field-read"><span class="label">应用工厂：</span><span class="value">{{ statement.accountingSubject }}</span></div>
              <div class="field-read"><span class="label">记账价金额合计：</span><span class="value">零元整</span></div>
              <div class="field-read"><span class="label">¥：</span><span class="value">{{ money(statement.settlementAmount) }}</span></div>
              <div class="field-read"><span class="label">开票价金额合计：</span><span class="value">{{ statement.amountText }}</span></div>
              <div class="field-read"><span class="label">¥：</span><span class="value">{{ money(statement.taxExcludedAmount) }}</span></div>
              <div class="field-read"><span class="label">入库单号：</span><span class="value">{{ statement.id }}</span></div>
            </div>
          </section>

          <section class="order-panel">
            <div class="order-panel-head"><div class="title">对账单明细信息</div><i class="ri-arrow-down-s-line"></i></div>
            <div class="order-panel-body">
              <div class="order-table-wrap">
                <el-table :data="statement.details" stripe class="flow-grid-table">
                  <el-table-column prop="seq" label="序号" width="70"></el-table-column>
                  <el-table-column prop="receiptDate" label="收货日期" width="130"></el-table-column>
                  <el-table-column prop="materialCode" label="物料编号" min-width="180"></el-table-column>
                  <el-table-column prop="materialDesc" label="物料描述" min-width="240" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="quantity" label="收货数量" width="120"></el-table-column>
                  <el-table-column prop="unit" label="单位" width="90"></el-table-column>
                  <el-table-column prop="price" label="不含税单价" width="130"></el-table-column>
                  <el-table-column prop="amount" label="不含税金额" width="130"></el-table-column>
                  <el-table-column prop="plant" label="应用工厂" width="110"></el-table-column>
                  <el-table-column prop="location" label="库位" width="100"></el-table-column>
                  <el-table-column prop="erpPo" label="ERP采购单号" width="150"></el-table-column>
                  <el-table-column prop="erpLine" label="ERP采购单行号" width="150"></el-table-column>
                </el-table>
              </div>

              <div class="invoice-readonly-block">
                <div class="fee-toolbar">
                  <div class="fee-left">
                    <strong>附加费用信息</strong>
                    <span>剩余差异：</span><el-input class="diff-input" disabled></el-input>
                    <el-button v-if="editable" type="primary" @click="addFee">+ 新增一行数据</el-button>
                    <el-button v-if="editable" type="danger" plain @click="batchRemove">删除</el-button>
                  </div>
                  <span class="amount-summary">调整合计：{{ money(adjustmentTotal) }}</span>
                </div>
                <div class="order-table-wrap fee-table-wrap">
                  <el-table :data="statement.fees" stripe class="flow-grid-table">
                    <el-table-column width="46">
                      <template #header><el-checkbox v-if="editable" v-model="allFeeSelected"></el-checkbox></template>
                      <template #default="{ row }"><el-checkbox v-if="editable" v-model="row.selected" @change="syncSelectedFees"></el-checkbox></template>
                    </el-table-column>
                    <el-table-column label="调整类型" min-width="210">
                      <template #default="{ row }">
                        <el-select v-if="editable" v-model="row.type" placeholder="请选择调整类型" :teleported="false" style="width:100%" @change="handleTypeChange(row)">
                          <el-option v-for="item in adjustmentTypes" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <span v-else class="readonly-cell">{{ row.type || '-' }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="流水号" min-width="210">
                      <template #default="{ row }"><el-input v-if="editable" v-model="row.serial" placeholder="选择台账后带出"><template #suffix><i class="ri-search-line"></i></template></el-input><span v-else class="readonly-cell">{{ row.serial || '-' }}</span></template>
                    </el-table-column>
                    <el-table-column label="调整金额（含税）" min-width="170" align="right">
                      <template #default="{ row }"><el-input-number v-if="editable" v-model="row.amount" :controls="true" style="width:100%"></el-input-number><span v-else class="readonly-cell">{{ money(row.amount) }}</span></template>
                    </el-table-column>
                    <el-table-column label="备注" min-width="260">
                      <template #default="{ row }"><el-input v-if="editable" v-model="row.remark" placeholder="请输入备注"></el-input><span v-else class="readonly-cell">{{ row.remark || '-' }}</span></template>
                    </el-table-column>
                    <el-table-column label="附件" min-width="230">
                      <template #default="{ row }">
                        <div v-if="editable" class="file-uploader" @click="triggerFile(row)">
                          <span v-if="row.attachment" class="file-link" @click.stop="viewAttachment(row.attachment)"><i class="ri-attachment-2"></i> {{ row.attachment }}</span>
                          <span v-else>上传或者看附件</span>
                          <span><span v-if="row.attachment" class="file-remove" @click.stop="removeAttachment(row)">删除</span><i class="ri-attachment-line"></i></span>
                          <input class="hidden-file-input" type="file" :ref="'fileInput' + row.id" @change="onFileChange($event, row)" />
                        </div>
                        <span v-else-if="row.attachment" class="file-link" @click="viewAttachment(row.attachment)"><i class="ri-attachment-2"></i> {{ row.attachment }}</span>
                        <span v-else class="readonly-cell">-</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100" fixed="right">
                      <template #default="{ row }"><el-button v-if="editable" link type="danger" @click="removeFee(row)">删除</el-button><span v-else class="readonly-cell">-</span></template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="table-footer"><span>共 {{ statement.fees.length }} 条，已选 {{ selectedFees.length }} 条</span></div>
              </div>
            </div>
          </section>

          <el-dialog v-model="ledgerVisible" :title="ledgerType === '贴息' ? '选择贴息台账' : '选择索赔台账'" width="1240px" class="ledger-dialog" append-to-body>
            <div class="ledger-search">
              <el-input v-model="ledgerKeyword" placeholder="请输入关键编号/供应商/合同号"></el-input>
              <el-button type="primary">查询</el-button>
              <el-button @click="ledgerKeyword = ''">重置</el-button>
            </div>
            <div class="ledger-table-wrap">
              <el-table :data="ledgerData" class="ledger-table" stripe highlight-current-row @current-change="chooseLedger">
                <el-table-column width="50">
                  <template #default="{ row }"><el-radio v-model="ledgerSelected" :label="row">&nbsp;</el-radio></template>
                </el-table-column>
                <el-table-column v-for="(col, index) in ledgerColumns" :key="col" :label="col" min-width="140">
                  <template #default="{ row }">{{ ledgerCell(row, index) }}</template>
                </el-table-column>
              </el-table>
            </div>
            <template #footer>
              <el-button @click="ledgerVisible = false">取消</el-button>
              <el-button type="primary" @click="confirmLedger">确定</el-button>
            </template>
          </el-dialog>
        </div>
      `
    };
  }

  function createInvoiceCreatePage() {
    return {
      name: componentNames.invoiceCreate,
      data() {
        return {
          statement: getStatement(appState.currentInvoiceStatementId),
          selectableStatements: appState.statements.filter((row) => row.status === '已确认')
        };
      },
      computed: {
        feeTotal() {
          return this.statement.fees.reduce((sum, row) => sum + Number(row.amount || 0), 0);
        }
      },
      methods: {
        money,
        switchStatement(id) {
          this.statement = getStatement(id);
          appState.currentInvoiceStatementId = id;
        },
        viewAttachment(name) {
          if (name) window.alert('查看附件：' + name);
        }
      },
      template: `
        <div class="order-erp-page flow-progress-layout">
          <section class="order-panel">
            <div class="order-panel-head"><div><el-button circle text type="primary"><i class="ri-arrow-left-s-line"></i></el-button><strong>待开票列表-新增</strong></div><div><el-button type="primary">保存</el-button><el-button>提交</el-button></div></div>
            <div class="order-panel-body detail-form-grid">
              <div class="field-read"><span class="label">对账单号：</span><span class="value">
                <el-select :model-value="statement.id" :teleported="false" style="width:100%" @change="switchStatement">
                  <el-option v-for="item in selectableStatements" :key="item.id" :label="item.id + '（已确认）'" :value="item.id"></el-option>
                </el-select>
              </span></div>
              <div class="field-read"><span class="label">供应商名称：</span><span class="value">{{ statement.supplierName }}</span></div>
              <div class="field-read"><span class="label">单据状态：</span><span class="value">已确认，可开票</span></div>
            </div>
          </section>
          <section class="order-panel">
            <div class="order-panel-head"><div class="title">对账单明细信息</div></div>
            <div class="order-panel-body">
              <div class="order-table-wrap">
                <el-table :data="statement.details" stripe class="flow-grid-table">
                  <el-table-column prop="seq" label="序号" width="70"></el-table-column>
                  <el-table-column prop="type" label="单据类型" width="110"></el-table-column>
                  <el-table-column prop="orderNo" label="SRM采购单号" min-width="150"></el-table-column>
                  <el-table-column prop="erpPo" label="ERP采购单号" min-width="150"></el-table-column>
                  <el-table-column prop="erpLine" label="ERP采购单行号" min-width="150"></el-table-column>
                  <el-table-column prop="materialCode" label="物料编号" min-width="180"></el-table-column>
                  <el-table-column prop="materialDesc" label="物料描述" min-width="260" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="amount" label="不含税金额" width="140"></el-table-column>
                </el-table>
              </div>
              <div class="invoice-readonly-block">
                <div class="fee-toolbar"><strong>附加费用明细</strong><span class="amount-summary">调整合计：{{ money(feeTotal) }}</span></div>
                <div class="order-table-wrap fee-table-wrap">
                  <el-table :data="statement.fees" stripe class="flow-grid-table">
                    <el-table-column prop="type" label="调整类型" min-width="200"></el-table-column>
                    <el-table-column prop="serial" label="流水号" min-width="210"></el-table-column>
                    <el-table-column label="调整金额（含税）" width="170" align="right"><template #default="{ row }">{{ money(row.amount) }}</template></el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="260"></el-table-column>
                    <el-table-column label="附件" min-width="180"><template #default="{ row }"><span v-if="row.attachment" class="file-link" @click="viewAttachment(row.attachment)">{{ row.attachment }}</span><span v-else>-</span></template></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </section>
        </div>
      `
    };
  }

  function createInvoiceCheckPage() {
    return {
      name: componentNames.invoiceCheck,
      data() {
        return {
          statement: getStatement('RK009202606110008')
        };
      },
      computed: {
        feeTotal() {
          return this.statement.fees.reduce((sum, row) => sum + Number(row.amount || 0), 0);
        }
      },
      methods: { money },
      template: `
        <div class="order-erp-page flow-progress-layout">
          <section class="order-panel">
            <div class="order-panel-head"><div><el-button circle text type="primary"><i class="ri-arrow-left-s-line"></i></el-button><strong>发票校验单详情</strong></div><div><el-button>同步</el-button><el-button type="primary">保存</el-button></div></div>
            <div class="order-panel-body detail-form-grid">
              <div class="field-read"><span class="label">校验单号：</span><span class="value">JY202606130002</span></div>
              <div class="field-read"><span class="label">供应商编号：</span><span class="value">{{ statement.supplierCode }}</span></div>
              <div class="field-read"><span class="label">供应商名称：</span><span class="value">{{ statement.supplierName }}</span></div>
              <div class="field-read"><span class="label">发票号：</span><span class="value">2222288</span></div>
              <div class="field-read"><span class="label">不含税总额：</span><span class="value">{{ money(statement.taxExcludedAmount) }}</span></div>
              <div class="field-read"><span class="label">开票价总额：</span><span class="value">{{ money(statement.taxIncludedAmount) }}</span></div>
            </div>
          </section>
          <section class="order-panel">
            <div class="order-panel-head"><div class="title">对账单明细信息</div></div>
            <div class="order-panel-body">
              <div class="order-table-wrap">
                <el-table :data="statement.details" stripe class="flow-grid-table">
                  <el-table-column prop="seq" label="序号" width="70"></el-table-column>
                  <el-table-column prop="type" label="单据类型" width="110"></el-table-column>
                  <el-table-column prop="erpPo" label="单据编号" min-width="170"></el-table-column>
                  <el-table-column prop="amount" label="不含税金额" width="150"></el-table-column>
                  <el-table-column prop="receiptDate" label="单据时间" width="140"></el-table-column>
                </el-table>
              </div>
              <div class="invoice-readonly-block">
                <div class="fee-toolbar"><strong>附加费用明细</strong><span class="amount-summary">调整合计：{{ money(feeTotal) }}</span></div>
                <div class="order-table-wrap fee-table-wrap">
                  <el-table :data="statement.fees" stripe class="flow-grid-table">
                    <el-table-column prop="type" label="调整类型" min-width="200"></el-table-column>
                    <el-table-column prop="serial" label="流水号" min-width="210"></el-table-column>
                    <el-table-column label="调整金额（含税）" width="170" align="right"><template #default="{ row }">{{ money(row.amount) }}</template></el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="260"></el-table-column>
                    <el-table-column prop="attachment" label="附件" min-width="180"></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </section>
        </div>
      `
    };
  }

  injectStyles();
  ChintPrototypeShell.registerPageComponent(componentNames.supplierList, createListPage('supplier'));
  ChintPrototypeShell.registerPageComponent(componentNames.buyerList, createListPage('buyer'));
  ChintPrototypeShell.registerPageComponent(componentNames.buyerDetail, createDetailPage('buyer'));
  ChintPrototypeShell.registerPageComponent(componentNames.supplierDetail, createDetailPage('supplier'));
  ChintPrototypeShell.registerPageComponent(componentNames.invoiceCreate, createInvoiceCreatePage());
  ChintPrototypeShell.registerPageComponent(componentNames.invoiceCheck, createInvoiceCheckPage());

  const routeDefs = [
    { path: '#/supplier/reconciliation-list', name: '入库对账单列表', menuKey: 'supplierReconciliationList', component: componentNames.supplierList, breadcrumbs: ['订单履约协同', '对账开票协同', '入库对账单列表'], tabInfo: '供应商查看入库对账单状态池，待确认不可开票，已确认可进入后续开票流程。' },
    { path: '#/buyer/reconciliation-list', name: '入库对账单列表', menuKey: 'buyerReconciliationList', component: componentNames.buyerList, breadcrumbs: ['新能订单管理', '对账开票管理', '入库对账单列表'], tabInfo: '采购方查看供应商生成的入库对账单，并在待确认状态进入详情维护附加费用。' },
    { path: '#/buyer/reconciliation-detail', name: '入库对账单明细详情', menuKey: 'buyerReconciliationList', component: componentNames.buyerDetail, breadcrumbs: ['新能订单管理', '入库对账单列表', '入库对账单明细详情'], tabInfo: '采购方在待确认对账单详情中维护附加费用并确认对账单。' },
    { path: '#/supplier/reconciliation-detail', name: '入库对账单明细详情', menuKey: 'supplierReconciliationList', component: componentNames.supplierDetail, breadcrumbs: ['订单履约协同', '入库对账单列表', '入库对账单明细详情'], tabInfo: '供应商只读查看对账单明细和采购方固化的附加费用。' },
    { path: '#/supplier/invoice-create', name: '待开票列表-新增', menuKey: 'supplierInvoiceCreate', component: componentNames.invoiceCreate, breadcrumbs: ['订单履约协同', '待开票列表', '新增'], tabInfo: '供应商仅能选择已确认对账单开票，并在对账单明细信息中核对附加费用。' },
    { path: '#/invoice/check-detail', name: '发票校验单详情', menuKey: 'invoiceCheckDetail', component: componentNames.invoiceCheck, breadcrumbs: ['新能订单管理', '发票校验单列表', '发票校验单详情'], tabInfo: '发票校验阶段只读展示从对账单带出的附加费用，不再维护。' }
  ];

  routeDefs.forEach((route) => {
    ChintPrototypeShell.registerRoute({
      ...route,
      guideSteps: [
        { target: '.order-panel', title: '页面主体', description: '按照采购云后台的查询、表格和详情结构完成状态筛选、查看和维护。' },
        { target: '.flow-grid-table', title: '业务表格', description: '表格展示对账单、明细或附加费用关键字段，长表格支持横向滚动。' }
      ],
      noteSections: [
        { title: '业务调整', content: '本轮状态池统一使用待确认、已确认、已校验、已作废和全部，采购方确认后供应商才能开票。' },
        { title: '权限边界', content: '供应商端只读附加费用；采购方仅在待确认状态维护附加费用并执行确认，确认后所有附加费用固化为只读。' }
      ]
    });
  });
})(window);

(function (window) {
  const componentName = 'OrderScreenshotReplicaPage';
  const routes = {
    supplierList: '#/supplier/reconciliation-list',
    supplierInvoice: '#/supplier/invoice-create',
    buyerList: '#/buyer/reconciliation-list',
    buyerDetail: '#/buyer/reconciliation-detail',
    invoiceCheck: '#/invoice/check-detail',
    supplierDetail: '#/supplier/reconciliation-detail'
  };

  const adjustmentTypes = ['索赔', '贴息', '应收抵扣-包材回收', '应收抵扣-认证费', '应收抵扣-其他', '认证费（负数发票）', '其他（负数发票）', '折让（负数发票）'];
  const tabs = ['待确认', '已确认', '已校验', '已作废', '全部'];

  const state = {
    activeView: 'supplier',
    activePage: 'supplierList',
    activeStatus: '待确认',
    statements: [
      { id: 'RK009202606120003', status: '待确认', factoryCode: 'HN01', factoryName: '海宁新能源工厂', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司', amount: '', time: '2026-06-12 17:21:59', invoiceSaveNo: '' },
      { id: 'RK009202606120002', status: '已确认', factoryCode: 'HN01', factoryName: '海宁新能源工厂', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司', amount: '', time: '2026-06-12 16:51:08', invoiceSaveNo: 'FP009202606120002' },
      { id: 'RK009202606110008', status: '已校验', factoryCode: 'HN01', factoryName: '海宁新能源工厂', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司', amount: '593631.2', time: '2026-06-11 13:36:24', invoiceSaveNo: 'FP009202405200007' }
    ],
    detailStatus: '待确认',
    fees: [
      { id: 'F1', checked: false, type: '索赔', serial: 'OA-SP-20260613-001', amount: 12800, remark: '包装破损索赔，随本次对账确认', attachment: '索赔附件.pdf' },
      { id: 'F2', checked: false, type: '应收抵扣-认证费', serial: 'RC-RZ-20260613-002', amount: 123, remark: '认证费用抵扣', attachment: '' }
    ]
  };

  const claimLedger = [
    ['OA-SP-20260613-001', 'HN01', '海宁新能源工厂', '0010001404', '杭州萧山江海实业有限公司', '包装破损组件', '12', '12800', '运输包装破损索赔', '否', 'HN01', '海宁新能源工厂', '江海实业', '1000', '否', '2026-06-13 09:30', '包材', '正泰新能科技股份有限公司', '王一帆'],
    ['OA-SP-20260608-004', 'HN01', '海宁新能源工厂', '0010001404', '杭州萧山江海实业有限公司', '汇流条批次偏差', '5', '6200', '来料偏差扣款', '否', 'HN01', '海宁新能源工厂', '江海实业', '1000', '是', '2026-06-08 16:20', '原材料', '正泰新能科技股份有限公司', '赵晨']
  ];
  const interestLedger = [
    ['OA-HTPS-20260612-016', 'HT20260612016', 'E10238', '280000', '10', '2026-06-20', '120000', '36.3', '119963.7', '0.03%', '30', '2026-07-20', '否', '否', '未付款', '杭州萧山江海实业有限公司', '正泰新能科技股份有限公司', '4100098821', 'FK20260612001', '正泰新能科技股份有限公司', '杭州萧山江海实业有限公司', 'FK20260612001-10', '电汇', 'PAY20260612001'],
    ['OA-HTPS-20260610-003', 'HT20260610003', 'E08616', '96000', '20', '2026-06-18', '50000', '28.6', '49971.4', '0.02%', '28', '2026-07-16', '是', '否', '待执行', '杭州萧山江海实业有限公司', '正泰新能科技股份有限公司', '4100097712', 'FK20260610003', '正泰新能科技股份有限公司', '杭州萧山江海实业有限公司', 'FK20260610003-20', '银企直连', 'PAY20260610003']
  ];

  function injectStyles() {
    if (document.getElementById('order-shot-style')) return;
    const style = document.createElement('style');
    style.id = 'order-shot-style';
    style.textContent = `
      .shot-root{position:fixed;inset:0;z-index:5000;background:#e8f1ff;color:#1f2d3d;font-family:"Microsoft YaHei",Arial,sans-serif;font-size:12px;overflow:hidden}
      .view-switch{position:absolute;right:18px;top:7px;z-index:20;display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.95);border:1px solid #cfd9e8;border-radius:4px;padding:3px 6px;box-shadow:0 2px 8px rgba(0,0,0,.12)}
      .view-switch span{color:#60708a}.view-switch .el-radio-button__inner{padding:5px 10px;font-size:12px}
      .supplier-top{height:40px;background:#265be8;color:#fff;display:flex;align-items:center}.supplier-logo{width:168px;font-size:22px;font-weight:700;padding-left:16px}.supplier-logo b{font-size:15px;margin-left:6px;font-weight:500}.supplier-nav{display:flex;height:100%;align-items:center}.supplier-nav span{height:100%;padding:0 22px;display:flex;align-items:center}.supplier-nav .active{background:#1647c8}.supplier-user{margin-left:auto;margin-right:230px}
      .supplier-shell{display:grid;grid-template-columns:166px 1fr;height:calc(100vh - 40px)}.supplier-side{background:#edf4ff;color:#303943;border-right:1px solid #dce7f5;padding-top:8px;overflow:auto}.supplier-side .group{height:40px;display:flex;align-items:center;padding:0 16px;gap:8px}.supplier-side .child{height:38px;display:flex;align-items:center;padding-left:30px}.supplier-side .active{background:#2c6eea;color:#fff;border-radius:2px;margin:0 6px;padding-left:24px}
      .supplier-main{padding:0 12px 24px;overflow:auto}.shot-tabbar{height:30px;display:flex;align-items:end;gap:4px}.shot-tab{height:24px;background:#fff;border:1px solid #ccd7e6;padding:0 10px;display:flex;align-items:center}.shot-tab.active{background:#2d7df0;color:#fff;border-color:#2d7df0}.supplier-notice{position:absolute;right:0;top:40px;width:288px;background:#fff;box-shadow:0 6px 20px rgba(0,0,0,.14)}.supplier-notice .head{height:34px;background:#28a0ff;color:#fff;padding:9px 12px}.supplier-notice .body{padding:12px;line-height:1.6}
      .buyer-top{height:56px;background:#fff;border-bottom:1px solid #d9dfe8;display:flex;align-items:center}.buyer-logo{width:240px;height:56px;background:#2c83df;color:#fff;font-size:34px;font-weight:700;display:flex;align-items:center;padding-left:20px}.buyer-nav{display:flex;height:100%;align-items:center}.buyer-nav span{height:100%;padding:0 24px;display:flex;align-items:center;font-size:16px}.buyer-nav .active{color:#1f7af0}.buyer-user{margin-left:auto;margin-right:40px;font-size:15px}
      .buyer-shell{display:grid;grid-template-columns:240px 1fr;height:calc(100vh - 56px);background:#f7f7f7}.buyer-side{background:#061a50;color:#fff;padding-top:14px;overflow:auto}.buyer-side .group{height:56px;display:flex;align-items:center;padding:0 28px;gap:12px;font-size:16px}.buyer-side .child{height:58px;display:flex;align-items:center;padding-left:46px;font-size:16px}.buyer-side .active{color:#43a0ff}.buyer-main{overflow:auto;padding:0 18px 40px}
      .card{background:#fff;border-radius:4px;margin:12px 0;border:1px solid #edf2f8}.search-card{padding:16px 20px}.search-grid{display:grid;grid-template-columns:1.2fr 1.2fr 1fr;gap:14px 28px}.search-actions{grid-column:1/-1;text-align:right}.status-card{padding:18px}.tabs{height:38px;display:flex;gap:36px;border-bottom:1px solid #d7dfeb;margin-bottom:12px}.tabs span{height:38px;font-weight:600;cursor:pointer}.tabs .active{color:#1f78ff;border-bottom:2px solid #1f78ff}
      .shot-table{width:100%;border-collapse:collapse;background:#fff;table-layout:fixed}.shot-table th{height:38px;background:#f0f3f8;border:1px solid #d9e1ec;color:#263445;font-weight:500;white-space:nowrap}.shot-table td{height:38px;border:1px solid #e0e7f0;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.shot-table .link{color:#1677ff;cursor:pointer}.table-scroll{overflow:auto;border:1px solid #d9e1ec}.table-scroll .shot-table{min-width:1500px}.footer{display:flex;justify-content:space-between;align-items:center;margin-top:12px;color:#606266}.small-title{height:54px;display:flex;align-items:center;justify-content:space-between;background:#fff;border-bottom:1px solid #d9e1ec;padding:0 18px;font-size:16px;font-weight:700}
      .detail-card{background:#fff;margin:18px;border:1px solid #edf2f8}.section-title{height:50px;display:flex;align-items:center;padding:0 28px;font-size:18px;font-weight:700}.section-title:before{content:"";width:4px;height:22px;background:#2d7df0;margin-right:8px}.field-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px 34px;padding:10px 28px 28px}.read-field{display:flex;align-items:center}.read-field label{width:120px;text-align:right;margin-right:12px;color:#333}.read-field span,.read-field .el-input{flex:1}.read-box{height:38px;line-height:38px;background:#f3f6fa;border:1px solid #dce3ee;border-radius:4px;padding:0 12px;color:#a0a7b2}
      .fee-zone{margin-top:18px;border-top:1px solid #dfe7f2;padding-top:14px}.fee-toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.fee-left{display:flex;align-items:center;gap:8px}.fee-left .el-input{width:210px}.fee-total{background:#f5f7fa;border:1px solid #dcdfe6;border-radius:4px;padding:6px 12px;color:#7f8794;font-weight:600}.upload-box{height:32px;border:1px solid #dcdfe6;border-radius:4px;display:flex;align-items:center;justify-content:space-between;padding:0 10px;color:#909399;cursor:pointer}.file-link{color:#1677ff;cursor:pointer}.delete-text{color:#f56c6c;cursor:pointer}
      .ledger-dialog .el-dialog__body{padding-top:8px}.ledger-query{display:flex;gap:8px;margin-bottom:10px}.ledger-scroll{overflow:auto;border:1px solid #d9e1ec}.ledger-scroll table{min-width:2300px}
    `;
    document.head.appendChild(style);
  }

  function amount(v) {
    return Number(v || 0).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function statusRows(status) {
    return state.statements.filter((row) => status === '全部' || row.status === status);
  }

  function setHash(page) {
    const map = {
      supplierList: routes.supplierList,
      supplierInvoice: routes.supplierInvoice,
      buyerList: routes.buyerList,
      buyerDetail: routes.buyerDetail,
      invoiceCheck: routes.invoiceCheck,
      supplierDetail: routes.supplierDetail
    };
    window.location.hash = map[page] || routes.supplierList;
  }

  const component = {
    name: componentName,
    data() {
      const hash = window.location.hash;
      if (hash.includes('buyer')) {
        state.activeView = 'buyer';
        state.activePage = hash.includes('detail') ? 'buyerDetail' : 'buyerList';
      } else if (hash.includes('invoice-create')) {
        state.activeView = 'supplier';
        state.activePage = 'supplierInvoice';
      } else {
        state.activeView = 'supplier';
        state.activePage = 'supplierList';
      }
      return {
        s: state,
        tabs,
        adjustmentTypes,
        ledgerVisible: false,
        ledgerType: '索赔',
        activeFee: null,
        ledgerSelected: '',
        ledgerKeyword: ''
      };
    },
    computed: {
      listRows() {
        return statusRows(this.s.activeStatus);
      },
      selectedFees() {
        return this.s.fees.filter((row) => row.checked);
      },
      feeTotal() {
        return this.s.fees.reduce((sum, row) => sum + Number(row.amount || 0), 0);
      },
      editable() {
        return this.s.activeView === 'buyer' && this.s.activePage === 'buyerDetail' && this.s.detailStatus === '待确认';
      },
      ledgerHeaders() {
        return this.ledgerType === '贴息'
          ? ['OA合同评审单号', '合同号', '合同经办人工号', '合同金额', 'OA明细行号', '货款日期', '货款（元）', '贴息额(元)', '贴息后需支付金额（元）', '贴息点', '贴息期限（天数）', '付款到期日', '是否下次开负值发票[名称]', '是否已开票', '是否执行（付款）', '贴息供应商', '支付主体', 'SAP凭证号（41）', '付款申请单号', '合同甲方', '合同乙方', '付款申请单号+行号', '付款方式（贴息后）', '付款单单号']
          : ['OA索赔申请编号', '工厂编码', '工厂名称', '供应商编号', '供应商名称', '物料描述', '索赔数量', '含税金额', '备注', '是否已开票', '核算主体', '工厂', '供应商', '公司编码', '是否已完结', '采购审批结束时间', '物料类型', '公司名称', '发起人'];
      },
      ledgerRows() {
        return this.ledgerType === '贴息' ? interestLedger : claimLedger;
      }
    },
    methods: {
      amount,
      switchView(view) {
        this.s.activeView = view;
        this.s.activePage = view === 'supplier' ? 'supplierList' : 'buyerList';
        this.s.activeStatus = '待确认';
        setHash(this.s.activePage);
      },
      openPage(page) {
        this.s.activePage = page;
        setHash(page);
      },
      setStatus(tab) {
        this.s.activeStatus = tab;
      },
      openDetail(row) {
        this.s.detailStatus = row.status === '已确认' ? '已确认' : '待确认';
        this.openPage(this.s.activeView === 'buyer' ? 'buyerDetail' : 'supplierDetail');
      },
      goInvoice(row) {
        if (row.status !== '已确认') {
          ElementPlus.ElMessage.warning('仅已确认状态的对账单允许进入开票流程');
          return;
        }
        this.openPage('supplierInvoice');
      },
      addFee() {
        this.s.fees.push({ id: 'F' + Date.now(), checked: false, type: '', serial: '', amount: 0, remark: '', attachment: '' });
      },
      deleteFee(row) {
        this.s.fees = this.s.fees.filter((item) => item.id !== row.id);
      },
      batchDeleteFee() {
        if (!this.selectedFees.length) {
          ElementPlus.ElMessage.warning('请先选择需要删除的数据');
          return;
        }
        ElementPlus.ElMessageBox.confirm('确认删除已选中的附加费用信息吗？', '提示', { type: 'warning' }).then(() => {
          const ids = new Set(this.selectedFees.map((item) => item.id));
          this.s.fees = this.s.fees.filter((item) => !ids.has(item.id));
        }).catch(() => {});
      },
      typeChange(row) {
        if (row.type === '索赔' || row.type === '贴息') {
          this.ledgerType = row.type;
          this.activeFee = row;
          this.ledgerSelected = '';
          this.ledgerVisible = true;
        }
      },
      confirmLedger() {
        if (!this.ledgerSelected) {
          ElementPlus.ElMessage.warning('请选择一条台账数据');
          return;
        }
        const row = this.ledgerRows.find((item) => item[0] === this.ledgerSelected);
        if (this.activeFee && row) {
          this.activeFee.serial = row[0];
          this.activeFee.amount = Number(this.ledgerType === '贴息' ? row[7] : row[7]);
        }
        this.ledgerVisible = false;
      },
      triggerFile(row) {
        const ref = this.$refs['file' + row.id];
        const input = Array.isArray(ref) ? ref[0] : ref;
        if (input) input.click();
      },
      fileChange(row, e) {
        const file = e.target.files && e.target.files[0];
        if (file) row.attachment = file.name;
        e.target.value = '';
      },
      viewFile(name) {
        if (name) window.alert('查看附件：' + name);
      },
      confirmStatement() {
        ElementPlus.ElMessageBox.confirm('确认后对账单将变为已确认状态，供应商可基于该对账单开票，是否确认？', '确认对账单', { type: 'warning' }).then(() => {
          this.s.detailStatus = '已确认';
          const row = this.s.statements.find((item) => item.id === 'RK009202606120003');
          if (row) row.status = '已确认';
          this.s.fees.forEach((fee) => { fee.checked = false; });
          ElementPlus.ElMessage.success('对账单已确认');
        }).catch(() => {});
      }
    },
    template: `
      <div class="shot-root">
        <div class="view-switch">
          <span>演示视角</span>
          <el-radio-group :model-value="s.activeView" size="small" @change="switchView">
            <el-radio-button label="supplier">供应商视角</el-radio-button>
            <el-radio-button label="buyer">采购方视角</el-radio-button>
          </el-radio-group>
        </div>

        <template v-if="s.activeView === 'supplier'">
          <div class="supplier-top">
            <div class="supplier-logo">CHiNT<b>采购云</b></div>
            <i class="ri-menu-fold-line" style="font-size:18px;margin-right:20px"></i>
            <div class="supplier-nav"><span>首页</span><span>个人中心</span><span>订单管理</span><span>供应商管理</span><span>采购寻源协同</span><span>订单履约协同</span><span class="active">日常业务协同</span><span>客服中心</span></div>
            <div class="supplier-user"><i class="ri-user-3-fill"></i> 正泰供应商</div>
          </div>
          <div class="supplier-notice"><div class="head"><i class="ri-notification-3-line"></i> 待确认提醒 <el-badge value="1"></el-badge></div><div class="body"><b>供应商基础信息更新</b><br>请尽快处理以上待确认事项</div></div>
          <div class="supplier-shell">
            <aside class="supplier-side">
              <div class="group"><i class="ri-truck-line"></i>采购订单协同<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
              <div class="group"><i class="ri-printer-line"></i>标签打印协同<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
              <div class="group"><i class="ri-inbox-archive-line"></i>收发货协同<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
              <div class="group"><i class="ri-shield-check-line"></i>质量协同<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
              <div class="group"><i class="ri-bill-line"></i>对账开票协同<i class="ri-arrow-up-s-line" style="margin-left:auto"></i></div>
              <div class="child">入库对账单生成</div>
              <div class="child" :class="{active:s.activePage==='supplierList'}" @click="openPage('supplierList')">入库对账单列表</div>
              <div class="child">入库对账单明细列表</div>
              <div class="child" :class="{active:s.activePage==='supplierInvoice'}" @click="openPage('supplierInvoice')">待开票列表</div>
              <div class="child">已开票列表</div>
              <div class="child">应收账款列表</div>
              <div class="child">财务共享付款单列表</div>
              <div class="child">货款提前结算列表</div>
              <div class="child">货款提前结算新增</div>
              <div class="child">货款提前结算详情</div>
              <div class="group"><i class="ri-database-2-line"></i>基础信息管理<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
              <div class="group"><i class="ri-folder-3-line"></i>计划协同<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
            </aside>
            <main class="supplier-main">
              <div class="shot-tabbar">
                <div class="shot-tab">工作台</div><div class="shot-tab">供应商信息收集表×</div><div class="shot-tab">入库对账单明细列表×</div>
                <div class="shot-tab active">{{ s.activePage==='supplierInvoice' ? '待开票列表-新增×' : '入库对账单列表×' }}</div>
              </div>
              <supplier-list-view v-if="s.activePage==='supplierList'" :tabs="tabs" :rows="listRows" :active-status="s.activeStatus" @status="setStatus" @detail="openDetail" @invoice="goInvoice"></supplier-list-view>
              <invoice-create-view v-else :fees="s.fees" :fee-total="feeTotal" @file="viewFile"></invoice-create-view>
            </main>
          </div>
        </template>

        <template v-else>
          <div class="buyer-top">
            <div class="buyer-logo">CHiNT</div><i class="ri-menu-fold-line" style="font-size:22px;margin:0 22px"></i>
            <div class="buyer-nav"><span>个人中心</span><span>成本管理测试</span><span class="active">新能订单管理</span></div>
            <div class="buyer-user"><i class="ri-user-3-fill"></i> 李思锦 <i class="ri-arrow-down-s-line"></i></div>
          </div>
          <div class="buyer-shell">
            <aside class="buyer-side">
              <div class="group"><i class="ri-file-list-3-line"></i>采购订单管理<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
              <div class="group"><i class="ri-database-2-line"></i>基础信息管理<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
              <div class="group"><i class="ri-printer-line"></i>标签打印管理<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
              <div class="group"><i class="ri-shield-check-line"></i>质量管理<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
              <div class="group"><i class="ri-bill-line"></i>对账开票管理<i class="ri-arrow-up-s-line" style="margin-left:auto"></i></div>
              <div class="child">ERP入库记录核对</div><div class="child">入库开票勾兑</div>
              <div class="child" :class="{active:s.activePage==='buyerList'}" @click="openPage('buyerList')">入库对账单列表</div>
              <div class="child" :class="{active:s.activePage==='buyerDetail'}" @click="openPage('buyerDetail')">入库对账单明细列表</div>
              <div class="child">供方已开票列表</div><div class="child">对账单合并列表</div><div class="child">发票校验单列表</div><div class="child">电子发票档案列表</div><div class="child">供方应收帐款列表</div>
              <div class="group"><i class="ri-calendar-check-line"></i>计划管理<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
            </aside>
            <main class="buyer-main">
              <div class="shot-tabbar"><div class="shot-tab">我的账号</div><div class="shot-tab" :class="{active:s.activePage==='buyerList'}">入库对账单列表×</div><div class="shot-tab">入库对账单明细列表×</div><div class="shot-tab" :class="{active:s.activePage==='buyerDetail'}">入库对账单明细详情×</div><div class="shot-tab">供方已开票列表×</div><div class="shot-tab">供方已开票详情×</div></div>
              <buyer-list-view v-if="s.activePage==='buyerList'" :tabs="tabs" :rows="listRows" :active-status="s.activeStatus" @status="setStatus" @detail="openDetail"></buyer-list-view>
              <buyer-detail-view v-else :status="s.detailStatus" :fees="s.fees" :editable="editable" :fee-total="feeTotal" :adjustment-types="adjustmentTypes" @add="addFee" @batch-delete="batchDeleteFee" @delete-row="deleteFee" @type-change="typeChange" @file-click="triggerFile" @file-change="fileChange" @view-file="viewFile" @confirm="confirmStatement"></buyer-detail-view>
            </main>
          </div>
        </template>

        <el-dialog v-model="ledgerVisible" :title="ledgerType === '索赔' ? '选择索赔台账' : '选择贴息台账'" width="1220px" append-to-body class="ledger-dialog">
          <div class="ledger-query"><el-input v-model="ledgerKeyword" placeholder="请输入关键编号/供应商/合同号"></el-input><el-button type="primary">查询</el-button><el-button @click="ledgerKeyword=''">重置</el-button></div>
          <div class="ledger-scroll"><table class="shot-table"><thead><tr><th style="width:48px"></th><th v-for="h in ledgerHeaders" :key="h" style="width:140px">{{ h }}</th></tr></thead><tbody><tr v-for="row in ledgerRows" :key="row[0]"><td><el-radio v-model="ledgerSelected" :label="row[0]">&nbsp;</el-radio></td><td v-for="cell in row" :key="cell">{{ cell }}</td></tr></tbody></table></div>
          <template #footer><el-button @click="ledgerVisible=false">取消</el-button><el-button type="primary" @click="confirmLedger">确定</el-button></template>
        </el-dialog>
      </div>
    `
  };

  const SupplierListView = {
    props: ['tabs', 'rows', 'activeStatus'],
    template: `
      <div>
        <div class="card search-card"><div class="search-grid">
          <el-form-item label="供应商名称"><el-input disabled value="杭州萧山江海实业有限公司"></el-input></el-form-item>
          <el-form-item label="生成时间"><el-date-picker type="daterange" start-placeholder="2026-06-08" end-placeholder="2026-06-15" style="width:100%"></el-date-picker></el-form-item>
          <el-form-item label="入库单号"><el-input placeholder="请输入入库单号"></el-input></el-form-item>
          <el-form-item label="工厂"><el-input placeholder="请选择工厂"><template #suffix><i class="ri-search-line"></i></template></el-input></el-form-item>
          <div class="search-actions"><el-button>重置</el-button><el-button type="primary">查询</el-button><el-button link type="primary">收起<i class="ri-arrow-up-s-line"></i></el-button></div>
        </div></div>
        <div class="card status-card"><div class="tabs"><span v-for="t in tabs" :key="t" :class="{active:t===activeStatus}" @click="$emit('status',t)">{{ t }}</span></div>
          <div class="table-scroll"><table class="shot-table"><thead><tr><th style="width:46px"><input type="checkbox"></th><th>入库单号</th><th>工厂编码</th><th>工厂名称</th><th>供应商编号</th><th>供应商名称</th><th>不含税金额</th><th>状态</th><th>入库单时间</th><th>发票保存号</th><th>操作</th></tr></thead>
          <tbody><tr v-for="row in rows" :key="row.id"><td><input type="checkbox"></td><td class="link" @click="$emit('detail',row)">{{ row.id }}</td><td>{{ row.factoryCode }}</td><td>{{ row.factoryName }}</td><td>{{ row.supplierCode }}</td><td>{{ row.supplierName }}</td><td>{{ row.amount }}</td><td>{{ row.status }}</td><td>{{ row.time }}</td><td>{{ row.invoiceSaveNo }}</td><td><span v-if="row.status==='已确认'" class="link" @click="$emit('invoice',row)">开票</span><span v-else class="delete-text">待采购确认</span></td></tr></tbody></table></div>
          <div class="footer"><span>共 {{ rows.length }} 条</span><el-pagination :total="rows.length" layout="sizes, prev, pager, next" :page-size="10"></el-pagination></div>
        </div>
      </div>`
  };

  const BuyerListView = {
    props: ['tabs', 'rows', 'activeStatus'],
    template: `
      <div>
        <div class="card search-card"><div class="search-grid">
          <el-form-item label="供应商名称"><el-input placeholder="请选择供应商"><template #suffix><i class="ri-search-line"></i></template></el-input></el-form-item>
          <el-form-item label="生成时间"><el-date-picker type="daterange" start-placeholder="开始时间" end-placeholder="结束时间" style="width:100%"></el-date-picker></el-form-item>
          <el-form-item label="入库单号"><el-input placeholder="请输入入库单号"></el-input></el-form-item>
          <el-form-item label="工厂"><el-input placeholder="请选择工厂"><template #suffix><i class="ri-search-line"></i></template></el-input></el-form-item>
          <div class="search-actions"><el-button>重置</el-button><el-button type="primary">查询</el-button><el-button link type="primary">收起<i class="ri-arrow-up-s-line"></i></el-button></div>
        </div></div>
        <div class="card status-card"><div class="tabs"><span v-for="t in tabs" :key="t" :class="{active:t===activeStatus}" @click="$emit('status',t)">{{ t }}</span></div>
          <div class="table-scroll"><table class="shot-table"><thead><tr><th>入库单号</th><th>工厂编码</th><th>工厂名称</th><th>供应商编号</th><th>供应商名称</th><th>不含税金额</th><th>状态</th><th>入库单时间</th><th>发票保存号</th><th>操作</th></tr></thead>
          <tbody><tr v-for="row in rows" :key="row.id"><td class="link" @click="$emit('detail',row)">{{ row.id }}</td><td>{{ row.factoryCode }}</td><td>{{ row.factoryName }}</td><td>{{ row.supplierCode }}</td><td>{{ row.supplierName }}</td><td>{{ row.amount }}</td><td>{{ row.status }}</td><td>{{ row.time }}</td><td>{{ row.invoiceSaveNo }}</td><td><span class="link" @click="$emit('detail',row)">详情</span></td></tr></tbody></table></div>
          <div class="footer"><span>共 {{ rows.length }} 条</span><el-pagination :total="rows.length" layout="sizes, prev, pager, next" :page-size="10"></el-pagination></div>
        </div>
      </div>`
  };

  const InvoiceCreateView = {
    props: ['fees', 'feeTotal'],
    emits: ['file'],
    template: `
      <div>
        <div class="detail-card"><div class="small-title">供方已开票列表详情</div><div class="section-title">基本信息</div>
          <div class="field-grid"><div class="read-field"><label>发票保存号：</label><span class="read-box">FP009202606120002</span></div><div class="read-field"><label>发票类型：</label><span class="read-box">纸质发票</span></div><div class="read-field"><label>发票日期：</label><span class="read-box">2026-06-12</span></div><div class="read-field"><label>合同附件：</label><span>暂无附件</span></div><div class="read-field"><label>调价单附件：</label><span>暂无附件</span></div></div>
          <div class="section-title">对账单明细信息</div><div style="padding:0 28px 30px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>单据类型</th><th>SRM采购单号</th><th>ERP采购单号</th><th>ERP采购单行号</th><th>移动类型</th><th>物料编号</th><th>物料描述</th><th>不含税金额</th></tr></thead><tbody><tr><td>1</td><td>入库单</td><td></td><td>4500142570</td><td>00010</td><td>101</td><td>000000001070000247</td><td>工字轮圆形互联条0.24mm</td><td>3636.3</td></tr></tbody></table></div>
            <div class="fee-zone"><div class="fee-toolbar"><b>附加费用明细</b><span class="fee-total">调整合计：{{ Number(feeTotal).toFixed(2) }}</span></div><div class="table-scroll"><table class="shot-table"><thead><tr><th>调整类型</th><th>流水号</th><th>调整金额（含税）</th><th>备注</th><th>附件</th></tr></thead><tbody><tr v-for="row in fees" :key="row.id"><td>{{ row.type }}</td><td>{{ row.serial }}</td><td>{{ row.amount }}</td><td>{{ row.remark }}</td><td><span v-if="row.attachment" class="file-link" @click="$emit('file', row.attachment)">{{ row.attachment }}</span></td></tr></tbody></table></div></div>
          </div></div>
      </div>`
  };

  const BuyerDetailView = {
    props: ['status', 'fees', 'editable', 'feeTotal', 'adjustmentTypes'],
    emits: ['add', 'batch-delete', 'delete-row', 'type-change', 'file-click', 'file-change', 'view-file', 'confirm'],
    methods: {
      amount,
      trigger(row) {
        const ref = this.$refs['file' + row.id];
        const input = Array.isArray(ref) ? ref[0] : ref;
        if (input) input.click();
      }
    },
    template: `
      <div class="detail-card"><div class="small-title"><span><i class="ri-arrow-left-circle-line" style="color:#409eff"></i> 入库单明细查询详情 <el-tag size="small" :type="status==='待确认'?'warning':'success'">{{ status }}</el-tag></span><span><el-button v-if="editable" type="primary" @click="$emit('confirm')">确认</el-button><el-button>保存</el-button><el-button>同步</el-button></span></div>
        <div class="section-title">基本信息</div><div class="field-grid"><div class="read-field"><label>应用工厂：</label><span class="read-box">海宁新能源工厂/HN01</span></div><div class="read-field"><label>记账价金额合计：</label><span class="read-box">零元整</span></div><div class="read-field"><label>¥：</label><span class="read-box">0</span></div><div class="read-field"><label>开票价金额合计：</label><span class="read-box">壹仟伍佰玖拾捌元陆角</span></div><div class="read-field"><label>¥：</label><span class="read-box">1598.6</span></div><div class="read-field"><label>入库单号：</label><span class="read-box">RK009202606120003</span></div></div>
        <div class="section-title">对账单明细信息</div><div style="padding:0 28px 32px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>收货日期</th><th>物料编号</th><th>物料描述</th><th>收货数量</th><th>单位</th><th>不含税单价</th><th>不含税金额</th><th>应用工厂</th><th>库位</th><th>ERP采购单号</th></tr></thead><tbody><tr><td>1</td><td>2026-06-12</td><td>000000001070000207</td><td>工字轮汇流条 4*0.3mm</td><td>20</td><td>千克</td><td>79.9300</td><td>1598.6000</td><td>HN01</td><td>JZ01</td><td>4900014482</td></tr></tbody></table></div>
          <div class="fee-zone"><div class="fee-toolbar"><div class="fee-left"><b>附加费用信息</b><span>剩余差异：</span><el-input disabled></el-input><el-button v-if="editable" type="primary" @click="$emit('add')">+ 新增一行数据</el-button><el-button v-if="editable" type="danger" plain @click="$emit('batch-delete')">删除</el-button></div><span class="fee-total">调整合计：{{ amount(feeTotal) }}</span></div>
            <div class="table-scroll"><table class="shot-table"><thead><tr><th style="width:44px"><input v-if="editable" type="checkbox"></th><th>调整类型</th><th>流水号</th><th>调整金额（含税）</th><th>备注</th><th>附件</th><th>操作</th></tr></thead><tbody><tr v-for="row in fees" :key="row.id"><td><input v-if="editable" v-model="row.checked" type="checkbox"></td><td><el-select v-if="editable" v-model="row.type" :teleported="false" @change="$emit('type-change', row)" style="width:100%"><el-option v-for="item in adjustmentTypes" :key="item" :label="item" :value="item"></el-option></el-select><span v-else>{{ row.type }}</span></td><td><el-input v-if="editable" v-model="row.serial"><template #suffix><i class="ri-search-line"></i></template></el-input><span v-else>{{ row.serial }}</span></td><td><el-input-number v-if="editable" v-model="row.amount" style="width:100%"></el-input-number><span v-else>{{ row.amount }}</span></td><td><el-input v-if="editable" v-model="row.remark"></el-input><span v-else>{{ row.remark }}</span></td><td><div v-if="editable" class="upload-box" @click="trigger(row)"><span v-if="row.attachment" class="file-link" @click.stop="$emit('view-file', row.attachment)">{{ row.attachment }}</span><span v-else>上传或者看附件</span><i class="ri-attachment-line"></i><input type="file" hidden :ref="'file'+row.id" @change="$emit('file-change', row, $event)"></div><span v-else-if="row.attachment" class="file-link" @click="$emit('view-file', row.attachment)">{{ row.attachment }}</span></td><td><span v-if="editable" class="delete-text" @click="$emit('delete-row', row)">删除</span><span v-else>-</span></td></tr></tbody></table></div><div class="footer"><span>共 {{ fees.length }} 条，已选 {{ fees.filter(f=>f.checked).length }} 条</span></div>
          </div>
        </div>
      </div>`
  };

  injectStyles();
  ChintPrototypeShell.registerPageComponent(componentName, {
    ...component,
    components: { SupplierListView, BuyerListView, InvoiceCreateView, BuyerDetailView }
  });

  Object.entries({
    [routes.supplierList]: '供应商端入库对账单列表',
    [routes.supplierInvoice]: '供应商端待开票列表-新增',
    [routes.buyerList]: '采购方入库对账单列表',
    [routes.buyerDetail]: '采购方入库对账单详情',
    [routes.supplierDetail]: '供应商端入库对账单详情',
    [routes.invoiceCheck]: '发票校验单详情'
  }).forEach(([path, name]) => {
    ChintPrototypeShell.registerRoute({
      path,
      name,
      menuKey: path.includes('buyer') || path.includes('invoice/check') ? 'buyerReconciliationList' : 'supplierReconciliationList',
      component: componentName,
      breadcrumbs: [path.includes('buyer') ? '新能订单管理' : '订单履约协同', name],
      tabInfo: '按截图复刻采购云原系统界面，并叠加待确认、已确认及附加费用维护规则。',
      guideSteps: [{ target: '.shot-root', title: '截图复刻原型', description: '通过顶部演示视角切换查看供应商端和采购方端不同界面。' }],
      noteSections: [{ title: '业务调整', content: '供应商生成对账单后进入待确认，采购方维护附加费用并确认后变为已确认，供应商才可开票。' }]
    });
  });
})(window);

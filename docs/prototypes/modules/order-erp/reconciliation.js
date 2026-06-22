(function (window) {
  const componentName = 'OrderScreenshotReplicaPage';
  const routes = {
    supplierList: '#/supplier/reconciliation-list',
    supplierInvoice: '#/supplier/invoice-create',
    buyerList: '#/buyer/reconciliation-list',
    buyerDetail: '#/buyer/reconciliation-detail',
    buyerPaid: '#/buyer/paid-invoice-detail',
    invoiceCheck: '#/invoice/check-detail',
    supplierDetail: '#/supplier/reconciliation-detail',
    supplierPaid: '#/supplier/paid-invoice-detail'
  };

  const adjustmentTypes = ['索赔', '贴息', '应收抵扣-包材回收', '应收抵扣-认证费', '应收抵扣-其他', '认证费（负数发票）', '其他（负数发票）', '折让（负数发票）'];
  const tabs = ['已生成', '待确认', '已确认', '已校验', '已作废', '全部'];

  const state = {
    activeView: 'supplier',
    activePage: 'supplierList',
    activeStatus: '已生成',
    currentStatementId: 'RK009202606120003',
    releasedInboundIds: [],
    openTabs: {
      supplier: [
        { page: 'home', label: '工作台', closable: false },
        { page: 'supplierInfoTab', label: '供应商信息收集表', closable: true, placeholder: true },
        { page: 'supplierDetailListTab', label: '入库对账单明细列表', closable: true, placeholder: true },
        { page: 'supplierList', label: '入库对账单列表', closable: true }
      ],
      buyer: [
        { page: 'account', label: '我的账号', closable: false },
        { page: 'buyerList', label: '入库对账单列表', closable: true },
        { page: 'buyerDetailListTab', label: '入库对账单明细列表', closable: true, placeholder: true },
        { page: 'buyerDetail', label: '入库对账单明细详情', closable: true },
        { page: 'buyerPaid', label: '供方已开票详情', closable: true },
        { page: 'invoiceCheck', label: '发票校验单详情', closable: true }
      ]
    },
    inboundRows: [
      { id: 'RK009202606120001', type: '入库单', receiptDate: '2026-06-12', materialNo: '000000001070000247', materialDesc: '工字轮圆形互联条0.24mm', qty: 20, unit: '千克', price: 79.93, amount: 3636.3, taxIncluded: 4109.02, factory: 'HN01', location: 'JZ01', erpPo: '4500142570', erpLine: '00010', time: '2026-06-12 13:36:24' },
      { id: 'RK009202606120002', type: '入库单', receiptDate: '2026-06-12', materialNo: '000000001070000207', materialDesc: '工字轮汇流条 4*0.3mm', qty: 20, unit: '千克', price: 79.93, amount: 1598.6, taxIncluded: 1806.42, factory: 'HN01', location: 'JZ01', erpPo: '4900014482', erpLine: '00010', time: '2026-06-12 16:51:08' },
      { id: 'RK009202606120003', type: '入库单', receiptDate: '2026-06-12', materialNo: '000000001070000208', materialDesc: '互联条包装材料批次', qty: 18, unit: '箱', price: 88.81, amount: 1598.6, taxIncluded: 1806.42, factory: 'HN01', location: 'JZ01', erpPo: '4900014483', erpLine: '00020', time: '2026-06-12 17:21:59' }
    ],
    statements: [
      { id: 'RK009202606120003', status: '已生成', factoryCode: 'HN01', factoryName: '海宁新能源工厂', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司', amount: '', time: '2026-06-12 17:21:59', invoiceSaveNo: '', inboundIds: ['RK009202606120003'], released: false, voidReason: '' },
      { id: 'RK009202606120001', status: '待确认', factoryCode: 'HN01', factoryName: '海宁新能源工厂', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司', amount: '', time: '2026-06-12 13:36:24', invoiceSaveNo: '', inboundIds: ['RK009202606120001'], released: false, voidReason: '' },
      { id: 'RK009202606120002', status: '已确认', factoryCode: 'HN01', factoryName: '海宁新能源工厂', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司', amount: '', time: '2026-06-12 16:51:08', invoiceSaveNo: 'FP009202606120002', inboundIds: ['RK009202606120002'], released: false, voidReason: '' },
      { id: 'RK009202606110008', status: '已校验', factoryCode: 'HN01', factoryName: '海宁新能源工厂', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司', amount: '593631.2', time: '2026-06-11 13:36:24', invoiceSaveNo: 'FP009202405200007', inboundIds: ['RK009202606110008'], released: false, voidReason: '' }
    ],
    detailStatus: '已生成',
    fees: [
      { id: 'F1', checked: false, inboundId: 'RK009202606120001', type: '索赔', serial: 'OA-SP-20260613-001', historyInterest: '', amount: 12800, taxRate: 13, taxExcluded: 11327.43, remark: '包装破损索赔，随本次对账确认', attachment: '索赔附件.pdf' },
      { id: 'F2', checked: false, inboundId: 'RK009202606120001', type: '应收抵扣-认证费', serial: '', historyInterest: '', amount: 123, taxRate: 13, taxExcluded: 108.85, remark: '认证费用抵扣', attachment: '认证费说明.pdf' },
      { id: 'F3', checked: false, inboundId: 'RK009202606120002', type: '贴息', serial: 'OA-HTPS-20260612-016', historyInterest: 12, amount: 36.3, taxRate: 13, taxExcluded: 32.12, remark: '合同贴息台账带出', attachment: '贴息明细.pdf' },
      { id: 'F4', checked: false, inboundId: 'RK009202606120002', type: '折让（负数发票）', serial: '', historyInterest: '', amount: -200, taxRate: 13, taxExcluded: -176.99, remark: '质量折让负数发票', attachment: '' },
      { id: 'F5', checked: false, inboundId: 'RK009202606120003', type: '应收抵扣-包材回收', serial: '', historyInterest: '', amount: 520, taxRate: 13, taxExcluded: 460.18, remark: '包材回收抵扣', attachment: '包材回收单.pdf' },
      { id: 'F6', checked: false, inboundId: 'RK009202606120003', type: '其他（负数发票）', serial: '', historyInterest: '', amount: -80, taxRate: 13, taxExcluded: -70.8, remark: '其他扣减事项', attachment: '' }
    ]
  };

  const claimLedger = [
    ['OA-SP-20260613-001', 'HN01', '海宁新能源工厂', '0010001404', '杭州萧山江海实业有限公司', '包装破损组件', '12', '12800', '运输包装破损索赔', '否', 'HN01', '海宁新能源工厂', '江海实业', '1000', '否', '2026-06-13 09:30', '包材', '正泰新能科技股份有限公司', '王一帆'],
    ['OA-SP-20260608-004', 'HN01', '海宁新能源工厂', '0010001404', '杭州萧山江海实业有限公司', '汇流条批次偏差', '5', '6200', '来料偏差扣款', '否', 'HN01', '海宁新能源工厂', '江海实业', '1000', '是', '2026-06-08 16:20', '原材料', '正泰新能科技股份有限公司', '赵晨'],
    ['OA-SP-20260605-011', 'HN01', '海宁新能源工厂', '0010001404', '杭州萧山江海实业有限公司', '托盘回收差异', '18', '3600', '托盘回收数量差异索赔', '否', 'HN01', '海宁新能源工厂', '江海实业', '1000', '否', '2026-06-05 11:12', '包材', '正泰新能科技股份有限公司', '李晴']
  ];
  const interestLedger = [
    ['OA-HTPS-20260612-016', 'HT20260612016', 'E10238', '280000', '10', '2026-06-20', '120000', '36.3', '119963.7', '0.03%', '30', '2026-07-20', '否', '否', '未付款', '杭州萧山江海实业有限公司', '正泰新能科技股份有限公司', '4100098821', 'FK20260612001', '正泰新能科技股份有限公司', '杭州萧山江海实业有限公司', 'FK20260612001-10', '电汇', 'PAY20260612001'],
    ['OA-HTPS-20260610-003', 'HT20260610003', 'E08616', '96000', '20', '2026-06-18', '50000', '28.6', '49971.4', '0.02%', '28', '2026-07-16', '是', '否', '待执行', '杭州萧山江海实业有限公司', '正泰新能科技股份有限公司', '4100097712', 'FK20260610003', '正泰新能科技股份有限公司', '杭州萧山江海实业有限公司', 'FK20260610003-20', '银企直连', 'PAY20260610003'],
    ['OA-HTPS-20260606-008', 'HT20260606008', 'E09127', '150000', '30', '2026-06-16', '80000', '42.1', '79957.9', '0.025%', '35', '2026-07-21', '否', '否', '待执行', '杭州萧山江海实业有限公司', '正泰新能科技股份有限公司', '4100096688', 'FK20260606008', '正泰新能科技股份有限公司', '杭州萧山江海实业有限公司', 'FK20260606008-30', '银企直连', 'PAY20260606008']
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
      .supplier-main{padding:0 12px 24px;overflow:auto}.shot-tabbar{height:30px;display:flex;align-items:end;gap:4px}.shot-tab{height:24px;background:#fff;border:1px solid #ccd7e6;padding:0 10px;display:flex;align-items:center;cursor:pointer}.shot-tab.active{background:#2d7df0;color:#fff;border-color:#2d7df0}.tab-close{margin-left:6px;opacity:.8;font-weight:700}.tab-close:hover{opacity:1}
      .buyer-top{height:56px;background:#fff;border-bottom:1px solid #d9dfe8;display:flex;align-items:center}.buyer-logo{width:240px;height:56px;background:#2c83df;color:#fff;font-size:34px;font-weight:700;display:flex;align-items:center;padding-left:20px}.buyer-nav{display:flex;height:100%;align-items:center}.buyer-nav span{height:100%;padding:0 24px;display:flex;align-items:center;font-size:16px}.buyer-nav .active{color:#1f7af0}.buyer-user{margin-left:auto;margin-right:40px;font-size:15px}
      .buyer-shell{display:grid;grid-template-columns:240px 1fr;height:calc(100vh - 56px);background:#f7f7f7}.buyer-side{background:#061a50;color:#fff;padding-top:14px;overflow:auto}.buyer-side .group{height:56px;display:flex;align-items:center;padding:0 28px;gap:12px;font-size:16px}.buyer-side .child{height:58px;display:flex;align-items:center;padding-left:46px;font-size:16px}.buyer-side .active{color:#43a0ff}.buyer-main{overflow:auto;padding:0 18px 40px}
      .card{background:#fff;border-radius:4px;margin:12px 0;border:1px solid #edf2f8}.search-card{padding:16px 20px}.search-grid{display:grid;grid-template-columns:1.2fr 1.2fr 1fr;gap:14px 28px}.search-actions{grid-column:1/-1;text-align:right}.status-card{padding:18px}.tabs{height:38px;display:flex;gap:36px;border-bottom:1px solid #d7dfeb;margin-bottom:12px}.tabs span{height:38px;font-weight:600;cursor:pointer}.tabs .active{color:#1f78ff;border-bottom:2px solid #1f78ff}
      .shot-table{width:100%;border-collapse:collapse;background:#fff;table-layout:fixed}.shot-table th{height:38px;background:#f0f3f8;border:1px solid #d9e1ec;color:#263445;font-weight:500;white-space:nowrap}.shot-table td{height:38px;border:1px solid #e0e7f0;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.shot-table .link{color:#1677ff;cursor:pointer}.table-scroll{overflow:auto;border:1px solid #d9e1ec}.table-scroll .shot-table{min-width:1500px}.footer{display:flex;justify-content:space-between;align-items:center;margin-top:12px;color:#606266}.small-title{height:54px;display:flex;align-items:center;justify-content:space-between;background:#fff;border-bottom:1px solid #d9e1ec;padding:0 18px;font-size:16px;font-weight:700}
      .detail-card{background:#fff;margin:18px;border:1px solid #edf2f8}.section-title{height:50px;display:flex;align-items:center;padding:0 28px;font-size:18px;font-weight:700}.section-title:before{content:"";width:4px;height:22px;background:#2d7df0;margin-right:8px}.field-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px 34px;padding:10px 28px 28px}.read-field{display:flex;align-items:center}.read-field label{width:120px;text-align:right;margin-right:12px;color:#333}.read-field span,.read-field .el-input{flex:1}.read-box{height:38px;line-height:38px;background:#f3f6fa;border:1px solid #dce3ee;border-radius:4px;padding:0 12px;color:#a0a7b2}
      .fee-zone{margin-top:18px;border-top:1px solid #dfe7f2;padding-top:14px}.fee-toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.fee-left{display:flex;align-items:center;gap:8px}.fee-left .el-input{width:210px}.fee-total{background:#f5f7fa;border:1px solid #dcdfe6;border-radius:4px;padding:6px 12px;color:#7f8794;font-weight:600}.native-select{width:100%;height:32px;border:1px solid #dcdfe6;border-radius:4px;background:#fff;padding:0 30px 0 10px;color:#606266;outline:none}.native-select:focus{border-color:#409eff}.serial-picker{height:32px;border:1px solid #dcdfe6;border-radius:4px;background:#fff;display:flex;align-items:center;cursor:pointer}.serial-picker input{width:100%;height:30px;border:0;outline:none;background:transparent;padding:0 8px;color:#606266;cursor:pointer}.serial-picker i{width:28px;color:#1677ff}.serial-disabled{display:block;height:32px;line-height:32px;border:1px solid #e4e7ed;border-radius:4px;background:#f5f7fa;color:#c0c4cc;padding:0 8px;text-align:left}.upload-box{height:32px;border:1px solid #dcdfe6;border-radius:4px;display:flex;align-items:center;justify-content:space-between;padding:0 10px;color:#909399;cursor:pointer}.file-link{color:#1677ff;cursor:pointer}.delete-text{color:#f56c6c;cursor:pointer}
      .ledger-dialog .el-dialog__body{padding-top:8px}.ledger-query{display:flex;gap:8px;margin-bottom:10px}.ledger-scroll{overflow:auto;border:1px solid #d9e1ec}.ledger-scroll table{min-width:2300px}.ledger-modal-mask{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9998}.ledger-modal{display:none;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:1220px;max-width:calc(100vw - 80px);max-height:82vh;background:#fff;border-radius:4px;box-shadow:0 8px 28px rgba(0,0,0,.24);z-index:9999;overflow:hidden}.ledger-modal-header{height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;border-bottom:1px solid #d9e1ec;font-size:16px;font-weight:700}.ledger-modal-close{border:0;background:transparent;font-size:22px;line-height:1;color:#909399;cursor:pointer}.ledger-modal-body{max-height:calc(82vh - 104px);overflow:auto;padding:12px 18px}.ledger-modal-query{display:flex;gap:8px;margin-bottom:10px}.ledger-modal-query input{width:360px;height:32px;border:1px solid #dcdfe6;border-radius:4px;padding:0 10px;color:#606266;outline:none}.ledger-modal-query input:focus{border-color:#409eff}.ledger-modal-footer{height:56px;display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:0 18px;border-top:1px solid #d9e1ec}.ledger-modal .table-scroll .shot-table{min-width:2600px}.upstream-dialog .el-dialog__body{max-height:70vh;overflow:auto}.upstream-modal-mask{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9996}.upstream-modal{display:none;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:1080px;max-width:calc(100vw - 80px);max-height:80vh;background:#fff;border-radius:4px;box-shadow:0 8px 28px rgba(0,0,0,.24);z-index:9997;overflow:hidden}.upstream-modal-header{height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;border-bottom:1px solid #d9e1ec;font-size:16px;font-weight:700}.upstream-modal-close{border:0;background:transparent;font-size:22px;line-height:1;color:#909399;cursor:pointer}.upstream-modal-body{max-height:calc(80vh - 104px);overflow:auto;padding:12px 18px}.upstream-modal-footer{height:56px;display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:0 18px;border-top:1px solid #d9e1ec}.link-btn{color:#1677ff;cursor:pointer;text-decoration:none}.link-btn:hover{text-decoration:underline}
    `;
    document.head.appendChild(style);
  }

  function amount(v) {
    return Number(v || 0).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function taxRateNumber(v) {
    if (v === null || v === undefined || v === '') return null;
    const value = Number(String(v).replace('%', ''));
    return Number.isFinite(value) ? value : null;
  }

  function displayTaxRate(v) {
    const value = taxRateNumber(v);
    return value === null ? '' : `${value}%`;
  }

  function taxExcludedAmount(row) {
    if (!row || row.amount === null || row.amount === undefined || row.amount === '') return null;
    const rate = taxRateNumber(row.taxRate);
    if (rate === null) return null;
    return Number((Number(row.amount || 0) / (1 + rate / 100)).toFixed(2));
  }

  function displayOptionalAmount(v) {
    return v === null || v === undefined || v === '' ? '-' : amount(v);
  }

  function closestFromEvent(event, selector) {
    const target = event.target && event.target.nodeType === 1 ? event.target : event.target && event.target.parentElement;
    return target && target.closest ? target.closest(selector) : null;
  }

  function openUpstreamDocumentModal() {
    const mask = document.getElementById('upstreamDocumentMask');
    const modal = document.getElementById('upstreamDocumentModal');
    if (!mask || !modal) {
      console.error('上游单据弹窗 DOM 不存在');
      return;
    }
    mask.style.display = 'block';
    modal.style.display = 'block';
    console.log('上游单据弹窗已打开');
  }

  function closeUpstreamDocumentModal() {
    const mask = document.getElementById('upstreamDocumentMask');
    const modal = document.getElementById('upstreamDocumentModal');
    if (mask) mask.style.display = 'none';
    if (modal) modal.style.display = 'none';
    console.log('上游单据弹窗已关闭');
  }

  window.openUpstreamDocumentModal = openUpstreamDocumentModal;
  window.closeUpstreamDocumentModal = closeUpstreamDocumentModal;

  let currentLedgerRow = null;
  let currentLedgerFeeId = '';

  function getFeeByDomRow(row) {
    if (!row) return null;
    const feeId = row.getAttribute('data-fee-id');
    if (!feeId) return null;
    return state.fees.find((fee) => fee.id === feeId) || null;
  }

  function resetLedgerRadios() {
    document.querySelectorAll('#claimLedgerModal input[type="radio"], #interestLedgerModal input[type="radio"]').forEach((radio) => {
      radio.checked = false;
    });
  }

  function showLedgerModal(modalId) {
    const mask = document.getElementById('ledgerModalMask');
    const claimModal = document.getElementById('claimLedgerModal');
    const interestModal = document.getElementById('interestLedgerModal');
    const modal = document.getElementById(modalId);
    if (!mask || !claimModal || !interestModal || !modal) {
      console.error('台账弹窗 DOM 不存在');
      return;
    }
    resetLedgerRadios();
    mask.style.display = 'block';
    claimModal.style.display = 'none';
    interestModal.style.display = 'none';
    modal.style.display = 'block';
  }

  function openClaimLedgerModal(row) {
    currentLedgerRow = row;
    const fee = getFeeByDomRow(row);
    currentLedgerFeeId = fee ? fee.id : '';
    console.log('打开索赔台账弹窗');
    showLedgerModal('claimLedgerModal');
  }

  function openInterestLedgerModal(row) {
    currentLedgerRow = row;
    const fee = getFeeByDomRow(row);
    currentLedgerFeeId = fee ? fee.id : '';
    console.log('打开贴息台账弹窗');
    showLedgerModal('interestLedgerModal');
  }

  function closeLedgerModal() {
    const mask = document.getElementById('ledgerModalMask');
    const claimModal = document.getElementById('claimLedgerModal');
    const interestModal = document.getElementById('interestLedgerModal');
    if (mask) mask.style.display = 'none';
    if (claimModal) claimModal.style.display = 'none';
    if (interestModal) interestModal.style.display = 'none';
    currentLedgerRow = null;
    currentLedgerFeeId = '';
    resetLedgerRadios();
  }

  function fillCurrentLedgerRow(type) {
    const modalId = type === '贴息' ? 'interestLedgerModal' : 'claimLedgerModal';
    const radioName = type === '贴息' ? 'interestLedgerRadio' : 'claimLedgerRadio';
    const selected = document.querySelector(`#${modalId} input[name="${radioName}"]:checked`);
    if (!selected) {
      if (window.ElementPlus && ElementPlus.ElMessage) {
        ElementPlus.ElMessage.warning('请选择一条台账数据');
      } else {
        window.alert('请选择一条台账数据');
      }
      return;
    }
    const selectedData = type === '贴息'
      ? interestLedger[Number(selected.value)]
      : claimLedger[Number(selected.value)];
    const fee = state.fees.find((item) => item.id === currentLedgerFeeId) || getFeeByDomRow(currentLedgerRow);
    if (fee && selectedData) {
      fee.serial = selectedData[0];
      fee.amount = Number(selectedData[7] || 0);
      fee.taxRate = 13;
      fee.taxExcluded = taxExcludedAmount(fee);
      fee.ledgerRef = selectedData[0];
      fee.remark = type === '贴息' ? `${selectedData[1]}贴息台账带出` : selectedData[8];
      const serialInput = currentLedgerRow && currentLedgerRow.querySelector('[data-field="serial"]');
      if (serialInput) serialInput.value = fee.serial;
      console.log('台账已回填', selectedData);
    }
    closeLedgerModal();
  }

  window.openClaimLedgerModal = openClaimLedgerModal;
  window.openInterestLedgerModal = openInterestLedgerModal;
  window.closeLedgerModal = closeLedgerModal;

  if (!window.__orderAllModalDelegatedV3) {
    window.__orderAllModalDelegatedV3 = true;
    document.addEventListener('click', (event) => {
      const upstreamTrigger = closestFromEvent(event, '[data-action="view-upstream-document"]');
      if (upstreamTrigger) {
        event.preventDefault();
        event.stopPropagation();
        console.log('点击查看上游单据');
        openUpstreamDocumentModal();
        return;
      }

      const ledgerTrigger = closestFromEvent(event, '[data-action="open-ledger"]');
      if (ledgerTrigger) {
        event.preventDefault();
        event.stopPropagation();
        const row = ledgerTrigger.closest('tr');
        if (!row) {
          console.error('未找到当前附加费用行');
          return;
        }
        const typeSelect = row.querySelector('[data-field="adjustment-type"]');
        const fee = getFeeByDomRow(row);
        const adjustmentType = typeSelect ? typeSelect.value.trim() : ((fee && fee.type) || '');
        console.log('点击流水号/放大镜，当前调整类型：', adjustmentType);
        if (adjustmentType === '索赔') {
          openClaimLedgerModal(row);
          return;
        }
        if (adjustmentType === '贴息') {
          openInterestLedgerModal(row);
          return;
        }
        console.log('非索赔/贴息类型，不打开台账弹窗');
        return;
      }

      const closeUpstreamTrigger = closestFromEvent(event, '[data-action="close-upstream-document"]');
      if (closeUpstreamTrigger) {
        event.preventDefault();
        event.stopPropagation();
        closeUpstreamDocumentModal();
        return;
      }

      const closeLedgerTrigger = closestFromEvent(event, '[data-action="close-ledger-modal"]');
      if (closeLedgerTrigger) {
        event.preventDefault();
        event.stopPropagation();
        closeLedgerModal();
        return;
      }

      const claimConfirm = closestFromEvent(event, '[data-action="confirm-claim-ledger"]');
      if (claimConfirm) {
        event.preventDefault();
        event.stopPropagation();
        fillCurrentLedgerRow('索赔');
        return;
      }

      const interestConfirm = closestFromEvent(event, '[data-action="confirm-interest-ledger"]');
      if (interestConfirm) {
        event.preventDefault();
        event.stopPropagation();
        fillCurrentLedgerRow('贴息');
        return;
      }

      const fileTarget = closestFromEvent(event, '[data-action="view-upstream-document-file"]');
      if (fileTarget) {
        event.preventDefault();
        event.stopPropagation();
        window.alert('查看附件：' + (fileTarget.getAttribute('data-file') || '附件'));
      }
    });

    document.addEventListener('change', (event) => {
      const typeSelect = closestFromEvent(event, '[data-field="adjustment-type"]');
      if (!typeSelect) return;
      const row = typeSelect.closest('tr');
      const fee = getFeeByDomRow(row);
      if (!fee) return;
      fee.serial = '';
      fee.ledgerRef = '';
      if (!isLedgerType(typeSelect.value)) {
        const serialInput = row.querySelector('[data-field="serial"]');
        if (serialInput) serialInput.value = '';
      }
    });
  }

  if (!window.__buyerLedgerCaptureFallbackV1) {
    window.__buyerLedgerCaptureFallbackV1 = true;
    document.addEventListener('click', (event) => {
      const ledgerTrigger = closestFromEvent(event, '[data-action="open-ledger"]');
      if (!ledgerTrigger) return;
      const row = ledgerTrigger.closest('tr');
      if (!row) return;
      const typeSelect = row.querySelector('[data-field="adjustment-type"]');
      const fee = getFeeByDomRow(row);
      const adjustmentType = typeSelect ? typeSelect.value.trim() : ((fee && fee.type) || '');
      if (adjustmentType !== '索赔' && adjustmentType !== '贴息') return;
      event.preventDefault();
      event.stopPropagation();
      if (adjustmentType === '索赔') {
        openClaimLedgerModal(row);
      } else {
        openInterestLedgerModal(row);
      }
    }, true);
  }

  function isLedgerType(type) {
    return type === '索赔' || type === '贴息';
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
      buyerPaid: routes.buyerPaid,
      invoiceCheck: routes.invoiceCheck,
      supplierDetail: routes.supplierDetail,
      supplierPaid: routes.supplierPaid
    };
    window.location.hash = map[page] || routes.supplierList;
  }

  const component = {
    name: componentName,
    data() {
      const hash = window.location.hash;
      if (hash.includes('buyer')) {
        state.activeView = 'buyer';
        state.activePage = hash.includes('paid-invoice') ? 'buyerPaid' : (hash.includes('detail') ? 'buyerDetail' : 'buyerList');
        state.activeStatus = '待确认';
        if (state.activePage === 'buyerDetail') {
          state.currentStatementId = 'RK009202606120001';
          state.detailStatus = '待确认';
        }
      } else if (hash.includes('invoice/check')) {
        state.activeView = 'buyer';
        state.activePage = 'invoiceCheck';
        state.activeStatus = '待确认';
      } else if (hash.includes('invoice-create')) {
        state.activeView = 'supplier';
        state.activePage = 'supplierInvoice';
        state.activeStatus = '已生成';
      } else if (hash.includes('supplier/reconciliation-detail')) {
        state.activeView = 'supplier';
        state.activePage = 'supplierDetail';
        state.activeStatus = '已生成';
        state.currentStatementId = 'RK009202606120003';
        state.detailStatus = '已生成';
      } else if (hash.includes('supplier/paid-invoice')) {
        state.activeView = 'supplier';
        state.activePage = 'supplierPaid';
        state.activeStatus = '已生成';
      } else {
        state.activeView = 'supplier';
        state.activePage = 'supplierList';
        state.activeStatus = '已生成';
      }
      return {
        s: state,
        tabs,
        adjustmentTypes,
        ledgerVisible: false,
        ledgerType: '索赔',
        activeFee: null,
        ledgerSelected: '',
        ledgerKeyword: '',
        claimLedgerRows: claimLedger,
        interestLedgerRows: interestLedger
      };
    },
    computed: {
      listRows() {
        return statusRows(this.s.activeStatus);
      },
      currentFees() {
        return this.s.fees;
      },
      selectedFees() {
        return this.currentFees.filter((row) => row.checked);
      },
      feeTotal() {
        return this.currentFees.reduce((sum, row) => sum + Number(row.amount || 0), 0);
      },
      allFeeTotal() {
        return this.feeTotal;
      },
      allReceiptTaxIncluded() {
        return this.s.inboundRows.reduce((sum, row) => sum + Number(row.taxIncluded || 0), 0);
      },
      statementTaxIncluded() {
        return this.allReceiptTaxIncluded + this.allFeeTotal;
      },
      currentStatement() {
        return this.s.statements.find((row) => row.id === this.s.currentStatementId) || this.s.statements[0];
      },
      activeOpenTabs() {
        return this.s.openTabs[this.s.activeView] || [];
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
      },
      ledgerPlaceholder() {
        return this.ledgerType === '贴息' ? '请输入OA合同评审单号、合同号、供应商' : '请输入OA索赔申请编号、供应商、工厂';
      }
    },
    mounted() {
      this.ensureTab(this.s.activePage);
    },
    methods: {
      amount,
      switchView(view) {
        this.s.activeView = view;
        this.s.activePage = view === 'supplier' ? 'supplierList' : 'buyerList';
        this.s.activeStatus = view === 'supplier' ? '已生成' : '待确认';
        this.ensureTab(this.s.activePage);
        setHash(this.s.activePage);
      },
      openPage(page) {
        this.s.activePage = page;
        this.ensureTab(page);
        setHash(page);
      },
      tabLabel(page) {
        return {
          supplierList: '入库对账单列表',
          supplierInvoice: '待开票列表-新增',
          supplierPaid: '已开票列表详情',
          supplierDetail: '入库对账单明细查询详情',
          buyerList: '入库对账单列表',
          buyerDetail: '入库对账单明细详情',
          buyerPaid: '供方已开票详情',
          invoiceCheck: '发票校验单详情'
        }[page] || page;
      },
      ensureTab(page) {
        if (page === 'home' || page === 'account') return;
        const list = this.s.openTabs[this.s.activeView];
        if (!list.some((tab) => tab.page === page)) list.push({ page, label: this.tabLabel(page), closable: true });
      },
      openTab(tab) {
        if (tab.placeholder) return;
        if (!tab.closable) return;
        this.openPage(tab.page);
      },
      closeTab(tab, index) {
        if (!tab.closable) return;
        const list = this.s.openTabs[this.s.activeView];
        const wasActive = tab.page === this.s.activePage;
        list.splice(index, 1);
        if (!wasActive) return;
        const next = [...list].slice(0, index).reverse().find((item) => item.closable && !item.placeholder)
          || [...list].slice(index).find((item) => item.closable && !item.placeholder);
        if (next) {
          this.openPage(next.page);
        } else {
          const fallback = this.s.activeView === 'supplier' ? 'supplierList' : 'buyerList';
          this.s.activePage = fallback;
          this.ensureTab(fallback);
          setHash(fallback);
        }
      },
      setStatus(tab) {
        this.s.activeStatus = tab;
      },
      openDetail(row) {
        this.s.currentStatementId = row.id;
        this.s.detailStatus = row.status;
        this.openPage(this.s.activeView === 'buyer' ? 'buyerDetail' : 'supplierDetail');
      },
      showPaidPrintTip() {
        ElementPlus.ElMessage.info('原型演示：点击后将根据当前供方已开票详情生成对账单Excel');
      },
      releaseInboundRecords(row) {
        (row.inboundIds || [row.id]).forEach((id) => {
          if (!this.s.releasedInboundIds.includes(id)) this.s.releasedInboundIds.push(id);
        });
        row.released = true;
      },
      submitStatement(row) {
        if (row.status !== '已生成') return;
        ElementPlus.ElMessageBox.confirm('确认提交该入库对账单吗？', '提交确认', { type: 'warning' }).then(() => {
          row.status = '待确认';
          ElementPlus.ElMessage.success('已提交采购方确认');
        }).catch(() => {});
      },
      supplierVoid(row) {
        if (row.status !== '已生成') return;
        ElementPlus.ElMessageBox.confirm('确认作废该入库对账单吗？作废后该单据占用的入库记录将被释放。', '作废确认', { type: 'warning' }).then(() => {
          row.status = '已作废';
          row.voidReason = '供应商作废，释放入库记录后重新生成';
          this.releaseInboundRecords(row);
          ElementPlus.ElMessage.success('已作废，入库记录已释放');
        }).catch(() => {});
      },
      supplierSubmitCurrent() {
        const row = this.currentStatement;
        if (!row || row.status !== '已生成') return;
        ElementPlus.ElMessageBox.confirm('确认提交该入库对账单吗？', '提交确认', { type: 'warning' }).then(() => {
          row.status = '待确认';
          this.s.detailStatus = '待确认';
          ElementPlus.ElMessage.success('已提交采购方确认');
        }).catch(() => {});
      },
      supplierVoidCurrent() {
        const row = this.currentStatement;
        if (!row || row.status !== '已生成') return;
        ElementPlus.ElMessageBox.confirm('确认作废该入库对账单吗？作废后该单据占用的入库记录将被释放。', '作废确认', { type: 'warning' }).then(() => {
          row.status = '已作废';
          row.voidReason = '供应商作废，释放入库记录后重新生成';
          this.releaseInboundRecords(row);
          this.s.detailStatus = '已作废';
          ElementPlus.ElMessage.success('已作废，入库记录已释放');
        }).catch(() => {});
      },
      goInvoice(row) {
        if (row.status !== '已确认') {
          ElementPlus.ElMessage.warning('仅已确认状态的对账单允许进入开票流程');
          return;
        }
        this.openPage('supplierInvoice');
      },
      addFee() {
        this.s.fees.push({ id: 'F' + Date.now(), checked: false, inboundId: 'RK009202606120003', type: '', serial: '', historyInterest: '', amount: null, taxRate: 13, taxExcluded: null, remark: '', attachment: '' });
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
        row.serial = '';
        row.ledgerRef = '';
        if (!isLedgerType(row.type)) return;
      },
      syncTaxExcluded(row) {
        row.taxExcluded = taxExcludedAmount(row);
      },
      openLedger(row) {
        if (!isLedgerType(row.type)) return;
        this.ledgerType = row.type;
        this.activeFee = row;
        this.ledgerSelected = '';
        this.ledgerVisible = true;
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
          this.activeFee.taxRate = 13;
          this.activeFee.taxExcluded = taxExcludedAmount(this.activeFee);
          this.activeFee.ledgerRef = row[0];
          if (!this.activeFee.remark) this.activeFee.remark = this.ledgerType === '贴息' ? `${row[1]}贴息台账带出` : row[8];
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
        const invalid = this.currentFees.some((fee) => {
          const allEmpty = !fee.type && !fee.serial && (fee.amount === null || fee.amount === undefined || fee.amount === '') && !fee.remark && !fee.attachment;
          if (allEmpty) return true;
          if (!fee.type) return true;
          if (fee.amount === null || fee.amount === undefined || fee.amount === '') return true;
          if (taxRateNumber(fee.taxRate) === null) return true;
          if (taxExcludedAmount(fee) === null) return true;
          if (isLedgerType(fee.type) && !fee.serial) return true;
          return false;
        });
        if (invalid) {
          ElementPlus.ElMessage.warning('请补充完整附加费用信息或删除空行');
          return;
        }
        ElementPlus.ElMessageBox.confirm('确认后对账单将变为已确认状态，供应商可基于该对账单开票，是否确认？', '确认对账单', { type: 'warning' }).then(() => {
          this.s.detailStatus = '已确认';
          const row = this.s.statements.find((item) => item.id === this.s.currentStatementId);
          if (row) row.status = '已确认';
          this.currentFees.forEach((fee) => { fee.checked = false; });
          ElementPlus.ElMessage.success('对账单已确认');
        }).catch(() => {});
      },
      buyerVoidStatement() {
        if (this.s.detailStatus !== '待确认') return;
        ElementPlus.ElMessageBox.prompt('确认作废该入库对账单吗？作废后该对账单占用的入库记录将被释放，供应商可重新选择入库记录生成入库对账单。', '作废确认', {
          type: 'warning',
          inputPlaceholder: '请输入作废原因',
          inputValidator: (value) => Boolean(value && value.trim()) || '请填写作废原因',
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          const row = this.s.statements.find((item) => item.id === this.s.currentStatementId);
          if (row) {
            row.status = '已作废';
            row.voidReason = value;
            this.releaseInboundRecords(row);
          }
          this.s.detailStatus = '已作废';
          this.currentFees.forEach((fee) => { fee.checked = false; });
          ElementPlus.ElMessage.success('已作废，入库记录已释放');
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
              <div class="child" :class="{active:s.activePage==='supplierPaid'}" @click="openPage('supplierPaid')">已开票列表</div>
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
                <div v-for="(tab,index) in activeOpenTabs" :key="tab.page" class="shot-tab" :class="{active:s.activePage===tab.page}" @click="openTab(tab)">
                  {{ tab.label }}<span v-if="tab.closable" class="tab-close" @click.stop="closeTab(tab,index)">×</span>
                </div>
              </div>
              <supplier-list-view v-if="s.activePage==='supplierList'" :tabs="tabs" :rows="listRows" :active-status="s.activeStatus" @status="setStatus" @detail="openDetail" @invoice="goInvoice" @submit="submitStatement" @void="supplierVoid"></supplier-list-view>
              <invoice-create-view v-else-if="s.activePage==='supplierInvoice'" :fees="currentFees" :fee-total="feeTotal" :statement-tax-included="statementTaxIncluded" :inbound-rows="s.inboundRows" @file="viewFile"></invoice-create-view>
              <paid-detail-view v-else-if="s.activePage==='supplierPaid'" :fees="currentFees" :fee-total="feeTotal" :statement-tax-included="statementTaxIncluded" :inbound-rows="s.inboundRows" @file="viewFile"></paid-detail-view>
              <reconciliation-readonly-view v-else :fees="currentFees" :fee-total="feeTotal" :statement-tax-included="statementTaxIncluded" :inbound-rows="s.inboundRows" :statement="currentStatement" @file="viewFile" @submit="supplierSubmitCurrent" @void="supplierVoidCurrent"></reconciliation-readonly-view>
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
              <div class="child" :class="{active:s.activePage==='buyerPaid'}" @click="openPage('buyerPaid')">供方已开票列表</div><div class="child">对账单合并列表</div><div class="child" :class="{active:s.activePage==='invoiceCheck'}" @click="openPage('invoiceCheck')">发票校验单列表</div><div class="child">电子发票档案列表</div><div class="child">供方应收帐款列表</div>
              <div class="group"><i class="ri-calendar-check-line"></i>计划管理<i class="ri-arrow-down-s-line" style="margin-left:auto"></i></div>
            </aside>
            <main class="buyer-main">
              <div class="shot-tabbar">
                <div v-for="(tab,index) in activeOpenTabs" :key="tab.page" class="shot-tab" :class="{active:s.activePage===tab.page}" @click="openTab(tab)">
                  {{ tab.label }}<span v-if="tab.closable" class="tab-close" @click.stop="closeTab(tab,index)">×</span>
                </div>
              </div>
              <buyer-list-view v-if="s.activePage==='buyerList'" :tabs="tabs" :rows="listRows" :active-status="s.activeStatus" @status="setStatus" @detail="openDetail"></buyer-list-view>
              <buyer-detail-view v-else-if="s.activePage==='buyerDetail'" :status="s.detailStatus" :fees="currentFees" :editable="editable" :fee-total="feeTotal" :statement-tax-included="statementTaxIncluded" :adjustment-types="adjustmentTypes" :inbound-rows="s.inboundRows" @add="addFee" @batch-delete="batchDeleteFee" @delete-row="deleteFee" @type-change="typeChange" @tax-change="syncTaxExcluded" @ledger-open="openLedger" @file-click="triggerFile" @file-change="fileChange" @view-file="viewFile" @confirm="confirmStatement" @void="buyerVoidStatement"></buyer-detail-view>
              <paid-detail-view v-else-if="s.activePage==='buyerPaid'" :fees="currentFees" :fee-total="feeTotal" :statement-tax-included="statementTaxIncluded" :inbound-rows="s.inboundRows" @file="viewFile" @print="showPaidPrintTip"></paid-detail-view>
              <invoice-check-view v-else :fees="currentFees" :fee-total="feeTotal" :statement-tax-included="statementTaxIncluded" :inbound-rows="s.inboundRows" @file="viewFile"></invoice-check-view>
            </main>
          </div>
        </template>

        <el-dialog v-model="ledgerVisible" :title="ledgerType === '索赔' ? '选择索赔台账' : '选择贴息台账'" width="1220px" append-to-body class="ledger-dialog">
          <div class="ledger-query"><el-input v-model="ledgerKeyword" :placeholder="ledgerPlaceholder"></el-input><el-button type="primary">查询</el-button><el-button @click="ledgerKeyword=''">重置</el-button></div>
          <div class="ledger-scroll"><table class="shot-table"><thead><tr><th style="width:48px"></th><th v-for="h in ledgerHeaders" :key="h" style="width:140px">{{ h }}</th></tr></thead><tbody><tr v-for="row in ledgerRows" :key="row[0]"><td><el-radio v-model="ledgerSelected" :label="row[0]">&nbsp;</el-radio></td><td v-for="cell in row" :key="cell">{{ cell }}</td></tr></tbody></table></div>
          <template #footer><el-button @click="ledgerVisible=false">取消</el-button><el-button type="primary" @click="confirmLedger">确定</el-button></template>
        </el-dialog>
        <div id="ledgerModalMask" class="ledger-modal-mask"></div>
        <div id="claimLedgerModal" class="ledger-modal" role="dialog" aria-modal="true" aria-labelledby="claimLedgerTitle">
          <div class="ledger-modal-header"><span id="claimLedgerTitle">选择索赔台账</span><button class="ledger-modal-close" type="button" data-action="close-ledger-modal">×</button></div>
          <div class="ledger-modal-body">
            <div class="ledger-modal-query"><input placeholder="请输入OA索赔申请编号、供应商、工厂"><button class="el-button el-button--primary" type="button"><span>查询</span></button><button class="el-button" type="button"><span>重置</span></button></div>
            <div class="table-scroll"><table class="shot-table"><thead><tr><th style="width:48px"></th><th>OA索赔申请编号</th><th>工厂编码</th><th>工厂名称</th><th>供应商编号</th><th>供应商名称</th><th>物料描述</th><th>索赔数量</th><th>含税金额</th><th>备注</th><th>是否已开票</th><th>核算主体</th><th>工厂</th><th>供应商</th><th>公司编码</th><th>是否已完结</th><th>采购审批结束时间</th><th>物料类型</th><th>公司名称</th><th>发起人</th></tr></thead><tbody><tr v-for="(row,index) in claimLedgerRows" :key="row[0]"><td><input type="radio" name="claimLedgerRadio" :value="index"></td><td v-for="cell in row" :key="cell">{{ cell }}</td></tr></tbody></table></div>
          </div>
          <div class="ledger-modal-footer"><button class="el-button" type="button" data-action="close-ledger-modal"><span>取消</span></button><button class="el-button el-button--primary" type="button" data-action="confirm-claim-ledger"><span>确定</span></button></div>
        </div>
        <div id="interestLedgerModal" class="ledger-modal" role="dialog" aria-modal="true" aria-labelledby="interestLedgerTitle">
          <div class="ledger-modal-header"><span id="interestLedgerTitle">选择贴息台账</span><button class="ledger-modal-close" type="button" data-action="close-ledger-modal">×</button></div>
          <div class="ledger-modal-body">
            <div class="ledger-modal-query"><input placeholder="请输入OA合同评审单号、合同号、供应商"><button class="el-button el-button--primary" type="button"><span>查询</span></button><button class="el-button" type="button"><span>重置</span></button></div>
            <div class="table-scroll"><table class="shot-table"><thead><tr><th style="width:48px"></th><th>OA合同评审单号</th><th>合同号</th><th>合同经办人工号</th><th>合同金额</th><th>OA明细行号</th><th>货款日期</th><th>货款（元）</th><th>贴息额(元)</th><th>贴息后需支付金额（元）</th><th>贴息点</th><th>贴息期限（天数）</th><th>付款到期日</th><th>是否下次开负值发票[名称]</th><th>是否已开票</th><th>是否执行（付款）</th><th>贴息供应商</th><th>支付主体</th><th>SAP凭证号（41）</th><th>付款申请单号</th><th>合同甲方</th><th>合同乙方</th><th>付款申请单号+行号</th><th>付款方式（贴息后）</th><th>付款单单号</th></tr></thead><tbody><tr v-for="(row,index) in interestLedgerRows" :key="row[0]"><td><input type="radio" name="interestLedgerRadio" :value="index"></td><td v-for="cell in row" :key="cell">{{ cell }}</td></tr></tbody></table></div>
          </div>
          <div class="ledger-modal-footer"><button class="el-button" type="button" data-action="close-ledger-modal"><span>取消</span></button><button class="el-button el-button--primary" type="button" data-action="confirm-interest-ledger"><span>确定</span></button></div>
        </div>
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
          <tbody><tr v-for="row in rows" :key="row.id"><td><input type="checkbox"></td><td class="link" @click="$emit('detail',row)">{{ row.id }}</td><td>{{ row.factoryCode }}</td><td>{{ row.factoryName }}</td><td>{{ row.supplierCode }}</td><td>{{ row.supplierName }}</td><td>{{ row.amount }}</td><td>{{ row.status }}</td><td>{{ row.time }}</td><td>{{ row.invoiceSaveNo }}</td><td><span class="link" @click="$emit('detail',row)">编辑</span></td></tr></tbody></table></div>
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
    props: ['fees', 'feeTotal', 'statementTaxIncluded', 'inboundRows'],
    emits: ['file'],
    data() {
      return {
        invoiceRows: []
      };
    },
    methods: {
      amount,
      displayTaxRate,
      taxExcludedAmount,
      displayOptionalAmount,
      addInvoiceRow() {
        this.invoiceRows.push({ id: 'INV' + Date.now(), invoiceNo: '', taxExcluded: '', taxRate: '', tax: '', taxIncluded: '', invoiceTime: '', invoiceCode: '', attachment: '' });
      }
    },
    template: `
      <div>
        <div class="detail-card"><div class="small-title"><span><i class="ri-arrow-left-circle-line" style="color:#409eff"></i> 发票填写新增</span><el-button type="primary">提交</el-button></div>
          <div class="section-title">基本信息</div>
          <div class="field-grid"><div class="read-field"><label>发票保存号：</label><span class="read-box"></span></div><div class="read-field"><label>发票类型：</label><span class="read-box">请选择发票类型</span></div><div class="read-field"><label>发票日期：</label><span class="read-box">2026-06-15</span></div><div class="read-field"><label>不含税金额：</label><span class="read-box">3197.2</span></div><div class="read-field"><label>上传电子发票：</label><el-button>上传电子发票</el-button></div></div>
          <div class="section-title">发票信息</div>
          <div style="padding:0 28px 20px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>发票号</th><th>不含税金额</th><th>税率%</th><th>税额</th><th>含税金额</th><th>开票时间</th><th>发票代码</th><th>发票附件</th><th>操作</th></tr></thead><tbody><tr v-if="!invoiceRows.length"><td colspan="10" style="color:#909399">暂无数据</td></tr><tr v-for="(row,index) in invoiceRows" :key="row.id"><td>{{ index + 1 }}</td><td>{{ row.invoiceNo || '-' }}</td><td>{{ row.taxExcluded || '-' }}</td><td>{{ row.taxRate || '-' }}</td><td>{{ row.tax || '-' }}</td><td>{{ row.taxIncluded || '-' }}</td><td>{{ row.invoiceTime || '-' }}</td><td>{{ row.invoiceCode || '-' }}</td><td>{{ row.attachment || '-' }}</td><td><span class="delete-text">删除</span></td></tr></tbody></table></div><div class="footer" style="justify-content:center"><el-button link type="primary" @click="addInvoiceRow">⊕ 新增一行数据</el-button></div></div>
          <div class="section-title">对账单信息</div>
          <div style="padding:0 28px 20px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>单据类型</th><th>单据编号</th><th>不含税金额</th><th>单据时间</th></tr></thead><tbody><tr v-for="(row,index) in inboundRows.slice(1,3)" :key="row.id"><td>{{ index + 1 }}</td><td>{{ row.type }}</td><td>{{ row.id }}</td><td>{{ row.amount }}</td><td>{{ row.time }}</td></tr><tr><td>合计</td><td></td><td></td><td>3197.2000</td><td></td></tr></tbody></table></div></div>
          <div class="section-title">对账单明细信息</div>
          <div style="padding:0 28px 20px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>单据类型</th><th>单据编号</th><th>SRM采购单号</th><th>ERP采购单号</th><th>ERP采购单行号</th><th>移动类型</th><th>物料编号</th><th>物料描述</th><th>应用工厂</th><th>库位</th><th>物料凭证号</th><th>收货日期</th><th>收货数量</th><th>单位</th><th>不含税单价</th><th>不含税金额</th><th>含税金额</th></tr></thead><tbody><tr v-for="(row,index) in inboundRows.slice(1,3)" :key="row.id"><td>{{ index + 1 }}</td><td>{{ row.type }}</td><td>{{ row.id }}</td><td></td><td>{{ row.erpPo }}</td><td>{{ row.erpLine }}</td><td>101</td><td>{{ row.materialNo }}</td><td>{{ row.materialDesc }}</td><td>{{ row.factory }}</td><td>{{ row.location }}</td><td>4900014482</td><td>{{ row.receiptDate }}</td><td>{{ row.qty }}</td><td>{{ row.unit }}</td><td>{{ row.price }}</td><td>{{ row.amount }}</td><td>{{ row.taxIncluded }}</td></tr><tr><td>合计</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>3197.2000</td><td>{{ amount(statementTaxIncluded) }}</td></tr></tbody></table></div></div>
          <div class="section-title">入库单附加费用信息</div>
          <div style="padding:0 28px 32px"><div class="fee-toolbar"><b></b><span class="fee-total">调整合计：{{ amount(feeTotal) }}</span></div><div class="table-scroll"><table class="shot-table"><thead><tr><th>入库单号</th><th>调整类型</th><th>流水号</th><th>历史贴息金额</th><th>调整金额（含税）</th><th>税率</th><th>不含税金额</th><th>备注</th><th>附件</th></tr></thead><tbody><tr v-for="row in fees" :key="row.id"><td>{{ row.inboundId }}</td><td>{{ row.type }}</td><td>{{ row.serial || '' }}</td><td>{{ displayOptionalAmount(row.historyInterest) }}</td><td>{{ amount(row.amount) }}</td><td>{{ displayTaxRate(row.taxRate) }}</td><td>{{ displayOptionalAmount(taxExcludedAmount(row)) }}</td><td>{{ row.remark }}</td><td><span v-if="row.attachment" class="file-link" @click="$emit('file', row.attachment)">{{ row.attachment }}</span><span v-else>-</span></td></tr></tbody></table></div></div>
        </div>
      </div>`
  };

  const BuyerDetailView = {
    props: ['status', 'fees', 'editable', 'feeTotal', 'statementTaxIncluded', 'adjustmentTypes', 'inboundRows'],
    emits: ['add', 'batch-delete', 'delete-row', 'type-change', 'tax-change', 'ledger-open', 'file-click', 'file-change', 'view-file', 'confirm', 'void'],
    methods: {
      amount,
      taxExcludedAmount,
      displayTaxRate,
      displayOptionalAmount,
      trigger(row) {
        const ref = this.$refs['file' + row.id];
        const input = Array.isArray(ref) ? ref[0] : ref;
        if (input) input.click();
      }
    },
    template: `
      <div class="detail-card"><div class="small-title"><span><i class="ri-arrow-left-circle-line" style="color:#409eff"></i> 入库单明细查询详情 <el-tag size="small" :type="status==='待确认'?'warning':'success'">{{ status }}</el-tag></span><span><el-button v-if="editable" type="primary" @click="$emit('confirm')">确认</el-button><el-button v-if="editable" type="danger" plain @click="$emit('void')">作废</el-button><el-button>保存</el-button></span></div>
        <div class="section-title">基本信息</div><div class="field-grid"><div class="read-field"><label>应用工厂：</label><span class="read-box">海宁新能源工厂/HN01</span></div><div class="read-field"><label>记账价金额合计：</label><span class="read-box">零元整</span></div><div class="read-field"><label>¥：</label><span class="read-box">0</span></div><div class="read-field"><label>开票价金额合计：</label><span class="read-box">壹仟伍佰玖拾捌元陆角</span></div><div class="read-field"><label>不含税金额：</label><span class="read-box">1598.6</span></div><div class="read-field"><label>含税金额：</label><span class="read-box">{{ amount(statementTaxIncluded) }}</span></div><div class="read-field"><label>入库单号：</label><span class="read-box">见明细信息</span></div></div>
        <div class="section-title">对账单明细信息</div><div style="padding:0 28px 32px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>收货日期</th><th>物料编号</th><th>物料描述</th><th>收货数量</th><th>单位</th><th>不含税单价</th><th>不含税金额</th><th>含税金额</th><th>应用工厂</th><th>库位</th><th>ERP采购单号</th></tr></thead><tbody><tr v-for="(row,index) in inboundRows" :key="row.id"><td>{{ index + 1 }}</td><td>{{ row.receiptDate }}</td><td>{{ row.materialNo }}</td><td>{{ row.materialDesc }}</td><td>{{ row.qty }}</td><td>{{ row.unit }}</td><td>{{ row.price }}</td><td>{{ row.amount }}</td><td>{{ row.taxIncluded }}</td><td>{{ row.factory }}</td><td>{{ row.location }}</td><td>{{ row.erpPo }}</td></tr></tbody></table></div>
          <div class="fee-zone"><div class="fee-toolbar"><div class="fee-left"><b>入库单附加费用信息</b><el-button v-if="editable" type="primary" @click="$emit('add')">+ 新增一行数据</el-button><el-button v-if="editable" type="danger" plain @click="$emit('batch-delete')">删除</el-button></div><span class="fee-total">调整合计：{{ amount(feeTotal) }}</span></div>
            <div class="table-scroll"><table class="shot-table"><thead><tr><th style="width:44px"><input v-if="editable" type="checkbox"></th><th>调整类型</th><th>流水号</th><th>历史贴息金额</th><th>调整金额（含税）</th><th>税率</th><th>不含税金额</th><th>备注</th><th>附件</th><th>操作</th></tr></thead><tbody><tr v-for="row in fees" :key="row.id" :data-fee-id="row.id"><td><input v-if="editable" v-model="row.checked" type="checkbox"></td><td><select v-if="editable" v-model="row.type" class="native-select" data-field="adjustment-type" @change="$emit('type-change', row)"><option value="">请选择调整类型</option><option v-for="item in adjustmentTypes" :key="item" :value="item">{{ item }}</option></select><span v-else>{{ row.type }}</span></td><td><div v-if="editable && (row.type==='索赔' || row.type==='贴息')" class="serial-picker" @click.stop="$emit('ledger-open', row)"><input :value="row.serial" data-field="serial" data-action="open-ledger" readonly :placeholder="row.type==='索赔' ? '选择索赔台账' : '选择贴息台账'" @click.stop="$emit('ledger-open', row)"><i class="ri-search-line" data-action="open-ledger" @click.stop="$emit('ledger-open', row)"></i></div><span v-else-if="editable" class="serial-disabled">{{ row.serial || '' }}</span><span v-else>{{ row.serial || '' }}</span></td><td><el-input-number v-if="editable" v-model="row.historyInterest" :precision="2" style="width:100%"></el-input-number><span v-else>{{ displayOptionalAmount(row.historyInterest) }}</span></td><td><el-input-number v-if="editable" v-model="row.amount" :precision="2" style="width:100%" @change="$emit('tax-change', row)"></el-input-number><span v-else>{{ amount(row.amount) }}</span></td><td><el-input-number v-if="editable" v-model="row.taxRate" :min="0" :precision="2" style="width:100%" @change="$emit('tax-change', row)"></el-input-number><span v-else>{{ displayTaxRate(row.taxRate) }}</span></td><td>{{ displayOptionalAmount(taxExcludedAmount(row)) }}</td><td><el-input v-if="editable" v-model="row.remark"></el-input><span v-else>{{ row.remark }}</span></td><td><div v-if="editable" class="upload-box" @click="trigger(row)"><span v-if="row.attachment" class="file-link" @click.stop="$emit('view-file', row.attachment)">{{ row.attachment }}</span><span v-else>上传或者看附件</span><i class="ri-attachment-line"></i><input type="file" hidden :ref="'file'+row.id" @change="$emit('file-change', row, $event)"></div><span v-else-if="row.attachment" class="file-link" @click="$emit('view-file', row.attachment)">{{ row.attachment }}</span></td><td><span v-if="editable" class="delete-text" @click="$emit('delete-row', row)">删除</span><span v-else>-</span></td></tr></tbody></table></div><div class="footer"><span>共 {{ fees.length }} 条，已选 {{ fees.filter(f=>f.checked).length }} 条</span></div>
          </div>
        </div>
      </div>`
  };

  const ReconciliationReadonlyView = {
    props: ['fees', 'feeTotal', 'statementTaxIncluded', 'inboundRows', 'statement'],
    emits: ['file', 'submit', 'void'],
    methods: { amount, displayTaxRate, taxExcludedAmount, displayOptionalAmount },
    template: `
      <div class="detail-card"><div class="small-title"><span><i class="ri-arrow-left-circle-line" style="color:#409eff"></i> 入库单明细查询详情 <el-tag v-if="statement" size="small" :type="statement.status==='已生成'?'warning':'info'">{{ statement.status }}</el-tag></span><span><el-button v-if="statement && statement.status==='已生成'" type="primary" @click="$emit('submit')">提交</el-button><el-button v-if="statement && statement.status==='已生成'" type="danger" plain @click="$emit('void')">作废</el-button></span></div>
        <div class="section-title">基本信息</div><div class="field-grid"><div class="read-field"><label>应用工厂：</label><span class="read-box">海宁新能源工厂/HN01</span></div><div class="read-field"><label>不含税金额：</label><span class="read-box">1598.6</span></div><div class="read-field"><label>含税金额：</label><span class="read-box">{{ amount(statementTaxIncluded) }}</span></div><div class="read-field"><label>入库单号：</label><span class="read-box">见明细信息</span></div><div v-if="statement && statement.status==='已作废'" class="read-field"><label>作废原因：</label><span class="read-box">{{ statement.voidReason || '已作废，入库记录已释放' }}</span></div></div>
        <div class="section-title">对账单明细信息</div><div style="padding:0 28px 32px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>收货日期</th><th>物料编号</th><th>物料描述</th><th>收货数量</th><th>单位</th><th>不含税单价</th><th>不含税金额</th><th>含税金额</th><th>应用工厂</th><th>库位</th><th>ERP采购单号</th></tr></thead><tbody><tr v-for="(row,index) in inboundRows" :key="row.id"><td>{{ index + 1 }}</td><td>{{ row.receiptDate }}</td><td>{{ row.materialNo }}</td><td>{{ row.materialDesc }}</td><td>{{ row.qty }}</td><td>{{ row.unit }}</td><td>{{ row.price }}</td><td>{{ row.amount }}</td><td>{{ row.taxIncluded }}</td><td>{{ row.factory }}</td><td>{{ row.location }}</td><td>{{ row.erpPo }}</td></tr></tbody></table></div>
          <div class="fee-zone"><div class="fee-toolbar"><b>入库单附加费用信息</b><span class="fee-total">调整合计：{{ amount(feeTotal) }}</span></div><div class="table-scroll"><table class="shot-table"><thead><tr><th>调整类型</th><th>流水号</th><th>历史贴息金额</th><th>调整金额（含税）</th><th>税率</th><th>不含税金额</th><th>备注</th><th>附件</th></tr></thead><tbody><tr v-for="row in fees" :key="row.id"><td>{{ row.type }}</td><td>{{ row.serial || '' }}</td><td>{{ displayOptionalAmount(row.historyInterest) }}</td><td>{{ amount(row.amount) }}</td><td>{{ displayTaxRate(row.taxRate) }}</td><td>{{ displayOptionalAmount(taxExcludedAmount(row)) }}</td><td>{{ row.remark }}</td><td><span v-if="row.attachment" class="file-link" @click="$emit('file', row.attachment)">{{ row.attachment }}</span><span v-else>-</span></td></tr></tbody></table></div></div>
        </div>
      </div>`
  };

  const ReadonlyFeeTable = {
    props: ['fees', 'feeTotal'],
    emits: ['file'],
    methods: { amount, displayTaxRate, taxExcludedAmount, displayOptionalAmount },
    template: `
      <div class="fee-zone"><div class="fee-toolbar"><b>入库单附加费用信息</b><span class="fee-total">调整合计：{{ amount(feeTotal) }}</span></div>
        <div class="table-scroll"><table class="shot-table"><thead><tr><th>入库单号</th><th>调整类型</th><th>流水号</th><th>历史贴息金额</th><th>调整金额（含税）</th><th>税率</th><th>不含税金额</th><th>备注</th><th>附件</th></tr></thead><tbody><tr v-for="row in fees" :key="row.id"><td>{{ row.inboundId }}</td><td>{{ row.type }}</td><td>{{ row.serial || '' }}</td><td>{{ displayOptionalAmount(row.historyInterest) }}</td><td>{{ amount(row.amount) }}</td><td>{{ displayTaxRate(row.taxRate) }}</td><td>{{ displayOptionalAmount(taxExcludedAmount(row)) }}</td><td>{{ row.remark }}</td><td><span v-if="row.attachment" class="file-link" @click="$emit('file', row.attachment)">{{ row.attachment }}</span><span v-else>-</span></td></tr></tbody></table></div>
      </div>`
  };

  const PaidDetailView = {
    props: ['fees', 'feeTotal', 'statementTaxIncluded', 'inboundRows'],
    emits: ['file', 'print'],
    components: { ReadonlyFeeTable },
    methods: { amount, displayTaxRate, taxExcludedAmount, displayOptionalAmount },
    template: `
      <div class="detail-card"><div class="small-title"><span><i class="ri-arrow-left-circle-line" style="color:#409eff"></i> 供方已开票详情</span><el-button type="primary" @click="$emit('print')">打印</el-button></div>
        <div class="section-title">基本信息</div><div class="field-grid"><div class="read-field"><label>发票保存号：</label><span class="read-box">FP009202606120002</span></div><div class="read-field"><label>发票类型：</label><span class="read-box">纸质发票</span></div><div class="read-field"><label>发票日期：</label><span class="read-box">2026-06-12</span></div><div class="read-field"><label>不含税金额：</label><span class="read-box">3636.3</span></div><div class="read-field"><label>对账单含税金额：</label><span class="read-box">{{ amount(statementTaxIncluded) }}</span></div></div>
        <div class="section-title">发票信息</div><div style="padding:0 28px 20px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>发票号</th><th>不含税金额</th><th>税率%</th><th>税额</th><th>含税金额</th><th>开票时间</th><th>开票代码</th><th>发票附件</th></tr></thead><tbody><tr><td>1</td><td>26332000004949665201</td><td>3636.3</td><td>0</td><td>0</td><td>3636.3</td><td>2026-06-11</td><td>26332000004949665201</td><td><span class="file-link" @click="$emit('file','22BB23CBFC7F4EDB.pdf')">22BB23CBFC7F4EDB.pdf</span></td></tr><tr><td>合计</td><td></td><td>3636.3000</td><td></td><td>0.0000</td><td>3636.3000</td><td></td><td></td><td></td></tr></tbody></table></div></div>
        <div class="section-title">对账单信息</div><div style="padding:0 28px 20px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>单据类型</th><th>单据编号</th><th>不含税金额</th><th>含税金额</th><th>单据时间</th></tr></thead><tbody><tr v-for="(row,index) in inboundRows" :key="row.id"><td>{{ index + 1 }}</td><td>{{ row.type }}</td><td>{{ row.id }}</td><td>{{ row.amount }}</td><td>{{ row.taxIncluded }}</td><td>{{ row.time }}</td></tr></tbody></table></div></div>
        <div class="section-title">对账单明细信息</div><div style="padding:0 28px 32px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>单据类型</th><th>SRM采购单号</th><th>ERP采购单号</th><th>ERP采购单行号</th><th>移动类型</th><th>物料编号</th><th>物料描述</th></tr></thead><tbody><tr v-for="(row,index) in inboundRows" :key="row.id"><td>{{ index + 1 }}</td><td>{{ row.type }}</td><td></td><td>{{ row.erpPo }}</td><td>{{ row.erpLine }}</td><td>101</td><td>{{ row.materialNo }}</td><td>{{ row.materialDesc }}</td></tr></tbody></table></div><readonly-fee-table :fees="fees" :fee-total="feeTotal" @file="$emit('file',$event)"></readonly-fee-table></div>
      </div>`
  };

  const InvoiceCheckView = {
    props: ['fees', 'feeTotal', 'statementTaxIncluded', 'inboundRows'],
    emits: ['file'],
    components: { ReadonlyFeeTable },
    data() {
      return { upstreamVisible: false };
    },
    methods: {
      amount,
      displayTaxRate,
      taxExcludedAmount,
      displayOptionalAmount,
      openUpstreamInline() {
        console.log('点击查看上游单据');
        openUpstreamDocumentModal();
      }
    },
    template: `
      <div class="detail-card"><div class="small-title"><span><i class="ri-arrow-left-circle-line" style="color:#409eff"></i> 供方已开票列表-校验</span><span><el-button>保存</el-button><el-button>同步</el-button></span></div>
        <div class="section-title">基本信息</div><div class="field-grid"><div class="read-field"><label>检验单号：</label><span class="read-box">JY202606120002</span></div><div class="read-field"><label>供应商编号：</label><span class="read-box">0010001404</span></div><div class="read-field"><label>供应商名称：</label><span class="read-box">杭州萧山江海实业有限公司</span></div><div class="read-field"><label>发票号：</label><span class="read-box">26332000004949665201</span></div><div class="read-field"><label>不含税总额：</label><span class="read-box">3636.3000</span></div><div class="read-field"><label>开票价总额：</label><span class="read-box">{{ amount(statementTaxIncluded) }}</span></div></div>
        <div class="section-title">供方已开票信息</div><div style="padding:0 28px 32px"><div class="table-scroll"><table class="shot-table"><thead><tr><th>发票保存号</th><th>单据类型</th><th>单据编号</th><th>状态</th><th>开票价金额</th><th>记账价金额</th><th>操作</th></tr></thead><tbody><tr><td>FP009202606120002</td><td>入库单</td><td>RK009202606120001</td><td>已确认</td><td>3636.3</td><td>3636.3</td><td><a href="javascript:void(0)" class="link-btn" data-action="view-upstream-document" @click.prevent.stop="openUpstreamInline">查看上游单据</a></td></tr></tbody></table></div></div>
        <div id="upstreamDocumentMask" class="upstream-modal-mask"></div>
        <div id="upstreamDocumentModal" class="upstream-modal" role="dialog" aria-modal="true" aria-labelledby="upstreamDocumentTitle">
          <div class="upstream-modal-header"><span id="upstreamDocumentTitle">查看上游单据</span><button class="upstream-modal-close" type="button" data-action="close-upstream-document">×</button></div>
          <div class="upstream-modal-body">
            <div class="section-title" style="padding-left:0">入库单收货记录信息</div>
            <div class="table-scroll"><table class="shot-table"><thead><tr><th>序号</th><th>入库单号</th><th>ERP采购单号</th><th>ERP采购单行号</th><th>采购类型</th><th>物料编号</th><th>物料描述</th><th>收货数量</th><th>单位</th><th>不含税单价</th><th>不含税金额</th><th>含税金额</th><th>收货日期</th></tr></thead><tbody><tr v-for="(row,index) in inboundRows" :key="row.id"><td>{{ index + 1 }}</td><td>{{ row.id }}</td><td>{{ row.erpPo }}</td><td>{{ row.erpLine }}</td><td>101</td><td>{{ row.materialNo }}</td><td>{{ row.materialDesc }}</td><td>{{ row.qty }}</td><td>{{ row.unit }}</td><td>{{ row.price }}</td><td>{{ amount(row.amount) }}</td><td>{{ amount(row.taxIncluded) }}</td><td>{{ row.receiptDate }}</td></tr></tbody></table></div>
            <div class="fee-zone"><div class="fee-toolbar"><b>入库单附加费用信息</b><span class="fee-total">调整合计：{{ amount(feeTotal) }}</span></div><div class="table-scroll"><table class="shot-table"><thead><tr><th>入库单号</th><th>调整类型</th><th>流水号</th><th>历史贴息金额</th><th>调整金额（含税）</th><th>税率</th><th>不含税金额</th><th>备注</th><th>附件</th></tr></thead><tbody><tr v-for="row in fees" :key="row.id"><td>{{ row.inboundId }}</td><td>{{ row.type }}</td><td>{{ row.serial || '' }}</td><td>{{ displayOptionalAmount(row.historyInterest) }}</td><td>{{ amount(row.amount) }}</td><td>{{ displayTaxRate(row.taxRate) }}</td><td>{{ displayOptionalAmount(taxExcludedAmount(row)) }}</td><td>{{ row.remark }}</td><td><a v-if="row.attachment" href="javascript:void(0)" class="link-btn" data-action="view-upstream-document-file" :data-file="row.attachment">{{ row.attachment }}</a><span v-else>-</span></td></tr></tbody></table></div></div>
          </div>
          <div class="upstream-modal-footer"><button class="el-button el-button--primary" type="button" data-action="close-upstream-document"><span>关闭</span></button></div>
        </div>
      </div>`
  };

  injectStyles();
  ChintPrototypeShell.registerPageComponent(componentName, {
    ...component,
    components: { SupplierListView, BuyerListView, InvoiceCreateView, BuyerDetailView, ReconciliationReadonlyView, ReadonlyFeeTable, PaidDetailView, InvoiceCheckView }
  });

  Object.entries({
    [routes.supplierList]: '供应商端入库对账单列表',
    [routes.supplierInvoice]: '供应商端待开票列表-新增',
    [routes.buyerList]: '采购方入库对账单列表',
    [routes.buyerDetail]: '采购方入库对账单详情',
    [routes.buyerPaid]: '采购方供方已开票列表详情',
    [routes.supplierDetail]: '供应商端入库对账单详情',
    [routes.invoiceCheck]: '发票校验单详情',
    [routes.supplierPaid]: '供应商端已开票列表详情'
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

(function (window) {
  const componentName = 'PurchaseOrderExtraFieldsPage';

  const routes = {
    buyerOrderList: '#/buyer/purchase-order-list',
    buyerCreate: '#/buyer/purchase-order-create',
    buyerDetail: '#/buyer/purchase-order-detail',
    buyerChangeList: '#/buyer/purchase-change-list',
    buyerChangeCreate: '#/buyer/purchase-change-create',
    buyerChangeDetail: '#/buyer/purchase-change-detail',
    supplierConfirmList: '#/supplier/order-confirm-list',
    supplierConfirm: '#/supplier/order-confirm-detail',
    supplierChangeConfirmList: '#/supplier/order-change-confirm-list',
    supplierChangeConfirm: '#/supplier/order-change-confirm-detail'
  };

  function installStyle() {
    if (document.getElementById('purchase-order-extra-style')) return;
    const style = document.createElement('style');
    style.id = 'purchase-order-extra-style';
    style.textContent = `
      .po-page{color:#303133;font-size:12px}
      .po-titlebar{height:42px;background:#fff;border:1px solid #edf2f8;margin:12px 0;display:flex;align-items:center;justify-content:space-between;padding:0 12px;font-size:14px}
      .po-titlebar .left{display:flex;align-items:center;gap:6px}.po-titlebar .left i{color:#409eff;font-size:18px}.po-actions{display:flex;gap:8px;align-items:center}
      .po-btn{height:28px;border:1px solid #dcdfe6;background:#fff;border-radius:3px;padding:0 14px;color:#303133;cursor:pointer}.po-btn.primary{background:#1f72e8;border-color:#1f72e8;color:#fff}.po-btn.danger{border-color:#f3b7b7;color:#f56c6c;background:#fff}
      .po-card{background:#fff;border:1px solid #edf2f8;margin-bottom:12px;padding:0 12px 18px}.po-section-title{height:42px;display:flex;align-items:center;font-size:14px;font-weight:700;border-bottom:1px solid #d8e0ec;margin-bottom:12px}.po-section-title:before{content:"";width:3px;height:18px;background:#2d7df0;margin-right:8px}
      .po-panel-title{height:42px;display:flex;align-items:center;font-size:14px;font-weight:700}.po-panel-title:before{content:"";width:3px;height:16px;background:#2d7df0;margin-right:8px}
      .po-form-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px 34px}.po-field{display:flex;align-items:center;min-width:0}.po-field label{width:112px;text-align:right;margin-right:8px;color:#333;white-space:nowrap}.po-field .el-input,.po-field .el-select,.po-field .el-autocomplete{flex:1}.po-field.wide{grid-column:1/-1}.po-field.wide label{align-self:flex-start;padding-top:8px}.po-field textarea{flex:1;height:46px;border:1px solid #dcdfe6;border-radius:3px;padding:6px 8px;resize:vertical;color:#606266;background:#fff}
      .po-query{background:#eef3fa;padding:12px;margin-bottom:12px}.po-query .po-form-grid{grid-template-columns:repeat(3,1fr)}.po-toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.po-toolbar-left,.po-toolbar-right{display:flex;gap:8px;align-items:center}
      .po-tabs{display:flex;gap:28px;border-bottom:1px solid #d8e0ec;margin-bottom:10px}.po-status-tab{height:34px;line-height:34px;cursor:pointer;font-weight:600}.po-status-tab.active{color:#1677ff;border-bottom:2px solid #1677ff}
      .po-table-title{height:40px;display:flex;align-items:center;justify-content:space-between;font-size:14px;font-weight:700}.po-table-wrap{overflow:auto;border:1px solid #d9e1ec;background:#fff}.po-table{width:100%;min-width:2600px;border-collapse:collapse;table-layout:fixed}.po-table.compact{min-width:1900px}.po-table.list{min-width:2300px}.po-table th{height:34px;background:#f0f3f8;border:1px solid #d9e1ec;color:#263445;font-weight:500;white-space:nowrap}.po-table td{height:38px;border:1px solid #e0e7f0;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 6px}
      .po-table.supplier-detail{min-width:1900px}
      .po-cell-input,.po-cell-select{width:100%;height:28px;border:1px solid #dcdfe6;border-radius:3px;background:#fff;color:#606266;padding:0 6px;box-sizing:border-box}.po-readonly{display:block;height:28px;line-height:28px;background:#f5f7fa;border:1px solid #e4e7ed;border-radius:3px;color:#909399;padding:0 6px;text-align:left;overflow:hidden;text-overflow:ellipsis}.po-empty{height:52px;color:#909399;text-align:center}.po-link{color:#1677ff;cursor:pointer}.po-muted{color:#8b95a5}.po-line-red{color:#f56c6c}.po-footer{height:36px;display:flex;align-items:center;justify-content:space-between;color:#606266}
    `;
    document.head.appendChild(style);
  }

  installStyle();

  const baseBuyerHeader = {
    orderNo: 'CD202606120006',
    erpOrderNo: '4900014476',
    orderType: '行政IT消耗品采购订单',
    companyName: '正泰新能源科技股份有限公司',
    erpCompanyCode: '7000',
    purchaseOrg: '正泰太阳能生产基地动力类采购组织',
    purchaseGroup: '主料',
    erpPurchaseOrg: 'C001',
    supplierCode: '0010001404',
    supplierName: '杭州萧山江海实业有限公司',
    contractNo: '',
    paymentTerms: '（正泰）发票校验后120天100%银行承兑汇票（6个月）',
    currency: '中国人民币（CNY）',
    approvalType: '功能审批',
    creator: '黄达璐',
    createdAt: '2026-06-12 09:03:31',
    voucherDate: '2026-06-12',
    remark: '',
    buyerName: '李思锦',
    buyerId: 'P10023',
    payableType: ''
  };

  const createHeader = {
    orderNo: '',
    erpOrderNo: '',
    orderType: '生产材料采购订单',
    companyName: '正泰新能源科技股份有限公司',
    erpCompanyCode: '7000',
    purchaseOrg: '',
    purchaseGroup: '',
    erpPurchaseOrg: '',
    supplierCode: '',
    supplierName: '',
    contractNo: '',
    paymentTerms: '',
    currency: '请选择',
    approvalType: '功能审批',
    creator: '李思锦',
    createdAt: '范围查询',
    voucherDate: '2026-06-23',
    remark: '',
    buyerName: '',
    buyerId: '',
    payableType: ''
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  const sampleLines = [
    {
      lineNo: '1',
      status: '正常',
      materialCode: '1070000207',
      materialDesc: '156.75多晶厚度200±20um',
      baseUnit: 'PC',
      quantity: 18,
      price: 79.93,
      currency: 'CNY',
      per: 1,
      manufacturer: '',
      factory: '海宁新能源工厂',
      requiredDate: '2026-06-12 17:00:00',
      location: '',
      sapAccountCategory: '',
      sapProjectType: '0',
      returnFlag: '否',
      freeFlag: '否',
      efficiencyLevel: '',
      theoreticalPower: '',
      efficiencyPrice: '/',
      componentDetail: '',
      costCenter: 'CC-HN-1001',
      internalOrder: 'IO-202606-018',
      materialGroup: '化学品-酸碱类',
      sdVoucher: 'SD202606120001',
      sdItem: '000010',
      fixedAssetNo: 'FA-HN-2026-001',
      packageUnit: '桶',
      packageQty: '25kg/桶',
      bondedManualNo: 'BOND-HN-2026-01'
    },
    {
      lineNo: '2',
      status: '正常',
      materialCode: '1070000308',
      materialDesc: 'EVA百佳年代B60',
      baseUnit: '平方米',
      quantity: 10790,
      price: 4.9,
      currency: 'CNY',
      per: 1,
      manufacturer: '',
      factory: '海宁新能源工厂',
      requiredDate: '2026-06-18 17:00:00',
      location: 'M401',
      sapAccountCategory: '',
      sapProjectType: '',
      returnFlag: '否',
      freeFlag: '否',
      efficiencyLevel: '',
      theoreticalPower: '',
      efficiencyPrice: '',
      componentDetail: '',
      costCenter: '',
      internalOrder: '',
      materialGroup: '光伏封装材料',
      sdVoucher: 'SD202606120002',
      sdItem: '000020',
      fixedAssetNo: '',
      packageUnit: '',
      packageQty: '',
      bondedManualNo: ''
    }
  ];

  const orderListRows = [
    { orderNo: 'CD202606170004', typeName: '研发和样品采购订单', status: '正常', confirmStatus: '待确认', approveStatus: '待审批', sendStatus: '待发货', receiveStatus: '待收货', erpNo: '', syncInfo: '', erpStatus: '未同步', tiNo: '', companyCode: 'A70000056', companyName: '正泰新能源科技股份有限公司', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司' },
    { orderNo: 'CD202606170003', typeName: '研发和样品采购订单', status: '正常', confirmStatus: '待确认', approveStatus: '待审批', sendStatus: '待发货', receiveStatus: '待收货', erpNo: '', syncInfo: '', erpStatus: '未同步', tiNo: '', companyCode: 'A70000056', companyName: '正泰新能源科技股份有限公司', supplierCode: '0010001404', supplierName: '杭州萧山江海实业有限公司' }
  ];

  const changeListRows = [
    { changeNo: 'DDBG202606230013', orderNo: 'CD202606120021', changeStatus: '变更中', approveStatus: '待审批', erpNo: '4900014488', companyCode: 'A70000056', companyName: '正泰新能源科技股份有限公司', purchaseOrgCode: 'CS001', purchaseOrgName: '正泰太阳能生产基地动力类采购组织', purchaseGroup: '307' },
    { changeNo: 'DDBG202606120001', orderNo: 'CD202606120011', changeStatus: '变更中', approveStatus: '待审批', erpNo: '5600011977', companyCode: 'A70000056', companyName: '正泰新能源科技股份有限公司', purchaseOrgCode: 'C001', purchaseOrgName: '正泰太阳能生产基地动力类采购组织', purchaseGroup: '100' }
  ];

  const supplierOrderRows = [
    { orderNo: 'CD202506240007', erpNo: '', factory: '海宁新能源工厂', creator: '赵张笙', createdAt: '2026-06-24 14:21:22', remark: '', attach: '暂无附件', orderStatus: '正常', confirmStatus: '待确认', companyName: '正泰新能源科技股份有限公司', purchaseOrgName: '正泰太阳能生产基地动力类采购组织', purchaseGroup: '委外加工采购' },
    { orderNo: 'CD202506240006', erpNo: '', factory: '海宁新能源工厂', creator: '曾甜甜', createdAt: '2026-06-24 13:57:28', remark: '', attach: '暂无附件', orderStatus: '正常', confirmStatus: '待确认', companyName: '正泰新能源科技股份有限公司', purchaseOrgName: '正泰太阳能生产基地动力类采购组织', purchaseGroup: '主料' }
  ];

  const supplierChangeRows = [
    { changeNo: 'DDBG202606230002', orderNo: 'CD202606120027', read: '未读', changeStatus: '变更中', companyName: '正泰新能源科技股份有限公司', creator: '黄达璐', createdAt: '2026-06-23 10:31:27', sync: '否', syncAt: '', erpNo: '4900014485', purchaseOrgName: '正泰太阳能生产基地动力类采购组织', supplierName: '杭州萧山江海实业有限公司' },
    { changeNo: 'DDBG202604300001', orderNo: 'CD202604220011', read: '未读', changeStatus: '变更中', companyName: '正泰新能源科技股份有限公司', creator: '李思锦', createdAt: '2026-04-30 13:53:46', sync: '否', syncAt: '', erpNo: '4900014467', purchaseOrgName: '正泰太阳能生产基地动力类采购组织', supplierName: '杭州萧山江海实业有限公司' }
  ];

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      return {
        routes,
        hash: window.location.hash,
        activeListTab: '未审批通过',
        activeChangeTab: '变更中',
        supplierConfirmTab: '待确认',
        buyerOptions: [
          { value: '李思锦', id: 'P10023' },
          { value: '黄达璐', id: 'P10031' },
          { value: '周佳宁', id: 'P10068' }
        ],
        payableTypeOptions: ['材料类付款', '对公类付款', '资产类付款'],
        costCenterOptions: ['CC-HN-1001', 'CC-HN-1002', 'CC-IT-2026', ''],
        createHeader: clone(createHeader),
        detailHeader: clone(baseBuyerHeader),
        changeHeader: Object.assign(clone(baseBuyerHeader), { orderNo: '', erpOrderNo: '', creator: '', createdAt: '', voucherDate: '', remark: '', buyerName: '', buyerId: '' }),
        changeDetailHeader: clone(baseBuyerHeader),
        supplierHeader: Object.assign(clone(baseBuyerHeader), { orderNo: 'CD202606110015', erpOrderNo: '', purchaseOrg: '安徽采购组织', purchaseGroup: '主料', createdAt: '2026-06-11', contractNo: '', buyerName: '李思锦', buyerId: 'P10023' }),
        supplierChangeHeader: clone(baseBuyerHeader),
        createRows: clone(sampleLines),
        detailRows: clone(sampleLines),
        changeRows: clone(sampleLines),
        changeDetailRows: clone(sampleLines),
        supplierRows: clone(sampleLines),
        supplierChangeRows: clone(sampleLines),
        orderListRows,
        changeListRows,
        supplierOrderRows,
        supplierChangeRows
      };
    },
    computed: {
      pageKind() {
        const current = this.hash || window.location.hash;
        if (current.includes('purchase-order-list')) return 'buyerOrderList';
        if (current.includes('purchase-order-create')) return 'buyerCreate';
        if (current.includes('purchase-order-detail')) return 'buyerDetail';
        if (current.includes('purchase-change-list')) return 'buyerChangeList';
        if (current.includes('purchase-change-create')) return 'buyerChangeCreate';
        if (current.includes('purchase-change-detail')) return 'buyerChangeDetail';
        if (current.includes('order-change-confirm-list')) return 'supplierChangeConfirmList';
        if (current.includes('order-change-confirm-detail')) return 'supplierChangeConfirm';
        if (current.includes('order-confirm-list')) return 'supplierConfirmList';
        return 'supplierConfirm';
      },
      isListPage() {
        return ['buyerOrderList', 'buyerChangeList', 'supplierConfirmList', 'supplierChangeConfirmList'].includes(this.pageKind);
      },
      isSupplier() {
        return ['supplierConfirmList', 'supplierConfirm', 'supplierChangeConfirmList', 'supplierChangeConfirm'].includes(this.pageKind);
      },
      isMaintenance() {
        return this.pageKind === 'buyerCreate' || this.pageKind === 'buyerChangeCreate';
      },
      showPayableType() {
        return ['buyerCreate', 'buyerDetail', 'buyerChangeCreate', 'buyerChangeDetail'].includes(this.pageKind);
      },
      canEditPayableType() {
        return ['buyerCreate', 'buyerDetail', 'buyerChangeCreate'].includes(this.pageKind);
      },
      orderDetailColspan() {
        return this.isSupplier ? 24 : 31;
      },
      currentHeader() {
        return {
          buyerCreate: this.createHeader,
          buyerDetail: this.detailHeader,
          buyerChangeCreate: this.changeHeader,
          buyerChangeDetail: this.changeDetailHeader,
          supplierConfirm: this.supplierHeader,
          supplierChangeConfirm: this.supplierChangeHeader
        }[this.pageKind] || this.detailHeader;
      },
      currentRows() {
        return {
          buyerCreate: this.createRows,
          buyerDetail: this.detailRows,
          buyerChangeCreate: this.changeRows,
          buyerChangeDetail: this.changeDetailRows,
          supplierConfirm: this.supplierRows,
          supplierChangeConfirm: this.supplierChangeRows
        }[this.pageKind] || [];
      },
      titleText() {
        return {
          buyerOrderList: '采购订单下达',
          buyerCreate: '采购订单下达-新增',
          buyerDetail: '采购订单下达-详情',
          buyerChangeList: '采购订单变更单列表',
          buyerChangeCreate: '采购订单变更新增',
          buyerChangeDetail: '采购订单变更详情',
          supplierConfirmList: '采购订单查询确认',
          supplierConfirm: '采购订单查询确认详情',
          supplierChangeConfirmList: '采购订单变更供应商查询',
          supplierChangeConfirm: '采购订单变更查询确认'
        }[this.pageKind];
      },
      sectionTitle() {
        return this.pageKind.includes('Change') ? '订单基本信息' : '【新能】采购订单';
      },
      rowSectionTitle() {
        return '订单明细信息';
      },
      currentTabLabel() {
        return this.titleText || '订单工作台';
      },
      activeMenuKey() {
        return {
          buyerOrderList: 'buyerOrderList',
          buyerCreate: 'buyerOrderList',
          buyerDetail: 'buyerOrderList',
          buyerChangeList: 'buyerChangeList',
          buyerChangeCreate: 'buyerChangeList',
          buyerChangeDetail: 'buyerChangeList',
          supplierConfirmList: 'supplierConfirmList',
          supplierConfirm: 'supplierConfirmList',
          supplierChangeConfirmList: 'supplierChangeConfirmList',
          supplierChangeConfirm: 'supplierChangeConfirmList'
        }[this.pageKind] || 'buyerOrderList';
      }
    },
    mounted() {
      this.onHashChange = () => { this.hash = window.location.hash; };
      window.addEventListener('hashchange', this.onHashChange);
    },
    beforeUnmount() {
      window.removeEventListener('hashchange', this.onHashChange);
    },
    methods: {
      navigate(path) {
        window.location.hash = path;
      },
      menuActive(key) {
        return this.activeMenuKey === key;
      },
      buyerQuery(query, callback) {
        const keyword = (query || '').trim();
        const rows = this.buyerOptions.filter((item) => !keyword || item.value.includes(keyword) || item.id.includes(keyword));
        callback(rows);
      },
      selectBuyer(item) {
        this.currentHeader.buyerName = item.value;
        this.currentHeader.buyerId = item.id;
      },
      buyerInput(value) {
        const hit = this.buyerOptions.find((item) => item.value === value);
        this.currentHeader.buyerId = hit ? hit.id : '';
      },
      save() {
        if (this.showPayableType && !this.currentHeader.payableType) {
          ElementPlus.ElMessage.warning('请选择应付款类型');
          return;
        }
        if (this.pageKind === 'buyerCreate') {
          this.detailHeader.payableType = this.createHeader.payableType;
          this.changeHeader.payableType = this.createHeader.payableType;
          this.changeDetailHeader.payableType = this.createHeader.payableType;
        }
        if (this.pageKind === 'buyerDetail') {
          this.changeHeader.payableType = this.detailHeader.payableType;
          this.changeDetailHeader.payableType = this.detailHeader.payableType;
        }
        if (this.pageKind === 'buyerChangeCreate') {
          this.changeDetailHeader.payableType = this.changeHeader.payableType;
        }
        ElementPlus.ElMessage.success('已保存');
      },
      cancel() {
        ElementPlus.ElMessage.info('已取消');
      },
      confirmSupplier() {
        ElementPlus.ElMessage.success('已确认');
      },
      print() {
        ElementPlus.ElMessage.info('原型演示：打印当前采购订单');
      },
      headerInput(key, label, readonly) {
        return { key, label, readonly };
      }
    },
    template: `
      <div class="po-page">
        <template v-if="pageKind==='buyerOrderList'">
          <section class="po-card">
            <div class="po-panel-title">采购订单下达</div>
            <div class="po-toolbar">
              <div></div>
              <div class="po-toolbar-right">
                <button class="po-btn primary" @click="navigate(routes.buyerCreate)">＋ 手工创建</button>
                <button class="po-btn primary">＋ 引用采购申请</button>
                <button class="po-btn danger">删除</button>
                <button class="po-btn">审批通过</button>
                <button class="po-btn">审批拒绝</button>
                <button class="po-btn">打印</button>
                <button class="po-btn primary">确认</button>
                <button class="po-btn">批量修改</button>
                <button class="po-btn">导入</button>
                <button class="po-btn">创建退换货订单</button>
                <button class="po-btn">导出</button>
              </div>
            </div>
            <div class="po-query">
              <div class="po-form-grid">
                <div class="po-field"><label>订单审批状态：</label><el-input placeholder="请选择"></el-input></div>
                <div class="po-field"><label>创建时间：</label><el-input placeholder="开始时间 至 结束时间"></el-input></div>
                <div class="po-field"><label>采购订单编码：</label><el-input placeholder="请输入"></el-input></div>
                <div class="po-field"><label>订单确认状态：</label><el-input placeholder="请选择"></el-input></div>
                <div class="po-field"><label>订单来源：</label><el-input placeholder="请选择"></el-input></div>
                <div class="po-field"><label>订单状态：</label><el-input placeholder="请选择"></el-input></div>
                <div class="po-field"><label>采购组织名称：</label><el-input placeholder="请选择"></el-input></div>
                <div class="po-field"><label>创建人：</label><el-input placeholder="请输入"></el-input></div>
                <div class="po-field"><label>供应商名称：</label><el-input placeholder="请输入"></el-input></div>
              </div>
            </div>
            <div class="po-tabs">
              <span v-for="tab in ['未审批通过','待确认','已确认','变更中','已终止','删除','全部','超24H未确认']" :key="tab" class="po-status-tab" :class="{active:activeListTab===tab}" @click="activeListTab=tab">{{ tab }}</span>
            </div>
            <div class="po-table-wrap">
              <table class="po-table list">
                <thead><tr><th style="width:54px"><input type="checkbox"></th><th style="width:150px">采购订单编码</th><th style="width:170px">采购订单类型名称</th><th style="width:90px">订单状态</th><th style="width:100px">订单确认状态</th><th style="width:100px">订单审批状态</th><th style="width:100px">订单发货状态</th><th style="width:100px">订单收货状态</th><th style="width:120px">ERP采购订单号</th><th style="width:150px">同步ERP错误信息</th><th style="width:90px">ERP同步状态</th><th style="width:120px">TI订单编码</th><th style="width:100px">公司编码</th><th style="width:160px">公司名称</th><th style="width:120px">供应商编号</th><th style="width:180px">供应商名称</th><th style="width:100px">操作</th></tr></thead>
                <tbody>
                  <tr v-for="row in orderListRows" :key="row.orderNo"><td><input type="checkbox"></td><td><span class="po-link" @click="navigate(routes.buyerDetail)">{{ row.orderNo }}</span></td><td>{{ row.typeName }}</td><td>{{ row.status }}</td><td>{{ row.confirmStatus }}</td><td>{{ row.approveStatus }}</td><td>{{ row.sendStatus }}</td><td>{{ row.receiveStatus }}</td><td>{{ row.erpNo }}</td><td>{{ row.syncInfo }}</td><td>{{ row.erpStatus }}</td><td>{{ row.tiNo }}</td><td>{{ row.companyCode }}</td><td>{{ row.companyName }}</td><td>{{ row.supplierCode }}</td><td>{{ row.supplierName }}</td><td><span class="po-link" @click="navigate(routes.buyerDetail)">编辑</span> <span class="po-line-red">删除</span></td></tr>
                </tbody>
              </table>
            </div>
            <div class="po-footer"><span>共38条，已选择 0 条</span><span>50条/页　1</span></div>
          </section>
        </template>

        <template v-else-if="pageKind==='buyerChangeList'">
          <section class="po-card">
            <div class="po-panel-title">采购订单发货</div>
            <div class="po-toolbar">
              <div></div>
              <div class="po-toolbar-right"><button class="po-btn primary" @click="navigate(routes.buyerChangeCreate)">＋ 新增</button><button class="po-btn danger">删除</button><button class="po-btn">同步</button><button class="po-btn">审批通过</button><button class="po-btn">审批拒绝</button><button class="po-btn primary">确认</button></div>
            </div>
            <div class="po-query"><div class="po-form-grid"><div class="po-field"><label>采购订单编号：</label><el-input placeholder="请输入"></el-input></div><div class="po-field"><label>ERP采购订单：</label><el-input placeholder="请输入"></el-input></div></div></div>
            <div class="po-tabs"><span v-for="tab in ['变更中','已完成变更','取消变更','全部','超24H未确认']" :key="tab" class="po-status-tab" :class="{active:activeChangeTab===tab}" @click="activeChangeTab=tab">{{ tab }}</span></div>
            <div class="po-table-wrap">
              <table class="po-table compact">
                <thead><tr><th style="width:54px"><input type="checkbox"></th><th style="width:150px">变更单号</th><th style="width:150px">采购订单编号</th><th>变更单状态</th><th>审批状态</th><th>ERP采购订单号</th><th>公司编码</th><th>公司名称</th><th>采购组织编码</th><th>采购组织名称</th><th>采购组编码</th><th>操作</th></tr></thead>
                <tbody><tr v-for="row in changeListRows" :key="row.changeNo"><td><input type="checkbox"></td><td><span class="po-link" @click="navigate(routes.buyerChangeDetail)">{{ row.changeNo }}</span></td><td><span class="po-link" @click="navigate(routes.buyerChangeDetail)">{{ row.orderNo }}</span></td><td>{{ row.changeStatus }}</td><td>{{ row.approveStatus }}</td><td>{{ row.erpNo }}</td><td>{{ row.companyCode }}</td><td>{{ row.companyName }}</td><td>{{ row.purchaseOrgCode }}</td><td>{{ row.purchaseOrgName }}</td><td>{{ row.purchaseGroup }}</td><td><span class="po-link" @click="navigate(routes.buyerChangeDetail)">编辑</span> <span class="po-line-red">删除</span></td></tr></tbody>
              </table>
            </div>
            <div class="po-footer"><span>共2条，已选择 0 条</span><span>50条/页　1</span></div>
          </section>
        </template>

        <template v-else-if="pageKind==='supplierConfirmList'">
          <section class="po-card">
            <div class="po-tabs" style="margin-top:0"><span class="po-status-tab active">整单信息</span><span class="po-status-tab">明细信息</span></div>
            <div class="po-panel-title">采购订单查询确认</div>
            <div class="po-toolbar"><div></div><div class="po-toolbar-right"><button class="po-btn">打印</button><button class="po-btn">导出</button></div></div>
            <div class="po-query"><div class="po-form-grid"><div class="po-field"><label>公司名称：</label><el-input placeholder="请选择"></el-input></div><div class="po-field"><label>创建人：</label><el-input placeholder="请输入"></el-input></div><div class="po-field"><label>采购订单编码：</label><el-input placeholder="请输入"></el-input></div><div class="po-field"><label>erp采购订单号：</label><el-input placeholder="请输入"></el-input></div></div></div>
            <div class="po-tabs"><span class="po-status-tab active">待确认</span><span class="po-status-tab">已确认</span></div>
            <div class="po-table-wrap">
              <table class="po-table compact">
                <thead><tr><th style="width:54px"><input type="checkbox"></th><th>采购订单编码</th><th>erp采购订单号</th><th>工厂名称</th><th>创建人</th><th>创建时间</th><th>备注</th><th>附件</th><th>订单状态</th><th>订单确认状态</th><th>公司名称</th><th>采购组织名称</th><th>采购组名称</th><th>操作</th></tr></thead>
                <tbody><tr v-for="row in supplierOrderRows" :key="row.orderNo"><td><input type="checkbox"></td><td><span class="po-link" @click="navigate(routes.supplierConfirm)">{{ row.orderNo }}</span></td><td>{{ row.erpNo }}</td><td>{{ row.factory }}</td><td>{{ row.creator }}</td><td>{{ row.createdAt }}</td><td>{{ row.remark }}</td><td>{{ row.attach }}</td><td>{{ row.orderStatus }}</td><td>{{ row.confirmStatus }}</td><td>{{ row.companyName }}</td><td>{{ row.purchaseOrgName }}</td><td>{{ row.purchaseGroup }}</td><td><span class="po-link" @click="navigate(routes.supplierConfirm)">确认</span></td></tr></tbody>
              </table>
            </div>
            <div class="po-footer"><span>共82条，已选择 0 条</span><span>50条/页　1</span></div>
          </section>
        </template>

        <template v-else-if="pageKind==='supplierChangeConfirmList'">
          <section class="po-card">
            <div class="po-panel-title">采购订单变更供应商查询</div>
            <div class="po-query"><div class="po-form-grid"><div class="po-field"><label>创建时间：</label><el-input placeholder="请输入"></el-input></div><div class="po-field"><label>创建人：</label><el-input placeholder="请输入"></el-input></div><div class="po-field"><label>变更单号：</label><el-input placeholder="请输入"></el-input></div><div class="po-field"><label>采购订单编号：</label><el-input placeholder="请输入"></el-input></div><div class="po-field"><label>变更单状态：</label><el-input placeholder="请选择"></el-input></div><div class="po-field"><label>供应商名称：</label><el-input placeholder="请输入"></el-input></div></div></div>
            <div class="po-tabs"><span class="po-status-tab active">变更中</span><span class="po-status-tab">已完成变更</span><span class="po-status-tab">取消变更</span><span class="po-status-tab">全部</span><span class="po-status-tab">超24H未确认</span></div>
            <div class="po-table-wrap">
              <table class="po-table compact">
                <thead><tr><th style="width:54px"><input type="checkbox"></th><th>变更单号</th><th>采购订单编号</th><th>是否已读</th><th>变更单状态</th><th>公司名称</th><th>创建人</th><th>创建时间</th><th>是否同步erp</th><th>同步时间</th><th>erp采购订单号</th><th>采购组织名称</th><th>供应商名称</th><th>操作</th></tr></thead>
                <tbody><tr v-for="row in supplierChangeRows" :key="row.changeNo"><td><input type="checkbox"></td><td><span class="po-link" @click="navigate(routes.supplierChangeConfirm)">{{ row.changeNo }}</span></td><td><span class="po-link" @click="navigate(routes.supplierChangeConfirm)">{{ row.orderNo }}</span></td><td>{{ row.read }}</td><td>{{ row.changeStatus }}</td><td>{{ row.companyName }}</td><td>{{ row.creator }}</td><td>{{ row.createdAt }}</td><td>{{ row.sync }}</td><td>{{ row.syncAt }}</td><td>{{ row.erpNo }}</td><td>{{ row.purchaseOrgName }}</td><td>{{ row.supplierName }}</td><td><span class="po-link" @click="navigate(routes.supplierChangeConfirm)">确认</span></td></tr></tbody>
              </table>
            </div>
            <div class="po-footer"><span>共7条，已选择 0 条</span><span>50条/页　1</span></div>
          </section>
        </template>

        <template v-else>
          <div class="po-titlebar">
            <div class="left"><i class="ri-arrow-left-circle-line"></i><span>{{ titleText }}</span></div>
            <div class="po-actions">
              <template v-if="pageKind==='buyerCreate'||pageKind==='buyerChangeCreate'">
                <button class="po-btn primary" @click="save"><i class="ri-save-line"></i> 保存</button>
                <button class="po-btn" @click="cancel">取消</button>
              </template>
              <template v-else-if="pageKind==='supplierConfirm'||pageKind==='supplierChangeConfirm'">
                <button class="po-btn primary" @click="confirmSupplier">确认</button>
                <button class="po-btn" @click="cancel">取消</button>
              </template>
              <template v-else>
                <button class="po-btn" @click="print">打印</button>
                <button class="po-btn" @click="cancel">取消</button>
              </template>
            </div>
          </div>

          <section class="po-card">
            <div class="po-section-title">{{ sectionTitle }}</div>
            <div class="po-form-grid">
              <div class="po-field"><label>采购订单编码：</label><el-input :model-value="currentHeader.orderNo" :disabled="!isMaintenance"></el-input></div>
              <div class="po-field"><label>ERP采购订单号：</label><el-input :model-value="currentHeader.erpOrderNo" disabled></el-input></div>
              <div class="po-field"><label>订单类型：</label><el-input :model-value="currentHeader.orderType" :disabled="!isMaintenance"></el-input></div>
              <div class="po-field"><label><span v-if="!isSupplier" class="po-line-red">*</span> 公司名称：</label><el-input :model-value="currentHeader.companyName" disabled></el-input></div>
              <div class="po-field"><label>ERP公司编码：</label><el-input :model-value="currentHeader.erpCompanyCode" disabled></el-input></div>
              <div class="po-field"><label>采购组织名称：</label><el-input :model-value="currentHeader.purchaseOrg" :disabled="!isMaintenance"></el-input></div>
              <div class="po-field"><label>ERP采购组织编码：</label><el-input :model-value="currentHeader.erpPurchaseOrg" disabled></el-input></div>
              <div class="po-field"><label><span v-if="!isSupplier" class="po-line-red">*</span> 采购组名称：</label><el-input :model-value="currentHeader.purchaseGroup" :disabled="!isMaintenance"></el-input></div>
              <div class="po-field"><label><span v-if="!isSupplier" class="po-line-red">*</span> 供应商编号：</label><el-input :model-value="currentHeader.supplierCode" :disabled="!isMaintenance"></el-input></div>
              <div class="po-field"><label>供应商名称：</label><el-input :model-value="currentHeader.supplierName" disabled></el-input></div>
              <div class="po-field"><label>合同编号：</label><el-input :model-value="currentHeader.contractNo" :disabled="!isMaintenance"></el-input></div>
              <div class="po-field"><label>付款条件：</label><el-input :model-value="currentHeader.paymentTerms" :disabled="!isMaintenance"></el-input></div>
              <div class="po-field" v-if="showPayableType"><label><span class="po-line-red">*</span> 应付款类型：</label><el-select v-if="canEditPayableType" v-model="currentHeader.payableType" placeholder="请选择"><el-option v-for="item in payableTypeOptions" :key="item" :label="item" :value="item"></el-option></el-select><el-input v-else :model-value="currentHeader.payableType" disabled></el-input></div>
              <div class="po-field"><label>币种：</label><el-input :model-value="currentHeader.currency" :disabled="!isMaintenance"></el-input></div>
              <div class="po-field"><label>审批方式：</label><el-input :model-value="currentHeader.approvalType" disabled></el-input></div>
              <div class="po-field"><label>创建人：</label><el-input :model-value="currentHeader.creator" disabled></el-input></div>
              <div class="po-field"><label>创建时间：</label><el-input :model-value="currentHeader.createdAt" disabled></el-input></div>
              <div class="po-field"><label>凭证日期：</label><el-input :model-value="currentHeader.voucherDate" :disabled="!isMaintenance"></el-input></div>
              <div class="po-field"><label>采购员姓名：</label><el-autocomplete v-if="isMaintenance" v-model="currentHeader.buyerName" :fetch-suggestions="buyerQuery" clearable @select="selectBuyer" @input="buyerInput"></el-autocomplete><el-input v-else :model-value="currentHeader.buyerName" disabled></el-input></div>
              <div class="po-field" v-if="!isSupplier"><label>采购员ID：</label><el-input v-model="currentHeader.buyerId" disabled></el-input></div>
              <div class="po-field wide"><label>备注：</label><textarea v-model="currentHeader.remark" :disabled="!isMaintenance"></textarea></div>
              <div class="po-field wide"><label>附件：</label><span>●</span></div>
            </div>
          </section>

          <section class="po-card">
            <div class="po-table-title">{{ rowSectionTitle }}</div>
            <div v-if="isMaintenance" style="display:flex;gap:8px;margin-bottom:10px">
              <button class="po-btn primary">＋ 批量新增物料</button>
              <button class="po-btn primary">＋ 新增物料</button>
              <button class="po-btn danger">删除物料</button>
              <button class="po-btn">获取SAP信息记录</button>
              <button class="po-btn">导入</button>
            </div>
            <div class="po-table-wrap">
              <table class="po-table" :class="{ 'supplier-detail': isSupplier }">
                <thead>
                  <tr>
                    <th style="width:54px">行号</th><th style="width:70px">行状态</th><th style="width:120px">物料编码</th><th style="width:180px">物料描述</th><th style="width:100px">物料基本单位</th><th style="width:90px"><span class="po-line-red" v-if="isMaintenance">*</span>采购数量</th><th style="width:90px">不含税净价</th><th style="width:70px">货币</th><th style="width:60px">每</th><th style="width:100px">生产厂商</th><th style="width:120px">工厂</th><th style="width:140px">要求到货时间</th><th style="width:100px">库存地点</th><th style="width:130px">SAP科目分配类别</th><th style="width:120px">SAP项目类型</th><th style="width:80px">是否退货</th><th style="width:80px">是否免费</th><th style="width:90px">效率档位</th><th style="width:90px">理论功率</th><th style="width:130px">效率档位单价/W</th><th style="width:90px">组件详情</th><th v-if="!isSupplier" style="width:130px">成本中心</th><th v-if="!isSupplier" style="width:130px">内部订单</th><th v-if="!isSupplier" style="width:130px">物料组</th><th v-if="!isSupplier" style="width:150px">销售和分销凭证号</th><th v-if="!isSupplier" style="width:120px">销售单据项目</th><th v-if="!isSupplier" style="width:120px">固定资产号</th><th style="width:160px">包装单位（称重计量单位）</th><th style="width:150px">包装数量（称重重量）</th><th v-if="!isSupplier" style="width:120px">保税手册号</th><th style="width:80px">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in currentRows" :key="row.lineNo">
                    <td>{{ row.lineNo }}</td><td>{{ row.status }}</td><td>{{ row.materialCode }}</td><td :title="row.materialDesc">{{ row.materialDesc }}</td><td>{{ row.baseUnit }}</td><td>{{ row.quantity }}</td><td>{{ row.price }}</td><td>{{ row.currency }}</td><td>{{ row.per }}</td><td>{{ row.manufacturer }}</td><td>{{ row.factory }}</td><td>{{ row.requiredDate }}</td><td>{{ row.location }}</td><td>{{ row.sapAccountCategory }}</td><td>{{ row.sapProjectType }}</td><td>{{ row.returnFlag }}</td><td>{{ row.freeFlag }}</td><td>{{ row.efficiencyLevel }}</td><td>{{ row.theoreticalPower }}</td><td>{{ row.efficiencyPrice }}</td><td>{{ row.componentDetail }}</td>
                    <td v-if="!isSupplier"><select v-if="isMaintenance" v-model="row.costCenter" class="po-cell-select"><option v-for="item in costCenterOptions" :key="item" :value="item">{{ item }}</option></select><span v-else>{{ row.costCenter }}</span></td>
                    <td v-if="!isSupplier"><input v-if="isMaintenance" v-model="row.internalOrder" class="po-cell-input"><span v-else>{{ row.internalOrder }}</span></td>
                    <td v-if="!isSupplier"><span class="po-readonly">{{ row.materialGroup }}</span></td>
                    <td v-if="!isSupplier"><span class="po-readonly">{{ row.sdVoucher }}</span></td>
                    <td v-if="!isSupplier"><span class="po-readonly">{{ row.sdItem }}</span></td>
                    <td v-if="!isSupplier"><span class="po-readonly">{{ row.fixedAssetNo }}</span></td>
                    <td><input v-if="isMaintenance" v-model="row.packageUnit" class="po-cell-input"><span v-else>{{ row.packageUnit }}</span></td>
                    <td><input v-if="isMaintenance" v-model="row.packageQty" class="po-cell-input"><span v-else>{{ row.packageQty }}</span></td>
                    <td v-if="!isSupplier"><input v-if="isMaintenance" v-model="row.bondedManualNo" class="po-cell-input"><span v-else>{{ row.bondedManualNo }}</span></td>
                    <td><span class="po-link" v-if="isMaintenance">删除</span><span v-else>-</span></td>
                  </tr>
                  <tr v-if="!currentRows.length"><td :colspan="orderDetailColspan" class="po-empty">暂无数据</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="po-card" v-if="pageKind==='buyerDetail'||pageKind==='buyerChangeDetail'||pageKind==='supplierChangeConfirm'">
            <div class="po-table-title">订单变更记录</div>
            <div class="po-table-wrap">
              <table class="po-table" style="min-width:1800px">
                <thead><tr><th>采购订单行号</th><th>变更过程</th><th>行状态</th><th>物料编码</th><th>物料描述</th><th>采购数量</th><th>不含税净价</th><th>货币</th><th>工厂</th><th>要求到货时间</th><th>变更原因</th><th>变更人</th><th>变更时间</th></tr></thead>
                <tbody><tr><td>1</td><td>变更后</td><td class="po-line-red">正常</td><td>1070000207</td><td>156.75多晶厚度200±20um</td><td class="po-line-red">18</td><td>79.93</td><td>CNY</td><td>海宁新能源工厂</td><td class="po-line-red">2026-06-12 17:00:00</td><td>333</td><td>李思锦</td><td>2026-06-23 10:55:32</td></tr><tr><td>1</td><td>变更前</td><td>正常</td><td>1070000207</td><td>156.75多晶厚度200±20um</td><td>20</td><td>79.93</td><td>CNY</td><td>海宁新能源工厂</td><td>2026-06-12 17:00:00</td><td></td><td>李思锦</td><td>2026-06-23 10:55:32</td></tr></tbody>
              </table>
            </div>
          </section>
        </template>
      </div>
    `
  });

  Object.entries(routes).forEach(([key, path]) => {
    const routeName = {
      buyerOrderList: '订单工作台',
      buyerCreate: '采购订单下达-新增',
      buyerDetail: '采购订单下达-详情',
      buyerChangeList: '订单变更单列表',
      buyerChangeCreate: '采购订单变更新增',
      buyerChangeDetail: '采购订单变更详情',
      supplierConfirmList: '订单查询确认列表',
      supplierConfirm: '订单查询确认详情',
      supplierChangeConfirmList: '订单变更单查询确认列表',
      supplierChangeConfirm: '采购订单查询确认'
    }[key];

    const parentLabel = '采购订单协同';
    const menuKey = {
      buyerCreate: 'buyerPurchaseOrderCreate',
      buyerDetail: 'buyerPurchaseOrderDetail',
      buyerChangeCreate: 'buyerChangeList',
      buyerChangeDetail: 'buyerPurchaseChangeDetail',
      supplierConfirm: 'supplierConfirmList',
      supplierChangeConfirm: 'supplierChangeConfirmList'
    }[key] || key;

    ChintPrototypeShell.registerRoute({
      path,
      name: routeName,
      menuKey,
      component: componentName,
      breadcrumbs: [parentLabel, routeName],
      tabInfo: '采购订单相关页面增量新增采购员信息和订单行扩展字段。',
      guideSteps: [
        { target: '.po-titlebar,.po-panel-title', title: '页面操作区', description: '订单页面统一使用旧版采购云菜单壳子，仅右侧内容区切换业务页面。' },
        { target: '.po-form-grid', title: '订单头信息', description: '在订单头信息中查看或维护采购员姓名，并自动带出采购员ID。' },
        { target: '.po-table-wrap', title: '订单明细', description: '在原订单明细表格基础上追加成本中心、内部订单、物料组、销售凭证、固定资产和包装称重等字段。' }
      ],
      noteSections: [
        { title: '业务目标', content: '在采购订单下单、变更和供应商确认页面补充采购员与订单行扩展字段，便于后续订单履约和财务核对。' },
        { title: '权限边界', content: '采购端新增和变更新增页面可维护部分字段；采购端详情和供应商确认页面只读展示新增字段。' }
      ]
    });
  });
})(window);

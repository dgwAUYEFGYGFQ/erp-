(function (window) {
  const componentName = 'ArrivalPlanListPage';

  const FALLBACK_ROW = {
    id: 'AP-20260626-001',
    requiredDate: '2026-06-26',
    planQty: 888888,
    supplierCode: '0010001404',
    supplierName: '浙江正泰电器股份有限公司',
    materialCode: 'M100218768',
    materialDesc: '小型断路器 NXB-63 2P C32',
    categoryCode: '010101',
    categoryName: '低压配电电器',
    factoryCode: '1001',
    factoryName: '正泰低压电器温州生产基地',
    workshop: '断路器一车间',
    batchQty: 2400,
    safetyStock: 3600,
    leadTime: '7天',
    minPackQty: 12,
    minOrderQty: 120,
    type: '生产计划',
    totalQty: 892488,
    mergeFlag: '是',
    version: 'V3',
    status: '有效'
  };

  function emptyFilters() {
    return {
      supplierCode: '',
      supplierName: '',
      materialCode: '',
      materialDesc: '',
      categoryCode: '',
      categoryName: '',
      factoryCode: '',
      factoryName: '',
      workshop: '',
      type: '',
      mergeFlag: '',
      version: '',
      status: ''
    };
  }

  function includesText(value, keyword) {
    return !keyword || String(value || '').toLowerCase().includes(String(keyword).trim().toLowerCase());
  }

  function shiftDate(dateText, days) {
    const source = new Date(String(dateText || '2026-06-26') + 'T00:00:00');
    source.setDate(source.getDate() + days);
    return source.toISOString().slice(0, 10);
  }

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      const pageData = ChintPrototypeShell.getMockData('arrivalPlanList', {});
      const sourceRows = Array.isArray(pageData.rows) && pageData.rows.length ? pageData.rows : [FALLBACK_ROW];
      const rows = sourceRows.map((row) => Object.assign({}, row, {
        status: ['已删除', '删除'].includes(row.status) ? '已删除' : '有效'
      }));
      return {
        rows: rows,
        historyMap: pageData.history || {},
        dateRange: [],
        appliedDateRange: [],
        filters: emptyFilters(),
        appliedFilters: emptyFilters(),
        expandedFilters: false,
        page: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        historyDialogOpen: false,
        currentRow: null,
        historyRows: [],
        lastReceiveTime: '2026-08-10 09:18:06',
        typeOptions: ['生产计划', '补库计划', '订单计划', '项目计划'],
        mergeOptions: ['是', '否'],
        versionOptions: ['V1', 'V2', 'V3', 'V4', 'V5'],
        statusOptions: ['有效', '已删除']
      };
    },
    computed: {
      filteredRows() {
        const f = this.appliedFilters;
        const range = this.appliedDateRange || [];
        return this.rows.filter((row) => {
          if (range.length === 2 && (row.requiredDate < range[0] || row.requiredDate > range[1])) return false;
          if (!includesText(row.supplierCode, f.supplierCode)) return false;
          if (!includesText(row.supplierName, f.supplierName)) return false;
          if (!includesText(row.materialCode, f.materialCode)) return false;
          if (!includesText(row.materialDesc, f.materialDesc)) return false;
          if (!includesText(row.categoryCode, f.categoryCode)) return false;
          if (!includesText(row.categoryName, f.categoryName)) return false;
          if (!includesText(row.factoryCode, f.factoryCode)) return false;
          if (!includesText(row.factoryName, f.factoryName)) return false;
          if (!includesText(row.workshop, f.workshop)) return false;
          if (f.type && row.type !== f.type) return false;
          if (f.mergeFlag && row.mergeFlag !== f.mergeFlag) return false;
          if (f.version && row.version !== f.version) return false;
          if (f.status && row.status !== f.status) return false;
          return true;
        });
      },
      pagedRows() {
        const start = (this.page - 1) * this.pageSize;
        return this.filteredRows.slice(start, start + this.pageSize);
      }
    },
    methods: {
      queryRows() {
        this.appliedDateRange = Array.isArray(this.dateRange) ? this.dateRange.slice() : [];
        this.appliedFilters = Object.assign({}, this.filters);
        this.page = 1;
        ElementPlus.ElMessage.success('查询完成，共找到 ' + this.filteredRows.length + ' 条到货计划');
      },
      resetFilters() {
        this.dateRange = [];
        this.appliedDateRange = [];
        this.filters = emptyFilters();
        this.appliedFilters = emptyFilters();
        this.page = 1;
        ElementPlus.ElMessage.success('查询条件已重置');
      },
      toggleExpandedFilters() {
        this.expandedFilters = !this.expandedFilters;
      },
      handlePageChange(page) {
        this.page = page;
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
      },
      refreshRows() {
        this.lastReceiveTime = '2026-08-10 ' + new Date().toTimeString().slice(0, 8);
        ElementPlus.ElMessage.success('已刷新采购云接收数据');
      },
      showFilterTip() {
        this.expandedFilters = true;
        ElementPlus.ElMessage.info('已展开全部查询条件');
      },
      showColumnTip() {
        ElementPlus.ElMessage.info('当前已按采购云标准字段顺序展示全部列');
      },
      statusTagType(status) {
        if (status === '有效') return 'success';
        if (status === '已删除') return 'danger';
        return 'info';
      },
      historyStatusTagType(status) {
        if (status === '创建') return 'primary';
        if (status === '更新') return 'warning';
        if (status === '删除') return 'danger';
        return 'info';
      },
      formatNumber(value) {
        return Number(value || 0).toLocaleString('zh-CN');
      },
      buildFallbackHistory(row) {
        const currentVersion = row.version || 'V3';
        const versions = ['V1', 'V2', currentVersion];
        const latestAction = row.status === '已删除' ? '删除' : (currentVersion === 'V1' ? '创建' : '更新');
        const currentDate = row.requiredDate || '2026-06-26';
        const baseQty = Number(row.planQty || 0);
        const baseSafety = Number(row.safetyStock || 0);
        const makeRow = (version, offset, rate, status, time) => Object.assign({}, row, {
          requiredDate: shiftDate(currentDate, offset),
          planQty: Math.max(1, Math.round(baseQty * rate)),
          safetyStock: Math.max(0, Math.round(baseSafety * rate)),
          totalQty: Math.max(1, Math.round((Number(row.totalQty || baseQty) * rate))),
          mergeFlag: offset < -1 ? '否' : row.mergeFlag,
          version: version,
          updateTime: shiftDate(currentDate, offset) + ' ' + time,
          status: status
        });
        return [
          makeRow(versions[0], -2, 0.86, '创建', '09:15:22'),
          makeRow(versions[1], -1, 0.94, '更新', '11:08:36'),
          makeRow(versions[2], 0, 1, latestAction, '14:32:18')
        ];
      },
      openHistory(row) {
        this.currentRow = row;
        const source = this.historyMap && Array.isArray(this.historyMap[row.id])
          ? this.historyMap[row.id]
          : this.buildFallbackHistory(row);
        this.historyRows = source
          .map((item) => Object.assign({}, item))
          .sort((left, right) => String(right.updateTime || '').localeCompare(String(left.updateTime || '')));
        this.historyDialogOpen = true;
      }
    },
    template: `
      <div class="flow-progress-layout arrival-plan-page">
        <section class="panel control-panel flow-panel-shell arrival-control-panel">
          <div class="panel-body">
            <div class="arrival-card-title"><span class="arrival-card-title-bar"></span><span>到货计划列表</span></div>
            <div class="filter-bar arrival-filter-bar" data-tour="arrival-plan-filter">
              <div class="arrival-filter-row">
                <el-date-picker v-model="dateRange" type="daterange" size="small" value-format="YYYY-MM-DD" start-placeholder="要求到货日期起" end-placeholder="要求到货日期止" range-separator="至" :teleported="false" style="width:250px"></el-date-picker>
                <el-input v-model="filters.supplierCode" size="small" clearable placeholder="供应商编码" style="width:138px"></el-input>
                <el-input v-model="filters.supplierName" size="small" clearable placeholder="供应商名称" style="width:178px"></el-input>
                <el-input v-model="filters.materialCode" size="small" clearable placeholder="物料编码" style="width:145px"></el-input>
                <el-input v-model="filters.materialDesc" size="small" clearable placeholder="物料描述" style="width:180px"></el-input>
                <div class="arrival-query-actions">
                  <el-button type="primary" size="small" @click="queryRows"><i class="ri-search-line"></i><span>查询</span></el-button>
                  <el-button size="small" @click="resetFilters">重置</el-button>
                  <el-tooltip :content="expandedFilters ? '收起筛选条件' : '展开筛选条件'" placement="top">
                    <el-button size="small" circle @click="toggleExpandedFilters"><i :class="expandedFilters ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"></i></el-button>
                  </el-tooltip>
                </div>
              </div>
              <div v-show="expandedFilters" class="arrival-filter-row arrival-filter-row-more">
                <el-input v-model="filters.categoryCode" size="small" clearable placeholder="品类编码" style="width:138px"></el-input>
                <el-input v-model="filters.categoryName" size="small" clearable placeholder="品类名称" style="width:180px"></el-input>
                <el-input v-model="filters.factoryCode" size="small" clearable placeholder="工厂编码" style="width:138px"></el-input>
                <el-input v-model="filters.factoryName" size="small" clearable placeholder="工厂名称" style="width:180px"></el-input>
                <el-input v-model="filters.workshop" size="small" clearable placeholder="车间" style="width:150px"></el-input>
                <el-select v-model="filters.type" size="small" clearable placeholder="类型" :teleported="false" style="width:135px">
                  <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-select v-model="filters.mergeFlag" size="small" clearable placeholder="合单标识" :teleported="false" style="width:125px">
                  <el-option v-for="item in mergeOptions" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-select v-model="filters.version" size="small" clearable placeholder="版本号" :teleported="false" style="width:115px">
                  <el-option v-for="item in versionOptions" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-select v-model="filters.status" size="small" clearable placeholder="状态" :teleported="false" style="width:135px">
                  <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </div>
            <div class="table-toolbar flow-action-bar arrival-toolbar" data-tour="arrival-plan-toolbar">
              <div class="toolbar-left arrival-readonly-tip"><i class="ri-information-line"></i><span>SAP 为发送方，采购云仅接收展示，当前页面只支持查询与版本追溯</span></div>
              <div class="toolbar-right arrival-toolbar-right">
                <span class="arrival-receive-time"><i class="ri-time-line"></i> 最近接收：{{ lastReceiveTime }}</span>
                <el-tooltip content="展开全部筛选" placement="top"><el-button text circle size="small" @click="showFilterTip"><i class="ri-filter-3-line"></i></el-button></el-tooltip>
                <el-tooltip content="列设置" placement="top"><el-button text circle size="small" @click="showColumnTip"><i class="ri-settings-3-line"></i></el-button></el-tooltip>
                <el-tooltip content="刷新接收数据" placement="top"><el-button text circle size="small" @click="refreshRows"><i class="ri-refresh-line"></i></el-button></el-tooltip>
              </div>
            </div>
          </div>
        </section>

        <section class="panel table-panel flow-panel-shell arrival-table-panel">
          <div class="panel-body">
            <div class="flow-grid-table-wrap arrival-grid-wrap">
              <el-table class="flow-grid-table arrival-main-table" :data="pagedRows" row-key="id" height="100%" size="default" stripe border table-layout="fixed" style="width:100%" data-tour="arrival-plan-table">
                <el-table-column label="序号" type="index" width="64" fixed="left" align="center" :index="(index) => (page - 1) * pageSize + index + 1"></el-table-column>
                <el-table-column prop="requiredDate" label="要求到货日期" width="126" align="center"></el-table-column>
                <el-table-column prop="planQty" label="计划数量" width="112" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.planQty) }}</template></el-table-column>
                <el-table-column prop="supplierCode" label="供应商编码" width="132"></el-table-column>
                <el-table-column prop="supplierName" label="供应商名称" width="210" show-overflow-tooltip></el-table-column>
                <el-table-column prop="materialCode" label="物料编码" width="145"></el-table-column>
                <el-table-column prop="materialDesc" label="物料描述" width="230" show-overflow-tooltip></el-table-column>
                <el-table-column prop="categoryCode" label="品类编码" width="112"></el-table-column>
                <el-table-column prop="categoryName" label="品类名称" width="170" show-overflow-tooltip></el-table-column>
                <el-table-column prop="factoryCode" label="工厂编码" width="105"></el-table-column>
                <el-table-column prop="factoryName" label="工厂名称" width="205" show-overflow-tooltip></el-table-column>
                <el-table-column prop="workshop" label="车间" width="142" show-overflow-tooltip></el-table-column>
                <el-table-column prop="batchQty" label="批量" width="92" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.batchQty) }}</template></el-table-column>
                <el-table-column prop="safetyStock" label="安全库存" width="105" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.safetyStock) }}</template></el-table-column>
                <el-table-column prop="leadTime" label="提前期" width="88" align="center"></el-table-column>
                <el-table-column prop="minPackQty" label="最小包装量" width="112" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.minPackQty) }}</template></el-table-column>
                <el-table-column prop="minOrderQty" label="最小起订量" width="112" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.minOrderQty) }}</template></el-table-column>
                <el-table-column prop="type" label="类型" width="105"></el-table-column>
                <el-table-column prop="totalQty" label="总数量" width="110" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.totalQty) }}</template></el-table-column>
                <el-table-column prop="mergeFlag" label="合单标识" width="94" align="center"><template v-slot:default="scope"><el-tag size="small" effect="plain" :type="scope.row.mergeFlag === '是' ? 'primary' : 'info'">{{ scope.row.mergeFlag }}</el-tag></template></el-table-column>
                <el-table-column prop="version" label="版本号" width="82" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" width="108" align="center"><template v-slot:default="scope"><el-tag size="small" :type="statusTagType(scope.row.status)">{{ scope.row.status }}</el-tag></template></el-table-column>
                <el-table-column label="操作" width="132" fixed="right" align="center" header-align="center">
                  <template v-slot:default="scope"><el-button link type="primary" size="small" @click.stop="openHistory(scope.row)"><i class="ri-history-line"></i><span>查看历史记录</span></el-button></template>
                </el-table-column>
              </el-table>
            </div>
            <div class="table-footer">
              <div class="arrival-total">共 {{ filteredRows.length }} 条</div>
              <el-pagination small background layout="sizes, prev, pager, next" :current-page="page" :page-size="pageSize" :page-sizes="pageSizes" :total="filteredRows.length" @update:current-page="handlePageChange" @size-change="handlePageSizeChange"></el-pagination>
            </div>
          </div>
        </section>

        <el-dialog v-model="historyDialogOpen" title="历史记录" width="90%" align-center destroy-on-close class="arrival-history-dialog" data-tour="arrival-plan-history-dialog">
          <div class="arrival-history-table-wrap">
            <el-table :data="historyRows" row-key="version" max-height="520" size="small" stripe border table-layout="fixed" style="width:100%">
              <el-table-column prop="requiredDate" label="要求到货日期" width="126" align="center"></el-table-column>
              <el-table-column prop="planQty" label="计划数量" width="112" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.planQty) }}</template></el-table-column>
              <el-table-column prop="supplierCode" label="供应商编码" width="132"></el-table-column>
              <el-table-column prop="supplierName" label="供应商名称" width="210" show-overflow-tooltip></el-table-column>
              <el-table-column prop="materialCode" label="物料编码" width="145"></el-table-column>
              <el-table-column prop="materialDesc" label="物料描述" width="230" show-overflow-tooltip></el-table-column>
              <el-table-column prop="categoryCode" label="品类编码" width="112"></el-table-column>
              <el-table-column prop="categoryName" label="品类名称" width="170" show-overflow-tooltip></el-table-column>
              <el-table-column prop="factoryCode" label="工厂编码" width="105"></el-table-column>
              <el-table-column prop="factoryName" label="工厂名称" width="205" show-overflow-tooltip></el-table-column>
              <el-table-column prop="workshop" label="车间" width="142" show-overflow-tooltip></el-table-column>
              <el-table-column prop="batchQty" label="批量" width="92" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.batchQty) }}</template></el-table-column>
              <el-table-column prop="safetyStock" label="安全库存" width="105" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.safetyStock) }}</template></el-table-column>
              <el-table-column prop="leadTime" label="提前期" width="88" align="center"></el-table-column>
              <el-table-column prop="minPackQty" label="最小包装量" width="112" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.minPackQty) }}</template></el-table-column>
              <el-table-column prop="minOrderQty" label="最小起订量" width="112" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.minOrderQty) }}</template></el-table-column>
              <el-table-column prop="type" label="类型" width="105"></el-table-column>
              <el-table-column prop="totalQty" label="总数量" width="110" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.totalQty) }}</template></el-table-column>
              <el-table-column prop="mergeFlag" label="合单标识" width="94" align="center"></el-table-column>
              <el-table-column prop="version" label="版本号" width="82" align="center"><template v-slot:default="scope"><strong>{{ scope.row.version }}</strong></template></el-table-column>
              <el-table-column prop="updateTime" label="更新时间" width="170"></el-table-column>
              <el-table-column prop="status" label="状态" width="110" fixed="right" align="center"><template v-slot:default="scope"><el-tag size="small" :type="historyStatusTagType(scope.row.status)">{{ scope.row.status }}</el-tag></template></el-table-column>
            </el-table>
          </div>
          <template v-slot:footer><el-button size="small" @click="historyDialogOpen = false">关闭</el-button></template>
        </el-dialog>

        <style>
          .arrival-plan-page { gap: 0; }
          .arrival-plan-page .arrival-control-panel { flex: none; border-radius: 10px 10px 0 0; border-bottom: 0; box-shadow: 0 2px 8px rgba(31, 77, 151, .04); }
          .arrival-plan-page .arrival-control-panel > .panel-body { padding: 0 16px; }
          .arrival-card-title { display: flex; align-items: center; gap: 9px; min-height: 52px; color: #242a33; font-size: 16px; font-weight: 600; border-bottom: 1px solid var(--el-border-color-lighter); }
          .arrival-card-title-bar { width: 3px; height: 18px; border-radius: 2px; background: var(--el-color-primary); }
          .arrival-plan-page .arrival-filter-bar { display: block; padding: 0; }
          .arrival-filter-row { display: flex; align-items: center; gap: 10px; min-height: 32px; padding-top: 14px; }
          .arrival-filter-row-more { padding-top: 10px; }
          .arrival-query-actions { display: flex; align-items: center; margin-left: auto; }
          .arrival-query-actions .el-button + .el-button { margin-left: 8px; }
          .arrival-toolbar { min-height: 43px; margin-top: 12px; border-top: 1px solid var(--el-border-color-lighter); }
          .arrival-readonly-tip { display: flex; align-items: center; gap: 7px; color: var(--el-color-primary); font-size: 12px; }
          .arrival-readonly-tip i { font-size: 16px; }
          .arrival-toolbar-right { display: flex; align-items: center; gap: 4px; }
          .arrival-receive-time { margin-right: 6px; color: var(--el-text-color-secondary); font-size: 12px; }
          .arrival-receive-time i { margin-right: 4px; }
          .arrival-table-panel { border-radius: 0 0 10px 10px; overflow: hidden; border-top: 0; box-shadow: 0 4px 10px rgba(31, 77, 151, .06); }
          .arrival-table-panel > .panel-body { padding: 0; }
          .arrival-grid-wrap { min-height: 300px; }
          .arrival-main-table .el-table__header th { height: 46px; background: #f3f6fb !important; color: #303744; font-weight: 600; }
          .arrival-main-table .el-table__row td { height: 45px; }
          .arrival-main-table .el-button i { margin-right: 4px; }
          .arrival-plan-page .table-footer { padding: 11px 16px; background: #fff; border-top: 1px solid var(--el-border-color-lighter); }
          .arrival-total { color: var(--el-text-color-secondary); font-size: 12px; }
          .arrival-history-dialog { min-height: 520px; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; }
          .arrival-history-dialog .el-dialog__header { padding: 17px 20px 14px; margin-right: 0; border-bottom: 1px solid var(--el-border-color-lighter); }
          .arrival-history-dialog .el-dialog__title { color: #252b36; font-size: 17px; font-weight: 600; }
          .arrival-history-dialog .el-dialog__body { flex: 1; min-height: 0; padding: 14px 20px 10px; }
          .arrival-history-dialog .el-dialog__footer { padding: 12px 20px 16px; border-top: 1px solid var(--el-border-color-lighter); text-align: right; }
          .arrival-history-table-wrap { width: 100%; overflow: hidden; border-radius: 4px; }
          .arrival-history-dialog .el-table__header th { background: #f3f6fb !important; color: #303744; font-weight: 600; }
          @media (max-width: 1380px) {
            .arrival-filter-row { flex-wrap: wrap; }
            .arrival-query-actions { margin-left: 0; }
          }
        </style>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/plan/arrival-plan-list',
    name: '到货计划列表',
    menuKey: 'arrivalPlanList',
    component: componentName,
    breadcrumbs: ['计划管理', '到货计划列表'],
    tabInfo: '帮助采购计划与供应协同人员查询 SAP 接口发送、采购云接收的到货计划，并追溯同一业务记录的历史版本。',
    guideSteps: [
      { target: '[data-tour="arrival-plan-filter"]', title: '筛选接收计划', description: '按到货日期、供应商、物料、品类、工厂、车间、类型、合单标识、版本和当前数据状态组合查询 SAP 发送数据。' },
      { target: '[data-tour="arrival-plan-toolbar"]', title: '确认只读边界', description: '工具栏明确 SAP 负责发送、采购云仅接收展示，并提供筛选展开、列提示和接收数据刷新反馈。' },
      { target: '[data-tour="arrival-plan-table"]', title: '核对到货计划', description: '横向滚动核对计划数量、库存口径、提前期、起订约束、版本号和有效性状态，操作列始终固定在右侧。' },
      { target: '[data-tour="arrival-plan-history-dialog"]', title: '追溯历史版本', description: '按更新时间倒序查看版本号、更新时间及创建/更新/删除状态。' }
    ],
    noteSections: [
      {
        title: '业务目标与适用角色',
        content: '本页服务采购计划专员与供应协同人员，帮助其查询由 SAP 接口发送、采购云接收展示的到货计划，并追溯同一业务记录的历史版本。'
      },
      {
        title: '数据接收与处理范围',
        items: [
          'SAP 是数据发送方，通过接口发送到货日期、计划数量、供应商、物料、品类、工厂、车间与供应约束等结构化数据。',
          '采购云仅接收并展示包含品类编码、品类名称在内的数据，提供组合查询但不改变 SAP 计划内容，也不承担人工补录或修订职责。',
          'SAP 接口每次发送变更都会形成版本留痕，同一业务记录可在历史弹窗中按版本直接对比。'
        ]
      },
      {
        title: '版本流转',
        content: '到货计划由 SAP 接口发送后，采购云先完成接收校验再进入当前列表展示；同一业务主键再次发送时形成新版本，并保留旧版本供追溯。',
        diagram: {
          type: 'flow',
          caption: '到货计划从接口接收到版本留痕的只读链路。',
          nodes: [
            { id: 'receive', title: '接口接收', meta: '接收 SAP 发送计划', tone: 'info' },
            { id: 'validate', title: '数据校验', meta: '校验主键与字段口径', tone: 'warning' },
            { id: 'display', title: '列表展示', meta: '供计划与协同查询', tone: 'primary' },
            { id: 'history', title: '版本留痕', meta: '保留历次接收记录', tone: 'success' }
          ],
          edges: [
            { from: 'receive', to: 'validate', label: '接收' },
            { from: 'validate', to: 'display', label: '通过' },
            { from: 'display', to: 'history', label: '留痕' }
          ]
        }
      },
      {
        title: '上下游关系',
        content: '当前页面位于 SAP 与采购协同使用者之间，只负责接收展示、只读查询和历史追溯，不向 SAP 回写业务数据。',
        diagram: {
          type: 'relation',
          caption: 'SAP 接口向采购云单向发送数据，采购计划和供应协同角色读取接收结果。',
          center: { title: '到货计划列表', meta: '只读查询与版本追溯', tone: 'primary' },
          upstream: [{ title: 'SAP', meta: '接口发送到货计划', tone: 'info' }],
          downstream: [
            { title: '采购计划专员', meta: '查询与核对计划', tone: 'success' },
            { title: '供应协同人员', meta: '追溯版本变化', tone: 'success' }
          ]
        }
      },
      {
        title: '业务边界',
        items: [
          '本页不提供新增、编辑、删除、保存、提交、导入或导出等人工维护动作。',
          '品类编码与品类名称由 SAP 发送，采购云仅用于列表展示、查询筛选和历史追溯，不允许人工编辑。',
          '主列表状态表示当前数据状态，仅允许“有效”和“已删除”；版本号独立展示，不与状态混用。',
          '历史弹窗状态表示 SAP 接口动作，仅允许“创建”“更新”“删除”三种。',
          '历史记录按同一业务记录聚合，每行代表一个版本，不再提供版本详情或快照二级展开。'
        ]
      }
    ]
  });
})(window);

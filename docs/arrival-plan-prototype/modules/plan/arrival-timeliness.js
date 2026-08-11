(function (window) {
  const componentName = 'ArrivalTimelinessPage';

  const FALLBACK_GROUPS = [
    {
      id: 'AT-202606-0010001404-010101-1001',
      month: '2026-06',
      supplierCode: '0010001404',
      supplierName: '浙江正泰电器股份有限公司',
      categoryCode: '010101',
      categoryName: '低压配电电器',
      factoryCode: '1001',
      factoryName: '正泰低压电器温州生产基地',
      planDetails: [
        { planNo: 'AP-20260612-001', requiredDate: '2026-06-12', materialCode: 'M100218768', materialDesc: '小型断路器 NXB-63 2P C32', planQty: 720 },
        { planNo: 'AP-20260626-001', requiredDate: '2026-06-26', materialCode: 'M100118406', materialDesc: '小型断路器 NXB-63 1P C16', planQty: 680 }
      ],
      receiptDetails: [
        { receiptNo: 'GR-20260611-0086', receiptDate: '2026-06-11', materialCode: 'M100218768', materialDesc: '小型断路器 NXB-63 2P C32', receiptQty: 760 },
        { receiptNo: 'GR-20260628-0124', receiptDate: '2026-06-28', materialCode: 'M100118406', materialDesc: '小型断路器 NXB-63 1P C16', receiptQty: 740 }
      ]
    },
    {
      id: 'AT-202606-0010004106-010201-1002',
      month: '2026-06',
      supplierCode: '0010004106',
      supplierName: '上海正泰智能科技有限公司',
      categoryCode: '010201',
      categoryName: '工业控制电器',
      factoryCode: '1002',
      factoryName: '上海松江智能制造工厂',
      planDetails: [
        { planNo: 'AP-20260618-014', requiredDate: '2026-06-18', materialCode: 'M100364291', materialDesc: '交流接触器 CJX2-2510 220V', planQty: 900 }
      ],
      receiptDetails: [
        { receiptNo: 'GR-20260620-0318', receiptDate: '2026-06-20', materialCode: 'M100364291', materialDesc: '交流接触器 CJX2-2510 220V', receiptQty: 700 },
        { receiptNo: 'GR-20260708-0031', receiptDate: '2026-07-08', materialCode: 'M100364291', materialDesc: '交流接触器 CJX2-2510 220V', receiptQty: 200 }
      ]
    }
  ];

  function makeFilters(month, toleranceDays) {
    return {
      month: month,
      supplierCode: '',
      supplierName: '',
      categoryCode: '',
      categoryName: '',
      factory: '',
      toleranceDays: toleranceDays
    };
  }

  function includesText(value, keyword) {
    return !keyword || String(value || '').toLowerCase().includes(String(keyword).trim().toLowerCase());
  }

  function parseDate(dateText) {
    const parts = String(dateText || '').split('-').map(Number);
    return new Date(parts[0] || 2026, (parts[1] || 1) - 1, parts[2] || 1);
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  function shiftDays(dateText, days) {
    const date = parseDate(dateText);
    date.setDate(date.getDate() + Number(days || 0));
    return formatDate(date);
  }

  function displayDate(dateText) {
    return String(dateText || '').replace(/-/g, '/');
  }

  function displayRange(start, end) {
    return displayDate(start) + '–' + displayDate(end);
  }

  function monthBounds(month) {
    const parts = String(month || '2026-06').split('-').map(Number);
    const year = parts[0] || 2026;
    const monthIndex = (parts[1] || 1) - 1;
    return {
      start: formatDate(new Date(year, monthIndex, 1)),
      end: formatDate(new Date(year, monthIndex + 1, 0))
    };
  }

  function sumBy(rows, field) {
    return rows.reduce((total, row) => total + Number(row[field] || 0), 0);
  }

  function versionNumber(version) {
    return Number(String(version || 'V1').replace(/\D/g, '')) || 1;
  }

  function stableSerial(value, length) {
    const text = String(value || 'CHINT');
    let hash = 0;
    for (let index = 0; index < text.length; index += 1) {
      hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
    }
    return String(hash).padStart(length, '0').slice(-length);
  }

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      const pageData = ChintPrototypeShell.getMockData('arrivalTimeliness', {});
      const planPageData = ChintPrototypeShell.getMockData('arrivalPlanList', {});
      const defaultMonth = pageData.defaultMonth || '2026-06';
      const defaultToleranceDays = Number.isFinite(Number(pageData.defaultToleranceDays)) ? Number(pageData.defaultToleranceDays) : 5;
      return {
        groups: Array.isArray(pageData.groups) && pageData.groups.length ? pageData.groups : FALLBACK_GROUPS,
        arrivalPlanRows: Array.isArray(planPageData.rows) ? planPageData.rows : [],
        defaultMonth: defaultMonth,
        defaultToleranceDays: defaultToleranceDays,
        filters: makeFilters(defaultMonth, defaultToleranceDays),
        appliedFilters: makeFilters(defaultMonth, defaultToleranceDays),
        page: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        detailOpen: false,
        activeDetailTab: 'plan',
        currentRow: null
      };
    },
    computed: {
      appliedBounds() {
        const bounds = monthBounds(this.appliedFilters.month);
        const tolerance = Number(this.appliedFilters.toleranceDays || 0);
        const receiptStartOffset = tolerance > 0 ? -(tolerance + 1) : 0;
        return {
          planStart: bounds.start,
          planEnd: bounds.end,
          receiptStart: shiftDays(bounds.start, receiptStartOffset),
          receiptEnd: shiftDays(bounds.end, tolerance),
          planRange: displayRange(bounds.start, bounds.end),
          receiptRange: displayRange(shiftDays(bounds.start, receiptStartOffset), shiftDays(bounds.end, tolerance))
        };
      },
      metricRows() {
        const f = this.appliedFilters;
        const bounds = this.appliedBounds;
        return this.groups
          .filter((group) => {
            if (group.month && group.month !== f.month) return false;
            if (!includesText(group.supplierCode, f.supplierCode)) return false;
            if (!includesText(group.supplierName, f.supplierName)) return false;
            if (!includesText(group.categoryCode, f.categoryCode)) return false;
            if (!includesText(group.categoryName, f.categoryName)) return false;
            if (!includesText([group.factoryCode, group.factoryName].join(' '), f.factory)) return false;
            return true;
          })
          .map((group) => {
            const planDetails = (group.planDetails || []).filter((item) => item.requiredDate >= bounds.planStart && item.requiredDate <= bounds.planEnd);
            const receiptDetails = (group.receiptDetails || []).filter((item) => item.receiptDate >= bounds.receiptStart && item.receiptDate <= bounds.receiptEnd);
            const planQty = sumBy(planDetails, 'planQty');
            const actualQty = sumBy(receiptDetails, 'receiptQty');
            const effectiveQty = Math.min(actualQty, planQty);
            const uncoveredQty = Math.max(planQty - effectiveQty, 0);
            const rate = planQty ? Math.min(actualQty / planQty * 100, 100) : 0;
            return {
              id: group.id,
              month: f.month,
              supplierCode: group.supplierCode,
              supplierName: group.supplierName,
              categoryCode: group.categoryCode,
              categoryName: group.categoryName,
              factoryCode: group.factoryCode,
              factoryName: group.factoryName,
              factoryDisplay: [group.factoryCode, group.factoryName].filter(Boolean).join(' / '),
              planQty: planQty,
              actualQty: actualQty,
              effectiveQty: effectiveQty,
              uncoveredQty: uncoveredQty,
              toleranceDays: Number(f.toleranceDays || 0),
              planStart: bounds.planStart,
              planEnd: bounds.planEnd,
              receiptStart: bounds.receiptStart,
              receiptEnd: bounds.receiptEnd,
              planRange: bounds.planRange,
              receiptRange: bounds.receiptRange,
              rate: rate,
              sourceGroup: group,
              planDetails: planDetails,
              receiptDetails: receiptDetails
            };
          });
      },
      pagedRows() {
        const start = (this.page - 1) * this.pageSize;
        return this.metricRows.slice(start, start + this.pageSize);
      },
      totals() {
        const planQty = sumBy(this.metricRows, 'planQty');
        const actualQty = sumBy(this.metricRows, 'actualQty');
        const effectiveQty = sumBy(this.metricRows, 'effectiveQty');
        const uncoveredQty = sumBy(this.metricRows, 'uncoveredQty');
        return {
          planQty: planQty,
          actualQty: actualQty,
          uncoveredQty: uncoveredQty,
          rate: planQty ? Math.min(actualQty / planQty * 100, 100) : 0
        };
      },
      detailPlanRows() {
        if (!this.currentRow) return [];
        const sourceDetails = (this.currentRow.sourceGroup.planDetails || []).filter((item) => {
          return item.requiredDate >= this.currentRow.planStart && item.requiredDate <= this.currentRow.planEnd;
        });
        const latestByPlan = new Map();
        sourceDetails.forEach((detail) => {
          const planKey = detail.planNo || detail.id;
          if (!planKey) return;
          const masterCandidates = this.arrivalPlanRows
            .filter((item) => (item.id || item.planNo) === planKey)
            .sort((left, right) => {
              const versionDiff = versionNumber(right.version) - versionNumber(left.version);
              if (versionDiff) return versionDiff;
              return String(right.updateTime || '').localeCompare(String(left.updateTime || ''));
            });
          const master = masterCandidates[0];
          const candidate = Object.assign({
            id: planKey,
            requiredDate: detail.requiredDate,
            planQty: Number(detail.planQty || 0),
            supplierCode: this.currentRow.supplierCode,
            supplierName: this.currentRow.supplierName,
            materialCode: detail.materialCode || '',
            materialDesc: detail.materialDesc || '',
            categoryCode: this.currentRow.categoryCode,
            categoryName: this.currentRow.categoryName,
            factoryCode: this.currentRow.factoryCode,
            factoryName: this.currentRow.factoryName,
            workshop: '计划归属车间',
            batchQty: Number(detail.planQty || 0),
            safetyStock: 0,
            leadTime: '7天',
            minPackQty: 1,
            minOrderQty: 1,
            type: '生产计划',
            totalQty: Number(detail.planQty || 0),
            mergeFlag: '否',
            version: 'V1',
            status: '有效'
          }, detail, master || {});
          const existing = latestByPlan.get(planKey);
          if (!existing || versionNumber(candidate.version) > versionNumber(existing.version) ||
            (versionNumber(candidate.version) === versionNumber(existing.version) && String(candidate.updateTime || '') > String(existing.updateTime || ''))) {
            latestByPlan.set(planKey, candidate);
          }
        });
        return Array.from(latestByPlan.values())
          .filter((item) => item.requiredDate >= this.currentRow.planStart && item.requiredDate <= this.currentRow.planEnd)
          .filter((item) => !['已删除', '删除'].includes(item.status))
          .map((item) => Object.assign({}, item, { requiredDateDisplay: displayDate(item.requiredDate) }));
      },
      detailReceiptRows() {
        if (!this.currentRow) return [];
        return (this.currentRow.receiptDetails || [])
          .filter((item) => item.receiptDate >= this.currentRow.receiptStart && item.receiptDate <= this.currentRow.receiptEnd)
          .map((item, index) => {
            const serial = stableSerial(item.receiptNo || item.materialCode || index, 8);
            const receiptQty = Number(item.receiptQty || 0);
            const untaxedUnitPrice = Number(item.untaxedUnitPrice || (72.5 + (Number(serial.slice(-3)) % 4600) / 100));
            const taxRate = Number(item.taxRate === undefined ? 13 : item.taxRate);
            const untaxedAmount = Number(item.untaxedAmount || receiptQty * untaxedUnitPrice);
            const taxIncludedAmount = Number(item.taxIncludedAmount || untaxedAmount * (1 + taxRate / 100));
            return Object.assign({}, item, {
              receiptDateDisplay: displayDate(item.receiptDate),
              unit: item.unit || 'EA',
              untaxedUnitPrice: untaxedUnitPrice,
              taxIncludedAmount: taxIncludedAmount,
              untaxedAmount: untaxedAmount,
              applicationFactory: item.applicationFactory || this.currentRow.factoryDisplay,
              currency: item.currency || 'CNY',
              paymentTermName: item.paymentTermName || '月结30天',
              paymentTermCode: item.paymentTermCode || 'Z030',
              materialTypeCode: item.materialTypeCode || 'ROH',
              materialTypeDesc: item.materialTypeDesc || '原材料',
              storageLocation: item.storageLocation || '1001',
              erpPurchaseOrderNo: item.erpPurchaseOrderNo || ('45' + serial),
              erpPurchaseOrderLineNo: item.erpPurchaseOrderLineNo || String((index + 1) * 10).padStart(5, '0'),
              purchaseType: item.purchaseType || '标准采购',
              purchaseOrderNo: item.purchaseOrderNo || ('PO-' + this.currentRow.month.replace('-', '') + '-' + serial.slice(-4)),
              outboundDeliveryNo: item.outboundDeliveryNo || ('OD-' + serial),
              receiptVoucherNo: item.receiptVoucherNo || item.receiptNo || ('RV-' + serial),
              deliveryNoteNo: item.deliveryNoteNo || ('DN-' + serial),
              contractNo: item.contractNo || ('HT-' + this.currentRow.month.slice(0, 4) + '-' + serial.slice(-5)),
              buyer: item.buyer || (index % 2 ? '林志远' : '陈晓峰'),
              purchaseOrderType: item.purchaseOrderType || '标准采购订单',
              purchaseOrderDateDisplay: displayDate(item.purchaseOrderDate || shiftDays(item.receiptDate, -7)),
              taxRateDisplay: item.taxRateDisplay || taxRate.toFixed(0) + '%'
            });
          });
      },
      detailPlanTotal() {
        return sumBy(this.detailPlanRows, 'planQty');
      },
      detailReceiptTotal() {
        return sumBy(this.detailReceiptRows, 'receiptQty');
      }
    },
    methods: {
      queryRows() {
        if (!this.filters.month) {
          ElementPlus.ElMessage.warning('请选择考核月份');
          return;
        }
        this.appliedFilters = Object.assign({}, this.filters, {
          toleranceDays: Number(this.filters.toleranceDays || 0)
        });
        this.page = 1;
        ElementPlus.ElMessage.success('已按计划取数区间与收货取数区间重新计算到货及时率');
      },
      resetFilters() {
        this.filters = makeFilters(this.defaultMonth, this.defaultToleranceDays);
        this.appliedFilters = makeFilters(this.defaultMonth, this.defaultToleranceDays);
        this.page = 1;
        ElementPlus.ElMessage.success('查询条件与统计口径已重置');
      },
      handlePageChange(page) {
        this.page = page;
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
      },
      openDetail(row) {
        this.currentRow = row;
        this.activeDetailTab = 'plan';
        this.detailOpen = true;
      },
      formatNumber(value) {
        return Number(value || 0).toLocaleString('zh-CN');
      },
      formatMoney(value) {
        return Number(value || 0).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      },
      planStatusTagType(status) {
        return status === '已删除' || status === '删除' ? 'danger' : 'success';
      },
      formatRate(value) {
        return Number(value || 0).toFixed(2) + '%';
      },
      rateColor(rate) {
        if (Number(rate) >= 95) return '#67c23a';
        if (Number(rate) >= 80) return '#e6a23c';
        return '#f56c6c';
      }
    },
    template: `
      <div class="flow-progress-layout arrival-timeliness-page">
        <section class="panel control-panel flow-panel-shell arrival-timeliness-control">
          <div class="panel-body">
            <div class="filter-bar arrival-timeliness-filter" data-tour="arrival-timeliness-filter">
              <div class="arrival-timeliness-filter-row">
                <div class="arrival-timeliness-month-field">
                  <span class="arrival-timeliness-required">*</span>
                  <el-date-picker v-model="filters.month" type="month" size="small" value-format="YYYY-MM" format="YYYY-MM" placeholder="考核月份" :teleported="false" style="width:145px"></el-date-picker>
                </div>
                <el-input v-model="filters.supplierCode" size="small" clearable placeholder="供应商编码" style="width:140px"></el-input>
                <el-input v-model="filters.supplierName" size="small" clearable placeholder="供应商名称" style="width:180px"></el-input>
                <el-input v-model="filters.categoryCode" size="small" clearable placeholder="品类编码" style="width:135px"></el-input>
                <el-input v-model="filters.categoryName" size="small" clearable placeholder="品类名称" style="width:165px"></el-input>
                <el-input v-model="filters.factory" size="small" clearable placeholder="工厂编码/名称" style="width:170px"></el-input>
                <div class="arrival-timeliness-tolerance"><span>容差天数</span><el-input-number v-model="filters.toleranceDays" size="small" :min="0" :max="31" controls-position="right" style="width:110px"></el-input-number></div>
                <div class="arrival-timeliness-query-actions">
                  <el-button type="primary" size="small" @click="queryRows"><i class="ri-search-line"></i><span>查询</span></el-button>
                  <el-button size="small" @click="resetFilters">重置</el-button>
                </div>
              </div>
            </div>
            <div class="table-toolbar flow-action-bar arrival-timeliness-toolbar" data-tour="arrival-timeliness-toolbar">
              <div class="toolbar-left arrival-timeliness-readonly"><i class="ri-information-line"></i><span>按供应商 + 考核月份 + 品类统计；SAP 计划与收货数据仅用于只读计算</span></div>
              <div class="toolbar-right arrival-timeliness-range"><span>计划：{{ appliedBounds.planRange }}</span><span>收货：{{ appliedBounds.receiptRange }}</span></div>
            </div>
          </div>
        </section>

        <section class="panel table-panel flow-panel-shell arrival-timeliness-table-panel">
          <div class="panel-body">
            <div class="flow-grid-table-wrap arrival-timeliness-grid-wrap">
              <el-table class="flow-grid-table arrival-timeliness-table" :data="pagedRows" row-key="id" height="100%" size="default" stripe border table-layout="fixed" style="width:100%" data-tour="arrival-timeliness-table">
                <el-table-column label="序号" type="index" width="64" fixed="left" align="center" :index="(index) => (page - 1) * pageSize + index + 1"></el-table-column>
                <el-table-column prop="month" label="考核月份" width="100" align="center"></el-table-column>
                <el-table-column prop="supplierCode" label="供应商编码" width="132"></el-table-column>
                <el-table-column prop="supplierName" label="供应商名称" width="210" show-overflow-tooltip></el-table-column>
                <el-table-column prop="categoryCode" label="品类编码" width="112"></el-table-column>
                <el-table-column prop="categoryName" label="品类名称" width="165" show-overflow-tooltip></el-table-column>
                <el-table-column prop="factoryDisplay" label="工厂" width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="planQty" label="计划到货数量" width="125" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.planQty) }}</template></el-table-column>
                <el-table-column prop="actualQty" label="实际收货数量" width="125" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.actualQty) }}</template></el-table-column>
                <el-table-column prop="toleranceDays" label="容差天数" width="95" align="center"><template v-slot:default="scope">{{ scope.row.toleranceDays }} 天</template></el-table-column>
                <el-table-column prop="planRange" label="计划取数区间" width="210" align="center"></el-table-column>
                <el-table-column prop="receiptRange" label="收货取数区间" width="210" align="center"></el-table-column>
                <el-table-column prop="rate" label="到货及时率" width="180">
                  <template v-slot:default="scope"><div class="arrival-timeliness-rate-cell"><el-progress :percentage="Number(scope.row.rate.toFixed(2))" :stroke-width="6" :show-text="false" :color="rateColor(scope.row.rate)"></el-progress><span>{{ formatRate(scope.row.rate) }}</span></div></template>
                </el-table-column>
                <el-table-column label="操作" width="105" fixed="right" align="center" header-align="center">
                  <template v-slot:default="scope"><el-button link type="primary" size="small" @click.stop="openDetail(scope.row)"><i class="ri-file-list-3-line"></i><span>查看明细</span></el-button></template>
                </el-table-column>
              </el-table>
            </div>
            <div class="table-footer">
              <div class="arrival-timeliness-total">共 {{ metricRows.length }} 条统计维度</div>
              <el-pagination small background layout="sizes, prev, pager, next" :current-page="page" :page-size="pageSize" :page-sizes="pageSizes" :total="metricRows.length" @update:current-page="handlePageChange" @size-change="handlePageSizeChange"></el-pagination>
            </div>
          </div>
        </section>

        <el-dialog v-model="detailOpen" title="到货及时率计算明细" width="90%" align-center destroy-on-close class="arrival-timeliness-dialog" data-tour="arrival-timeliness-dialog">
          <div v-if="currentRow" class="arrival-timeliness-detail-summary">
            <span><strong>{{ currentRow.supplierCode }}</strong> {{ currentRow.supplierName }}</span>
            <span>{{ currentRow.categoryCode }} / {{ currentRow.categoryName }}</span>
            <span>{{ currentRow.month }} · 容差 {{ currentRow.toleranceDays }} 天</span>
            <span>计划 {{ currentRow.planRange }} · 收货 {{ currentRow.receiptRange }}</span>
          </div>
          <el-tabs v-model="activeDetailTab" class="arrival-timeliness-tabs">
            <el-tab-pane label="计划明细" name="plan">
              <div class="arrival-timeliness-tab-range"><span><i class="ri-calendar-check-line"></i>计划取数区间：{{ currentRow ? currentRow.planRange : '' }}</span><span class="arrival-timeliness-tab-total">计划数量合计：<strong>{{ formatNumber(detailPlanTotal) }}</strong></span></div>
              <div class="arrival-timeliness-detail-table-wrap">
                <el-table :data="detailPlanRows" row-key="id" max-height="410" size="small" stripe border table-layout="fixed" style="width:100%">
                  <el-table-column label="序号" type="index" width="58" fixed="left" align="center"></el-table-column>
                  <el-table-column prop="requiredDateDisplay" label="要求到货日期" width="126" align="center"></el-table-column>
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
                  <el-table-column prop="status" label="状态" width="100" align="center"><template v-slot:default="scope"><el-tag size="small" :type="planStatusTagType(scope.row.status)">{{ scope.row.status }}</el-tag></template></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="收货明细" name="receipt">
              <div class="arrival-timeliness-tab-range"><span><i class="ri-inbox-archive-line"></i>收货取数区间：{{ currentRow ? currentRow.receiptRange : '' }}</span><span class="arrival-timeliness-tab-total">收货数量合计：<strong>{{ formatNumber(detailReceiptTotal) }}</strong></span></div>
              <div class="arrival-timeliness-detail-table-wrap">
                <el-table :data="detailReceiptRows" row-key="receiptNo" max-height="410" size="small" stripe border table-layout="fixed" style="width:100%">
                  <el-table-column label="序号" type="index" width="58" fixed="left" align="center"></el-table-column>
                  <el-table-column prop="receiptDateDisplay" label="收货日期" width="115" align="center"></el-table-column>
                  <el-table-column prop="materialCode" label="物料编号" width="145"></el-table-column>
                  <el-table-column prop="materialDesc" label="物料描述" width="230" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="receiptQty" label="收货数量" width="110" align="right"><template v-slot:default="scope">{{ formatNumber(scope.row.receiptQty) }}</template></el-table-column>
                  <el-table-column prop="unit" label="单位" width="72" align="center"></el-table-column>
                  <el-table-column prop="untaxedUnitPrice" label="不含税单价" width="112" align="right"><template v-slot:default="scope">{{ formatMoney(scope.row.untaxedUnitPrice) }}</template></el-table-column>
                  <el-table-column prop="taxIncludedAmount" label="含税金额" width="130" align="right"><template v-slot:default="scope">{{ formatMoney(scope.row.taxIncludedAmount) }}</template></el-table-column>
                  <el-table-column prop="untaxedAmount" label="不含税金额" width="130" align="right"><template v-slot:default="scope">{{ formatMoney(scope.row.untaxedAmount) }}</template></el-table-column>
                  <el-table-column prop="applicationFactory" label="应用工厂" width="230" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="currency" label="币种" width="72" align="center"></el-table-column>
                  <el-table-column prop="paymentTermName" label="付款条件名称" width="128" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="paymentTermCode" label="付款条件编码" width="120"></el-table-column>
                  <el-table-column prop="materialTypeCode" label="物料类型编码" width="120"></el-table-column>
                  <el-table-column prop="materialTypeDesc" label="物料类型描述" width="130" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="storageLocation" label="库位" width="88"></el-table-column>
                  <el-table-column prop="erpPurchaseOrderNo" label="ERP采购订单号" width="145"></el-table-column>
                  <el-table-column prop="erpPurchaseOrderLineNo" label="ERP采购单行号" width="130"></el-table-column>
                  <el-table-column prop="purchaseType" label="采购类型" width="105"></el-table-column>
                  <el-table-column prop="purchaseOrderNo" label="采购订单号" width="155"></el-table-column>
                  <el-table-column prop="outboundDeliveryNo" label="外向交货单号" width="145"></el-table-column>
                  <el-table-column prop="receiptVoucherNo" label="收货凭证号" width="155"></el-table-column>
                  <el-table-column prop="deliveryNoteNo" label="发货单号" width="135"></el-table-column>
                  <el-table-column prop="contractNo" label="合同号" width="135"></el-table-column>
                  <el-table-column prop="buyer" label="采购员" width="90"></el-table-column>
                  <el-table-column prop="purchaseOrderType" label="采购订单类型" width="130" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="purchaseOrderDateDisplay" label="采购订单日期" width="125" align="center"></el-table-column>
                  <el-table-column prop="taxRateDisplay" label="税率" width="72" align="center"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
          <template v-slot:footer><el-button size="small" @click="detailOpen = false">关闭</el-button></template>
        </el-dialog>

        <style>
          .arrival-timeliness-page { gap: 12px; }
          .arrival-timeliness-control { flex: none; }
          .arrival-timeliness-control > .panel-body { padding: 14px 16px 0; }
          .arrival-timeliness-filter { display: block; padding: 0; }
          .arrival-timeliness-filter-row { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
          .arrival-timeliness-month-field { position: relative; display: flex; align-items: center; }
          .arrival-timeliness-required { position: absolute; left: -8px; top: 7px; color: var(--el-color-danger); z-index: 1; }
          .arrival-timeliness-tolerance { display: flex; align-items: center; gap: 6px; color: var(--el-text-color-regular); font-size: 12px; }
          .arrival-timeliness-query-actions { display: flex; align-items: center; margin-left: auto; }
          .arrival-timeliness-query-actions .el-button + .el-button { margin-left: 8px; }
          .arrival-timeliness-toolbar { min-height: 42px; margin-top: 12px; border-top: 1px solid var(--el-border-color-lighter); }
          .arrival-timeliness-readonly { display: flex; align-items: center; gap: 7px; color: var(--el-color-primary); font-size: 12px; }
          .arrival-timeliness-readonly i { font-size: 16px; }
          .arrival-timeliness-range { display: flex; align-items: center; gap: 12px; color: var(--el-text-color-secondary); font-size: 12px; }
          .arrival-timeliness-table-panel { border-radius: 10px; overflow: hidden; }
          .arrival-timeliness-table-panel > .panel-body { padding: 0; }
          .arrival-timeliness-grid-wrap { min-height: 300px; }
          .arrival-timeliness-table .el-table__header th { height: 46px; background: #f3f6fb !important; color: #303744; font-weight: 600; }
          .arrival-timeliness-table .el-table__row td { height: 46px; }
          .arrival-timeliness-table .el-button i { margin-right: 4px; }
          .arrival-timeliness-rate-cell { display: grid; grid-template-columns: minmax(70px, 1fr) 50px; align-items: center; gap: 8px; }
          .arrival-timeliness-rate-cell span { color: var(--el-text-color-regular); font-size: 12px; text-align: right; }
          .arrival-timeliness-page .table-footer { padding: 11px 16px; background: #fff; border-top: 1px solid var(--el-border-color-lighter); }
          .arrival-timeliness-total { color: var(--el-text-color-secondary); font-size: 12px; }
          .arrival-timeliness-dialog { min-height: 520px; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; }
          .arrival-timeliness-dialog .el-dialog__header { padding: 17px 20px 14px; margin-right: 0; border-bottom: 1px solid var(--el-border-color-lighter); }
          .arrival-timeliness-dialog .el-dialog__title { color: #252b36; font-size: 17px; font-weight: 600; }
          .arrival-timeliness-dialog .el-dialog__body { flex: 1; min-height: 0; padding: 14px 20px 10px; }
          .arrival-timeliness-dialog .el-dialog__footer { padding: 12px 20px 16px; border-top: 1px solid var(--el-border-color-lighter); text-align: right; }
          .arrival-timeliness-detail-summary { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 18px; padding: 9px 12px; margin-bottom: 8px; color: var(--el-text-color-regular); font-size: 12px; background: #f5f9ff; border: 1px solid #dfeaff; border-radius: 6px; }
          .arrival-timeliness-detail-summary strong { color: var(--el-color-primary); }
          .arrival-timeliness-tabs .el-tabs__header { margin-bottom: 10px; }
          .arrival-timeliness-tab-range { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 8px; padding: 7px 10px; color: var(--el-color-primary); font-size: 12px; background: var(--el-color-primary-light-9); border-radius: 4px; }
          .arrival-timeliness-tab-range i { margin-right: 6px; }
          .arrival-timeliness-tab-total { flex: none; color: var(--el-text-color-regular); }
          .arrival-timeliness-tab-total strong { margin-left: 3px; color: var(--el-color-primary); font-size: 14px; }
          .arrival-timeliness-detail-table-wrap { width: 100%; overflow: hidden; }
          .arrival-timeliness-dialog .el-table__header th { background: #f3f6fb !important; color: #303744; font-weight: 600; }
          @media (max-width: 1380px) {
            .arrival-timeliness-query-actions { margin-left: 0; }
          }
        </style>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/plan/arrival-timeliness',
    name: '到货及时率',
    menuKey: 'arrivalTimeliness',
    component: componentName,
    templateId: 'kpi-filter-table-page',
    archetype: 'KPI筛选表格页',
    breadcrumbs: ['计划管理', '到货及时率'],
    tabInfo: '帮助采购计划与供应协同人员按供应商、月份和品类核对 SAP 计划与收货数据的到货及时率。',
    guideSteps: [
      { target: '[data-tour="arrival-timeliness-toolbar"]', title: '核对计划与收货区间', description: '工具栏并列展示当前计划取数区间与收货取数区间，便于在查看统计结果前确认计算边界。' },
      { target: '[data-tour="arrival-timeliness-filter"]', title: '设定统计口径', description: '选择必填考核月份并组合供应商、品类、工厂和容差天数，点击查询后分别确定计划取数区间与收货取数区间。' },
      { target: '[data-tour="arrival-timeliness-table"]', title: '核对固定维度结果', description: '按供应商、考核月份和品类查看计划量、实际收货量、两类取数区间和及时率。' },
      { target: '[data-tour="arrival-timeliness-dialog"]', title: '追溯计算明细', description: '计划页签仅展示区间内最新有效计划及数量合计；收货页签展示当前供应商、品类、工厂在收货区间内的记录及数量合计。' }
    ],
    noteSections: [
      {
        title: '业务目标与适用角色',
        content: '本页帮助采购计划专员与供应协同人员按供应商 + 考核月份 + 品类固定维度评估到货及时率，识别计划未被收货覆盖的数量。'
      },
      {
        title: '统计口径',
        items: [
          '计划取数区间为考核月份自然月，仅汇总区间内要求到货日期对应的计划明细；收货取数区间按容差向前、向后扩展，仅汇总区间内收货明细。',
          '例如考核月份 2026-07、容差 5 天：计划取数区间为 2026/07/01–2026/07/31，收货取数区间为 2026/06/25–2026/08/05。',
          '有效收货数量 = min（实际收货数量，计划到货数量）；未覆盖数量 = max（计划到货数量 - 有效收货数量，0）。',
          '到货及时率 = 收货取数区间内实际收货数量 / 计划取数区间内计划到货数量 × 100%，单行和汇总结果最高均为 100%；实际收货数量允许大于计划量。',
          '计划明细按同一计划保留最新版本并排除最新状态为删除的数据；收货明细沿用当前供应商、品类、工厂统计维度，两个页签分别汇总计划数量与收货数量。',
          '容差天数修改仅在点击查询后生效，重置恢复默认考核月份与 5 天容差。'
        ]
      },
      {
        title: '数据流与上下游',
        content: '页面接收 SAP 到货计划与收货记录，在采购云内按统一口径进行只读汇总，并把统计结果提供给采购计划和供应协同角色复核。',
        diagram: {
          type: 'flow',
          caption: '到货及时率从数据接收到结果复核的只读计算链路。',
          nodes: [
            { id: 'sap', title: 'SAP 数据', meta: '发送计划与收货记录', tone: 'info' },
            { id: 'scope', title: '口径筛选', meta: '月份、维度与容差', tone: 'warning' },
            { id: 'calculate', title: '指标计算', meta: '计划、有效量与及时率', tone: 'primary' },
            { id: 'review', title: '业务复核', meta: '计划与供应协同查看', tone: 'success' }
          ],
          edges: [
            { from: 'sap', to: 'scope', label: '接收' },
            { from: 'scope', to: 'calculate', label: '计算' },
            { from: 'calculate', to: 'review', label: '查看' }
          ]
        }
      },
      {
        title: '上下游关系',
        content: 'SAP 是计划与收货数据发送方，采购云仅承接查询、计算和明细追溯，不向 SAP 回写。',
        diagram: {
          type: 'relation',
          caption: 'SAP 单向发送数据，采购云计算后供业务角色只读查看。',
          center: { title: '到货及时率', meta: '采购云只读统计', tone: 'primary' },
          upstream: [{ title: 'SAP', meta: '计划与收货数据', tone: 'info' }],
          downstream: [
            { title: '采购计划专员', meta: '核对计划覆盖情况', tone: 'success' },
            { title: '供应协同人员', meta: '分析供应及时性', tone: 'success' }
          ]
        }
      },
      {
        title: '业务边界',
        items: [
          'SAP 计划与收货数据均为只读，本页不提供新增、编辑、删除、导入、导出或批量维护动作。',
          '当前暂不处理相邻月份收货取数区间内同一笔收货被重复使用的问题，评审时需结合后续正式口径确认去重规则。',
          'KPI 卡只展示当前查询范围汇总，不承担点击筛选；查看明细仅展示参与当前统计的计划与收货记录。'
        ]
      }
    ]
  });
})(window);

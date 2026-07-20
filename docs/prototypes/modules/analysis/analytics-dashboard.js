(function (window) {
  const componentName = 'AnalyticsDashboardPage';

  const months = ['2026-04', '2026-05', '2026-06', '2026-07', '2026-08'];
  const categoryTrends = [
    { category: '边框', data: [7.8, 7.9, 8.1, 8.0, 8.2] },
    { category: '玻璃', data: [27.3, 27.6, 27.9, 28.0, 28.2] },
    { category: '胶膜', data: [5.4, 5.5, 5.7, 5.6, 5.8] },
    { category: '气体', data: [1.8, 1.9, 2.0, 1.95, 2.1] },
    { category: '化学品', data: [12.6, 12.8, 13.1, 13.0, 13.3] }
  ];
  const materials = [
    { code: 'M-FR-2101', name: '铝边框 2101', category: '边框', forecast: [7.7, 7.8, 8.0, 7.9, 8.1], actual: [7.8, 7.9, 8.1, null, null] },
    { code: 'M-GL-3201', name: '3.2mm 压延正玻', category: '玻璃', forecast: [21.8, 22.0, 21.9, 22.2, 21.92], actual: [22.1, 22.4, 22.68, null, null] },
    { code: 'M-GL-4008', name: '4.0mm 镀膜背玻', category: '玻璃', forecast: [26.1, 26.3, 26.8, 26.84, 27.0], actual: [25.9, 26.0, 27.36, null, null] },
    { code: 'M-GL-5206', name: '5.2mm 开孔钢化玻璃', category: '玻璃', forecast: [33.9, 34.2, 34.6, 34.66, 34.8], actual: [34.8, 35.1, 35.14, null, null] },
    { code: 'M-EVA-1108', name: 'EVA 胶膜', category: '胶膜', forecast: [5.4, 5.5, 5.7, 5.6, 5.8], actual: [5.3, 5.6, 5.9, null, null] },
    { code: 'M-GAS-2201', name: '氩气', category: '气体', forecast: [1.8, 1.9, 2.0, 1.95, 2.1], actual: [1.75, 1.92, 2.05, null, null] },
    { code: 'M-CHEM-3106', name: '清洗剂', category: '化学品', forecast: [12.6, 12.8, 13.1, 13.0, 13.3], actual: [12.7, 12.9, 13.2, null, null] }
  ];

  ChintPrototypeShell.registerPageComponent(componentName, {
    name: componentName,
    data() {
      return {
        trendChart: null,
        qualityChart: null,
        reviewCharts: [],
        trendMode: '物料走势',
        selectedCategory: '全部',
        selectedMaterial: 'M-GL-3201',
        timeRange: ['2026-04', '2026-08'],
        activeMetric: 'avgDeviation',
        drawerVisible: false,
        current: null,
        reviewCards: [
          { title: '硅片价格预测复盘', exec: [1.20, 1.18, 1.20, 1.22, 1.05, 1.00, 0.91, 1.15, 1.25, 1.35, 1.35], forecast: [1.18, 1.18, 1.20, 1.15, 1.00, 0.95, 0.91, 1.20, 1.30, 1.40, 1.30] },
          { title: '玻璃价格预测复盘', exec: [12.0, 12.0, 13.5, 13.5, 12.5, 11.3, 10.0, 11.0, 13.0, 13.0, 12.0], forecast: [12.0, 12.0, 14.0, 14.0, 13.5, 11.6, 10.0, 11.0, 13.0, 13.0, 12.0] },
          { title: '胶膜价格预测复盘', exec: [5.68, 5.72, 5.94, 5.93, 5.85, 5.85, 4.99, 4.99, 7.79, 8.41, 7.79], forecast: [5.65, 5.77, 5.89, 5.93, 5.85, 5.85, 4.99, 4.99, 7.79, 7.79, 7.79] },
          { title: '银浆价格预测复盘', exec: [758, 799, 810, 832, 832, 841, 863, 887, 900, 1050, 1095], forecast: [800, 806, 810, 820, 832, 841, 863, 887, 928, 773, 840] }
        ],
        matrixRows: [
          { no: 1, category: '硅片', deviations: ['1.69%', '0.00%', '0.00%', '6.09%', '5.00%', '5.26%', '0.00%', '4.17%', '7.41%', '3.70%', '3.85%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 2, category: '电池片', deviations: ['1.69%', '0.00%', '4.00%', '3.33%', '1.85%', '3.77%', '6.90%', '1.75%', '7.81%', '3.51%', '1.79%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 3, category: 'EVA', deviations: ['6.30%', '0.00%', '1.00%', '9.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '2.62%', '0.00%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 4, category: '背板', deviations: ['5.60%', '5.10%', '5.90%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 5, category: '间隙膜', deviations: ['1.70%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.22%', '0.00%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 6, category: '边框', deviations: ['1.53%', '1.06%', '12.64%', '1.81%', '1.52%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 7, category: '玻璃', deviations: ['0.00%', '0.00%', '3.70%', '3.70%', '8.00%', '2.59%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 8, category: '焊带', deviations: ['1.46%', '1.97%', '12.59%', '2.80%', '0.91%', '0.42%', '0.00%', '0.00%', '0.77%', '2.96%', '0.00%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 9, category: '接线盒', deviations: ['0.00%', '0.00%', '4.20%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 10, category: '硅胶', deviations: ['3.47%', '3.47%', '4.76%', '0.80%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '8.00%', '0.00%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 11, category: '化学品', deviations: ['0.63%', '0.63%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 12, category: '银浆', deviations: ['4.63%', '8.96%', '0.00%', '2.37%', '0.00%', '0.00%', '0.00%', '1.69%', '7.37%', '17.8%', '14.6%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 13, category: '气体', deviations: ['0.63%', '0.63%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '15.1%', '15.1%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: 14, category: '网版', deviations: ['0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%'], directions: ['一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致', '一致'] },
          { no: '', category: '常规产品均值', deviations: ['2.46%', '2.46%', '5.58%', '1.96%', '4.93%', '3.18%', '3.45%', '0.88%', '3.91%', '7.07%', '7.89%'], summary: true, directions: [] },
          { no: '', category: '大家类均值', deviations: ['2.33%', '0.00%', '6.29%', '5.48%', '2.48%', '2.84%', '0.00%', '2.93%', '7.78%', '12.29%', '9.20%'], summary: true, directions: [] }
        ],
        metricCards: [
          { key: 'avgDeviation', label: '平均偏差率', value: '3.2%', sub: '总览 / 可分品类', icon: 'ri-line-chart-line' },
          { key: 'directionAccuracy', label: '方向性准确率', value: '82%', sub: '总览 / 可分品类', icon: 'ri-checkbox-circle-line', success: true },
          { key: 'validVersions', label: '有效预测版本', value: '42', sub: '按品类和月份统计', icon: 'ri-book-open-line' },
          { key: 'deviationAlerts', label: '偏差异常', value: '11', sub: '超过阈值待复盘', icon: 'ri-alarm-warning-line', warning: true },
          { key: 'targetAchievement', label: '目标达成率', value: '76%', sub: '总览 / 可分品类', icon: 'ri-trophy-line', success: true }
        ],
        reports: {
          avgDeviation: [
            { scope: '总计', category: '全部', month: '2026-06', materialCode: '-', materialName: '-', avgDeviation: '3.2%', deviationAmount: '0.72', sampleCount: 218, owner: '采购管理部', status: '正常' },
            { scope: '品类', category: '边框', month: '2026-06', materialCode: '-', materialName: '-', avgDeviation: '2.8%', deviationAmount: '0.22', sampleCount: 48, owner: '王嘉宁', status: '正常' },
            { scope: '品类', category: '玻璃', month: '2026-06', materialCode: '-', materialName: '-', avgDeviation: '3.6%', deviationAmount: '0.81', sampleCount: 126, owner: '沈佳怡', status: '正常' },
            { scope: '品类', category: '胶膜', month: '2026-06', materialCode: '-', materialName: '-', avgDeviation: '4.1%', deviationAmount: '0.23', sampleCount: 32, owner: '李思锦', status: '偏高' },
            { scope: '品类', category: '气体', month: '2026-06', materialCode: '-', materialName: '-', avgDeviation: '2.2%', deviationAmount: '0.04', sampleCount: 18, owner: '赵金宇', status: '正常' },
            { scope: '品类', category: '化学品', month: '2026-06', materialCode: '-', materialName: '-', avgDeviation: '3.0%', deviationAmount: '0.39', sampleCount: 26, owner: '张炜', status: '正常' },
            { scope: '物料', category: '玻璃', month: '2026-06', materialCode: 'M-GL-5206', materialName: '5.2mm 开孔钢化玻璃', avgDeviation: '6.8%', deviationAmount: '2.31', sampleCount: 1, owner: '周航', status: '偏高' }
          ],
          directionAccuracy: [
            { scope: '总计', category: '全部', month: '2026-06', materialCode: '-', materialName: '-', accuracy: '82%', correctCount: 179, totalCount: 218, owner: '采购管理部', status: '正常' },
            { scope: '品类', category: '边框', month: '2026-06', materialCode: '-', materialName: '-', accuracy: '85%', correctCount: 41, totalCount: 48, owner: '王嘉宁', status: '正常' },
            { scope: '品类', category: '玻璃', month: '2026-06', materialCode: '-', materialName: '-', accuracy: '78%', correctCount: 98, totalCount: 126, owner: '沈佳怡', status: '待提升' },
            { scope: '品类', category: '胶膜', month: '2026-06', materialCode: '-', materialName: '-', accuracy: '80%', correctCount: 26, totalCount: 32, owner: '李思锦', status: '正常' },
            { scope: '品类', category: '气体', month: '2026-06', materialCode: '-', materialName: '-', accuracy: '89%', correctCount: 16, totalCount: 18, owner: '赵金宇', status: '正常' },
            { scope: '品类', category: '化学品', month: '2026-06', materialCode: '-', materialName: '-', accuracy: '84%', correctCount: 22, totalCount: 26, owner: '张炜', status: '正常' },
            { scope: '物料', category: '玻璃', month: '2026-06', materialCode: 'M-GL-4008', materialName: '4.0mm 镀膜背玻', accuracy: '方向错误', correctCount: 0, totalCount: 1, owner: '刘一鸣', status: '异常' }
          ],
          validVersions: [
            { scope: '总计', category: '全部', month: '2026-06', version: '2026-06预测版', materialCount: 218, targetMonths: '2026-07~2026-12', status: '有效', owner: '采购管理部' },
            { scope: '品类', category: '边框', month: '2026-06', version: '2026-06边框预测版', materialCount: 48, targetMonths: '2026-07~2026-12', status: '有效', owner: '王嘉宁' },
            { scope: '品类', category: '玻璃', month: '2026-06', version: '2026-06玻璃预测版', materialCount: 126, targetMonths: '2026-07~2026-12', status: '有效', owner: '沈佳怡' },
            { scope: '品类', category: '胶膜', month: '2026-06', version: '2026-06胶膜预测版', materialCount: 32, targetMonths: '2026-07~2026-12', status: '有效', owner: '李思锦' },
            { scope: '品类', category: '气体', month: '2026-06', version: '2026-06气体预测版', materialCount: 18, targetMonths: '2026-07~2026-12', status: '有效', owner: '赵金宇' },
            { scope: '品类', category: '化学品', month: '2026-06', version: '2026-06化学品预测版', materialCount: 26, targetMonths: '2026-07~2026-12', status: '有效', owner: '张炜' }
          ],
          deviationAlerts: [
            { id: 'AN-001', category: '玻璃', month: '2026-06', materialCode: 'M-GL-5206', materialName: '5.2mm 开孔钢化玻璃', type: '偏差异常', subject: '预测偏差率 6.8%', owner: '周航', level: '高', advice: '复盘 2026-05 预测版规则' },
            { id: 'AN-002', category: '玻璃', month: '2026-06', materialCode: 'M-GL-4008', materialName: '4.0mm 镀膜背玻', type: '方向判断错误', subject: '实际上涨，预测持平', owner: '刘一鸣', level: '中', advice: '调整镀膜费用预测规则' },
            { id: 'AN-003', category: '玻璃', month: '2026-05', materialCode: 'PC-202605-066', materialName: '预测单同步记录', type: '同步异常', subject: '订单测算同步失败', owner: '沈佳怡', level: '中', advice: '重推订单测算平台' }
          ],
          targetAchievement: [
            { scope: '总计', category: '全部', month: '2026-06', targetPrice: '-', actualPrice: '-', achievement: '76%', savingAmount: '128.6万', overrunAmount: '31.4万', owner: '采购管理部', status: '正常' },
            { scope: '品类', category: '边框', month: '2026-06', targetPrice: '-', actualPrice: '-', achievement: '80%', savingAmount: '18.5万', overrunAmount: '4.2万', owner: '王嘉宁', status: '正常' },
            { scope: '品类', category: '玻璃', month: '2026-06', targetPrice: '-', actualPrice: '-', achievement: '72%', savingAmount: '68.2万', overrunAmount: '24.8万', owner: '沈佳怡', status: '待提升' },
            { scope: '品类', category: '胶膜', month: '2026-06', targetPrice: '-', actualPrice: '-', achievement: '75%', savingAmount: '16.7万', overrunAmount: '8.9万', owner: '李思锦', status: '待提升' },
            { scope: '品类', category: '气体', month: '2026-06', targetPrice: '-', actualPrice: '-', achievement: '86%', savingAmount: '7.9万', overrunAmount: '1.2万', owner: '赵金宇', status: '正常' },
            { scope: '品类', category: '化学品', month: '2026-06', targetPrice: '-', actualPrice: '-', achievement: '79%', savingAmount: '17.3万', overrunAmount: '3.1万', owner: '张炜', status: '正常' }
          ]
        }
      };
    },
    computed: {
      categories() {
        return ['全部'].concat(categoryTrends.map((item) => item.category));
      },
      materialOptions() {
        return materials.filter((item) => this.selectedCategory === '全部' || item.category === this.selectedCategory);
      },
      activeMetricTitle() {
        const card = this.metricCards.find((item) => item.key === this.activeMetric);
        return card ? card.label + '明细报表' : '明细报表';
      },
      activeRows() {
        const rows = this.reports[this.activeMetric] || [];
        return rows.filter((row) => this.selectedCategory === '全部' || row.category === this.selectedCategory || row.category === '全部');
      },
      qualityRows() {
        const category = this.selectedCategory === '全部' ? '全部品类' : this.selectedCategory;
        return [
          { name: '方向一致', value: category === '玻璃' ? 78 : 82 },
          { name: '偏差超阈值', value: category === '玻璃' ? 14 : 11 },
          { name: '正式价缺失', value: category === '玻璃' ? 8 : 7 }
        ];
      }
    },
    watch: {
      selectedCategory() {
        if (!this.materialOptions.some((item) => item.code === this.selectedMaterial)) {
          this.selectedMaterial = this.materialOptions[0] ? this.materialOptions[0].code : '';
        }
        this.refreshCharts();
      },
      selectedMaterial() {
        this.refreshCharts();
      },
      trendMode() {
        this.refreshCharts();
      },
      timeRange() {
        this.refreshCharts();
      }
    },
    mounted() {
      this.$nextTick(this.initCharts);
      window.addEventListener('resize', this.resizeCharts);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.resizeCharts);
      if (this.trendChart) this.trendChart.dispose();
      if (this.qualityChart) this.qualityChart.dispose();
      this.reviewCharts.forEach((chart) => chart.dispose());
    },
    methods: {
      initCharts() {
        if (!window.echarts) {
          ElementPlus.ElMessage.warning('ECharts 未加载，图表降级为表格');
          return;
        }
        this.reviewCharts = Array.from(this.$el.querySelectorAll('[data-review-chart]')).map((el) => window.echarts.init(el));
        this.refreshCharts();
      },
      refreshCharts() {
        this.$nextTick(() => {
          this.renderTrendChart();
          this.renderReviewCharts();
        });
      },
      getMonthIndexes() {
        const start = months.indexOf(this.timeRange && this.timeRange[0]);
        const end = months.indexOf(this.timeRange && this.timeRange[1]);
        const from = start >= 0 ? start : 0;
        const to = end >= from ? end : months.length - 1;
        return { from, to };
      },
      renderTrendChart() {
        if (!this.trendChart) return;
        const { from, to } = this.getMonthIndexes();
        const xData = months.slice(from, to + 1);
        const selected = materials.find((item) => item.code === this.selectedMaterial) || materials[0];
        let legend = [];
        let series = [];

        if (this.trendMode === '物料走势') {
          legend = ['预测价', '正式价'];
          series = [
            { name: '预测价', type: 'line', smooth: true, data: selected.forecast.slice(from, to + 1) },
            { name: '正式价', type: 'line', smooth: true, data: selected.actual.slice(from, to + 1) }
          ];
        } else {
          const list = categoryTrends.filter((item) => this.selectedCategory === '全部' || item.category === this.selectedCategory);
          legend = list.map((item) => item.category);
          series = list.map((item) => ({
            name: item.category,
            type: 'line',
            smooth: true,
            lineStyle: { width: 3 },
            data: item.data.slice(from, to + 1)
          }));
        }

        this.trendChart.setOption({
          tooltip: { trigger: 'axis' },
          legend: { data: legend, top: 0 },
          grid: { left: 42, right: 24, top: 50, bottom: 36 },
          xAxis: { type: 'category', data: xData },
          yAxis: { type: 'value' },
          series
        }, true);
      },
      renderQualityChart() {
        if (!this.qualityChart) return;
        this.qualityChart.setOption({
          tooltip: { trigger: 'item' },
          legend: { bottom: 0 },
          series: [{
            type: 'pie',
            radius: ['42%', '68%'],
            data: this.qualityRows
          }]
        }, true);
      },
      renderReviewCharts() {
        if (!this.reviewCharts.length) return;
        const xData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月'];
        this.reviewCharts.forEach((chart, index) => {
          const card = this.reviewCards[index];
          if (!card) return;
          chart.setOption({
            tooltip: { trigger: 'axis' },
            legend: { bottom: 0, data: ['执行价', '预测价'] },
            grid: { left: 34, right: 16, top: 18, bottom: 54 },
            xAxis: { type: 'category', data: xData, axisLabel: { rotate: 45 } },
            yAxis: { type: 'value', splitLine: { lineStyle: { color: '#e5e7eb' } } },
            series: [
              { name: '执行价', type: 'line', smooth: true, data: card.exec, itemStyle: { color: '#22c55e' }, lineStyle: { width: 3 } },
              { name: '预测价', type: 'line', smooth: true, data: card.forecast, itemStyle: { color: '#f59e0b' }, lineStyle: { width: 3 } }
            ]
          }, true);
        });
      },
      resizeCharts() {
        if (this.trendChart) this.trendChart.resize();
        if (this.qualityChart) this.qualityChart.resize();
        this.reviewCharts.forEach((chart) => chart.resize());
      },
      selectMetric(key) {
        this.activeMetric = key;
      },
      openRow(row) {
        this.current = row;
        this.drawerVisible = true;
      },
      exportReport() {
        const card = this.metricCards.find((item) => item.key === this.activeMetric);
        ElementPlus.ElMessage.success('已导出' + (card ? card.label : '') + '报表');
      },
      directionCells(row) {
        return row.summary ? ['', '', '', '', '', '', '', '', '', '', ''] : row.directions;
      }
    },
    template: `
      <div class="monitoring-dashboard-shell">
        <section class="control-panel flow-panel-shell" data-tour="analytics-filter">
          <div class="panel-body">
            <div class="filter-bar">
              <el-select v-model="selectedCategory" placeholder="品类" style="width: 180px" :teleported="false">
                <el-option v-for="item in categories" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-select v-model="trendMode" style="width: 180px" :teleported="false">
                <el-option label="物料价格走势" value="物料走势"></el-option>
                <el-option label="品类均价走势" value="品类均价走势"></el-option>
              </el-select>
              <el-select v-model="selectedMaterial" placeholder="选择物料编码" style="width: 300px" :disabled="trendMode !== '物料走势'" :teleported="false">
                <el-option v-for="item in materialOptions" :key="item.code" :label="item.code + ' / ' + item.name" :value="item.code"></el-option>
              </el-select>
              <el-date-picker v-model="timeRange" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份" value-format="YYYY-MM" format="YYYY-MM" :teleported="false"></el-date-picker>
              <el-button type="primary" @click="refreshCharts">查询</el-button>
            </div>
          </div>
        </section>

        <section class="kpi-grid" data-tour="analytics-kpi">
          <div v-for="card in metricCards" :key="card.key" class="kpi-card is-clickable" :class="{ 'is-active': activeMetric === card.key, 'is-success': card.success, 'is-warning': card.warning }" @click="selectMetric(card.key)">
            <div class="kpi-icon"><i :class="card.icon"></i></div>
            <div class="kpi-content">
              <div class="kpi-label">{{ card.label }}</div>
              <div class="kpi-value">{{ card.value }}</div>
              <div class="kpi-sub">{{ card.sub }}</div>
            </div>
          </div>
        </section>

        <section class="flow-panel-shell" data-tour="analytics-chart">
          <div class="panel-head">
            <div class="panel-title"><span class="bar"></span>价格预测复盘</div>
            <div class="config-section-actions">
              <el-tag type="success">11月各品类价格预测方向性判断准确率 100%</el-tag>
              <el-tag type="info">常规产品均值 0.89% / 大宗类均值 9.20%</el-tag>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:46% 54%;gap:16px;align-items:start;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div v-for="(card, index) in reviewCards" :key="card.title" style="border:1px solid #d8e1ee;background:#fff;padding:10px;">
                <div style="text-align:center;font-weight:700;color:#6b7280;font-size:18px;margin-bottom:4px;">{{ card.title }}</div>
                <div data-review-chart style="height:190px;"></div>
              </div>
            </div>
            <div class="flow-grid-table-wrap" style="max-height:460px;overflow:auto;border:1px solid #111;background:#fff;">
              <table style="border-collapse:collapse;width:100%;min-width:820px;font-size:12px;text-align:center;">
                <thead>
                  <tr style="background:#cfe7c1;">
                    <th rowspan="2" style="border:1px solid #111;width:42px;">序号</th>
                    <th rowspan="2" style="border:1px solid #111;width:70px;">品类</th>
                    <th colspan="11" style="border:1px solid #111;">实际与预测偏差率</th>
                    <th colspan="11" style="border:1px solid #111;">方向性判断</th>
                  </tr>
                  <tr style="background:#cfe7c1;">
                    <th v-for="m in ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月']" :key="'d'+m" style="border:1px solid #111;">{{ m }}</th>
                    <th v-for="m in ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月']" :key="'j'+m" style="border:1px solid #111;">{{ m }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in matrixRows" :key="row.no + row.category" :style="{ fontWeight: row.summary ? '700' : '500' }">
                    <td style="border:1px solid #111;">{{ row.no }}</td>
                    <td style="border:1px solid #111;">{{ row.category }}</td>
                    <td v-for="(value, index) in row.deviations" :key="row.category + 'dev' + index" style="border:1px solid #111;white-space:normal;">{{ value }}</td>
                    <td v-for="(value, index) in directionCells(row)" :key="row.category + 'dir' + index" style="border:1px solid #111;color:#22c55e;font-weight:700;">{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <el-drawer v-model="drawerVisible" title="报表明细" size="36%">
          <el-descriptions :column="1" border v-if="current">
            <el-descriptions-item v-for="(value, key) in current" :key="key" :label="key">{{ value }}</el-descriptions-item>
          </el-descriptions>
        </el-drawer>
      </div>
    `
  });

  ChintPrototypeShell.registerRoute({
    path: '#/cost/analytics',
    name: '价格分析看板',
    menuKey: 'analyticsDashboard',
    component: componentName,
    breadcrumbs: ['采购云成本管理', '台账分析', '价格分析看板'],
    tabInfo: '按价格预测复盘口径展示多品类预测/执行价走势图，以及按月份展开的偏差率和方向性判断矩阵。',
    guideSteps: [
      { target: '[data-tour="analytics-filter"]', title: '联动筛选', description: '按时间、品类、物料编码和走势口径筛选看板。' },
      { target: '[data-tour="analytics-kpi"]', title: '指标入口', description: '点击指标卡后，下方报表展示该指标的总览和分品类明细。' },
      { target: '[data-tour="analytics-chart"]', title: '价格预测复盘', description: '左侧展示硅片、玻璃、胶膜、银浆等品类执行价/预测价小走势图，右侧展示偏差率和方向性判断矩阵。' }
    ],
    noteSections: [
      { title: '业务目标与适用角色', content: '本页面向品类负责人和采购领导提供价格走势、预实对比、价差分析和目标绩效视图。' },
      { title: '分析口径', content: '复盘矩阵按品类和月份展示实际与预测偏差率，并在同一行展示方向性判断结果。' },
      { title: '报表联动', content: '顶部筛选用于收敛复盘口径，复盘小图和矩阵表用于向管理层说明各品类价格预测质量。' }
    ]
  });
})(window);

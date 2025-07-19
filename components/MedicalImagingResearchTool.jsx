import React, { useState, useEffect, useRef } from 'react';
import { Plus, Upload, Download, Calculator, BarChart3, FileText, Settings, Trash2, Eye, Edit2, Save, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, BarChart, Bar, ResponsiveContainer } from 'recharts';

const MedicalImagingResearchTool = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [studyDesign, setStudyDesign] = useState({
    title: '',
    objective: '',
    hypothesis: '',
    studyType: 'observational',
    sampleSize: '',
    inclusionCriteria: '',
    exclusionCriteria: '',
    imagingModality: 'CT',
    primaryEndpoint: '',
    secondaryEndpoints: ''
  });
  
  const [datasets, setDatasets] = useState([]);
  const [currentDataset, setCurrentDataset] = useState(null);
  const [analysisResults, setAnalysisResults] = useState({});
  const [correlationResults, setCorrelationResults] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const fileInputRef = useRef(null);

  // 添加新数据集
  const addDataset = () => {
    const newDataset = {
      id: Date.now(),
      name: `数据集 ${datasets.length + 1}`,
      data: [],
      variables: []
    };
    setDatasets([...datasets, newDataset]);
    setCurrentDataset(newDataset);
  };

  // 处理文件上传
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          alert('文件内容不足，需要至少包含标题行和一行数据');
          return;
        }

        // 解析CSV
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const data = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const row = { id: index + 1 };
          
          headers.forEach((header, i) => {
            const value = values[i];
            // 尝试转换为数字
            const numValue = parseFloat(value);
            row[header] = !isNaN(numValue) ? numValue : value;
          });
          
          return row;
        });

        // 识别数值变量
        const numericVariables = headers.filter(header => {
          return data.some(row => typeof row[header] === 'number');
        });

        const newDataset = {
          id: Date.now(),
          name: file.name.replace(/\.[^/.]+$/, ""),
          data: data,
          variables: numericVariables
        };

        setDatasets([...datasets, newDataset]);
        setCurrentDataset(newDataset);
        
        // 清除文件输入
        event.target.value = '';
        
        alert(`成功导入 ${data.length} 条记录，${numericVariables.length} 个数值变量`);
      } catch (error) {
        alert('文件解析失败，请确保是有效的CSV格式');
        console.error('文件解析错误:', error);
      }
    };
    
    reader.readAsText(file);
  };

  // 生成示例数据
  const generateSampleData = () => {
    const sampleData = [];
    for (let i = 1; i <= 50; i++) {
      sampleData.push({
        id: i,
        patientId: `P${String(i).padStart(3, '0')}`,
        age: Math.floor(Math.random() * 40) + 30,
        gender: Math.random() > 0.5 ? 'M' : 'F',
        tumorSize: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
        density: parseFloat((Math.random() * 100 + 50).toFixed(1)),
        contrast: parseFloat((Math.random() * 50 + 25).toFixed(1)),
        adcValue: Math.floor(Math.random() * 2000 + 500),
        lesionType: Math.random() > 0.6 ? 'malignant' : 'benign',
        outcome: Math.random() > 0.7 ? 'positive' : 'negative'
      });
    }
    
    if (currentDataset) {
      const updatedDataset = {
        ...currentDataset,
        data: sampleData,
        variables: ['age', 'tumorSize', 'density', 'contrast', 'adcValue']
      };
      setDatasets(datasets.map(d => d.id === currentDataset.id ? updatedDataset : d));
      setCurrentDataset(updatedDataset);
    }
  };

  // 添加新行
  const addNewRow = () => {
    if (!currentDataset) return;
    
    const newRow = { id: currentDataset.data.length + 1 };
    // 为每个变量添加默认值
    if (currentDataset.data.length > 0) {
      Object.keys(currentDataset.data[0]).forEach(key => {
        if (key !== 'id') {
          newRow[key] = typeof currentDataset.data[0][key] === 'number' ? 0 : '';
        }
      });
    }
    
    const updatedDataset = {
      ...currentDataset,
      data: [...currentDataset.data, newRow]
    };
    
    setDatasets(datasets.map(d => d.id === currentDataset.id ? updatedDataset : d));
    setCurrentDataset(updatedDataset);
  };

  // 删除行
  const deleteRow = (rowIndex) => {
    if (!currentDataset) return;
    
    const updatedData = currentDataset.data.filter((_, index) => index !== rowIndex);
    const updatedDataset = {
      ...currentDataset,
      data: updatedData
    };
    
    setDatasets(datasets.map(d => d.id === currentDataset.id ? updatedDataset : d));
    setCurrentDataset(updatedDataset);
  };

  // 编辑单元格
  const startEdit = (rowIndex, column, value) => {
    setEditingCell({ rowIndex, column });
    setEditValue(value?.toString() || '');
  };

  const saveEdit = () => {
    if (!editingCell || !currentDataset) return;
    
    const { rowIndex, column } = editingCell;
    const updatedData = [...currentDataset.data];
    
    // 尝试转换为数字
    const numValue = parseFloat(editValue);
    updatedData[rowIndex][column] = !isNaN(numValue) ? numValue : editValue;
    
    const updatedDataset = {
      ...currentDataset,
      data: updatedData
    };
    
    setDatasets(datasets.map(d => d.id === currentDataset.id ? updatedDataset : d));
    setCurrentDataset(updatedDataset);
    setEditingCell(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  // 导出数据
  const exportDataset = () => {
    if (!currentDataset || currentDataset.data.length === 0) return;
    
    const headers = Object.keys(currentDataset.data[0]);
    const csvContent = [
      headers.join(','),
      ...currentDataset.data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${currentDataset.name}.csv`;
    link.click();
  };

  // 计算描述性统计
  const calculateDescriptiveStats = (data, variable) => {
    const values = data.map(d => d[variable]).filter(v => typeof v === 'number');
    if (values.length === 0) return null;
    
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (values.length - 1);
    const std = Math.sqrt(variance);
    
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = sortedValues.length % 2 === 0 
      ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
      : sortedValues[Math.floor(sortedValues.length / 2)];
    
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    return { mean, std, median, min, max, count: values.length };
  };

  // 计算相关性
  const calculateCorrelation = (data, var1, var2) => {
    const pairs = data.map(d => [d[var1], d[var2]]).filter(pair => 
      typeof pair[0] === 'number' && typeof pair[1] === 'number'
    );
    
    if (pairs.length < 3) return null;
    
    const x = pairs.map(p => p[0]);
    const y = pairs.map(p => p[1]);
    
    const n = pairs.length;
    const sumX = x.reduce((sum, val) => sum + val, 0);
    const sumY = y.reduce((sum, val) => sum + val, 0);
    const sumXY = pairs.reduce((sum, pair) => sum + pair[0] * pair[1], 0);
    const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
    const sumY2 = y.reduce((sum, val) => sum + val * val, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    if (denominator === 0) return null;
    
    const r = numerator / denominator;
    
    // 计算p值的简化版本
    const t = Math.abs(r) * Math.sqrt((n - 2) / (1 - r * r));
    let p;
    if (t < 1) p = 0.5;
    else if (t < 2) p = 0.1;
    else if (t < 3) p = 0.01;
    else p = 0.001;
    
    return { r, p, n };
  };

  // 运行统计分析
  const runStatisticalAnalysis = () => {
    if (!currentDataset || currentDataset.data.length === 0) return;
    
    const results = {};
    
    // 描述性统计
    currentDataset.variables.forEach(variable => {
      results[variable] = calculateDescriptiveStats(currentDataset.data, variable);
    });
    
    setAnalysisResults(results);
    
    // 相关性分析
    const correlations = {};
    const variables = currentDataset.variables;
    
    for (let i = 0; i < variables.length; i++) {
      for (let j = i + 1; j < variables.length; j++) {
        const var1 = variables[i];
        const var2 = variables[j];
        const correlation = calculateCorrelation(currentDataset.data, var1, var2);
        if (correlation) {
          correlations[`${var1}_${var2}`] = { var1, var2, ...correlation };
        }
      }
    }
    
    setCorrelationResults(correlations);
  };

  // 生成论文报告
  const generateReport = () => {
    const report = `
# ${studyDesign.title || '医学影像研究报告'}

## 研究设计
**研究目的**: ${studyDesign.objective}
**研究假设**: ${studyDesign.hypothesis}
**研究类型**: ${studyDesign.studyType}
**样本量**: ${studyDesign.sampleSize}
**影像模式**: ${studyDesign.imagingModality}

## 方法
**纳入标准**: ${studyDesign.inclusionCriteria}
**排除标准**: ${studyDesign.exclusionCriteria}
**主要终点**: ${studyDesign.primaryEndpoint}
**次要终点**: ${studyDesign.secondaryEndpoints}

## 结果
### 描述性统计
${Object.entries(analysisResults).map(([variable, stats]) => 
  stats ? `**${variable}**: 均值 ${stats.mean.toFixed(2)} ± ${stats.std.toFixed(2)}, 中位数 ${stats.median.toFixed(2)} (范围: ${stats.min.toFixed(2)}-${stats.max.toFixed(2)})` : ''
).join('\n')}

### 相关性分析
${Object.entries(correlationResults).map(([key, corr]) => 
  `**${corr.var1} vs ${corr.var2}**: r = ${corr.r.toFixed(3)}, p = ${corr.p.toFixed(3)} ${corr.p < 0.05 ? '(显著)' : '(不显著)'}`
).join('\n')}

## 讨论
[根据研究结果撰写讨论部分]

## 结论
[根据统计分析结果撰写结论]
    `;
    
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '医学影像研究报告.md';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BarChart3 className="w-8 h-8" />
              医学影像研究分析工具 (增强版)
            </h1>
            <p className="text-blue-100 mt-2">支持CSV导入、在线编辑和完整数据管理功能</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b bg-gray-50 overflow-x-auto">
            {[
              { id: 'design', label: '研究设计', icon: Settings },
              { id: 'data', label: '数据管理', icon: Upload },
              { id: 'analysis', label: '统计分析', icon: Calculator },
              { id: 'visualization', label: '数据可视化', icon: BarChart3 },
              { id: 'report', label: '论文报告', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'design' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">研究设计</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">研究标题</label>
                    <input
                      type="text"
                      value={studyDesign.title}
                      onChange={(e) => setStudyDesign({...studyDesign, title: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="输入研究标题"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">研究类型</label>
                    <select
                      value={studyDesign.studyType}
                      onChange={(e) => setStudyDesign({...studyDesign, studyType: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="observational">观察性研究</option>
                      <option value="interventional">干预性研究</option>
                      <option value="retrospective">回顾性研究</option>
                      <option value="prospective">前瞻性研究</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">影像模式</label>
                    <select
                      value={studyDesign.imagingModality}
                      onChange={(e) => setStudyDesign({...studyDesign, imagingModality: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="CT">CT</option>
                      <option value="MRI">MRI</option>
                      <option value="PET">PET</option>
                      <option value="Ultrasound">超声</option>
                      <option value="X-ray">

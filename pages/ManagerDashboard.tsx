import React from 'react';
import { MOCK_LOGS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const ManagerDashboard: React.FC = () => {
  // Mock Data for Charts
  const statusData = [
    { name: 'Pendente', value: 5 },
    { name: 'Em Andamento', value: 12 },
    { name: 'Aguard. Peças', value: 8 },
    { name: 'Concluído', value: 20 },
  ];
  const COLORS = ['#94a3b8', '#3b82f6', '#f59e0b', '#10b981'];

  const performanceData = [
    { name: 'Seg', orders: 4 },
    { name: 'Ter', orders: 7 },
    { name: 'Qua', orders: 5 },
    { name: 'Qui', orders: 9 },
    { name: 'Sex', orders: 12 },
  ];

  return (
    <div className="space-y-8">
      
      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Total de Pedidos</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">24</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                <FileText size={24} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Problemas Críticos</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">3</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-full">
                <AlertTriangle size={24} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Concluídos (Fev)</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">45</p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
                <CheckCircle size={24} />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Tempo Médio</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">2.4d</p>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
                <Clock size={24} />
            </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
            <h3 className="font-bold text-slate-800 mb-6">Distribuição de Status</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
            <h3 className="font-bold text-slate-800 mb-6">Produtividade Semanal</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="orders" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Logs do Sistema e Atividade</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                    <tr>
                        <th className="px-6 py-3">Horário</th>
                        <th className="px-6 py-3">Ação</th>
                        <th className="px-6 py-3">Usuário</th>
                        <th className="px-6 py-3">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_LOGS.map((log) => (
                        <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">{log.timestamp}</td>
                            <td className="px-6 py-4 text-slate-600">{log.action}</td>
                            <td className="px-6 py-4 text-slate-500">{log.user}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                    ${log.type === 'INFO' ? 'bg-blue-100 text-blue-700' : 
                                      log.type === 'AVISO' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                    }
                                `}>
                                    {log.type}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
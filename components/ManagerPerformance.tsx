
import React from 'react';
import { MOCK_TECH_STATS, MOCK_REVENUE_DATA } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, DollarSign, Clock, Star } from 'lucide-react';

const ManagerPerformance: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Receita Mensal</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">R$ 20.600</h3>
                            <span className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-1">
                                <TrendingUp size={12} /> +12% vs mês anterior
                            </span>
                        </div>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <DollarSign size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Satisfação (NPS)</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">4.8/5.0</h3>
                            <span className="text-xs text-slate-400 mt-1">Baseado em 45 avaliações</span>
                        </div>
                        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                            <Star size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Tempo Médio Reparo</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">2.1 Dias</h3>
                            <span className="text-xs text-green-600 font-semibold mt-1">-0.5 dias (Otimizado)</span>
                        </div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Clock size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Equipe Ativa</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">3 Técnicos</h3>
                            <span className="text-xs text-slate-400 mt-1">100% de capacidade</span>
                        </div>
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Users size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Revenue vs Costs */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-96">
                    <h3 className="font-bold text-slate-800 mb-6">Financeiro (Último Mês)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Legend verticalAlign="top" height={36}/>
                            <Area type="monotone" dataKey="revenue" name="Receita" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorRevenue)" />
                            <Area type="monotone" dataKey="costs" name="Custos" stroke="#ef4444" fillOpacity={1} fill="url(#colorCosts)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Technician Productivity */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-96">
                    <h3 className="font-bold text-slate-800 mb-6">Produtividade por Técnico</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MOCK_TECH_STATS} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0"/>
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 14, fontWeight: 500}} width={80} />
                            <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Bar dataKey="tasks" name="Tarefas Concluídas" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Team Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Ranking de Desempenho Técnico</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Técnico</th>
                                <th className="px-6 py-4">OS Concluídas</th>
                                <th className="px-6 py-4">Tempo Médio</th>
                                <th className="px-6 py-4">Avaliação Cliente</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_TECH_STATS.map((tech, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">{tech.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{tech.tasks}</td>
                                    <td className="px-6 py-4 text-slate-600">{tech.avgTime}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-yellow-600 font-bold">
                                            <span>{tech.rating}</span>
                                            <Star size={14} fill="currentColor" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Ativo</span>
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

export default ManagerPerformance;

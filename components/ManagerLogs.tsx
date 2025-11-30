
import React, { useState } from 'react';
import { MOCK_LOGS } from '../constants';
import { Search, Filter, Download, AlertTriangle, Info, XCircle, Shield } from 'lucide-react';

const ManagerLogs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'ALL' | 'INFO' | 'AVISO' | 'ERRO'>('ALL');

    const filteredLogs = MOCK_LOGS.filter(log => {
        const matchesSearch = 
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
            log.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'ALL' || log.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const getIcon = (type: string) => {
        switch (type) {
            case 'INFO': return <Info size={16} className="text-blue-500" />;
            case 'AVISO': return <AlertTriangle size={16} className="text-yellow-500" />;
            case 'ERRO': return <XCircle size={16} className="text-red-500" />;
            default: return <Info size={16} />;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Header / Controls */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Pesquisar por ação ou usuário..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-1">
                        <button 
                            onClick={() => setTypeFilter('ALL')}
                            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${typeFilter === 'ALL' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Todos
                        </button>
                        <button 
                            onClick={() => setTypeFilter('INFO')}
                            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${typeFilter === 'INFO' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Info
                        </button>
                        <button 
                            onClick={() => setTypeFilter('AVISO')}
                            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${typeFilter === 'AVISO' ? 'bg-yellow-50 text-yellow-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Avisos
                        </button>
                        <button 
                            onClick={() => setTypeFilter('ERRO')}
                            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${typeFilter === 'ERRO' ? 'bg-red-50 text-red-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Erros
                        </button>
                    </div>

                    <button 
                        onClick={() => alert('Exportando logs para CSV...')}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                        <Download size={16} /> Exportar
                    </button>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900 text-slate-300 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Timestamp</th>
                                <th className="px-6 py-3 font-semibold">Nível</th>
                                <th className="px-6 py-3 font-semibold">Ação / Evento</th>
                                <th className="px-6 py-3 font-semibold">Usuário / Origem</th>
                                <th className="px-6 py-3 font-semibold text-right">ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLogs.map(log => (
                                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-slate-500 text-xs">
                                        {log.timestamp}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {getIcon(log.type)}
                                            <span className={`text-xs font-bold 
                                                ${log.type === 'INFO' ? 'text-blue-700' : 
                                                  log.type === 'AVISO' ? 'text-yellow-700' : 'text-red-700'}
                                            `}>
                                                {log.type}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 font-medium">
                                        {log.action}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Shield size={14} className="text-slate-400" />
                                            {log.user}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-xs text-right font-mono">
                                        #{log.id}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {filteredLogs.length === 0 && (
                        <div className="p-12 text-center text-slate-500 bg-slate-50">
                            <Filter className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                            <p>Nenhum registro encontrado com os filtros atuais.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="text-center text-xs text-slate-400">
                Mostrando {filteredLogs.length} registros. Logs são retidos por 90 dias.
            </div>
        </div>
    );
};

export default ManagerLogs;

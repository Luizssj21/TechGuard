import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { getDiagnosticSuggestion } from '../services/geminiService';
import { Bot, Save, AlertCircle, Cpu } from 'lucide-react';
import { OrderStatus } from '../types';

const TechnicianDashboard: React.FC = () => {
  // We use local state to simulate database updates
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState(MOCK_ORDERS[0].id);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleRunDiagnostics = async () => {
    setLoadingAi(true);
    setAiAnalysis(null);
    const result = await getDiagnosticSuggestion(selectedOrder.issueDescription, selectedOrder.deviceModel);
    setAiAnalysis(result);
    setLoadingAi(false);
  };

  const handleStatusUpdate = (newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === selectedOrderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    // Optional: Show a toast or alert
    // alert(`Status de ${selectedOrder.id} atualizado para ${newStatus}`);
  };

  const workflowActions = [
    { label: 'Iniciar Diagnóstico', status: OrderStatus.DIAGNOSIS },
    { label: 'Solicitar Peças', status: OrderStatus.PARTS_PURCHASE },
    { label: 'Iniciar Montagem', status: OrderStatus.ASSEMBLY },
    { label: 'Pronto para Entrega', status: OrderStatus.TRANSPORT }, // Or COMPLETED depending on flow
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Order List */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="font-semibold text-slate-700 mb-4">Ordens de Serviço Ativas</h2>
        {orders.map(order => (
          <div 
            key={order.id}
            onClick={() => {
                setSelectedOrderId(order.id);
                setAiAnalysis(null);
            }}
            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
              selectedOrder.id === order.id ? 'bg-white border-primary-500 shadow-md ring-1 ring-primary-200' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex justify-between mb-2">
                <span className="font-bold text-slate-800">{order.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${order.priority === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                    {order.priority}
                </span>
            </div>
            <p className="text-sm font-medium text-slate-600">{order.deviceModel}</p>
            <p className="text-xs text-slate-400 mt-1">{order.status}</p>
          </div>
        ))}
      </div>

      {/* Main Workspace */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Order Details Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Bancada: {selectedOrder.deviceModel}</h2>
                    <p className="text-slate-500 text-sm">Cliente: {selectedOrder.customerName}</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Save size={16} /> Salvar Status
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase">Problema Relatado</label>
                        <p className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200 mt-1">
                            {selectedOrder.issueDescription}
                        </p>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase">Detalhes</label>
                        <div className="mt-1 space-y-2 text-sm">
                            <div className="flex justify-between border-b border-slate-100 py-1">
                                <span>Backup Necessário:</span>
                                <span className={selectedOrder.backupRequired ? 'text-orange-600 font-bold' : 'text-slate-600'}>
                                    {selectedOrder.backupRequired ? 'SIM' : 'NÃO'}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 py-1">
                                <span>Prioridade:</span>
                                <span>{selectedOrder.priority}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 py-1">
                                <span>Status Atual:</span>
                                <span className="font-medium text-primary-600">{selectedOrder.status}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Assistant Section */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1.5 rounded-lg text-white">
                            <Bot size={18} />
                        </div>
                        <h3 className="font-bold text-slate-800">Assistente TechGuard AI</h3>
                    </div>
                    
                    {!aiAnalysis && !loadingAi && (
                        <div className="text-center py-6">
                            <p className="text-sm text-slate-500 mb-4">Precisa de ajuda no diagnóstico?</p>
                            <button 
                                onClick={handleRunDiagnostics}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 shadow-sm rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-indigo-600"
                            >
                                <Cpu size={16} /> Rodar Diagnóstico IA
                            </button>
                        </div>
                    )}

                    {loadingAi && (
                        <div className="flex flex-col items-center justify-center py-6 space-y-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                            <span className="text-xs text-indigo-600 font-medium animate-pulse">Analisando sintomas com Gemini...</span>
                        </div>
                    )}

                    {aiAnalysis && (
                        <div className="animate-fade-in">
                            <div className="text-sm text-slate-700 prose prose-sm max-w-none prose-ul:pl-4 prose-ul:list-disc bg-white p-3 rounded border border-slate-200 shadow-inner max-h-64 overflow-y-auto"
                                dangerouslySetInnerHTML={{ __html: aiAnalysis }}
                            />
                            <button 
                                onClick={() => setAiAnalysis(null)}
                                className="mt-3 text-xs text-slate-400 underline hover:text-indigo-500"
                            >
                                Limpar Análise
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Action Buttons for Workflow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {workflowActions.map((action, i) => (
                 <button 
                    key={i} 
                    onClick={() => handleStatusUpdate(action.status)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-all text-center
                        ${selectedOrder.status === action.status 
                            ? 'bg-primary-50 border-primary-500 text-primary-700 ring-1 ring-primary-200' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-primary-500 hover:text-primary-600 hover:shadow-sm'}
                    `}
                 >
                     {action.label}
                 </button>
             ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
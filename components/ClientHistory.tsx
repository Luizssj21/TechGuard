
import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { OrderStatus, ServiceOrder } from '../types';
import { FileText, Download, Calendar, X, CheckCircle, PenTool, DollarSign, Printer, CreditCard } from 'lucide-react';

const ClientHistory: React.FC = () => {
    // Simulate completed orders (history)
    const completedOrders = MOCK_ORDERS.filter(o => o.status === OrderStatus.COMPLETED);
    
    const displayOrders = completedOrders.length > 0 ? completedOrders : [
        {
            id: 'OS-2024-098',
            customerName: 'Enzo Melo',
            deviceModel: 'iPhone 13 Pro',
            issueDescription: 'Troca de Bateria e Tela',
            status: OrderStatus.COMPLETED,
            createdAt: '15/12/2024',
            estimatedCompletion: '18/12/2024',
            backupRequired: false,
            priority: 'Baixa' as const
        }
    ];

    const [selectedReport, setSelectedReport] = useState<ServiceOrder | null>(null);
    const [selectedInvoice, setSelectedInvoice] = useState<ServiceOrder | null>(null);

    // Mock pricing generator
    const getInvoiceDetails = (orderId: string) => {
        // Deterministic mock based on ID char codes to keep it consistent
        const seed = orderId.charCodeAt(orderId.length - 1); 
        return {
            labor: 100 + (seed * 2),
            parts: 200 + (seed * 5),
            discount: seed > 55 ? 50 : 0
        };
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FileText className="text-primary-500" />
                    Arquivo de Serviços
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                    Abaixo estão listados todos os serviços concluídos. Você pode baixar a fatura ou ver o relatório técnico de cada um.
                </p>

                <div className="space-y-4">
                    {displayOrders.map(order => (
                        <div key={order.id} className="border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-slate-50 transition-colors">
                            <div className="mb-4 md:mb-0">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-slate-800">{order.deviceModel}</span>
                                    <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-semibold border border-green-200">
                                        Concluído
                                    </span>
                                </div>
                                <div className="text-sm text-slate-500 mt-1">ID: {order.id} • {order.issueDescription}</div>
                                <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                                    <Calendar size={12} />
                                    <span>Finalizado em: {order.estimatedCompletion}</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-2 w-full md:w-auto">
                                <button 
                                    onClick={() => setSelectedReport(order)}
                                    className="flex-1 md:flex-none justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    <FileText size={16} /> Relatório
                                </button>
                                <button 
                                    onClick={() => setSelectedInvoice(order)}
                                    className="flex-1 md:flex-none justify-center items-center gap-2 px-3 py-2 bg-primary-50 border border-primary-200 rounded-lg text-sm text-primary-700 hover:bg-primary-100 transition-colors"
                                >
                                    <DollarSign size={16} /> Fatura
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Technical Report Modal */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Relatório Técnico</h3>
                                <p className="text-sm text-slate-500">Ordem de Serviço: {selectedReport.id}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedReport(null)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Dispositivo</p>
                                    <p className="font-medium text-slate-800">{selectedReport.deviceModel}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Cliente</p>
                                    <p className="font-medium text-slate-800">{selectedReport.customerName}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <CheckCircle size={18} className="text-green-600" />
                                    Serviços Executados
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-600 border-l-2 border-slate-200 pl-4">
                                    <li>• Diagnóstico inicial de hardware e software.</li>
                                    <li>• {selectedReport.issueDescription} (Resolvido).</li>
                                    <li>• Limpeza interna e externa dos componentes.</li>
                                    <li>• Testes de stress e validação de desempenho.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <PenTool size={18} className="text-blue-600" />
                                    Peças Utilizadas
                                </h4>
                                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-4 py-2 font-medium text-slate-500">Item</th>
                                                <th className="px-4 py-2 font-medium text-slate-500 text-right">Qtd</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr>
                                                <td className="px-4 py-2 text-slate-700">Kit de Limpeza</td>
                                                <td className="px-4 py-2 text-slate-700 text-right">1</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2 text-slate-700">Pasta Térmica Premium</td>
                                                <td className="px-4 py-2 text-slate-700 text-right">1</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-end">
                            <button 
                                onClick={() => setSelectedReport(null)}
                                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-sm font-medium transition-colors"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Invoice Modal */}
            {selectedInvoice && (() => {
                const prices = getInvoiceDetails(selectedInvoice.id);
                const total = prices.labor + prices.parts - prices.discount;

                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                            {/* Invoice Header */}
                            <div className="bg-slate-900 text-white p-6 rounded-t-lg flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight">TechGuard</h2>
                                    <p className="text-slate-400 text-xs mt-1">Soluções em Manutenção</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-300">FATURA</p>
                                    <p className="text-lg font-bold">#{selectedInvoice.id.replace('OS-', 'FAT-')}</p>
                                </div>
                            </div>

                            <div className="p-8 space-y-6 overflow-y-auto">
                                {/* Bill To */}
                                <div className="flex justify-between text-sm">
                                    <div>
                                        <p className="text-slate-500 mb-1">Faturado para:</p>
                                        <p className="font-bold text-slate-800">{selectedInvoice.customerName}</p>
                                        <p className="text-slate-600">Montes Claros, MG</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-slate-500 mb-1">Data de Emissão:</p>
                                        <p className="font-bold text-slate-800">{selectedInvoice.estimatedCompletion}</p>
                                    </div>
                                </div>

                                {/* Line Items */}
                                <div>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-200">
                                                <th className="text-left py-2 text-slate-500 font-medium">Descrição</th>
                                                <th className="text-right py-2 text-slate-500 font-medium">Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr>
                                                <td className="py-3 text-slate-700">Manutenção ({selectedInvoice.deviceModel})</td>
                                                <td className="py-3 text-right text-slate-700">R$ {prices.labor.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 text-slate-700">Peças de Reposição</td>
                                                <td className="py-3 text-right text-slate-700">R$ {prices.parts.toFixed(2)}</td>
                                            </tr>
                                            {prices.discount > 0 && (
                                                <tr>
                                                    <td className="py-3 text-green-600">Desconto Fidelidade</td>
                                                    <td className="py-3 text-right text-green-600">- R$ {prices.discount.toFixed(2)}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Total */}
                                <div className="border-t-2 border-slate-900 pt-4 flex justify-between items-center">
                                    <div className="text-slate-500 text-sm">
                                        <p>Forma de Pagamento: PIX</p>
                                        <p className="text-xs mt-1">Status: <span className="text-green-600 font-bold">PAGO</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500">Total</p>
                                        <p className="text-2xl font-bold text-slate-900">R$ {total.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-4 bg-slate-50 rounded-b-lg border-t border-slate-200 flex gap-3 justify-end">
                                <button 
                                    onClick={() => setSelectedInvoice(null)}
                                    className="px-4 py-2 text-slate-600 hover:text-slate-800 text-sm font-medium"
                                >
                                    Fechar
                                </button>
                                <button 
                                    onClick={() => {
                                        alert("Iniciando impressão do documento...");
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                                >
                                    <Printer size={16} /> Imprimir / PDF
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
};

export default ClientHistory;

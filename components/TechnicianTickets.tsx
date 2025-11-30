
import React, { useState } from 'react';
import { MOCK_TICKETS } from '../constants';
import { Ticket } from '../types';
import { Search, MessageCircle, User, CheckCircle, Clock, XCircle } from 'lucide-react';

const TechnicianTickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    const handleStatusChange = (id: string, newStatus: Ticket['status']) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
        if (selectedTicket && selectedTicket.id === id) {
            setSelectedTicket({ ...selectedTicket, status: newStatus });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            
            {/* Ticket List */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-slate-700 mb-3">Fila de Chamados</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Buscar solicitante ou ID..." 
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                </div>
                
                <div className="overflow-y-auto flex-1 p-2 space-y-2">
                    {tickets.map(ticket => (
                        <div 
                            key={ticket.id}
                            onClick={() => setSelectedTicket(ticket)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                selectedTicket?.id === ticket.id 
                                    ? 'bg-primary-50 border-primary-500 shadow-sm' 
                                    : 'bg-white border-slate-200 hover:border-primary-300'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-slate-800 text-sm">{ticket.id}</span>
                                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded
                                    ${ticket.status === 'Aberto' ? 'bg-red-100 text-red-600' :
                                      ticket.status === 'Em Andamento' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}
                                `}>
                                    {ticket.status}
                                </span>
                            </div>
                            <p className="font-medium text-slate-700 text-sm truncate">{ticket.subject}</p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                                <User size={12} />
                                <span>{ticket.requester}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ticket Detail / Action Area */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                {selectedTicket ? (
                    <>
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">{selectedTicket.subject}</h2>
                                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><User size={14}/> {selectedTicket.requester}</span>
                                    <span>ID: {selectedTicket.id}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleStatusChange(selectedTicket.id, 'Em Andamento')}
                                    disabled={selectedTicket.status === 'Em Andamento'}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium hover:bg-slate-50 disabled:opacity-50"
                                >
                                    <Clock size={14} className="text-blue-500"/> Assumir
                                </button>
                                <button 
                                    onClick={() => handleStatusChange(selectedTicket.id, 'Fechado')}
                                    disabled={selectedTicket.status === 'Fechado'}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium hover:bg-slate-50 disabled:opacity-50"
                                >
                                    <CheckCircle size={14} className="text-green-500"/> Finalizar
                                </button>
                            </div>
                        </div>

                        {/* Conversation Area */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/30">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                    <User size={20} className="text-slate-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between mb-1">
                                        <span className="font-bold text-slate-800">{selectedTicket.requester}</span>
                                        <span className="text-xs text-slate-400">10/02/2025</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm border border-slate-200 text-slate-700">
                                        <p>Cliente relatando problema: {selectedTicket.subject}</p>
                                        <p className="mt-2">Gostaria de saber a previsão de atualização sobre meu equipamento, pois preciso dele para trabalho urgente.</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Technician Response Area */}
                            <div className="flex gap-4 flex-row-reverse">
                                 <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 text-white">
                                     T
                                 </div>
                                 <div className="w-full max-w-xl">
                                     <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                                         <p className="text-sm font-semibold text-primary-800 mb-2">Resposta Interna / Pública</p>
                                         <textarea 
                                            className="w-full p-2 text-sm border border-slate-300 rounded bg-white focus:outline-none focus:border-primary-500"
                                            rows={3}
                                            placeholder="Escreva uma resposta para o cliente..."
                                         ></textarea>
                                         <div className="flex justify-end mt-2">
                                             <button className="px-4 py-2 bg-primary-600 text-white rounded text-sm font-medium hover:bg-primary-700 transition-colors flex items-center gap-2">
                                                 <MessageCircle size={16} /> Enviar Resposta
                                             </button>
                                         </div>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                        <MessageCircle size={48} className="mb-4 opacity-20" />
                        <h3 className="text-lg font-medium text-slate-600">Nenhum chamado selecionado</h3>
                        <p className="text-sm">Selecione um item da fila à esquerda para visualizar detalhes e responder.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TechnicianTickets;

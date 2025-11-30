
import React, { useState } from 'react';
import { MOCK_TICKETS } from '../constants';
import { Ticket } from '../types';
import { Plus, MessageSquare, Search, X, User, Headphones } from 'lucide-react';

const ClientTickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
    const [showForm, setShowForm] = useState(false);
    const [newSubject, setNewSubject] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    const handleCreateTicket = (e: React.FormEvent) => {
        e.preventDefault();
        const newTicket: Ticket = {
            id: `TKT-${Math.floor(Math.random() * 1000)}`,
            subject: newSubject,
            requester: 'Você',
            status: 'Aberto',
            lastUpdate: 'Agora mesmo'
        };
        setTickets([newTicket, ...tickets]);
        setNewSubject('');
        setNewDesc('');
        setShowForm(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar ticket..." 
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={18} /> Novo Ticket
                </button>
            </div>

            {/* New Ticket Form */}
            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-md border border-primary-100 animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold text-slate-800 mb-4">Novo Ticket de Suporte</h3>
                    <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Assunto</label>
                            <input 
                                required
                                value={newSubject}
                                onChange={(e) => setNewSubject(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                placeholder="Ex: Problema com pagamento"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                            <textarea 
                                required
                                value={newDesc}
                                onChange={(e) => setNewDesc(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none h-24"
                                placeholder="Descreva seu problema em detalhes..."
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button 
                                type="button" 
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg text-sm font-medium"
                            >
                                Enviar Ticket
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tickets List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assunto</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {tickets.map(ticket => (
                                <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{ticket.id}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {ticket.subject}
                                        <div className="text-xs text-slate-400 mt-0.5">Atualizado: {ticket.lastUpdate || 'Recentemente'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                            ${ticket.status === 'Aberto' ? 'bg-green-100 text-green-700' : 
                                              ticket.status === 'Em Andamento' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}
                                        `}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => setSelectedTicket(ticket)}
                                            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                                        >
                                            Ver Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {tickets.length === 0 && (
                     <div className="p-8 text-center text-slate-500">
                         <MessageSquare className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                         <p>Nenhum ticket encontrado.</p>
                     </div>
                )}
            </div>

            {/* Ticket Details Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                    Ticket {selectedTicket.id}
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                                        ${selectedTicket.status === 'Aberto' ? 'bg-green-100 text-green-700' : 
                                          selectedTicket.status === 'Em Andamento' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}
                                    `}>
                                        {selectedTicket.status}
                                    </span>
                                </h3>
                                <p className="text-slate-500 text-sm mt-1">{selectedTicket.subject}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedTicket(null)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Chat History Area (Mocked) */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                            {/* Original Request */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                    <User size={20} className="text-slate-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between mb-1">
                                        <span className="font-bold text-slate-800">Você</span>
                                        <span className="text-xs text-slate-400">10/02/2025 14:30</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm border border-slate-200 text-slate-700 text-sm">
                                        <p>Olá, estou com uma dúvida sobre a {selectedTicket.subject.toLowerCase()}. Poderiam me ajudar?</p>
                                    </div>
                                </div>
                            </div>

                            {/* TechGuard Response (Mocked based on status) */}
                            {selectedTicket.status !== 'Aberto' && (
                                <div className="flex gap-4 flex-row-reverse">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                        <Headphones size={20} className="text-primary-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline justify-between mb-1 flex-row-reverse">
                                            <span className="font-bold text-primary-700">Suporte TechGuard</span>
                                            <span className="text-xs text-slate-400">10/02/2025 15:15</span>
                                        </div>
                                        <div className="bg-primary-50 p-4 rounded-lg rounded-tr-none shadow-sm border border-primary-100 text-slate-700 text-sm text-right">
                                            <p>Olá! Recebemos sua solicitação. Um de nossos técnicos especializados já está analisando o caso e entrará em contato em breve.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Reply Area */}
                        <div className="p-4 border-t border-slate-100 bg-white rounded-b-xl">
                             <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Escreva uma resposta..." 
                                    className="w-full pl-4 pr-12 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                                    <MessageSquare size={16} />
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientTickets;

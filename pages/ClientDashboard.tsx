
import React from 'react';
import { MOCK_ORDERS } from '../constants';
import ClientProgress from '../components/ClientProgress';
import { AppView } from '../types';

interface Props {
    onNavigate: (view: AppView) => void;
}

const ClientDashboard: React.FC<Props> = ({ onNavigate }) => {
  // Filter for client specific orders (Mocking logged in user as Enzo or Luiz)
  const myOrders = MOCK_ORDERS.filter(o => o.customerName.includes('Enzo') || o.customerName.includes('Luiz'));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-primary-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white shadow-xl shadow-primary-900/10">
        <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta, Cliente.</h2>
        <p className="text-primary-100">Você tem {myOrders.length} solicitações de manutenção ativas.</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            Ordens Ativas
            <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">{myOrders.length}</span>
        </h3>
        
        {myOrders.length > 0 ? (
            myOrders.map(order => (
                <ClientProgress key={order.id} order={order} />
            ))
        ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">Nenhuma ordem de serviço encontrada.</p>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
             <h4 className="font-bold text-slate-800 mb-2">Precisa de Suporte?</h4>
             <p className="text-sm text-slate-500 mb-4">Abra um novo ticket se tiver dúvidas sobre seus reparos em andamento.</p>
             <button 
                onClick={() => onNavigate('TICKETS')}
                className="text-primary-600 font-medium text-sm hover:underline flex items-center gap-1"
             >
                Abrir Ticket &rarr;
             </button>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
             <h4 className="font-bold text-slate-800 mb-2">Histórico de Serviços</h4>
             <p className="text-sm text-slate-500 mb-4">Visualize suas solicitações de manutenção anteriores e faturas.</p>
             <button 
                onClick={() => onNavigate('HISTORY')}
                className="text-primary-600 font-medium text-sm hover:underline flex items-center gap-1"
             >
                Ver Arquivo &rarr;
             </button>
          </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

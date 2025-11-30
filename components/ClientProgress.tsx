import React from 'react';
import { OrderStatus, ServiceOrder } from '../types';
import { CheckCircle, Truck, Wrench, ShoppingCart, Clock } from 'lucide-react';

interface Props {
  order: ServiceOrder;
}

const ClientProgress: React.FC<Props> = ({ order }) => {
  // Define the phases as described in the PDF
  const phases = [
    { id: OrderStatus.PENDING, label: 'Recebido', icon: Clock },
    { id: OrderStatus.DIAGNOSIS, label: 'Diagnóstico', icon: Wrench },
    { id: OrderStatus.PARTS_PURCHASE, label: 'Compra Peças', icon: ShoppingCart },
    { id: OrderStatus.ASSEMBLY, label: 'Montagem', icon: Wrench },
    { id: OrderStatus.TRANSPORT, label: 'Transporte', icon: Truck },
    { id: OrderStatus.COMPLETED, label: 'Pronto', icon: CheckCircle },
  ];

  // Helper to find index even if strings don't match perfectly (though Enums should handle it)
  const currentPhaseIndex = phases.findIndex(p => p.id === order.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h3 className="text-lg font-bold text-slate-800">{order.deviceModel}</h3>
                <p className="text-sm text-slate-500">ID do Pedido: {order.id}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                ${order.status === OrderStatus.COMPLETED ? 'bg-green-100 text-green-700' : 'bg-primary-100 text-primary-700'}`}>
                {order.status}
            </span>
        </div>

        {/* Desktop Stepper */}
        <div className="hidden md:flex justify-between relative mt-8">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 w-full h-1 bg-slate-200 -z-0 rounded">
                <div 
                    className="h-full bg-primary-500 rounded transition-all duration-1000"
                    style={{ width: `${(currentPhaseIndex / (phases.length - 1)) * 100}%` }}
                ></div>
            </div>

            {phases.map((phase, idx) => {
                const isCompleted = idx <= currentPhaseIndex;
                const isActive = idx === currentPhaseIndex;
                const Icon = phase.icon;

                return (
                    <div key={phase.id} className="relative z-10 flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-4 
                            ${isCompleted ? 'bg-primary-500 border-primary-100 text-white' : 'bg-white border-slate-200 text-slate-400'}
                            ${isActive ? 'ring-2 ring-primary-500 ring-offset-2 scale-110' : ''}
                        `}>
                            <Icon size={18} />
                        </div>
                        <span className={`mt-3 text-xs font-medium ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                            {phase.label}
                        </span>
                    </div>
                );
            })}
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="md:hidden space-y-4">
             {phases.map((phase, idx) => {
                const isCompleted = idx <= currentPhaseIndex;
                const isActive = idx === currentPhaseIndex;
                const Icon = phase.icon;
                
                return (
                    <div key={phase.id} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                             ${isCompleted ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'}
                        `}>
                            <Icon size={14} />
                        </div>
                        <div className="flex-1">
                            <p className={`text-sm font-medium ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                                {phase.label}
                            </p>
                        </div>
                        {isActive && <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>}
                    </div>
                )
             })}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:justify-between text-sm text-slate-500">
            <span>Problema: <span className="text-slate-700">{order.issueDescription}</span></span>
            <span className="mt-2 sm:mt-0">Conclusão Est.: <span className="font-semibold text-slate-700">{order.estimatedCompletion}</span></span>
        </div>
    </div>
  );
};

export default ClientProgress;
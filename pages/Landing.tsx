import React from 'react';
import { UserRole } from '../types';
import { ShieldCheck, User, Wrench, Briefcase } from 'lucide-react';

interface Props {
  onLogin: (role: UserRole) => void;
}

const Landing: React.FC<Props> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
         <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary-600 blur-[100px]"></div>
         <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/10 shadow-2xl">
           <ShieldCheck size={48} className="text-primary-400" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          TechGuard
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          O sistema robusto de gerenciamento de manutenção da Unimontes. 
          Integrando <span className="text-primary-400">clientes</span>, <span className="text-primary-400">técnicos</span>, e <span className="text-primary-400">gerentes</span> em um fluxo de trabalho eficiente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Client Card */}
          <button 
            onClick={() => onLogin(UserRole.CLIENT)}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <User className="mx-auto text-primary-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Portal do Cliente</h3>
            <p className="text-sm text-slate-400">Acompanhe reparos e aprove orçamentos</p>
          </button>

          {/* Technician Card */}
          <button 
            onClick={() => onLogin(UserRole.TECHNICIAN)}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Wrench className="mx-auto text-indigo-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Hub do Técnico</h3>
            <p className="text-sm text-slate-400">Gerencie OS, Peças e Diagnósticos</p>
          </button>

          {/* Manager Card */}
          <button 
             onClick={() => onLogin(UserRole.MANAGER)}
             className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Briefcase className="mx-auto text-purple-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Visão do Gerente</h3>
            <p className="text-sm text-slate-400">Dashboards, Logs e KPI</p>
          </button>
        </div>

        <div className="mt-16 text-slate-500 text-sm">
          <p>Desenvolvido por Luiz Fernando & Enzo Melo • Unimontes 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
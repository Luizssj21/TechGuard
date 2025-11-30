
import React from 'react';
import { UserRole, AppView } from '../types';
import { LogOut, Monitor, User, Briefcase, Settings, Menu, X, Archive, LifeBuoy } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  onLogout: () => void;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, onLogout, currentView, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const getNavItems = () => {
    switch (role) {
      case UserRole.CLIENT:
        return [
          { label: 'Meus Pedidos', icon: <Monitor size={20} />, view: 'DASHBOARD' as AppView },
          { label: 'Tickets de Suporte', icon: <LifeBuoy size={20} />, view: 'TICKETS' as AppView },
          { label: 'Histórico / Arquivo', icon: <Archive size={20} />, view: 'HISTORY' as AppView },
        ];
      case UserRole.TECHNICIAN:
        return [
          { label: 'Bancada', icon: <Briefcase size={20} />, view: 'DASHBOARD' as AppView },
          { label: 'Estoque', icon: <Monitor size={20} />, view: 'INVENTORY' as AppView },
          { label: 'Chamados', icon: <User size={20} />, view: 'TICKETS' as AppView },
        ];
      case UserRole.MANAGER:
        return [
          { label: 'Painel', icon: <Briefcase size={20} />, view: 'DASHBOARD' as AppView },
          { label: 'Desempenho', icon: <User size={20} />, view: 'PERFORMANCE' as AppView },
          { label: 'Logs do Sistema', icon: <Settings size={20} />, view: 'LOGS' as AppView },
        ];
      default:
        return [];
    }
  };

  const getPageTitle = () => {
    if (role === UserRole.CLIENT) {
        if (currentView === 'TICKETS') return "Suporte Técnico";
        if (currentView === 'HISTORY') return "Histórico de Serviços";
        return "Meu Acompanhamento";
    }
    if (role === UserRole.TECHNICIAN) return "Bancada Técnica";
    if (role === UserRole.MANAGER) return "Painel Executivo";
    return "TechGuard";
  }

  const getPageSubtitle = () => {
    if (role === UserRole.CLIENT) {
        if (currentView === 'TICKETS') return "Gerencie seus chamados e tire dúvidas.";
        if (currentView === 'HISTORY') return "Consulte ordens de serviço finalizadas.";
        return "Acompanhe o progresso dos seus dispositivos em tempo real.";
    }
    return "Sistema de Gestão TechGuard";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md z-20 sticky top-0">
        <div className="font-bold text-xl tracking-tight flex items-center gap-2">
           <svg className="w-8 h-8 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
           </svg>
           TechGuard
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-10 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:flex items-center gap-2 font-bold text-2xl text-white tracking-tight border-b border-slate-800">
          <svg className="w-8 h-8 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          TechGuard
        </div>

        <div className="p-4 border-b border-slate-800">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Usuário Atual</div>
          <div className="font-medium text-white">{role === UserRole.CLIENT ? 'Luiz Fernando' : role === UserRole.TECHNICIAN ? 'Téc. Enzo' : 'Admin'}</div>
          <div className="text-sm text-slate-400">Visão de {role}</div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {getNavItems().map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                  onNavigate(item.view);
                  setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.view ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen bg-slate-50 relative">
        <header className="bg-white shadow-sm p-6 sticky top-0 z-0">
          <h1 className="text-2xl font-bold text-slate-800">
            {getPageTitle()}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {getPageSubtitle()}
          </p>
        </header>
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;

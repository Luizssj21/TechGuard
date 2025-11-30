
import React, { useState } from 'react';
import { UserRole, AppView } from './types';
import Landing from './pages/Landing';
import Layout from './components/Layout';
import ClientDashboard from './pages/ClientDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ClientTickets from './components/ClientTickets';
import ClientHistory from './components/ClientHistory';
import TechnicianInventory from './components/TechnicianInventory';
import TechnicianTickets from './components/TechnicianTickets';
import ManagerPerformance from './components/ManagerPerformance';
import ManagerLogs from './components/ManagerLogs';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [currentView, setCurrentView] = useState<AppView>('DASHBOARD');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentView('DASHBOARD'); // Reset view on login
  };

  const handleLogout = () => {
    setUserRole(UserRole.GUEST);
    setCurrentView('DASHBOARD');
  };

  const renderContent = () => {
    if (userRole === UserRole.CLIENT) {
        switch (currentView) {
            case 'TICKETS':
                return <ClientTickets />;
            case 'HISTORY':
                return <ClientHistory />;
            case 'DASHBOARD':
            default:
                return <ClientDashboard onNavigate={setCurrentView} />;
        }
    }
    
    if (userRole === UserRole.TECHNICIAN) {
        switch (currentView) {
            case 'TICKETS':
                return <TechnicianTickets />;
            case 'INVENTORY':
                return <TechnicianInventory />;
            case 'DASHBOARD':
            default:
                return <TechnicianDashboard />;
        }
    }

    if (userRole === UserRole.MANAGER) {
        switch (currentView) {
            case 'PERFORMANCE':
                return <ManagerPerformance />;
            case 'LOGS':
                return <ManagerLogs />;
            case 'DASHBOARD':
            default:
                return <ManagerDashboard />;
        }
    }

    return null;
  };

  if (userRole === UserRole.GUEST) {
    return <Landing onLogin={handleLogin} />;
  }

  return (
    <Layout 
        role={userRole} 
        onLogout={handleLogout}
        currentView={currentView}
        onNavigate={setCurrentView}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;

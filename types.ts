
export enum UserRole {
  GUEST = 'VISITANTE',
  CLIENT = 'CLIENTE',
  TECHNICIAN = 'TÉCNICO',
  MANAGER = 'GERENTE',
}

export enum OrderStatus {
  PENDING = 'Pendente',
  DIAGNOSIS = 'Diagnóstico',
  PARTS_PURCHASE = 'Compra de Peças',
  ASSEMBLY = 'Montagem',
  TRANSPORT = 'Transporte',
  COMPLETED = 'Concluído'
}

export type AppView = 'DASHBOARD' | 'TICKETS' | 'HISTORY' | 'PROFILE' | 'INVENTORY' | 'LOGS' | 'PERFORMANCE';

export interface ServiceOrder {
  id: string;
  customerName: string;
  deviceModel: string;
  issueDescription: string;
  status: OrderStatus;
  createdAt: string;
  estimatedCompletion: string;
  backupRequired: boolean;
  priority: 'Baixa' | 'Média' | 'Alta';
}

export interface LogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  type: 'INFO' | 'AVISO' | 'ERRO';
}

export interface Ticket {
  id: string;
  subject: string;
  requester: string;
  status: 'Aberto' | 'Em Andamento' | 'Fechado';
  lastUpdate?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minThreshold: number;
  price: number;
}

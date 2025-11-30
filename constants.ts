
import { OrderStatus, ServiceOrder, LogEntry, Ticket, InventoryItem } from './types';

export const MOCK_ORDERS: ServiceOrder[] = [
  {
    id: 'OS-2025-001',
    customerName: 'Enzo Melo',
    deviceModel: 'Dell XPS 15',
    issueDescription: 'Superaquecimento e desligamentos inesperados durante alta carga.',
    status: OrderStatus.PARTS_PURCHASE,
    createdAt: '10/02/2025',
    estimatedCompletion: '20/02/2025',
    backupRequired: true,
    priority: 'Alta'
  },
  {
    id: 'OS-2025-002',
    customerName: 'Luiz Fernando',
    deviceModel: 'MacBook Pro M1',
    issueDescription: 'Problema de tela piscando.',
    status: OrderStatus.ASSEMBLY,
    createdAt: '12/02/2025',
    estimatedCompletion: '18/02/2025',
    backupRequired: false,
    priority: 'Média'
  },
  {
    id: 'OS-2025-003',
    customerName: 'Lab Unimontes',
    deviceModel: 'Lenovo ThinkStation',
    issueDescription: 'Limpeza do sistema e upgrade de RAM.',
    status: OrderStatus.TRANSPORT,
    createdAt: '14/02/2025',
    estimatedCompletion: '16/02/2025',
    backupRequired: true,
    priority: 'Baixa'
  },
  {
    id: 'OS-2024-098',
    customerName: 'Enzo Melo',
    deviceModel: 'iPhone 13 Pro',
    issueDescription: 'Troca de Bateria e Tela',
    status: OrderStatus.COMPLETED,
    createdAt: '15/12/2024',
    estimatedCompletion: '18/12/2024',
    backupRequired: false,
    priority: 'Baixa'
  }
];

export const MOCK_LOGS: LogEntry[] = [
  { id: '1', timestamp: '10:00', action: 'Backup do Sistema Concluído', user: 'Sistema', type: 'INFO' },
  { id: '2', timestamp: '10:15', action: 'Tentativa de Login Falhou', user: 'IP Desconhecido', type: 'AVISO' },
  { id: '3', timestamp: '10:30', action: 'Pedido de Peças Aprovado #9921', user: 'Gerente', type: 'INFO' },
  { id: '4', timestamp: '11:05', action: 'Status da OS-2025-001 Atualizado', user: 'Tec_01', type: 'INFO' },
  { id: '5', timestamp: '11:15', action: 'Erro na conexão com API de Pagamento', user: 'Sistema', type: 'ERRO' },
  { id: '6', timestamp: '11:42', action: 'Novo Ticket Criado #TKT-885', user: 'Cliente_Enzo', type: 'INFO' },
  { id: '7', timestamp: '12:00', action: 'Inventário Atualizado: SSD Kingston', user: 'Tec_01', type: 'INFO' },
  { id: '8', timestamp: '13:30', action: 'Permissão de Acesso Alterada', user: 'Admin', type: 'AVISO' },
  { id: '9', timestamp: '14:20', action: 'Relatório Mensal Gerado', user: 'Gerente', type: 'INFO' },
  { id: '10', timestamp: '15:45', action: 'Falha crítica no servidor de arquivos', user: 'Sistema', type: 'ERRO' },
];

export const MOCK_TICKETS: Ticket[] = [
  { id: 'TKT-882', subject: 'Não consigo acessar o portal do cliente', requester: 'Alice Silva', status: 'Aberto' },
  { id: 'TKT-883', subject: 'Discrepância na fatura', requester: 'Roberto Santos', status: 'Em Andamento' },
  { id: 'TKT-884', subject: 'Dúvida sobre garantia de peças', requester: 'Carla Dias', status: 'Aberto' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'INV-001', name: 'SSD Kingston 480GB', category: 'Armazenamento', quantity: 12, minThreshold: 5, price: 250.00 },
  { id: 'INV-002', name: 'Memória RAM DDR4 8GB', category: 'Memória', quantity: 4, minThreshold: 5, price: 180.00 },
  { id: 'INV-003', name: 'Cabo HDMI 2.0', category: 'Cabos', quantity: 25, minThreshold: 10, price: 35.00 },
  { id: 'INV-004', name: 'Pasta Térmica Prata', category: 'Insumos', quantity: 2, minThreshold: 3, price: 45.00 },
  { id: 'INV-005', name: 'Fonte ATX 500W', category: 'Energia', quantity: 0, minThreshold: 2, price: 210.00 },
  { id: 'INV-006', name: 'Tela LED 15.6 Slim', category: 'Telas', quantity: 3, minThreshold: 2, price: 450.00 },
];

export const MOCK_TECH_STATS = [
  { name: 'Téc. Enzo', tasks: 45, rating: 4.8, avgTime: '2.1d' },
  { name: 'Téc. Ana', tasks: 38, rating: 4.9, avgTime: '1.8d' },
  { name: 'Téc. João', tasks: 22, rating: 4.2, avgTime: '3.5d' },
];

export const MOCK_REVENUE_DATA = [
  { name: 'Sem 1', revenue: 4500, costs: 2100 },
  { name: 'Sem 2', revenue: 5200, costs: 2400 },
  { name: 'Sem 3', revenue: 4800, costs: 2200 },
  { name: 'Sem 4', revenue: 6100, costs: 2800 },
];

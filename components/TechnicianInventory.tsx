
import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../constants';
import { InventoryItem } from '../types';
import { Search, Plus, AlertTriangle, Package, DollarSign } from 'lucide-react';

const TechnicianInventory: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    // Mock form state
    const [newItem, setNewItem] = useState({ name: '', category: 'Geral', quantity: 0, price: 0 });

    const filteredInventory = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        const item: InventoryItem = {
            id: `INV-${Math.floor(Math.random() * 1000)}`,
            name: newItem.name,
            category: newItem.category,
            quantity: Number(newItem.quantity),
            minThreshold: 5,
            price: Number(newItem.price)
        };
        setInventory([...inventory, item]);
        setShowAddModal(false);
        setNewItem({ name: '', category: 'Geral', quantity: 0, price: 0 });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar peças, cabos ou insumos..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={18} /> Adicionar Item
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categoria</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantidade</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Preço Unit.</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredInventory.map(item => {
                            const isLowStock = item.quantity > 0 && item.quantity <= item.minThreshold;
                            const isOutOfStock = item.quantity === 0;

                            return (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                                                <Package size={18} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{item.name}</p>
                                                <p className="text-xs text-slate-400">ID: {item.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-medium">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {item.quantity} un.
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        R$ {item.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {isOutOfStock ? (
                                            <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit">
                                                <AlertTriangle size={12} /> Esgotado
                                            </span>
                                        ) : isLowStock ? (
                                            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                                                Baixo Estoque
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                                Em Estoque
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredInventory.length === 0 && (
                     <div className="p-8 text-center text-slate-500">
                         <Package className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                         <p>Nenhum item encontrado no estoque.</p>
                     </div>
                )}
            </div>

            {/* Add Item Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Adicionar Novo Item</h3>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Item</label>
                                <input 
                                    required
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                                <select 
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    <option value="Geral">Geral</option>
                                    <option value="Armazenamento">Armazenamento</option>
                                    <option value="Memória">Memória</option>
                                    <option value="Cabos">Cabos</option>
                                    <option value="Telas">Telas</option>
                                    <option value="Insumos">Insumos</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Quantidade</label>
                                    <input 
                                        type="number"
                                        required
                                        min="0"
                                        value={newItem.quantity}
                                        onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Preço (R$)</label>
                                    <div className="relative">
                                        <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                                        <input 
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            value={newItem.price}
                                            onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})}
                                            className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg text-sm font-medium"
                                >
                                    Salvar Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TechnicianInventory;

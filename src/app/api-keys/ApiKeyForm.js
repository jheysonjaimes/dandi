import React from 'react';

export default function ApiKeyForm({ newName, newKey, setNewName, setNewKey, onCreate, onCancel, loading }) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      <input
        className="border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        placeholder="Nombre de la clave"
        value={newName}
        onChange={e => setNewName(e.target.value)}
        disabled={loading}
      />
      <input
        className="border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        placeholder="Valor de la clave"
        value={newKey}
        onChange={e => setNewKey(e.target.value)}
        disabled={loading}
      />
      <div className="flex gap-2 justify-end">
        <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200" onClick={onCancel} disabled={loading}>Cancelar</button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700" onClick={onCreate} disabled={loading}>Crear</button>
      </div>
    </div>
  );
} 
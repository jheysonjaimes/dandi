import React from 'react';
import { AiOutlineEye, AiOutlineCopy, AiOutlineEdit, AiOutlineDelete, AiOutlineSave, AiOutlineClose } from 'react-icons/ai';

export default function ApiKeysTable({ apiKeys, showKey, onToggleShowKey, onCopy, onEdit, onDelete, onSave, onCancel, editingId, loading }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left mt-2">
        <thead>
          <tr className="text-gray-400 text-xs uppercase border-b">
            <th className="py-2 font-semibold">Name</th>
            <th className="py-2 font-semibold">Usage</th>
            <th className="py-2 font-semibold">Key</th>
            <th className="py-2 font-semibold">Created</th>
            <th className="py-2 font-semibold">Options</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((k) => (
            <tr key={k.id} className="border-b hover:bg-gray-50">
              <td className="py-3 font-medium text-gray-700">
                {editingId === k.id ? (
                  <input
                    className="border border-gray-200 px-2 py-1 rounded-lg"
                    defaultValue={k.name}
                    onChange={e => (k.name = e.target.value)}
                  />
                ) : (
                  k.name
                )}
              </td>
              <td className="py-3">{k.usage}</td>
              <td className="py-3 w-[340px] pr-6">
                <div className="flex items-center gap-2">
                  <input
                    className="border border-gray-200 px-2 py-1 rounded-lg bg-gray-100 text-gray-700 w-full"
                    type={showKey[k.id] ? 'text' : 'password'}
                    value={k.key}
                    readOnly
                  />
                </div>
              </td>
              <td className="py-3 text-xs text-gray-500 whitespace-nowrap">{k.created_at ? new Date(k.created_at).toLocaleString() : ''}</td>
              <td className="py-3">
                <div className="flex gap-2 items-center">
                  <button
                    className="p-1 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors text-xl"
                    title={showKey[k.id] ? 'Ocultar clave' : 'Mostrar clave'}
                    onClick={() => onToggleShowKey(k.id)}
                  >
                    <AiOutlineEye />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors text-xl"
                    title="Copiar clave"
                    onClick={() => onCopy(k.key)}
                  >
                    <AiOutlineCopy />
                  </button>
                  {editingId === k.id ? (
                    <>
                      <button
                        className="p-1 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors text-xl"
                        title="Guardar"
                        onClick={() => onSave(k.id, k.name, k.key)}
                        disabled={loading}
                      >
                        <AiOutlineSave />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors text-xl"
                        title="Cancelar"
                        onClick={() => onCancel(k.id)}
                        disabled={loading}
                      >
                        <AiOutlineClose />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="p-1 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors text-xl"
                        title="Editar"
                        onClick={() => onEdit(k.id)}
                        disabled={loading}
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors text-xl"
                        title="Eliminar"
                        onClick={() => onDelete(k.id)}
                        disabled={loading}
                      >
                        <AiOutlineDelete />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
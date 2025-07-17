import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import ApiKeysTable from './ApiKeysTable';
import ApiKeyForm from './ApiKeyForm';
import Notification from '../components/notification';

export default function ApiKeysManager() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newName, setNewName] = useState('');
  const [newKey, setNewKey] = useState('dandi-');
  const [showKey, setShowKey] = useState({});
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copyMsg, setCopyMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Cargar claves desde Supabase
  useEffect(() => {
    const fetchKeys = async () => {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) setErrorMsg('Error al cargar las claves: ' + error.message);
      if (!error) setApiKeys(data);
      setLoading(false);
    };
    fetchKeys();
  }, []);

  // Crear nueva clave
  const handleCreate = async () => {
    if (!newName || !newKey) return;
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    // Asegura el prefijo 'dandi-'
    const keyValue = newKey.startsWith('dandi-') ? newKey : `dandi-${newKey}`;
    const { data, error } = await supabase
      .from('api_keys')
      .insert([{ name: newName, usage: 0, key: keyValue }])
      .select();
    if (error) setErrorMsg('Error al crear la clave: ' + error.message);
    if (!error && data) {
      setApiKeys([data[0], ...apiKeys]);
      setSuccessMsg('Clave creada exitosamente.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
    setNewName('');
    setNewKey('dandi-');
    setShowCreate(false);
    setLoading(false);
  };

  // Eliminar clave
  const handleDelete = async (id) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    const { error } = await supabase.from('api_keys').delete().eq('id', id);
    if (error) setErrorMsg('Error al eliminar la clave: ' + error.message);
    if (!error) {
      setApiKeys(apiKeys.filter((k) => k.id !== id));
      setDeleteMsg('Clave eliminada exitosamente.');
      setTimeout(() => setDeleteMsg(''), 3000);
    }
    setLoading(false);
  };

  // Editar clave
  const handleEdit = (id) => {
    setEditingId(id);
  };

  // Guardar edición
  const handleSave = async (id, name, key) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    // Asegura el prefijo 'dandi-'
    const keyValue = key.startsWith('dandi-') ? key : `dandi-${key}`;
    const { data, error } = await supabase
      .from('api_keys')
      .update({ name, key: keyValue })
      .eq('id', id)
      .select();
    if (error) setErrorMsg('Error al guardar los cambios: ' + error.message);
    if (!error && data) {
      setApiKeys(apiKeys.map((k) => (k.id === id ? { ...data[0] } : k)));
      setSuccessMsg('Clave actualizada exitosamente.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
    setEditingId(null);
    setLoading(false);
  };

  // Cancelar edición
  const handleCancel = (id) => {
    setEditingId(null);
  };

  const handleToggleShowKey = (id) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    setCopyMsg('API Key copiada');
    setTimeout(() => setCopyMsg(''), 2000);
  };

  return (
    <>
      <Notification message={errorMsg} type="error" onClose={() => setErrorMsg('')} />
      <Notification message={successMsg} type="success" onClose={() => setSuccessMsg('')} />
      <Notification message={deleteMsg} type="delete" onClose={() => setDeleteMsg('')} />
      <Notification message={copyMsg} type="copy" onClose={() => setCopyMsg('')} />
      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-lg font-bold text-gray-800 mb-1">API Keys</div>
            <div className="text-gray-500 text-sm">The key is used to authenticate your requests to the Research API. To learn more, see the <a href="#" className="text-blue-600 underline">documentation</a> page.</div>
          </div>
          <button
            className="bg-blue-600 text-white rounded-full px-4 py-2 font-semibold shadow hover:bg-blue-700 flex items-center gap-2"
            onClick={() => setShowCreate(true)}
          >
            <span className="text-xl">＋</span> Nueva API Key
          </button>
        </div>
        {/* Crear nueva API Key modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
              <div className="text-lg font-bold mb-4">Crear nueva API Key</div>
              <ApiKeyForm
                newName={newName}
                newKey={newKey}
                setNewName={setNewName}
                setNewKey={setNewKey}
                onCreate={handleCreate}
                onCancel={() => setShowCreate(false)}
                loading={loading}
              />
            </div>
          </div>
        )}
        <ApiKeysTable
          apiKeys={apiKeys}
          showKey={showKey}
          onToggleShowKey={handleToggleShowKey}
          onCopy={handleCopy}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSave={handleSave}
          onCancel={handleCancel}
          editingId={editingId}
          loading={loading}
        />
      </div>
    </>
  );
} 
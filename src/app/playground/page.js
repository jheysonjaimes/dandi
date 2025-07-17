'use client';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Notification from '../components/notification';
import { useRouter } from 'next/navigation';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch('/api/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: apiKey })
      });
      const data = await res.json();
      if (data.valid) {
        router.push('/protected');
      } else {
        setStatus('error');
        setMessage(data.error || 'API Key no válida.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Error de red o del servidor.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[#f7f8fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen pl-56 items-center justify-center">
        <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">API playground</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Ingresa tu API Key"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold shadow hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Enviar'}
            </button>
          </form>
          {status === 'error' && (
            <Notification
              message={message}
              type={status}
              onClose={() => setStatus(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
} 
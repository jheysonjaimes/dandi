'use client';
import Sidebar from '../components/Sidebar';
import ApiKeysManager from '../api-keys/ApiKeysManager';

export default function Dashboards() {
  return (
    <div className="min-h-screen flex bg-[#f7f8fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen pl-56">
        {/* Plan Card */}
        <div className="max-w-5xl mx-auto w-full mt-8">
          <div className="rounded-2xl p-8 mb-8 relative overflow-hidden" style={{background: 'linear-gradient(120deg, #a259ff 0%, #ff6a00 100%)'}}>
            <div className="absolute top-4 left-4 bg-white/30 rounded px-3 py-1 text-xs font-semibold text-gray-700">CURRENT PLAN</div>
            <div className="mt-10 text-3xl font-bold text-white mb-6">Researcher</div>
            {/* Aquí puedes agregar la barra de progreso y otros elementos visuales del plan */}
          </div>
          {/* API Keys Section */}
          <ApiKeysManager />
        </div>
      </div>
    </div>
  );
} 
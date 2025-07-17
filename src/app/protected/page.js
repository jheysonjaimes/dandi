'use client';
import Sidebar from '../components/Sidebar';

export default function Protected() {
  return (
    <div className="min-h-screen flex bg-[#f7f8fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen pl-56 items-center justify-center">
        <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6 text-center">Protected</h1>
          <div className="text-green-700 text-lg font-semibold text-center">¡Bienvenido! Has accedido correctamente con tu API Key.</div>
        </div>
      </div>
    </div>
  );
} 
import React, { useState } from 'react';
import { AiFillHome, AiOutlineMenu, AiOutlineClose, AiOutlineExperiment, AiOutlineKey } from 'react-icons/ai';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 transition-colors"
        onClick={() => setOpen(true)}
        style={{ display: open ? 'none' : 'block' }}
        aria-label="Abrir menú"
      >
        <AiOutlineMenu className="text-2xl text-gray-600" />
      </button>
      {/* Sidebar desplegable */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-white border-r shadow-sm z-50 flex flex-col pt-8 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="px-6 mb-8 flex items-center justify-between">
          <span className="text-2xl font-extrabold tracking-tight text-blue-600">dandi</span>
          <button
            className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          >
            <AiOutlineClose className="text-xl text-gray-500" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-0">
          <button
            className="flex items-center gap-2 w-full px-6 py-2 text-base text-gray-400 bg-transparent border-none outline-none transition-colors hover:bg-gray-100 hover:text-blue-600 focus:outline-none mb-2"
            style={{ borderRadius: 0 }}
            onClick={() => { setOpen(false); window.location.href = '/'; }}
          >
            <AiFillHome className="text-xl text-gray-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-gray-400 group-hover:text-blue-600 transition-colors">Overview</span>
          </button>
          <button
            className="flex items-center gap-2 w-full px-6 py-2 text-base text-gray-400 bg-transparent border-none outline-none transition-colors hover:bg-gray-100 hover:text-blue-600 focus:outline-none mb-2"
            style={{ borderRadius: 0 }}
            onClick={() => { setOpen(false); window.location.href = '/playground'; }}
          >
            <AiOutlineExperiment className="text-xl text-gray-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-gray-400 group-hover:text-blue-600 transition-colors">API playground</span>
          </button>
          <button
            className="flex items-center gap-2 w-full px-6 py-2 text-base text-gray-400 bg-transparent border-none outline-none transition-colors hover:bg-gray-100 hover:text-blue-600 focus:outline-none mb-2"
            style={{ borderRadius: 0 }}
            onClick={() => { setOpen(false); window.location.href = '/dashboards'; }}
          >
            <AiOutlineKey className="text-xl text-gray-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-gray-400 group-hover:text-blue-600 transition-colors">API Keys</span>
          </button>
        </nav>
      </aside>
      {/* Fondo oscuro al abrir sidebar en móvil */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
        />
      )}
    </>
  );
} 
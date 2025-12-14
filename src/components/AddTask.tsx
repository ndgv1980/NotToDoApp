import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import type { TaskType } from '../types/task';

export default function AddTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState<TaskType>('casa');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim()) {
      addTask(nombre, descripcion, tipo);
      navigate('/tasks');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center pt-8">
          Agregar Tarea
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nombre de la Tarea
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Ej: Comprar víveres"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
              rows={4}
              placeholder="Describe los detalles de la tarea..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TaskType)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
            >
              <option value="casa">Casa</option>
              <option value="trabajo">Trabajo</option>
              <option value="negocios">Negocios</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Agregar Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


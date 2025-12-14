import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import type { TaskType } from '../types/task';

const tipoColors: Record<TaskType, string> = {
  trabajo: 'bg-blue-100 text-blue-800 border-blue-200',
  casa: 'bg-green-100 text-green-800 border-green-200',
  negocios: 'bg-purple-100 text-purple-800 border-purple-200',
};

const tipoLabels: Record<TaskType, string> = {
  trabajo: 'Trabajo',
  casa: 'Casa',
  negocios: 'Negocios',
};

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, toggleTask, deleteTask } = useTasks();

  const task = id ? getTaskById(id) : undefined;

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Tarea no encontrada</p>
          <Link
            to="/tasks"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Volver a la Lista
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      deleteTask(task.id);
      navigate('/tasks');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center pt-8">
          Detalles de la Tarea
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">
              Nombre
            </label>
            <h2 className="text-2xl font-bold text-gray-800">{task.nombre}</h2>
          </div>

          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">
              Descripción
            </label>
            <p className="text-gray-700 leading-relaxed">
              {task.descripcion || 'Sin descripción'}
            </p>
          </div>

          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">
              Tipo
            </label>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${tipoColors[task.tipo]}`}
            >
              {tipoLabels[task.tipo]}
            </span>
          </div>

          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">
              Estado
            </label>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full ${
                  task.completada ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              ></div>
              <span className="text-gray-700 font-medium">
                {task.completada ? 'Completada' : 'Pendiente'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">
              Fecha de Creación
            </label>
            <p className="text-gray-700">
              {new Date(task.fechaCreacion).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            {!task.completada && (
              <button
                onClick={() => {
                  toggleTask(task.id);
                  navigate('/tasks');
                }}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Marcar como Completada
              </button>
            )}
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Eliminar Tarea
            </button>
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/tasks"
            className="block w-full bg-white text-indigo-600 text-center py-3 rounded-xl font-semibold shadow-md border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Volver a la Lista
          </Link>
        </div>
      </div>
    </div>
  );
}


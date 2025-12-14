import { Link } from 'react-router-dom';
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

export default function TaskList() {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const tareasPendientes = tasks.filter((task) => !task.completada);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 pt-8">
          <h1 className="text-3xl font-bold text-gray-800">Mis Tareas</h1>
          <Link
            to="/add-task"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors"
          >
            + Agregar
          </Link>
        </div>

        {tareasPendientes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-500 text-lg mb-4">
              No hay tareas pendientes
            </p>
            <Link
              to="/add-task"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Crear Primera Tarea
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {tareasPendientes.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl shadow-md p-4 border-l-4 border-indigo-500"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      {task.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {task.descripcion || 'Sin descripción'}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${tipoColors[task.tipo]}`}
                    >
                      {tipoLabels[task.tipo]}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/task/${task.id}`}
                    className="flex-1 bg-indigo-100 text-indigo-700 text-center py-2 rounded-lg font-medium hover:bg-indigo-200 transition-colors text-sm"
                  >
                    Ver Detalles
                  </Link>
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors text-sm"
                  >
                    Completar
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link
            to="/"
            className="block w-full bg-white text-indigo-600 text-center py-3 rounded-xl font-semibold shadow-md border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}


import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function Home() {
  const { tasks } = useTasks();
  const tareasPendientes = tasks.filter((task) => !task.completada).length;
  const tareasCompletadas = tasks.filter((task) => task.completada).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center pt-8">
          NotToDoApp
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Resumen de Tareas
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Pendientes</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">
                {tareasPendientes}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Completadas</span>
              </div>
              <span className="text-2xl font-bold text-green-600">
                {tareasCompletadas}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to="/tasks"
            className="block w-full bg-indigo-600 text-white text-center py-4 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition-colors"
          >
            Ver Lista de Tareas
          </Link>
          <Link
            to="/add-task"
            className="block w-full bg-white text-indigo-600 text-center py-4 rounded-xl font-semibold shadow-md border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Agregar Nueva Tarea
          </Link>
        </div>
      </div>
    </div>
  );
}


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Home from './components/Home';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;


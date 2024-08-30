import logo from './logo.svg';
import './App.css';
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Machine from '../src/components/Machine';
import MachineType from '../src/components/MachineType';
import MachineList from './components/MachineList';
function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<MainLayout><MachineList /></MainLayout>} />
      <Route path='/types' element={<MainLayout><MachineType /></MainLayout>} />
      <Route path='/types/:id' element={<MainLayout><Machine /></MainLayout>} />
     </Routes>
    </div>
  );
}

export default App;

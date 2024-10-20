import './App.css';
import WebRoutes from './WebRoutes.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <WebRoutes />
      <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default App;

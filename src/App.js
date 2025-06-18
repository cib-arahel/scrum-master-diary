import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css'; // Adicione esta linha
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import AnalysisChart from './components/AnalysisChart';
import ReflectionTip from './components/ReflectionTip';
import ExportPDF from './components/ExportPDF';

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="text-center my-4">Diário de Scrum Master</h1>
        <ReflectionTip />
        <Routes>
          <Route path="/" element={
            <>
              <EntryForm />
              <EntryList />
              <AnalysisChart />
              <ExportPDF />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
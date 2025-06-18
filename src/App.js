import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import AnalysisChart from './components/AnalysisChart';
import ReflectionTip from './components/ReflectionTip';
import ExportPDF from './components/ExportPDF';

function App() {
  return (
    <Router>
      <div className="app-background">
        <header className="app-header">
          <h1>📝 Diário de Scrum Master</h1>
          <p className="subtitle">Organize, analise e reflita sobre sua jornada</p>
        </header>
        
        <div className="container app-container">
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
      </div>
    </Router>
  );
}

export default App;

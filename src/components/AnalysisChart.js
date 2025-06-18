import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AnalysisChart() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'entries'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    });
    return unsubscribe;
  }, []);

  const categories = ['Facilitação', 'Coaching', 'Impedimentos', 'Outros'];
  const counts = categories.map(cat => entries.filter(e => e.category === cat).length);

  const data = {
    labels: categories,
    datasets: [{
      label: 'Entradas por Categoria',
      data: counts,
      backgroundColor: ['#0d6efd', '#198754', '#dc3545', '#6c757d']
    }]
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5>Análise</h5>
        <Bar data={data} options={{ scales: { y: { beginAtZero: true } } }} />
      </div>
    </div>
  );
}

export default AnalysisChart;
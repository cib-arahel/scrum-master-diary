import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import jsPDF from 'jspdf';

function ExportPDF() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'entries'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    });
    return unsubscribe;
  }, []);

  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.text('Diário de Scrum Master', 10, 10);
    let y = 20;
    entries.filter(e => !e.private).forEach(entry => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(`${entry.date} - ${entry.category}`, 10, y);
      doc.text(entry.description, 10, y + 10);
      if (entry.reflection) doc.text(`Reflexão: ${entry.reflection}`, 10, y + 20);
      y += 30;
    });
    doc.save('diario_scrum_master.pdf');
  };

  return (
    <button className="btn btn-success mb-4" onClick={handleExport}>
      Exportar como PDF
    </button>
  );
}

export default ExportPDF;
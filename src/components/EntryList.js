import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';

function EntryList() {
  const [entries, setEntries] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'entries'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    });
    return unsubscribe;
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir essa entrada?')) {
      await deleteDoc(doc(db, 'entries', id));
    }
  };

  const filteredEntries = filterCategory
    ? entries.filter(e => e.category === filterCategory)
    : entries;

  return (
    <div className="entrylist-card mb-4">
      <div className="card-body">
        <h5 className="fw-bold mb-3">📑 Entradas</h5>

        <select
          className="form-select mb-4"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Todas</option>
          <option>Facilitação</option>
          <option>Coaching</option>
          <option>Impedimentos</option>
          <option>Outros</option>
        </select>

        {filteredEntries.length === 0 && (
          <p className="text-muted">Nenhuma entrada encontrada.</p>
        )}

        {filteredEntries.map(entry => (
          <div
            key={entry.id}
            className="entry-item mb-3 p-3 rounded"
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <strong>{entry.date} - {entry.category}</strong>
                {entry.private && (
                  <span className="badge bg-warning ms-2">Privado</span>
                )}
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(entry.id)}
              >
                🗑️ Excluir
              </button>
            </div>

            <p className="mb-1">{entry.description}</p>

            {entry.reflection && (
              <p className="fst-italic text-light-emphasis">
                💭 <em>Reflexão:</em> {entry.reflection}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntryList;

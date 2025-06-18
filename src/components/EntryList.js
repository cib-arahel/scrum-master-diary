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
    await deleteDoc(doc(db, 'entries', id));
  };

  const filteredEntries = filterCategory
    ? entries.filter(e => e.category === filterCategory)
    : entries;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5>Entradas</h5>
        <select
          className="form-select mb-3"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Todas</option>
          <option>Facilitação</option>
          <option>Coaching</option>
          <option>Impedimentos</option>
          <option>Outros</option>
        </select>
        {filteredEntries.map(entry => (
          <div key={entry.id} className="border-bottom mb-2">
            <strong>{entry.date} - {entry.category}</strong>
            <p>{entry.description}</p>
            {entry.reflection && <p><em>Reflexão:</em> {entry.reflection}</p>}
            {entry.private && <span className="badge bg-warning">Privado</span>}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(entry.id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntryList;
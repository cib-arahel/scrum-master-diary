import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

function EntryForm() {
  const [entry, setEntry] = useState({
    category: 'Facilitação',
    description: '',
    reflection: '',
    private: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'entries'), {
        ...entry,
        date: new Date().toLocaleDateString('pt-BR')
      });
      setEntry({ category: 'Facilitação', description: '', reflection: '', private: false });
      alert('Entrada salva!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <div className="entryform-card mb-4">
      <div className="card-body">
        <h5 className="fw-bold mb-3">📝 Nova Entrada</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Categoria</label>
            <select
              className="form-select"
              value={entry.category}
              onChange={(e) => setEntry({ ...entry, category: e.target.value })}
            >
              <option>Facilitação</option>
              <option>Coaching</option>
              <option>Impedimentos</option>
              <option>Outros</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Descrição</label>
            <textarea
              className="form-control"
              value={entry.description}
              onChange={(e) => setEntry({ ...entry, description: e.target.value })}
              required
              rows={3}
              placeholder="Descreva sua atividade..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Reflexão</label>
            <textarea
              className="form-control"
              value={entry.reflection}
              onChange={(e) => setEntry({ ...entry, reflection: e.target.value })}
              rows={3}
              placeholder="O que você aprendeu ou percebeu?"
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={entry.private}
              onChange={(e) => setEntry({ ...entry, private: e.target.checked })}
              id="privateCheck"
            />
            <label className="form-check-label" htmlFor="privateCheck">Privado</label>
          </div>

          <button type="submit" className="btn btn-primary">
            💾 Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EntryForm;

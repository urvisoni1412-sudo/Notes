import { useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";
import SearchBar from "../components/SearchBar";

const getErrorMessage = (err) =>
  err.response?.data?.message ||
  "Server se connect nahi ho paya. Kya backend chal raha hai?";

const Notes = () => {
  const { user, logout } = useAuth();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");
      setNotes(response.data);
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      if (editId) {
        await api.put(`/notes/${editId}`, { title, content });
      } else {
        await api.post("/notes", { title, content });
      }
      resetForm();
      fetchNotes();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      if (editId === id) resetForm();
      fetchNotes();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const term = searchTerm.trim().toLowerCase();
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(term) ||
      (note.content || "").toLowerCase().includes(term)
  );

  return (
    <div className="container">
      <div className="header">
        <h1>📝 Notes App</h1>
        <div className="user-info">
          <span>Hi, {user.name}</span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <NoteForm
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        isEditing={editId !== null}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {error && <div className="error-box">⚠️ {error}</div>}

      {loading && <p className="status">Loading notes...</p>}

      {!loading && !error && notes.length === 0 && (
        <p className="status">no notes available</p>
      )}

      {!loading && notes.length > 0 && filteredNotes.length === 0 && (
        <p className="status">Koi note match nahi hua 🔍</p>
      )}

      {filteredNotes.map((note) => (
        <NoteItem
          key={note._id}
          note={note}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Notes;
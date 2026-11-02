const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-buttons">
        <button className="edit-btn" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(note._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
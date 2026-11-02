const NoteForm = ({
  title,
  content,
  setTitle,
  setContent,
  isEditing,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="note-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="form-buttons">
        <button type="submit">
          {isEditing ? "Update Note" : "Add Note"}
        </button>
        {isEditing && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
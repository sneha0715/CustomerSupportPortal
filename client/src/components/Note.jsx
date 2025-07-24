const Note = ({ value, setNote, onChange, onSubmit}) => {
  return (
    <div className="px-[40vh] pt-10 w-full flex flex-col justify-center rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Note</h2>
      <form onSubmit={onSubmit}>
        <textarea
          className="input-field"
          placeholder="Write your note"
          value={value}
          onChange={onChange}
        />

        {/* {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>} */}

        <button type="submit" className="auth-button">
          Submit
      
        </button>
      </form>
    </div>
  );
};

export default Note;

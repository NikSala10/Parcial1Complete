const CardBook = ({book, isFavorite, onDelete, onFavorite, onChangeState, onAddNote}) => {
    return (
    <>
    <div className="card">
      <h3 className="card-title">{book.title}</h3>
      <p className="card-author">{book.author_name?.join(", ")}</p>
      <p className="card-year">{book.first_publish_year}</p>
        {isFavorite ? (
        <>
          <div className="card-section">
            <label>Estado: </label>
            <select className="card-select"
              value={book.status || "Pendiente"} 
              onChange={(e) => onChangeState(book.key, e.target.value)}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Leyendo">Leyendo</option>
              <option value="Terminado">Terminado</option>
            </select>
          </div>

          <div className="card-section"> 
            <label>Notas personales: </label>
            <textarea className="card-textarea"
              value={book.notes || ""}
              onChange={(e) => onAddNote(book.key, e.target.value)}
              placeholder="Escribe tus notas personales..."
            />
            <p className="note-preview">Notas: {book.notes}</p>
          </div>
          <button className="btn btn-delete" onClick={() => onDelete(book.key)}>Eliminar</button>
        </>
      ) : (
        <button className="btn btn-add" onClick={() => onFavorite(book)}>Añadir a lista</button>
      )}
    </div>
    </>
    )
}

export default CardBook;
import {useState } from 'react'
import CardList from './components/CardList';
import './App.css'

function App() {
  
  const [search, setSearch] = useState('');  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState([]);
  const [favorites, setFavorites] = useState([]);
  console.log(favorites);
  
  
  const filteredBooks = book.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));  
  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const booksData = await fetch(`https://openlibrary.org/search.json?q=${search}&limit=10`).then((res)=>res.json());
      setBook(booksData.docs);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddBook = ((book) => {
    setFavorites([...favorites, {...book, status: 'Pendiente', notes: ""}]);
  })

  const handleDelete = (id) => {
    const booksFiltered = favorites.filter((book) => book.key !== id);
    setFavorites(booksFiltered);
  }

  const handleChangeState = (id, newStatus) => {
    const listStatusChanged = favorites.map((book) =>
      book.key === id ? { ...book, status: newStatus } : book
    );
    setFavorites(listStatusChanged);
  };

  const handleChangeNotes = (id, newNotes) => {
    const listNotesChanged = favorites.map((book) =>
      book.key === id ? { ...book, notes: newNotes } : book
    );
    setFavorites(listNotesChanged);
  };

  if(error) return <p>Hay un error: {error}</p>
  if(loading) return <p>Cargando.....</p>

  return (
    <div className='container'>
      <h1>Book Track</h1>
      <form className="search-form" onSubmit={(e) => handleSearch(e)}>
        <input type='text' 
        placeholder='Buscar libro' 
        className="search-input"
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className="search-btn">Buscar</button>      
       </form>

      {book.length === 0 ? (
        <p>No has buscado libros.</p>
      ) : filteredBooks.length > 0 ? (
        <CardList
          books={filteredBooks}
          onFavorite={handleAddBook}
          onDelete={handleDelete}
          isFavorite={false}
        />
      ) : (
        <p>No se encontraron resultados para tu búsqueda.</p>
      )}

      <h2>Lista de lectura:</h2>
      <div>
        {favorites.length > 0 ? (
          <CardList books={favorites} onDelete={handleDelete} isFavorite={true} onChangeState={handleChangeState} onAddNote={handleChangeNotes}/>
			) : (
				<p>No tienes libros guardados.</p>
			)}
      </div>
    </div>
  )
}

export default App

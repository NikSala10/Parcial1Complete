import CardBook from "./CardBook";

const CardList = ({books, isFavorite, onDelete, onFavorite, onChangeState, onAddNote}) => {

    return(
        <div className="card-grid">
            {books.map((book) => 
            <CardBook
            book={book} 
            key={book.key}
            onFavorite={onFavorite}
            isFavorite={isFavorite}
            onDelete={onDelete}
            onChangeState={onChangeState}
            onAddNote={onAddNote}
            />)}
        </div>    )
}

export default CardList;
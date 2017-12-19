import React from 'react'

const BookShelf = (props) => {
	return (		
		<ol className="books-grid">

		  {props.books.map(book =>
			  <li key={book.id}>
			    <div className="book">
			      <div className="book-top">				      	
			        <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
			        <div className="book-shelf-changer">
			          <select value={book.shelf} onChange={event => props.onChangeShelf(book.id, event.target.value)}>
			            <option value="none" disabled>Move to...</option>				            
		            	<option value="currentlyReading">Currently Reading</option> 			            
		            	<option value="wantToRead">Want to Read</option>			            
		            	<option value="read">Read</option> 
			            <option value="none">None</option>
			          </select>
			        </div>
			      </div>
			      <div className="book-title">{book.title}</div>
			      {book.authors.map(author =>
		            <div key={author} className="book-authors">
		              {author}
		            </div>
		          )}
			    </div>
			  </li>
		  )}

		</ol>
	)
}

export default BookShelf
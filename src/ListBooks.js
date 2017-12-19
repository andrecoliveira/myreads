import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

const ListBooks = (props) => {
	return (
			
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">

		            <div className="bookshelf">
						<h2 className="bookshelf-title">Currently Reading</h2>
						<div className="bookshelf-books">
							<BookShelf key="currently" 
		            		books={props.booksOnShelf.filter(book => book.shelf === 'currentlyReading')}
		            		onChangeShelf={props.changeShelf} />
						</div>
					</div>

					<div className="bookshelf">
						<h2 className="bookshelf-title">Want to Read</h2>
						<div className="bookshelf-books">
							<BookShelf key="wantToRead" 
		            		books={props.booksOnShelf.filter(book => book.shelf === 'wantToRead')}
		            		onChangeShelf={props.changeShelf} />
						</div>
					</div>

					<div className="bookshelf">
						<h2 className="bookshelf-title">Read</h2>
						<div className="bookshelf-books">
							<BookShelf key="read" 
		            		books={props.booksOnShelf.filter(book => book.shelf === 'read')}
		            		onChangeShelf={props.changeShelf} />
						</div>
					</div>  

	            </div>
	            <div className="open-search">
	              <Link to="/search">Add a book</Link>
	            </div>
          	</div>
	)
}


export default ListBooks
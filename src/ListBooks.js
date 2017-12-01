import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
//import * as BooksAPI from './utils/BooksAPI'

class ListBooks extends Component {	

	render(){		

		return (
			
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">

	            	<BookShelf key="currently" 
	            		bookshelfTitle="Currently Reading" 
	            		books={this.props.booksOnShelf.filter(book => book.shelf === 'currentlyReading')}
	            		onChangeShelf={this.props.changeShelf} />


	            	<BookShelf key="wantToRead" 
	            		bookshelfTitle="Want to Read" 
	            		books={this.props.booksOnShelf.filter(book => book.shelf === 'wantToRead')}
	            		onChangeShelf={this.props.changeShelf} />


	            	<BookShelf key="read" 
	            		bookshelfTitle="Read" 
	            		books={this.props.booksOnShelf.filter(book => book.shelf === 'read')}
	            		onChangeShelf={this.props.changeShelf} />

	            </div>
	            <div className="open-search">
	              <Link to="/create">Add a book</Link>
	            </div>
          	</div>

		)
	}

}

export default ListBooks
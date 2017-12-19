import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './utils/BooksAPI'

class SearchPage extends Component {

	state = {
		query: '',
		books: [],
		bookSelected: '',
     	searchResponse: 'empty'
	}

	updateQuery = (query) => {
		this.setState({ query })

		if(query) {			
			BooksAPI.search(query, 20).then(books=>{
				if(books.length > 0){
					books.map( book => this.updateBookShelf(book) )
					this.setState({ books })
				} else {
					this.setState({ books: [], searchResponse: 'not-found' })
				}
			})
		} else {
			this.setState({ books: [], searchResponse: 'empty' })
		}
	}

	updateBookShelf = (book) => {
		const myListBooks = this.props.booksOnShelf
		const bookFound = myListBooks.find( myBook => myBook.id === book.id)
		if(bookFound) {
			book.shelf = bookFound.shelf
		} else {
			book.shelf = 'none'
		}
		return book
	}

	handleChangeShelf  = (bookID, shelf) => {
		let book = this.state.books.find( b => b.id === bookID )

		this.setState({ bookSelected: book.title })
		this.props.changeShelf(book, bookID, shelf)
  	}

	render(){

		let showingBooks

		if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			showingBooks = this.state.books.filter(book => match.test(book.title))
		} else {
			showingBooks = this.state.books
		}		

		return (

			<div className="search-books">
	            <div className="search-books-bar">
	              <Link className="close-search" to="/">Close</Link>
	              <div className="search-books-input-wrapper">
	                {/*
	                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
	                  You can find these search terms here:
	                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	                  you don't find a specific author or title. Every search is limited by search terms.
	                */}
                	<input type="text" 
	                	placeholder="Search by title or author" 
	                	value={this.state.query} 
	                	onChange={event => this.updateQuery(event.target.value)} />
	              </div>
	            </div>
	            <div className="search-books-results">

	              {this.state.searchResponse === 'not-found' && (
		            <div className="msg-alert">
		            	<span>Please try again!</span>
		            </div>
		          )}

		          {this.state.bookSelected !== '' && (
		            <div className="msg-confirm">
		          		<span>The <strong>{this.state.bookSelected}</strong> book was sent to your shelf</span>
		            </div>
		          )}

		          <BookShelf key="bookFound" books={showingBooks} onChangeShelf={this.handleChangeShelf} />

	            </div>
          	</div>

		)
	}

}

export default SearchPage
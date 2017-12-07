import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './utils/BooksAPI'

class SearchPage extends Component {

	state = {
		query: '',
		books: [],
     	searchResponse: 'empty'
	}

	updateQuery = (query) => {
		if(!query) {
			this.setState({ books: [] })
			console.log('vazio')
			console.log(this.state.books)  
		} else {
			this.setState({ query })
			this.search(query)
		}
	}

	search = (query) => {

		//const myListBooks = this.props.booksOnShelf
		BooksAPI.search(query, 20).then(books=>{
			//Exibir somente os livros que não estão na minha estante
			//const searchFiltered = books.filter(book => myListBooks.map(c => c.title).indexOf(book.title) === -1)
			books.length > 0 ? this.setState({ books }) : this.setState({ books: [] })	      	
		})
  	}

	handleChangeShelf  = (bookID, shelf) => {
      let book = this.state.books.find( b => b.id === bookID )

      //Retirar o livro escolhido da sessão de filtrados na busca
      this.setState({ books: this.state.books.filter( b => b.id !== bookID ) })

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

	              {this.state.searchResponse === 'not-found'  && (
		            <div className="msg-alert">
		            	<span>Please try again!</span>
		            </div>
		          )}

		          {this.state.searchResponse === 'found' && (
		            <div className="msg-confirm">
		          		<span>{this.state.books.length} books found</span>
		            </div>
		          )}

		          {this.state.query}

	              <ol className="books-grid">	              	

	              	{showingBooks.map(book =>
					  <li key={book.id}>
					    <div className="book">
					      <div className="book-top">
					        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
					        <div className="book-shelf-changer">
					          <select value={book.shelf} onChange={event => this.handleChangeShelf(book.id, event.target.value)}>
					            <option value="none" disabled>Move to...</option>
					            <option value="currentlyReading">Currently Reading</option>
					            <option value="wantToRead">Want to Read</option>
					            <option value="read">Read</option>
					            <option value="none">None</option>
					          </select>
					        </div>
					      </div>
					      <div className="book-title">{book.title}</div>
					      {book.authors &&
		                  <div className="book-authors">
		                    {book.authors[0]}
		                  </div>}
					    </div>
					  </li>
					)}

	              </ol>
	            </div>
          	</div>

		)
	}

}

export default SearchPage
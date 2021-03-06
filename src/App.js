import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchPage from './SearchPage'
import './App.css'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  handleChangeShelf  = (bookID, shelf) => {
      let book = this.state.books.find( b => b.id === bookID )
      this.bookUpdate(book, bookID, shelf)    
  }  

  bookUpdate = (book, bookID, shelf) => {
    BooksAPI.update(book, shelf).then(() => {

      book.shelf = shelf
      this.setState({
        books: this.state.books.filter( b => b.id !== bookID ).concat(book)
      })

    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks booksOnShelf={this.state.books} 
            changeShelf={this.handleChangeShelf} />
        )} />

        <Route path="/search" render={() => (
          <SearchPage changeShelf={this.bookUpdate} booksOnShelf={this.state.books} />
        )} />

      </div>
    )
  }
}

export default BooksApp

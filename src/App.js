import React from 'react'
import Bookshelf from './bookshelf.js'
import * as BooksApi from './BooksAPI.js'
import { Route, Link } from 'react-router-dom'

// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './search.js'



export default class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
        books: [],
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        currentlyReading: [],
        wantToRead: [],
        read: [],
        showSearchPage: false
      }
    this.changeShelf = this.changeShelf.bind(this);
  }

update_books(){
    BooksApi.getAll().then((books) => {
      this.setState({ books })

  
        const filtered_read = books.filter(function(value) { 
          return value.shelf === "read"
       });
       const filtered_reading = books.filter(function(value) { 
        return value.shelf === "currentlyReading"
        });
        const filtered_wantRead = books.filter(function(value) { 
        return value.shelf === "wantToRead"
        });
      
       this.setState({ 
         read: filtered_read,
         wantToRead: filtered_wantRead,
         currentlyReading: filtered_reading      
        })
      })
}
  componentDidMount() {
    this.update_books();
  }

changeShelf(passedValue, book) {
      BooksApi.update(book, passedValue).then(() => {
        this.update_books()})

    }

      



  render() {
    return (
      <div className="app">
      <Route exact path="/" component={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf currentBooks={this.state.books} books={this.state.currentlyReading} title="Currently Reading" changeShelf={this.changeShelf} />
              <Bookshelf currentBooks={this.state.books} books={this.state.wantToRead} title="Want to read" changeShelf={this.changeShelf}/>
              <Bookshelf currentBooks={this.state.books} books={this.state.read} title="Read" changeShelf={this.changeShelf} />
            </div>
          </div>    
          <div className="open-search">
              <Link to="/search"
                className="open-search"> Search </Link>
            </div> 
          </div>
      )} />
  
                <Route exact path="/search" component={() => (
                    <Search books={this.state.books} changeShelf={this.changeShelf} />
                )} />

          </div>
    )
  }
}

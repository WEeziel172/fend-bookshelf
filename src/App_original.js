import React from 'react'
import Bookshelf from './bookshelf.js'

import * as BooksApi from './BooksAPI.js'

// import * as BooksAPI from './BooksAPI'
import './App.css'



class BooksApp extends React.Component {
  constructor() {
    super();

    this.changeShelf = this.changeShelf.bind(this);
  }
  state = {
    allBooks: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    nowReading: [],
    wantRead: [],
    Read: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksApi.getAll().then((books) => {
      this.setState({ allBooks: books})

      const filtered_read = books.filter(function(value) { 
        return value.shelf == "currentlyReading"
     });
     const filtered_reading = books.filter(function(value) { 
      return value.shelf == "read"
      });
      const filtered_wantRead = books.filter(function(value) { 
      return value.shelf == "wantToRead"
      });
    
     this.setState({ 
       Read: [...this.state.Read, ...filtered_read ],
       wantRead: [...this.state.wantRead, ...filtered_wantRead ],
       nowReading: [...this.state.nowReading, ...filtered_reading ],     
      })
    })
  }
  changeShelf(passedValue, id, shelf) {
    //console.log(passedValue + id + shelf);

    if(shelf == "wantRead") {
      this.setState({wantRead: this.state.wantRead.filter(function(value) { 
        return value.id !== id 
    })});
      console.log(this.state.wantRead);
    }
    else if(shelf == "nowReading") {
      this.setState({nowReading: this.state.nowReading.filter(function(value) { 
        return value.id !== id 
    })});
      console.log(this.state.wantRead);
    }
    else if(shelf == "Read") {
      this.setState({Read: this.state.Read.filter(function(value) { 
        return value.id !== id 
    })});
      console.log(this.state.wantRead);
    }
    if(passedValue == "wantRead") {
      const filtered = this.state.allBooks.filter(function(value) { 
        return value.id == id
     });
    
     this.setState({ wantRead: [...this.state.wantRead, ...filtered ] });
    }
    else if(passedValue == "nowReading") {

      const filtered = this.state.allBooks.filter(function(value) { 
        return value.id == id
     });
    
     this.setState({ nowReading: [...this.state.nowReading, ...filtered ] })
    }
    else if(passedValue == "Read") {

      BooksApi.update(id, passedValue);
    }



    //this.setState({  });
}

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf books={this.state.nowReading} title="Currently Reading" shelf="nowReading" changeShelf={this.changeShelf} />
                <Bookshelf books={this.state.wantRead} title="Want to read" shelf="wantRead" changeShelf={this.changeShelf}/>
                <Bookshelf books={this.state.Read} title="Read" shelf="Read" changeShelf={this.changeShelf} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

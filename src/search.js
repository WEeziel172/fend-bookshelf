import React from 'react'
import './App.css'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Bookgrid from './bookgrid.js'
import * as BooksApi from './BooksAPI.js'


export default class Search extends React.Component {
constructor() {
    super();

    this.state = {
        value: '',
        newValue: '',
        books: []
    }
    this.searchInput = this.searchInput.bind(this);
}

searchInput(event){
    setTimeout(1000);
    this.setState({value: event.target.value});
    BooksApi.search(event.target.value).then((books) => {
        if(books !== undefined || books == 0) {
         books.map(value => value.id == this.props.currentBooks.id)
        this.setState({books})
        }
    console.log(books)
    })
}
render() {
    return (
            <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search">
              Close</Link>
              <div className="search-books-input-wrapper">
                <input value={this.state.value} onChange={this.searchInput} onSubmit={this.searchInput} type="text" placeholder="Search by title or author"/>
                {JSON.stringify(this.state.value)}
              </div>
            </div>
            <div className="search-books-results">
              <Bookgrid books={this.state.books} changeShelf={this.props.changeShelf} />
            </div>
          </div>

    )
}
}
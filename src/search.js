import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Bookgrid from './bookgrid.js'
import * as BooksApi from './BooksAPI.js'


export default class Search extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        currentBooks: this.props.currentBooks,
        value: '',
        newValue: '',
        books: [],
        newbooks: []
    }
    this.searchInput = this.searchInput.bind(this);
}

searchInput(event){
    this.setState({
        value: event.target.value,
        books: [],
        newbooks: []});
    try {

        if(event.target.value !== null && event.target.value !== undefined && event.target.value !== ''){
        BooksApi.search(event.target.value).then((books) => {
            if(books !== undefined || books !== 0) {

            books.map((newbook) => {
                const foundbook = this.props.currentBooks.find(currBook => currBook.id === newbook.id);
                if(foundbook !== undefined && foundbook !== null) {
                    BooksApi.update(newbook.id,foundbook.shelf).then(
                    BooksApi.get(newbook.id).then((book) => {
                      
                        this.setState({ newbooks: [...this.state.newbooks, book]});
                     console.log("found match" + book);
                     }))
                 }
                 else if(foundbook === undefined || foundbook === null) {
                    BooksApi.update(newbook.id, 'none').then(
                        BooksApi.get(newbook.id).then((book) => {
                          
                            this.setState({ newbooks: [...this.state.newbooks, book]});
                         console.log("no match found for" + book);
                         }))
                }
            }
            );
            this.setState({books})
            }
            else {
                alert("Bad");
            }
        //console.log(books)
        })
    }
    else if(event.target.value === undefined || event.target.value === null || event.target.value === '') {
        this.setState({books: [], newbooks: []})
         }
}

    catch(err) {
            alert("Bad");
    }
}
render() {
    return (
            <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search">
              Close</Link>
              <div className="search-books-input-wrapper">
                <input value={this.state.value} onChange={this.searchInput} onSubmit={this.searchInput} type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <Bookgrid currentBooks={this.state.currentBooks} books={this.state.newbooks} changeShelf={this.props.changeShelf} />
            </div>
          </div>

    )
}
}
import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Bookgrid from './bookgrid.js'
import * as BooksApi from './BooksAPI.js'


export default class Search extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        value: '',
        newValue: '',
        books: this.props.books,
        newbooks: []
    }
    this.searchInput = this.searchInput.bind(this);
}

searchInput(event){
    this.setState({
        value: event.target.value,
        newbooks: []});

        if(event.target.value !== '') {
        BooksApi.search(event.target.value).then((books) => {
            //console.log(this.state.value); 
            //console.log(this.state.books);

            if(!books.error) {
            books.map((newbook) => {
                const foundbook = this.state.books.find(currBook => currBook.id === newbook.id);

                if(foundbook) {
                newbook.shelf = foundbook.shelf;
                }
                else {
                    newbook.shelf = 'none';
                }
               
                //console.log(newbook.shelf);
                //console.log(newbook.id);
            
                this.setState({
                    newbooks : [...this.state.newbooks, newbook]});

            })
            //console.log(this.state.newbooks);
         }})

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
              <Bookgrid books={this.state.newbooks} changeShelf={this.props.changeShelf} />
            </div>
          </div>

    )
}
}
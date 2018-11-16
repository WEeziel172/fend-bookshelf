import React from 'react'
import Book from './book.js'

export default class Bookgrid extends React.Component {

    render() {
        const books = this.props.books;
        const listItems = books.map(book =>
          <li key={book.id}><Book title={book.title} author={book.authors} img={book.imageLinks.thumbnail} id={book.id} shelf={book.shelf} changeShelf={this.props.changeShelf}/></li>
        );
        return (

            <ol className="books-grid">{listItems}</ol>
        );
}
}
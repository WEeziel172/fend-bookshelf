import React from 'react'
import Book from './book.js'

export default class Bookgrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBooks: this.props.currentBooks,
            currBook: ''
        
        }
    }

    render() {
        const books = this.props.books;

        const listItems = books.map(book =>

        
        
          <li key={book.id}>
          <Book 
            book={book}
            img={book.imageLinks ? book.imageLinks.thumbnail : "http://4.bp.blogspot.com/-uwcUWZXypb4/V-q0UF3XqYI/AAAAAAAAfPY/GvV6-ch1-RwkucFlcp0NTOtDMYvmr0n7wCK4B/s1600/this%2Bis%2Bjust%2Ba%2Btest%2Bcover.jpg"}
             changeShelf={this.props.changeShelf}/></li>
          );

        return (

            <ol className="books-grid">{listItems}</ol>
        );
}
}
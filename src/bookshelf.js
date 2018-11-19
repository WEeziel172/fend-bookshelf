import React from 'react'
import Bookgrid from './bookgrid.js'

export default class Bookshelf extends React.Component {

    render() {
        return (
<div className="bookshelf">
<h2 className="bookshelf-title">{this.props.title}</h2>
<div className="bookshelf-books">
    <Bookgrid currentBooks={this.props.currentBooks} books={this.props.books} shelf={this.props.books.shelf} changeShelf={this.props.changeShelf} />
</div>
</div>

        );
    }
}

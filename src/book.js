import React from 'react';
import ShelfChanger from './shelfchanger.js'


export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    //this.checkShelf = this.checkShelf.bind(this);
  }

  render() {
  return(


    <div className="book">
<div className="book-top">
  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + this.props.img + ")" }}></div>
  <ShelfChanger book={this.props.book} id={this.props.book.id} shelf={this.props.book.shelf} changeShelf={this.props.changeShelf}/>
</div>
<div className="book-title">{this.props.book.title}</div>
<div className="book-authors">{this.props.book.author}</div>
</div>
  );
}
}

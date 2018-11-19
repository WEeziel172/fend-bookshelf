import React from 'react'
;

export default class ShelfChanger extends React.Component {
    constructor() {
        super();

        this.selectInput = React.createRef();
    }
    
    render() {
        console.log(this.props.shelf);
        return (
            <div className="book-shelf-changer">
            <select ref={(selectInput) => { this.selectInput = selectInput }} defaultValue={this.props.shelf} onChange={() => this.props.changeShelf(this.selectInput.value, this.props.id)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading" >Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
              </select>
          </div>

        );
    }
}

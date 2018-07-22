import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'


class Books extends React.Component{
	
	state={

		shelf:"none"
	}

  componentDidMount(){

   const {book} = this.props
      if(book.shelf){
        this.setState({shelf: book.shelf})
        document.getElementsByTagName("select")[0].setAttribute("value", book.shelf);

      }
      console.log(book)
//alert("mount")
  }

	toggleShelf = (event) => {

	  this.setState({shelf: event.target.value})
	 // console.log(this.state.shelf)
    this.props.toggleShelf(this.props.book, event.target.value)
     BooksAPI.update(this.props.book, event.target.value).then((response) => { 
    })
	}
		
	render(){
	    const {book} = this.props
  		return(
			<li key={book.id}>
           		<div className="book">
                	<div className="book-top">


                    {(book.imageLinks)?  
                    	<div className="book-cover"
                    	style={{ width: 128, height: 193, 
                    	backgroundImage:`url(${book.imageLinks.thumbnail})`}}>
                    	</div> :
                      <div className="book-cover"
                      style={{ width: 128, height: 193,}}>
                      </div>}

                      
                    	<div className="book-shelf-changer">
                      		<select 
                      		onChange ={this.toggleShelf} 
                      		value ={this.state.shelf}
                      		>
                        		<option value="move" disabled>Move to...</option>
                        		<option value="currentlyReading">Currently Reading</option>
                        		<option value="wantToRead">Want to Read</option>
                        		<option value="read">Read</option>
                        		<option value="none">None</option>
                      		</select>
                    	</div>
                  	</div>
                  	<div className="book-title">{book.title}</div>
                    { book.authors && <div className="book-authors">{book.authors}</div>}
                </div>
            </li>
	)}}
	export default Books 

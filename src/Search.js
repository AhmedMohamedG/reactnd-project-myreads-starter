import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from "./Books";

class Search extends React.Component{
	
	state = {
		books: [],
   	query: '',
   	showingBooks: []

		}

  updateShelf=(book,shelf)=>{

            BooksAPI.update(book, shelf).then((response) => {
  

             })

  }
	componentDidMount() {
    	BooksAPI.getAll().then((books) => {
      	this.setState({books})
      	console.log(books.map((book)=>{return book.shelf}) )
      	console.log(typeof this.state.books )

   	})}
  componentWillUpdate(){

      BooksAPI.getAll().then((books) => {
        this.setState({books}) 
})}    

	updateQuery = (event) => {
		this.setState({query: event.target.value})
    console.log("value is " +  event.target.value+ " state is " +this.state.query)

		const{ query ,books  } = this.state
 		let showingBooks = []
   		if (event.target.value) {
     		BooksAPI.search(event.target.value).then(response => {
       		if (response.length) {
          		showingBooks = response.map(b => {
          	 	const	oldBook = books.find(book => {book.id === b.id});
            	if( oldBook) {
              		return oldBook
            	} else {
              		return b
           		}
          		})
        	}
        	this.setState({showingBooks})
      		})
    	}
    	else {
      		this.setState({showingBooks})
    		}

     }

	render() {

		return(
		<div className="search-books">
            <div className="search-books-bar">
            	<Link to="/" className="close-search"> 
					Close              
				</Link>
           		<div className="search-books-input-wrapper">
               		<input 
                	type="text"
                	placeholder="Search by title or author"
                	onChange={ this.updateQuery}
					value = {this.state.query.toString()}
                	 />
          		</div>
         	</div>
         	<div className="search-books-results">
           		<ol className="books-grid">
                {this.state.showingBooks && this.state.showingBooks.map((book, i) => (
				 <Books 
         key={book.id}
                book={book}
                toggleShelf={(book, shelf) => this.updateShelf(book, shelf)}

                	/>
				))}
                </ol> 
            </div>
        </div>
	)}}

	export default Search 


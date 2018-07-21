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

	componentDidMount() {
    	BooksAPI.getAll().then((books) => {
      	this.setState({books})
   	})}

	updateQuery = (value) => {

		this.setState({query: value.trim()})
		const{ query ,books  } = this.state
 		let showingBooks = []
   		if (query) {
     		BooksAPI.search(query).then(response => {
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
                	onChange={(event)=> this.updateQuery(event.target.value)}
					value = {this.state.query}
                	 />
          		</div>
         	</div>
         	<div className="search-books-results">
           		<ol className="books-grid">
                {this.state.showingBooks && this.state.showingBooks.map((book, i) => (
				 <Books 
                book={book}
                	/>
				))}
                </ol> 
            </div>
        </div>
	)}}

	export default Search 


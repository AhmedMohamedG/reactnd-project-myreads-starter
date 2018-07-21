import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from "./Books";


class BookList extends React.Component{

	state = {
		books: [],
   		query: '',
   		showingBooks: [],
   		currentlyReading:[],
   		wantToRead:[],
   		read:[]
		}

	componentDidMount() {
		let currentlyReading=[];
   		let wantToRead=[];
   		let read=[];
    	BooksAPI.getAll().then((books) => {
    		this.setState({books})      	
        books.map((book)=>{
            if(book.shelf === "currentlyReading"){
            	currentlyReading.push(book)
            }else if(book.shelf === "wantToRead"){
            	wantToRead.push(book)
            }else if(book.shelf === "read"){
            	read.push(book)
            } })
        this.setState({currentlyReading})
        this.setState({wantToRead})
        this.setState({read})
   })}

	render() {
  		return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.currentlyReading.map((book)=>{
                        return <Books 
                               book={book}
                                />                                                                		 
                    })}                    
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      
                    {this.state.wantToRead.map((book)=>{
                        return <Books 
                               book={book}
                               />                                                                     
                    })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">                        
                    {this.state.read.map((book)=>{
                      return <Books 
                              book={book}
                             />                         
                    })}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"> 
              Add a book
              </Link>
            </div>
          </div>
          )}}

export default BookList 



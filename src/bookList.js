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
		
    	BooksAPI.getAll().then((books) => {
    		this.setState({books}) 
        this.distribution(this.state.books);     	
   })}
componentWillUpdate(){

      BooksAPI.getAll().then((books) => {
        this.setState({books}) 
        this.distribution(this.state.books);  
})}

      
distribution=(books)=>{
      let currentlyReading=[];
      let wantToRead=[];
      let read=[];
      books.map((book)=>{
            if(book.shelf === "currentlyReading"){            
              currentlyReading.push(book)            
            }else if(book.shelf === "wantToRead"){
              wantToRead.push(book)
            }else if(book.shelf === "read"){
              read.push(book)
            } 
          })
        this.setState({currentlyReading,wantToRead,read})
       
}
  updateShelf=(book,shelf)=>{

           if(shelf === "currentlyReading" && (this.state.currentlyReading.findIndex(b => b.id === book.id) < 0)){
              this.setState({currentlyReading:[...this.state.currentlyReading,book]})
            }else if(shelf === "wantToRead" && (this.state.wantToRead.findIndex(b => b.id === book.id) < 0)){
              this.setState({wantToRead:[...this.state.wantToRead,book]})
            }else if(shelf === "read"&& (this.state.read.findIndex(b => b.id === book.id) < 0)){
              this.setState({read:[...this.state.read,book]})
            } 

            BooksAPI.update(book, shelf).then((response) => {
   

             })

  }
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
                        return <Books key={book.id}
                               book={book}
                              toggleShelf={(book, shelf) => this.updateShelf(book, shelf)}

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
                      toggleShelf={(book, shelf) => this.updateShelf(book, shelf)}
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
                     toggleShelf={(book, shelf) => this.updateShelf(book, shelf)}
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



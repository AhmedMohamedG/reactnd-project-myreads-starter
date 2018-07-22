import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from "./Books";


class BookList extends Component{

	state = {
		books: [],
   		query: '',
   		showingBooks: [],
		}

	componentDidMount() {
		
    	BooksAPI.getAll().then((books) => {
    		this.setState({books}) 
        this.distribution(books);     	
   })}

      
  distribution=()=>{

    let currentlyReading=[];
    let wantToRead=[];
    let read=[];
    this.state.books.forEach((book)=>{
          if(book.shelf === "currentlyReading"){            
            currentlyReading.push(book)            
          }else if(book.shelf === "wantToRead"){
            wantToRead.push(book)
          }else if(book.shelf === "read"){
            read.push(book)
          } 
        })
    let shelfsarr = [currentlyReading,wantToRead,read]
    return   shelfsarr       
  }
  updateShelf=(book,shelf)=>{

           /*if(shelf === "currentlyReading" && (this.state.currentlyReading.findIndex(b => b.id === book.id) < 0)){
              this.setState({currentlyReading:[...this.state.currentlyReading,book]})
            }else if(shelf === "wantToRead" && (this.state.wantToRead.findIndex(b => b.id === book.id) < 0)){
              this.setState({wantToRead:[...this.state.wantToRead,book]})
            }else if(shelf === "read"&& (this.state.read.findIndex(b => b.id === book.id) < 0)){
              this.setState({read:[...this.state.read,book]})
            } */

    BooksAPI.update(book, shelf).then(()=>(  BooksAPI.getAll().then((books) => {
    this.setState({books}) 
})))
  
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
                    {this.distribution()[0].map((book)=>{
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
                      
                    {this.distribution()[1].map((book)=>{
                      return <Books key={book.id}
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
                    {this.distribution()[2].map((book)=>{
                      return <Books key={book.id}
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



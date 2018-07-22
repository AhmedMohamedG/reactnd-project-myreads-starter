import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import BookList from "./bookList";
import Search from "./Search";


function BooksApp() {
  
    return (
      <div className="app">
        
        <Route  path='/search' component={Search} />
        <Route exact path='/' component={BookList} />
      

      </div>
    )
  }


export default BooksApp

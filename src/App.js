import React, {Component} from 'react';
import axios from 'axios';
import Book from './Book';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      value:"harry potter",
      bookList:[],
      searching:false,
      errorMessage:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.search = this.search.bind(this);
    this.getBooks = this.getBooks.bind(this);

  }

  componentDidMount(){
    this.getBooks();
  }

  handleChange(e){
    this.setState({value:e.target.value});    
  }

  handleEnterKey(e){
    if(e.key === 'Enter'){
      this.search();
    }
  }

  search(){
    this.setState({searching:true});
    this.getBooks();    
  }

  getBooks(){
    axios.get('https://www.googleapis.com/books/v1/volumes?q='+this.state.value)
         .then((response) => {           
           if(response.data.totalItems === 0){
            this.setState({bookList:[],
                           searching:false,                           
                           errorMessage:'No books found for ' + this.state.value});            
           }
           else{
            this.setState({bookList: response.data.items, 
                           searching:false,  
                           errorMessage:''});
           }           
         })
         .catch(() => {
           this.setState({bookList:[],
                          searching:false,
                          errorMessage:'Server issue. Please try again.'});
         })
  }

  render(){
    return(
      <div className = "Books-app">
        <div className = "book-search" style={{textAlign:'center', margin:50}}>
          <input 
            type = "text"          
            value = {this.state.value}
            onChange = {this.handleChange}
            onKeyDown = {this.handleEnterKey}
          />
          <button
            type = "button"
            onClick = {this.search}
          >
            Search
          </button>

          {this.state.searching && (
            <label>Searching...</label>
          )}

          {this.state.errorMessage && (
            <p>{this.state.errorMessage}</p>
          )}
        </div>        

        {this.state.bookList && (
          <div className = "book-list">                  
            {this.state.bookList.map((book,index) =>
              <Book key = {book.id}
                    index = {index}
                    imageLinks = {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
                    title = {book.volumeInfo.title}
                    previewLink = {book.volumeInfo.previewLink}
                    description = {book.volumeInfo.description}
                    categories = {book.volumeInfo.categories}
              />          
            )}          
          </div>
        )}        

      </div>
    );
  }  
}

export default App;

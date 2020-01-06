import React, {Component} from 'react';

class Book extends Component {
    render(){
        return (
            <div key = {this.props.id} className = "book">
                {this.props.imageLinks && (
                    <img src = {this.props.imageLinks} alt ={this.props.title} style={{marginLeft:'45%'}}/>
                )}
                <p style={{textAlign:'center'}}>{this.props.index+1 + ". "}<a href = {this.props.previewLink}>{this.props.title}</a></p>
                <p style = {{margin:30}}>Description:  {this.props.description}</p>
                <p style = {{margin:30}}>Category:  {this.props.categories}</p>
            </div>
        )
    }
}

export default Book;
import axios from 'axios'
import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import './PostDetails.css'

class PostDetails extends React.Component{
    constructor(){
        super()
        this.state={
            PostDetails:[],
            input:'',
            comments:'',
            buttonClicked:false,
            id:0
        }
    }


    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then(response=>{
            const data=response.data
            this.setState({PostDetails:data})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleChange=(e)=>{
        const value=e.target.value
        this.setState({input:value})
    }

    handleButtonClick=()=>{
        const buttonClicked=this.state.buttonClicked
        if(buttonClicked){
            this.setState({buttonClicked:false})
        }
        else
        {
            const id= this.props.match.params.id
            axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`)
            .then(response=>{
                const data=response.data
                this.setState({comments:data})
            })
            .catch(err=>{
                console.log(err)
            })
            this.setState({buttonClicked:true})
        }
    }

    render() {
        return (
           
            <div>
                <h1 className="postDetailTitle">Post Details of Id-{this.props.match.params.id}</h1>
                <label className="label">Search</label>
                <form class="example">
                <input  className="search" placeholder="Search by Post title or body" type="text" onChange={this.handleChange} value={this.state.value}/>
                </form>
               {     
                     this.state.PostDetails.filter(filterPost=>{
                        const id=this.props.match.params.id
                        const input=this.state.input
                        if(input==""){
                            return filterPost
                        }
                        else if(filterPost.id==id){
                            if( filterPost.title.toLowerCase().indexOf(input.toLowerCase())>-1  || filterPost.body.toLowerCase().indexOf(input.toLowerCase())>-1)  {
                                return filterPost
                            }
                        }  
                     }).map(post=>{
                      const id=this.props.match.params.id
                      if(post.id==id){
                          return <ul>
                              <h3 className="title">{post.title}</h3>  
                              <h4 className="body1"> {post.body}</h4>
                              <button className="commentButton" onClick={this.handleButtonClick}>Comments</button>
                          </ul>   
                         
                      }
                   })
               }
                
               <ul>
                    {this.state.buttonClicked &&  <h3 className="commentBody">{this.state.comments.body}</h3> }
                    {this.state.buttonClicked &&  <h3 className="commentEmail">{this.state.comments.email}</h3> }
               </ul>
             
               <button className="backButton"> 
               <Link to="/" style={{ textDecoration: 'none' }} >Back</Link> 
               </button>
              
            </div>
         
        )
    }
}

export default PostDetails
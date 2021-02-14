import React, { PureComponent } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import './Post1.css'

class FirstComponents extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            input:''
        }
    }
   

    componentDidMount(){
        this.getData();
    }

    getData() {
        const id=this.props.match.params.id
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => {
                this.setState({posts :res.data})
            });
    }

    handleChange=(e)=>{
        const value=e.target.value
        this.setState({input:value})
    }

    render() {
        return (
            <div>
                <label className="label">Search</label>
                <form class="example">
                <input  className="search" placeholder="Search by Title" type="text" onChange={this.handleChange} value={this.state.value}/>
                </form>
                    <h2 className="title">List of titles of User-{this.props.match.params.id}</h2>
                     {     
                     this.state.posts.filter(filterPost=>{
                        const id=this.props.match.params.id
                        const input=this.state.input
                        if(input==""){
                            return filterPost
                        }
                        else if(filterPost.userId==id){
                            if(filterPost.title.toLowerCase().indexOf(input.toLowerCase())>-1){
                                return filterPost
                            }
                        }  
                     }).map(post=>{
                      const id=this.props.match.params.id
                      if(post.userId==id){
                          return <li className="postTitle"><Link to={`postDetails/${post.id}`} style={{ textDecoration: 'none' }} >{post.title} </Link></li>
                      }
                     })
                     }           
                <button className="button"><Link to="/" style={{ textDecoration: 'none' }} >Back</Link></button>

            </div>  
        )
    }
}

export default FirstComponents
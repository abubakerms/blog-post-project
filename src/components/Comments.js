import axios from 'axios'
import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

class Comments extends React.Component{
    constructor(){
        super()
        this.state={
            comments:[]
        }
    }

    componentDidMount(){
        axios.get(`https://jsonplaceholder.typicode.com/comments`)
        .then(response=>{
            const data=response.data
            this.setState({comments:data})
            console.log(data,"data")
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <BrowserRouter>
            <div>
               {     
                     this.state.comments.map(comment=>{
                      const id=this.props.match.params.id
                      if(comment.id==id){
                          return <ul> 
                              <h4>{comment.email}</h4>
                              <h4>{comment.body}</h4>
                          </ul>   
                         
                      }
                   })
               }
            </div>
            </BrowserRouter>
        )
    }
}

export default Comments
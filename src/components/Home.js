import React from 'react'
import axios from 'axios'
import {Link,BrowserRouter } from 'react-router-dom'
import './Home.css'

class Home extends React.Component{
    constructor(){
        super()
        this.state={
            users:[],
            input:''
        }
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            const data=response.data
            this.setState({users:data})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleChange=(e)=>{
        const inputText=e.target.value
        console.log(e.target.value,"e")
        this.setState({input:inputText})
    }

    render(){
        return(
            <div className="home">
                <h1 class="blogTitle">Welcome to Blog Post Website</h1>
                <label className="label">Search</label>
                <form class="example">
                <input  className="search" type="text" placeholder="Search by Name or Company" onChange={this.handleChange} value={this.state.value}/>
                </form>
                
                <div className="table">
                <table border="2" >
                    <tr>
                        <th> Name    </th>
                        <th> Company </th>
                        <th> Post    </th>
                    </tr>
            
                        <tbody>
                            {
                                this.state.users.filter(user=>{
                                   const inputText=(this.state.input).toLowerCase()
                                    if(inputText==''){
                                        return user
                                    }
                                    else
                                    return ((user.name.toLowerCase()).indexOf(inputText)>-1)  || ((user.company.name.toLowerCase()).indexOf(inputText)>-1)})
                                    .map((user,index)=>{
                                    return(
                                            <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.company.name}</td>
                                            <td className="posts"> <Link to={`posts/${user.id}`} style={{ textDecoration: 'none' }}>Posts </Link> </td>  
                                            </tr>                  
                                    )  
                                })
                            }
                        </tbody>  
                </table>
                </div>
            </div>
        )
    }
}

export default Home
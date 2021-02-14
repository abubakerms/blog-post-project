import Home from './components/Home'
import {Link,Route,BrowserRouter } from 'react-router-dom'
import './App.css'


import FirstComponents from './components/Post1'
import PostDetails from './components/PostDetils'
import Comments from './components/Comments'

function App() {
  return (
    <BrowserRouter >
    <div className="app">

    
    <Route path="/" component={Home} exact={true}/>
    <Route path="/posts/:id" component={FirstComponents} exact={true}/>
    <Route path="/posts/postDetails/:id" component={PostDetails} exact={true}/>
    {/* <Route path="/posts/postDetails/:id" component={Comments} exact={true}/> */}

     
    </div>
    </BrowserRouter>
  );
}

export default App;

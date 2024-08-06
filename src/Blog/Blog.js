import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function Blog() {
  var [posts,setposts] =React.useState([])
  var [newpost,setNewpost] =React.useState({thought: '',url:'',date:null,tags:null,author:'',likes:0,comments:[]})
  function handleThought(e) {
    setNewpost({...newpost,thought: e.target.value})
  }
  function handleUrl(e){
    setNewpost({...newpost, url: e.target.value})
  }
  function addpost(){
    setposts([...posts,{...newpost,date:Date.now() ,author:'meghana',likes:0,comments:[]}])
  }
  console.log(posts)
  return (
    <div>
    <div className='border  border-info border-2 m-2 p-2 d-flex align-items-center justify-content-around'>
      <div>
        <textarea style ={{verticalAlign:'middle'}} rows="4" cols='50' placeholder='enter your thought'  onChange={handleThought} ></textarea>
      <br />
      <input type='text' size="50" placeholder='enter your image url' onChange={handleUrl}></input>
      </div> 
      <div>
        <button className='btn btn-success btn-lg m-2' onClick={addpost} > Add post</button>
      </div>
     </div>
     <hr />
     <div>
      <ul>
        {
          posts.map((posts)=> {
            return <li className='d-flex'>
              <img src={posts.url} alt="" className='w- border border-2 p-2 m-2' />
            <div>
              <h1> {posts.author } </h1>
              <p>{posts.thought}</p>
              
            </div>
            </li>
          })
        }
      </ul>
     </div>
     </div>
  );
}

export default Blog;

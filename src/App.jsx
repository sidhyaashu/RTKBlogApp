// import './App.css'
// // import Counter from './component/counter/Counter'
// import PostList from './component/social/PostList'

// function App() {
  

//   return (
//     <div className="App">
//       {/* <Counter/> */}
//       <PostList/>
//     </div>
//   )
// }

// export default App





//blog app -2


import './App.css'
import PostAddForm from './component/social/PostAddForm'
// import Counter from './component/counter/Counter'
import PostList from './component/social/PostList'
import SinglePostPage from './component/social/SinglePostPage'
import Layout from './otherComponents/Layout'
import { Routes,Route } from 'react-router-dom'
import Header from './otherComponents/Header'
import EditPostForm from './component/social/EditPostForm'

      // <Counter/>
      // <PostAddForm/>
      // <PostList/>
      // <SinglePostPage/>

function App() {
  


  return (
      <>
    <Header/>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route index element={<PostList/>}/>
        <Route path='post'>
          <Route index element={<PostAddForm/>}/>
          <Route path=':postId' element={<SinglePostPage/>}/>
          <Route path='edit/:postId' element={<EditPostForm/>}/>
          {/* <Route path='counter' element={<Counter/>}/> */}
        </Route>
      </Routes> 
      </>
  )
}

export default App

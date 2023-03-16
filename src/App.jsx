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
import Counter from './component/counter/Counter'
import PostList from './component/social/PostList'
import SinglePostPage from './component/social/SinglePostPage'
import Layout from './otherComponents/Layout'
import { Routes,Route,Navigate } from 'react-router-dom'
import Header from './otherComponents/Header'
import EditPostForm from './component/social/EditPostForm'
import UserPage from './component/user/UserPage'
import UsersList from './component/user/UsersList'



const App=()=> {
  


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
        </Route>

        <Route path='user'>
          <Route index element={<UsersList/>}/>
          <Route path=':userId' element={<UserPage/>}/>
        </Route>

        <Route path='counter' element={<Counter/>}/>

        <Route path='*' element={<Navigate to='/' replace/>}/>


      </Routes> 
      </>
  )
}

export default App

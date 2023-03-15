import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import { fetchUsers } from './component/user/userSlice.js'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { fetchPosts } from './component/social/socialSlice'

store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

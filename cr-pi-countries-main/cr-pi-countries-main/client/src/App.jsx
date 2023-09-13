import Landing from './views/Landing/Landing'
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import Form from './views/Form/Form'
import NavBar from './components/NavBar/NavBar'
import { Routes, Route, useLocation } from 'react-router-dom'

const App = () => {   
   const location = useLocation()
   // La prop pathname del objeto que devuelve el hook me devuelve el path donde estoy ubicada.

   return (
    <div className='App'>
      {location.pathname !== '/' && <NavBar />}
      <Routes>
         <Route path='/' element={<Landing/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/detail/:id' element={<Detail/>} />
         <Route path='/activities' element={<Form />} />
      </Routes>
    </div>
  )
}

export default App;
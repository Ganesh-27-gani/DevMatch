import About from './About'
import './App.css'
import Navbar from './Navbar'
import OurService from './OurService'
import Reagester from './Reagester'
import Rout from './routes/Rout'
 
function App() {
  

  return (
    <>
        <Navbar/>
        <Rout/>
        <OurService/>
        <About/>
     </>
  )
}

export default App

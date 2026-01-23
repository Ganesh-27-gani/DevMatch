import About from './About'
import './App.css'
import Navbar from './Navbar'
import OurService from './OurService'
import Powered from './Powered'
import Reagester from './Reagester'
import Rout from './routes/Rout'
 
function App() {
  

  return (
    <>
        <Navbar/>
        <Rout/>
        <OurService/>
        <About/>
        <Powered/>
     </>
  )
}

export default App

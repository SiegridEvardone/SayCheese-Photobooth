import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import LayoutPage from './pages/LayoutPage'
import CapturePage from './pages/CapturePage'
import CustomizePage from './pages/CustomizePage'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'

function App() {

  return (
    <div>
      <Navbar/>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/About' element={<About />}/>
          <Route path='/LayoutPage' element={<LayoutPage />}/>
          <Route path='/CapturePage' element={<CapturePage />}/>
          <Route path='/CustomizePage' element={<CustomizePage />}/>
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy />}/>
          <Route path='/Contact' element={<Contact />}/>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

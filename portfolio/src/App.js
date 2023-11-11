import './App.css';
import Contact from './Contact';
import Experience from './Experience';
import Footer from './Footer';
import Intro from './Intro';
import Navbar from './Navbar';
import Portfolio from './Portfolio';
import Services from './Services';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Intro/>
      <Services/>
      <Portfolio/>
      <Experience/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;

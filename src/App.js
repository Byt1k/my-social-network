
import './zeroing.css';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Profile from './components/Profile';


function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <Navbar />
        <Profile />
      </div>
    </div>

  );
}

export default App;

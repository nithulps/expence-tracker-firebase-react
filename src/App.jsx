import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Auth from './pages/auth';
import ExpenceTracker from './pages/expence_tracker/index';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Auth/>}/>
          <Route path='/expence_tracker' element={<ExpenceTracker/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;

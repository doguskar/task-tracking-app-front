import './App.css';
import Main from './layouts/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import TNavbar from './layouts/TNavbar';

function App() {
  return (
    <div className="App">
      <TNavbar/>
      <br/>
      <Main/>
    </div>
  );
}

export default App;
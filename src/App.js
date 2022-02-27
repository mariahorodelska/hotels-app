
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SearchForm from './components/SearchForm';


function App() {
  
  return (
    <div className="App">
        <Route path='/' component={SearchForm} />
    </div>
  );
}

export default App;

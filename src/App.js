import logo from './logo.svg';
import './App.css';
import { Text } from 'react';
import { CreditView } from './components/Credit';
import { creditstore } from './store/creditStore';
import { NavigationBar } from './components/Navigation';
import { ViewArea } from './components/ViewArea';

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <ViewArea className="ViewArea" />
      <NavigationBar className="NavigationBar" />
    </header>
    </div>
  );
}

export default App;

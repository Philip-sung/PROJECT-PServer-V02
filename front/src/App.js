import './App.css';
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

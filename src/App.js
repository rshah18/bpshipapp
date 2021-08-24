import './App.css';
import Navigation from './Management/Navigation'; 
import {ShipProvider} from './Management/Context'

function App() {
  return (
    <div>
      <ShipProvider>
        <Navigation/>
      </ShipProvider>
      
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import ProductsList from './components/productsList';
import DataTableEditDemo from './components/sample';


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

function App() {
  return (
    <div className="App">
      <div className='header'>
        <span>Chat Bot</span>
      </div>
      <div className='container'>
        <h2>Products List</h2>
        {/* <ProductsList /> */}
        <DataTableEditDemo />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ProductsList from './components/productsList';
import DataTableEditDemo from './components/sample';
import DataTableDynamicDemo from './components/order';
import { useNavigate, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "primereact/button";
import { TabMenu } from 'primereact/tabmenu';
import EnquiryData from './components/Enquiry';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

function App() {
  const items = [
    {label: 'Home', icon: 'pi pi-fw pi-home'},
    {label: 'Orders', icon: 'pi pi-fw pi-calendar'},
    {label: 'Enquiries', icon: 'pi pi-fw pi-question-circle'}
];
const [activeIndex, setActiveIndex] = useState(0);
let navigate = useNavigate();

const routePages = (index)=>{
  setActiveIndex(index); 
  if(items[index].label == "Orders"){
    navigate("/orders")
  }
  else if(items[index].label == "Enquiries"){
    navigate("/enquiries")
  }
  else{
     navigate("/")
  }

}
  return (
    <div className="App">
      <div className='header'>
        <span>Chat Bot</span>
      </div>
      <div>
      <div className="card">
        </div>
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => {routePages(e.index)}} />
      </div>
      <div className='container'>
      <Routes>
        <Route path="/" element={<DataTableEditDemo />}></Route>
        <Route path="/Home" element={<DataTableEditDemo />}></Route>
        <Route path="/Orders" element={<DataTableDynamicDemo />}></Route>
        <Route path="/Enquiries" element={<EnquiryData />}></Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;

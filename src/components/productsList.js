import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

const ProductsList = ()=>{

    const [products2, setProducts2] = useState([]);
    const [editingRows, setEditingRows] = useState({});

    const url = "https://demo-gupshup-flow.herokuapp.com/"
    useEffect(()=>{
        axios.get(url+"getAllProducts")
            .then(function (response) {
                setProducts2(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    },[])

    const onRowEditComplete1 = (e) => {
        let _products2 = [...products2];
        let { newData, index } = e;
        
        axios.post(url+"updateProduct",newData)
            .then(function (response) {
                if(response.data.isSuccess == "true"){
                    _products2[index] = newData;

                    setProducts2(_products2);
                }
                else{
                    alert("error occuered");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const onRowEditChange = (e) => {
        setEditingRows(e.data);
    }

    const setActiveRowIndex = (index) => {
        let _editingRows = { ...editingRows, ...{ [`${0}`]: true } };
        console.log(_editingRows);
        setEditingRows(_editingRows);
    }


    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const updateActive = (options) => {
        return (
            <Dropdown value={options.value} dataKey='_id' options={[{'label':'true','value':true},{'label':'false','value':false}]} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <span className={`product-badge status-${option.label.toLowerCase()}`}>{option.label}</span>
                }} />
        );
    }

    const addRow = ()=>{
        setProducts2([...products2, {_id:"0",name:"",category:"",quantity:"",stock:"",isActive:""}]);
        setActiveRowIndex(products2.length-1);
    }

    return (
        <div className="card p-fluid">
                <DataTable value={products2} editMode="row" dataKey="_id" editingRows={ editingRows } onRowEditComplete={onRowEditComplete1} responsiveLayout="scroll">
                    <Column field="productId" header="Id" style={{ width: '20%' }}></Column>
                    <Column field="name" header="Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="category" header="Category" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="isActive" header="Active" body={(rowData)=>{ return rowData.isActive.toString()}} editor={(options) => updateActive(options)} style={{ width: '20%' }}></Column>
                    <Column field="quantity" header="Quantity" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="stock" header="Stock" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
                <div style={{ "marginRight": "50px", "textAlign":"right", "marginTop":"10px"}}>
                    <i className="pi pi-plus-circle" style={{'fontSize': '2em', "alignItems":"right", "cursor":"pointer", "color":"rgb(38, 56, 56)"}} onClick={addRow}></i>
                </div>
            </div>

    )
}

export default ProductsList;

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import "./order.css"
const DataTableEditDemo = () => {

    const [products3, setProducts3] = useState([]);
    const [newProduct, setNewProduct] = useState(false);
    const [editingRows, setEditingRows] = useState({});
    const [ loading, setLoading] = useState(false);
    const toast = useRef(null);

    const url = "https://demo-gupshup-flow.herokuapp.com/"
    useEffect(()=>{
        setLoading(true);
        axios.get(url+"getAllProducts")
            .then(function (response) {
                setProducts3(response.data);
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    },[])


    const onRowEditComplete2 = (e) => {
        let _products3 = [...products3];
        let { newData, index } = e;
        console.log(newData);
        if(newData._id === "0"){
            setNewProduct(false)
            axios.post(url+"addProduct",newData)
            .then(function (response) {
                console.log(response);
                if(response.data == "OK"){
                    _products3[index] = newData;

                    setProducts3(_products3);
                }
                else{
                    alert("error occuered");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        else{
            axios.post(url+"updateProduct",newData)
            .then(function (response) {
                if(response.data.isSuccess == "true"){
                    _products3[index] = newData;

                    setProducts3(_products3);
                }
                else{
                    alert("error occuered");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }

    }

    const onRowEditChange = (e) => {
        console.log(products3.slice(0,products3.length - 1));
        if(newProduct && e.index == products3.length-1){
            setProducts3(products3.slice(0,products3.length - 1))
            setNewProduct(false)
        }
        console.log(e);
        setEditingRows(e.data);
    }

    useEffect(()=>{
        if(newProduct && products3.length > 0)
        {
            console.log(products3[products3.length - 1]);
            let _editingRows = { ...editingRows, ...{ [`${products3[(products3.length - 1)]._id}`]: true } };
            console.log(_editingRows);
            console.log(products3);
            setEditingRows(_editingRows);
        }
        
    },[newProduct, products3])
    const setActiveRowIndex = () => {
        setProducts3([...products3, ...[{ _id : '0', productId: "" ,name:"", category : "", isActive:"", quantity : "", price : ""}]])
        setNewProduct(true);
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

    const modalLoad = ()=>{
        return(
        <Dialog visible={loading}>
            <ProgressSpinner />
        </Dialog>
        )
    }


    return (
        <div className="datatable-editing-demo">
            <Toast ref={toast} />
             <h2>Products List</h2>

            <div className="card">
                { modalLoad() }
                <div className="p-fluid">
                    <DataTable value={products3} editMode="row" dataKey="_id" editingRows={editingRows} onRowEditChange={onRowEditChange} onRowEditComplete={onRowEditComplete2} responsiveLayout="scroll">
                        <Column field="productId" header="Id" style={{ width: '20%' }}></Column>
                        <Column field="name" header="Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                        <Column field="category" header="Category" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                        <Column field="isActive" header="Active" body={(rowData)=>{ return rowData.isActive.toString()}} editor={(options) => updateActive(options)} style={{ width: '20%' }}></Column>
                        <Column field="quantity" header="Quantity" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                        <Column field="price" header="Price" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>
                </div>
                <div style={{ "marginRight": "50px", "textAlign":"right", "marginTop":"10px"}}>
                    <i className="pi pi-plus-circle" style={{'fontSize': '2em', "alignItems":"right", "cursor":"pointer", "color":"rgb(38, 56, 56)"}} onClick={setActiveRowIndex}></i>
                </div>
            </div>

        </div>
    );
}

export default DataTableEditDemo;
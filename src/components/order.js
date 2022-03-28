import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

const DataTableDynamicDemo = () => {
    const [products, setProducts] = useState([]);
    const columns = [
        {field: 'orderId', header: 'OrderId'},
        {field: 'productId', header: 'ProductId'},
        {field: 'name', header: 'Name'},
        {field: 'phone', header: 'Phone'},
        {field: 'status', header: 'Status'}
    ];

    const url = "https://demo-gupshup-flow.herokuapp.com/"
    useEffect(()=>{
        axios.get(url+"getAllOrders")
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    },[])

    useEffect(() => { 
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <div>
             <h2>Orders List</h2>
            <div className="card">
                <DataTable value={products} responsiveLayout="scroll">
                    {dynamicColumns}
                </DataTable>
            </div>
        </div>
    );
}

export default DataTableDynamicDemo;
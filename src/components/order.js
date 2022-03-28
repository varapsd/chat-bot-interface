import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import "./order.css"

const DataTableDynamicDemo = () => {
    const [products, setProducts] = useState([]);
    const [ loading, setLoading] = useState(false);
    const columns = [
        {field: 'orderId', header: 'OrderId'},
        {field: 'productId', header: 'ProductId'},
        {field: 'name', header: 'Name'},
        {field: 'phone', header: 'Phone'},
        {field: 'status', header: 'Status'}
    ];

    const url = "https://demo-gupshup-flow.herokuapp.com/"
    useEffect(()=>{
        setLoading(true);
        axios.get(url+"getAllOrders")
            .then(function (response) {
                setProducts(response.data);
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            })
    },[])


    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    const modalLoad = ()=>{
        return(
        <Dialog visible={loading}>
            <ProgressSpinner />
        </Dialog>
        )
    }

    return (
        <div>
             <h2>Orders List</h2>
            <div className="card">
                {modalLoad()}
                <DataTable value={products} responsiveLayout="scroll">
                    {dynamicColumns}
                </DataTable>
            </div>
        </div>
    );
}

export default DataTableDynamicDemo;
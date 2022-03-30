import React, { useState } from "react"
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import "./form.css";
const ProductDetails = (props) => {
    const [product, setProduct] = useState({
        productId: "",
        name: "",
        category: "",
        quantity: "",
        price: "",
    });
    const [ imageData, setImageData] = useState("");
    const url = "https://demo-gupshup-flow.herokuapp.com/"

    const addNewProductToBackend = () => {
        let formData = new FormData()
        formData.append('file', imageData);
        console.log(formData);
        axios.post(url + "addProduct", product)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const customItemTemplate = (file) => {
            console.log(file.target.files[0]);
            setImageData(file.target.files[0]);
    }

    const onBasicUpload = (e) => {
        console.log(e)

    }

    return (
        <>
            <Dialog header="Header" visible={true} style={{}} onHide={() => props.closeProductModal()}>
                <div className="form">
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <InputText id="name" value={product.name} onChange={(e) => setProduct(prev => {
                            return { ...prev, name: e.target.value }
                        })} />
                    </div>
                    <div>

                        <label htmlFor="category" className="block" >Category</label>
                        <InputText id="category" value={product.category} onChange={(e) => setProduct(prev => {
                            return { ...prev, category: e.target.value }
                        })} />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block">Quantity</label>
                        <InputNumber id="quantity" value={product.quantity | 0} onChange={(e) => setProduct(prev => {
                            console.log(e);
                            return { ...prev, quantity: e.value }
                        })} />
                    </div>
                    <div>

                        <label htmlFor="price" className="block">Price</label>
                        <InputNumber mode="basic" inputId="price" value={product.price | 0} onValueChange={(e) => setProduct(prev => {
                            return { ...prev, price: e.value }
                        })} mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" />

                    </div>

                </div>
                <div >
                    <div>
                        <label htmlFor="file" className="block">Image</label>
                        <input type="file" name="file" onChange={customItemTemplate} />
                    </div>
                    <Button label="Submit" style={{ "textAlign": "center" }} onClick={addNewProductToBackend} />
                </div>
            </Dialog>
        </>
    )
}

export default ProductDetails;
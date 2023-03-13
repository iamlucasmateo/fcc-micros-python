import React, { useState, useEffect } from 'react';

import { updateProduct, getProduct } from './apiCalls';


const getProductIdFromUrl = () => {
    const url: string = window.location.href
    const splitUrl: Array<String> = url.split("/");
    const productId: String = splitUrl[splitUrl.length - 1];
    
    return productId
}


export const UpdateProduct = () => {
    const productId = getProductIdFromUrl();
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        (
            async () => {
                const currentData = await getProduct(productId);
                console.log(currentData);
                setTitle(currentData["title"])
                setImageUrl(currentData["image"])
            } 
        )();
    }, [])

    const onSubmit = (e: any) => {
        e.preventDefault();
        updateProduct(productId, title, imageUrl).catch(error => alert(error));
        window.location.href ="/admin/products"
    }

    return (
        <> 
            <h3>Update new product</h3>
            <form onSubmit={onSubmit}>
                <div style={{"marginBottom": "20px"}}>
                    <label>{"Image Title: "} 
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </label>
                </div>
                <div style={{"marginBottom": "20px"}}>
                    <label>{"Image URL: "} 
                        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
                    </label>
                </div>
                <input type="submit" />
            </form>
        </>
    )
}
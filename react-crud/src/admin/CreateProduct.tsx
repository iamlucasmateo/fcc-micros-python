import React, { useState } from 'react';

import { createProduct } from './apiCalls';


export const CreateProduct = () => {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const onSubmit = (e: any) => {
        e.preventDefault();
        createProduct(title, imageUrl).catch(error => alert(error));
    }

    return (
        <> 
            <h3>Create new product</h3>
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
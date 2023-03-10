import React, { useEffect, useState } from 'react';

import { ImagesTable } from './ImagesTable';
import { Product, ProductColumns } from '../interfaces/Product'


export const AdminApp = () => {
    const [products, setProducts] = useState<Array<Product>>([])
    useEffect(() => {
        (
            async () => {
                const apiUrl = "http://localhost:8000/api/products/";
                const apiResponse = await fetch(apiUrl);
                const products: Array<Product> = await apiResponse.json()
                setProducts(products)
            }
        )();
    }, [])

    return (
        <>
            <h2>Admin App</h2>
            <ImagesTable products={products}/>
        </>
        
    )
}


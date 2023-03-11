import React, { useEffect, useState } from 'react';

import { ImagesTable } from './ImagesTable';
import { Product } from '../interfaces/Product';
import { getProducts } from './apiCalls';


export const AdminApp = () => {
    const [products, setProducts] = useState<Array<Product>>([])
    useEffect(() => {
        (
            async () => {
                const products: Array<Product> = await getProducts();
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


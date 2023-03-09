import React, { useEffect, useState } from 'react';

import { Table } from '../components/table';
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

    const columns: Array<String> = ProductColumns;
    const data: Array<Array<String>> = products.map(product => Object.values(product));
    return (
        <>
            <h2>Admin App</h2>
            <Table columns={columns} data={data}/>
        </>
        
    )
}


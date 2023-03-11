import { throws } from 'assert';
import { Product } from '../interfaces/Product'


const apiUrl = "http://localhost:8000/api/products/"; 

export const getProducts = async () => {
    const apiResponse = await fetch(apiUrl);
    const products: Array<Product> = await apiResponse.json()
    
    return products;
}

export const getProduct = async (productId: String) => {
    const fullUrl = apiUrl + `${productId}`
    const apiResponse = await fetch(fullUrl);

    return apiResponse.json()
}


export const createProduct = async (title: string, imageUrl: string) => { 
    const requestConfig = {
        method: "POST",
        body: JSON.stringify({
            "title": title,
            "image": imageUrl,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }
    const response = await fetch(apiUrl, requestConfig);
    
    if (response.status === 201) {
        return response.json();
    } else {
        throw Error(`Response unsuccessful: ${response.status}, ${response.statusText}`)
    }
}

export const deleteProduct = async (id: number) => {
    const requestConfig = {
        method: "DELETE",
    }
    const fullUrl = `${apiUrl}${id}`;
    await fetch(fullUrl, requestConfig);
}

export const updateProduct = async (productId: String, newTitle: String, newImageUrl: String) => {
    console.log(productId, newTitle, newImageUrl);
}
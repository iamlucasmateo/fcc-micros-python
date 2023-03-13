import React from 'react';

import { Link } from 'react-router-dom';
import { deleteProduct, likeProduct } from './apiCalls';

import { Product, ProductColumns } from '../interfaces/Product';


export const ImagesTable = (props: any) => {
    const cellStyle = {
        fontFamily: "Arial, Helvetica, sans-serif",
        border: "1px solid #ddd",
        padding: "8px"
    }
    const headerCellStyle = {
        ...cellStyle,
        paddingTop: "12px",
        paddingBottom: "12px",
        textAlign: "left" as "left",
        backgroundColor: "#04AA6D",
        color: "white"
    }

    const tableColumns = ProductColumns.concat(["Update"])
    const columns = tableColumns.map((col, index) => {
        return <th style={headerCellStyle} key={index}>{col}</th>
    });

    const tableStyle = {
        fontFamily: "Arial, Helvetica, sans-serif",
        width: "50%",
        margin: "auto",
        borderCollapse: "collapse" as "collapse"
    }

    const buttonStyle = {
        border: "1px solid black"
    }
    const onDeleteClick = (productId: number) => {
        deleteProduct(productId);
        window.location.href = "/admin/products";
    }
    const onLikeClick = (productId: number) => {
        likeProduct(productId);
        window.location.href = "/admin/products";
    }
    const renderCell = (product: any, column: string, columnIndex: number) => {
        if (column === "image") {
            const value = product[column];
            return <img src={value} key={columnIndex} width="200px" height="200px"/>
        } else if (column === "Update"){
            return (
                <div>
                    <Link to={`/admin/products/update/${product["id"]}`}>Update</Link>
                    <p style={buttonStyle} onClick={() => onDeleteClick(product.id)}>Delete</p>
                    <p style={buttonStyle} onClick={() => onLikeClick(product.id)}>Like</p>
                </div>
            )
        } else {
            const value = product[column];
            return <p>{value}</p>
        }

    }
    const renderRow = (product: Product) => {
        const cells = tableColumns.map((column: string, columnIndex: number) => {
            return <td style={cellStyle} key={columnIndex}>{renderCell(product, column, columnIndex)}</td>
        })

        return cells;
    }
    let rows;
    if (props.products && props.products.length > 0){
        rows = props.products.map((product: Product, index: number) => ( 
                <tr key={index}>{renderRow(product)}</tr>
            ))
    } else {
        rows = []
    }
    
    return (
        <table style={tableStyle}>
        <thead>
          <tr>{columns}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
}
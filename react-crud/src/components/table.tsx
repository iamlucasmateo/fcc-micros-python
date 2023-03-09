import React from "react";


interface TableData {
    columns: Array<String>;
    data: Array<Array<String>>;
}



export const Table = (props: TableData) => {
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
    const columns = props.columns.map((col, index) => {
        return <th style={headerCellStyle} key={index}>{col}</th>
    })
    const renderCell = (value: any) => {
        const isUrl = (value: any) => typeof value === "string" && value.startsWith("http")
        return (
            isUrl(value)
            ? <img src={value} width="200px" height="200px"/>
            : <p>{`${value}`}</p>
        )
    }
    const flattenCells = (cells: Array<String>) => cells.map((value, index) => (
            <td style={cellStyle} key={index}>{renderCell(value)}</td>
    ))
    const rows = props.data.map((cells, index) => {
        return <tr style={cellStyle} key={index}>{flattenCells(cells)}</tr>
    })
    const tableStyle = {
        fontFamily: "Arial, Helvetica, sans-serif",
        width: "50%",
        margin: "auto",
        borderCollapse: "collapse" as "collapse"
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


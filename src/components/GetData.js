import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Papa from 'papaparse';

export default function GetData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/salaries.csv')
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8')
            const csv = decoder.decode(result.value)
            const parsedData = Papa.parse(csv, { header: true})
            setData(parsedData.data)
        }

        fetchData();
    }, []);

    console.log(data);
    console.log(data[0])
    console.log(data[1])

    return (
        <div>GetData Comp working</div>
    )
}


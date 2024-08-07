import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";
// import 'antd/dist/antd.css';

import MainTable from "./components/MainTable.js";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/salaries.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);
      const parsedData = Papa.parse(csv, { header: true });
      setData(parsedData.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <MainTable data={data} key={1} />
      </div>
    </>
  );
}

export default App;

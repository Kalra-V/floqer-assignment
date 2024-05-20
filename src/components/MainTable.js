import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Table } from "antd";

export default function MainTable({ data }) {
  const [tableData, setTableData] = useState([
    { year: 0, jobCount: 0, averageSalary: 0 },
  ]);

  useEffect(() => {
    const processData = (data) => {
      const yearlyData = {};

      data.forEach((record) => {
        const { work_year, salary_in_usd } = record;
        if (!yearlyData[work_year]) {
          yearlyData[work_year] = { totalSalary: 0, count: 0 };
        }
        yearlyData[work_year].totalSalary += Number(salary_in_usd);
        yearlyData[work_year].count += 1;
      });

      const analysedData = Object.keys(yearlyData).map((year) => {
        const { totalSalary, count } = yearlyData[year];
        return {
          year: year,
          jobCount: count,
          averageSalary: "$" + Math.floor(totalSalary / 100 / count) * 100,
        };
      });
      const finalAnalysedData = analysedData.filter((record) => record.year);
      console.log(finalAnalysedData);
      setTableData(finalAnalysedData);
    };

    processData(data);
  }, [data]);

  // console.log(tableData);

  const columns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year.localeCompare(b.year),
    },
    {
      title: "No. Of Jobs",
      dataIndex: "jobCount",
      key: "jobCount",
      sorter: (a, b) => a.jobCount - b.jobCount,
    },
    {
      title: "Average Salary in USD",
      dataIndex: "averageSalary",
      key: "salary",
      sorter: (a, b) => a.averageSalary - b.averageSalary,
    },
  ];

  return (
    <div className="main-table">
      Table Comp working and salary is: <h1>{data[0].salary}</h1>
      <Table dataSource={tableData} columns={columns} title={() => 'Main Table'} bordered/>
    </div>
  );
}

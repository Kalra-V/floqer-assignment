import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Table } from "antd";
import LineGraph from "./LineGraph";

export default function MainTable({ data }) {
  const [tableData, setTableData] = useState([]);

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
          averageSalary: Math.floor(totalSalary / 100 / count) * 100,
        };
      });
      const finalAnalysedData = analysedData.filter((record) => record.year);
      // console.log(finalAnalysedData);
      setTableData(finalAnalysedData);
    };

    processData(data);
  }, [data]);

  // console.log(tableData);

  // DATA FOR LineGraph
  const yearsArray = []
  for (let i = 0; i < tableData.length; i++) {
    const element = tableData[i].year;
    yearsArray.push(element);
  }
  console.log(yearsArray);

  const jobCountArray = []
  for (let i = 0; i < tableData.length; i++) {
    const element = tableData[i].jobCount;
    jobCountArray.push(element);
  }
  console.log(jobCountArray);

  const salaryArray = []
  for (let i = 0; i < tableData.length; i++) {
    const element = tableData[i].averageSalary;
    salaryArray.push(element);
  }
  console.log(salaryArray);

  const LineGraphData = {
    yearsArray,
    jobCountArray,
    salaryArray
  }
  console.log(LineGraphData)

  const jobChartData = {
    chartData: jobCountArray,
    xTitleText: 'Years',
    yTitleText: 'Number Of Jobs',
    mainTitle: 'Line Graph for Number of Jobs'
  }
  const salaryChartData = {
    chartData: salaryArray,
    xTitleText: 'Years',
    yTitleText: 'Average Salary in USD',
    mainTitle: 'Line Graph for Average Salary'
  }

  // DATA FOR TABLE
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
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => <LineGraph />
    // }
  ];

  return (
    <div className="main-table">
      Table Comp working and salary is: <h1>{data[0].salary}</h1>
      <Table
        dataSource={tableData}
        columns={columns}
        title={() => "Main Table"}
        bordered
      />
      <LineGraph data={jobChartData}/>
      <LineGraph data={salaryChartData}/>

    </div>
  );
}

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Table, Button } from "antd";
import LineGraph from "./LineGraph";
import SecondTable from "./SecondTable";

export default function MainTable({ data }) {
  const [tableData, setTableData] = useState([]);
  const [secondTableData, setSecondTableData] = useState([]);
  const [showMainTable, setShowMainTable] = useState(true);
  const [selectedYear, setSelectedYear] = useState();

  //PROCESSING CSV DATA INTO DATA FOR THE TABLE
  useEffect(() => {
    // FOR MAIN TABLE
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

  // console.log(secondTableData);
  //FOR SECOND TABLE
  const processDataForSecondTable = (year) => {
    const processedSecondTableData = [];
    data.forEach((record) => {
      const { job_title, work_year } = record;
      if (year === work_year) {
        const existingEntry = processedSecondTableData.find(
          (item) => item.job_title === job_title
        );
        if (existingEntry) {
          existingEntry.count++;
        } else {
          processedSecondTableData.push({ job_title, count: 1 });
        }
      }
      return processedSecondTableData;
    });
    setSecondTableData(processedSecondTableData);
  };
  // console.log(tableData);
  // DATA FOR LineGraph
  const yearsArray = [];
  for (let i = 0; i < tableData.length; i++) {
    const element = tableData[i].year;
    yearsArray.push(element);
  }
  // console.log(yearsArray);

  const jobCountArray = [];
  for (let i = 0; i < tableData.length; i++) {
    const element = tableData[i].jobCount;
    jobCountArray.push(element);
  }
  // console.log(jobCountArray);

  const salaryArray = [];
  for (let i = 0; i < tableData.length; i++) {
    const element = tableData[i].averageSalary;
    salaryArray.push(element);
  }
  // console.log(salaryArray);

  const jobChartData = {
    chartData: jobCountArray,
    xTitleText: "Years",
    yTitleText: "Number Of Jobs",
    mainTitle: "Line Graph for Number of Jobs",
  };
  const salaryChartData = {
    chartData: salaryArray,
    xTitleText: "Years",
    yTitleText: "Average Salary in USD",
    mainTitle: "Line Graph for Average Salary",
  };

  // DATA FOR MAIN TABLE
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

  // DATA FOR SECOND TABLE

  //ON CLICKING A ROW
  const handleRowClick = (record, rowIndex, event) => {
    return {
      onClick: () => {
        setSelectedYear(record.year);
        console.log("Row clicked: ", record.year);
        processDataForSecondTable(record.year);
        setShowMainTable(false);
      },
    };
  };

  return (
    <div className="main-table-container">
      {showMainTable ? (
        <Table
          dataSource={tableData}
          columns={columns}
          onRow={handleRowClick}
          title={() =>
            "Task 1 : Main Table - ML Engineer salaries from 2020 to 2024"
          }
          bordered
          className="main-table"
        />
      ) : (
        <div>
          <Button
            onClick={() => {
              setShowMainTable(true);
            }}
          >
            Go back
          </Button>
          <SecondTable data={secondTableData} selectedYear={selectedYear} />
        </div>
      )}

      <div className="graph-container">
        <LineGraph data={jobChartData} />
        <LineGraph data={salaryChartData} />
      </div>
    </div>
  );
}

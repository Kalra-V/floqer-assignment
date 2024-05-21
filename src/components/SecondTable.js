import { Table } from "antd";

export default function SecondTable({ data, selectedYear }) {
  const columns = [
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
    },
    {
      title: "No. Of Jobs",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        title={() =>
          `Task 2 : Second Table - No. of Jobs in ${selectedYear}`
        }
        bordered
      />
    </div>
  );
}

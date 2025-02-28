import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 0, right: 20, left: 30, bottom: 5 }}
        barCategoryGap="30%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="username" padding={{ left: 10, right: 10 }} />

        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="number_correct"
          stackId="a"
          fill="#4CAF50"
          name="Correct Answers"
        />
        <Bar
          dataKey="number_wrong"
          stackId="a"
          fill="#F44336"
          name="Wrong Answers"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;

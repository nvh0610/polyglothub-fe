import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Label } from "recharts";
import Typography from "@mui/material/Typography";

const ChartComponent = ({ data }) => {
  return (
    <div style={{ 
      backgroundColor: "#FFFFFF", 
      padding: "10px", 
      borderRadius: "8px", 
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    }}>
      {/* Tiêu đề nằm bên ngoài biểu đồ */}
      <Typography
                variant="h2"
                color="#ef0000"
                sx={{
                  my: 2,
                  textAlign: "center",
                  fontSize: "25px",
                  fontWeight: "600",
                  width: "100%",
                }}
              >
                User Answer Statistics 
              </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
          barCategoryGap="30%"
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="username" padding={{ left: 10, right: 10 }} />
          <YAxis>
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="number_correct" stackId="a" fill="#4CAF50" name="Correct Answers" bottom={10}/>
          <Bar dataKey="number_wrong" stackId="a" fill="#F44336" name="Wrong Answers" Bottom={10}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;

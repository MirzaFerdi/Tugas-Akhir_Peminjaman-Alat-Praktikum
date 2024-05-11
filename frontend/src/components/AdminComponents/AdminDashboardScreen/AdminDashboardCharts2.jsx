import PropTypes from "prop-types";
import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const AdminDashboardCharts2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const data = [
    { name: "Kelas 1", value: 32 },
    { name: "Kelas 2", value: 33 },
    { name: "Kelas 3", value: 33 },
    { name: "Kelas 4", value: 35 },
  ];  

  const RenderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text className="text-sm" x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
        <text className="text-xs" x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  RenderActiveShape.propTypes = {
    cx:PropTypes.any,
    cy:PropTypes.any,
    midAngle:PropTypes.any,
    innerRadius:PropTypes.any,
    outerRadius:PropTypes.any,
    startAngle:PropTypes.any,
    endAngle:PropTypes.any,
    fill:PropTypes.any,
    payload:PropTypes.any,
    percent:PropTypes.any,
    value:PropTypes.any,
  };

  return (
    <ResponsiveContainer maxWidth={300} maxHeight={300} width="100%" height="100%">
        <PieChart width={300} height={300}>
          <Pie
            activeIndex={activeIndex}
            activeShape={RenderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={handleOnMouseEnter}
          />
        </PieChart>
      </ResponsiveContainer>
  );
};

export default AdminDashboardCharts2;

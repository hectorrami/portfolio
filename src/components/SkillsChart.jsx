import {useContext, useEffect, useRef} from "react";
import Highcharts from "highcharts";
import {ThemeContext} from "../Providers/ThemeContext";

const SkillsChart = () => {
  const {theme} = useContext(ThemeContext);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: "bar",
          backgroundColor: "transparent",
        },
        title: {
          text: "My Technical Skills",
          style: {color: theme === 'dark' ? '#fff' : '#000',}
        },
        xAxis: {
          categories: [
            "JavaScript",
            "React",
            "Java",
            "Spring Boot",
            "AWS",
            "Docker",
          ],
          title: { text: null },
          labels: {style: {color: theme === 'dark' ? '#fff' : '#000'}}, // Make labels visible on dark background
        },
        yAxis: {
          min: 0,
          max: 100,
          title: { text: "Proficiency (%)", align: "high", style: {color: theme === 'dark' ? '#fff' : '#000'}},
          labels: { style: { color: theme === 'dark' ? "#fff" : '#000'}},
        },
        tooltip: {
          valueSuffix: "%",
        },
        series: [
          {
            name: "Proficiency",
            data: [95, 90, 60, 60, 50, 70],
            color: "#92a0d7",
          },
        ],
      });
    }
  }, [theme]);

  return <div ref={chartRef} />;
};

export default SkillsChart;


import { useContext, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import { ThemeContext } from "../Providers/ThemeContext";

const SkillsChart = () => {
  const { theme } = useContext(ThemeContext);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          polar: true,
          type: "column",
          backgroundColor: "transparent",
        },
        title: {
          text: "My Technical Skills",
          style: {
            color: theme === "dark" ? "#fff" : "#000",
          },
        },
        pane: {
          size: "85%",
        },
        xAxis: {
          categories: ["JavaScript", "React", "Java", "Spring Boot", "AWS"],
          tickmarkPlacement: "on",
          lineWidth: 0,
          labels: {
            style: {
              color: theme === "dark" ? "#fff" : "#000",
              fontWeight: "bold",
            },
          },
        },
        yAxis: {
          min: 0,
          max: 100,
          endOnTick: false,
          showLastLabel: true,
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          labels: {
            style: {
              color: theme === "dark" ? "#fff" : "#000",
            },
          },
        },
        tooltip: {
          shared: true,
          pointFormat: "<span>{point.category}</span>: <b>{point.y}%</b><br/>",
        },
        series: [
          {
            name: "Proficiency",
            data: [95, 90, 80, 80, 92],
            pointPlacement: "on",
            colorByPoint: true,
            colors: ["#00dbde", "#fc00ff", "#7F00FF", "#00C9FF", "#92a0d7"],
          },
        ],
        credits: {
          enabled: false,
        },
      });
    }
  }, [theme]);

  return <div ref={chartRef} />;
};

export default SkillsChart;


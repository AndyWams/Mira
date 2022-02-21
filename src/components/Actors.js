import React from "react";
import { useEffect, useState } from "react";
import { chartColors } from "../colors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getAwards } from "../services/app-service";
import { Pie } from "react-chartjs-2";
import Loader from "./Loader";
function Actors() {
  const [dataChart, setDataChart] = useState({});
  ChartJS.register(ArcElement, Tooltip, Legend);
  let yearCount = [];
  let occurenceCount = [];
  useEffect(() => {
    const fetchAwards = async () => {
      await getAwards().then((response) => {
        const { awards } = response.data.resource;
        if (awards) {
          awards.map((item) => {
            yearCount.push(item.year);
          });
          yearCount.map((item) => {
            occurenceCount[item] = occurenceCount[item]
              ? occurenceCount[item] + 1
              : 1;
          });
        }
        setDataChart({
          labels: yearCount,
          datasets: [
            {
              label: "",
              data: occurenceCount,
              backgroundColor: chartColors,
              hoverBackgroundColor: chartColors,
            },
          ],
        });
      });
    };
    fetchAwards();
  }, []);
  return (
    <section className="chart_wrap">
      {Object.keys(dataChart).length !== 0 ? (
        <Pie type="line" data={dataChart} />
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Actors;

import React from "react";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { getAwards } from "../services/app-service";
import { Pie, Line } from "react-chartjs-2";
import Loader from "./Loader";
function Actors() {
  const [dataChart, setDataChart] = useState({});
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LinearScale,
    LineElement
  );
  let yearCount = [];
  let occurenceCount = [];
  let years = [];
  let count = [];
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
        count = Object.values(occurenceCount).map((x) => x);
        years = [...new Set(yearCount)];
        setDataChart({
          labels: years,
          datasets: [
            {
              label: "",
              data: count,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
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

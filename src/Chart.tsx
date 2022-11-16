import * as d3 from "d3";
import React, { useState, useEffect, RefObject } from "react";

function Chart() {
  const ref: RefObject<HTMLDivElement> = React.createRef();

  const [fill, setFill] = useState("red");

  const width = 500;
  const height = 400;
  const margin = { top: 50, right: 50, bottom: 50, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const data = [
    [-100, 100],
    [-100, 200],
    [-100, 300],
    [-100, 400]
  ];

  const [minY, setMinY] = useState(100);
  const [maxY, setMaxY] = useState(400);

  useEffect(() => {
    draw();
  }, [minY, maxY, fill]);

  let yScale = d3.scaleLinear().domain([minY, maxY]).range([innerHeight, 0]);

  const draw = () => {
    let yAxis = d3.axisLeft(yScale);

    d3.select(ref.current).selectAll("svg").remove();

    const zoomer: any = d3.zoom().on("zoom", zoom);

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(zoomer);

    svg
      .append("text")
      .attr("transform", "translate(200,20)")
      .text("toggle fill")
      .on("click", toggleFill);

    function toggleFill() {
      if (fill === "red") {
        setFill("blue");
      } else {
        setFill("red");
      }
    }

    var circles = svg
      .append("g")
      .attr("id", "circles")
      .attr("transform", "translate(200, 0)")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .style("fill", fill)
      .attr("r", 4)
      .attr("cx", function (d) {
        return d[0];
      })
      .attr("cy", function (d) {
        return yScale(d[1]);
      });

    var y_axis = svg
      .append("g")
      .attr("id", "y_axis")
      .attr("transform", "translate(75,0)")
      .call(yAxis);

    function zoom(event: any) {
      console.log(event);
      let new_yScale = event.transform.rescaleY(yScale);

      console.log(new_yScale);
      console.log(new_yScale.domain());
      console.log(new_yScale.range());
      setMinY(new_yScale.domain()[0]);
      setMaxY(new_yScale.domain()[1]);
    }
  };

  return (
    <div
      style={{ position: "relative" }}
      className="OptionsDataChart"
      ref={ref}
    ></div>
  );
}

export default Chart;

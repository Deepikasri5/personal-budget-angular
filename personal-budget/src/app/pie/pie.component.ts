import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';


@Component({
  selector: 'pb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  private dataChart = []
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  private label = [];

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.dataChart.map(d => d.Stars.toString()))
  .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
}

private drawChart(data): void {
  for (let i = 0; i<data.myBudget.length; i++){
    this.label[i] = data.myBudget[i].title;
  }
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));
 // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(data.myBudget))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(140)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(data.myBudget))
    .enter()
    .append('text')
    .text(d => d.data.title)
    .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
}

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.createSvg();
    this.createColors();
    this.dataService.getData().subscribe(data =>{
      this.drawChart(data);
    })
  }

}

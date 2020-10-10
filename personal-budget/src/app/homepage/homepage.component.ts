import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';



@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{



  constructor(private dataService: DataService) { }


  createChart(data) {
    var label = [];
    var chartData = [];
    for (var i = 0; i < data.myBudget.length; i++) {
      label[i] = data.myBudget[i].title;
      chartData[i] = data.myBudget[i].budget;
    }
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
            {
                data: chartData,
                backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fd6b19',
                    '#A62A2A',
                    '#9F703A',
                    '#9CCB19'
                ],
            }
    ],
    labels: label
    }
});
  }
  ngOnInit(): void {
    this.dataService.getData().subscribe((data: any) => {
      this.createChart(data);
    });
  }
}

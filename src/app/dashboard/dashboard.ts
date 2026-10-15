import { Component } from '@angular/core';
import { MatCard, MatCardSubtitle , MatCardTitle } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions } from 'chart.js';
import { MemberService } from '../../services/member';

@Component({
  selector: 'app-dashboard',
  imports: [MatCard,MatCardTitle,MatCardSubtitle, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  
  NbMembers: number = 0;
  chartData: ChartDataset[] = [
    {
      data: [ ]
    }
  ];
  chartLabels: String[] = ['A','B','C','D','E','F'];
  chartOptions: ChartOptions = {};

  constructor(private Ms : MemberService ) {
    
    this.Ms.getALLMembers().subscribe((response) => {
      this.NbMembers = response.length;
      const types = [... new Set(response.map((e) =>e.type))];
      this.chartLabels=types;
      const count = types.map((e) => response.filter((l) => l.type === e).length    )
        this.chartData = [
          {
            data: count
          }
        ]

    });

  }
   
}

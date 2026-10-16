import { Component } from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions } from 'chart.js';
import { MemberService } from '../../services/member';
import { EventService } from '../../services/event-service';
import { MemberEventService } from '../../services/MemberEvent-service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCard,MatCardTitle, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  
  NbMembers: number = 0;NbEvents: number = 0;
  chartDataBar: ChartDataset[] = [
    {
      data: [ ]
    }
  ];
  chartLabelsBar: String[] = ['A','B','C','D','E','F'];
   chartDataLime: ChartDataset[] = [
    {
      data: [ ]
    }
  ];
  chartLabelsLime: String[] = ['A','B','C','D','E','F'];
  
  chartData: ChartDataset[] = [
    {
      data: [ ]
    }
  ];
  chartLabels: String[] = ['A','B','C','D','E','F'];
  chartOptions: ChartOptions = {};

  constructor(private Ms : MemberService , private Es : EventService , private Mes : MemberEventService) {
    
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
    this.Es.getALLEvents().subscribe((response) => {
      this.NbEvents = response.length;
      const lieux = [... new Set(response.map((e) =>e.lieu))];
      this.chartLabelsBar=lieux;
      const count2 = lieux.map((e) => response.filter((l) => l.lieu === e).length    )
        this.chartDataBar = [
          {
            data: count2
          }
        ]

      this.Mes.getALLEvents().subscribe((memberEvents) => {
        this.chartLabelsLime = response.map((event) => event.title);
        this.chartDataLime = [
          {
            data: response.map((event) =>
              memberEvents.filter((memberEvent) => memberEvent.eventId === event.id).length
            ),
            label: 'Members'
          }
        ];
      });
    });

  }
   
}

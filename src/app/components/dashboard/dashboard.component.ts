// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import {
  ChartConfiguration,
  ChartData,
  ChartType,
  ChartOptions
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalPosts = 0;
  tagStats: { tag: string; count: number }[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Configuração do gráfico de barras
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: true }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };
  public barChartType: 'bar' = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],        // etiquetas (tags)
    datasets: [
      {
        data: [],      // contagens
        label: 'Uso de Etiquetas',
        backgroundColor: [
          'rgba(63,81,181,0.7)',
          'rgba(244,67,54,0.7)',
          'rgba(76,175,80,0.7)',
          'rgba(255,193,7,0.7)',
          'rgba(233,30,99,0.7)'
        ]
      }
    ]
  };

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  private loadAnalytics(): void {
    // Total de posts
    this.postService.getPostsCount()
      .subscribe(count => this.totalPosts = count);

    // Estatísticas de tags
    this.postService.getTagStats()
      .subscribe(stats => {
        this.tagStats = stats;
        this.updateChart();
      });
  }

  private updateChart(): void {
    // Pegue as top 5 tags (ou quantas quiser)
    const top = this.tagStats.slice(0, 5);
    this.barChartData.labels = top.map(t => t.tag);
    this.barChartData.datasets[0].data = top.map(t => t.count);
    this.chart?.update();
  }
}

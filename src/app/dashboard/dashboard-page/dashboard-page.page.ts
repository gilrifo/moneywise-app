import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth'
import { TransactionService } from 'src/app/core/services/transaccion';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.page.html',
  styleUrls: ['./dashboard-page.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  total = 0;
  income = 0;
  expense = 0;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService
  ) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {

    this.transactionService.transactions$.subscribe(transactions => {

      this.income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

      this.expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

      this.total = this.income - this.expense;

      this.updateChart();
    });

  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  createChart() {

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Ingresos', 'Gastos'],
        datasets: [{
          data: [this.income, this.expense],
          backgroundColor: ['#2dd36f', '#eb445a']
        }]
      },
      options: {
        responsive: true
      }
    });

  }

  updateChart() {

    if (!this.chart) return;

    this.chart.data.datasets[0].data = [this.income, this.expense];
    this.chart.update();

  }

}


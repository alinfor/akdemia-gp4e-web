import {Component, OnInit} from '@angular/core';
import {Theme} from 'src/app/models/Theme';
import {ThemeService} from 'src/app/services/theme.service';

@Component({
  selector: 'app-content-dashboard',
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.scss']
})
export class ContentDashboardComponent implements OnInit {

  constructor(private themeService: ThemeService) {
  }

  listeTheme: Theme[] = [];

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes() {
    this.themeService.getAll().subscribe({
      next: (data) => this.listeTheme = data
    })
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-base-template',
  templateUrl: './base-template.component.html',
  styleUrls: ['./base-template.component.css'],
})
export class BaseTemplateComponent implements OnInit {
  title: string = 'Mi Banco';

  constructor(
    private activatedroute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedroute.data.subscribe((data) => {
      this.title = data['title'];
    });
  }

  displaySettings(): void {
    let settings_menu = document.getElementById('settings-menu');

    if (settings_menu) {
      if (settings_menu.style.display === 'block') {
        settings_menu.style.display = 'none';
      } else {
        settings_menu.style.display = 'block';
      }
    }
  }

  displayRightSideBar(): void {
    let sidebar_menu = document.getElementById('sidebar');

    if (sidebar_menu?.classList.contains('active')) {
      sidebar_menu?.classList.remove('active');
    } else {
      sidebar_menu?.classList.add('active');
    }
  }

  logout(): void {
    this.authService.logout();
  }
}

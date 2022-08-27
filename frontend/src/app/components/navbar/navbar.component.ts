import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title: string = 'Mi Banco';

  constructor(private activatedroute: ActivatedRoute) {}

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

  activeElement(e: any): void {
    let nav_item_class = document.getElementsByClassName('nav-item');

    let new_active_item = e.path;

    for (var i = 0; i < nav_item_class.length; i++) {
      nav_item_class[i].classList.remove('active');
    }

    //new_active_item.parentElement.parentElement
    //new_active_item.classList.add('active')
    console.log(new_active_item[1]);
  }

  findAncestor (el: any, cls: any) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}
}

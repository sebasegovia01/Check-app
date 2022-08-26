import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = "Mi Banco";

  constructor(private activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.activatedroute.data.subscribe((data) => {
      this.title = data['title'];
    });

  }

}

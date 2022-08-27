import { Component, OnInit, isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit() {

    if (isDevMode()) {
      console.log("Running on development mode");
    } else {
      console.log("Running on production mode");
    }
  }

 }

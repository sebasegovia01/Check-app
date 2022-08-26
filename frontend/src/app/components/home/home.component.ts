import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  client: Client | undefined;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {

      // consultar sesion storage, si esta vacia, redirigimos a login.
      if(!this.storageService.isLoggedIn()){
        window.location.replace('/login')
      }

      this.client = this.storageService.getClientSession().client;
  }
}


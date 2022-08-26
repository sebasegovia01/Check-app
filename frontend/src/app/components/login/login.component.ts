import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    rut: null,
    password: null
  }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {

    console.log("is login?");
    console.log(this.storageService.isLoggedIn())

    if (this.storageService.isLoggedIn()) {

      this.isLoggedIn = true;
      window.location.replace('/')
    }
  }

  onSubmit(): void {



    const {rut, password} = this.form;

    this.authService.auth(rut, password).subscribe({
      next: data => {


        this.storageService.storeClientSession(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage()

       
      },
      error: err => {

        console.log(err);

        this.errorMessage = err.error.error;
        this.isLoginFailed = true;
      }
    })
  }

  formatRut(): string {

    let rut = this.form.rut
  
    if (rut.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
      rut = rut.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    }
    else if (rut.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
      rut = rut.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
    }
    else if (rut.match(/^(\d)(\d{3})(\d{0,2})$/)) {
      rut = rut.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
    }
    else if (rut.match(/^(\d)(\d{0,2})$/)) {
      rut = rut.replace(/^(\d)(\d{0,2})$/, '$1.$2');
    }

    this.form.rut = rut;

    return rut;
  }

  redirect(): void {
    window.location.replace('/')
  }

  reloadPage(): void {
    window.location.reload();
  }

}

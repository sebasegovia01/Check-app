import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// services
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
// alerts
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    rut: null,
    password: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  welcome_message = 'Inicia sesión en el portal para continuar.';

  constructor(
    private activatedroute: ActivatedRoute,
    private authService: AuthService,
    private storageService: StorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.redirect();
    } else {
      this.isLoggedIn = false;
    }
  }

  onSubmit(): void {
    const { rut, password } = this.form;

    this.authService.auth(rut, password).subscribe({
      next: (data) => {
        this.storageService.storeClientSession(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.toastr.success('Ingreso exitoso', 'Bienvenido!', {
          timeOut: 1000
        });
        this.welcome_message = 'Redireccionando...';

        setInterval(this.redirect, 1000)

      },
      error: (err) => {

        console.log("error");
        console.log(err);

        this.errorMessage = err.error.error;
        this.isLoginFailed = true;

        this.toastr.error(this.errorMessage, 'Atención:', {
          timeOut: 2000
        });
    
      },
    });
  }

  onlyRutDigits(evt: any): boolean {
    var ASCIICode = evt.which ? evt.which : evt.keyCode;

    if (
      ASCIICode > 31 &&
      (ASCIICode < 48 || ASCIICode > 57) &&
      ASCIICode !== 107
    )
      return false;
    return true;
  }

  validateRut(): boolean {
    let rut = this.form.rut;

    if (rut) {

      if (rut.length < 8) {
        return false;
      }

      if (rut.split('k').length - 1 > 1) {
        return false;
      }

      if (rut.charAt(0) === 'k') {
        return false;
      }
    }
    return true;
  }
  
  formatRut(): string {
    let rut = this.form.rut;

    if (rut?.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
      rut = rut.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    } else if (rut?.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
      rut = rut?.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
    } else if (rut?.match(/^(\d)(\d{3})(\d{0,2})$/)) {
      rut = rut?.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
    } else if (rut?.match(/^(\d)(\d{0,2})$/)) {
      rut = rut?.replace(/^(\d)(\d{0,2})$/, '$1.$2');
    }

    this.form.rut = rut;

    return this.form.rut || '';
  }

  redirect(): void {
    window.location.replace('/');
  }

}

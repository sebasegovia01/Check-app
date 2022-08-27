import { Component, OnInit } from '@angular/core';
//models
import { Bank } from 'src/app/models/bank.model';
import { AccountType } from 'src/app/models/account-type.model';
import { Addressee } from 'src/app/models/addressee.model';
import { Client } from 'src/app/models/client.model';
// services
import { StorageService } from 'src/app/services/storage.service';
import { BanksService } from 'src/app/services/banks.service';
import { AccountTypeService } from 'src/app/services/account-type.service';
import { AddresseeService } from 'src/app/services/addressee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-addressee',
  templateUrl: './add-addressee.component.html',
  styleUrls: ['./add-addressee.component.css'],
})


export class AddAddresseeComponent implements OnInit {
  banks?: Bank[];
  accountTypes?: AccountType[];
  client: Client | undefined;
  addressee: Addressee = {
    rut: '',
    nombre: '',
    correo: '',
    telefono: '',
    correlativo_nombre_banco: '',
    id_tipo_cuenta: undefined,
    numero_cuenta: '',
    id_cliente: 0,
  };
  private submitted = false;

  constructor(
    private storageService: StorageService,
    private bankService: BanksService,
    private accountTypeService: AccountTypeService,
    private addresseeService: AddresseeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      window.location.replace('/login');
    }

    this.client = this.storageService.getClientSession().client;
    this.addressee.id_cliente = this.client?.id;
    this.fillBanks();
    this.fillAccountTypes();
  }

  onSubmit(): void {

    this.addresseeService.create(this.addressee).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;

        this.toastr.success('Destinatario creado exitosamente', 'Listo!', {
          timeOut: 1000,
        });

        setInterval(this.reloadPage, 2000)

      },
      error: (e) => console.error(e),
    });
  }

  private reloadPage(): void {
      window.location.reload();
  }

  private fillBanks(): void {
    this.bankService.getBanks().subscribe({
      next: (banks) => {
        this.banks = banks.banks;
      },
      error: (e) => console.error(e),
    });
  }

  private fillAccountTypes(): void {
    this.accountTypeService.getAccountTypes().subscribe({
      next: (account_types) => {
        this.accountTypes = account_types;
      },
      error: (e) => console.error(e),
    });
  }

  isValidEmail(): boolean {
    let valid = true;

    if (this.addressee.correo) {
      valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.addressee.correo
      );
    }

    return valid;
  }

  onlyNumbersPhone(evt: any): boolean {
    var ASCIICode = evt.which ? evt.which : evt.keyCode;

    if (
      ASCIICode > 31 &&
      (ASCIICode < 48 || ASCIICode > 57) &&
      ASCIICode !== 43
    )
      return false;
    return true;
  }

  onlyNumbersAccountNumber(evt: any): boolean {
    var ASCIICode = evt.which ? evt.which : evt.keyCode;

    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
    return true;
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
    let rut = this.addressee.rut;

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
    let rut = this.addressee.rut;

    if (rut?.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
      rut = rut.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    } else if (rut?.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
      rut = rut?.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
    } else if (rut?.match(/^(\d)(\d{3})(\d{0,2})$/)) {
      rut = rut?.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
    } else if (rut?.match(/^(\d)(\d{0,2})$/)) {
      rut = rut?.replace(/^(\d)(\d{0,2})$/, '$1.$2');
    }

    this.addressee.rut = rut;

    return this.addressee.rut || '';
  }
}

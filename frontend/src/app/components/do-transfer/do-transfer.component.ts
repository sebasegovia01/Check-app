import { Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
// models
import { Addressee } from 'src/app/models/addressee.model';
import { Bank } from 'src/app/models/bank.model';
import { Transfer } from 'src/app/models/transfer.model';

//services
import { StorageService } from 'src/app/services/storage.service';
import { AddresseeService } from 'src/app/services/addressee.service';
import { BanksService } from 'src/app/services/banks.service';
import { TransferService } from 'src/app/services/transfer.service';
import { ToastrService } from 'ngx-toastr';
import CurrencyParser from 'src/app/__helpers/currencyParser';

@Component({
  selector: 'app-do-transfer',
  templateUrl: './do-transfer.component.html',
  styleUrls: ['./do-transfer.component.css'],
})
export class DoTransferComponent implements OnInit {
  banks?: Bank[];
  addresses?: any;
  client_id: number = 0;
  selected_id: any;
  addressee: Addressee = {
    id: 0,
    rut: '',
    nombre: '',
    correo: '',
    telefono: '',
    correlativo_nombre_banco: '',
    nombre_banco: '',
    tipo_cuenta: undefined,
    numero_cuenta: '',
    id_cliente: 0,
  };
  disabled_fields: boolean = true;
  transfer: Transfer = {};

  constructor(
    private storageService: StorageService,
    private addresseService: AddresseeService,
    private bankService: BanksService,
    private transferService: TransferService,
    private ngConfig: NgSelectConfig,
    private toastr: ToastrService,
  ) {
    this.ngConfig.notFoundText = 'No se han encontrado destinatarios';
    this.client_id = this.storageService.getClientSession().client.id;
  }

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      window.location.replace('/login');
    }
    this.fillAddresses();
  }

  onSubmit(): void {

    this.transfer.monto = CurrencyParser.clpToNumber(this.transfer.monto);

    this.transferService.create(this.transfer).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Transferencia realizada con exito', 'Listo!', {
          timeOut: 1000,
        });
        setInterval(this.redirect, 2000)
      },
      error: (e) => {
        this.toastr.error(
          'Error interno al intentar realizar transferencia. Intente nuevamente en algunos minutos',
          'Error',
          {
            timeOut: 1000,
          }
        );
        console.error(e);
      },
    });
  }

  fillAddresses(): void {
    this.addresseService.getAllByClientId(this.client_id).subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
      error: (e) => console.error(e),
    });
  }

  selectAddresse(): void {
    this.addresseService.getById(this.selected_id).subscribe({
      next: (addressee) => {
        this.addressee = addressee;
        this.setBankName(addressee.correlativo_nombre_banco || '');
        this.transfer.id_cliente = this.client_id;
        this.transfer.id_destinatario = addressee.id;
        this.disabled_fields = false;
      },
      error: (e) => {
        console.error(e);
        
        this.disabled_fields = true;
      },
    });
  }

  private setBankName(bank_id: string): void {
    this.bankService.getBanks().subscribe((banks: any) => {
      banks.banks.forEach((bank: Bank) => {
        if (bank.id === bank_id) {
          this.addresses.nombre_banco = bank.name;
        }
      });
    });
  }

  onlyNumbersAmount(evt: any): boolean {
    var ASCIICode = evt.which ? evt.which : evt.keyCode;

    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
    {
      return true;
    }
  }

  minimumAmount(): boolean {
    //console.log(this.transfer.monto);

    if (this.transfer.monto) {
      this.transfer.monto = CurrencyParser.numberToClp(this.transfer.monto);
    }

    let amount = CurrencyParser.clpToNumber(this.transfer.monto);

    if (this.transfer.monto === undefined) {
      return true;
    }

    if (amount < 1000) {
      return false;
    } else {
      return true;
    }
  }

  private redirect(): void {
    window.location.replace('/historial')
  }
}

import { Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
// models
import { Addressee } from 'src/app/models/addressee.model';
import { Bank } from 'src/app/models/bank.model';

//services
import { StorageService } from 'src/app/services/storage.service';
import { AddresseeService } from 'src/app/services/addressee.service';
import { BanksService } from 'src/app/services/banks.service';

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

  constructor(
    private storageService: StorageService,
    private addresseService: AddresseeService,
    private bankService: BanksService,
    private ngConfig: NgSelectConfig
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

  onSubmit(): void {}

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
}

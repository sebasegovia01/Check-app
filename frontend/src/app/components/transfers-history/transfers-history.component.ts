import { Component, OnInit } from '@angular/core';
// Models
import { Transfer } from 'src/app/models/transfer.model';
import { Bank } from 'src/app/models/bank.model';
// Services
import { StorageService } from 'src/app/services/storage.service';
import { TransferService } from 'src/app/services/transfer.service';
import { BanksService } from 'src/app/services/banks.service';
import { ToastrService } from 'ngx-toastr';
// helpers
import { DatePipe } from '@angular/common';
import CurrencyParser from 'src/app/__helpers/currencyParser';


@Component({
  selector: 'app-transfers-history',
  templateUrl: './transfers-history.component.html',
  styleUrls: ['./transfers-history.component.css'],
})
export class TransfersHistoryComponent implements OnInit {
  transfers: Transfer[] = [];
  //transfer: Transfer = {};
  client_id: number = 0;
  banks: Bank[] = [];

  constructor(
    private storageService: StorageService,
    private transferService: TransferService,
    private bankService: BanksService,
    private toastr: ToastrService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      window.location.replace('/login');
    }

    this.client_id = this.storageService.getClientSession().client.id;

    this.loadTransfers();
  }

  loadTransfers(): void {
    this.bankService.getBanks().subscribe({
      next: (banks) => {

        this.banks = banks.banks;
        this.transferService.getAllByClientId(this.client_id).subscribe({
          next: (transfers) => {

            transfers.map((transfer) => {
              transfer.monto = this.changeCurrency(transfer.monto);
              transfer.nombre_banco = this.banks.find(
                (bnk) =>
                  bnk.id === transfer.destinatario?.correlativo_nombre_banco
              )?.name;
              transfer.created_at = this.datepipe.transform(transfer.created_at, 'short')
            });

            this.transfers = transfers;
          },
          error: (e) => {
            this.toastr.error(
              'Error interno al obtener historial de transferencias. Intente nuevamente en algunos minutos',
              'Error',
              {
                timeOut: 1000,
              }
            );
            console.error(e);
          },
        });
      },
      error: (e) => {
        this.toastr.error(
          'Error interno al obtener información de transferencias. Intente nuevamente en algunos minutos',
          'Error',
          {
            timeOut: 1000,
          }
        );
        console.error(e);
      },
    });
  }

  private changeCurrency(amount: number): string {
    return CurrencyParser.numberToClp(amount);
  }
}

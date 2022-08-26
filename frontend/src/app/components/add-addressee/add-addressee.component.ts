import { Component, OnInit } from '@angular/core';
//models
import { Bank } from 'src/app/models/bank.model';
import { AccountType } from 'src/app/models/account-type.model';
import { Addressee } from 'src/app/models/addressee.model';
// services
import { StorageService } from 'src/app/services/storage.service';
import { BanksService } from 'src/app/services/banks.service';
import { AccountTypeService } from 'src/app/services/account-type.service';
import { AddresseeService } from 'src/app/services/addressee.service';

@Component({
  selector: 'app-add-addressee',
  templateUrl: './add-addressee.component.html',
  styleUrls: ['./add-addressee.component.css'],
})
export class AddAddresseeComponent implements OnInit {
  banks?: Bank[];
  accountTypes?: AccountType[];
  addressee?: Addressee = {};

  constructor(
    private storageService: StorageService,
    private bankService: BanksService,
    private accountTypeService: AccountTypeService,
    private addresseeService: AddresseeService
  ) {}

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      window.location.replace('/login');
    }

    this.fillBanks();
    this.fillAccountTypes();
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
}

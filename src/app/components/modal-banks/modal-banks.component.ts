import { Component, OnInit } from '@angular/core';
import { BanksService } from '../../services/banks.service';
import { Bank } from '../../interfaces/bank';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-modal-banks',
    templateUrl: './modal-banks.component.html',
    styleUrls: ['./modal-banks.component.scss'],
})
export class ModalBanksComponent implements OnInit {

    banks: Bank[] = [];
    bank: Bank;
    textToSearch: string;

    constructor(private banksService: BanksService,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.getBanks();
    }

    private getBanks() {
        this.banksService.getBanks()
            .then(response => {
                this.banks = response;
            }, console.log);
    }

    dismissModal(bank?: Bank) {
        if (bank) {
            this.modalController.dismiss(bank);
        } else {
            this.modalController.dismiss();
        }
    }

    selectBank(event: any) {
        this.dismissModal(event.target.value);
    }


}

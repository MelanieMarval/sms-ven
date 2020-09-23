import { Component, OnInit } from '@angular/core';
import { Data } from '../../interfaces/data';
import { BanksService } from '../../services/banks.service';
import { ModalController } from '@ionic/angular';
import { ModalBanksComponent } from '../../components/modal-banks/modal-banks.component';
import { ToastUtil } from '../../utils/toast.util';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CheckPermissionsService } from '../../services/check-permissions.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    data: Data = {};
    loading: boolean;

    constructor(private banksService: BanksService,
                private modalController: ModalController,
                private toast: ToastUtil,
                private sms: SMS,
                private checkPermissions: CheckPermissionsService) {
    }

    ngOnInit() {
    }

    async openBankList() {
        const modal = await this.modalController.create({
            component: ModalBanksComponent,
            cssClass: 'my-custom-class',
        });
        await modal.present();

        const {data} = await modal.onWillDismiss();
        if (data) {
            this.data.bank = data;
        }
    }

    validate() {
        const header = 'de validación';
        if (!this.data.bank) {
            return this.toast.error('Debe seleccionar el banco para poder enviar su pago móvil', header);
        }
        if (!this.data.phone) {
            return this.toast.error('Debe agregar el número de teléfono del beneficiario para poder enviar su pago móvil', header);
        }
        if (!this.data.identification) {
            return this.toast.error('Debe agregar el número de cédula o pasaporte para poder enviar su pago móvil', header);
        }
        if (!this.data.amount) {
            return this.toast.error('Debe agregar el monto a pagar de su pago móvil', header);
        }
    }

    async validatePermissions() {
        this.loading = true;
        const response = await this.checkPermissions.needPermissions();
        if (response) {
            this.loading = false;
            this.checkPermissions.toastTryAgainPermissions(response, () => {
                this.validatePermissions();
            });
        } else {
            const message = `PAGAR ${this.data.bank.code} ${this.data.phone} ${this.data.identification} ${this.data.amount},00`;
            this.sendMessage(message);
        }

    }

    sendMessage(message: string) {
        this.sms.send('2662', message).then(res => {
            if (res === 'OK') {
                this.data = {};
                this.toast.success('Mensaje enviado con exito');
                this.loading = false;
            } else {
                this.toast.error('Ha ocurrido un error inesperado, intenta de nuevo o contactanos');
                this.loading = false;
            }
        }, error => {
            this.toast.error('Ha ocurrido un error inesperado, intenta de nuevo o contactanos');
            this.loading = false;
        });
    }


}

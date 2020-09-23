import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class ToastUtil {

    constructor(private toastController: ToastController) {
    }

    async error(message, header?: string) {
        const toast = await this.toastController.create({
            header: `Error ${header}`,
            message,
            duration: 3000,
            color: 'secondary',
        });
        await toast.present();
    }

    async success(message) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            color: 'primary',
        });
        await toast.present();
    }
}

import { Injectable } from '@angular/core';
import { PermissionsService } from './permissions.service';
import { AlertController, ToastController } from '@ionic/angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

@Injectable({
    providedIn: 'root',
})
export class CheckPermissionsService {

    constructor(private permissionsService: PermissionsService,
                private alertController: AlertController,
                private openSettings: OpenNativeSettings) {
    }

    needPermissions(): Promise<any> {
        return new Promise(async resolve => {
            const smsAccess = await this.permissionsService.accessSms();
            if (smsAccess) {
                resolve(false);
            } else {
                resolve('Es necesario el permiso de mensajes para poder realizar el envio de pago movil');
            }
        });
    }

    async toastTryAgainPermissions(subHeader: string, onTryAgain?: any) {
        const toast = await this.alertController.create({
            header: 'Lo sentimos!',
            subHeader,
            message: 'Si decides ir a configuraciones busca permisos > rechazados > SMS, presionalo y marca permitir',
            buttons: [
                {
                    text: 'Configuraciones', role: 'try',
                    handler: () => {
                        this.openSettings.open('application_details').then(() => {
                            onTryAgain();
                        }, (error) => {
                            console.error('The following error occurred: ', error);
                        });
                    },
                },
                {
                    text: 'Reintentar', role: 'try',
                    handler: () => {
                        onTryAgain();
                    },
                },
            ],
        });
        await toast.present();
    }
}

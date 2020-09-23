import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Injectable({
    providedIn: 'root',
})
export class PermissionsService {

    constructor(private androidPermissions: AndroidPermissions) {
    }

    accessSms(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
                async result => {
                    if (result.hasPermission) {
                        resolve(true);
                    } else {
                        resolve(await this.requestAccessSms());
                    }
                },
                async error => {
                    console.log('-> error: ', error);
                    resolve(await this.requestAccessSms());
                },
            );
        });
    }

    private requestAccessSms(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
                .then(result => result.hasPermission ? resolve(true) : resolve(false),
                    error => {
                        console.log('error permiso requestAccessSms', error);
                        resolve(false);
                    },
                );
        });
    }

}

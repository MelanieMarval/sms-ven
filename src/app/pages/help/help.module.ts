import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpPageRoutingModule } from './help-routing.module';

import { HelpPage } from './help.page';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HelpPageRoutingModule,
        HeaderModule,
    ],
  declarations: [HelpPage]
})
export class HelpPageModule {}

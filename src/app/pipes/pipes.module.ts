import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByParameter } from './filter-by-parameter.pipe';


@NgModule({
    declarations: [
        FilterByParameter
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        FilterByParameter
    ],
})
export class PipesModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

const materialUiModules: any[] = [
  MatToolbarModule,
  MatIconModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  MatMenuModule,
  MatBadgeModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, materialUiModules],
  exports: [materialUiModules],
})
export class MaterialUiModule {}

import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatTableModule, 
  MatPaginatorModule, 
  MatSortModule,
  MatCardModule,
  MatRadioModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatRadioModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatRadioModule
  ]
})
export class MaterialModule { }

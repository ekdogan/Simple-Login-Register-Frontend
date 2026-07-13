import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PeriodicElement } from '../table/table';
@Component({
  selector: 'app-dialog-window',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,],
  templateUrl: './dialog-window.html',
  styleUrl: './dialog-window.css',
})
export class DialogWindow {
  readonly dialogRef = inject(MatDialogRef<DialogWindow>);
  readonly data = inject<PeriodicElement>(MAT_DIALOG_DATA);
  readonly name = signal(this.data.name);
  readonly position = signal(this.data.position);
  readonly weight = signal(this.data.weight);
  readonly symbol = signal(this.data.symbol);

  onSaveClick(): void {
    const updatedData: PeriodicElement = {
      name: this.name(),
      position: this.position(),
      weight: this.weight(),
      symbol: this.symbol(),
    };
    this.dialogRef.close(updatedData);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

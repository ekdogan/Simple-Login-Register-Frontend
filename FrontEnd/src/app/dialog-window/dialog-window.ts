import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Item } from '../table/table';
interface DialogData extends Item {
  nightMode: boolean;
}
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
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly isNightMode = signal(this.data.nightMode);
  readonly name = signal(this.data.name);
  readonly category = signal(this.data.category);
  readonly id = signal(this.data.id);
  readonly description = signal(this.data.description);


  onSaveClick(): void {
    const updatedData: Item = {
      name: this.name(),
      id: this.id(),
      category: this.category(),
      description: this.description(),
    };
    this.dialogRef.close(updatedData);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onDeleteClick(): void{
    
    this.dialogRef.close();
  }
}

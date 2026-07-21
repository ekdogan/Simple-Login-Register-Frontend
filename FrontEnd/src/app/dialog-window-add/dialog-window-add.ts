import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Item } from '../table/table';
export interface DialogData extends Item {
  nightMode?: boolean;
  flag: boolean;
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
  templateUrl: './dialog-window-add.html',
  styleUrl: './dialog-window-add.css',
})


export class DialogWindowAdd {
  readonly dialogRef = inject(MatDialogRef<DialogWindowAdd>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly isNightMode = signal(this.data.nightMode);
  readonly name = signal(this.data.name);
  readonly category = signal(this.data.category);
  readonly id = signal(this.data.id);
  readonly description = signal(this.data.description);
  readonly flag=this.data.flag;

  onSaveClick(): void {
    const updatedData: DialogData = {
      name: this.name(),
      id: this.id(),
      category: this.category(),
      description: this.description(),
      flag: true,
    };
    this.dialogRef.close(updatedData);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onDeleteClick(): void{
    const deletedData: DialogData= {
      name: this.name(),
      id: this.id(),
      category: this.category(),
      description: this.description(),
      flag: false,
    }
    this.dialogRef.close(deletedData);
  }
}

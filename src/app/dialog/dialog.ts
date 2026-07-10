import { Component,inject, model, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DialogWindow } from '../dialog-window/dialog-window';
import {MatIconModule} from '@angular/material/icon';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-dialog',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  readonly dialog = inject(MatDialog);
  readonly name = signal('');
  readonly position = signal(0);
  readonly weight = signal(0);
  readonly symbol = signal('');
  openDialog(): void { 
    const dialogRef = this.dialog.open(DialogWindow, {
      data: {name: this.name(), position: this.position(), weight: this.weight(), symbol: this.symbol()},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.name.set(result.name);
        this.position.set(result.position);
        this.weight.set(result.weight);
        this.symbol.set(result.symbol);
      }
    });
  }
}


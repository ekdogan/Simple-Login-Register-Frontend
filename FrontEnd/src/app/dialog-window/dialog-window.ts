import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Item } from '../table/table';
import { JSONResponse } from '../aitable/aitable';
import { CategorizationService, AiResponse} from '../categorization-service';
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
  templateUrl: './dialog-window.html',
  styleUrl: './dialog-window.css',
})


export class DialogWindow {
  constructor(private categorizationService: CategorizationService) {}
  readonly dialogRef = inject(MatDialogRef<DialogWindow>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly isNightMode = signal(this.data.nightMode);
  readonly name = signal(this.data.name);
  readonly category = signal(this.data.category);
  readonly id = signal(this.data.id);
  readonly description = signal(this.data.description);
  readonly flag=this.data.flag;
  aiResponseData: JSONResponse | null = null;
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
  sendToAi() {
      const currentName = this.name() ? this.name().trim() : '';
  
      if (!currentName || currentName.length < 2) {
        return;
      }
  
      
      this.aiResponseData = null;
  
      this.categorizationService.getCategoryPrediction(currentName).subscribe({
        next: (res: AiResponse) => {
         
  
          this.aiResponseData = {
            state: res.durum,
            message: res.mesaj,
            detail: res.detay,
            category: res.kategori,
            product: res.urun
          };
  
          // 🎯 AI'dan gelen öneriyi doğrudan Signal olan kategoriye set ediyoruz
          if (res.durum === 'basarili' && res.kategori) {
            this.category.set(res.kategori);
          }
        },
        error: (err) => {
         
          this.aiResponseData = {
            state: 'hata',
            message: 'HTTP Bağlantı / Servis Hatası',
            detail: err.error || err
          };
        }
      });
    }
}

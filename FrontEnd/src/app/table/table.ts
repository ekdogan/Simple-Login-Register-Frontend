import { AfterViewInit, Component, Input, ViewChild, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { DialogWindow,DialogData } from "../dialog-window/dialog-window";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ItemService } from '../itemservice';
import {DialogWindowAdd} from '../dialog-window-add/dialog-window-add'
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface Item {
  id: number;
  name: string;
  category: string;
  description: string;
  personToEdit?: string;
  time?: Date; 
}


@Component({
  selector: 'app-table',
  styleUrl: 'table.css',
  templateUrl: 'table.html',
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatIcon, 
    MatExpansionModule, 
    MatDividerModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule, 
    MatSortModule,
    DatePipe,
  ],
})
export class TablePaginationExample implements OnInit, AfterViewInit {
  @Input() nightMode = false;

  value = '';
  readonly panelOpenState = signal(false);
  private dialog = inject(MatDialog);
  private itemService = inject(ItemService); // Servis enjekte edildi
  private readonly snackBar = inject(MatSnackBar);
  displayedColumns: string[] = ['accordion', 'adjust'];
  dataSource = new MatTableDataSource<Item>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.fetchItems();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  fetchItems(): void {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Veriler çekilirken hata oluştu:', err)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter(): void {
    this.value = '';
    this.dataSource.filter = '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickAdjustButton(element: Item): void {
  const dialogRef = this.dialog.open(DialogWindow, {
    data: {
      ...element,
      nightMode: this.nightMode,
    },
    width: '400px'
  });

  dialogRef.afterClosed().subscribe((result: DialogData | undefined) => {
    // Return early if the dialog was closed without action
    if (!result) return;

    if (result.flag === true) {
      this.itemService.updateItem(element.id, result).subscribe({
        next: (updatedItem) => {
          Object.assign(element, updatedItem);
          this.dataSource.data = [...this.dataSource.data];
        },
        error: (err) => {
          if(err.status == 403){
          this.snackBar.open('Unautorized!', 'Close', { });
        }
        else{
          console.error('Veri silinirken hata oluştu:', err)
        }
        }
      });
    } else {
      this.itemService.deleteItem(element.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(i => i.id !== element.id);
        },
        error: (err) => console.error('Veri silinirken hata oluştu:', err)
      });
    }
  });
}
  onClickAddItemButton(): void {
  const dialogRef = this.dialog.open(DialogWindowAdd, {
    data: {
      id: 0,
      name: '',
      category: '',
      description: '',
      nightMode: this.nightMode,
      flag: true
    },
    width: '400px'
  });

  dialogRef.afterClosed().subscribe((result: DialogData | undefined) => {
    if (!result) return;

    // Omit ID so backend auto-generates it
    const { id, nightMode, flag, ...newItemPayload } = result;

    this.itemService.addItem(newItemPayload).subscribe({
      next: (addedItem) => {
        this.dataSource.data = [...this.dataSource.data, addedItem];
      },
      error: (err) => {
          if(err.status == 403){
          this.snackBar.open('Unautorized!', 'Close', { });
        }
        else{
          console.error('Veri silinirken hata oluştu:', err)
        }
        }
    });
  });
}

}
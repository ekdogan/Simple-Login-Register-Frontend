import { bootstrapApplication } from '@angular/platform-browser';
import { Component, ViewChild, enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { DxListModule, DxRadioGroupModule, DxToolbarModule } from 'devextreme-angular';
import { DxDrawerModule, DxDrawerComponent } from 'devextreme-angular/ui/drawer';
import type { DxDrawerTypes } from 'devextreme-angular/ui/drawer';
import { List, Service } from '../devx-demo';

let modulePrefix = '';
// @ts-ignore
if (window && window.config?.packageConfigPaths) {
  modulePrefix = '/app';
}

@Component({
  selector: 'demo-app',
  templateUrl: `./devx-demo-drawer.html`,
  styleUrls: [`./devx-demo-drawer.css`],
  providers: [Service],
  preserveWhitespaces: true,
  imports: [
    DxDrawerModule,
    DxListModule,
    DxRadioGroupModule,
    DxToolbarModule,
  ],
})
export class AppComponent {
  @ViewChild(DxDrawerComponent, { static: false }) drawer!: DxDrawerComponent;

  // Fixed strict initialization checks via !
  navigation!: List[];
  text!: string;

  // Added missing property required by your template
  listElementAttr: any = { class: 'panel-list' };

  showSubmenuModes: DxDrawerTypes.RevealMode[] = ['slide', 'expand'];
  positionModes: DxDrawerTypes.PanelLocation[] = ['left', 'right'];
  showModes: DxDrawerTypes.OpenedStateMode[] = ['push', 'shrink', 'overlap'];

  selectedOpenMode: DxDrawerTypes.OpenedStateMode = 'shrink';
  selectedPosition: DxDrawerTypes.PanelLocation = 'left';
  selectedRevealMode: DxDrawerTypes.RevealMode = 'slide';
  isDrawerOpen = true;

  constructor(service: Service) {
    this.text = service.getContent();
    this.navigation = service.getNavigationList();
  }

  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'menu',
      stylingMode: 'text',
      onClick: () => { this.isDrawerOpen = !this.isDrawerOpen; },
    },
  }];
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
  ],
});
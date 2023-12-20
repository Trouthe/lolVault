import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { DashboardContentComponent } from '../dashboard-content/dashboard-content.component';
import { ProfileComponent } from '../profile/profile.component';
import { AddAccountComponent } from '../add-account/add-account.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer!: ViewContainerRef;

  activeItem: string | null = 'dashboard';

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void { this.loadComponent('dashboard'); }

  loadComponent (componentName: string) {
    let component: any;

    switch(componentName) {
      case 'dashboard':
        component = DashboardContentComponent;
        break;
      case 'profile':
        component = ProfileComponent;
        break;
      case 'add-accounts':
        component = AddAccountComponent;
        break;
    }
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentContainer.clear();
    this.componentContainer.createComponent(componentFactory);
  }

  toggleActive (itemName: string): void { this.activeItem = (this.activeItem === itemName) ? null : itemName; }
  isActive (itemName: string): boolean { return this.activeItem === itemName; }

}

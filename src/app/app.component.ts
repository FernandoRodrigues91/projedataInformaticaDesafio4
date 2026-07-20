import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './features/users/feature-users/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserListComponent, ],
  template: `<app-user-list />`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projedataInformaticaDesafio4';
}

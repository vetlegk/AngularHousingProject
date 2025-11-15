import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
      <header>
          <img class="logo" src="assets/logo.svg" alt="logo" />
      </header>

      <section class="content">
        <app-home></app-home>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent],
})

export class AppComponent {
  title = 'homes';
}

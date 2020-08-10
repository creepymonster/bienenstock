import { Component } from '@angular/core';
import { Inject } from '@angular/core';

import { Environment } from '@app/models/environment.model';
import { ENV } from '@app/providers/environment.provider';

import { ThingSpeakService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bienenstock';

  constructor(@Inject(ENV) private env: Environment, private thingSpeakService: ThingSpeakService) {
    
  }
}

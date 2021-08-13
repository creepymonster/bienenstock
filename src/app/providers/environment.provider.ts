import { InjectionToken } from '@angular/core';

import { Environment } from '@app/models/environment.model';
import { environment } from '@env/environment';

export const ENV = new InjectionToken<Environment>('env');

export function getEnv(): Environment {
  return environment;
}

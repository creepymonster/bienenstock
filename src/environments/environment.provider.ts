import { InjectionToken } from '@angular/core';
import { Environment, environment } from './environment';

export const ENV = new InjectionToken<Environment>('env')

export function getEnv(): Environment {
  return environment;
}
import { ThingFieldEntry } from './thing-field-entry.model';
import { ThingField } from './thing-field.model';

export interface ThingFeed {
  entries: ThingFieldEntry[];
  field: ThingField;
}

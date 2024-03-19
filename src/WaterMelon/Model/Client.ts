import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export default class Client extends Model {
  static table = 'Client';

  @text('key')
  key!: string;
  @text('value')
  value!: string;
}

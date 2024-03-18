import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export default class Categories extends Model {
  static table = 'Categories';

  @text('key')
  key!: string;
  @text('value')
  value!: string;
}

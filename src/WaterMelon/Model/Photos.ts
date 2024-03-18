import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export default class Photos extends Model {
  static table = 'Photos';

  @text('key')
  key!: string;
  @text('value')
  value!: string;
  @text('category')
  category!: string;
}

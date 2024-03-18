import {Entity} from './core/entity';
import { CategoriesDto } from "@/Dtos/CategoriesDto";

export class Category extends Entity<CategoriesDto> {
  constructor(dto: CategoriesDto) {
    super(dto, 'id');
  }
  get name(): string {
    return this.dto.name ?? '';
  }
  get date(): string {
    return this.dto.date ?? 0;
  }
  get categoryId(): string {
    return this.dto.id ?? '';
  }
}

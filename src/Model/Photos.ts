import {Entity} from './core/entity';
import { PhotosDto } from "@/Dtos/PhotosDto";

export class Photo extends Entity<PhotosDto> {
  constructor(dto: PhotosDto) {
    super(dto, 'id');
  }
  get photoCategory(): string {
    return this.dto.category ?? '';
  }
  get photoClient(): string {
    return this.dto.client ?? '';
  }
  get photoValue(): string {
    return this.dto.value ?? '';
  }
  get photoId(): string {
    return this.dto.id ?? '';
  }
  get photoKey(): string {
    return this.dto.key ?? '';
  }
}

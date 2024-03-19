import {Entity} from './core/entity';
import { ClientDto } from "@/Dtos/ClientDto";

export class Client extends Entity<ClientDto> {
  constructor(dto: ClientDto) {
    super(dto, 'id');
  }
  get clientNumber(): number {
    return this.dto.clientNumber ?? 0;
  }
  get clientName(): string {
    return this.dto.clientName ?? '';
  }
  get clientId(): string {
    return this.dto.id ?? '';
  }
  get clientKey(): string {
    return this.dto.key ?? '';
  }
  get clientBio(): string {
    return this.dto.clientBio ?? '';
  }
  get clientProfile(): string {
    return this.dto.clientProfile ?? '';
  }
}

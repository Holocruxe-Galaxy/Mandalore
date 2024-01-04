import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  isNotNull<T>(prop: T | null): prop is T {
    return prop !== null;
  }

  isDtoKey<T>(p: string, dto: unknown, dtoModel: any): dto is T {
    return p in dtoModel;
  }

  formatDate(date: Date) {
    return new Intl.DateTimeFormat('sp-AG', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'America/Buenos_Aires',
    }).format(date);
  }
}

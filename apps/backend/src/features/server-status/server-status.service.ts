import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ServerStatusService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {}

  getServerStatus() {
    return {
      status: 'Alive!',
    };
  }

  getVersion() {
    return {
      version: process.env.VERSION,
    };
  }

  getDatabaseStatus() {
    return this.dataSource.query('SELECT 1');
  }
}

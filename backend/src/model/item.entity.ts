import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

// Exemple of a class that extends the base entity.
@Entity({ name: 'item' })
export class Item extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;
}
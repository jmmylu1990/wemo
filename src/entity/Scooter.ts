import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity({ name: 'scooter' })
@Unique(['scooter_number'])
export class Scooter {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  scooter_number: string;
  @Column()
  battery_serial_number?: string;
  @Column()
  mileage?: number;
  @Column()
  current_mileage?: number;
  @Column()
  usage_count?: number;
  @Column()
  model: string;
  @Column({ nullable: true })
  current_renter?: number;
  // 'available' | 'rented' | 'maintenance' | 'relocated' | 'reserved';
  @Column()
  status: number;
  @Column()
  last_maintenance?: Date;
  @Column()
  maintenance_required?: boolean;
  @Column()
  latitude?: number;
  @Column()
  longitude?: number;
  @Column()
  updated_by_system: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    insert: false,
    update: false,
  })
  created_at: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    insert: false,
    update: false,
  })
  updated_at: Date;
  @Column({
    type: 'varchar',
    length: 20,
    default: 'none',
    nullable: true,
  })
  rental_restriction?: 'none' | 'no_rent' | 'no_return';
}

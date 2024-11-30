import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity({ name: 'scooter' })
@Unique(['scooter_number'])
export class Scooter {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  scooter_number: string;
  @Column()
  battery_serial_number: string;
  @Column()
  mileage: number;
  @Column()
  usage_count: number;
  @Column()
  model: string;
  @Column()
  status: number;
  @Column()
  last_maintenance: Date;
  @Column()
  maintenance_required?: boolean;
  @Column()
  latitude: number;
  @Column()
  longitude: number;
  @Column()
  updated_by_system: string;
  @Column()
  current_renter: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    insert: false,
    update: false,
  })
  private created_at: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    insert: false,
    update: false,
  })
  private updated_at: Date;
  @Column({
    type: 'varchar',
    length: 20,
    default: 0,
    nullable: true,
  })
  private rental_restriction: number;
}

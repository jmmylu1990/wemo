import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity({ name: 'scooter' })
@Unique(['scooter_number'])
export class Scooter {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column()
  private scooter_number: string;
  @Column()
  private battery_serial_number: string;
  @Column()
  private mileage: number;
  @Column()
  private usage_count: number;
  @Column()
  private model: string;
  @Column()
  private status: number;
  @Column()
  private last_maintenance: Date;
  @Column()
  private maintenance_required?: boolean;
  @Column()
  private latitude: number;
  @Column()
  private longitude: number;
  @Column()
  private updated_by_system: string;
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

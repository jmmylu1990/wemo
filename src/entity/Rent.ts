import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity('rent')
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'user_id' })
  userId: number;
  @Column({ name: 'scooter_id' })
  scooterId: number;
  @Column({ name: 'credit_card_id' })
  creditCardId: number;
  @Column({
    name: 'start_time',
    type: 'timestamp',
    insert: false,
    update: false,
  })
  startTime: Date;
  @Column({
    name: 'end_time',
    type: 'timestamp',
    insert: false,
    update: false,
  })
  endTime: Date;
  @Column({ name: 'distance' })
  distance: number;
  @Column({ name: 'is_active' })
  isActive: boolean;
  @Column({ name: 'package_type' })
  packageType: string;
  @Column({ name: 'package_price' })
  packagePrice: number;
  @Column({ name: 'additional_fee' })
  additionalFee: number;
  @Column({ name: 'subscription_discount' })
  subscriptionDiscount?: number;
  @Column({ name: 'overdue_fee' })
  overdueFee: number;
  @Column({ name: 'total_price' })
  totalPrice: number;
  @Column({ name: 'return_location' })
  returnLocation: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Timestamp;
  @Column({ name: 'modified_by' })
  modifiedBy: number;
}

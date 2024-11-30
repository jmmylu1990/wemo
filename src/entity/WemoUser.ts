import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'wemo_user' })
export class WemoUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  phone_number: string;
  @Column()
  email: string;
  @Column()
  hashed_password: string;
  @Column()
  gender: string;
  @Column()
  date_of_birth: Date;
  @Column()
  address: string;
  @Column()
  id_card_number: string;
  @Column()
  id_card_front: string;
  @Column()
  id_card_back: string;
  @Column()
  driver_license_number: string;
  @Column()
  driver_license_verified: boolean;
  @Column()
  is_verified: boolean;
  @Column()
  verification_date: Date;
  @Column()
  subscription_type: string;
  @Column()
  subscription_start_date: Date;
  @Column()
  subscription_end_date: Date;
  @Column()
  referral_code: string;
  @Column()
  referred_by: string;
  @Column()
  wemo_pass_status: boolean;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    insert: false,
    update: false,
  })
  @Column()
  created_at: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    insert: false,
    update: false,
  })
  @Column()
  updated_at: Date;
  @Column()
  modified_by: number;
  @Column()
  is_renting: boolean;
}

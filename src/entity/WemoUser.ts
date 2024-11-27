import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'wemo_user' })
export class WemoUser {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column()
  private username: string;
  @Column()
  private phone_number: string;
  @Column()
  private email: string;
  @Column()
  private hashed_password: string;
  @Column()
  private gender: string;
  @Column()
  private date_of_birth: Date;
  @Column()
  private address: string;
  @Column()
  private id_card_number: string;
  @Column()
  private id_card_front: string;
  @Column()
  private id_card_back: string;
  @Column()
  private driver_license_number: string;
  @Column()
  private driver_license_verified: boolean;
  @Column()
  private is_verified: boolean;
  @Column()
  private verification_date: Date;
  @Column()
  private subscription_type: string;
  @Column()
  private subscription_start_date: Date;
  @Column()
  private subscription_end_date: Date;
  @Column()
  private referral_code: string;
  @Column()
  private referred_by: string;
  @Column()
  private wemo_pass_status: boolean;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    insert: false,
    update: false,
  })
  @Column()
  private created_at: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    insert: false,
    update: false,
  })
  @Column()
  private updated_at: Date;
  @Column()
  private modified_by: number;

  public get getIdCardNumber(): string {
    return this.id_card_number;
  }
}

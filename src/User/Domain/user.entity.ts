import { Order } from "@/Order/Domain/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ name: "accountnumber", type: "varchar", length: 20 })
  accountNumber: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

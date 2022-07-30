import { BeforeUpdate, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimestamp } from "./baseTimestamp";
import Shift from "./shift";

@Entity()
export default class Week extends BaseTimestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "date",
  })
  startDate: string;

  @Column({
    type: "date",
  })
  endDate: string;

  @Column({
    type: "boolean",
    default: false
  })
  isPublished: boolean;

  @Column({
    type: "timestamp without time zone",
    nullable: true,
    default: null
  })
  publishedAt: Date;

  @OneToMany(() => Shift, shift => shift.week) shifts: Shift[];

  @BeforeUpdate()
    onPublished() {
      if (this.isPublished) return this.publishedAt = new Date()
      this.publishedAt = null
    }
}
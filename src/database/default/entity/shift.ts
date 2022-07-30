
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HttpError } from "../../../shared/classes/HttpError";
import { BaseTimestamp } from "./baseTimestamp";
import Week from "./week";

@Entity()
export default class Shift extends BaseTimestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "date",
  })
  date: string;

  @Column({
    type: "time",
  })
  startTime: string;

  @Column({
    type: "time",
  })
  endTime: string;

  @ManyToOne(() => Week, week => week.id) week: Week;

  @BeforeUpdate()
  @BeforeInsert()
  beforeInsertOrUpdate() {
    if (this.week?.isPublished) throw new HttpError(403, "Cannot update or add shift to published week")
  }

  @BeforeRemove()
  beforeRemove() {
    if (this.week?.isPublished) throw new HttpError(403, "Cannot delete shift inside published week")
  }
}
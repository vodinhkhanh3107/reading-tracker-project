import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from "typeorm";

import { ShelfBook } from "./ShelfBook";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "work_id",
    type: "varchar",
    length: 255,
    unique: true,
  })
  workId!: string;

  @Column({
    type: "varchar",
    length: 500,
  })
  title!: string;

  @Column({
    type: "json",
    nullable: true,
  })
  authors!: string[] | null;

  @Column({
    name: "cover_id",
    type: "bigint",
    nullable: true,
  })
  coverId!: number | null;

  @Column({
    name: "cover_url",
    type: "varchar",
    length: 500,
    nullable: true,
  })
  coverUrl!: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string | null;

  @Column({
    type: "json",
    nullable: true,
  })
  subjects!: string[] | null;

  @Column({
    name: "first_publish_date",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  firstPublishDate!: string | null;

  @Column({
    name: "number_of_pages",
    type: "int",
    nullable: true,
  })
  numberOfPages!: number | null;

  @Column({
    name: "created_at",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column({
    name: "updated_at",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @OneToOne(
    () => ShelfBook,
    (shelfBook) => shelfBook.book,
  )
  shelfBook!: ShelfBook;
}
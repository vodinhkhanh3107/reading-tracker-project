import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Book } from "./Book";


export enum ReadingStatus {
  WANT_TO_READ = "WANT_TO_READ",
  READING = "READING",
  COMPLETED = "COMPLETED",
}

@Entity("shelf_books")
export class ShelfBook {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(
    () => Book,
    (book) => book.shelfBook,
    {
      onDelete: "CASCADE",
    },
  )
  @JoinColumn({
    name: "book_id",
  })
  book!: Book;

  @Column({
    type: "enum",
    enum: ReadingStatus,
    default: ReadingStatus.WANT_TO_READ,
  })
  status!: ReadingStatus;

  @Column({
    name: "current_page",
    type: "int",
    default: 0,
  })
  currentPage!: number;

  @Column({
    type: "tinyint",
    nullable: true,
  })
  rating!: number | null;

  @Column({
    type: "text",
    nullable: true,
  })
  note!: string | null;

  @Column({
    name: "started_at",
    type: "datetime",
    nullable: true,
  })
  startedAt!: Date | null;

  @Column({
    name: "finished_at",
    type: "datetime",
    nullable: true,
  })
  finishedAt!: Date | null;

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
}
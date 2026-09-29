var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, } from "typeorm";
import { ShelfBook } from "./ShelfBook";
let Book = class Book {
    id;
    workId;
    title;
    authors;
    coverId;
    coverUrl;
    description;
    subjects;
    firstPublishDate;
    numberOfPages;
    createdAt;
    updatedAt;
    shelfBook;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    Column({
        name: "work_id",
        type: "varchar",
        length: 255,
        unique: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "workId", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 500,
    }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    Column({
        type: "json",
        nullable: true,
    }),
    __metadata("design:type", Object)
], Book.prototype, "authors", void 0);
__decorate([
    Column({
        name: "cover_id",
        type: "bigint",
        nullable: true,
    }),
    __metadata("design:type", Object)
], Book.prototype, "coverId", void 0);
__decorate([
    Column({
        name: "cover_url",
        type: "varchar",
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Book.prototype, "coverUrl", void 0);
__decorate([
    Column({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", Object)
], Book.prototype, "description", void 0);
__decorate([
    Column({
        type: "json",
        nullable: true,
    }),
    __metadata("design:type", Object)
], Book.prototype, "subjects", void 0);
__decorate([
    Column({
        name: "first_publish_date",
        type: "varchar",
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Book.prototype, "firstPublishDate", void 0);
__decorate([
    Column({
        name: "number_of_pages",
        type: "int",
        nullable: true,
    }),
    __metadata("design:type", Object)
], Book.prototype, "numberOfPages", void 0);
__decorate([
    Column({
        name: "created_at",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Book.prototype, "createdAt", void 0);
__decorate([
    Column({
        name: "updated_at",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Book.prototype, "updatedAt", void 0);
__decorate([
    OneToOne(() => ShelfBook, (shelfBook) => shelfBook.book),
    __metadata("design:type", ShelfBook)
], Book.prototype, "shelfBook", void 0);
Book = __decorate([
    Entity("books")
], Book);
export { Book };
//# sourceMappingURL=Book.js.map
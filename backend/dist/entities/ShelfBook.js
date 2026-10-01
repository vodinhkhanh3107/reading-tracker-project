var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, } from "typeorm";
import { Book } from "./Book";
export var ReadingStatus;
(function (ReadingStatus) {
    ReadingStatus["WANT_TO_READ"] = "WANT_TO_READ";
    ReadingStatus["READING"] = "READING";
    ReadingStatus["COMPLETED"] = "COMPLETED";
})(ReadingStatus || (ReadingStatus = {}));
let ShelfBook = class ShelfBook {
    id;
    book;
    status;
    currentPage;
    rating;
    note;
    startedAt;
    finishedAt;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ShelfBook.prototype, "id", void 0);
__decorate([
    OneToOne(() => Book, (book) => book.shelfBook, {
        onDelete: "CASCADE",
    }),
    JoinColumn({
        name: "book_id",
    }),
    __metadata("design:type", Book)
], ShelfBook.prototype, "book", void 0);
__decorate([
    Column({
        type: "enum",
        enum: ReadingStatus,
        default: ReadingStatus.WANT_TO_READ,
    }),
    __metadata("design:type", String)
], ShelfBook.prototype, "status", void 0);
__decorate([
    Column({
        name: "current_page",
        type: "int",
        default: 0,
    }),
    __metadata("design:type", Number)
], ShelfBook.prototype, "currentPage", void 0);
__decorate([
    Column({
        type: "tinyint",
        nullable: true,
    }),
    __metadata("design:type", Object)
], ShelfBook.prototype, "rating", void 0);
__decorate([
    Column({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", Object)
], ShelfBook.prototype, "note", void 0);
__decorate([
    Column({
        name: "started_at",
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Object)
], ShelfBook.prototype, "startedAt", void 0);
__decorate([
    Column({
        name: "finished_at",
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Object)
], ShelfBook.prototype, "finishedAt", void 0);
__decorate([
    Column({
        name: "created_at",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ShelfBook.prototype, "createdAt", void 0);
__decorate([
    Column({
        name: "updated_at",
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ShelfBook.prototype, "updatedAt", void 0);
ShelfBook = __decorate([
    Entity("shelf_books")
], ShelfBook);
export { ShelfBook };
//# sourceMappingURL=ShelfBook.js.map
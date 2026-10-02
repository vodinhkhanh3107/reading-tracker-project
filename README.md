# 📚 Reading Tracker

Reading Tracker là ứng dụng quản lý quá trình đọc sách cá nhân.

Ứng dụng cho phép người dùng tìm kiếm sách thông qua Open Library API, xem thông tin chi tiết của sách và quản lý các sách trong tủ sách cá nhân.

Các chức năng chính:

* 🔎 Tìm kiếm sách.
* 📖 Xem chi tiết sách.
* 📚 Thêm sách vào tủ sách.
* 📊 Theo dõi tiến độ đọc.
* 🔄 Quản lý trạng thái đọc.
* ⭐ Đánh giá sách.
* 📝 Ghi chú cho sách.
* 🗑️ Xóa sách khỏi tủ sách.

---

## 1. 🎯 Project Overview

Reading Tracker được xây dựng theo mô hình Frontend - Backend - Database.

Frontend chịu trách nhiệm hiển thị giao diện và tương tác với người dùng.

Backend cung cấp REST API, xử lý business logic, giao tiếp với Open Library API và quản lý dữ liệu trong MySQL.

Database sử dụng MySQL để lưu trữ thông tin sách và dữ liệu tủ sách.

---

## 2. ✨ Main Features

### 2.1. Search Books

Người dùng có thể tìm kiếm sách theo từ khóa.

Frontend gửi request tới Backend:

```text
GET /api/v1/books/search?q={keyword}&page={page}&limit={limit}
```

Backend tìm kiếm trong dữ liệu sách đã lưu ở MySQL và trả kết quả đã chuẩn hóa cho Frontend. Open Library được sử dụng để lấy dữ liệu nguồn khi seed/import sách, không phải API mà Frontend gọi trực tiếp.

---

### 2.2. Book Detail

Người dùng có thể xem thông tin chi tiết của một tác phẩm.

```text
GET /api/v1/books/{workId}
```

Backend lấy chi tiết sách từ dữ liệu đã lưu trong MySQL. Thông tin có thể bao gồm:

* Tên sách.
* Tác giả.
* Mô tả.
* Ảnh bìa.
* Thể loại/chủ đề.
* Ngày xuất bản đầu tiên.
* Số trang.

---

### 2.3. Shelf Book

Người dùng có thể thêm sách vào tủ sách cá nhân và quản lý:

* Trạng thái đọc.
* Số trang hiện tại.
* Rating.
* Note.
* Ngày bắt đầu đọc.
* Ngày hoàn thành.

Các trạng thái đọc:

```text
WANT_TO_READ
READING
COMPLETED
```

---

## 3. 🛠️ Technologies

### Frontend

* Vue 3
* TypeScript
* Vite
* Vue Router
* Ant Design Vue
* Axios

### Backend

* Node.js
* Express.js
* TypeScript
* TypeORM
* Axios (gọi HTTP API khi cần)

### ORM

* TypeORM

TypeORM được sử dụng để:

* Mapping Entity với database.
* Thực hiện các thao tác CRUD.
* Quản lý quan hệ giữa các bảng.
* Hạn chế việc viết SQL trực tiếp trong business logic.
* Tách database access khỏi Service Layer.

### Database

* MySQL

### External Data Source

* Open Library API — dùng để lấy dữ liệu sách khi seed/import dữ liệu.

Các endpoint nguồn có thể được dùng trong seed:

```text
GET https://openlibrary.org/search.json?q={keyword}&page={n}&limit=20
GET https://openlibrary.org/works/{workId}.json
GET https://covers.openlibrary.org/b/id/{coverId}-M.jpg
```

Trong luồng runtime hiện tại, Frontend gọi Backend; Backend truy vấn dữ liệu sách đã lưu trong MySQL. Open Library không phải dependency bắt buộc cho mỗi request tìm kiếm/chi tiết sách.

---

## 4. 🏗️ System Architecture

Kiến trúc tổng quát:

```text
┌─────────────────────────┐
│       Vue.js             │
│       Frontend           │
└────────────┬────────────┘
             │
             │ HTTP / REST API
             ▼
┌─────────────────────────┐
│   Node.js + Express      │
│       TypeScript         │
├─────────────────────────┤
│ Controllers              │
│ Services                 │
│ Repositories             │
│ TypeORM Entities         │
└───────┬─────────┬───────┘
        │         │
        │         │ HTTP Request
        │         ▼
        │   ┌─────────────────┐
        │   │  Open Library   │
        │   │      API        │
        │   └─────────────────┘
        │
        ▼
┌─────────────────────────┐
│         MySQL            │
│    Reading Tracker DB    │
└─────────────────────────┘
```

### Backend Architecture

Backend được tổ chức theo các layer:

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
TypeORM
   ↓
MySQL
```

Trong đó:

### Route

Định nghĩa endpoint và chuyển request tới Controller.

### Controller

* Nhận HTTP request.
* Validate các input cơ bản.
* Gọi Service.
* Trả HTTP response.

### Service

Chứa business logic của ứng dụng.

Ví dụ:

* Tìm kiếm sách.
* Lấy thông tin sách từ Open Library.
* Quản lý tủ sách.
* Cập nhật tiến độ đọc.

### Repository

Đảm nhiệm việc giao tiếp với database thông qua TypeORM.

### Entity

Định nghĩa mapping giữa TypeScript class và database table.

Ví dụ:

```text
Book Entity
    ↓
books table

ShelfBook Entity
    ↓
shelf_books table
```

---

## 5. 🗄️ Database Design

Database sử dụng MySQL.

Các Entity chính:

```text
Book
ShelfBook
```

### Book

Lưu thông tin của tác phẩm lấy từ Open Library.

Các thông tin chính:

```text
id
workId
title
authors
coverId
coverUrl
description
subjects
firstPublishDate
numberOfPages
createdAt
updatedAt
```

### ShelfBook

Lưu thông tin sách mà người dùng đang quản lý trong tủ sách.

Các thông tin chính:

```text
id
bookId
status
currentPage
rating
note
startedAt
finishedAt
createdAt
updatedAt
```

### Relationship

```text
Book
 │
 │ 1 : 1
 │
 ▼
ShelfBook
```

![alt text]({15A5F833-EC2C-41C8-BDA7-FBDE6817376C}.png)

---

## 6. 🔄 Main Application Flow

### Search Book

```text
User
 │
 ▼
Frontend
 │
 │ GET /api/v1/books/search
 ▼
Book Route
 │
 ▼
Book Controller
 │
 ▼
Book Use Case / Service
 │
 ▼
Book Repository
 │
 ▼
TypeORM
 │
 ▼
MySQL
 │
 ▼
Controller
 │
 ▼
Frontend
```

---

### Add Book To Shelf

```text
User
 │
 ▼
Frontend
 │
 ▼
Backend
 │
 ▼
Controller
 │
 ▼
Service
 │
 ▼
Repository
 │
 ▼
TypeORM
 │
 ▼
MySQL
```

---

### Update Reading Progress

```text
Frontend
    │
    ▼
Controller
    │
    ▼
ShelfBook Service
    │
    ▼
ShelfBook Repository
    │
    ▼
TypeORM
    │
    ▼
MySQL
```

Khi số trang hiện tại đạt tổng số trang của sách, trạng thái có thể được cập nhật thành:

```text
COMPLETED
```

---

## 7. 🌐 API

### Book APIs

#### Search Books

```http
GET /api/v1/books/search
```

Query parameters:

```text
q
page
limit
```

Example:

```text
GET /api/v1/books/search?q=harry&page=1&limit=20
```

Response:

```json
{
  "success": true,
  "data": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "books": []
  }
}
```

---

#### Get Book Detail

```http
GET /api/v1/books/:workId
```

Example:

```text
GET /api/v1/books/OL45804W
```

---

### Shelf Book APIs

> Cập nhật danh sách endpoint thực tế sau khi hoàn thành toàn bộ Shelf Book API.

```http
POST /api/v1/shelf-books
GET /api/v1/shelf-books
PATCH /api/v1/shelf-books/:id/progress
PATCH /api/v1/shelf-books/:id/rating
PATCH /api/v1/shelf-books/:id/note
DELETE /api/v1/shelf-books/:id
```

---

## 8. 📋 Business Rules

Các business rules chính:

1. Không cho phép thêm một sách trùng vào tủ sách.
2. `currentPage` phải lớn hơn hoặc bằng `0`.
3. `currentPage` không được lớn hơn tổng số trang của sách.
4. Rating là số nguyên từ `1` đến `5` hoặc để trống.
5. Khi số trang hiện tại bằng tổng số trang, trạng thái sách chuyển sang `COMPLETED`.
6. Khi sách chuyển sang `READING` lần đầu, ghi nhận `startedAt`.
7. Khi sách chuyển sang `COMPLETED`, ghi nhận `finishedAt`.
8. Backend phải validate dữ liệu đầu vào.
9. Các lỗi API được trả về theo format thống nhất.

---

# 9. 🚀 Chạy local bằng Docker sau khi clone

### 6.1. Yêu cầu

-   Git
-   Docker Desktop (Windows/macOS) hoặc Docker Engine + Docker Compose
    plugin (Linux)
-   Docker đang chạy trước khi thực hiện các lệnh bên dưới

Kiểm tra:

``` bash
git --version
docker --version
docker compose version
```

### 6.2. Clone repository

Thay `<REPOSITORY_URL>` bằng URL Git repository thực tế:

``` bash
git clone <REPOSITORY_URL>
cd <PROJECT_FOLDER>
```

Chạy các lệnh tiếp theo tại thư mục gốc, nơi chứa `docker-compose.yml`.

### 6.3. Tạo file `.env`

Tạo file `.env` từ file mẫu ở thư mục gốc.

**Windows PowerShell:**

``` powershell
Copy-Item .env.example .env
```

**macOS/Linux/Git Bash:**

``` bash
cp .env.example .env
```

File `.env.example` cần có các biến sau:

``` dotenv
MYSQL_ROOT_PASSWORD=change_this_root_password
MYSQL_DATABASE=reading_tracker
MYSQL_USER=reading_user
MYSQL_PASSWORD=change_this_password
```

Có thể thay các giá trị mật khẩu trong `.env` bằng giá trị riêng. Không
commit `.env` lên Git. Giữ file `.env.example` trong repository nhưng
không đặt mật khẩu thật trong file này.

Docker Compose dùng các biến trên để khởi tạo MySQL. Với volume database
đã được khởi tạo từ trước, thay đổi các biến trong `.env` không tự đổi
mật khẩu/tài khoản bên trong MySQL.

### 6.4. Kiểm tra cấu hình Docker

``` bash
docker compose config
```

Nếu báo thiếu biến `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`
hoặc `MYSQL_PASSWORD`, hãy kiểm tra: - Bạn đang đứng đúng thư mục có
`docker-compose.yml`. - File tên chính xác là `.env`, không phải
`.env.txt`. - `.env` nằm cạnh `docker-compose.yml`. - Các biến bắt buộc
có giá trị.

### 6.5. Khởi động toàn bộ ứng dụng

``` bash
docker compose up --build
```

Lệnh này build image và chạy các service theo thứ tự phụ thuộc được cấu
hình trong Compose. Nếu muốn chạy nền:

``` bash
docker compose up --build -d
```

Với cấu hình hiện tại, các địa chỉ là:

  Thành phần                             Địa chỉ
  -------------------------------------- ------------------------------
  Frontend                               http://localhost:5173
  Backend API base                       http://localhost:5000/api/v1
  MySQL từ máy host                      `localhost:3307`
  MySQL từ backend/migration container   `mysql:3306`

Frontend cần dùng biến `VITE_API_BASE_URL=http://localhost:5000/api/v1`.
Trong Docker Compose, backend/migration cần dùng `DB_HOST=mysql`,
`DB_PORT=3306`, `DB_USER`, `DB_PASSWORD` và `DB_NAME`.

### 6.6. Migration database

Service `migrate` chạy lệnh:

``` bash
npm run migration:run
```

Backend được cấu hình chờ migration hoàn tất thành công trước khi khởi
động. Dự án dùng `synchronize: false`, vì vậy bảng database phải được
tạo bằng migration đã commit trong `backend/src/migrations/`.

**Trước khi push repository**, hãy bảo đảm các migration không tạo trùng
bảng. Chỉ nên có một migration khởi tạo schema; migration tiếp theo chỉ
chứa thay đổi schema mới. Nếu hai migration cùng tạo `books` hoặc
`shelf_books`, service `migrate` sẽ thất bại với lỗi
`Table already exists`.

Nếu migration lỗi, xem log:

``` bash
docker compose logs --no-color migrate
```

Sau khi sửa migration, chạy lại:

``` bash
docker compose run --rm migrate
docker compose up --build
```

Không xóa volume database chỉ để xử lý lỗi migration nếu bạn cần giữ dữ
liệu.

### 6.7. Nạp dữ liệu mẫu (nếu cần)

Seed không tự chạy mỗi lần khởi động. Sau khi migration thành công, chạy
thủ công:

``` bash
docker compose run --rm backend npm run seed
```

Chỉ chạy seed khi bạn muốn nạp dữ liệu mẫu. Nếu seed không hỗ trợ chạy
nhiều lần an toàn, tránh chạy lặp lại để không tạo dữ liệu trùng.

### 6.8. Các lệnh Docker thường dùng

``` bash
# Xem trạng thái container
docker compose ps -a

# Xem log tất cả service
docker compose logs -f

# Xem log backend
docker compose logs -f backend

# Xem log migration
docker compose logs --no-color migrate

# Dừng container, giữ nguyên dữ liệu MySQL
docker compose down

# Build lại image và khởi động
docker compose up --build
```

`docker compose down` giữ lại named volume `mysql_data`. **Không chạy
`docker compose down -v` nếu muốn giữ dữ liệu**, vì `-v` sẽ xóa volume
được Compose quản lý.

### 6.9. Khắc phục sự cố thường gặp

**MySQL báo
`Database is uninitialized and password option is not specified`** -
Kiểm tra `.env` ở thư mục gốc và xác nhận `MYSQL_ROOT_PASSWORD` có giá
trị. - Chạy `docker compose config` để kiểm tra nội suy biến môi trường.

**Migration báo `Table 'shelf_books' already exists`** - Kiểm tra log để
biết migration nào đã chạy thành công và migration nào tạo trùng bảng. -
Đối chiếu các file trong `backend/src/migrations/`; không để hai
migration khởi tạo cùng một schema. - Không xóa volume như bước xử lý
đầu tiên.

**Backend không khởi động** - Xem
`docker compose logs --no-color backend`. - Xác nhận Express lắng nghe
trên `process.env.PORT` và địa chỉ `0.0.0.0` bên trong container. - Xác
nhận biến DB trong container khớp với `database.ts`: `DB_HOST`,
`DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

**Port đã được sử dụng** - Nếu port `5173`, `5000` hoặc `3307` đang được
ứng dụng khác sử dụng, hãy dừng ứng dụng đó hoặc đổi port bên trái trong
phần `ports` của `docker-compose.yml`. - Với cấu hình `"3307:3306"`,
MySQL vẫn nghe ở port `3306` bên trong container.



# 10. 📦 TypeScript Configuration

Backend sử dụng TypeScript với ES Module.

Các cấu hình chính:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Project không sử dụng CommonJS.

Code sử dụng:

```typescript
import express from "express";
```

và:

```typescript
export default app;
```



# 11. 🗃️ TypeORM

TypeORM được sử dụng làm ORM cho MySQL.

Ví dụ Entity:

```typescript
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
}
```

Database connection được cấu hình thông qua:

```text
src/config/database.ts
```

TypeORM DataSource đọc thông tin database từ environment variables.

```text
.env
   ↓
database.ts
   ↓
TypeORM DataSource
   ↓
MySQL
```

---

# 12. 🌐 Deployment

## 12.1. Nền tảng production

Dự án hiện được triển khai bằng các dịch vụ sau:

| Thành phần | Nền tảng | URL / cấu hình |
|---|---|---|
| Frontend | Vercel | https://reading-tracker-project.vercel.app |
| Backend API | Render | https://reading-tracker-project.onrender.com |
| Database | Aiven MySQL | Database cloud; tên database hiện dùng là `defaultdb` |

Frontend gọi Backend qua HTTPS. Backend kết nối đến Aiven MySQL bằng các biến môi trường; không đưa thông tin kết nối database vào Frontend.

## 12.2. Deploy database — Aiven MySQL

1. Tạo/chọn dịch vụ MySQL trong Aiven.
2. Lấy hostname, port, username, password và database name từ phần connection information.
3. Kết nối bằng MySQL Workbench hoặc công cụ SQL tương đương.
4. Bật TLS/SSL theo yêu cầu kết nối của Aiven.
5. Kiểm tra database đích:

```sql
SELECT DATABASE();
SHOW TABLES;
```

Database cần có schema được tạo từ các migration đã commit trong `backend/src/migrations/`. Dự án sử dụng `synchronize: false`, vì vậy không dựa vào TypeORM tự tạo bảng lúc khởi động.

## 12.3. Deploy backend — Render

**Service:** `reading-tracker-project`  
**URL:** `https://reading-tracker-project.onrender.com`

### Environment Variables

Cấu hình trong Render Dashboard → Web Service → Environment:

```env
DB_HOST=<AIVEN_HOST>
DB_PORT=<AIVEN_PORT>
DB_USER=<AIVEN_USER>
DB_PASSWORD=<AIVEN_PASSWORD>
DB_NAME=defaultdb
FRONTEND_URL=https://reading-tracker-project.vercel.app
```

Render tự cung cấp biến `PORT` cho Web Service; backend cần lắng nghe trên `process.env.PORT`. Không commit password hoặc file `.env` lên Git.

### Build Command và Start Command

Vì Pre-Deploy Command không khả dụng trong cấu hình Render hiện tại, migration được chạy trong Build Command. Với Root Directory đặt là `backend`, cấu hình triển khai là:

**Build Command**

```bash
npm install --include=dev && npm run build && npm run migration:run
```

**Start Command**

```bash
npm start
```

`npm run migration:run` phải trỏ đến đúng `src/config/database.ts` và dùng các biến môi trường Aiven. Trước khi deploy, xác nhận script `migration:run` gọi đúng lệnh TypeORM `migration:run` (không phải `migration:run-d`).

Build Command chạy migration trước khi Render khởi động phiên bản backend mới. Nếu migration thất bại, kiểm tra build logs và không bỏ qua lỗi. Không tạo migration mới chỉ để xử lý lỗi kết nối; trước tiên xác minh database đích và trạng thái migration.

### CORS

Backend cho phép frontend production qua biến `FRONTEND_URL`:

```text
https://reading-tracker-project.vercel.app
```

Origin phải khớp chính xác, không thêm dấu `/` cuối. Khi đổi domain Vercel, cập nhật biến này và deploy lại backend. CORS chỉ kiểm soát trình duyệt có được đọc response hay không; nó không thay thế authentication/authorization.

### Kiểm tra backend sau deploy

Health endpoint:

```text
https://reading-tracker-project.onrender.com/health
```

API dashboard:

```text
https://reading-tracker-project.onrender.com/api/v1/dashboard
```

Nếu API trả HTTP 500, mở Render Logs và kiểm tra lỗi thực tế. Lỗi `Table doesn't exist` hoặc `Unknown column` thường liên quan đến schema/migration; lỗi CORS cần kiểm tra origin và response headers.

## 12.4. Seed dữ liệu mẫu lên Aiven

Migration chỉ tạo/cập nhật cấu trúc bảng; nó không tự thêm dữ liệu mẫu. Seed là thao tác riêng và không tự chạy mỗi lần deploy.

Sau khi migration thành công, chạy seed từ thư mục `backend` trong terminal đã được cấu hình các biến `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` trỏ đến Aiven:

```bash
npm run seed
```

Trước khi chạy, kiểm tra `backend/src/seeds/index.ts` để biết seed có kiểm tra dữ liệu đã tồn tại hay không. Nếu seed chưa idempotent (chạy lặp an toàn), chỉ chạy một lần hoặc điều chỉnh seed để tránh dữ liệu trùng. Không chạy seed tự động mỗi lần deploy nếu chưa xác nhận hành vi đó.

Sau khi seed, kết nối đến Aiven và kiểm tra dữ liệu, ví dụ:

```sql
SELECT COUNT(*) FROM books;
SELECT COUNT(*) FROM shelf_books;
```

Nếu `shelf_books` chưa có dữ liệu mẫu, điều đó không nhất thiết là lỗi: seed có thể chỉ nạp dữ liệu sách vào `books`.

## 12.5. Deploy frontend — Vercel

**URL:** `https://reading-tracker-project.vercel.app`

1. Push code lên repository Git.
2. Kết nối repository với Vercel và chọn thư mục `frontend` làm Root Directory nếu đang deploy monorepo.
3. Đặt biến môi trường production:

```env
VITE_API_BASE_URL=https://reading-tracker-project.onrender.com/api/v1
```

4. Build bằng lệnh của dự án:

```bash
npm install
npm run build
```

5. Deploy frontend. Khi thay đổi `VITE_API_BASE_URL`, cần redeploy để giá trị được đưa vào bản build mới.
6. Mở website production và kiểm tra API qua DevTools → Network.

Không đặt password database hoặc secret trong biến `VITE_*`: các biến này được đóng gói vào code frontend và có thể được người dùng xem.

## 12.6. Deployment Flow

```text
Push code lên Git
       │
       ├── Render backend
       │      ├── Install dependencies
       │      ├── Build / type-check TypeScript
       │      ├── Chạy TypeORM migration trên Aiven
       │      └── npm start
       │
       └── Vercel frontend
              ├── Cấu hình VITE_API_BASE_URL
              ├── npm run build
              └── Deploy static frontend

Aiven MySQL
  └── Lưu schema và dữ liệu của ứng dụng
```

Thứ tự triển khai an toàn: kiểm tra Aiven và migration → deploy backend → seed dữ liệu mẫu nếu cần → deploy/kiểm tra frontend.


---

# 12. 🔐 Environment Variables

Không commit file:

```text
.env
```

Các thông tin nhạy cảm như:

* Database host.
* Database username.
* Database password.
* Database URL.
* API credentials nếu có.

phải được cấu hình trực tiếp trên môi trường deploy.

---

# 13. 🧪 Sample Data

Có thể nạp dữ liệu mẫu bằng `npm run seed` sau khi migration thành công. Seed là bước riêng và không tự chạy mỗi lần deploy; cần xác nhận seed đã kết nối đúng Aiven và có cơ chế tránh dữ liệu trùng.

Các trạng thái mẫu:

```text
WANT_TO_READ
READING
COMPLETED
```

Một số trường hợp nên có trong dữ liệu test:

* Sách chưa đọc.
* Sách đang đọc.
* Sách đã đọc.
* Tiến độ đọc.
* Rating.
* Note.

---

# 14. ⚠️ Assumptions

Một số giả định của project:

1. Ứng dụng phục vụ một người dùng nên hiện tại chưa triển khai authentication/authorization.
2. Open Library là nguồn dữ liệu sách chính.
3. Dữ liệu tủ sách được lưu trong MySQL.
4. Frontend không gọi trực tiếp Open Library.
5. Backend chịu trách nhiệm giao tiếp với Open Library.
6. `workId` được sử dụng để xác định tác phẩm từ Open Library.
7. TypeORM được sử dụng để quản lý database thay cho việc viết SQL trực tiếp trong application code.
8. Tiến độ đọc dựa trên số trang hiện tại và tổng số trang của sách.

---

# 15. ⚠️ Limitations

Một số hạn chế hiện tại:

* Chưa có hệ thống tài khoản người dùng.
* Chưa hỗ trợ nhiều người dùng.
* Dữ liệu phụ thuộc vào Open Library.
* Một số sách có thể không có ảnh bìa.
* Một số sách có thể không có số trang.
* Một số sách có thể không có mô tả.
* Chất lượng kết quả tìm kiếm phụ thuộc vào Open Library.
* Chưa có authentication/authorization.
* Chưa có hệ thống caching cho Open Library API.

---

# 16. 🔮 Future Improvements

Nếu có thêm thời gian, có thể phát triển:

* Authentication và authorization.
* Quản lý nhiều người dùng.
* Đồng bộ tủ sách theo từng tài khoản.
* Tìm kiếm nâng cao.
* Filter theo thể loại.
* Filter theo tác giả.
* Sorting theo tên, năm xuất bản hoặc tiến độ.
* Thống kê lịch sử đọc.
* Mục tiêu đọc sách theo tháng/năm.
* Caching Open Library API.
* Unit Test.
* Integration Test.
* CI/CD.
* Swagger API documentation.
* Tối ưu performance.
* Responsive/mobile UX.

---

# 17. 📁 Project Structure

```text
reading-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── router/
│   │   ├── services/
│   │   ├── types/
│   │   └── views/
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── entities/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── seeds/
│   │   ├── services/
│   │   └── usecases/
│   ├── .env.example
│   └── package.json
│
└── .env.example
└── .gitignore  
└── docker-compose.yml
└── README.md

```

# 18. 📄 Notes

README này được xây dựng theo yêu cầu của bài test Mini Reading Tracker.

Các nội dung chính gồm:

* Giới thiệu project.
* Công nghệ sử dụng.
* Hướng dẫn chạy local.
* Kiến trúc hệ thống.
* Database và ERD.
* Danh sách API.
* Hướng dẫn deployment.
* Environment variables.
* Sample data.
* Assumptions.
* Limitations.
* Future improvements.


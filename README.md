# 📚 Mini Reading Tracker

Ứng dụng web nhỏ giúp người dùng **tìm kiếm sách, lưu sách vào tủ sách cá nhân và theo dõi tiến độ đọc**.

Project được xây dựng theo yêu cầu của bài test Fullstack Mini Reading Tracker, sử dụng **Open Library API** làm nguồn dữ liệu sách và **MySQL** để lưu dữ liệu tủ sách.

> **Trạng thái:** Đang hoàn thiện  
> **Demo:** [Frontend URL](https://...) · [Backend URL](https://...)  
> **Repository:** [GitHub/GitLab URL](https://...)

---

## 1. 📖 Giới thiệu

Mini Reading Tracker cung cấp các chức năng chính:

- Tìm kiếm sách theo tên sách hoặc tác giả.
- Xem thông tin chi tiết của một cuốn sách.
- Thêm sách vào tủ sách cá nhân.
- Chọn trạng thái đọc:
  - Muốn đọc
  - Đang đọc
  - Đã đọc
- Theo dõi tiến độ đọc theo số trang.
- Tự động tính phần trăm tiến độ.
- Đánh giá sách từ 1–5 sao.
- Ghi chú ngắn cho từng cuốn sách.
- Cập nhật trạng thái và số trang đang đọc.
- Xóa sách khỏi tủ sách.
- Thống kê tổng số sách, số sách đang đọc và số sách đã đọc.

Ứng dụng không yêu cầu đăng nhập và được thiết kế cho một người dùng.

---

## 2. ✨ Chức năng

### 2.1. Tìm kiếm sách

- Tìm kiếm theo tên sách hoặc tác giả.
- Hiển thị danh sách sách theo dạng grid/list.
- Hiển thị:
  - Ảnh bìa
  - Tên sách
  - Tác giả
  - Năm xuất bản
- Hỗ trợ phân trang.
- Hiển thị trạng thái:
  - Loading
  - Không có kết quả
  - Lỗi
- Sách đã có trong tủ sẽ hiển thị trạng thái **"Đã thêm"**.

### 2.2. Chi tiết sách

Hiển thị:

- Ảnh bìa
- Tên sách
- Tác giả
- Mô tả
- Số trang
- Chủ đề
- Năm xuất bản

Người dùng có thể thêm sách vào tủ và lựa chọn trạng thái ban đầu:

- Muốn đọc
- Đang đọc
- Đã đọc

### 2.3. Tủ sách của tôi

Tủ sách được chia thành 3 tab:

- Muốn đọc
- Đang đọc
- Đã đọc

Mỗi sách có thể:

- Xem tiến độ đọc.
- Cập nhật số trang đang đọc.
- Thay đổi trạng thái.
- Chấm điểm từ 1–5 sao.
- Ghi chú.
- Xóa khỏi tủ sách.

Phía trên hiển thị thống kê nhanh:

- Tổng số sách.
- Số sách đang đọc.
- Số sách đã đọc xong.

---

## 3. 🛠️ Công nghệ sử dụng

### Frontend

- Vue.js
- [Các thư viện frontend sử dụng trong project]

### Backend

- Node.js
- Express.js
- [Các thư viện backend sử dụng trong project]

### Database

- MySQL

### External API

- Open Library API

Các API chính:

```text
GET https://openlibrary.org/search.json?q={keyword}&page={n}&limit=20
GET https://openlibrary.org/works/{workId}.json
GET https://covers.openlibrary.org/b/id/{coverId}-M.jpg
```

> Frontend không gọi trực tiếp Open Library. Các request tới Open Library được thực hiện thông qua backend.

### Deployment

- Frontend: [Vercel / Netlify / VPS / ...]
- Backend: [Render / Railway / VPS / ...]
- Database: [Railway / Aiven / VPS / ...]
- HTTPS: [Đã cấu hình / Chưa cấu hình]

---

## 4. 🖼️ Screenshots

### 4.1. Trang tìm kiếm sách

![Search Books](./docs/screenshots/search-books.png)

### 4.2. Chi tiết sách

![Book Detail](./docs/screenshots/book-detail.png)

### 4.3. Tủ sách

![My Library](./docs/screenshots/my-library.png)

> Thay các đường dẫn ảnh trên bằng screenshots thực tế của project.

---

## 5. 🏗️ Kiến trúc hệ thống

Project được tổ chức theo mô hình:

```text
┌──────────────────────┐
│      Vue.js          │
│      Frontend        │
└──────────┬───────────┘
           │ HTTP/REST API
           ▼
┌──────────────────────┐
│   Node.js/Express    │
│       Backend        │
└───────┬────────┬─────┘
        │        │
        │        │ HTTP Request
        │        ▼
        │   ┌─────────────────┐
        │   │  Open Library   │
        │   │      API        │
        │   └─────────────────┘
        │
        ▼
┌──────────────────────┐
│        MySQL         │
│  Reading Tracker DB  │
└──────────────────────┘
```

### Luồng xử lý chính

1. Người dùng nhập từ khóa tìm kiếm trên Frontend.
2. Frontend gửi request tới Backend.
3. Backend gọi Open Library API.
4. Backend xử lý/chuẩn hóa dữ liệu cần thiết.
5. Backend trả dữ liệu về Frontend.
6. Khi người dùng thêm sách vào tủ, Backend lưu dữ liệu vào MySQL.
7. Các thao tác cập nhật tiến độ, trạng thái, đánh giá và ghi chú đều được xử lý thông qua Backend.

---

## 6. 🗄️ Database

### Sơ đồ database

> Cập nhật ảnh ERD thực tế tại đây.

![Database ERD](./docs/database/erd.png)

### Bảng chính

#### `books`

Lưu thông tin cơ bản của sách.

| Field | Type | Description |
|---|---|---|
| `id` | BIGINT | ID nội bộ |
| `work_id` | VARCHAR | ID tác phẩm từ Open Library |
| `title` | VARCHAR | Tên sách |
| `authors` | TEXT | Tác giả |
| `cover_id` | BIGINT | ID ảnh bìa |
| `description` | TEXT | Mô tả |
| `page_count` | INT | Tổng số trang |
| `first_publish_year` | INT | Năm xuất bản |

#### `shelf_books`

Lưu thông tin sách trong tủ sách và trạng thái đọc.

| Field | Type | Description |
|---|---|---|
| `id` | BIGINT | ID |
| `book_id` | BIGINT | ID sách |
| `status` | VARCHAR | Trạng thái đọc |
| `current_page` | INT | Số trang đã đọc |
| `rating` | INT | Đánh giá 1–5 |
| `note` | TEXT | Ghi chú |
| `started_at` | DATETIME | Ngày bắt đầu đọc |
| `finished_at` | DATETIME | Ngày đọc xong |
| `created_at` | DATETIME | Ngày tạo |
| `updated_at` | DATETIME | Ngày cập nhật |

> Điều chỉnh tên bảng và field theo database thực tế của project nếu có khác biệt.

---

## 7. 🔌 API

### 7.1. Book Search

```http
GET /api/books/search?q={keyword}&page={page}&limit=20
```

Dùng để tìm kiếm sách thông qua Open Library.

### 7.2. Book Detail

```http
GET /api/books/:workId
```

Lấy thông tin chi tiết của một tác phẩm.

### 7.3. Get My Library

```http
GET /api/library
```

Lấy danh sách sách trong tủ sách.

### 7.4. Add Book To Library

```http
POST /api/library
```

Thêm sách vào tủ.

Ví dụ:

```json
{
  "workId": "OL...",
  "status": "WANT_TO_READ"
}
```

### 7.5. Update Reading Progress

```http
PATCH /api/library/:id/progress
```

Ví dụ:

```json
{
  "currentPage": 120
}
```

### 7.6. Update Reading Status

```http
PATCH /api/library/:id/status
```

Ví dụ:

```json
{
  "status": "READING"
}
```

### 7.7. Update Rating / Note

```http
PATCH /api/library/:id/review
```

Ví dụ:

```json
{
  "rating": 5,
  "note": "Một cuốn sách đáng đọc."
}
```

### 7.8. Remove From Library

```http
DELETE /api/library/:id
```

Xóa sách khỏi tủ sách.

> Nếu project có Swagger hoặc Postman Collection, bổ sung link tại đây:
>
> **Swagger:** [Swagger URL](https://...)
>
> **Postman Collection:** [Postman URL](https://...)

---

## 8. ⚙️ Business Rules

### Không cho phép thêm sách trùng

Nếu sách đã tồn tại trong tủ, API trả về:

```http
409 Conflict
```

### Validate số trang

```text
currentPage >= 0
currentPage <= totalPages
```

### Rating

Rating phải là số nguyên từ:

```text
1 → 5
```

Hoặc có thể để trống.

### Tự động chuyển sang Đã đọc

Khi:

```text
currentPage === totalPages
```

hệ thống tự động chuyển trạng thái sách thành:

```text
Đã đọc
```

### Ngày bắt đầu và ngày hoàn thành

- Khi sách chuyển sang **Đang đọc** lần đầu → lưu `started_at`.
- Khi sách chuyển sang **Đã đọc** → lưu `finished_at`.

### Backend Validation

Dữ liệu đầu vào được validate tại Backend.

Các lỗi trả về theo một format thống nhất, giúp Frontend có thể xử lý và hiển thị thông báo rõ ràng.

---

## 9. 🚀 Hướng dẫn chạy Local

### 9.1. Requirements

Cần cài đặt:

- Node.js
- npm
- MySQL
- Git

Kiểm tra:

```bash
node -v
npm -v
mysql --version
git --version
```

---

### 9.2. Clone project

```bash
git clone <REPOSITORY_URL>
cd <PROJECT_FOLDER>
```

---

### 9.3. Setup Backend

```bash
cd backend
npm install
```

Tạo file `.env`:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=reading_tracker

OPEN_LIBRARY_BASE_URL=https://openlibrary.org
```

> Không commit file `.env` lên repository.

Chạy Backend:

```bash
npm run dev
```

Backend mặc định:

```text
http://localhost:5000
```

---

### 9.4. Setup Database

Tạo database MySQL:

```sql
CREATE DATABASE reading_tracker;
```

Sau đó chạy migration/schema/seed theo cấu hình thực tế của project.

Nếu project sử dụng migration:

```bash
npm run migration:run
```

Nếu project có seed:

```bash
npm run seed
```

---

### 9.5. Setup Frontend

Mở terminal mới:

```bash
cd frontend
npm install
```

Tạo file `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Chạy Frontend:

```bash
npm run dev
```

Frontend mặc định:

```text
http://localhost:5173
```

---

## 10. 🌐 Deployment

Project được deploy gồm 3 thành phần:

### Frontend

**Platform:** `[Điền platform thực tế]`

**URL:** `https://...`

Các bước tổng quát:

1. Build Frontend.
2. Cấu hình biến môi trường API.
3. Kết nối repository với nền tảng deploy.
4. Deploy project.
5. Kiểm tra Frontend gọi đúng Backend URL.

### Backend

**Platform:** `[Điền platform thực tế]`

**URL:** `https://...`

Các bước:

1. Cấu hình Node.js environment.
2. Cấu hình các biến môi trường.
3. Cấu hình kết nối MySQL.
4. Cấu hình Open Library Base URL.
5. Deploy Backend.
6. Kiểm tra API health/status.

### Database

**Platform:** `[Điền platform thực tế]`

Database credentials được lưu trong environment variables và không commit vào repository.

### Environment Variables

Không commit:

```text
.env
.env.local
.env.production
```

Các thông tin nhạy cảm như:

- Database username
- Database password
- Database URL
- API credentials nếu có

được cấu hình trực tiếp trên môi trường deploy.

---

## 11. 🧪 Sample Data

Project có dữ liệu mẫu để người chấm có thể kiểm tra ngay.

Các trạng thái mẫu:

- Muốn đọc
- Đang đọc
- Đã đọc

Một số dữ liệu mẫu có thể dùng để kiểm tra:

- Cập nhật số trang.
- Tự động chuyển trạng thái khi đọc hết.
- Rating.
- Note.
- Xóa sách.
- Lọc theo trạng thái.

> Bổ sung thông tin tài khoản/seed data thực tế nếu project có sử dụng.

---

## 12. 📌 Assumptions

Một số giả định của project:

1. Ứng dụng chỉ phục vụ một người dùng nên không triển khai authentication/authorization.
2. Open Library là nguồn dữ liệu sách chính.
3. Dữ liệu tủ sách được lưu trong MySQL.
4. Frontend chỉ giao tiếp với Backend, không gọi trực tiếp Open Library.
5. `workId` của Open Library được sử dụng để xác định tác phẩm.
6. Tiến độ đọc được tính dựa trên số trang hiện tại và tổng số trang.
7. Khi người dùng đọc đến trang cuối cùng, sách được tự động chuyển sang trạng thái Đã đọc.

---

## 13. ⚠️ Limitations

Một số hạn chế hiện tại:

- Không có hệ thống tài khoản người dùng.
- Không hỗ trợ nhiều người dùng.
- Dữ liệu phụ thuộc vào chất lượng dữ liệu từ Open Library.
- Một số sách có thể không có ảnh bìa.
- Một số sách có thể không có số trang hoặc mô tả.
- Chức năng tìm kiếm phụ thuộc vào khả năng tìm kiếm của Open Library.
- [Bổ sung các hạn chế thực tế khác nếu có.]

---

## 14. 🔮 Future Improvements

Nếu có thêm thời gian, có thể phát triển:

- Authentication và quản lý nhiều người dùng.
- Đồng bộ dữ liệu tủ sách theo từng tài khoản.
- Thêm tìm kiếm nâng cao theo thể loại, năm xuất bản, tác giả.
- Thêm sorting theo tên, năm xuất bản hoặc tiến độ đọc.
- Thêm biểu đồ thống kê lịch sử đọc.
- Thêm mục tiêu đọc sách theo tháng/năm.
- Thêm dark mode.
- Tối ưu caching dữ liệu từ Open Library.
- Thêm unit test và integration test.
- Thêm CI/CD.
- Bổ sung Swagger API documentation.
- Tối ưu performance và UX trên mobile.

---

## 15. 📁 Project Structure

> Cập nhật lại structure theo repository thực tế.

```text
reading-tracker/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── docs/
│   ├── screenshots/
│   └── database/
│
└── README.md
```

---
## 16. 📄 Notes

README này được xây dựng theo các yêu cầu của bài test Mini Reading Tracker:

- Giới thiệu và screenshots.
- Công nghệ sử dụng.
- Hướng dẫn chạy local.
- Kiến trúc và database.
- Danh sách API / Swagger / Postman.
- Thông tin deployment.
- Assumptions, limitations và future improvements.


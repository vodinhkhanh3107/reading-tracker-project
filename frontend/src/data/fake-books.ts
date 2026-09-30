import type { Book } from "../types/book";
import type { ShelfBook } from "../types/shelf-book";

export const fakeBooks: Book[] = [
  {
    workId: "javascript-definitive-guide",
    title: "JavaScript: The Definitive Guide",
    authors: ["David Flanagan"],
    coverUrl:
      "https://covers.openlibrary.org/b/isbn/9781491952023-L.jpg",
    description:
      "A comprehensive guide to JavaScript programming, covering the language, APIs, and modern development techniques.",
    subjects: [
      "JavaScript",
      "Programming",
      "Web Development",
    ],
    firstPublishDate: "1996",
    numberOfPages: 706,
  },

  {
    workId: "clean-code",
    title: "Clean Code",
    authors: ["Robert C. Martin"],
    coverUrl:
      "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
    description:
      "A handbook of agile software craftsmanship that explains principles and practices for writing clean and maintainable code.",
    subjects: [
      "Programming",
      "Software Engineering",
      "Clean Code",
    ],
    firstPublishDate: "2008",
    numberOfPages: 464,
  },

  {
    workId: "design-patterns",
    title: "Design Patterns",
    authors: [
      "Erich Gamma",
      "Richard Helm",
      "Ralph Johnson",
      "John Vlissides",
    ],
    coverUrl:
      "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg",
    description:
      "A classic reference for reusable object-oriented software design patterns.",
    subjects: [
      "Design Patterns",
      "Object Oriented Programming",
    ],
    firstPublishDate: "1994",
    numberOfPages: 395,
  },

  {
    workId: "refactoring",
    title: "Refactoring",
    authors: ["Martin Fowler"],
    coverUrl:
      "https://covers.openlibrary.org/b/isbn/9780134757599-L.jpg",
    description:
      "A guide to improving the design of existing code while preserving its behavior.",
    subjects: [
      "Refactoring",
      "Programming",
      "Software Engineering",
    ],
    firstPublishDate: "1999",
    numberOfPages: 448,
  },

  {
    workId: "effective-java",
    title: "Effective Java",
    authors: ["Joshua Bloch"],
    coverUrl:
      "https://covers.openlibrary.org/b/isbn/9780134685991-L.jpg",
    description:
      "Practical advice and best practices for writing robust Java programs.",
    subjects: [
      "Java",
      "Programming",
      "Software Engineering",
    ],
    firstPublishDate: "2001",
    numberOfPages: 416,
  },

  {
    workId: "domain-driven-design",
    title: "Domain-Driven Design",
    authors: ["Eric Evans"],
    coverUrl:
      "https://covers.openlibrary.org/b/isbn/9780321125217-L.jpg",
    description:
      "A detailed introduction to domain-driven design and building software around business domains.",
    subjects: [
      "DDD",
      "Software Architecture",
    ],
    firstPublishDate: "2003",
    numberOfPages: 560,
  },
];

export const fakeShelfBooks: ShelfBook[] = [
  {
    id: 1,
    book: fakeBooks[0],
    status: "READING",
    currentPage: 325,
    rating: null,
    note: "Learning modern JavaScript.",
    startedAt: "2026-09-10",
    finishedAt: null,
  },

  {
    id: 2,
    book: fakeBooks[1],
    status: "WANT_TO_READ",
    currentPage: 0,
    rating: null,
    note: null,
    startedAt: null,
    finishedAt: null,
  },

  {
    id: 3,
    book: fakeBooks[2],
    status: "COMPLETED",
    currentPage: 395,
    rating: 5,
    note: "Very useful for understanding software architecture.",
    startedAt: "2026-07-01",
    finishedAt: "2026-08-10",
  },

  {
    id: 4,
    book: fakeBooks[3],
    status: "READING",
    currentPage: 180,
    rating: null,
    note: "Need to practice refactoring examples.",
    startedAt: "2026-09-15",
    finishedAt: null,
  },
];
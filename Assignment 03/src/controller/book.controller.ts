import { Request, Response } from "express";

interface Book {
  id: number;
  title: string;
  author: string;
}

let books: Book[] = [
  { id: 1, title: "Math Book", author: "Arham" },
  { id: 2, title: "Science Book", author: "Ismail" },
];


export const getAllBooks = (req: Request, res: Response): Response => {
  return res.json(books);
};

export const getBookById = (req: Request, res: Response): Response => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json(book);
};


export const createBook = (req: Request, res: Response): Response => {
  const { title, author } = req.body as Partial<Book>;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const newBook: Book = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
  };

  books.push(newBook);
  return res.status(201).json(newBook);
};

// Update book
export const updateBook = (req: Request, res: Response): Response => {
  const id = Number(req.params.id);
  const { title, author } = req.body as Partial<Book>;

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  return res.json(book);
};


export const deleteBook = (req: Request, res: Response): Response => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);
  return res.json(deletedBook[0]);
};

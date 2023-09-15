import { User } from "./models/userModel";
import { Product } from "./models/productModel";
import bcrypt from "bcryptjs";

export const sampleProducts: Product[] = [
  {
    name: "Nike Slim shirt",
    slug: "nike-slim-shirt",
    category: "Shirts",
    image: "../images/p1.jpg",
    price: 120,
    countInStock: 0,
    brand: "Nike",
    rating: 4.8,
    numReviews: 17,
    description: "high quality shirt",
    isFeatured: true,
  },
  {
    name: "Adidas Slim shirt",
    slug: "adidas-slim-shirt",
    category: "Shirts",
    image: "../images/p2.jpg",
    price: 120,
    countInStock: 10,
    brand: "Nike",
    rating: 4.5,
    numReviews: 10,
    description: "high quality shirt",
    isFeatured: true,
  },
  {
    name: "Lacoste Slim shirt",
    slug: "lacoste-slim-shirt",
    category: "Shirts",
    image: "../images/p3.jpg",
    price: 120,
    countInStock: 10,
    brand: "Nike",
    rating: 3.5,
    numReviews: 2,
    description: "high quality shirt",
    isFeatured: true,
  },
  {
    name: "Fila Slim shirt",
    slug: "fila-slim-shirt",
    category: "Shirts",
    image: "../images/p4.jpg",
    price: 120,
    countInStock: 10,
    brand: "Nike",
    rating: 5.0,
    numReviews: 20,
    description: "high quality shirt",
    isFeatured: true,
  },
];

export const sampleUsers: User[] = [
  {
    name: "Bruno",
    email: "bruno@brechola.com.br",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "Bruna",
    email: "bruna@brechola.com.br",
    password: bcrypt.hashSync("123456"),
    isAdmin: false,
  },
];

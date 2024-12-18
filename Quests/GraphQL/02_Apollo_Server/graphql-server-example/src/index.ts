import "reflect-metadata";
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const books: Book[] = [
  {
    id: "0",
    title: "The Awakening",
    author: "Kate Chopin",
  },

  {
    id: "1",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = `#graphql

  type Book {
    id: ID
    title: String
    author: String
  }

  type Query {
    books: [Book]
    getBookById(bookId: ID): Book
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }

`;

@ObjectType()
class Book {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;
}

@Resolver(Book)
class BookResolver {
  @Query(() => [Book])
  books() {
    return books;
  }

  @Query(() => Book)
  getBookById(@Arg("id") id: string) {
    return books.find((book) => book.id === id);
  }

  @Mutation(() => Book)
  addBook(@Arg("data") { title, author }: BookInput) {
    const lastId = Number.parseInt(books.at(-1).id, 10);
    const newId = (lastId + 1).toString();
    books.push({
      title,
      author,
      id: newId,
    });
    return books.at(-1);
  }
}

@InputType()
class BookInput {
  @Field()
  title: string;

  @Field()
  author: string;
}

const resolvers = {
  Query: {
    books: () => books,
    getBookById: (_, args) => books.find((book) => book.id === args.bookId),
  },
  Mutation: {
    addBook: (_, args) => {
      const lastId = Number.parseInt(books.at(-1).id, 10);
      const newId = (lastId + 1).toString();
      books.push({
        title: args.title,
        author: args.author,
        id: newId,
      });
      return books.at(-1);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀  Server ready at: ${url}`);

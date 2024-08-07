### Comprehensive Guide: TypeScript with Node.js

Using TypeScript with Node.js enhances your server-side code by providing static types, which can help catch errors early, improve code quality, and provide better tooling support. Below are comprehensive lessons, tips, techniques, and practical code examples for using TypeScript with Node.js.

---

#### 1. **Creating and Typing Modules**

##### **1.1 Exporting and Importing Modules**

**Creating a Module:**

```typescript
// src/utils/math.ts
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
```

**Using a Module:**

```typescript
// src/app.ts
import { add, subtract } from "./utils/math";

console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
```

##### **1.2 Default Exports**

**Creating a Module with Default Export:**

```typescript
// src/utils/logger.ts
const log = (message: string): void => {
  console.log(message);
};

export default log;
```

**Using a Module with Default Export:**

```typescript
// src/app.ts
import log from "./utils/logger";

log("Hello, TypeScript with Node.js!");
```

---

#### 2. **Working with Asynchronous Code**

##### **2.1 Promises**

**Typing Promises:**

```typescript
const fetchData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 1000);
  });
};

fetchData().then((data) => {
  console.log(data); // Data fetched
});
```

##### **2.2 Async/Await**

**Using Async/Await:**

```typescript
const fetchData = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 1000);
  });
};

const run = async (): Promise<void> => {
  const data = await fetchData();
  console.log(data); // Data fetched
};

run();
```

---

#### 3. **Handling Errors**

##### **3.1 Typing Error Handling**

**Using try/catch with Async Functions:**

```typescript
const fetchData = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Fetch error"));
    }, 1000);
  });
};

const run = async (): Promise<void> => {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
  }
};

run();
```

---

#### 4. **Using Express with TypeScript**

##### **4.1 Setting Up an Express Server**

**Creating an Express Server:**

```typescript
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

##### **4.2 Typing Request and Response**

**Custom Route Handlers:**

```typescript
app.get("/user/:id", (req: Request, res: Response) => {
  const userId: string = req.params.id;
  res.send(`User ID: ${userId}`);
});
```

##### **4.3 Middleware**

**Creating and Using Middleware:**

```typescript
import { NextFunction } from "express";

const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(`${req.method} ${req.path}`);
  next();
};

app.use(loggerMiddleware);
```

---

#### 5. **Working with Databases**

##### **5.1 Using TypeORM**

**Setting Up a TypeORM Entity:**

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  createConnection,
} from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}

const connectToDatabase = async () => {
  await createConnection({
    type: "sqlite",
    database: "test.db",
    entities: [User],
    synchronize: true,
  });
  console.log("Database connected");
};

connectToDatabase();
```

##### **5.2 CRUD Operations**

**Creating and Saving an Entity:**

```typescript
import { getRepository } from "typeorm";

const createUser = async (name: string): Promise<User> => {
  const userRepository = getRepository(User);
  const user = userRepository.create({ name });
  await userRepository.save(user);
  return user;
};

const user = await createUser("John Doe");
console.log("User created:", user);
```

**Finding Entities:**

```typescript
const getUsers = async (): Promise<User[]> => {
  const userRepository = getRepository(User);
  return await userRepository.find();
};

const users = await getUsers();
console.log("Users:", users);
```

---

#### 6. **Configuration Management**

##### **6.1 Using dotenv for Environment Variables**

**Setting Up dotenv:**

```sh
npm install dotenv
```

**Loading Environment Variables:**

```typescript
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST || "localhost";
console.log("Database Host:", dbHost);
```

**Creating a `.env` File:**

```
DB_HOST=localhost
DB_PORT=5432
```

---

#### 7. **Advanced Techniques**

##### **7.1 Type Guards**

**Creating Type Guards:**

```typescript
interface Admin {
  type: "admin";
  name: string;
}

interface User {
  type: "user";
  name: string;
}

type Person = Admin | User;

const isAdmin = (person: Person): person is Admin => {
  return person.type === "admin";
};

const greet = (person: Person): string => {
  if (isAdmin(person)) {
    return `Hello, admin ${person.name}`;
  } else {
    return `Hello, user ${person.name}`;
  }
};

const person: Person = { type: "admin", name: "John" };
console.log(greet(person)); // Hello, admin John
```

##### **7.2 Type Assertions**

**Using Type Assertions:**

```typescript
const inputElement = document.getElementById("username") as HTMLInputElement;
inputElement.value = "John Doe";
```

**Type Assertions with Non-Null Assertion:**

```typescript
const handleEvent = (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log(target.value);
};

document.getElementById("input")!.addEventListener("input", handleEvent);
```

---

#### 8. **Testing with Jest**

##### **8.1 Setting Up Jest**

**Installing Jest:**

```sh
npm install --save-dev jest ts-jest @types/jest
```

**Configuring Jest:**

```json
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

**Writing Tests:**

```typescript
// src/utils/math.test.ts
import { add, subtract } from "./math";

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});

test("subtracts 2 - 1 to equal 1", () => {
  expect(subtract(2, 1)).toBe(1);
});
```

**Running Tests:**

```sh
npm test
```

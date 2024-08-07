### Comprehensive Guide: Advanced TypeScript Features

TypeScript is a powerful superset of JavaScript that brings static typing and advanced language features to your codebase. This guide covers some of the more advanced features of TypeScript, providing practical examples and best practices for using them effectively.

---

#### 1. **Conditional Types**

Conditional types enable you to create types based on other types' conditions.

**Basic Example:**

```typescript
type IsString<T> = T extends string ? "string" : "not string";

type Test1 = IsString<string>; // "string"
type Test2 = IsString<number>; // "not string"
```

**Advanced Usage:**

```typescript
type InferArrayType<T> = T extends (infer U)[] ? U : T;

type Test3 = InferArrayType<number[]>; // number
type Test4 = InferArrayType<string[]>; // string
type Test5 = InferArrayType<boolean>; // boolean
```

---

#### 2. **Mapped Types**

Mapped types allow you to create new types by transforming properties of an existing type.

**Basic Example:**

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  name: string;
  age: number;
}

const user: Readonly<User> = {
  name: "John",
  age: 30,
};

// user.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property.
```

**Advanced Usage:**

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

const partialUser: Partial<User> = {
  name: "John",
};
```

---

#### 3. **Utility Types**

TypeScript provides several utility types to facilitate common type transformations.

**Partial:**

```typescript
interface User {
  name: string;
  age: number;
}

const partialUser: Partial<User> = {
  name: "John",
};
```

**Pick:**

```typescript
type UserPreview = Pick<User, "name">;

const userPreview: UserPreview = {
  name: "John",
};
```

**Omit:**

```typescript
type UserWithoutAge = Omit<User, "age">;

const userWithoutAge: UserWithoutAge = {
  name: "John",
};
```

---

#### 4. **Index Types**

Index types allow you to dynamically access properties of an object type.

**Basic Example:**

```typescript
interface User {
  name: string;
  age: number;
}

type UserKeys = keyof User; // "name" | "age"

const userKey: UserKeys = "name";
```

**Advanced Usage:**

```typescript
type Access<T, K extends keyof T> = T[K];

const userName: Access<User, "name"> = "John";
const userAge: Access<User, "age"> = 30;
```

---

#### 5. **Template Literal Types**

Template literal types allow you to create string literal types by combining string literals.

**Basic Example:**

```typescript
type Greeting = `Hello, ${string}`;

const greet: Greeting = "Hello, John";
```

**Advanced Usage:**

```typescript
type EventName<Event extends string> = `on${Capitalize<Event>}`;

type ClickEvent = EventName<"click">; // "onClick"
type MouseEvent = EventName<"mouse">; // "onMouse"
```

---

#### 6. **Type Guards**

Type guards help you create conditional code based on types.

**Basic Example:**

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function printValue(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else {
    console.log(value);
  }
}
```

**Advanced Usage:**

```typescript
interface Cat {
  meow: () => void;
}

interface Dog {
  bark: () => void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function speak(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow();
  } else {
    animal.bark();
  }
}
```

---

#### 7. **Intersection Types**

Intersection types combine multiple types into one.

**Basic Example:**

```typescript
interface Name {
  name: string;
}

interface Age {
  age: number;
}

type Person = Name & Age;

const person: Person = {
  name: "John",
  age: 30,
};
```

**Advanced Usage:**

```typescript
type Admin = {
  isAdmin: true;
};

type User = {
  name: string;
};

type AdminUser = Admin & User;

const adminUser: AdminUser = {
  isAdmin: true,
  name: "Admin John",
};
```

---

#### 8. **Generics**

Generics provide a way to create reusable components with types.

**Basic Example:**

```typescript
function identity<T>(value: T): T {
  return value;
}

const number = identity<number>(42);
const string = identity<string>("Hello");
```

**Advanced Usage:**

```typescript
interface Box<T> {
  contents: T;
}

const numberBox: Box<number> = { contents: 42 };
const stringBox: Box<string> = { contents: "Hello" };

function getBoxContents<T>(box: Box<T>): T {
  return box.contents;
}

console.log(getBoxContents(numberBox)); // 42
console.log(getBoxContents(stringBox)); // Hello
```

---

#### 9. **Decorators**

Decorators are a way to add annotations and meta-programming syntax for class declarations and members.

**Class Decorator:**

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return `Hello, ${this.greeting}`;
  }
}
```

**Method Decorator:**

```typescript
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}

class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return `Hello, ${this.greeting}`;
  }
}
```

---

#### 10. **Type Assertions**

Type assertions allow you to override the inferred type of an expression.

**Basic Example:**

```typescript
let someValue: unknown = "Hello, TypeScript";
let strLength: number = (someValue as string).length;
```

**Advanced Usage:**

```typescript
interface Employee {
  name: string;
  code: number;
}

let employee = <Employee>{};
employee.name = "John";
employee.code = 123;
```

---

#### 11. **Advanced Mapped Types**

**Recursive Mapped Types:**

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

interface User {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

const readonlyUser: DeepReadonly<User> = {
  name: "John",
  address: {
    street: "Main St",
    city: "New York",
  },
};

// readonlyUser.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property.
// readonlyUser.address.city = "Boston"; // Error: Cannot assign to 'city' because it is a read-only property.
```

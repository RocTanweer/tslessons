### Advanced Types in TypeScript

Advanced types in TypeScript allow you to create sophisticated type systems, enabling more precise and powerful type definitions. These types build on the basics of TypeScript and provide enhanced flexibility and control over your type definitions. This comprehensive note covers the key advanced types, their syntax, and practical use cases.

#### 1. **Mapped Types**

Mapped types allow you to create new types by transforming properties of an existing type.

##### Syntax:

```typescript
type MappedType<T> = {
  [K in keyof T]: T[K];
};
```

##### Examples:

1. **ReadOnly Type**: Make all properties of a type read-only.

```typescript
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  id: number;
  name: string;
}

const user: ReadOnly<User> = { id: 1, name: "Alice" };
// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
```

2. **Partial Type**: Make all properties optional.

```typescript
type Partial<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  id: number;
  name: string;
}

const partialUser: Partial<User> = { name: "Alice" }; // Valid
```

3. **Required Type**: Make all properties required.

```typescript
type Required<T> = {
  [K in keyof T]-?: T[K];
};

interface User {
  id?: number;
  name?: string;
}

const user: Required<User> = { id: 1, name: "Alice" }; // Valid
```

4. **Record Type**: Create a type with specified keys and values.

```typescript
type Record<K extends string | number | symbol, T> = {
  [P in K]: T;
};

type UserRoles = Record<string, "admin" | "user">;

const roles: UserRoles = { alice: "admin", bob: "user" };
```

#### 2. **Conditional Types**

Conditional types allow you to create types based on a condition.

##### Syntax:

```typescript
type ConditionalType<T> = T extends U ? X : Y;
```

##### Examples:

1. **Basic Conditional Type**:

```typescript
type IsString<T> = T extends string ? "Yes" : "No";

type Result1 = IsString<string>; // "Yes"
type Result2 = IsString<number>; // "No"
```

2. **Infer Keyword**: Extract types within a conditional type.

```typescript
type ExtractType<T> = T extends (infer U)[] ? U : T;

type ElementType = ExtractType<number[]>; // number
type NonArrayType = ExtractType<number>; // number
```

3. **Distributive Conditional Types**:

```typescript
type Wrapped<T> = T extends any ? { value: T } : never;

type Result = Wrapped<string | number>; // { value: string } | { value: number }
```

#### 3. **Intersection Types**

Intersection types combine multiple types into one. The resulting type has all properties from the intersected types.

##### Syntax:

```typescript
type Intersection<T, U> = T & U;
```

##### Examples:

1. **Combining Object Types**:

```typescript
type Person = { name: string };
type Employee = { employeeId: number };

type EmployeeDetails = Person & Employee;

const employee: EmployeeDetails = { name: "Alice", employeeId: 1234 };
```

2. **Combining Multiple Types**:

```typescript
type Contact = { email: string };
type Address = { address: string };

type UserProfile = Person & Contact & Address;

const userProfile: UserProfile = {
  name: "Alice",
  email: "alice@example.com",
  address: "123 Main St",
};
```

#### 4. **Union Types**

Union types allow a value to be one of several types. They are defined using the `|` (pipe) symbol.

##### Syntax:

```typescript
type UnionType = A | B;
```

##### Examples:

1. **Basic Union Type**:

```typescript
type Status = "success" | "error" | "pending";

function handleStatus(status: Status) {
  if (status === "success") {
    console.log("Operation was successful.");
  } else if (status === "error") {
    console.log("An error occurred.");
  } else {
    console.log("Operation is pending.");
  }
}
```

2. **Union with Objects**:

```typescript
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user"; preferences: string[] };

type Person = Admin | User;

const person1: Person = { role: "admin", permissions: ["read", "write"] };
const person2: Person = { role: "user", preferences: ["dark mode"] };
```

#### 5. **Type Guards and Type Assertion**

Type guards are used to narrow down the type within conditional blocks. Type assertion allows you to override the compiler's inferred type.

##### Type Guards:

1. **Typeof Guards**:

```typescript
function isString(value: any): value is string {
  return typeof value === "string";
}

function print(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

2. **Instanceof Guards**:

```typescript
class Dog {
  bark() {}
}

class Cat {
  meow() {}
}

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

##### Type Assertion:

```typescript
let someValue: any = "Hello, TypeScript";
let strLength: number = (someValue as string).length;
```

#### 6. **Index Types and Lookup Types**

Index types and lookup types are used to access and manipulate the properties of types dynamically.

##### Index Types:

```typescript
type Person = {
  name: string;
  age: number;
};

type PersonKeys = keyof Person; // "name" | "age"
```

##### Lookup Types:

```typescript
type Person = {
  name: string;
  age: number;
};

type NameType = Person["name"]; // string
type AgeType = Person["age"]; // number
```

##### Indexed Access Types:

```typescript
type User = {
  id: number;
  name: string;
};

type UserName = User["name"]; // string
```

#### 7. **Utility Types**

TypeScript provides several built-in utility types for common type transformations.

- **Partial**: Makes all properties of a type optional.

```typescript
type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

- **Required**: Makes all properties required.

```typescript
type Required<T> = {
  [K in keyof T]-?: T[K];
};
```

- **Readonly**: Makes all properties readonly.

```typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

- **Record**: Creates an object type with specified keys and values.

```typescript
type Record<K extends string | number | symbol, T> = {
  [P in K]: T;
};
```

- **Pick**: Selects a subset of properties from a type.

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

- **Omit**: Excludes a subset of properties from a type.

```typescript
type Omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
```

#### 8. **Real-World Use Cases**

**1. Creating a Flexible Data Structure**:

```typescript
type APIResponse<T> = {
  data: T;
  status: number;
};

type User = {
  id: number;
  name: string;
};

const response: APIResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
};
```

**2. Implementing a Generic Repository**:

```typescript
interface Repository<T> {
  findById(id: number): T | undefined;
  save(entity: T): void;
}

class UserRepository implements Repository<User> {
  private users: User[] = [];

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  save(user: User): void {
    this.users.push(user);
  }
}
```

**3. Enforcing Type Constraints**:

```typescript
type KeyOf<T> = T extends { [key: string]: any } ? keyof T : never;

type PersonKeys = KeyOf<Person>; // "name" | "age"
```

**4. Building a Component Library**:

```typescript
interface ButtonProps<T> {
  label: T;
  onClick: () => void;
}

function Button<T>({ label, onClick }: ButtonProps<T>) {
  return <button onClick={onClick}>{label}</button>;
}

const button = (
  <Button label="Click me" onClick={() => console.log("Clicked")} />
);
```

### Summary

- **Mapped Types**: Create new types by transforming properties of an existing type.
- **Conditional Types**: Create types based on a condition.
- **Intersection Types**: Combine multiple types into one.
- **Union Types**: Allow a value to be one of several types.

- **Type Guards and Type Assertion**: Narrow down types in conditional blocks and override compiler types.
- **Index Types and Lookup Types**: Access and manipulate properties of types dynamically.
- **Utility Types**: Built-in types for common type transformations.
- **Real-World Use Cases**: Implement flexible data structures, generic repositories, and component libraries.

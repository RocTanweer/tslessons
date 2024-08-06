### Type Aliases in TypeScript

Type aliases in TypeScript provide a way to create a new name for an existing type. They are useful for simplifying complex types, improving code readability, and enhancing maintainability. This comprehensive note covers the basics, advanced features, and real-world use cases of type aliases in TypeScript.

#### 1. **Basic Type Alias Syntax**

A type alias is defined using the `type` keyword followed by the alias name and the type it represents.

```typescript
type StringAlias = string;

let message: StringAlias = "Hello, TypeScript";
```

#### 2. **Aliases for Primitive Types**

Type aliases can simplify the use of primitive types.

```typescript
type ID = number;
type Username = string;

let userId: ID = 12345;
let username: Username = "Alice";
```

#### 3. **Aliases for Object Types**

Type aliases are particularly useful for object types, making complex types more readable.

```typescript
type User = {
  name: string;
  age: number;
  isActive: boolean;
};

let user: User = {
  name: "Alice",
  age: 30,
  isActive: true,
};
```

#### 4. **Aliases for Function Types**

Type aliases can define complex function types, improving code clarity.

```typescript
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => `Hello, ${name}`;

console.log(greet("Alice")); // Hello, Alice
```

#### 5. **Aliases for Union Types**

Type aliases can simplify the use of union types, which are types that can be one of several types.

```typescript
type Status = "success" | "error" | "loading";

let status: Status = "success";
status = "error"; // Valid
// status = "completed"; // Error: Type '"completed"' is not assignable to type 'Status'
```

#### 6. **Aliases for Intersection Types**

Type aliases can be used for intersection types, which combine multiple types into one.

```typescript
type Person = {
  name: string;
  age: number;
};

type Employee = Person & {
  employeeId: number;
};

let employee: Employee = {
  name: "Alice",
  age: 30,
  employeeId: 12345,
};
```

#### 7. **Recursive Type Aliases**

Type aliases can be recursive, allowing you to define types that refer to themselves.

```typescript
type TreeNode = {
  value: string;
  children?: TreeNode[];
};

let tree: TreeNode = {
  value: "root",
  children: [
    { value: "child1" },
    { value: "child2", children: [{ value: "grandchild1" }] },
  ],
};
```

#### 8. **Type Aliases vs Interfaces**

Type aliases and interfaces can often be used interchangeably, but there are some differences:

- Interfaces can be extended and implemented, while type aliases cannot.
- Type aliases can represent more complex types like unions and intersections.

**Type Alias Example:**

```typescript
type Animal = {
  name: string;
  age: number;
};
```

**Interface Example:**

```typescript
interface Animal {
  name: string;
  age: number;
}
```

**Extending Interfaces:**

```typescript
interface Dog extends Animal {
  breed: string;
}
```

**Combining Types with Type Aliases:**

```typescript
type Dog = Animal & {
  breed: string;
};
```

#### 9. **Real-World Use Cases**

**1. Simplifying Complex Types**

Type aliases can simplify the definition and use of complex types, such as deeply nested objects or intricate function signatures.

```typescript
type User = {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
};

let user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  address: {
    street: "123 Main St",
    city: "Wonderland",
    country: "Fantasyland",
  },
};
```

**2. Enhancing Code Readability and Maintainability**

Type aliases make the code more readable and maintainable by providing meaningful names for complex types.

```typescript
type Coordinates = {
  latitude: number;
  longitude: number;
};

type Location = {
  name: string;
  coordinates: Coordinates;
};

let location: Location = {
  name: "Central Park",
  coordinates: {
    latitude: 40.785091,
    longitude: -73.968285,
  },
};
```

**3. Improving Type Safety in APIs**

Type aliases ensure consistent use of types across the codebase, improving type safety and reducing errors.

```typescript
type UserID = string;

function getUser(id: UserID) {
  // Fetch user by id
}

let userId: UserID = "abc123";
getUser(userId); // Valid
// getUser(123); // Error: Argument of type 'number' is not assignable to parameter of type 'UserID'
```

**4. Defining Reusable Types for Function Parameters and Return Types**

Type aliases can define reusable types for function parameters and return types, promoting code reuse and consistency.

```typescript
type ApiResponse = {
  data: any;
  status: number;
  message: string;
};

function fetchApiResponse(): ApiResponse {
  return {
    data: { id: 1, name: "Alice" },
    status: 200,
    message: "Success",
  };
}

let response: ApiResponse = fetchApiResponse();
console.log(response.status); // 200
```

### Summary

- **Basic Syntax**: `type` keyword followed by alias name and type it represents.
- **Primitive Types**: Simplify use of primitive types.
- **Object Types**: Make complex object types more readable.
- **Function Types**: Define complex function types.
- **Union Types**: Simplify the use of union types.
- **Intersection Types**: Combine multiple types into one.
- **Recursive Types**: Define types that refer to themselves.
- **Type Aliases vs Interfaces**: Differences and when to use each.
- **Real-World Use Cases**: Simplify complex types, enhance readability, improve type safety, and define reusable types.

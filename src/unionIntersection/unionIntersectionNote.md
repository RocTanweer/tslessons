### Union and Intersection Types in TypeScript

Union and Intersection types in TypeScript are advanced features that provide a way to combine multiple types. They are particularly useful for creating flexible and powerful type systems. This comprehensive note covers the definitions, syntax, use cases, and examples of both union and intersection types.

#### 1. **Union Types**

Union types allow a variable to be one of several types. They are defined using the `|` (pipe) symbol.

##### Syntax:

```typescript
type A = string | number;
```

In this example, a variable of type `A` can be either a `string` or a `number`.

##### Use Cases:

- **Handling Multiple Input Types**: When a function can accept more than one type of input.
- **API Responses**: When an API can return different types of data.

##### Examples:

1. **Function with Union Type Parameter**:

```typescript
function format(input: string | number): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return input.toFixed(2);
  }
}

console.log(format("hello")); // "HELLO"
console.log(format(123.456)); // "123.46"
```

2. **Union Type in Object Properties**:

```typescript
type User = {
  id: number;
  name: string;
  role: "admin" | "user";
};

let adminUser: User = {
  id: 1,
  name: "Alice",
  role: "admin",
};

let normalUser: User = {
  id: 2,
  name: "Bob",
  role: "user",
};
```

3. **Union Type in Function Return Types**:

```typescript
function getValue(): string | number {
  return Math.random() > 0.5 ? "Hello" : 42;
}

let value = getValue();
console.log(value); // "Hello" or 42
```

#### 2. **Intersection Types**

Intersection types combine multiple types into one. A variable of an intersection type must satisfy all the types it combines. They are defined using the `&` (ampersand) symbol.

##### Syntax:

```typescript
type A = { name: string };
type B = { age: number };
type C = A & B;
```

In this example, a variable of type `C` must have both `name` (from `A`) and `age` (from `B`) properties.

##### Use Cases:

- **Combining Multiple Interfaces**: When an object needs to have properties from multiple interfaces.
- **Mixins and Multiple Inheritance**: To create complex types by combining simpler types.

##### Examples:

1. **Combining Object Types**:

```typescript
type Person = {
  name: string;
};

type Employee = {
  employeeId: number;
};

type EmployeeDetails = Person & Employee;

let employee: EmployeeDetails = {
  name: "Alice",
  employeeId: 1234,
};
```

2. **Intersection with Interfaces**:

```typescript
interface Drawable {
  draw(): void;
}

interface Fillable {
  fill(color: string): void;
}

type Shape = Drawable & Fillable;

class Circle implements Shape {
  draw() {
    console.log("Drawing a circle");
  }
  fill(color: string) {
    console.log(`Filling the circle with ${color}`);
  }
}

let circle = new Circle();
circle.draw(); // Drawing a circle
circle.fill("red"); // Filling the circle with red
```

3. **Combining Function Types**:

```typescript
type Add = (a: number, b: number) => number;
type Subtract = (a: number, b: number) => number;

type MathOperations = Add & Subtract;

let calculate: MathOperations = (a: number, b: number) => a + b;

console.log(calculate(5, 3)); // 8
```

#### 3. **Differences Between Union and Intersection Types**

- **Union Types (`|`)**:

  - Allows a value to be one of several types.
  - Increases flexibility by accepting multiple types.

- **Intersection Types (`&`)**:
  - Combines multiple types into one.
  - Enforces the presence of properties or behaviors from all combined types.

#### 4. **Real-World Use Cases**

**1. Handling API Responses with Union Types**:

```typescript
type ApiResponse =
  | {
      success: true;
      data: string;
    }
  | {
      success: false;
      error: string;
    };

function handleResponse(response: ApiResponse) {
  if (response.success) {
    console.log(response.data);
  } else {
    console.log(response.error);
  }
}
```

**2. Combining Types for Complex Objects with Intersection Types**:

```typescript
type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: number;
  name: string;
};

type UserWithTimestamps = User & Timestamps;

let user: UserWithTimestamps = {
  id: 1,
  name: "Alice",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

**3. Creating Flexible Function Parameters with Union Types**:

```typescript
function logValue(value: string | number) {
  console.log(value);
}

logValue("Hello"); // Hello
logValue(123); // 123
```

**4. Ensuring Comprehensive Type Coverage with Intersection Types**:

```typescript
type Admin = {
  adminId: number;
};

type User = {
  userId: number;
  username: string;
};

type AdminUser = Admin & User;

let adminUser: AdminUser = {
  adminId: 1,
  userId: 2,
  username: "adminUser",
};
```

### Summary

- **Union Types (`|`)**: Allow variables to be one of several types, providing flexibility.
- **Intersection Types (`&`)**: Combine multiple types into one, enforcing the presence of properties from all combined types.
- **Use Cases**:
  - Union Types: Handling multiple input types, flexible function parameters, API responses.
  - Intersection Types: Combining multiple interfaces, creating complex objects, ensuring comprehensive type coverage.

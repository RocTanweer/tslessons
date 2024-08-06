### Namespaces in TypeScript

Namespaces in TypeScript are a way to organize code into logical groups, encapsulating variables, functions, classes, and interfaces. They help avoid naming conflicts by creating a dedicated scope for code within a namespace. This concept is similar to "modules" but is specific to TypeScript and JavaScript environments before ES6 modules were widely supported.

---

#### 1. **Basics of Namespaces**

Namespaces are a TypeScript feature that groups related code together, providing a way to manage code organization and avoid name collisions.

##### **Defining Namespaces**

Namespaces are defined using the `namespace` keyword. You can place variables, functions, classes, and interfaces inside a namespace.

```typescript
namespace Geometry {
  export const pi = 3.14;

  export function calculateCircumference(diameter: number): number {
    return diameter * pi;
  }

  export class Circle {
    constructor(public radius: number) {}

    getArea(): number {
      return pi * this.radius ** 2;
    }
  }
}
```

##### **Using Namespaces**

To access the members of a namespace, you use the namespace name as a prefix.

```typescript
const diameter = 10;
console.log(Geometry.calculateCircumference(diameter)); // 31.4

const circle = new Geometry.Circle(5);
console.log(circle.getArea()); // 78.5
```

#### 2. **Nested Namespaces**

Namespaces can be nested within each other to create more granular organization.

```typescript
namespace Geometry {
  export namespace Shapes {
    export class Square {
      constructor(public sideLength: number) {}

      getArea(): number {
        return this.sideLength ** 2;
      }
    }
  }
}

const square = new Geometry.Shapes.Square(4);
console.log(square.getArea()); // 16
```

#### 3. **Modules vs. Namespaces**

Namespaces and ES Modules are different approaches to organizing code. While namespaces were more common before ES6, modules are now the preferred approach due to better interoperability and support in modern JavaScript environments.

- **Namespaces**:

  - Used to group code in TypeScript.
  - Scoped to a single file or multiple files in a single compilation unit.
  - Not supported by JavaScript natively; primarily a TypeScript feature.

- **ES Modules**:
  - Standardized module system for modern JavaScript.
  - Support import and export of code between files.
  - Widely supported and used in JavaScript and TypeScript.

```typescript
// Using ES Modules
// geometry.ts
export const pi = 3.14;
export function calculateCircumference(diameter: number): number {
  return diameter * pi;
}

// main.ts
import { pi, calculateCircumference } from "./geometry";
console.log(calculateCircumference(10)); // 31.4
```

#### 4. **Internal vs. External Modules**

In older TypeScript versions, namespaces were used similarly to how modules are used today.

- **Internal Modules (Namespaces)**:

  - Organized code within a single project or compilation unit.
  - Use `namespace` keyword to create namespaces.

- **External Modules (ES Modules)**:
  - Utilize file-based module organization.
  - Use `import` and `export` to manage dependencies and code organization.

#### 5. **Namespaces and Triple-Slash Directives**

Triple-slash directives are used to include files and references in a TypeScript project. They can be useful with namespaces to include and reference other files.

```typescript
/// <reference path="shapes.ts" />

namespace Geometry {
  const square = new Shapes.Square(4);
  console.log(square.getArea()); // 16
}
```

- **`/// <reference path="..."/>`**: Includes a reference to another file.

#### 6. **Real-World Use Cases**

**1. Organizing Code in Large Applications**

Namespaces can help in organizing code into logical groups, especially in larger applications where modules were not yet supported.

```typescript
namespace App {
  export namespace Models {
    export interface User {
      id: number;
      name: string;
    }
  }

  export namespace Services {
    export function getUser(id: number): Models.User {
      return { id, name: "Alice" };
    }
  }
}

const user = App.Services.getUser(1);
console.log(user.name); // Alice
```

**2. Encapsulating Utility Functions**

Namespaces can be used to group utility functions together, making them easier to manage and use.

```typescript
namespace Utils {
  export function add(a: number, b: number): number {
    return a + b;
  }

  export function subtract(a: number, b: number): number {
    return a - b;
  }
}

console.log(Utils.add(5, 3)); // 8
console.log(Utils.subtract(5, 3)); // 2
```

**3. Working with Legacy Code**

Namespaces can be useful when working with legacy TypeScript codebases that use namespaces rather than modules.

```typescript
namespace Legacy {
  export function legacyFunction() {
    console.log("This is a legacy function");
  }
}

Legacy.legacyFunction(); // This is a legacy function
```

#### 7. **Limitations of Namespaces**

- **Limited to Single Compilation Unit**: Namespaces are limited to a single compilation unit (a set of files compiled together). They cannot be shared across different compilation units without using triple-slash directives.
- **Not Natively Supported in JavaScript**: Namespaces are a TypeScript feature and are not natively supported in JavaScript, making them less suitable for interoperable projects.

### Summary

- **Namespaces**:

  - Organize code into logical groups to avoid naming conflicts.
  - Scoped to a single file or multiple files in a single compilation unit.

- **Defining and Using Namespaces**:

  - Use the `namespace` keyword to define namespaces.
  - Access members with the namespace prefix.

- **Nested Namespaces**:

  - Create more granular organization within namespaces.

- **Modules vs. Namespaces**:

  - Modules (ES Modules) are preferred for modern code organization.
  - Namespaces were common before ES6 and are specific to TypeScript.

- **Triple-Slash Directives**:

  - Include files and references in TypeScript projects.

- **Real-World Use Cases**:
  - Organizing code in large applications.
  - Encapsulating utility functions.
  - Working with legacy code.

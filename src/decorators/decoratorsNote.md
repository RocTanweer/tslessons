### Decorators in TypeScript

Decorators are a powerful feature in TypeScript that allow you to modify or extend the behavior of classes, methods, properties, or parameters at design time. They are a form of metaprogramming, allowing you to add metadata or modify behavior dynamically.

---

#### 1. **Introduction to Decorators**

Decorators are special functions that are prefixed with an `@` symbol and are applied to classes, methods, properties, or parameters. They are used to augment or modify the behavior of the code they decorate.

##### **Decorator Syntax**

```typescript
function myDecorator(target: any) {
  // Modify target or add metadata
}

@myDecorator
class MyClass {
  // Class definition
}
```

#### 2. **Types of Decorators**

TypeScript supports several types of decorators:

1. **Class Decorators**: Applied to a class constructor. They are used to modify or extend class definitions.

2. **Method Decorators**: Applied to methods within a class. They can modify the behavior of methods.

3. **Property Decorators**: Applied to properties within a class. They can modify the behavior or add metadata to properties.

4. **Parameter Decorators**: Applied to method parameters. They can add metadata to parameters.

#### 3. **Class Decorators**

Class decorators are functions that are applied to the class constructor. They can be used to modify class properties, methods, or even the class itself.

##### **Basic Example**

```typescript
function logClass(target: Function) {
  console.log(`Class created: ${target.name}`);
}

@logClass
class Person {
  constructor(public name: string) {}
}
```

##### **Example with Class Modification**

```typescript
function addMethod(target: Function) {
  target.prototype.sayHello = function () {
    console.log("Hello from " + this.name);
  };
}

@addMethod
class Person {
  constructor(public name: string) {}
}

const person = new Person("Alice");
(person as any).sayHello(); // Hello from Alice
```

#### 4. **Method Decorators**

Method decorators are functions that are applied to methods. They can be used to alter or extend method behavior.

##### **Basic Example**

```typescript
function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Method ${propertyKey} called with args: ${args}`);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @logMethod
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(5, 3); // Method add called with args: 5,3
```

##### **Method Decorator for Caching Results**

```typescript
function cacheMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const cache = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

class MathUtils {
  @cacheMethod
  factorial(n: number): number {
    if (n === 0) return 1;
    return n * this.factorial(n - 1);
  }
}

const math = new MathUtils();
console.log(math.factorial(5)); // 120 (cached after first computation)
```

#### 5. **Property Decorators**

Property decorators are functions that are applied to properties of a class. They are used to add metadata or modify the behavior of properties.

##### **Basic Example**

```typescript
function logProperty(target: any, propertyKey: string) {
  let value = target[propertyKey];

  const getter = () => {
    console.log(`Getting ${propertyKey}: ${value}`);
    return value;
  };

  const setter = (newVal: any) => {
    console.log(`Setting ${propertyKey} to ${newVal}`);
    value = newVal;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Person {
  @logProperty
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person("Alice");
person.name = "Bob";
console.log(person.name);
```

#### 6. **Parameter Decorators**

Parameter decorators are functions that are applied to parameters in methods. They are used to add metadata to parameters.

##### **Basic Example**

```typescript
function logParameter(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  const existingParameters: number[] =
    Reflect.getOwnMetadata("log_parameters", target, propertyKey) || [];
  existingParameters.push(parameterIndex);
  Reflect.defineMetadata(
    "log_parameters",
    existingParameters,
    target,
    propertyKey
  );
}

class User {
  greet(@logParameter message: string) {
    console.log(`Greeting: ${message}`);
  }
}
```

##### **Parameter Decorator for Validation**

```typescript
function required(target: any, propertyKey: string, parameterIndex: number) {
  const existingRequiredParameters: number[] =
    Reflect.getOwnMetadata("required_parameters", target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    "required_parameters",
    existingRequiredParameters,
    target,
    propertyKey
  );
}

class User {
  greet(@required message: string) {
    if (message === undefined || message === null) {
      throw new Error("Message is required");
    }
    console.log(`Greeting: ${message}`);
  }
}

const user = new User();
user.greet("Hello"); // Greeting: Hello
// user.greet(); // Throws Error: Message is required
```

#### 7. **Metadata Reflection**

Metadata reflection is used to store and retrieve metadata associated with decorators. TypeScript's `reflect-metadata` library is often used to handle metadata.

##### **Setting Up**

1. **Install reflect-metadata**

```bash
npm install reflect-metadata
```

2. **Import reflect-metadata**

```typescript
import "reflect-metadata";
```

3. **Define and Retrieve Metadata**

```typescript
function metadataKey(value: string) {
  return Reflect.metadata("key", value);
}

class Example {
  @metadataKey("some value")
  property: string;
}

const example = new Example();
const metadataValue = Reflect.getMetadata("key", example, "property");
console.log(metadataValue); // some value
```

#### 8. **Real-World Use Cases**

**1. Dependency Injection**

Decorators are commonly used in dependency injection frameworks to manage dependencies.

```typescript
import "reflect-metadata";

const inject =
  (serviceIdentifier: string) =>
  (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    const existingInjectedParameters =
      Reflect.getOwnMetadata("inject", target, propertyKey) || [];
    existingInjectedParameters.push({
      index: parameterIndex,
      serviceIdentifier,
    });
    Reflect.defineMetadata(
      "inject",
      existingInjectedParameters,
      target,
      propertyKey
    );
  };

class Service {
  // Service implementation
}

class Consumer {
  constructor(@inject("Service") private service: Service) {}
}
```

**2. Validation**

Decorators can be used to add validation rules to classes.

```typescript
import "reflect-metadata";

function IsEmail(target: Object, propertyName: string) {
  Reflect.defineMetadata("validation:email", true, target, propertyName);
}

class User {
  @IsEmail
  email: string;
}

// Validation logic could be implemented to check if email is valid
```

**3. Logging**

Method decorators can be used to log method calls.

```typescript
function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Method ${propertyKey} called with args: ${args}`);
    return originalMethod.apply(this, args);
  };
}

class Service {
  @logMethod
  performAction(action: string) {
    console.log(`Performing ${action}`);
  }
}

const service = new Service();
service.performAction("some action");
```

#### 9. **Limitations and Considerations**

- **Performance Overhead**: Decorators can introduce performance overhead due to additional function calls and metadata handling.
- **Complexity**: Using decorators can increase code complexity and make it harder to understand, especially for those unfamiliar with the concept.
- **Compatibility**: Decorators are a proposal in ECMAScript and are not yet part of the standard. Ensure compatibility with your project's build tools and environment.

### Summary

- **Decorators**:

  - Special functions applied to classes, methods, properties, or parameters.
  - Used to modify or extend behavior and add metadata.

- **Types of Decorators**:

  - Class Decorators: Modify class definitions.
  - Method Decorators: Alter method behavior.
  - Property Decorators: Add metadata to properties.
  - Parameter Decorators: Add metadata to parameters.

- **Metadata Reflection**:

  - Use `reflect-metadata` to store and retrieve metadata.

- **Real-World Use Cases**:
  - Dependency Injection
  - Validation
  - Logging

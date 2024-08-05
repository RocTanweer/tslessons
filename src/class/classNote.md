### Classes in TypeScript

Classes in TypeScript are a foundational feature that allow you to create blueprints for objects with properties and methods. They are a key part of object-oriented programming and provide powerful tools for creating and managing complex data structures. This comprehensive note covers the basics of classes in TypeScript, their features, and real-world use cases.

#### 1. **Basic Class Definition**

A class in TypeScript can have properties and methods. The `class` keyword is used to define a class.

```typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const person = new Person("Alice", 30);
person.greet(); // Hello, my name is Alice
```

#### 2. **Constructor**

The constructor is a special method used to initialize objects. It is called when an instance of the class is created.

```typescript
class Car {
  make: string;
  model: string;

  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

const car = new Car("Toyota", "Corolla");
console.log(car.make); // Toyota
```

#### 3. **Access Modifiers**

TypeScript provides three access modifiers to control the visibility of properties and methods:

- **`public`**: Accessible from anywhere. This is the default modifier.
- **`private`**: Accessible only within the class. Cannot be accessed outside the class.
- **`protected`**: Accessible within the class and its subclasses.

```typescript
class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
// account.balance; // Error: Property 'balance' is private and only accessible within class 'BankAccount'
```

#### 4. **Getters and Setters**

Getters and setters provide a way to control the access and modification of class properties.

```typescript
class Rectangle {
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (value > 0) {
      this._width = value;
    }
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (value > 0) {
      this._height = value;
    }
  }

  getArea(): number {
    return this._width * this._height;
  }
}

const rectangle = new Rectangle(10, 20);
console.log(rectangle.getArea()); // 200
rectangle.width = 15;
console.log(rectangle.getArea()); // 300
```

#### 5. **Inheritance**

Classes can extend other classes using the `extends` keyword, allowing you to create subclasses that inherit properties and methods from a parent class.

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log("Some generic animal sound");
  }
}

class Dog extends Animal {
  bark(): void {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog("Rex");
dog.makeSound(); // Some generic animal sound
dog.bark(); // Woof! Woof!
```

#### 6. **Abstract Classes**

Abstract classes cannot be instantiated directly and are meant to be extended by other classes. They can have abstract methods, which must be implemented by subclasses.

```typescript
abstract class Shape {
  abstract getArea(): number;

  describe(): void {
    console.log("I am a shape.");
  }
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(5);
console.log(circle.getArea()); // 78.54
circle.describe(); // I am a shape.
```

#### 7. **Static Methods and Properties**

Static methods and properties belong to the class itself rather than to any instance of the class. They are accessed using the class name rather than an instance.

```typescript
class MathUtils {
  static PI: number = 3.14159;

  static circleArea(radius: number): number {
    return MathUtils.PI * radius * radius;
  }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.circleArea(5)); // 78.53975
```

#### 8. **Interfaces and Classes**

Classes can implement interfaces to ensure they adhere to a particular structure. This is useful for enforcing contract compliance.

```typescript
interface Drawable {
  draw(): void;
}

class Square implements Drawable {
  sideLength: number;

  constructor(sideLength: number) {
    this.sideLength = sideLength;
  }

  draw(): void {
    console.log(`Drawing a square with side length ${this.sideLength}`);
  }
}

const square = new Square(10);
square.draw(); // Drawing a square with side length 10
```

### Real-World Use Cases

#### 1. **Creating Objects with Shared Behavior**

Classes are ideal for creating objects that share common behavior and state, such as user accounts, products, or transactions.

```typescript
class User {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  authenticate(): boolean {
    // Placeholder authentication logic
    return this.password === "securePassword";
  }
}

const user = new User("john_doe", "securePassword");
console.log(user.authenticate()); // true
```

#### 2. **Implementing Design Patterns**

Classes can be used to implement design patterns such as Singleton, Factory, or Observer patterns.

**Singleton Example:**

```typescript
class Singleton {
  private static instance: Singleton;

  private constructor() {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
console.log(singleton1 === singleton2); // true
```

#### 3. **Modeling Real-World Entities**

Classes can model real-world entities such as vehicles, employees, or books, with properties and methods reflecting their real-world counterparts.

```typescript
class Vehicle {
  make: string;
  model: string;
  year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  start(): void {
    console.log(`Starting ${this.make} ${this.model}`);
  }
}

const vehicle = new Vehicle("Ford", "Mustang", 2024);
vehicle.start(); // Starting Ford Mustang
```

#### 4. **Creating Data Models for Applications**

In applications, classes can represent data models that interact with databases or APIs.

```typescript
class Product {
  id: number;
  name: string;
  price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getDiscountedPrice(discount: number): number {
    return this.price - this.price * discount;
  }
}

const product = new Product(1, "Laptop", 1000);
console.log(product.getDiscountedPrice(0.1)); // 900
```

### Summary

- **Basic Class Definition**: Define properties and methods with the `class` keyword.
- **Constructor**: Initialize class instances.
- **Access Modifiers**: Control visibility with `public`, `private`, and `protected`.
- **Getters and Setters**: Control access and modification of properties.
- **Inheritance**: Extend classes to create subclasses.
- **Abstract Classes**: Define classes that cannot be instantiated directly.
- **Static Methods and Properties**: Belong to the class itself, not instances.
- **Interfaces and Classes**: Implement interfaces to enforce structure.

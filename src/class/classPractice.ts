class Rectangle {
  private _width: number;
  private _height: number;

  static totalRectangle = 0;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    Rectangle.totalRectangle++;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (value > 0) {
      this._width = value;
    } else {
      throw new Error("Width cannot be negative number");
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

  public getArea(): number {
    return this._width * this._height;
  }

  protected reset(): void {
    this._height = 0;
    this._width = 0;
  }
}

export function classPractice() {
  const rectangle = new Rectangle(10, 20);
  // console.log(rectangle._height); Error
  console.log(rectangle.height); // getter is called
  try {
    rectangle.width = 2; // setter is called
  } catch (e) {
    if (e instanceof Error) {
      console.log(`Error occurred: ${e.message}`);
    } else {
      console.log("An unknown error occurred");
    }
  }
  //   rectangle.reset(); // not allowed for public
  console.log(Rectangle.totalRectangle);
  console.log(rectangle.getArea()); // 300
}

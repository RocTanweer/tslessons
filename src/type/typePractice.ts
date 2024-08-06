export function typePractice() {
  // Enum
  enum TrafficLight {
    Red,
    Yellow,
    Green,
  }

  // Lesson 1: Reverse Mapping
  console.log(TrafficLight.Red); // 0
  console.log(TrafficLight[0]); // Red

  // Lesson 2: Type system
  const stopSign: TrafficLight = TrafficLight.Red;
  // const stopSign: number = TrafficLight.Red; // 0 is a number

  const numValue: string = TrafficLight[0];
  // const numValue: TrafficLight = TrafficLight[0]; // Reverse is not true

  // Never
  type Shape = "circle" | "square" | "triangle";

  function getShapeArea(shape: Shape): number {
    switch (shape) {
      case "circle":
        return Math.PI * Math.pow(1, 2); // Assume radius = 1
      case "square":
        return 1 * 1; // Assume side length = 1
      case "triangle":
        return 0.5 * 1 * 1; // Assume base = 1 and height = 1
      default:
        // Using `never` here for exhaustiveness checking
        const _exhaustiveCheck: never = shape;
        throw new Error(`Unknown shape: ${shape}`);
    }
  }

  // Utility Type - Omit
  type Omit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
  };

  type Person = {
    name: string;
    age: string;
  };

  type Student = {
    name: string;
    age: string;
    class: number;
    section: "A" | "B" | "C";
  };

  type UniqueToStudent = Omit<Student, keyof Person>;

  const uniqueStudentDetails: UniqueToStudent = {
    class: 5,
    section: "A",
  };

  console.log(uniqueStudentDetails);
}

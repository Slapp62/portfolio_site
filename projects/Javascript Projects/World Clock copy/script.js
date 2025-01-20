const arr = [67, 11,90,56,34,89,12,78,23,45]

console.log(arr);
console.log("Min Value: " + Math.min(...arr));
console.log("Max Value: " + Math.max(...arr));
const valuefound = arr.find((val) => val === 34)
console.log(valuefound);

const animals = [
    {name: "dog", age: 5},
    {name: "cat", age: 3},
    {name: "mouse", age: 1},
    {name: "fish", age: 2},
    {name: "bird", age: 4},
]

console.log(animals.find((animal) => animal.name === "cat"));

animals.sort((a, b) => b.age - a.age);
console.log(animals);

const students = [
    {name: "Jane", age: 19, grade: "55"},
    {name: "John", age: 20, grade: "90"},
    {name: "Bob", age: 21, grade: "85"},
    {name: "Alice", age: 18, grade: "60"},
    {name: "Charlie", age: 22, grade: "88"},
]

students.sort((a,b) => a.grade - b.grade);
const failed = [...students.filter((student) => student.grade <= 70)];
const passed = [...students.filter((student) => student.grade > 70)];

const newStudentsArr = [failed, passed];
console.log(newStudentsArr);

console.log(failed[failed.length - 1]);
console.log(passed[passed.length - 1]);
console.log(students[students.length-1]);

students[students.length-1].name = "Farook";
console.log(students);
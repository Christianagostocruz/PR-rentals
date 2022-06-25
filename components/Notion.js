import React from "react";

const Notion = () => {
  //Create an array.
  const data = [1, 2, 3];
  const assorted = ["christian", 31, false];
  //Access array elements.
  const chocolates = ["Mars", "Kit Kat", "Cadbury", "Toblerone"];
  console.log(chocolates[0]);
  console.log(chocolates[3]);
  //Quiz
  //zero based means that the first element on the array start on index 0.
  //1 = false;
  //2 = true;
  //3 = true;
  //4 = false;
  // array best describe is a colection of values you can asssign to a single variable.
  console.log(chocolates[1]);
  //Add elements to an array
  //javascript return exits a function and sends a value back to the spot in the program where the function was called.
  //quiz array method
  //to add and element on the last of the array i use .push().
  const childrens = ["Anwar", "Meg", "Hope", "Toni"];
  let message = `There are ${childrens.length} childrens in the class.`;
  // spread oparator(...)place the content of one array to other.
  // array method that return the first element and removed from the array i thing is .shift().
  //im not sure, but yes i think you can add more then 1 element using .push() otherwise i search on MDN LOL
  const temperatures = [100, 90, 99, 80, 70, 65, 30, 10];
  for (let i = 0; i < temperatures.length; i++) {
    console.log(temperatures[i]);
  }
  const planets = [
    "Earth",
    "Mars",
    "Saturn",
    "Mercury",
    "Jupiter",
    "Venus",
    "Uranus",
    "Neptune",
  ];
  console.log(planets.join(", "));
  console.log(planets.indexOf("Saturn"));

  const scores = [76, 79, 85, 87, 89, 90, 99];
  const totalScores = scores.length;

  const colors = ["tomato", "crimson", "darkred", "firebrick"];
  colors.find("firebrick"); // i think im not sure, i could search on MDN but im testing my memory.

  const times = [1.22, 1.75, 2.1, 2.55];
  for (let i = 0; i < times.length; i++) {
    console.log(times[i]);
  }

  const students = ["Sierra", "Kaya", "Rafael", "Charlie"];
  const message1 = `Hello, ${students.join(", ")}`;

  const temperatures1 = [76.3, 44.9, 56, 89.8, 100.2];
  console.log(temperatures1.indexOf(89.8)); // will display 3.

  //Loops in javascript
  // When should yoy use a loop ? When you want to repeat the same set of actions a certain number of times.
  //A loop repeats an action over and over again, or a given number of times, as long as a test condition evaluates to ______.true
  // the code will not run becuase The variable num begins with the value 0. The condition asks if that variable is greater than 20. 0 is not greater than 20, so the loop never runs.
  //Which loop runs a block of code before checking the condition? do...while

  //object loops
  let count = 0;
  while (count < 27) {
    console.log(count) ;
    count++;
  }
  //Do you always need to use a counter or specify an exact number of times that a loop must run? No. All you need is a condition that, at some point, evaluates to the false so that the loop can end.

  while (false) {
    console.log('Hello');
  }
  console.log('Goodbye');
// This creates an infinite loop and prints Hello over and over, until the browser crashes.

// the following is an example of an infinite loop
let counter = 0;
while ( counter >= 0 ) { 
	console.log(`The counter is: ${counter}.`)
  counter += 1;
}

// create a loop
for (let i = 4; i < 101; i++ ){
  console.log(i);
}

let message2 = "supercalifragilisticexpialidocious";
message2 = message2.length;

for ( let i = 1; i < message2; i++ ) {
	if ( i === message1 / 2 ) {
		console.log('The loop has terminated...');
	}
	console.log(`Logging the number ${i}`);
}

console.log('The program continues...');


// this loop runs 10 times 
for ( let j = 0; j <= 100; j += 10 ) {
  console.log( j );
}
// this is NOT  a infitie loop
for (let i = 0; i < 100; i += 10) {
	console.log(i);
}

//When the loop’s condition never evaluates to false. can cuases an infinite loop

// break can forse to exist a loop

for (let i = 2; i <= 24; i += 2){
  console.log(i);
}

  return <div>Notion</div>;
};
export default Notion;

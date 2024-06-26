let personsArray = [
    { id: 1, name: 'An', age: 21, gender: true },
    { id: 2, name: 'Van', age: 20, gender: true },
    { id: 3, name: 'Tuan', age: 22, gender: false }
    ];
    
console.log(
  "ID: " + personsArray.id + ", Name: " + personsArray.name + ", Age: " + personsArray.age
);
 
let newPerson = { id: 4, name: 'New Person', age: 23, gender: true };

personsArray.unshift(newPerson);

let filteredPersons = personsArray.filter(person => person.name.toLowerCase().startsWith('a'));

console.log(filteredPersons);

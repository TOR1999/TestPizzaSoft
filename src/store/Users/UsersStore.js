import dataJSON from "../data/employees.json";

console.log(dataJSON);

dataJSON.map((item) => {
  return console.log(item.name);
});

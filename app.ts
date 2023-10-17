import { GameObject } from "./GameEngine";
import { Component1, Component2 } from "./GameEngine/GameObject/Components/Component";
import { Angle } from "./Utilities";

const obj1: GameObject = new GameObject('Test', Component1, Component2);
obj1.addTags('Component', 'Some');

const obj2: GameObject = new GameObject('Test2');
obj2.addTags('Some');

const obj3: GameObject = new GameObject('Test3');


console.log(GameObject.findByTag('Some'));

console.log(new Angle(100).getAsRadian());

console.log(obj3.Transform.Rotation.getAsDegree());
console.log(obj3.Transform.Rotation.getAsRadian());
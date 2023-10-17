import { GameObject } from "./GameEngine";
import { Component1, Component2 } from "./GameEngine/GameObject/Components/Component";

const obj1: GameObject = new GameObject('Test', Component1, Component2);
obj1.addTags('Component', 'Some');

const obj2: GameObject = new GameObject('Test2');
obj2.addTags('Some');

const obj3: GameObject = new GameObject('Test3');
obj1.Name = 'Test';

console.log(GameObject.findByTag('Some'));
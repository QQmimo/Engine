import { GameObject } from "./GameEngine";
import { Component1, Component2 } from "./GameEngine/GameObject/Components/Component";

const go: GameObject = new GameObject('Test', Component1, Component2);

go.broadcastMessage('logger', 10);

GameObject.destroy('Test');

console.log(GameObject);
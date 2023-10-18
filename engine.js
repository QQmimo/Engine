/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./GameEngine/BaseObject/BaseObject.ts":
/*!*********************************************!*\
  !*** ./GameEngine/BaseObject/BaseObject.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseObject: () => (/* binding */ BaseObject)\n/* harmony export */ });\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ \"./Utilities/index.ts\");\n\nclass BaseObject {\n    constructor(name) {\n        this.addTags = (...tags) => {\n            tags.forEach(tag => {\n                if (!this.compareTag(tag)) {\n                    this.Tags.push(tag);\n                }\n            });\n        };\n        this.compareTag = (tag) => {\n            return this.Tags.find(t => t === tag) !== undefined;\n        };\n        this.destroy = () => {\n            BaseObject.destroy(this.Name);\n            _Utilities__WEBPACK_IMPORTED_MODULE_0__.RecycleBin.destroy(this);\n        };\n        this.Name = name;\n        this.Tags = [];\n        BaseObject.add(this);\n    }\n    set Name(value) {\n        if (BaseObject.find(value)) {\n            throw new Error(`ОШИБКА: ${this.constructor.name} с именем '${value}' уже существует.`);\n        }\n        this._Name = value;\n    }\n    ;\n    get Name() {\n        return this._Name;\n    }\n    static add(gameObject) {\n        if (BaseObject.find(gameObject.Name)) {\n            throw new Error(`ОШИБКА: ${this.name} с именем '${gameObject.Name}' уже существует.`);\n        }\n        this.BaseObjects.push(gameObject);\n    }\n    static find(name) {\n        return this.BaseObjects.find(gameObject => gameObject.Name === name);\n    }\n    static findByTag(tag) {\n        return this.BaseObjects.filter(gameObject => this.name === gameObject.constructor.name && gameObject.compareTag(tag));\n    }\n    static destroy(name) {\n        const index = this.BaseObjects.filter(gameObject => this.name === gameObject.constructor.name).map(gameObject => gameObject.Name).indexOf(name);\n        if (index !== -1) {\n            _Utilities__WEBPACK_IMPORTED_MODULE_0__.RecycleBin.destroy(this.BaseObjects[index]);\n            delete this.BaseObjects[index];\n            this.BaseObjects = this.BaseObjects.filter(gameObject => gameObject !== undefined);\n        }\n    }\n}\nBaseObject.BaseObjects = [];\n\n\n//# sourceURL=webpack://engine/./GameEngine/BaseObject/BaseObject.ts?");

/***/ }),

/***/ "./GameEngine/BaseObject/index.ts":
/*!****************************************!*\
  !*** ./GameEngine/BaseObject/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseObject: () => (/* reexport safe */ _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseObject */ \"./GameEngine/BaseObject/BaseObject.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/BaseObject/index.ts?");

/***/ }),

/***/ "./GameEngine/GameComponents/Image.ts":
/*!********************************************!*\
  !*** ./GameEngine/GameComponents/Image.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Image: () => (/* binding */ Image)\n/* harmony export */ });\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject */ \"./GameEngine/GameObject/index.ts\");\n\nclass Image extends _GameObject__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor() {\n        super(...arguments);\n        this.draw = () => {\n            this._drawAction = () => {\n            };\n            this.update();\n        };\n        this.setStroke = (width, color) => {\n            this._strokeWidth = width;\n            this._strokeColor = color;\n            this.update();\n        };\n        this.setBackground = (color) => {\n            this._backgroundColor = color;\n            this.update();\n        };\n        this.update = () => {\n            if (this._drawAction) {\n                this._drawAction();\n            }\n            this._rotate();\n        };\n        this._rotate = () => {\n            if (this.GameObject.Layer) {\n                const angle = this.GameObject.Transform.Rotation.getAsRadian();\n            }\n        };\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameComponents/Image.ts?");

/***/ }),

/***/ "./GameEngine/GameComponents/Shape.ts":
/*!********************************************!*\
  !*** ./GameEngine/GameComponents/Shape.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Shape: () => (/* binding */ Shape)\n/* harmony export */ });\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject */ \"./GameEngine/GameObject/index.ts\");\n\nclass Shape extends _GameObject__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor() {\n        super(...arguments);\n        this._Opacity = 1;\n        this._Dots = [];\n        this.draw = (...dots) => {\n            this._Dots = dots;\n            this._drawAction = () => {\n                if (this.GameObject.Layer && !this.GameObject.IsHidden) {\n                    this.GameObject.Layer.Context.beginPath();\n                    this.GameObject.Layer.Context.globalAlpha = this._Opacity;\n                    this._Dots.forEach((dot, index, self) => {\n                        if (index === 0) {\n                            this.GameObject.Layer.Context.moveTo(dot.X + this.GameObject.Transform.Position.X, dot.Y + this.GameObject.Transform.Position.Y);\n                        }\n                        else {\n                            this.GameObject.Layer.Context.lineTo(dot.X + this.GameObject.Transform.Position.X, dot.Y + this.GameObject.Transform.Position.Y);\n                        }\n                        if (index === dots.length - 1) {\n                            this.GameObject.Layer.Context.lineTo(self[0].X + this.GameObject.Transform.Position.X, self[0].Y + this.GameObject.Transform.Position.Y);\n                        }\n                    });\n                    if (this._StrokeColor) {\n                        this.GameObject.Layer.Context.strokeStyle = this._StrokeColor;\n                        this.GameObject.Layer.Context.lineWidth = this._StrokeWidth;\n                        this.GameObject.Layer.Context.stroke();\n                    }\n                    if (this._BackgroundColor) {\n                        this.GameObject.Layer.Context.fillStyle = this._BackgroundColor;\n                        this.GameObject.Layer.Context.fill();\n                    }\n                    this.GameObject.Layer.Context.closePath();\n                }\n            };\n            this.update();\n        };\n        this.setStroke = (width, color) => {\n            this._StrokeWidth = width;\n            this._StrokeColor = color;\n            this.update();\n        };\n        this.setBackground = (color) => {\n            this._BackgroundColor = color;\n            this.update();\n        };\n        this.setOpacity = (opacity = 1) => {\n            this._Opacity = opacity;\n            this.update();\n        };\n        this.update = () => {\n            if (this._drawAction) {\n                this._drawAction();\n            }\n            this._rotate();\n        };\n        this._rotate = () => {\n            if (this.GameObject.Layer) {\n                const angle = this.GameObject.Transform.Rotation.getAsRadian();\n                this._Dots.forEach(dot => {\n                    const CX = this.GameObject.Transform.Position.X;\n                    const CY = this.GameObject.Transform.Position.Y;\n                    const X = dot.X + CX;\n                    const Y = dot.Y + CY;\n                    const cos = Math.cos(angle);\n                    const sin = Math.sin(angle);\n                    dot.X = (cos * (X - CX)) + (sin * (Y - CY));\n                    dot.Y = (cos * (Y - CY)) - (sin * (X - CX));\n                });\n            }\n        };\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameComponents/Shape.ts?");

/***/ }),

/***/ "./GameEngine/GameComponents/index.ts":
/*!********************************************!*\
  !*** ./GameEngine/GameComponents/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Image: () => (/* reexport safe */ _Image__WEBPACK_IMPORTED_MODULE_1__.Image),\n/* harmony export */   Shape: () => (/* reexport safe */ _Shape__WEBPACK_IMPORTED_MODULE_0__.Shape)\n/* harmony export */ });\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape */ \"./GameEngine/GameComponents/Shape.ts\");\n/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Image */ \"./GameEngine/GameComponents/Image.ts\");\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameComponents/index.ts?");

/***/ }),

/***/ "./GameEngine/GameLayer/GameLayer.ts":
/*!*******************************************!*\
  !*** ./GameEngine/GameLayer/GameLayer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameLayer: () => (/* binding */ GameLayer)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseObject */ \"./GameEngine/BaseObject/index.ts\");\n\nclass GameLayer extends _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject {\n    constructor(name, screen) {\n        super(name);\n        this.addObject = (gameObject) => {\n            gameObject.setLayer(this);\n            this.GameObjects.push(gameObject);\n        };\n        this.update = () => {\n            this.GameObjects.forEach(gameObject => {\n                gameObject.broadcastRun('update');\n            });\n        };\n        this.Screen = screen;\n        this.Context = this.Screen.Canvas.getContext('2d');\n        this.GameObjects = [];\n    }\n    set Order(value) {\n        this._Order = value;\n        this.Screen.sortLayers();\n    }\n    get Order() {\n        return this._Order;\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameLayer/GameLayer.ts?");

/***/ }),

/***/ "./GameEngine/GameLayer/index.ts":
/*!***************************************!*\
  !*** ./GameEngine/GameLayer/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameLayer: () => (/* reexport safe */ _GameLayer__WEBPACK_IMPORTED_MODULE_0__.GameLayer)\n/* harmony export */ });\n/* harmony import */ var _GameLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameLayer */ \"./GameEngine/GameLayer/GameLayer.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameLayer/index.ts?");

/***/ }),

/***/ "./GameEngine/GameObject/GameObject.ts":
/*!*********************************************!*\
  !*** ./GameEngine/GameObject/GameObject.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameObject: () => (/* binding */ GameObject)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseObject */ \"./GameEngine/BaseObject/index.ts\");\n/* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Properties */ \"./GameEngine/GameObject/Properties/index.ts\");\n\n\nclass GameObject extends _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject {\n    constructor(name, ...components) {\n        super(name);\n        this.addComponent = (type) => {\n            const component = new type(this);\n            this.Components.push(component);\n            return component;\n        };\n        this.getComponent = (type) => {\n            const target = new type(undefined);\n            return this.Components.find(component => component.constructor.name === target.constructor.name);\n        };\n        this.detachComponent = (type) => {\n            const target = new type(undefined);\n            this.Components = this.Components.filter(component => component.constructor.name !== target.constructor.name);\n        };\n        this.broadcastRun = (methodName, ...args) => {\n            this.Components\n                .filter(component => component[methodName] && typeof component[methodName] === 'function')\n                .forEach(component => {\n                if (component[methodName].length !== args.length) {\n                    throw new Error(`ОШИБКА: Метод '${methodName}' в компоненте '${component.constructor.name}' количество переданных аргументов (${args.length}) не соответствует ожидаемому (${component[methodName].length})`);\n                }\n                try {\n                    component[methodName].apply(this, ...args);\n                }\n                catch (error) {\n                    throw new Error(`ОШИБКА: Компонент '${component.constructor.name}' не смог запустить метод '${methodName}' со следующими аргументами: ${args.map(a => typeof a === 'number' ? a : `'${a}'`).join(', ')}.\\n${error.message}`);\n                }\n            });\n        };\n        this.setLayer = (layer) => {\n            this.Layer = layer;\n        };\n        this.Components = [];\n        this.Tags = [];\n        this.IsHidden = false;\n        this.Transform = new _Properties__WEBPACK_IMPORTED_MODULE_1__.Transform(this);\n        components.forEach(component => {\n            this.addComponent(component);\n        });\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameObject/GameObject.ts?");

/***/ }),

/***/ "./GameEngine/GameObject/Properties/Component.ts":
/*!*******************************************************!*\
  !*** ./GameEngine/GameObject/Properties/Component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Component: () => (/* binding */ Component)\n/* harmony export */ });\nclass Component {\n    constructor(gameObject) {\n        this.update = () => { };\n        this.GameObject = gameObject;\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameObject/Properties/Component.ts?");

/***/ }),

/***/ "./GameEngine/GameObject/Properties/Position.ts":
/*!******************************************************!*\
  !*** ./GameEngine/GameObject/Properties/Position.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Position: () => (/* binding */ Position)\n/* harmony export */ });\nclass Position {\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameObject/Properties/Position.ts?");

/***/ }),

/***/ "./GameEngine/GameObject/Properties/Rotation.ts":
/*!******************************************************!*\
  !*** ./GameEngine/GameObject/Properties/Rotation.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Rotation: () => (/* binding */ Rotation)\n/* harmony export */ });\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utilities */ \"./Utilities/index.ts\");\n\nclass Rotation {\n    constructor(gameObject) {\n        this.setAsDegree = (degree) => {\n            this._Angle = new _Utilities__WEBPACK_IMPORTED_MODULE_0__.Angle(degree);\n        };\n        this.setAsRadian = (radian) => {\n            this._Angle = new _Utilities__WEBPACK_IMPORTED_MODULE_0__.Angle(_Utilities__WEBPACK_IMPORTED_MODULE_0__.Angle.radianToDegree(radian));\n        };\n        this.getAsRadian = () => {\n            return this._Angle.getAsRadian();\n        };\n        this.getAsDegree = () => {\n            return this._Angle.getAsDegree();\n        };\n        this._Angle = new _Utilities__WEBPACK_IMPORTED_MODULE_0__.Angle(0);\n        this.GameObject = gameObject;\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameObject/Properties/Rotation.ts?");

/***/ }),

/***/ "./GameEngine/GameObject/Properties/Transform.ts":
/*!*******************************************************!*\
  !*** ./GameEngine/GameObject/Properties/Transform.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Transform: () => (/* binding */ Transform)\n/* harmony export */ });\n/* harmony import */ var _Rotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rotation */ \"./GameEngine/GameObject/Properties/Rotation.ts\");\n\nclass Transform {\n    constructor(gameObject) {\n        this.GameObject = gameObject;\n        this.Rotation = new _Rotation__WEBPACK_IMPORTED_MODULE_0__.Rotation(gameObject);\n        this.Position = { X: 0, Y: 0 };\n        this.Scale = 1;\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameObject/Properties/Transform.ts?");

/***/ }),

/***/ "./GameEngine/GameObject/Properties/index.ts":
/*!***************************************************!*\
  !*** ./GameEngine/GameObject/Properties/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Component: () => (/* reexport safe */ _Component__WEBPACK_IMPORTED_MODULE_0__.Component),\n/* harmony export */   Position: () => (/* reexport safe */ _Position__WEBPACK_IMPORTED_MODULE_2__.Position),\n/* harmony export */   Rotation: () => (/* reexport safe */ _Rotation__WEBPACK_IMPORTED_MODULE_3__.Rotation),\n/* harmony export */   Transform: () => (/* reexport safe */ _Transform__WEBPACK_IMPORTED_MODULE_1__.Transform)\n/* harmony export */ });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ \"./GameEngine/GameObject/Properties/Component.ts\");\n/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transform */ \"./GameEngine/GameObject/Properties/Transform.ts\");\n/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Position */ \"./GameEngine/GameObject/Properties/Position.ts\");\n/* harmony import */ var _Rotation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rotation */ \"./GameEngine/GameObject/Properties/Rotation.ts\");\n\n\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameObject/Properties/index.ts?");

/***/ }),

/***/ "./GameEngine/GameObject/index.ts":
/*!****************************************!*\
  !*** ./GameEngine/GameObject/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Component: () => (/* reexport safe */ _Properties__WEBPACK_IMPORTED_MODULE_1__.Component),\n/* harmony export */   GameObject: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_0__.GameObject),\n/* harmony export */   Position: () => (/* reexport safe */ _Properties__WEBPACK_IMPORTED_MODULE_1__.Position),\n/* harmony export */   Rotation: () => (/* reexport safe */ _Properties__WEBPACK_IMPORTED_MODULE_1__.Rotation),\n/* harmony export */   Transform: () => (/* reexport safe */ _Properties__WEBPACK_IMPORTED_MODULE_1__.Transform)\n/* harmony export */ });\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ \"./GameEngine/GameObject/GameObject.ts\");\n/* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Properties */ \"./GameEngine/GameObject/Properties/index.ts\");\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameObject/index.ts?");

/***/ }),

/***/ "./GameEngine/GameScreen/GameScreen.ts":
/*!*********************************************!*\
  !*** ./GameEngine/GameScreen/GameScreen.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameScreen: () => (/* binding */ GameScreen)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseObject */ \"./GameEngine/BaseObject/index.ts\");\n/* harmony import */ var _GameLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameLayer */ \"./GameEngine/GameLayer/index.ts\");\n\n\nclass GameScreen extends _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject {\n    constructor(target, width, height) {\n        super('GameScreen');\n        this.addLayer = (name) => {\n            const layer = new _GameLayer__WEBPACK_IMPORTED_MODULE_1__.GameLayer(name, this);\n            layer.Order = this.Layers.length;\n            this.Layers.push(layer);\n            return layer;\n        };\n        this.sortLayers = () => {\n            this.Layers = this.Layers.sort((a, b) => {\n                if (a.Order > b.Order) {\n                    return -1;\n                }\n                else if (a.Order < b.Order) {\n                    return 1;\n                }\n                return 0;\n            });\n            this.update();\n        };\n        this.removeLayer = (name) => {\n            var _a;\n            (_a = this.Layers.find(layer => layer.Name === name)) === null || _a === void 0 ? void 0 : _a.destroy();\n        };\n        this.update = () => {\n            this.Layers.forEach(layer => {\n                layer.Context.setTransform(1, 0, 0, 1, 0, 0);\n                layer.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);\n                layer.update();\n                layer.Context.restore();\n            });\n        };\n        this.runLoop = () => {\n            this.update();\n            requestAnimationFrame(this.runLoop);\n        };\n        this.Layers = [];\n        this.Canvas = document.createElement('canvas');\n        this.Canvas.width = width;\n        this.Canvas.height = height;\n        this.Canvas.style.cssText = 'position: absolute; left: 0; top: 0;';\n        target.appendChild(this.Canvas);\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameScreen/GameScreen.ts?");

/***/ }),

/***/ "./GameEngine/GameScreen/index.ts":
/*!****************************************!*\
  !*** ./GameEngine/GameScreen/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameScreen: () => (/* reexport safe */ _GameScreen__WEBPACK_IMPORTED_MODULE_0__.GameScreen)\n/* harmony export */ });\n/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameScreen */ \"./GameEngine/GameScreen/GameScreen.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameScreen/index.ts?");

/***/ }),

/***/ "./GameEngine/index.ts":
/*!*****************************!*\
  !*** ./GameEngine/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Component: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_2__.Component),\n/* harmony export */   GameLayer: () => (/* reexport safe */ _GameLayer__WEBPACK_IMPORTED_MODULE_1__.GameLayer),\n/* harmony export */   GameObject: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_2__.GameObject),\n/* harmony export */   GameScreen: () => (/* reexport safe */ _GameScreen__WEBPACK_IMPORTED_MODULE_0__.GameScreen),\n/* harmony export */   Image: () => (/* reexport safe */ _GameComponents__WEBPACK_IMPORTED_MODULE_3__.Image),\n/* harmony export */   Position: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_2__.Position),\n/* harmony export */   Rotation: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_2__.Rotation),\n/* harmony export */   Shape: () => (/* reexport safe */ _GameComponents__WEBPACK_IMPORTED_MODULE_3__.Shape),\n/* harmony export */   Transform: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_2__.Transform)\n/* harmony export */ });\n/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameScreen */ \"./GameEngine/GameScreen/index.ts\");\n/* harmony import */ var _GameLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameLayer */ \"./GameEngine/GameLayer/index.ts\");\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameObject */ \"./GameEngine/GameObject/index.ts\");\n/* harmony import */ var _GameComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameComponents */ \"./GameEngine/GameComponents/index.ts\");\n\n\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/index.ts?");

/***/ }),

/***/ "./Utilities/Angle/Angle.ts":
/*!**********************************!*\
  !*** ./Utilities/Angle/Angle.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Angle: () => (/* binding */ Angle)\n/* harmony export */ });\nclass Angle {\n    constructor(degree) {\n        this.getAsRadian = () => {\n            return Angle.degreeToRadian(this._Degree);\n        };\n        this.getAsDegree = () => {\n            return this._Degree;\n        };\n        this._Degree = degree;\n    }\n}\nAngle.radianToDegree = (radian) => {\n    return radian * 180 / Math.PI;\n};\nAngle.degreeToRadian = (degree) => {\n    return degree * Math.PI / 180;\n};\n\n\n//# sourceURL=webpack://engine/./Utilities/Angle/Angle.ts?");

/***/ }),

/***/ "./Utilities/Color/EnumColor.ts":
/*!**************************************!*\
  !*** ./Utilities/Color/EnumColor.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnumColor: () => (/* binding */ EnumColor)\n/* harmony export */ });\nvar EnumColor;\n(function (EnumColor) {\n    EnumColor[\"White\"] = \"#fff\";\n    EnumColor[\"Black\"] = \"#000\";\n    EnumColor[\"Red\"] = \"#f00\";\n    EnumColor[\"Green\"] = \"#0f0\";\n    EnumColor[\"Blue\"] = \"#00f\";\n})(EnumColor || (EnumColor = {}));\n\n\n//# sourceURL=webpack://engine/./Utilities/Color/EnumColor.ts?");

/***/ }),

/***/ "./Utilities/Color/index.ts":
/*!**********************************!*\
  !*** ./Utilities/Color/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnumColor: () => (/* reexport safe */ _EnumColor__WEBPACK_IMPORTED_MODULE_0__.EnumColor)\n/* harmony export */ });\n/* harmony import */ var _EnumColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EnumColor */ \"./Utilities/Color/EnumColor.ts\");\n\n\n\n//# sourceURL=webpack://engine/./Utilities/Color/index.ts?");

/***/ }),

/***/ "./Utilities/Guid/Guid.ts":
/*!********************************!*\
  !*** ./Utilities/Guid/Guid.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Guid: () => (/* binding */ Guid)\n/* harmony export */ });\n/* harmony import */ var _Random_Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Random/Random */ \"./Utilities/Random/Random.ts\");\n\nclass Guid {\n}\nGuid.New = () => {\n    const mask = 'xxxx-xxxx-xxxx-xxxx';\n    const chars = '0123456789ABCDEF';\n    return mask.replace(/x/g, c => { return chars.charAt(_Random_Random__WEBPACK_IMPORTED_MODULE_0__.Random.Integer(0, chars.length)); });\n};\n\n\n//# sourceURL=webpack://engine/./Utilities/Guid/Guid.ts?");

/***/ }),

/***/ "./Utilities/Random/Random.ts":
/*!************************************!*\
  !*** ./Utilities/Random/Random.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Random: () => (/* binding */ Random)\n/* harmony export */ });\nclass Random {\n}\nRandom.Integer = (from = 0, to = 1) => {\n    return Math.floor(Random.Float(from, to));\n};\nRandom.Float = (from = 0, to = 1) => {\n    return Math.random() * (to - from) + from;\n};\n\n\n//# sourceURL=webpack://engine/./Utilities/Random/Random.ts?");

/***/ }),

/***/ "./Utilities/RecycleBin/RecycleBin.ts":
/*!********************************************!*\
  !*** ./Utilities/RecycleBin/RecycleBin.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RecycleBin: () => (/* binding */ RecycleBin)\n/* harmony export */ });\nclass RecycleBin {\n}\nRecycleBin.destroy = (obj) => {\n    Object.keys(obj).forEach(key => {\n        delete obj[key];\n    });\n};\n\n\n//# sourceURL=webpack://engine/./Utilities/RecycleBin/RecycleBin.ts?");

/***/ }),

/***/ "./Utilities/index.ts":
/*!****************************!*\
  !*** ./Utilities/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Angle: () => (/* reexport safe */ _Angle_Angle__WEBPACK_IMPORTED_MODULE_4__.Angle),\n/* harmony export */   EnumColor: () => (/* reexport safe */ _Color__WEBPACK_IMPORTED_MODULE_0__.EnumColor),\n/* harmony export */   Guid: () => (/* reexport safe */ _Guid_Guid__WEBPACK_IMPORTED_MODULE_1__.Guid),\n/* harmony export */   Random: () => (/* reexport safe */ _Random_Random__WEBPACK_IMPORTED_MODULE_2__.Random),\n/* harmony export */   RecycleBin: () => (/* reexport safe */ _RecycleBin_RecycleBin__WEBPACK_IMPORTED_MODULE_3__.RecycleBin)\n/* harmony export */ });\n/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Color */ \"./Utilities/Color/index.ts\");\n/* harmony import */ var _Guid_Guid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Guid/Guid */ \"./Utilities/Guid/Guid.ts\");\n/* harmony import */ var _Random_Random__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Random/Random */ \"./Utilities/Random/Random.ts\");\n/* harmony import */ var _RecycleBin_RecycleBin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RecycleBin/RecycleBin */ \"./Utilities/RecycleBin/RecycleBin.ts\");\n/* harmony import */ var _Angle_Angle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Angle/Angle */ \"./Utilities/Angle/Angle.ts\");\n\n\n\n\n\n\n\n//# sourceURL=webpack://engine/./Utilities/index.ts?");

/***/ }),

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameEngine */ \"./GameEngine/index.ts\");\n\nconst screen = new _GameEngine__WEBPACK_IMPORTED_MODULE_0__.GameScreen(document.body, 800, 600);\nconst world = screen.addLayer('world');\nconst cubeBlue = new _GameEngine__WEBPACK_IMPORTED_MODULE_0__.GameObject('blue', _GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape);\ncubeBlue.Transform.Position = { X: 425, Y: 300 };\nconst cubeBlueRenderer = cubeBlue.getComponent(_GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape);\ncubeBlueRenderer === null || cubeBlueRenderer === void 0 ? void 0 : cubeBlueRenderer.setBackground('blue');\ncubeBlueRenderer === null || cubeBlueRenderer === void 0 ? void 0 : cubeBlueRenderer.setStroke(1, 'black');\ncubeBlueRenderer === null || cubeBlueRenderer === void 0 ? void 0 : cubeBlueRenderer.draw({ X: -25, Y: -25 }, { X: 25, Y: -25 }, { X: 25, Y: 25 }, { X: -25, Y: 25 });\nworld.addObject(cubeBlue);\nconst cubeRed = new _GameEngine__WEBPACK_IMPORTED_MODULE_0__.GameObject('red', _GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape);\ncubeRed.Transform.Position = { X: 400, Y: 300 };\nconst cubeRedRenderer = cubeRed.getComponent(_GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape);\ncubeRedRenderer === null || cubeRedRenderer === void 0 ? void 0 : cubeRedRenderer.setBackground('red');\ncubeRedRenderer === null || cubeRedRenderer === void 0 ? void 0 : cubeRedRenderer.setStroke(1, 'black');\ncubeRedRenderer === null || cubeRedRenderer === void 0 ? void 0 : cubeRedRenderer.draw({ X: -25, Y: -25 }, { X: 25, Y: -25 }, { X: 25, Y: 25 }, { X: -25, Y: 25 });\nworld.addObject(cubeRed);\nsetInterval(() => {\n    cubeRed.Transform.Rotation.setAsDegree(-1);\n    cubeBlue.Transform.Rotation.setAsDegree(1);\n}, 100);\nsetTimeout(() => {\n    cubeRedRenderer.setOpacity(0.25);\n}, 2000);\nlet bodyW = 0;\nlet bodyH = 0;\nfunction resize() {\n    bodyW = screen.Canvas.width = innerWidth;\n    bodyH = screen.Canvas.height = innerHeight;\n}\nresize();\nwindow.addEventListener(\"resize\", resize);\nscreen.runLoop();\n\n\n//# sourceURL=webpack://engine/./app.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.ts");
/******/ 	
/******/ })()
;
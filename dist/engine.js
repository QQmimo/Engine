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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseObject: () => (/* binding */ BaseObject)\n/* harmony export */ });\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ \"./Utilities/index.ts\");\nvar _a;\n\nclass BaseObject {\n    constructor(name) {\n        this.addTags = (...tags) => {\n            tags.forEach(tag => {\n                if (!this.compareTag(tag)) {\n                    this.Tags.push(tag);\n                }\n            });\n        };\n        this.compareTag = (tag) => {\n            return this.Tags.find(t => t === tag) !== undefined;\n        };\n        this.destroy = () => {\n            _a.destroy(this.Name);\n            if (this._onDestroy) {\n                this._onDestroy();\n            }\n        };\n        this.onDestroy = (action) => {\n            this._onDestroy = action;\n        };\n        this.Name = name;\n        this.Tags = [];\n        _a.add(this);\n    }\n    set Name(value) {\n        if (_a.find(value)) {\n            throw new Error(`ОШИБКА: ${this.constructor.name} с именем '${value}' уже существует.`);\n        }\n        this._Name = value;\n    }\n    ;\n    get Name() {\n        return this._Name;\n    }\n    static add(gameObject) {\n        if (_a.find(gameObject.Name)) {\n            throw new Error(`ОШИБКА: ${this.name} с именем '${gameObject.Name}' уже существует.`);\n        }\n        gameObject.onDestroy(() => {\n            this.BaseObjects = this.BaseObjects.filter(obj => obj.Name !== undefined);\n            console.log(this.BaseObjects);\n        });\n        this.BaseObjects.push(gameObject);\n    }\n    static find(name) {\n        return this.BaseObjects.find(obj => obj.Name === name);\n    }\n    static findByTag(tag) {\n        return this.BaseObjects.filter(gameObject => this.name === gameObject.constructor.name && gameObject.compareTag(tag));\n    }\n    static findAll() {\n        return this.BaseObjects.filter(gameObject => this.name === gameObject.constructor.name);\n    }\n    static destroy(name) {\n        _Utilities__WEBPACK_IMPORTED_MODULE_0__.RecycleBin.destroy(this.BaseObjects.find(obj => obj.Name === name));\n        this.clearGarbage();\n    }\n}\n_a = BaseObject;\nBaseObject.BaseObjects = [];\nBaseObject.clearGarbage = () => {\n    _a.BaseObjects = _a.BaseObjects.filter(obj => obj.Name !== undefined);\n};\n\n\n//# sourceURL=webpack://engine/./GameEngine/BaseObject/BaseObject.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Image: () => (/* binding */ Image)\n/* harmony export */ });\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject */ \"./GameEngine/GameObject/index.ts\");\n\nclass Image extends _GameObject__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor() {\n        super(...arguments);\n        this._Opacity = 1;\n        this.draw = () => {\n            this._drawAction = () => {\n                if (this.GameObject.Layer && !this.GameObject.IsHidden) {\n                    this.GameObject.Layer.Context.beginPath();\n                    this.GameObject.Layer.Context.globalAlpha = this._Opacity;\n                    if (this._StrokeColor) {\n                        this.GameObject.Layer.Context.strokeStyle = this._StrokeColor;\n                        this.GameObject.Layer.Context.lineWidth = this._StrokeWidth;\n                        this.GameObject.Layer.Context.stroke();\n                    }\n                    if (this._BackgroundColor) {\n                        this.GameObject.Layer.Context.fillStyle = this._BackgroundColor;\n                        this.GameObject.Layer.Context.fill();\n                    }\n                    this.GameObject.Layer.Context.closePath();\n                }\n            };\n            this.update();\n        };\n        this.setStroke = (width, color) => {\n            this._StrokeWidth = width;\n            this._StrokeColor = color;\n            this.update();\n        };\n        this.setBackground = (color) => {\n            this._BackgroundColor = color;\n            this.update();\n        };\n        this.update = () => {\n            if (this._drawAction) {\n                this._drawAction();\n            }\n        };\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameComponents/Image.ts?");

/***/ }),

/***/ "./GameEngine/GameComponents/Movable.ts":
/*!**********************************************!*\
  !*** ./GameEngine/GameComponents/Movable.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Movable: () => (/* binding */ Movable)\n/* harmony export */ });\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject */ \"./GameEngine/GameObject/index.ts\");\n\nclass Movable extends _GameObject__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor() {\n        super(...arguments);\n        this._IsMoving = false;\n        this.Speed = 1;\n        this.Angle = 0;\n        this.moveTo = (target) => {\n            this.Target = target;\n        };\n        this.onMove = (action) => {\n            this._onMove = action;\n        };\n        this.onFinish = (action) => {\n            this._onFinish = action;\n        };\n        this.onStart = (action) => {\n            this._onStart = action;\n        };\n        this._move = () => {\n            if (this.Target !== undefined && this.Target.X !== this.GameObject.Transform.Position.X && this.Target.Y !== this.GameObject.Transform.Position.Y) {\n                this.Angle = Math.atan2(this.Target.Y - this.GameObject.Transform.Position.Y, this.Target.X - this.GameObject.Transform.Position.X);\n                if (this._onStart && this._IsMoving === false) {\n                    this._onStart(this, this.GameObject, this.Target);\n                }\n                this._IsMoving = true;\n                const stepX = Math.cos(this.Angle) * this.Speed;\n                const stepY = Math.sin(this.Angle) * this.Speed;\n                this.GameObject.Transform.Position.X += stepX;\n                this.GameObject.Transform.Position.Y += stepY;\n                if (Math.abs(this.GameObject.Transform.Position.X - this.Target.X) < stepX) {\n                    this.GameObject.Transform.Position.X = this.Target.X;\n                }\n                if (Math.abs(this.GameObject.Transform.Position.Y - this.Target.Y) < stepY) {\n                    this.GameObject.Transform.Position.Y = this.Target.Y;\n                }\n                if (this._onMove) {\n                    this._onMove(this, this.GameObject, this.Target);\n                }\n            }\n            else if (this.Target !== undefined && this._onFinish) {\n                this.Target = undefined;\n                this._IsMoving = false;\n                this._onFinish(this, this.GameObject);\n            }\n        };\n        this.update = () => {\n            this._move();\n        };\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameComponents/Movable.ts?");

/***/ }),

/***/ "./GameEngine/GameComponents/Shape.ts":
/*!********************************************!*\
  !*** ./GameEngine/GameComponents/Shape.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Shape: () => (/* binding */ Shape)\n/* harmony export */ });\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject */ \"./GameEngine/GameObject/index.ts\");\n\nclass Shape extends _GameObject__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor() {\n        super(...arguments);\n        this._Dots = [];\n        this.Opacity = 1;\n        this.drawByDots = (...dots) => {\n            this._Dots = dots;\n            this._drawAction = () => {\n                if (this.GameObject.Layer && !this.GameObject.IsHidden) {\n                    this.GameObject.Layer.Context.beginPath();\n                    this.GameObject.Layer.Context.globalAlpha = this.Opacity;\n                    const centerX = this.GameObject.Transform.Position.X;\n                    const centerY = this.GameObject.Transform.Position.Y;\n                    const andle = this.GameObject.Transform.Rotation.RadianAngle;\n                    this._Dots.forEach((dot, index, self) => {\n                        const dotX = dot.X + centerX;\n                        const dotY = dot.Y + centerY;\n                        const cos = Math.cos(andle);\n                        const sin = Math.sin(andle);\n                        if (index === 0) {\n                            this.GameObject.Layer.Context.moveTo((cos * (dotX - centerX)) + (sin * (dotY - centerY)) + centerX, (cos * (dotY - centerY)) - (sin * (dotX - centerX)) + centerY);\n                        }\n                        else {\n                            this.GameObject.Layer.Context.lineTo((cos * (dotX - centerX)) + (sin * (dotY - centerY)) + centerX, (cos * (dotY - centerY)) - (sin * (dotX - centerX)) + centerY);\n                        }\n                        if (index === dots.length - 1) {\n                            const dotX = self[0].X + centerX;\n                            const dotY = self[0].Y + centerY;\n                            this.GameObject.Layer.Context.lineTo((cos * (dotX - centerX)) + (sin * (dotY - centerY)) + centerX, (cos * (dotY - centerY)) - (sin * (dotX - centerX)) + centerY);\n                        }\n                    });\n                    if (this.StrokeColor) {\n                        this.GameObject.Layer.Context.strokeStyle = this.StrokeColor;\n                        this.GameObject.Layer.Context.lineWidth = this.StrokeWidth;\n                        this.GameObject.Layer.Context.stroke();\n                    }\n                    if (this.BackgroundColor) {\n                        this.GameObject.Layer.Context.fillStyle = this.BackgroundColor;\n                        this.GameObject.Layer.Context.fill();\n                    }\n                    this.GameObject.Layer.Context.closePath();\n                }\n            };\n            this.update();\n        };\n        this.drawByDotsCount = (count, distance) => {\n            const dots = [];\n            for (let i = 0; i < count; i++) {\n                const angle = (360 / count) * (Math.PI / 180) * i;\n                const CX = this.GameObject.Transform.Position.X;\n                const CY = this.GameObject.Transform.Position.Y;\n                const X = CX + distance;\n                const Y = CY;\n                const cos = Math.cos(angle);\n                const sin = Math.sin(angle);\n                dots.push({\n                    X: (cos * (X - CX)) + (sin * (Y - CY)),\n                    Y: (cos * (Y - CY)) - (sin * (X - CX))\n                });\n            }\n            this.drawByDots(...dots);\n        };\n        this.setStroke = (width, color = 'black') => {\n            this.StrokeWidth = width;\n            this.StrokeColor = color;\n            this.update();\n        };\n        this.getStrokeWidth = () => {\n            return this.StrokeWidth;\n        };\n        this.getStrokeColor = () => {\n            return this.StrokeColor;\n        };\n        this.drawCircle = (radius) => {\n            this._drawAction = () => {\n                if (this.GameObject.Layer && !this.GameObject.IsHidden) {\n                    this.GameObject.Layer.Context.beginPath();\n                    this.GameObject.Layer.Context.globalAlpha = this.Opacity;\n                    const centerX = this.GameObject.Transform.Position.X;\n                    const centerY = this.GameObject.Transform.Position.Y;\n                    this.GameObject.Layer.Context.arc(centerX, centerY, radius, this.GameObject.Transform.Rotation.RadianAngle, 2 * Math.PI);\n                    if (this.StrokeColor) {\n                        this.GameObject.Layer.Context.strokeStyle = this.StrokeColor;\n                        this.GameObject.Layer.Context.lineWidth = this.StrokeWidth;\n                        this.GameObject.Layer.Context.stroke();\n                    }\n                    if (this.BackgroundColor) {\n                        this.GameObject.Layer.Context.fillStyle = this.BackgroundColor;\n                        this.GameObject.Layer.Context.fill();\n                    }\n                    this.GameObject.Layer.Context.closePath();\n                }\n            };\n            this.update();\n        };\n        this.setBackground = (color) => {\n            this.BackgroundColor = color;\n            this.update();\n        };\n        this.getBackground = () => {\n            return this.BackgroundColor;\n        };\n        this.setOpacity = (opacity = 1) => {\n            this.Opacity = opacity;\n            this.update();\n        };\n        this.getOpacity = () => {\n            return this.Opacity;\n        };\n        this.update = () => {\n            if (this._drawAction) {\n                this._drawAction();\n            }\n        };\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameComponents/Shape.ts?");

/***/ }),

/***/ "./GameEngine/GameComponents/index.ts":
/*!********************************************!*\
  !*** ./GameEngine/GameComponents/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Image: () => (/* reexport safe */ _Image__WEBPACK_IMPORTED_MODULE_1__.Image),\n/* harmony export */   Movable: () => (/* reexport safe */ _Movable__WEBPACK_IMPORTED_MODULE_2__.Movable),\n/* harmony export */   Shape: () => (/* reexport safe */ _Shape__WEBPACK_IMPORTED_MODULE_0__.Shape)\n/* harmony export */ });\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape */ \"./GameEngine/GameComponents/Shape.ts\");\n/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Image */ \"./GameEngine/GameComponents/Image.ts\");\n/* harmony import */ var _Movable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Movable */ \"./GameEngine/GameComponents/Movable.ts\");\n\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameComponents/index.ts?");

/***/ }),

/***/ "./GameEngine/GameLayer/GameLayer.ts":
/*!*******************************************!*\
  !*** ./GameEngine/GameLayer/GameLayer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameLayer: () => (/* binding */ GameLayer)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseObject */ \"./GameEngine/BaseObject/index.ts\");\n\nclass GameLayer extends _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject {\n    constructor(name, screen) {\n        super(name);\n        this.addObject = (gameObject) => {\n            gameObject.setLayer(this);\n            this.GameObjects.push(gameObject);\n        };\n        this.clearGarbage = () => {\n            this.GameObjects = this.GameObjects.filter(gameObject => gameObject.Name !== undefined);\n        };\n        this.update = () => {\n            this.clearGarbage();\n            this.GameObjects.forEach(gameObject => {\n                if (gameObject.broadcastRun) {\n                    gameObject.broadcastRun('update');\n                }\n            });\n        };\n        this.Screen = screen;\n        this.Context = this.Screen.Canvas.getContext('2d');\n        this.GameObjects = [];\n    }\n    set Order(value) {\n        this._Order = value;\n        this.Screen.sortLayers();\n    }\n    get Order() {\n        return this._Order;\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameLayer/GameLayer.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameObject: () => (/* binding */ GameObject)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseObject */ \"./GameEngine/BaseObject/index.ts\");\n/* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Properties */ \"./GameEngine/GameObject/Properties/index.ts\");\n\n\nclass GameObject extends _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject {\n    constructor(name, ...components) {\n        super(name);\n        this.addComponent = (type) => {\n            const component = new type(this);\n            this.Components.push(component);\n            return component;\n        };\n        this.getComponent = (type) => {\n            const target = new type(undefined);\n            const found = this.Components.find(component => component.constructor.name === target.constructor.name);\n            if (!found) {\n                throw new Error(`ОШИБКА: Компонент '${target.constructor.name}' не найден.`);\n            }\n            return found;\n        };\n        this.detachComponent = (type) => {\n            const target = new type(undefined);\n            this.Components = this.Components.filter(component => component.constructor.name !== target.constructor.name);\n        };\n        this.broadcastRun = (methodName, ...args) => {\n            this.Components\n                .filter(component => component[methodName] && typeof component[methodName] === 'function')\n                .forEach(component => {\n                if (component[methodName].length !== args.length) {\n                    throw new Error(`ОШИБКА: Метод '${methodName}' в компоненте '${component.constructor.name}' количество переданных аргументов (${args.length}) не соответствует ожидаемому (${component[methodName].length})`);\n                }\n                try {\n                    component[methodName].apply(this, ...args);\n                }\n                catch (error) {\n                    console.log(GameObject.findAll());\n                    throw new Error(`ОШИБКА: Компонент '${component.constructor.name}' не смог запустить метод '${methodName}' со следующими аргументами: ${args.map(a => typeof a === 'number' ? a : `'${a}'`).join(', ')}.\\n${error.message}`);\n                }\n            });\n        };\n        this.setLayer = (layer) => {\n            this.Layer = layer;\n        };\n        this.Components = [];\n        this.Tags = [];\n        this.IsHidden = false;\n        this.Transform = new _Properties__WEBPACK_IMPORTED_MODULE_1__.Transform(this);\n        components.forEach(component => {\n            this.addComponent(component);\n        });\n    }\n    static findAllWith(component) {\n        return this.BaseObjects.filter(obj => obj instanceof GameObject && obj.getComponent(component) !== undefined);\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameObject/GameObject.ts?");

/***/ }),

/***/ "./GameEngine/GameObject/Properties/Component.ts":
/*!*******************************************************!*\
  !*** ./GameEngine/GameObject/Properties/Component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Component: () => (/* binding */ Component)\n/* harmony export */ });\nclass Component {\n    constructor(gameObject) {\n        this.GameObject = gameObject;\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameObject/Properties/Component.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Rotation: () => (/* binding */ Rotation)\n/* harmony export */ });\nclass Rotation {\n    constructor(gameObject) {\n        this.rotateByPoint = (point) => {\n            this.RadianAngle = -Math.atan2(point.Y - this.GameObject.Transform.Position.Y, point.X - this.GameObject.Transform.Position.X);\n            return this.RadianAngle;\n        };\n        this.rotateByDegree = (degree) => {\n            this.RadianAngle = degree * Math.PI / 180;\n            return this.RadianAngle;\n        };\n        this.rotateByRadian = (radian) => {\n            this.RadianAngle = radian;\n            return this.RadianAngle;\n        };\n        this.RadianAngle = 0;\n        this.GameObject = gameObject;\n    }\n    get DegreeAngle() {\n        return this.RadianAngle * 180 / Math.PI;\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameObject/Properties/Rotation.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameScreen: () => (/* binding */ GameScreen)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseObject */ \"./GameEngine/BaseObject/index.ts\");\n/* harmony import */ var _GameLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameLayer */ \"./GameEngine/GameLayer/index.ts\");\n\n\nclass GameScreen extends _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject {\n    constructor(target, width, height) {\n        super('GameScreen');\n        this._resizeCanvas = () => {\n            this.Canvas.width = innerWidth;\n            this.Canvas.height = innerHeight;\n            this.Canvas.style.cssText = 'position: absolute; top: 0; left: 0;';\n        };\n        this.addLayer = (name) => {\n            const layer = new _GameLayer__WEBPACK_IMPORTED_MODULE_1__.GameLayer(name, this);\n            layer.Order = this.Layers.length;\n            this.Layers.push(layer);\n            return layer;\n        };\n        this.sortLayers = () => {\n            this.Layers = this.Layers.sort((a, b) => {\n                if (a.Order > b.Order) {\n                    return -1;\n                }\n                else if (a.Order < b.Order) {\n                    return 1;\n                }\n                return 0;\n            });\n            this.update();\n        };\n        this.removeLayer = (name) => {\n            var _a;\n            (_a = this.Layers.find(layer => layer.Name === name)) === null || _a === void 0 ? void 0 : _a.destroy();\n        };\n        this.update = () => {\n            this.clearGarbage();\n            this.Layers.forEach(layer => {\n                layer.Context.setTransform(1, 0, 0, 1, 0, 0);\n                layer.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);\n                layer.update();\n                layer.Context.restore();\n            });\n        };\n        this.clearGarbage = () => {\n            this.Layers = this.Layers.filter(layer => layer.Name !== undefined);\n        };\n        this.runLoop = () => {\n            this.update();\n            requestAnimationFrame(this.runLoop);\n        };\n        this.Layers = [];\n        this.Canvas = document.createElement('canvas');\n        if (width === undefined || height === undefined || width === null || height === null) {\n            this._resizeCanvas();\n            window.addEventListener(\"resize\", (e) => {\n                this._resizeCanvas();\n            });\n        }\n        else {\n            this.Canvas.width = width;\n            this.Canvas.height = height;\n        }\n        target.appendChild(this.Canvas);\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/GameScreen/GameScreen.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Component: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_2__.Component),\n/* harmony export */   GameLayer: () => (/* reexport safe */ _GameLayer__WEBPACK_IMPORTED_MODULE_1__.GameLayer),\n/* harmony export */   GameObject: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_2__.GameObject),\n/* harmony export */   GameScreen: () => (/* reexport safe */ _GameScreen__WEBPACK_IMPORTED_MODULE_0__.GameScreen),\n/* harmony export */   Image: () => (/* reexport safe */ _GameComponents__WEBPACK_IMPORTED_MODULE_3__.Image),\n/* harmony export */   Movable: () => (/* reexport safe */ _GameComponents__WEBPACK_IMPORTED_MODULE_3__.Movable),\n/* harmony export */   Position: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_2__.Position),\n/* harmony export */   Rotation: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_2__.Rotation),\n/* harmony export */   Shape: () => (/* reexport safe */ _GameComponents__WEBPACK_IMPORTED_MODULE_3__.Shape),\n/* harmony export */   Transform: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_2__.Transform)\n/* harmony export */ });\n/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameScreen */ \"./GameEngine/GameScreen/index.ts\");\n/* harmony import */ var _GameLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameLayer */ \"./GameEngine/GameLayer/index.ts\");\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameObject */ \"./GameEngine/GameObject/index.ts\");\n/* harmony import */ var _GameComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameComponents */ \"./GameEngine/GameComponents/index.ts\");\n\n\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/index.ts?");

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

/***/ "./Utilities/Distance/Distance.ts":
/*!****************************************!*\
  !*** ./Utilities/Distance/Distance.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Distance: () => (/* binding */ Distance)\n/* harmony export */ });\nclass Distance {\n}\nDistance.solve = (pointA, pointB = { X: 0, Y: 0 }) => {\n    return Math.sqrt(Math.pow(pointB.X - pointA.X, 2) + Math.pow(pointB.Y - pointA.Y, 2));\n};\n\n\n//# sourceURL=webpack://engine/./Utilities/Distance/Distance.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Random: () => (/* binding */ Random)\n/* harmony export */ });\nclass Random {\n}\nRandom.Integer = (from = 0, to = 1) => {\n    return Math.floor(Random.Float(from, to));\n};\nRandom.Float = (from = 0, to = 1) => {\n    return Math.random() * (to - from) + from;\n};\nRandom.Color = () => {\n    return `rgb(${Random.Integer(0, 255)}, ${Random.Integer(0, 255)}, ${Random.Integer(0, 255)})`;\n};\n\n\n//# sourceURL=webpack://engine/./Utilities/Random/Random.ts?");

/***/ }),

/***/ "./Utilities/RecycleBin/RecycleBin.ts":
/*!********************************************!*\
  !*** ./Utilities/RecycleBin/RecycleBin.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RecycleBin: () => (/* binding */ RecycleBin)\n/* harmony export */ });\nclass RecycleBin {\n}\nRecycleBin.destroy = (obj) => {\n    Object.keys(obj).forEach(key => {\n        delete obj[key];\n    });\n};\n\n\n//# sourceURL=webpack://engine/./Utilities/RecycleBin/RecycleBin.ts?");

/***/ }),

/***/ "./Utilities/Round/Round.ts":
/*!**********************************!*\
  !*** ./Utilities/Round/Round.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Round: () => (/* binding */ Round)\n/* harmony export */ });\nclass Round {\n}\nRound.valueTo = (value, round = 0) => {\n    return Math.round((value + Number.EPSILON) * Math.pow(10, round)) / Math.pow(10, round);\n};\n\n\n//# sourceURL=webpack://engine/./Utilities/Round/Round.ts?");

/***/ }),

/***/ "./Utilities/index.ts":
/*!****************************!*\
  !*** ./Utilities/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Distance: () => (/* reexport safe */ _Distance_Distance__WEBPACK_IMPORTED_MODULE_5__.Distance),\n/* harmony export */   EnumColor: () => (/* reexport safe */ _Color__WEBPACK_IMPORTED_MODULE_0__.EnumColor),\n/* harmony export */   Guid: () => (/* reexport safe */ _Guid_Guid__WEBPACK_IMPORTED_MODULE_1__.Guid),\n/* harmony export */   Random: () => (/* reexport safe */ _Random_Random__WEBPACK_IMPORTED_MODULE_2__.Random),\n/* harmony export */   RecycleBin: () => (/* reexport safe */ _RecycleBin_RecycleBin__WEBPACK_IMPORTED_MODULE_3__.RecycleBin),\n/* harmony export */   Round: () => (/* reexport safe */ _Round_Round__WEBPACK_IMPORTED_MODULE_4__.Round)\n/* harmony export */ });\n/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Color */ \"./Utilities/Color/index.ts\");\n/* harmony import */ var _Guid_Guid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Guid/Guid */ \"./Utilities/Guid/Guid.ts\");\n/* harmony import */ var _Random_Random__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Random/Random */ \"./Utilities/Random/Random.ts\");\n/* harmony import */ var _RecycleBin_RecycleBin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RecycleBin/RecycleBin */ \"./Utilities/RecycleBin/RecycleBin.ts\");\n/* harmony import */ var _Round_Round__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Round/Round */ \"./Utilities/Round/Round.ts\");\n/* harmony import */ var _Distance_Distance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Distance/Distance */ \"./Utilities/Distance/Distance.ts\");\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://engine/./Utilities/index.ts?");

/***/ }),

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameEngine */ \"./GameEngine/index.ts\");\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utilities */ \"./Utilities/index.ts\");\n\n\nconst screen = new _GameEngine__WEBPACK_IMPORTED_MODULE_0__.GameScreen(document.body);\nconst world = screen.addLayer('world');\nfor (let i = 0; i < 5; i++) {\n    const triangle = new _GameEngine__WEBPACK_IMPORTED_MODULE_0__.GameObject(`cube_${i}`, _GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape, _GameEngine__WEBPACK_IMPORTED_MODULE_0__.Movable);\n    triangle.Transform.Position = { X: _Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Integer(innerWidth), Y: _Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Integer(innerHeight) };\n    const size = _Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Integer(10, 25);\n    const shape = triangle.getComponent(_GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape);\n    shape.setBackground(_Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Color());\n    shape.drawByDotsCount(5, 25);\n    const movable = triangle.getComponent(_GameEngine__WEBPACK_IMPORTED_MODULE_0__.Movable);\n    movable.Speed = _Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Integer(2, 10);\n    movable.onStart((component, gameObject, target) => {\n        gameObject.Transform.Rotation.rotateByPoint(target);\n        const dot = new _GameEngine__WEBPACK_IMPORTED_MODULE_0__.GameObject(`dot_${gameObject.Name}`, _GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape);\n        dot.addTags('point', gameObject.Name);\n        dot.Transform.Position = target;\n        const shapeDot = dot.getComponent(_GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape);\n        shapeDot.drawCircle(2);\n        shapeDot.setBackground(gameObject.getComponent(_GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape).getBackground());\n        shapeDot.setStroke(1);\n        world.addObject(dot);\n    });\n    movable.onFinish((component, gameObject) => {\n        var _a;\n        (_a = _GameEngine__WEBPACK_IMPORTED_MODULE_0__.GameObject.findByTag('point').find(obj => obj.compareTag(gameObject.Name))) === null || _a === void 0 ? void 0 : _a.destroy();\n        gameObject.getComponent(_GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape).drawByDotsCount(_Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Integer(3, 10), 25);\n        component.Speed = _Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Integer(2, 10);\n        component.moveTo({ X: _Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Integer(innerWidth), Y: _Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Integer(innerHeight) });\n    });\n    movable.onMove((component, gameObject, target) => {\n        world.Context.beginPath();\n        world.Context.globalAlpha = 0.35;\n        world.Context.moveTo(gameObject.Transform.Position.X, gameObject.Transform.Position.Y);\n        world.Context.lineTo(target.X, target.Y);\n        world.Context.strokeStyle = gameObject.getComponent(_GameEngine__WEBPACK_IMPORTED_MODULE_0__.Shape).getBackground();\n        world.Context.lineWidth = 1;\n        world.Context.setLineDash([5, 3]);\n        world.Context.stroke();\n        world.Context.closePath();\n    });\n    movable.moveTo({ X: _Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Integer(innerWidth), Y: _Utilities__WEBPACK_IMPORTED_MODULE_1__.Random.Integer(innerHeight) });\n    world.addObject(triangle);\n}\nscreen.runLoop();\n\n\n//# sourceURL=webpack://engine/./app.ts?");

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
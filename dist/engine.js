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

/***/ "./GameEngine/Components/Dictionary/Dictionary.ts":
/*!********************************************************!*\
  !*** ./GameEngine/Components/Dictionary/Dictionary.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Dictionary: () => (/* binding */ Dictionary)\n/* harmony export */ });\n/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Core */ \"./GameEngine/Core/index.ts\");\n\nclass Dictionary extends _Core__WEBPACK_IMPORTED_MODULE_0__.GameComponent {\n    constructor() {\n        super(...arguments);\n        this.Dictionary = new Map();\n    }\n    set(key, value) {\n        this.Dictionary.set(key, value);\n    }\n    get(key) {\n        return this.Dictionary.get(key);\n    }\n    delete(key) {\n        this.Dictionary.delete(key);\n    }\n    get allKeys() {\n        return Array.from(this.Dictionary, ([key, value]) => key);\n    }\n    clear() {\n        this.Dictionary.clear();\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Dictionary/Dictionary.ts?");

/***/ }),

/***/ "./GameEngine/Components/Dictionary/index.ts":
/*!***************************************************!*\
  !*** ./GameEngine/Components/Dictionary/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Dictionary: () => (/* reexport safe */ _Dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary)\n/* harmony export */ });\n/* harmony import */ var _Dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dictionary */ \"./GameEngine/Components/Dictionary/Dictionary.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Dictionary/index.ts?");

/***/ }),

/***/ "./GameEngine/Components/Move/Move.ts":
/*!********************************************!*\
  !*** ./GameEngine/Components/Move/Move.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Move: () => (/* binding */ Move)\n/* harmony export */ });\n/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Core */ \"./GameEngine/Core/index.ts\");\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ \"./GameEngine/Utilities/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\nclass Move extends _Core__WEBPACK_IMPORTED_MODULE_0__.GameComponent {\n    constructor() {\n        super(...arguments);\n        this._MoveAngle = new _Utilities__WEBPACK_IMPORTED_MODULE_1__.Angle(0);\n        this._StartTravell = false;\n        this.stop = () => {\n            this.Target = undefined;\n            this._StartTravell = false;\n            if (this._onStop) {\n                this._onStop(this.GameObject, this);\n            }\n        };\n        this.onStart = (action) => {\n            this._onStart = action;\n        };\n        this.onStop = (action) => {\n            this._onStop = action;\n        };\n        this.onFinish = (action) => {\n            this._onFinish = action;\n        };\n        this.onMove = (action) => {\n            this._onMove = action;\n        };\n        this.update = (deltaTime) => __awaiter(this, void 0, void 0, function* () {\n            var _a, _b;\n            if (this._onStart && this.IsMoving && !this._StartTravell) {\n                this._StartTravell = true;\n                this._onStart(this.GameObject, this);\n            }\n            if (this.GameObject.Transform.Position.X === ((_a = this.Target) === null || _a === void 0 ? void 0 : _a.X)\n                && this.GameObject.Transform.Position.Y === ((_b = this.Target) === null || _b === void 0 ? void 0 : _b.Y)) {\n                this.stop();\n                if (this._onFinish) {\n                    this._onFinish(this.GameObject, this);\n                }\n                return;\n            }\n            if (this.IsPause === false && this.IsMoving) {\n                this._MoveAngle = _Utilities__WEBPACK_IMPORTED_MODULE_1__.Angle.byPoints(this.GameObject, this.Target);\n                if (this._onMove) {\n                    this._onMove(this.GameObject, this);\n                }\n                const direction = this.Target.subtract(this.GameObject.Transform.Position);\n                if (direction.length() < 1) {\n                    this.stop();\n                    if (this._onFinish) {\n                        this._onFinish(this.GameObject, this);\n                    }\n                    return;\n                }\n                const normilize = direction.normalize();\n                this.GameObject.Transform.Position = this.GameObject.Transform.Position.add(normilize.multiply(this.Speed * deltaTime));\n            }\n        });\n    }\n    get MoveAngle() {\n        return this._MoveAngle;\n    }\n    get IsMoving() {\n        return this.Target !== undefined;\n    }\n    moveTo(gameObjectOrPoint) {\n        if (gameObjectOrPoint instanceof _Core__WEBPACK_IMPORTED_MODULE_0__.GameObject) {\n            this.Target = gameObjectOrPoint.Transform.Position;\n        }\n        else {\n            this.Target = gameObjectOrPoint;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Move/Move.ts?");

/***/ }),

/***/ "./GameEngine/Components/Move/index.ts":
/*!*********************************************!*\
  !*** ./GameEngine/Components/Move/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Move: () => (/* reexport safe */ _Move__WEBPACK_IMPORTED_MODULE_0__.Move)\n/* harmony export */ });\n/* harmony import */ var _Move__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Move */ \"./GameEngine/Components/Move/Move.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Move/index.ts?");

/***/ }),

/***/ "./GameEngine/Components/Physic/Physic.ts":
/*!************************************************!*\
  !*** ./GameEngine/Components/Physic/Physic.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Physic: () => (/* binding */ Physic)\n/* harmony export */ });\n/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Core */ \"./GameEngine/Core/index.ts\");\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ \"./GameEngine/Utilities/index.ts\");\n/* harmony import */ var _Move__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Move */ \"./GameEngine/Components/Move/index.ts\");\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Shape */ \"./GameEngine/Components/Shape/index.ts\");\n\n\n\n\nclass Physic extends _Core__WEBPACK_IMPORTED_MODULE_0__.GameComponent {\n    constructor() {\n        super(...arguments);\n        this._solveNeighbours = () => {\n            const neighbours = _Core__WEBPACK_IMPORTED_MODULE_0__.GameObject.findByComponent(Physic)\n                .filter(object => object.Id !== this.GameObject.Id)\n                .map(object => {\n                return { distance: _Utilities__WEBPACK_IMPORTED_MODULE_1__.Distance.solve(this.GameObject, object), object: object };\n            })\n                .sort((a, b) => {\n                if (a.distance > b.distance) {\n                    return 1;\n                }\n                else if (a.distance < b.distance) {\n                    return -1;\n                }\n                return 0;\n            })\n                .filter((object, index) => index < this._NeighboursCount)\n                .map(object => object.object);\n            if (this._onNeighboursChange) {\n                this._onNeighboursChange(this.GameObject, neighbours);\n            }\n            return neighbours;\n        };\n        this._NeighboursCount = 1;\n        this._Neighbours = [];\n        this.update = (deltaTime) => {\n            var _a, _b;\n            if (((_b = (_a = this.GameObject.tryGetComponent(_Move__WEBPACK_IMPORTED_MODULE_2__.Move)) === null || _a === void 0 ? void 0 : _a.IsMoving) !== null && _b !== void 0 ? _b : false) && this._onCollision) {\n                this._Neighbours = this._solveNeighbours();\n                this._Neighbours.forEach(neighbour => {\n                    if (this.check(this.GameObject, neighbour)) {\n                        this._onCollision(this.GameObject, neighbour);\n                    }\n                });\n            }\n        };\n        this.onCollision = (action) => {\n            this._onCollision = action;\n        };\n        this.onNeighboursChange = (count, action) => {\n            this._NeighboursCount = count;\n            this._onNeighboursChange = action;\n        };\n    }\n    check(objectA, objectB) {\n        const axes = this._getAxes(objectA).concat(this._getAxes(objectB));\n        for (const axis of axes) {\n            const proj1 = this._project(objectA, axis);\n            const proj2 = this._project(objectB, axis);\n            if (!this._overlaps(proj1, proj2)) {\n                return false;\n            }\n        }\n        return true;\n    }\n    _project(object, axis) {\n        var _a, _b;\n        let min = Infinity;\n        let max = -Infinity;\n        for (const vertex of (_b = (_a = object.tryGetComponent(_Shape__WEBPACK_IMPORTED_MODULE_3__.Shape)) === null || _a === void 0 ? void 0 : _a.Dots) !== null && _b !== void 0 ? _b : []) {\n            const projection = axis.X * vertex.X + axis.Y * vertex.Y;\n            min = Math.min(min, projection);\n            max = Math.max(max, projection);\n        }\n        return { min, max };\n    }\n    _overlaps(proj1, proj2) {\n        return proj1.max >= proj2.min && proj2.max >= proj1.min;\n    }\n    _getAxes(object) {\n        var _a, _b;\n        const axes = [];\n        const vertices = (_b = (_a = object.tryGetComponent(_Shape__WEBPACK_IMPORTED_MODULE_3__.Shape)) === null || _a === void 0 ? void 0 : _a.Dots) !== null && _b !== void 0 ? _b : [];\n        for (let i = 0; i < vertices.length; i++) {\n            const p1 = vertices[i];\n            const p2 = vertices[(i + 1) % vertices.length];\n            const edge = { X: p2.X - p1.X, Y: p2.Y - p1.Y };\n            const normal = { X: -edge.Y, Y: edge.X };\n            const length = Math.sqrt(Math.pow(normal.X, 2) + Math.pow(normal.Y, 2));\n            axes.push({ X: normal.X / length, Y: normal.Y / length });\n        }\n        return axes;\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Physic/Physic.ts?");

/***/ }),

/***/ "./GameEngine/Components/Physic/index.ts":
/*!***********************************************!*\
  !*** ./GameEngine/Components/Physic/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Physic: () => (/* reexport safe */ _Physic__WEBPACK_IMPORTED_MODULE_0__.Physic)\n/* harmony export */ });\n/* harmony import */ var _Physic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Physic */ \"./GameEngine/Components/Physic/Physic.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Physic/index.ts?");

/***/ }),

/***/ "./GameEngine/Components/Shape/Properties/FillStyle.ts":
/*!*************************************************************!*\
  !*** ./GameEngine/Components/Shape/Properties/FillStyle.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FillStyle: () => (/* binding */ FillStyle)\n/* harmony export */ });\nclass FillStyle {\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Shape/Properties/FillStyle.ts?");

/***/ }),

/***/ "./GameEngine/Components/Shape/Properties/LineStyle.ts":
/*!*************************************************************!*\
  !*** ./GameEngine/Components/Shape/Properties/LineStyle.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LineStyle: () => (/* binding */ LineStyle)\n/* harmony export */ });\nclass LineStyle {\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Shape/Properties/LineStyle.ts?");

/***/ }),

/***/ "./GameEngine/Components/Shape/Properties/index.ts":
/*!*********************************************************!*\
  !*** ./GameEngine/Components/Shape/Properties/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FillStyle: () => (/* reexport safe */ _FillStyle__WEBPACK_IMPORTED_MODULE_1__.FillStyle),\n/* harmony export */   LineStyle: () => (/* reexport safe */ _LineStyle__WEBPACK_IMPORTED_MODULE_0__.LineStyle)\n/* harmony export */ });\n/* harmony import */ var _LineStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LineStyle */ \"./GameEngine/Components/Shape/Properties/LineStyle.ts\");\n/* harmony import */ var _FillStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FillStyle */ \"./GameEngine/Components/Shape/Properties/FillStyle.ts\");\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Shape/Properties/index.ts?");

/***/ }),

/***/ "./GameEngine/Components/Shape/Shape.ts":
/*!**********************************************!*\
  !*** ./GameEngine/Components/Shape/Shape.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Shape: () => (/* binding */ Shape)\n/* harmony export */ });\n/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Core */ \"./GameEngine/Core/index.ts\");\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ \"./GameEngine/Utilities/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\nclass Shape extends _Core__WEBPACK_IMPORTED_MODULE_0__.GameComponent {\n    constructor() {\n        super(...arguments);\n        this._Dots = [];\n        this.IsHidden = false;\n        this.clearLineStyle = () => {\n            this._LineStyle = {};\n        };\n        this.clearFillStyle = () => {\n            this._FillStyle = {};\n        };\n        this.draw = (...dots) => {\n            var _a, _b, _c, _d, _e, _f, _g, _h;\n            this._Dots = dots;\n            if (this.GameObject.Layer && !this.IsHidden) {\n                this.GameObject.Screen.Context.beginPath();\n                this._Dots.forEach((dot, index, self) => {\n                    if (index === 0) {\n                        this.GameObject.Screen.Context.moveTo(dot.X + this.GameObject.Transform.Position.X, dot.Y + this.GameObject.Transform.Position.Y);\n                    }\n                    else {\n                        this.GameObject.Screen.Context.lineTo(dot.X + this.GameObject.Transform.Position.X, dot.Y + this.GameObject.Transform.Position.Y);\n                    }\n                    if (index === dots.length - 1) {\n                        this.GameObject.Screen.Context.lineTo(self[0].X + this.GameObject.Transform.Position.X, self[0].Y + this.GameObject.Transform.Position.Y);\n                    }\n                });\n                if (((_a = this.LineStyle) === null || _a === void 0 ? void 0 : _a.Color) !== undefined && ((_b = this.LineStyle) === null || _b === void 0 ? void 0 : _b.Width) !== 0) {\n                    this.GameObject.Screen.Context.globalAlpha = ((_c = this.LineStyle) === null || _c === void 0 ? void 0 : _c.Opacity) || 1;\n                    this.GameObject.Screen.Context.setLineDash(((_d = this.LineStyle) === null || _d === void 0 ? void 0 : _d.Template) || []);\n                    this.GameObject.Screen.Context.lineWidth = (_e = this.LineStyle) === null || _e === void 0 ? void 0 : _e.Width;\n                    this.GameObject.Screen.Context.strokeStyle = (_f = this.LineStyle) === null || _f === void 0 ? void 0 : _f.Color;\n                    this.GameObject.Screen.Context.stroke();\n                }\n                this.GameObject.Screen.Context.globalAlpha = ((_g = this.FillStyle) === null || _g === void 0 ? void 0 : _g.Opacity) || 1;\n                this.GameObject.Screen.Context.fillStyle = (_h = this.FillStyle) === null || _h === void 0 ? void 0 : _h.Color;\n                this.GameObject.Screen.Context.fill();\n                this.GameObject.Screen.Context.closePath();\n            }\n        };\n        this.drawByDotsCount = (count, size) => {\n            const dots = [];\n            for (let i = 0; i < count; i++) {\n                const angle = _Utilities__WEBPACK_IMPORTED_MODULE_1__.Angle.degree(360 / count * i + this.GameObject.Transform.Rotation.toDegree());\n                const CX = this.GameObject.Transform.Position.X;\n                const CY = this.GameObject.Transform.Position.Y;\n                const X = CX + size;\n                const Y = CY;\n                const cos = Math.cos(angle.toRadian());\n                const sin = Math.sin(angle.toRadian());\n                dots.push(new _Utilities__WEBPACK_IMPORTED_MODULE_1__.Vector2D((cos * (X - CX)) + (sin * (Y - CY)), (cos * (Y - CY)) - (sin * (X - CX))));\n            }\n            this.draw(...dots);\n        };\n        this.drawLine = (pointA, pointB) => {\n            this.draw(pointA, pointB);\n        };\n        this.update = (deltaTime) => __awaiter(this, void 0, void 0, function* () {\n            this.draw(...this._Dots);\n        });\n    }\n    set LineStyle(value) {\n        this._LineStyle = Object.assign(Object.assign({}, this._LineStyle), value);\n    }\n    get LineStyle() {\n        return this._LineStyle;\n    }\n    set FillStyle(value) {\n        this._FillStyle = Object.assign(Object.assign({}, this._FillStyle), value);\n    }\n    get FillStyle() {\n        return this._FillStyle;\n    }\n    get Dots() {\n        return this._Dots.map(dot => dot.add(this.GameObject.Transform.Position));\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Shape/Shape.ts?");

/***/ }),

/***/ "./GameEngine/Components/Shape/index.ts":
/*!**********************************************!*\
  !*** ./GameEngine/Components/Shape/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Properties: () => (/* reexport module object */ _Properties__WEBPACK_IMPORTED_MODULE_1__),\n/* harmony export */   Shape: () => (/* reexport safe */ _Shape__WEBPACK_IMPORTED_MODULE_0__.Shape)\n/* harmony export */ });\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape */ \"./GameEngine/Components/Shape/Shape.ts\");\n/* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Properties */ \"./GameEngine/Components/Shape/Properties/index.ts\");\n\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/Shape/index.ts?");

/***/ }),

/***/ "./GameEngine/Components/index.ts":
/*!****************************************!*\
  !*** ./GameEngine/Components/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Dictionary: () => (/* reexport safe */ _Dictionary__WEBPACK_IMPORTED_MODULE_2__.Dictionary),\n/* harmony export */   Move: () => (/* reexport safe */ _Move__WEBPACK_IMPORTED_MODULE_0__.Move),\n/* harmony export */   Physic: () => (/* reexport safe */ _Physic__WEBPACK_IMPORTED_MODULE_3__.Physic),\n/* harmony export */   Shape: () => (/* reexport safe */ _Shape__WEBPACK_IMPORTED_MODULE_1__.Shape)\n/* harmony export */ });\n/* harmony import */ var _Move__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Move */ \"./GameEngine/Components/Move/index.ts\");\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shape */ \"./GameEngine/Components/Shape/index.ts\");\n/* harmony import */ var _Dictionary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dictionary */ \"./GameEngine/Components/Dictionary/index.ts\");\n/* harmony import */ var _Physic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Physic */ \"./GameEngine/Components/Physic/index.ts\");\n\n\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Components/index.ts?");

/***/ }),

/***/ "./GameEngine/Core/BaseObject/BaseObject.ts":
/*!**************************************************!*\
  !*** ./GameEngine/Core/BaseObject/BaseObject.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseObject: () => (/* binding */ BaseObject)\n/* harmony export */ });\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ \"./GameEngine/Utilities/index.ts\");\n\nclass BaseObject {\n    constructor(name) {\n        this.addTag = (tag) => {\n            this.Tags.push(tag);\n        };\n        this.compareTag = (tag) => {\n            return this.Tags.some(t => t === tag);\n        };\n        this.destroy = () => {\n            BaseObject.delete(this.Id);\n            if (this._onDestroy) {\n                this._onDestroy();\n            }\n        };\n        this.onDestroy = (action) => {\n            this._onDestroy = action;\n        };\n        this.Id = _Utilities__WEBPACK_IMPORTED_MODULE_0__.Guid.new();\n        this.Tags = [];\n        this.Name = name;\n        BaseObject.add(this);\n    }\n    get Childs() {\n        return BaseObject.findByParent(this);\n    }\n    ;\n    set Name(value) {\n        this._Name = value;\n    }\n    get Name() {\n        return this._Name;\n    }\n    static add(object) {\n        if (BaseObject.findById(object.Id)) {\n            throw new Error(`ОШИБКА: ${this.name} с идентификатором '${object.Id}' уже существует.`);\n        }\n        this.Objects.set(object.Id, object);\n    }\n    static findById(id) {\n        return this.Objects.get(id);\n    }\n    static findByName(name) {\n        return Array.from(this.Objects, ([key, value]) => value).find(object => this.name === object.constructor.name && object.Name === name);\n    }\n    static findByTag(tag) {\n        return Array.from(this.Objects, ([key, value]) => value).filter(object => this.name === object.constructor.name && object.compareTag(tag));\n    }\n    static findByParent(parent) {\n        return Array.from(this.Objects, ([key, value]) => value).filter(object => { var _a; return ((_a = object.Parent) === null || _a === void 0 ? void 0 : _a.Id) === parent.Id; });\n    }\n    static delete(id) {\n        this.Objects.delete(id);\n    }\n}\nBaseObject.Objects = new Map();\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/BaseObject/BaseObject.ts?");

/***/ }),

/***/ "./GameEngine/Core/BaseObject/index.ts":
/*!*********************************************!*\
  !*** ./GameEngine/Core/BaseObject/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseObject: () => (/* reexport safe */ _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseObject */ \"./GameEngine/Core/BaseObject/BaseObject.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/BaseObject/index.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameComponent/GameComponent.ts":
/*!********************************************************!*\
  !*** ./GameEngine/Core/GameComponent/GameComponent.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameComponent: () => (/* binding */ GameComponent)\n/* harmony export */ });\nclass GameComponent {\n    constructor(gameObject) {\n        this.GameObject = gameObject;\n    }\n    get IsPause() {\n        return this.GameObject.Scene.IsPause;\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameComponent/GameComponent.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameComponent/index.ts":
/*!************************************************!*\
  !*** ./GameEngine/Core/GameComponent/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameComponent: () => (/* reexport safe */ _GameComponent__WEBPACK_IMPORTED_MODULE_0__.GameComponent)\n/* harmony export */ });\n/* harmony import */ var _GameComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameComponent */ \"./GameEngine/Core/GameComponent/GameComponent.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameComponent/index.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameLayer/GameLayer.ts":
/*!************************************************!*\
  !*** ./GameEngine/Core/GameLayer/GameLayer.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameLayer: () => (/* binding */ GameLayer)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseObject */ \"./GameEngine/Core/BaseObject/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nclass GameLayer extends _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject {\n    constructor(parent, name) {\n        super(name);\n        this.addGameObject = (gameObject) => {\n            gameObject.setLayer(this);\n        };\n        this.update = (deltaTime) => __awaiter(this, void 0, void 0, function* () {\n            const all = [];\n            this.Childs.forEach(object => {\n                if (object.broadcast && this.IsHidden === false) {\n                    all.push(object.broadcast('update', deltaTime));\n                }\n            });\n            yield Promise.all(all);\n        });\n        this.Parent = parent;\n        this.IsHidden = false;\n    }\n    get Childs() {\n        return super.Childs;\n    }\n    set Order(value) {\n        this._Order = value;\n        _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject.Objects = new Map(Array.from(_BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject.Objects, ([key, value]) => value)\n            .sort((a, b) => {\n            if (!(a instanceof GameLayer) || !(b instanceof GameLayer)) {\n                return 0;\n            }\n            else if (a.Order > b.Order) {\n                return 1;\n            }\n            else if (a.Order < b.Order) {\n                return -1;\n            }\n            return 0;\n        })\n            .map(object => [object.Id, object]));\n    }\n    get Order() {\n        return this._Order;\n    }\n    get Scene() {\n        return this.Parent;\n    }\n    get Screen() {\n        var _a;\n        return (_a = this.Parent) === null || _a === void 0 ? void 0 : _a.Screen;\n    }\n    get GameObjects() {\n        return this.Childs;\n    }\n    static findById(id) {\n        return super.findById(id);\n    }\n    static findByName(name) {\n        return super.findByName(name);\n    }\n    static findByTag(tag) {\n        return super.findByTag(tag);\n    }\n    static findByParent(parent) {\n        return super.findByParent(parent);\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameLayer/GameLayer.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameLayer/index.ts":
/*!********************************************!*\
  !*** ./GameEngine/Core/GameLayer/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameLayer: () => (/* reexport safe */ _GameLayer__WEBPACK_IMPORTED_MODULE_0__.GameLayer)\n/* harmony export */ });\n/* harmony import */ var _GameLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameLayer */ \"./GameEngine/Core/GameLayer/GameLayer.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameLayer/index.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameObject/GameObject.ts":
/*!**************************************************!*\
  !*** ./GameEngine/Core/GameObject/GameObject.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameObject: () => (/* binding */ GameObject)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseObject */ \"./GameEngine/Core/BaseObject/index.ts\");\n/* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Properties */ \"./GameEngine/Core/GameObject/Properties/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\nclass GameObject extends _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject {\n    constructor(name, ...components) {\n        super(name);\n        this.addComponent = (componentType) => {\n            const component = new componentType(this);\n            this.Components.set(componentType.name, component);\n        };\n        this.setLayer = (layer) => {\n            this.Parent = layer;\n        };\n        this.broadcast = (methodName, ...args) => __awaiter(this, void 0, void 0, function* () {\n            try {\n                const all = [];\n                Array.from(this.Components, ([key, value]) => value)\n                    .filter(component => component[methodName] && typeof component[methodName] === 'function')\n                    .forEach(component => {\n                    if (component[methodName].length !== args.length) {\n                        throw new Error(`ОШИБКА: Метод '${methodName}' в компоненте '${component.constructor.name}' количество переданных аргументов (${args.length}) не соответствует ожидаемому (${component[methodName].length})`);\n                    }\n                    all.push(component[methodName].apply(this, [...args]));\n                });\n                yield Promise.all(all);\n            }\n            catch (e) {\n                console.error(e);\n            }\n        });\n        this.getComponent = (componentType) => {\n            const found = this.Components.get(componentType.name);\n            if (found === undefined) {\n                throw new Error(`ОШИБКА: Компонент '${componentType.name}' не найден.`);\n            }\n            return found;\n        };\n        this.tryGetComponent = (componentType) => {\n            return this.Components.get(componentType.name);\n        };\n        this.detachComponent = (componentType) => {\n            this.Components.delete(componentType.name);\n        };\n        this.Components = new Map();\n        this.Transform = new _Properties__WEBPACK_IMPORTED_MODULE_1__.Transform(this);\n        components.forEach(component => {\n            this.addComponent(component);\n        });\n    }\n    get Layer() {\n        return this.Parent;\n    }\n    get Scene() {\n        var _a;\n        return (_a = this.Parent) === null || _a === void 0 ? void 0 : _a.Scene;\n    }\n    get Screen() {\n        var _a;\n        return (_a = this.Parent) === null || _a === void 0 ? void 0 : _a.Screen;\n    }\n    static findById(id) {\n        return super.findById(id);\n    }\n    static findByName(name) {\n        return super.findByName(name);\n    }\n    static findByTag(tag) {\n        return super.findByTag(tag);\n    }\n    static findByParent(parent) {\n        return super.findByParent(parent);\n    }\n    static findByComponent(component) {\n        return Array.from(super.Objects, ([key, value]) => value).filter(object => object instanceof GameObject && object.tryGetComponent(component));\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameObject/GameObject.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameObject/Properties/Transform.ts":
/*!************************************************************!*\
  !*** ./GameEngine/Core/GameObject/Properties/Transform.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Transform: () => (/* binding */ Transform)\n/* harmony export */ });\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utilities */ \"./GameEngine/Utilities/index.ts\");\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameObject */ \"./GameEngine/Core/GameObject/GameObject.ts\");\n\n\nclass Transform {\n    constructor(gameObject) {\n        this.Position = new _Utilities__WEBPACK_IMPORTED_MODULE_0__.Vector2D(0, 0);\n        this.Rotation = new _Utilities__WEBPACK_IMPORTED_MODULE_0__.Angle(0);\n        this.Scale = 1;\n        this._GameObject = gameObject;\n    }\n    rotateToPoint(pointOrObject) {\n        const point = pointOrObject instanceof _GameObject__WEBPACK_IMPORTED_MODULE_1__.GameObject ? pointOrObject.Transform.Position : pointOrObject;\n        this.Rotation = new _Utilities__WEBPACK_IMPORTED_MODULE_0__.Angle(-_Utilities__WEBPACK_IMPORTED_MODULE_0__.Angle.byPoints(this._GameObject, point).toRadian());\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameObject/Properties/Transform.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameObject/Properties/index.ts":
/*!********************************************************!*\
  !*** ./GameEngine/Core/GameObject/Properties/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Transform: () => (/* reexport safe */ _Transform__WEBPACK_IMPORTED_MODULE_0__.Transform)\n/* harmony export */ });\n/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Transform */ \"./GameEngine/Core/GameObject/Properties/Transform.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameObject/Properties/index.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameObject/index.ts":
/*!*********************************************!*\
  !*** ./GameEngine/Core/GameObject/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameObject: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_0__.GameObject),\n/* harmony export */   Properties: () => (/* reexport module object */ _Properties__WEBPACK_IMPORTED_MODULE_1__)\n/* harmony export */ });\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ \"./GameEngine/Core/GameObject/GameObject.ts\");\n/* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Properties */ \"./GameEngine/Core/GameObject/Properties/index.ts\");\n\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameObject/index.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameScene/GameScene.ts":
/*!************************************************!*\
  !*** ./GameEngine/Core/GameScene/GameScene.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameScene: () => (/* binding */ GameScene)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseObject */ \"./GameEngine/Core/BaseObject/index.ts\");\n/* harmony import */ var _GameLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameLayer */ \"./GameEngine/Core/GameLayer/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\nclass GameScene extends _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject {\n    constructor(parent, name) {\n        super(name);\n        this.addLayer = (name) => {\n            const layer = new _GameLayer__WEBPACK_IMPORTED_MODULE_1__.GameLayer(this, name);\n            layer.Order = this.Childs.length;\n            return layer;\n        };\n        this.update = (deltaTime) => __awaiter(this, void 0, void 0, function* () {\n            const all = [];\n            this.Childs.forEach(layer => {\n                all.push(layer.update(deltaTime));\n            });\n            yield Promise.all(all);\n        });\n        this.play = () => {\n            this.IsPause = false;\n        };\n        this.pause = () => {\n            this.IsPause = true;\n        };\n        this.Parent = parent;\n        this.IsActive = true;\n        this.IsPause = false;\n    }\n    get Childs() {\n        return super.Childs;\n    }\n    get Layers() {\n        return this.Childs;\n    }\n    get Screen() {\n        return this.Parent;\n    }\n    static findById(id) {\n        return this.Objects.get(id);\n    }\n    static findByName(name) {\n        return super.findByName(name);\n    }\n    static findByTag(tag) {\n        return super.findByTag(tag);\n    }\n    static findByParent(parent) {\n        return super.findByParent(parent);\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameScene/GameScene.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameScene/index.ts":
/*!********************************************!*\
  !*** ./GameEngine/Core/GameScene/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameScene: () => (/* reexport safe */ _GameScene__WEBPACK_IMPORTED_MODULE_0__.GameScene)\n/* harmony export */ });\n/* harmony import */ var _GameScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameScene */ \"./GameEngine/Core/GameScene/GameScene.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameScene/index.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameScreen/GameScreen.ts":
/*!**************************************************!*\
  !*** ./GameEngine/Core/GameScreen/GameScreen.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameScreen: () => (/* binding */ GameScreen)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseObject */ \"./GameEngine/Core/BaseObject/index.ts\");\n/* harmony import */ var _GameScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameScene */ \"./GameEngine/Core/GameScene/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\nclass GameScreen extends _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject {\n    constructor(target, width, height) {\n        super();\n        this._LastTime = 0;\n        this._resizeCanvas = () => {\n            this.Canvas.width = innerWidth;\n            this.Canvas.height = innerHeight;\n            this.Canvas.style.cssText = 'position: absolute; top: 0; left: 0;';\n        };\n        this._onShowFps = () => {\n            const now = performance.now();\n            while (this._Times.length > 0 && this._Times[0] <= now - 1000) {\n                this._Times.shift();\n            }\n            this._Times.push(now);\n            return this._Times.length;\n        };\n        this.addScene = (name) => {\n            return new _GameScene__WEBPACK_IMPORTED_MODULE_1__.GameScene(this, name);\n        };\n        this.removeScene = (name) => {\n            var _a;\n            (_a = _GameScene__WEBPACK_IMPORTED_MODULE_1__.GameScene.findByName(name)) === null || _a === void 0 ? void 0 : _a.destroy();\n        };\n        this.update = (deltaTime) => __awaiter(this, void 0, void 0, function* () {\n            const all = [];\n            this.Context.clearRect(0, 0, this.Width, this.Height);\n            this.Childs.filter(scene => scene.IsActive).forEach(scene => {\n                this.Context.setTransform(1, 0, 0, 1, 0, 0);\n                all.push(scene.update(deltaTime));\n                this.Context.restore();\n            });\n            if (this._IsShowFps) {\n                this.fps(this._IsShowFps);\n            }\n            yield Promise.all(all);\n        });\n        this.fps = (status = false) => {\n            this._IsShowFps = status;\n            if (this._IsShowFps) {\n                this.Context.beginPath();\n                this.Context.globalAlpha = 0.75;\n                this.Context.fillStyle = 'black';\n                this.Context.fillRect(10, 10, 70, 24);\n                this.Context.closePath();\n                this.Context.beginPath();\n                this.Context.globalAlpha = 1;\n                this.Context.textAlign = 'center';\n                this.Context.strokeStyle = '#00fb00';\n                this.Context.textBaseline = 'middle';\n                this.Context.font = 'lighter 18px sans-serif';\n                this.Context.moveTo(35, 22);\n                this.Context.fillStyle = '#00fb00';\n                this.Context.fillText(`FPS: ${this._onShowFps()}`, 45, 22, 70);\n                this.Context.closePath();\n            }\n        };\n        this.play = (currentTime = 0) => {\n            const deltaTime = (currentTime - this._LastTime) / 1000;\n            this._LastTime = currentTime;\n            this.update(deltaTime);\n            this.Loop = requestAnimationFrame(this.play);\n        };\n        this.pause = () => {\n            cancelAnimationFrame(this.Loop);\n        };\n        this._Times = [];\n        this._IsShowFps = false;\n        this.Canvas = document.createElement('canvas');\n        this.Context = this.Canvas.getContext('2d');\n        if (width === undefined || height === undefined || width === null || height === null) {\n            this._resizeCanvas();\n            window.addEventListener(\"resize\", (e) => {\n                this._resizeCanvas();\n            });\n        }\n        else {\n            this.Canvas.width = width;\n            this.Canvas.height = height;\n        }\n        target.appendChild(this.Canvas);\n    }\n    get Childs() {\n        return super.Childs;\n    }\n    set Name(value) {\n        if (_BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject.findByName(value)) {\n            throw new Error(`ОШИБКА: ${this.constructor.name} с именем '${value}' уже существует.`);\n        }\n        super.Name = value;\n    }\n    get Name() {\n        return super.Name;\n    }\n    get Width() {\n        return this.Canvas.width;\n    }\n    get Height() {\n        return this.Canvas.height;\n    }\n    get Scenes() {\n        return this.Childs;\n    }\n    static findSceneByName(name) {\n        return Array.from(this.Objects, ([key, value]) => value).find(object => object instanceof _GameScene__WEBPACK_IMPORTED_MODULE_1__.GameScene && object.Name === name);\n    }\n    static findById(id) {\n        return super.findById(id);\n    }\n    static findByName(name) {\n        return super.findByName(name);\n    }\n    static findByTag(tag) {\n        return super.findByTag(tag);\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameScreen/GameScreen.ts?");

/***/ }),

/***/ "./GameEngine/Core/GameScreen/index.ts":
/*!*********************************************!*\
  !*** ./GameEngine/Core/GameScreen/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameScreen: () => (/* reexport safe */ _GameScreen__WEBPACK_IMPORTED_MODULE_0__.GameScreen)\n/* harmony export */ });\n/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameScreen */ \"./GameEngine/Core/GameScreen/GameScreen.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/GameScreen/index.ts?");

/***/ }),

/***/ "./GameEngine/Core/index.ts":
/*!**********************************!*\
  !*** ./GameEngine/Core/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseObject: () => (/* reexport safe */ _BaseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject),\n/* harmony export */   GameComponent: () => (/* reexport safe */ _GameComponent__WEBPACK_IMPORTED_MODULE_5__.GameComponent),\n/* harmony export */   GameLayer: () => (/* reexport safe */ _GameLayer__WEBPACK_IMPORTED_MODULE_3__.GameLayer),\n/* harmony export */   GameObject: () => (/* reexport safe */ _GameObject__WEBPACK_IMPORTED_MODULE_4__.GameObject),\n/* harmony export */   GameScene: () => (/* reexport safe */ _GameScene__WEBPACK_IMPORTED_MODULE_2__.GameScene),\n/* harmony export */   GameScreen: () => (/* reexport safe */ _GameScreen__WEBPACK_IMPORTED_MODULE_1__.GameScreen)\n/* harmony export */ });\n/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseObject */ \"./GameEngine/Core/BaseObject/index.ts\");\n/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameScreen */ \"./GameEngine/Core/GameScreen/index.ts\");\n/* harmony import */ var _GameScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameScene */ \"./GameEngine/Core/GameScene/index.ts\");\n/* harmony import */ var _GameLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameLayer */ \"./GameEngine/Core/GameLayer/index.ts\");\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GameObject */ \"./GameEngine/Core/GameObject/index.ts\");\n/* harmony import */ var _GameComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GameComponent */ \"./GameEngine/Core/GameComponent/index.ts\");\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Core/index.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Angle/Angle.ts":
/*!*********************************************!*\
  !*** ./GameEngine/Utilities/Angle/Angle.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Angle: () => (/* binding */ Angle)\n/* harmony export */ });\n/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Core */ \"./GameEngine/Core/index.ts\");\n\nclass Angle extends Number {\n    toDegree() {\n        return this.valueOf() * 180 / Math.PI;\n    }\n    toRadian() {\n        return this.valueOf();\n    }\n    static degree(value) {\n        return new Angle(value * Math.PI / 180);\n    }\n    static byPoints(pointOrObjectA, pointOrObjectB) {\n        const pointA = pointOrObjectA instanceof _Core__WEBPACK_IMPORTED_MODULE_0__.GameObject ? pointOrObjectA.Transform.Position : pointOrObjectA;\n        const pointB = pointOrObjectB instanceof _Core__WEBPACK_IMPORTED_MODULE_0__.GameObject ? pointOrObjectB.Transform.Position : pointOrObjectB;\n        return new Angle(Math.atan2(pointB.Y - pointA.Y, pointB.X - pointA.X));\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Angle/Angle.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Angle/index.ts":
/*!*********************************************!*\
  !*** ./GameEngine/Utilities/Angle/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Angle: () => (/* reexport safe */ _Angle__WEBPACK_IMPORTED_MODULE_0__.Angle)\n/* harmony export */ });\n/* harmony import */ var _Angle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Angle */ \"./GameEngine/Utilities/Angle/Angle.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Angle/index.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Distance/Distance.ts":
/*!***************************************************!*\
  !*** ./GameEngine/Utilities/Distance/Distance.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Distance: () => (/* binding */ Distance)\n/* harmony export */ });\n/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Core */ \"./GameEngine/Core/index.ts\");\n\nclass Distance {\n    static solve(objectOrPointA, objectOrPointB) {\n        const pointA = objectOrPointA instanceof _Core__WEBPACK_IMPORTED_MODULE_0__.GameObject ? objectOrPointA.Transform.Position : objectOrPointA;\n        const pointB = objectOrPointB instanceof _Core__WEBPACK_IMPORTED_MODULE_0__.GameObject ? objectOrPointB.Transform.Position : objectOrPointB;\n        return Math.sqrt(Math.pow(pointB.X - pointA.X, 2) + Math.pow(pointB.Y - pointA.Y, 2));\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Distance/Distance.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Distance/index.ts":
/*!************************************************!*\
  !*** ./GameEngine/Utilities/Distance/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Distance: () => (/* reexport safe */ _Distance__WEBPACK_IMPORTED_MODULE_0__.Distance)\n/* harmony export */ });\n/* harmony import */ var _Distance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Distance */ \"./GameEngine/Utilities/Distance/Distance.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Distance/index.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Guid/Guid.ts":
/*!*******************************************!*\
  !*** ./GameEngine/Utilities/Guid/Guid.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Guid: () => (/* binding */ Guid)\n/* harmony export */ });\n/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Random */ \"./GameEngine/Utilities/Random/index.ts\");\n\nclass Guid {\n}\nGuid.new = () => {\n    const mask = 'xxxx-xxxx-xxxx-xxxx';\n    const chars = '0123456789ABCDEF';\n    return mask.replace(/x/g, c => { return chars.charAt(_Random__WEBPACK_IMPORTED_MODULE_0__.Random.Integer(chars.length)); });\n};\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Guid/Guid.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Guid/index.ts":
/*!********************************************!*\
  !*** ./GameEngine/Utilities/Guid/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Guid: () => (/* reexport safe */ _Guid__WEBPACK_IMPORTED_MODULE_0__.Guid)\n/* harmony export */ });\n/* harmony import */ var _Guid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Guid */ \"./GameEngine/Utilities/Guid/Guid.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Guid/index.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Point/Point.ts":
/*!*********************************************!*\
  !*** ./GameEngine/Utilities/Point/Point.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Point: () => (/* binding */ Point)\n/* harmony export */ });\nclass Point {\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Point/Point.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Point/index.ts":
/*!*********************************************!*\
  !*** ./GameEngine/Utilities/Point/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Point: () => (/* reexport safe */ _Point__WEBPACK_IMPORTED_MODULE_0__.Point)\n/* harmony export */ });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./GameEngine/Utilities/Point/Point.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Point/index.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Random/Random.ts":
/*!***********************************************!*\
  !*** ./GameEngine/Utilities/Random/Random.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Random: () => (/* binding */ Random)\n/* harmony export */ });\n/* harmony import */ var _Angle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Angle */ \"./GameEngine/Utilities/Angle/index.ts\");\n\nclass Random {\n    static Float(minOrMax, max) {\n        if (typeof max === 'undefined') {\n            return Math.random() * minOrMax;\n        }\n        else {\n            return Math.random() * (max - minOrMax + 1) + minOrMax;\n        }\n    }\n    static Integer(minOrMax, max) {\n        return Math.floor(Random.Float(minOrMax, max));\n    }\n    static Color() {\n        return `rgb(${Random.Integer(255)}, ${Random.Integer(255)}, ${Random.Integer(255)})`;\n    }\n    static Boolean() {\n        return Random.Integer(0, 1) === 1;\n    }\n    static Angle(degree = 360) {\n        return _Angle__WEBPACK_IMPORTED_MODULE_0__.Angle.degree(Random.Integer(degree));\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Random/Random.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Random/index.ts":
/*!**********************************************!*\
  !*** ./GameEngine/Utilities/Random/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Random: () => (/* reexport safe */ _Random__WEBPACK_IMPORTED_MODULE_0__.Random)\n/* harmony export */ });\n/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Random */ \"./GameEngine/Utilities/Random/Random.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Random/index.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Vector/Vector.ts":
/*!***********************************************!*\
  !*** ./GameEngine/Utilities/Vector/Vector.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Vector: () => (/* binding */ Vector)\n/* harmony export */ });\nclass Vector {\n    constructor(valueOrPointA, valueOrPointB) {\n        this.add = (vector) => {\n            var _a, _b, _c, _d;\n            return new Vector(this.Value.X + vector.Value.X, ((_b = (_a = this.Value) === null || _a === void 0 ? void 0 : _a.Y) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = vector.Value) === null || _c === void 0 ? void 0 : _c.Y) !== null && _d !== void 0 ? _d : 0));\n        };\n        this.sub = (vector) => {\n            var _a, _b;\n            return this.add(new Vector(-vector.Value.X, ((_b = -((_a = vector.Value) === null || _a === void 0 ? void 0 : _a.Y)) !== null && _b !== void 0 ? _b : 0)));\n        };\n        this.invert = () => {\n            return this.multyply(-1);\n        };\n        this.length = () => {\n            var _a;\n            return Math.sqrt(Math.pow(this.Value.X, 2) + Math.pow((_a = this.Value.Y) !== null && _a !== void 0 ? _a : 0, 2));\n        };\n        this.perpendicular = () => {\n            var _a, _b;\n            return new Vector((_b = (_a = this.Value) === null || _a === void 0 ? void 0 : _a.Y) !== null && _b !== void 0 ? _b : 0, -this.Value.X);\n        };\n        if (typeof valueOrPointA === 'number' && typeof valueOrPointB === 'number') {\n            this.Value = { X: valueOrPointA, Y: valueOrPointB !== null && valueOrPointB !== void 0 ? valueOrPointB : 0 };\n        }\n        else {\n            this.Value = {\n                X: valueOrPointB ? valueOrPointB.X - valueOrPointA.X : valueOrPointA.X,\n                Y: valueOrPointB ? valueOrPointB.Y - valueOrPointA.Y : valueOrPointA.Y\n            };\n        }\n    }\n    multyply(vectorOrValue) {\n        var _a, _b, _c, _d, _e, _f;\n        if (typeof vectorOrValue === 'number') {\n            return new Vector(this.Value.X * vectorOrValue, ((_b = (_a = this.Value) === null || _a === void 0 ? void 0 : _a.Y) !== null && _b !== void 0 ? _b : 0) * vectorOrValue);\n        }\n        else if (vectorOrValue instanceof Vector) {\n            return [this.Value.X * vectorOrValue.Value.X, ((_d = (_c = this.Value) === null || _c === void 0 ? void 0 : _c.Y) !== null && _d !== void 0 ? _d : 0) * ((_f = (_e = vectorOrValue.Value) === null || _e === void 0 ? void 0 : _e.Y) !== null && _f !== void 0 ? _f : 0)].reduce((a, b) => a + b, 0);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Vector/Vector.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Vector/index.ts":
/*!**********************************************!*\
  !*** ./GameEngine/Utilities/Vector/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Vector: () => (/* reexport safe */ _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./GameEngine/Utilities/Vector/Vector.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Vector/index.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Vector2D/Vector2D.ts":
/*!***************************************************!*\
  !*** ./GameEngine/Utilities/Vector2D/Vector2D.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Vector2D: () => (/* binding */ Vector2D)\n/* harmony export */ });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Point */ \"./GameEngine/Utilities/Point/index.ts\");\n\nclass Vector2D extends _Point__WEBPACK_IMPORTED_MODULE_0__.Point {\n    constructor(x, y) {\n        super();\n        this.X = x;\n        this.Y = y;\n    }\n    add(vector) {\n        return new Vector2D(this.X + vector.X, this.Y + vector.Y);\n    }\n    subtract(vector) {\n        return new Vector2D(this.X - vector.X, this.Y - vector.Y);\n    }\n    normalize() {\n        const length = this.length();\n        return new Vector2D(this.X / length, this.Y / length);\n    }\n    multiply(scalar) {\n        return new Vector2D(this.X * scalar, this.Y * scalar);\n    }\n    length() {\n        return Math.sqrt(this.X * this.X + this.Y * this.Y);\n    }\n}\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Vector2D/Vector2D.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/Vector2D/index.ts":
/*!************************************************!*\
  !*** ./GameEngine/Utilities/Vector2D/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Vector2D: () => (/* reexport safe */ _Vector2D__WEBPACK_IMPORTED_MODULE_0__.Vector2D)\n/* harmony export */ });\n/* harmony import */ var _Vector2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector2D */ \"./GameEngine/Utilities/Vector2D/Vector2D.ts\");\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/Vector2D/index.ts?");

/***/ }),

/***/ "./GameEngine/Utilities/index.ts":
/*!***************************************!*\
  !*** ./GameEngine/Utilities/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Angle: () => (/* reexport safe */ _Angle__WEBPACK_IMPORTED_MODULE_3__.Angle),\n/* harmony export */   Distance: () => (/* reexport safe */ _Distance__WEBPACK_IMPORTED_MODULE_4__.Distance),\n/* harmony export */   Guid: () => (/* reexport safe */ _Guid__WEBPACK_IMPORTED_MODULE_0__.Guid),\n/* harmony export */   Point: () => (/* reexport safe */ _Point__WEBPACK_IMPORTED_MODULE_2__.Point),\n/* harmony export */   Random: () => (/* reexport safe */ _Random__WEBPACK_IMPORTED_MODULE_1__.Random),\n/* harmony export */   Vector: () => (/* reexport safe */ _Vector__WEBPACK_IMPORTED_MODULE_5__.Vector),\n/* harmony export */   Vector2D: () => (/* reexport safe */ _Vector2D__WEBPACK_IMPORTED_MODULE_6__.Vector2D)\n/* harmony export */ });\n/* harmony import */ var _Guid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Guid */ \"./GameEngine/Utilities/Guid/index.ts\");\n/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Random */ \"./GameEngine/Utilities/Random/index.ts\");\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Point */ \"./GameEngine/Utilities/Point/index.ts\");\n/* harmony import */ var _Angle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Angle */ \"./GameEngine/Utilities/Angle/index.ts\");\n/* harmony import */ var _Distance__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Distance */ \"./GameEngine/Utilities/Distance/index.ts\");\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Vector */ \"./GameEngine/Utilities/Vector/index.ts\");\n/* harmony import */ var _Vector2D__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Vector2D */ \"./GameEngine/Utilities/Vector2D/index.ts\");\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://engine/./GameEngine/Utilities/index.ts?");

/***/ }),

/***/ "./game.ts":
/*!*****************!*\
  !*** ./game.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameEngine/Components */ \"./GameEngine/Components/index.ts\");\n/* harmony import */ var _GameEngine_Core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameEngine/Core */ \"./GameEngine/Core/index.ts\");\n/* harmony import */ var _GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameEngine/Utilities */ \"./GameEngine/Utilities/index.ts\");\n\n\n\nconst gameScreen = new _GameEngine_Core__WEBPACK_IMPORTED_MODULE_1__.GameScreen(document.body);\nconst gameScene = gameScreen.addScene('game');\nconst uix = gameScene.addLayer('uix');\nconst gameLayer = gameScene.addLayer('world');\nconst generateShaper = (object, size = 10) => {\n    object.Transform.Rotation = _GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Angle();\n    object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Shape).drawByDotsCount(_GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Integer(3, 10), _GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Integer(5, 10) * size);\n    object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Move).Speed = _GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Integer(5, 50);\n    object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Move).moveTo(new _GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Vector2D(_GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Integer(innerWidth), _GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Integer(innerHeight)));\n};\nconst drawObjects = (count, size = 10) => {\n    for (let i = 0; i < count; i++) {\n        const cube = new _GameEngine_Core__WEBPACK_IMPORTED_MODULE_1__.GameObject('cube', _GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Move, _GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Shape, _GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Physic, _GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Dictionary);\n        cube.Transform.Position = new _GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Vector2D(_GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Integer(innerWidth), _GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Integer(innerHeight));\n        generateShaper(cube, size);\n        cube.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Move).onStart((object, component) => {\n            object.Transform.Rotation = _GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Angle();\n            object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Shape).drawByDotsCount(_GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Integer(3, 10), _GameEngine_Utilities__WEBPACK_IMPORTED_MODULE_2__.Random.Integer(5, 10) * size);\n            object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Shape).FillStyle = { Color: 'green' };\n        });\n        cube.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Physic).onCollision((object1, object2) => {\n            object1.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Move).stop();\n            object2.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Move).stop();\n        });\n        cube.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Move).onStop((object, component) => {\n            object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Shape).FillStyle = { Color: 'red' };\n            if (!object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Dictionary).get('wait')) {\n                object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Dictionary).set('wait', true);\n                setTimeout(() => {\n                    var _a;\n                    let new_size = (_a = object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Dictionary).get('size')) !== null && _a !== void 0 ? _a : size;\n                    object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Dictionary).set('size', new_size - 0.5 < 1 ? 1 : new_size - 0.5);\n                    generateShaper(object, object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Dictionary).get('size'));\n                    object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Dictionary).set('wait', false);\n                }, 2000);\n            }\n        });\n        cube.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Move).onFinish((object, component) => {\n            object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Shape).FillStyle = { Color: 'gray' };\n            setTimeout(() => {\n                generateShaper(object, size);\n            }, 2000);\n        });\n        cube.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Move).onMove((object, component) => {\n            var _a;\n            (_a = object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Dictionary).get('line')) === null || _a === void 0 ? void 0 : _a.destroy();\n            const line = new _GameEngine_Core__WEBPACK_IMPORTED_MODULE_1__.GameObject('line', _GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Shape);\n            line.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Shape).drawLine(object.Transform.Position, component.Target);\n            line.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Shape).LineStyle = { Width: 2, Color: 'lightgray', Template: [5, 3] };\n            uix.addGameObject(line);\n            object.getComponent(_GameEngine_Components__WEBPACK_IMPORTED_MODULE_0__.Dictionary).set('line', line);\n        });\n        gameLayer.addGameObject(cube);\n    }\n};\ndrawObjects(15, 5);\ngameScreen.fps(true);\ngameScreen.play();\n\n\n//# sourceURL=webpack://engine/./game.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./game.ts");
/******/ 	
/******/ })()
;
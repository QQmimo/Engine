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

/***/ "./Components/EngineElement/EngineElement.ts":
/*!***************************************************!*\
  !*** ./Components/EngineElement/EngineElement.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EngineElement: () => (/* binding */ EngineElement)\n/* harmony export */ });\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ \"./Utilities/index.ts\");\n\nclass EngineElement {\n    constructor(type, x, y, width, height = width) {\n        this.setContext = (parentContext) => {\n            this.ParentContext = parentContext;\n        };\n        this.setBackground = (fill, opacity = 1) => {\n            this.Background = fill;\n            this.Opacity = opacity;\n        };\n        this.moveTo = (targetX, targetY, speed = 1) => {\n            return new Promise(resolve => {\n                const move = () => {\n                    const angle = Math.atan2(targetY - this.Y, targetX - this.X);\n                    this.X += Math.round((Math.cos(angle) * speed + Number.EPSILON) * 10) / 10;\n                    this.Y += Math.round((Math.sin(angle) * speed + Number.EPSILON) * 10) / 10;\n                    if (Math.floor(this.X) === targetX) {\n                        this.X = targetX;\n                    }\n                    if (Math.floor(this.Y) === targetY) {\n                        this.Y = targetY;\n                    }\n                    console.log(`target: (${targetX}; ${targetY}) | obj: (${this.X}; ${this.Y})`);\n                    if (this.X === targetX && this.Y === targetY) {\n                        resolve();\n                    }\n                    else {\n                        setTimeout(() => {\n                            move();\n                        }, 10);\n                    }\n                };\n                move();\n            });\n        };\n        this.draw = () => {\n            if (this.ParentContext) {\n                this.ParentContext.beginPath();\n                if (this.Background) {\n                    this.ParentContext.fillStyle = this.Background;\n                }\n                this.ParentContext.globalAlpha = this.Opacity;\n                if (this.Type === _Utilities__WEBPACK_IMPORTED_MODULE_0__.EnumGeometry.Circle) {\n                    this.ParentContext.arc(this.X, this.Y, this.Width, 0, 2 * Math.PI);\n                }\n                else if (this.Type === _Utilities__WEBPACK_IMPORTED_MODULE_0__.EnumGeometry.Square) {\n                    this.ParentContext.fillRect(this.X, this.Y, this.Width, this.Height);\n                }\n                this.ParentContext.fill();\n                this.ParentContext.closePath();\n                this.ParentContext.restore();\n            }\n        };\n        this.Id = _Utilities__WEBPACK_IMPORTED_MODULE_0__.Guid.New();\n        this.Type = type;\n        this.X = x;\n        this.Y = y;\n        this.Width = width;\n        this.Height = height;\n        this.Opacity = 1;\n    }\n}\n\n\n//# sourceURL=webpack://engine/./Components/EngineElement/EngineElement.ts?");

/***/ }),

/***/ "./Components/EngineScreen/Components/EngineScreenLayer/EngineScreenLayer.ts":
/*!***********************************************************************************!*\
  !*** ./Components/EngineScreen/Components/EngineScreenLayer/EngineScreenLayer.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EngineScreenLayer: () => (/* binding */ EngineScreenLayer)\n/* harmony export */ });\nclass EngineScreenLayer {\n    constructor(name, width, height) {\n        this.addElement = (element) => {\n            element.setContext(this.Context);\n            this.Elements.push(element);\n        };\n        this.update = () => {\n            this.Context.clearRect(0, 0, this.Width, this.Height);\n            this.Elements.forEach(element => {\n                element.draw();\n            });\n        };\n        this.Name = name;\n        this.Width = width;\n        this.Height = height;\n        this.Canvas = document.createElement('canvas');\n        this.Context = this.Canvas.getContext('2d');\n        this.Canvas.width = this.Width;\n        this.Canvas.height = this.Height;\n        this.Elements = [];\n    }\n    removeElement(elementOrId) {\n        this.Elements = this.Elements.filter(e => e.Id !== (typeof elementOrId === 'string' ? elementOrId : elementOrId.Id));\n    }\n}\n\n\n//# sourceURL=webpack://engine/./Components/EngineScreen/Components/EngineScreenLayer/EngineScreenLayer.ts?");

/***/ }),

/***/ "./Components/EngineScreen/EngineScreen.ts":
/*!*************************************************!*\
  !*** ./Components/EngineScreen/EngineScreen.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EngineScreen: () => (/* binding */ EngineScreen)\n/* harmony export */ });\n/* harmony import */ var _Components_EngineScreenLayer_EngineScreenLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/EngineScreenLayer/EngineScreenLayer */ \"./Components/EngineScreen/Components/EngineScreenLayer/EngineScreenLayer.ts\");\n\nclass EngineScreen {\n    constructor(target, width, height) {\n        this.addLayer = (layerName) => {\n            const findLayerByName = this.getLayerByName(layerName);\n            if (findLayerByName) {\n                throw new Error(`У слоев должно быть уникальное имя. Имя '${layerName}' уже существует.`);\n            }\n            const engineScreenLayer = new _Components_EngineScreenLayer_EngineScreenLayer__WEBPACK_IMPORTED_MODULE_0__.EngineScreenLayer(layerName, this.Width, this.Height);\n            this.Layers.push(engineScreenLayer);\n            this.Target.appendChild(engineScreenLayer.Canvas);\n            return engineScreenLayer;\n        };\n        this.getLayerByName = (layerName) => {\n            return this.Layers.find(layer => layer.Name === layerName);\n        };\n        this.render = () => {\n            this.Layers.forEach(layer => {\n                layer.update();\n            });\n        };\n        this.run = () => {\n            this.render();\n            requestAnimationFrame(this.run);\n        };\n        this.Target = target;\n        this.Width = width;\n        this.Height = height;\n        this.Layers = [];\n    }\n}\n\n\n//# sourceURL=webpack://engine/./Components/EngineScreen/EngineScreen.ts?");

/***/ }),

/***/ "./Components/EngineScreen/index.ts":
/*!******************************************!*\
  !*** ./Components/EngineScreen/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EngineScreen: () => (/* reexport safe */ _EngineScreen__WEBPACK_IMPORTED_MODULE_0__.EngineScreen),\n/* harmony export */   EngineScreenLayer: () => (/* reexport safe */ _Components_EngineScreenLayer_EngineScreenLayer__WEBPACK_IMPORTED_MODULE_1__.EngineScreenLayer)\n/* harmony export */ });\n/* harmony import */ var _EngineScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EngineScreen */ \"./Components/EngineScreen/EngineScreen.ts\");\n/* harmony import */ var _Components_EngineScreenLayer_EngineScreenLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/EngineScreenLayer/EngineScreenLayer */ \"./Components/EngineScreen/Components/EngineScreenLayer/EngineScreenLayer.ts\");\n\n\n\n\n//# sourceURL=webpack://engine/./Components/EngineScreen/index.ts?");

/***/ }),

/***/ "./Components/index.ts":
/*!*****************************!*\
  !*** ./Components/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EngineElement: () => (/* reexport safe */ _EngineElement_EngineElement__WEBPACK_IMPORTED_MODULE_1__.EngineElement),\n/* harmony export */   EngineScreen: () => (/* reexport safe */ _EngineScreen__WEBPACK_IMPORTED_MODULE_0__.EngineScreen),\n/* harmony export */   EngineScreenLayer: () => (/* reexport safe */ _EngineScreen__WEBPACK_IMPORTED_MODULE_0__.EngineScreenLayer)\n/* harmony export */ });\n/* harmony import */ var _EngineScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EngineScreen */ \"./Components/EngineScreen/index.ts\");\n/* harmony import */ var _EngineElement_EngineElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EngineElement/EngineElement */ \"./Components/EngineElement/EngineElement.ts\");\n\n\n\n\n//# sourceURL=webpack://engine/./Components/index.ts?");

/***/ }),

/***/ "./Utilities/EngineColor/EnumColor.ts":
/*!********************************************!*\
  !*** ./Utilities/EngineColor/EnumColor.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnumColor: () => (/* binding */ EnumColor)\n/* harmony export */ });\nvar EnumColor;\n(function (EnumColor) {\n    EnumColor[\"White\"] = \"#fff\";\n    EnumColor[\"Black\"] = \"#000\";\n    EnumColor[\"Red\"] = \"#f00\";\n    EnumColor[\"Green\"] = \"#0f0\";\n    EnumColor[\"Blue\"] = \"#00f\";\n})(EnumColor || (EnumColor = {}));\n\n\n//# sourceURL=webpack://engine/./Utilities/EngineColor/EnumColor.ts?");

/***/ }),

/***/ "./Utilities/EngineColor/index.ts":
/*!****************************************!*\
  !*** ./Utilities/EngineColor/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnumColor: () => (/* reexport safe */ _EnumColor__WEBPACK_IMPORTED_MODULE_0__.EnumColor)\n/* harmony export */ });\n/* harmony import */ var _EnumColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EnumColor */ \"./Utilities/EngineColor/EnumColor.ts\");\n\n\n\n//# sourceURL=webpack://engine/./Utilities/EngineColor/index.ts?");

/***/ }),

/***/ "./Utilities/EngineGeometry/EnumGeometry.ts":
/*!**************************************************!*\
  !*** ./Utilities/EngineGeometry/EnumGeometry.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnumGeometry: () => (/* binding */ EnumGeometry)\n/* harmony export */ });\nvar EnumGeometry;\n(function (EnumGeometry) {\n    EnumGeometry[\"Square\"] = \"square\";\n    EnumGeometry[\"Circle\"] = \"circle\";\n})(EnumGeometry || (EnumGeometry = {}));\n\n\n//# sourceURL=webpack://engine/./Utilities/EngineGeometry/EnumGeometry.ts?");

/***/ }),

/***/ "./Utilities/EngineGuid/Guid.ts":
/*!**************************************!*\
  !*** ./Utilities/EngineGuid/Guid.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Guid: () => (/* binding */ Guid)\n/* harmony export */ });\n/* harmony import */ var _EngineRandom_Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EngineRandom/Random */ \"./Utilities/EngineRandom/Random.ts\");\n\nclass Guid {\n}\nGuid.New = () => {\n    const mask = 'xxxx-xxxx-xxxx-xxxx';\n    const chars = '0123456789ABCDEF';\n    return mask.replace(/x/g, c => { return chars.charAt(_EngineRandom_Random__WEBPACK_IMPORTED_MODULE_0__.Random.Integer(0, chars.length)); });\n};\n\n\n//# sourceURL=webpack://engine/./Utilities/EngineGuid/Guid.ts?");

/***/ }),

/***/ "./Utilities/EngineRandom/Random.ts":
/*!******************************************!*\
  !*** ./Utilities/EngineRandom/Random.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Random: () => (/* binding */ Random)\n/* harmony export */ });\nclass Random {\n}\nRandom.Integer = (from = 0, to = 1) => {\n    return Math.floor(Random.Float(from, to));\n};\nRandom.Float = (from = 0, to = 1) => {\n    return Math.random() * (to - from) + from;\n};\n\n\n//# sourceURL=webpack://engine/./Utilities/EngineRandom/Random.ts?");

/***/ }),

/***/ "./Utilities/index.ts":
/*!****************************!*\
  !*** ./Utilities/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnumColor: () => (/* reexport safe */ _EngineColor__WEBPACK_IMPORTED_MODULE_0__.EnumColor),\n/* harmony export */   EnumGeometry: () => (/* reexport safe */ _EngineGeometry_EnumGeometry__WEBPACK_IMPORTED_MODULE_3__.EnumGeometry),\n/* harmony export */   Guid: () => (/* reexport safe */ _EngineGuid_Guid__WEBPACK_IMPORTED_MODULE_1__.Guid),\n/* harmony export */   Random: () => (/* reexport safe */ _EngineRandom_Random__WEBPACK_IMPORTED_MODULE_2__.Random)\n/* harmony export */ });\n/* harmony import */ var _EngineColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EngineColor */ \"./Utilities/EngineColor/index.ts\");\n/* harmony import */ var _EngineGuid_Guid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EngineGuid/Guid */ \"./Utilities/EngineGuid/Guid.ts\");\n/* harmony import */ var _EngineRandom_Random__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EngineRandom/Random */ \"./Utilities/EngineRandom/Random.ts\");\n/* harmony import */ var _EngineGeometry_EnumGeometry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EngineGeometry/EnumGeometry */ \"./Utilities/EngineGeometry/EnumGeometry.ts\");\n\n\n\n\n\n\n//# sourceURL=webpack://engine/./Utilities/index.ts?");

/***/ }),

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components */ \"./Components/index.ts\");\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utilities */ \"./Utilities/index.ts\");\n\n\nconst screen = new _Components__WEBPACK_IMPORTED_MODULE_0__.EngineScreen(document.body, 800, 600);\nconst world = screen.addLayer('World');\nworld.Canvas.style.cssText = 'border: 1px solid #000;';\nconst cube = new _Components__WEBPACK_IMPORTED_MODULE_0__.EngineElement(_Utilities__WEBPACK_IMPORTED_MODULE_1__.EnumGeometry.Square, 25, 0, 50);\ncube.setBackground(_Utilities__WEBPACK_IMPORTED_MODULE_1__.EnumColor.Green, 0.25);\nconst circle = new _Components__WEBPACK_IMPORTED_MODULE_0__.EngineElement(_Utilities__WEBPACK_IMPORTED_MODULE_1__.EnumGeometry.Circle, 25, 25, 25);\ncircle.setBackground(_Utilities__WEBPACK_IMPORTED_MODULE_1__.EnumColor.Red, 0.25);\nworld.addElement(cube);\nworld.addElement(circle);\nlet moving = false;\nworld.Canvas.addEventListener('click', (e) => {\n    if (moving === false) {\n        moving = true;\n        const dot = new _Components__WEBPACK_IMPORTED_MODULE_0__.EngineElement(_Utilities__WEBPACK_IMPORTED_MODULE_1__.EnumGeometry.Circle, e.offsetX, e.offsetY, 5);\n        dot.setBackground(_Utilities__WEBPACK_IMPORTED_MODULE_1__.EnumColor.Red);\n        world.addElement(dot);\n        const startX = circle.X;\n        const startY = circle.Y;\n        circle.moveTo(dot.X, dot.Y).then(() => {\n            world.removeElement(dot);\n        }).then(() => {\n            circle.moveTo(startX, startY).then(() => {\n                moving = false;\n            });\n        });\n    }\n});\nscreen.run();\nconsole.log(screen);\n\n\n//# sourceURL=webpack://engine/./app.ts?");

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
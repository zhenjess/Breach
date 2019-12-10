/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/chart.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chart.js":
/*!**********************!*\
  !*** ./src/chart.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/jzhen/Desktop/breach/src/chart.js: Identifier 'yearsTitleX' has already been declared (85:8)\n\n\u001b[0m \u001b[90m 83 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 84 | \u001b[39m    \u001b[90m//X locations of the year titles\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 85 | \u001b[39m    let yearsTitleX \u001b[33m=\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m        \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 86 | \u001b[39m        \u001b[32m\"Technology\"\u001b[39m\u001b[33m:\u001b[39m \u001b[35m230\u001b[39m\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 87 | \u001b[39m        \u001b[32m\"Retail\"\u001b[39m\u001b[33m:\u001b[39m [(width \u001b[33m/\u001b[39m \u001b[35m4\u001b[39m) \u001b[33m-\u001b[39m \u001b[35m100\u001b[39m]\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 88 | \u001b[39m        \u001b[32m\"Financial\"\u001b[39m\u001b[33m:\u001b[39m [(width \u001b[33m/\u001b[39m \u001b[35m4\u001b[39m) \u001b[33m+\u001b[39m \u001b[35m110\u001b[39m]\u001b[33m,\u001b[39m\u001b[0m\n    at Parser.raise (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:6975:17)\n    at ScopeHandler.checkRedeclarationInScope (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:4255:12)\n    at ScopeHandler.declareName (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:4221:12)\n    at Parser.checkLVal (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:8808:22)\n    at Parser.parseVarId (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11329:10)\n    at Parser.parseVar (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11304:12)\n    at Parser.parseVarStatement (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11126:10)\n    at Parser.parseStatementContent (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:10723:21)\n    at Parser.parseStatement (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:10656:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11232:25)\n    at Parser.parseBlockBody (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11219:10)\n    at Parser.parseBlock (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11203:10)\n    at Parser.parseFunctionBody (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:10222:24)\n    at Parser.parseFunctionBodyAndFinish (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:10192:10)\n    at /Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11364:12\n    at Parser.withTopicForbiddingContext (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:10531:14)\n    at Parser.parseFunction (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11363:10)\n    at Parser.parseFunctionStatement (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11004:17)\n    at Parser.parseStatementContent (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:10694:21)\n    at Parser.parseStatement (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:10656:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11232:25)\n    at Parser.parseBlockBody (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:11219:10)\n    at Parser.parseTopLevel (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:10587:10)\n    at Parser.parse (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:12097:10)\n    at parse (/Users/jzhen/Desktop/breach/node_modules/@babel/parser/lib/index.js:12148:38)\n    at parser (/Users/jzhen/Desktop/breach/node_modules/@babel/core/lib/transformation/normalize-file.js:168:34)\n    at normalizeFile (/Users/jzhen/Desktop/breach/node_modules/@babel/core/lib/transformation/normalize-file.js:102:11)\n    at runSync (/Users/jzhen/Desktop/breach/node_modules/@babel/core/lib/transformation/index.js:44:43)\n    at runAsync (/Users/jzhen/Desktop/breach/node_modules/@babel/core/lib/transformation/index.js:35:14)\n    at /Users/jzhen/Desktop/breach/node_modules/@babel/core/lib/transform.js:34:34");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
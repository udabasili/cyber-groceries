"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = userReducer;

var _actionTypes = _interopRequireDefault(require("../actionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: false,
  isAdmin: false,
  ageVerified: false,
  hideUserCart: true,
  hideCartDropDown: true
};

function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes["default"].SET_CURRENT_USER:
      return _objectSpread({}, state, {
        currentUser: action.payload,
        isAuthenticated: !!Object.keys(action.payload).length > 0,
        isAdmin: !!Object.keys(action.payload).length > 0 ? action.payload.isAdmin : false,
        ageVerified: action.payload.ageVerified
      });

    case _actionTypes["default"].TOGGLE_USER_DROPDOWN:
      var hideCartDropDownValue = state.hideCartDropDown;

      if (hideCartDropDownValue === false) {
        hideCartDropDownValue = true;
      }

      return _objectSpread({}, state, {
        hideUserCart: action.payload ? action.payload : !state.hideUserCart,
        hideCartDropDown: hideCartDropDownValue
      });

    case _actionTypes["default"].TOGGLE_CART_DROPDOWN:
      var hideUserCartValue = state.hideUserCart;

      if (hideUserCartValue === false) {
        hideUserCartValue = true;
      }

      return _objectSpread({}, state, {
        hideCartDropDown: action.payload ? action.payload : !state.hideCartDropDown,
        hideUserCart: hideUserCartValue
      });

    default:
      return state;
  }
}
import { createStore } from "redux"
import axios from "axios"
import { SET_ACCOUNT, SET_MARKETCONTRACT, SET_TOKENCONTRACT, SET_WEB3, SET_USERNAME } from "./Type"

// Initialisize State
const initState = {
   accounts: null,
   web3: null,
   marketContract: null,
   tokenContract: null,
}

const rootReducer = (state = initState, action) => {
   switch (action.type) {
      case SET_WEB3:
         return {
            ...state,
            web3: action.payload
         }
      case SET_ACCOUNT:
         return {
            ...state,
            accounts: action.payload
         }
      case SET_TOKENCONTRACT:
         return {
            ...state,
            tokenContract: action.payload
         }
      case SET_MARKETCONTRACT: 
         return {
            ...state,
            marketContract: action.payload
         }
      case SET_USERNAME:
         return {
            ...state,
            username: action.payload
         }
      default:
         return state
   }
}

const store = createStore(rootReducer);

export default store;
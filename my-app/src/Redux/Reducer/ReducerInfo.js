// import charactersReducer from "./charactersReducer";

const initialState = {
    infoUser: {},
}

export const InfoActionTypes = {
    SET_INFO: "SET_INFO"
}

const InfoUser = (state= initialState, action) => { //Reducer function
    switch(action.type){
        case InfoActionTypes.SET_INFO:{
            return {
                ...state,
                infoUser: action.infoUser
            }
        }
        default:
            return state
    }
}

export default InfoUser;
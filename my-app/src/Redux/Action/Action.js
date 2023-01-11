import { InfoActionTypes } from "../Reducer/ReducerInfo"
// import { loadData } from "../../api/apiCalls";

export const InfoAction = {
    SetInfo: (infoUser) => ({ type: InfoActionTypes.SET_INFO, infoUser})
}



export const getInfoUserThunk = (snapshot) => (dispatch) => {
    dispatch(InfoAction.SetInfo(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))))

}


import { loginFailure, loginStart, loginSuccess,updationFailure,updationStart,updationSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};
export const updateUser = async (dispatch, user) => {
    dispatch(updationStart());
    try {
        const res = await userRequest.put("/user/update", user);
        dispatch(updationSuccess(res.data.user));
        console.log(res.data.user);
    } catch (err) {
        dispatch(updationFailure());

    }
};

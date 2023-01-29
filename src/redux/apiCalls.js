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
        console.log(res.data.user)
        alert("Profile updation succeed !")
    } catch (err) {
        dispatch(updationFailure());
        alert("Something went wrong !")

    }
};

export const getProducts = async(city,shopId=null,category=null) =>{
    return await userRequest.get(`product/shop?city=${city}&id=${shopId}&category=${category}`);
}

export const getProduct = async(id) =>{
    return await userRequest.get(`product?id=${id}`);
}

export const getSeller = async(seller_id) =>{
    return await userRequest.get(`user/seller?id=${seller_id}`);
}
export const createNewProduct = async(body) =>{
    return await userRequest.post("product/create",body);
}

export const register = (body) =>{
    return publicRequest.post("auth/register",body);
}
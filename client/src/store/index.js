import {configureStore} from "@reduxjs/toolkit";
import authService from "./services/authService";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import categoryService from "./services/categoryService";

const Store = configureStore({

    reducer: {

        [authService.reducerPath]: authService.reducer,
        [categoryService.reducerPath]: categoryService.reducer,
        "authReducer": authReducer,
        "globalReducer": globalReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([categoryService.middleware]),

   
});

export default Store;
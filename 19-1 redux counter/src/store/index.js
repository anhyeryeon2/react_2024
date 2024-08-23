
import { configureStore} from '@reduxjs/toolkit';

import counterReducer from "../store/counter-slice";
import authReducer from "../store/auth-slice";

const store = configureStore({
    reducer: {counter : counterReducer, auth : authReducer}
});


export default store;
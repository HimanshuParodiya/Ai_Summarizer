import { configureStore } from '@reduxjs/toolkit'
import { articleApi } from './Slice/article'


const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)

})

export default store;
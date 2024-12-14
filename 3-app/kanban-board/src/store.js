

import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from './features/documentsSlice';

const store = configureStore({
    reducer: {
        documents: documentsReducer,
    },
});

export default store;

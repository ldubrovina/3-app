

import { createSlice } from '@reduxjs/toolkit';

const initialDocuments = [
    { id: "1", title: "Документ 1", status: "in-progress" },
    { id: "2", title: "Документ 2", status: "in-progress" },
    { id: "3", title: "Документ 3", status: "under-review" },
];

const documentsSlice = createSlice({
    name: 'documents',
    initialState: initialDocuments,
    reducers: {
        addDocument: (state, action) => {
            state.push(action.payload);
        },
        moveDocument: (state, action) => {
            const { id, newStatus } = action.payload;
            const document = state.find(doc => doc.id === id);
            if (document) {
                document.status = newStatus;
            }
        },
    },
});

export const { addDocument, moveDocument } = documentsSlice.actions;
export const selectDocuments = (state) => state.documents;

export default documentsSlice.reducer;

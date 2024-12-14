// src/pages/index.js

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DocumentList from '../components/DocumentList';
import { addDocument, moveDocument, selectDocuments } from '../features/documentsSlice';

export default function Home() {
    const dispatch = useDispatch();
    const documents = useSelector(selectDocuments);

    const [newDocumentTitle, setNewDocumentTitle] = useState("");

    const handleAddDocument = () => {
        if (newDocumentTitle) {
            const newDocument = { id: Date.now().toString(), title: newDocumentTitle, status: "in-progress" };
            dispatch(addDocument(newDocument));
            setNewDocumentTitle("");
        }
    };

    const handleOnDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) return;

        // Если документ остался в той же колонке и на том же месте, ничего не делаем
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        // Получаем id перемещаемого документа
        const movedDocumentId = documents.find(doc => doc.status === source.droppableId && doc.id === result.draggableId)?.id;

        if (movedDocumentId) {
            const newStatus = destination.droppableId;

            // Диспатчим действие для изменения статуса
            dispatch(moveDocument({ id: movedDocumentId, newStatus }));
        }
    };

    const documentsByStatus = {
        "in-progress": documents.filter(doc => doc.status === "in-progress"),
        "under-review": documents.filter(doc => doc.status === "under-review"),
        "completed": documents.filter(doc => doc.status === "completed"),
    };

    return (
        <div>
            <h1>Канбан-доска</h1>
            <input
                value={newDocumentTitle}
                onChange={(e) => setNewDocumentTitle(e.target.value)}
                placeholder="Название документа"
            />
            <button onClick={handleAddDocument}>Добавить документ</button>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div style={{ display: 'flex' }}>
                    {Object.keys(documentsByStatus).map(status => (
                        <DocumentList key={status} documents={documentsByStatus[status]} status={status} />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}

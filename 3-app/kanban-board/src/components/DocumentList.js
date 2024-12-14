import { Droppable } from 'react-beautiful-dnd';
import DocumentItem from './DocumentItem';
import styles from './DocumentList.module.css'; // Импортируем стили

const DocumentList = ({ documents, status }) => {
    return (
        <Droppable droppableId={status}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.list} // Используем классы из модуля
                >
                    <h2 className={styles.title}>{status.replace('-', ' ')}</h2>
                    {documents.map((doc, index) => (
                        <DocumentItem key={doc.id} document={doc} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DocumentList;

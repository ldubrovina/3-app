import { Draggable } from 'react-beautiful-dnd';
import styles from './DocumentItem.module.css'; // Импортируем стили

const DocumentItem = ({ document, index }) => {
    return (
        <Draggable key={document.id} draggableId={document.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.documentItem} // Используем стили из модуля
                >
                    {document.title}
                </div>
            )}
        </Draggable>
    );
};

export default DocumentItem;

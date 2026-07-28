import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import api from '../services/api';
import TaskCard from './TaskCard';
import { FiPlus } from 'react-icons/fi';

const COLUMNS = [
  { id: 'To Do', title: 'To Do', color: 'border-t-blue-500', bgColor: 'bg-blue-50/50', headerColor: 'text-blue-700', badgeColor: 'bg-blue-100 text-blue-700' },
  { id: 'In Progress', title: 'In Progress', color: 'border-t-amber-500', bgColor: 'bg-amber-50/50', headerColor: 'text-amber-700', badgeColor: 'bg-amber-100 text-amber-700' },
  { id: 'Completed', title: 'Completed', color: 'border-t-green-500', bgColor: 'bg-green-50/50', headerColor: 'text-green-700', badgeColor: 'bg-green-100 text-green-700' },
];

const KanbanBoard = ({ tasks, onEdit, onDelete, onAddTask, onTaskUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = async (result) => {
    setIsDragging(false);
    const { source, destination, draggableId } = result;

    // Dropped outside any droppable
    if (!destination) return;

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Update status
    const newStatus = destination.droppableId;

    // Optimistically update UI via parent
    if (onTaskUpdate) {
      onTaskUpdate(draggableId, newStatus);
    }

    // Call API
    try {
      await api.put(`/tasks/${draggableId}`, { status: newStatus });
    } catch (err) {
      console.error('Failed to update task status:', err);
      // Revert on error
      if (onTaskUpdate) {
        onTaskUpdate(draggableId, source.droppableId);
      }
    }
  };

  const getColumnTasks = (columnId) => {
    return tasks.filter((task) => task.status === columnId);
  };

  return (
    <DragDropContext
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 overflow-x-auto pb-4">
        {COLUMNS.map((column) => {
          const columnTasks = getColumnTasks(column.id);
          return (
            <div
              key={column.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 ${column.color} flex flex-col min-h-[300px] ${column.bgColor}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${column.badgeColor}`}
                  >
                    {columnTasks.length}
                  </span>
                  <h3 className={`text-sm font-semibold ${column.headerColor}`}>
                    {column.title}
                  </h3>
                </div>
                <button
                  onClick={onAddTask}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Add task"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 p-3 space-y-3 min-h-[200px] transition-colors duration-200 ${
                      snapshot.isDraggingOver ? 'bg-blue-50/50 rounded-b-xl' : ''
                    }`}
                  >
                    {columnTasks.length === 0 && !isDragging ? (
                      <div className="flex flex-col items-center justify-center h-32 text-center">
                        <p className="text-xs text-gray-400 font-medium">
                          No tasks
                        </p>
                        <p className="text-[10px] text-gray-300 mt-0.5">
                          Drag tasks here
                        </p>
                      </div>
                    ) : (
                      columnTasks.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${
                                snapshot.isDragging
                                  ? 'rotate-2 shadow-lg scale-105'
                                  : ''
                              } transition-all duration-200`}
                            >
                              <TaskCard
                                task={task}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                isKanban
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;


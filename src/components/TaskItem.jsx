const TaskItem = ({ task }) => {
    return (
        <>
            <h1>{task.description}</h1>
            <p>{task.isCompleted ? "Completed" : "Not Completed"}</p>
        </>
    );
};

export default TaskItem;

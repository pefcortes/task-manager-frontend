import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Tasks.scss";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/tasks`
            );
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="tasks-container">
            <h2>Minhas tarefas</h2>

            <div className="last-tasks">
                <h3>Últimas tarefas</h3>
                <AddTask fetchTasks={fetchTasks} />
                <div className="tasks-list">
                    {tasks
                        .filter((task) => !task.isCompleted)
                        .map((lastTask) => (
                            <TaskItem task={lastTask} />
                        ))}
                </div>
            </div>

            <div>
                <div className="completed-tasks">
                    <h3>Tarefas concluídas</h3>
                    <div className="tasks-list">
                        {tasks
                            .filter((task) => task.isCompleted)
                            .map((completedTask) => (
                                <TaskItem task={completedTask} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;

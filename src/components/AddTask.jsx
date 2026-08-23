import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

import { useAlert } from "../context/AlertProvider";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

import "./AddTask.scss";

const AddTask = ({ fetchTasks }) => {
    const [task, setTask] = useState("");

    const { success, error } = useAlert();

    const onChange = (e) => {
        setTask(e.target.value);
    };

    const handleTaskAddition = async () => {
        try {
            if (task.length === 0) {
                return error(
                    "A tarefa precisa de uma descrição para ser adicionada."
                );
            }

            await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {
                description: task,
                isCompleted: false,
            });

            await fetchTasks();

            setTask("");

            success("A tarefa foi adicionada com sucesso!");
        } catch (_e) {
            error("Algo deu errado.");
        }
    };

    return (
        <div className="add-task-container">
            <CustomInput
                label="Adicionar tarefa..."
                value={task}
                onChange={onChange}
                onEnterPress={handleTaskAddition}
            />
            <CustomButton onClick={handleTaskAddition}>
                <FaPlus size={14} color="#ffffff" />
            </CustomButton>
        </div>
    );
};

export default AddTask;

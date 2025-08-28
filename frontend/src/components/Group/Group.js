import Task from '../Task/Task'
import CreateTask from '../CreateTask/CreateTask';
import styles from './Group.css'
import { useEffect, useState } from 'react';

export default function Group({ group, tableData }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (tableData.tasks) {
            setTasks(tableData.tasks || []);
        }
    }, [tableData]);

    const handleTaskCreated = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    return (
        <div className="group" style={styles}>
            <div className="group-title-box">
                <h3 className="group-title">{group.name}</h3>
            </div>
            <div className="tasks-container">
                {tasks.map(task => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
            <CreateTask group_id={group.id} onTaskCreated={handleTaskCreated}/>
        </div>
    );
}
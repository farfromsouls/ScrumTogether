import Task from '../Task/Task'
import styles from './Group.css'


export default function Group({ group, tasks }) {
    // Фильтруем задачи, относящиеся к этой группе
    const groupTasks = tasks.filter(task => task.group === group.id);

    return (
        <div style={styles} className="group">
            <h3 className="group-title">{group.name}</h3>
            <div className="tasks-container">
                {groupTasks.map(task => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
            {groupTasks.length === 0 && (
                <p>create task</p>
            )}
        </div>
    );
}

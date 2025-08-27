import Task from '../Task/Task'
import CreateTask from '../CreateTask/CreateTask';
import styles from './Group.css'

export default function Group({ group, tasks, onTaskCreated }) {
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
            <CreateTask group_id={group.id} onTaskCreated={onTaskCreated}/>
        </div>
    );
}
import styles from './Task.css'


export default function Task({ task }) {
    return (
        <div className="task">
            <h4 className="task-title">{task.title}</h4>
            <p className="task-description">{task.description}</p>
            <div className="task-meta">
                <span className="task-status">Status: {task.status}</span>
            </div>
        </div>
    );
}
import styles from './CreateTask.css'
import plus from './plus.png'

export default function CreateTask({ group_id, onTaskCreated }) {
    const createNew = () => {
        fetch('http://127.0.0.1:8000/todo/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access")
            },
            body: JSON.stringify({ 
                name: 'New Task',
                description: '',
                group_id: group_id,
                status: 'todo',
                color: 'lsdjfl'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (onTaskCreated) {
                onTaskCreated(data);
            }
        })
        .catch(error => {
            console.error('Error creating task:', error);
        });
    }

    return (
        <div className='createTask' onClick={createNew}>
            <img src={plus} className='plus' alt="Add task" />
        </div>
    );
}
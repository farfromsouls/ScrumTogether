import styles from './CreateGroup.css'
import plus from './plus.png'

const createNew = (table_id, onGroupCreated) => {
    console.log(table_id)
    fetch('http://127.0.0.1:8000/todo/group', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage["access"]
        },
        body: JSON.stringify({ 
            name: 'New Group', 
            table_id: table_id,
            color: '#32ce97' 
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Group created:', data);
        if (onGroupCreated) {
            onGroupCreated(data);
        }
    })
    .catch(error => {
        console.error('Error creating group:', error);
    });
}

export default function CreateGroup({ table_id, onGroupCreated }) {
    return (
        <div className={`${styles.createGroup} createGroup`} onClick={() => createNew(table_id, onGroupCreated)}>
            <img src={plus} className={`${styles.plus} plus`} alt="Add group" />
        </div>
    );
}
import styles from './Workspace.css'
import Group from '../Group/Group'


export default function Workspace({ tableData }) {
     if (!tableData) {
        return <div className="table-placeholder">Select a table to view its content</div>;
    }

    const { table, groups, tasks } = tableData;

    return (
        <div className="table-content">

            <h2>{table.name}</h2>
            <p className="table-id">ID: {table.id}</p>
            
            <div className="groups-section">
                <h3>Groups ({groups.length})</h3>
                {groups.length > 0 ? (
                    <div className="groups-list">
                        {groups.map(group => (
                            <div 
                                key={group.id} 
                                className="group"
                                style={{ borderLeft: `4px solid ${group.color}` }}
                            >
                                <h4>{group.name}</h4>
                                <span className="group-meta">ID: {group.id}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No groups found</p>
                )}
            </div>
            
            <div className="tasks-section">
                <h3>Tasks ({tasks.length})</h3>
                {tasks.length > 0 ? (
                    <div className="tasks-list">
                        {tasks.map(task => (
                            <div key={task.id} className="task-item">
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                                <span className="task-meta">Status: {task.status}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No tasks found</p>
                )}
            </div>
        </div>
    );
}
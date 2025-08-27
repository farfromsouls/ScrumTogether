import styles from './Workspace.css'
import CreateGroup from '../CreateGroup/CreateGroup'
import Group from '../Group/Group'


export default function Workspace({ tableData }) {
     if (!tableData) {
        return <div className="table-placeholder">Select a table to view its content</div>;
    }

    const { table, groups, tasks } = tableData;

    return (
        <div className="table-content">
            {/* Заголовок таблицы */}
            <div className="table-header">
                <h2>{table.name}</h2>
            </div>
            
            {/* Секция групп */}
            <div className="groups-container">
                {groups.map(group => (
                    <Group 
                        key={group.id} 
                        group={group} 
                        tasks={tasks} 
                    />
                ))}
            </div>
            
            {/* Сообщение если нет групп */}
            {groups.length === 0 && (
                <div className="no-groups">
                    <CreateGroup />
                </div>
            )}
        </div>
    );
}
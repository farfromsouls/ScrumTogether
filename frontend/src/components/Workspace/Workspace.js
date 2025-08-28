import styles from './Workspace.css'
import { useState, useEffect } from 'react';
import CreateGroup from '../CreateGroup/CreateGroup'
import Group from '../Group/Group'

export default function Workspace({ tableData }) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (tableData) {
            setGroups(tableData.groups || []);
        }
    }, [tableData]);

    const handleGroupCreated = (newGroup) => {
        setGroups(prevGroups => [...prevGroups, newGroup]);
    };

    if (!tableData) {
        return <div className="table-placeholder">Select a table to view its content</div>;
    }

    const { table } = tableData;

    return (
        <div className="table-content" style={styles}>
            <div className="table-header">
                <h2>{table.name}</h2>
            </div>
            
            <div className="groups-container">
                {groups.map(group => (
                    <Group 
                        key={group.id} 
                        group={group} 
                        tableData={tableData}
                    />
                ))}
                <CreateGroup table_id={table.id} onGroupCreated={handleGroupCreated} />
            </div>
        </div>
    );
}
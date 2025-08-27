import styles from './Workspace.css'
import { useState, useEffect } from 'react';
import CreateGroup from '../CreateGroup/CreateGroup'
import Group from '../Group/Group'

export default function Workspace({ tableData }) {
    const [groups, setGroups] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (tableData) {
            setGroups(tableData.groups || []);
            setTasks(tableData.tasks || []);
        }
    }, [tableData]);

    const handleGroupCreated = (newGroup) => {
        setGroups(prevGroups => [...prevGroups, newGroup]);
    };

    const handleTaskCreated = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleTaskMove = async (taskId, fromGroupId, toGroupId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/todo/task/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("access")
                },
                body: JSON.stringify({
                    group_id: toGroupId
                })
            });

            if (response.ok) {
                setTasks(prevTasks => 
                    prevTasks.map(task => 
                        task.id.toString() === taskId 
                            ? { ...task, group: toGroupId } 
                            : task
                    )
                );
            } else {
                console.error('Failed to move task');
            }
        } catch (error) {
            console.error('Error moving task:', error);
        }
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
                        tasks={tasks.filter(task => task.group === group.id)}
                        onTaskMove={handleTaskMove}
                        onTaskCreated={handleTaskCreated}
                    />
                ))}
                <CreateGroup table_id={table.id} onGroupCreated={handleGroupCreated} />
            </div>
        </div>
    );
}
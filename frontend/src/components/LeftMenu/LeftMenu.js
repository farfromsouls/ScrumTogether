import styles from './LeftMenu.css'
import { useState, useEffect } from 'react';

export default function LeftMenu({ onTableSelect, currentTableId  }) {
    const [tables, setTables] = useState([]);
    const [newTableName, setNewTableName] = useState('');

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = () => {
        fetch('http://127.0.0.1:8000/todo/table', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage["access"]
            },
        })
        .then(res => res.json())
        .then((data) => {
            setTables(data["tables"]);
        });
    };

    const handleCreateTable = () => {

        if (newTableName == '') {
            return;
        }

        fetch('http://127.0.0.1:8000/todo/table', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage["access"]
            },
            body: JSON.stringify({ name: newTableName })
        })
        .then(response => response.json())
        .then(data => {
            setNewTableName('');
            fetchTables();
        })
        .catch(error => {
            console.error('Error creating table:', error);
        });
    };

    const handleInputChange = (e) => {
        setNewTableName(e.target.value);
    };

    const handleTableClick = (tableId) => {
        if (tableId === currentTableId) {
            return;
        }

        fetch(`http://127.0.0.1:8000/todo/table/${tableId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage["access"]
            },
        })
        .then(res => res.json())
        .then((tableData) => {
            onTableSelect(tableData, tableId);
        })
        .catch(error => {
            console.error('Error fetching table:', error);
        });
    };

    return (
        <aside style={styles} id="sidebar">
            <div className="aside-content">
                <p className="sidebar-name">Tables list</p>
                <div className='createNew'>
                    <input 
                        placeholder='New table name' 
                        value={newTableName}
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleCreateTable();
                        }}
                    />
                    <button className='createNewTable' onClick={handleCreateTable}>
                        Create
                    </button>
                </div>
                
                <div className="tables-scroll-container">
                    {tables.length > 0 && (
                        <ul className="tables-list">
                            {tables.map(table => (
                                <li key={table.id}>
                                    <button 
                                        id={table.id} 
                                        onClick={() => handleTableClick(table.id)} 
                                        className={`table ${table.id === currentTableId ? 'active' : ''}`}
                                    >
                                        <p>{table.name}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </aside>
    );
}
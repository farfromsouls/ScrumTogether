import styles from './LeftMenu.css'
import React, { useState, useEffect } from 'react';

export default function LeftMenu({ onTableSelect }) {
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
        // Делаем запрос к API для получения данных таблицы
        fetch(`http://127.0.0.1:8000/todo/table/${tableId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage["access"]
            },
        })
        .then(res => res.json())
        .then((tableData) => {
            // Передаем данные таблицы в родительский компонент
            onTableSelect(tableData);
        })
        .catch(error => {
            console.error('Error fetching table:', error);
        });
    };

    return (
        <aside style={styles} id="sidebar">
            <p className="sidebar-name">Tables list</p>
            <div>
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
            {tables.length > 0 && (
                <ul>
                    {tables.map(table => (
                        <button 
                            id={table.id} 
                            onClick={() => handleTableClick(table.id)} 
                            className="table" 
                            key={table.id}
                        >
                            {table.name}
                        </button>
                    ))}
                </ul>
            )}
        </aside>
    );
}
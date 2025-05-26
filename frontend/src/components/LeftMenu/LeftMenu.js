import styles from './LeftMenu.css'

import React, { useState, useEffect } from 'react';


function show_table(id) {
    console.log(id)
}

export default function LeftMenu() {

    const [tables, setTables] = useState([]);

    useEffect(() => {
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
    }, []);

    return (
        <aside style={styles} id="sidebar">
            <p className="sidebar-name">Tables list</p>

            {tables.length > 0 && (
                <ul>
                    {tables.map(table => (
                        <button id={table.id} onClick={() => { show_table(table.id) }} className="table" key={table.id}>
                            {table.name}
                        </button>
                    ))}
                </ul>
            )}

        </aside>
    );
}
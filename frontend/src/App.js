import Header from './components/Header/Header';
import LeftMenu from './components/LeftMenu/LeftMenu';
import Workspace from './components/Workspace/Workspace';
import Footer from './components/Footer/Footer';

import styles from './index.css'

import { useState, useEffect } from 'react';


function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function refresh_check() {
    return new Promise((resolve) => {
        var refresh = getCookie("refresh");

        if (!refresh) {
            window.location = 'http://127.0.0.1:3000/account.html';
            return resolve(false);
        }

        fetch('http://127.0.0.1:8000/user/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "refresh": refresh
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data["code"] == "token_not_valid") {
                    window.location = 'http://127.0.0.1:3000/account.html';
                    console.log("refresh_token_not_valid");
                    resolve(false);
                } else {
                    localStorage.setItem('access', data["access"]);
                    document.cookie = `refresh=${data["refresh"]};`;
                    resolve(true);
                }
            })
            .catch((error) => {
                console.error("Refresh error:", error);
                resolve(false);
            });
    });
}

function access_check() {
    return new Promise((resolve) => {
        var access = localStorage.getItem('access');

        if (access == null) {
            window.location = 'http://127.0.0.1:3000/account.html';
            return resolve(false);
        };

        fetch('http://127.0.0.1:8000/user/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "token": access
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data["code"] == "token_not_valid") {
                    console.log("access_token_not_valid: checking refresh")
                    refresh_check().then(resolve);
                } else {
                    resolve(true);
                };
            })
            .catch(() => resolve(false));
    });
};

export default function App() {
    const [accessGranted, setAccessGranted] = useState(null);
    const [selectedTable, setSelectedTable] = useState(null);

    const handleTableSelect = (tableData) => {
        setSelectedTable(tableData);
    };

    useEffect(() => {access_check().then(setAccessGranted);}, []);

    if (accessGranted === null) {
        return <div>Loading...</div>; 
    }

    if (accessGranted) {
        return (
            <div className="App" style={styles}>
                <Header />
                <LeftMenu onTableSelect={handleTableSelect} />
                <main className="main-content">
                    <Workspace tableData={selectedTable} />
                </main>
                <Footer />
            </div>
        );
    } 
};
import React from 'react';
import QueryEditor from '../components/QueryEditor';
import TableMenu from '../components/TableMenu';
import SavedQueries from '../components/SavedQueries';

const DatabasePage = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '10px' }}>
                <SavedQueries />
                <TableMenu />
            </div>
            <div style={{ width: '80%', padding: '10px' }}>
                <QueryEditor />
            </div>
        </div>
    );
};

export default DatabasePage;

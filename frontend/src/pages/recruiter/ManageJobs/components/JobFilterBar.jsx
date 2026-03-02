import React, { useState } from 'react';
import styles from '../ManageJobs.module.css';

const JobFilterBar = ({ handleFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [department, setDepartment] = useState('');

    const onSearchChange = (e) => {
        setSearchTerm(e.target.value);
        handleFilter({ search: e.target.value, status, department });
    };

    const onStatusChange = (e) => {
        setStatus(e.target.value);
        handleFilter({ search: searchTerm, status: e.target.value, department });
    };

    const onDepartmentChange = (e) => {
        setDepartment(e.target.value);
        handleFilter({ search: searchTerm, status, department: e.target.value });
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
                <input
                    type="text"
                    placeholder="Search by Job Title..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={onSearchChange}
                />
                <select
                    className={styles.selectInput}
                    value={status}
                    onChange={onStatusChange}
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                    <option value="draft">Draft</option>
                </select>
                <select
                    className={styles.selectInput}
                    value={department}
                    onChange={onDepartmentChange}
                >
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                </select>
            </div>

            {/* Optional Sort Dropdown here if needed */}
            <div>
                <select className={styles.selectInput} onChange={(e) => handleFilter({ sort: e.target.value })}>
                    <option value="deadline">Sort: Deadline</option>
                    <option value="applications">Sort: Applications Count</option>
                </select>
            </div>
        </div>
    );
};

export default JobFilterBar;

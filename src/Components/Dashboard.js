import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    //States
        const navigate = useNavigate();
        const [accountRequests, setAccountRequests] = useState([]);
        const [orders, setOrders] = useState([]);
        const [customers, setCustomers] = useState([]);
        const [jobs, setJobs] = useState([]);
        const [revenue, setRevenue] = useState(0);
        const [trucks, setTrucks] = useState([]);
        const [employees, setEmployees] = useState([]);

    // Simulating API calls
    useEffect(() => {
        setAccountRequests([
            { id: 1, name: "John Doe", email: "john@example.com" },
            { id: 2, name: "Jane Smith", email: "jane@example.com" },
        ]);

        setOrders([
            { id: 101, customer: "Alice", status: "Pending", amount: "$300" },
            { id: 102, customer: "Bob", status: "Completed", amount: "$500" },
        ]);

        setCustomers([
            { id: 1, name: "Michael Brown", moves: 3 },
            { id: 2, name: "Sarah Wilson", moves: 1 },
        ]);

        setJobs([
            { id: 201, customer: "Tom", date: "2025-03-10", status: "Scheduled" },
            { id: 202, customer: "Emma", date: "2025-03-12", status: "Completed" },
        ]);

        setRevenue(15000); // Example revenue data

        setTrucks([
            { id: "TX-001", status: "Available", location: "Warehouse A" },
            { id: "TX-002", status: "On Job", location: "Downtown" },
        ]);

        setEmployees([
            { id: 1, name: "Carlos M.", role: "Driver", status: "On Duty" },
            { id: 2, name: "Lisa T.", role: "Mover", status: "Off Duty" },
        ]);
    }, []);

    const approveRequest = (id) => {
        setAccountRequests((prevRequests) =>
            prevRequests.map((req) =>
                req.id === id ? { ...req, status: "approved" } : req
            )
        );
    };

    const rejectRequest = (id) => {
        setAccountRequests((prevRequests) =>
            prevRequests.filter((req) => req.id !== id)
        );
    };

    return (
        <div className="Dashboard-container">
            <div>
                <h1 className="Dashboard-h1">Dashboard</h1>
                <h1 className='Dashboard-h1'>*LOGO*</h1>
            </div>

            {/* Account Requests Section */}
            <div className="Dashboard-section">
                <h2>Account Requests</h2>
                {accountRequests.length === 0 ? <p>No account requests at this time.</p> :
                    <ul>
                        {accountRequests.map(req => (
                            <li key={req.id}>{req.name} - {req.email}</li>
                        ))}
                    </ul>
                }
            </div>

            {/* Orders Section */}
            <div className="Dashboard-section">
                <h2>Orders</h2>
                {orders.length === 0 ? <p>No orders at this time.</p> :
                    <ul>
                        {orders.map(order => (
                            <li key={order.id}>{order.customer} - {order.status} - {order.amount}</li>
                        ))}
                    </ul>
                }
            </div>

            {/* Customers Section */}
            <div className="Dashboard-section">
                <h2>Customers</h2>
                {customers.length === 0 ? <p>No customers at this time.</p> :
                    <ul>
                        {customers.map(customer => (
                            <li key={customer.id}>{customer.name} - {customer.moves} moves</li>
                        ))}
                    </ul>
                }
            </div>

            {/* Job Management Section */}
            <div className="Dashboard-section">
                <h2>Job Management</h2>
                {jobs.length === 0 ? <p>No jobs scheduled.</p> :
                    <ul>
                        {jobs.map(job => (
                            <li key={job.id}>{job.customer} - {job.date} - {job.status}</li>
                        ))}
                    </ul>
                }
            </div>

            {/* Financial Overview */}
            <div className="Dashboard-section">
                <h2>Financial Overview</h2>
                <p>Total Revenue: ${revenue}</p>
            </div>

            {/* Employee Management */}
            <div className="Dashboard-section">
                <h2>Employee Management</h2>
                {employees.length === 0 ? <p>No employees assigned.</p> :
                    <ul>
                        {employees.map(emp => (
                            <li key={emp.id}>{emp.name} - {emp.role} - {emp.status}</li>
                        ))}
                    </ul>
                }
            </div>

            {/* Truck Tracking */}
            <div className="Dashboard-section">

            </div>

            <div className='Dashboard-section-spreadsheet'>
                <h1 className='Dashboard-h1'>Tracking Sheet</h1>
                <table>
                    <tr>
                        <th>Truck ID</th>
                        <th>Status</th>
                        <th>Location</th>
                    </tr>
                    {trucks.map(truck => (
                        <tr key={truck.id}>
                            <td>{truck.id}</td>
                            <td>{truck.status}</td>
                            <td>{truck.location}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}

export default Dashboard;

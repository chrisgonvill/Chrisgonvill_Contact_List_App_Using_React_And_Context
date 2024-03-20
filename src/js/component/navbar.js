import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { actions } = useContext(Context);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newContact, setNewContact] = useState({
        full_name: "",
        email: "",
        address: "",
        phone: "",
        agenda_slug: "christian_slug"
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    const handleCreateSubmit = e => {
        e.preventDefault();
        actions.createContact(newContact);
        setShowCreateForm(false);
        setNewContact({
            full_name: "",
            email: "",
            address: "",
            phone: "",
            agenda_slug: "christian_slug"
        });
    };

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">React Boilerplate</span>
            </Link>
            <div className="ml-auto">
                <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>Create Contact</button>
            </div>
            {showCreateForm && (
                <div className="ml-auto">
                    <form onSubmit={handleCreateSubmit}>
                        <div className="mb-3">
                            <label htmlFor="full_name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="full_name" name="full_name" value={newContact.full_name} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={newContact.email} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" name="address" value={newContact.address} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="phone" name="phone" value={newContact.phone} onChange={handleInputChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            )}
        </nav>
    );
};


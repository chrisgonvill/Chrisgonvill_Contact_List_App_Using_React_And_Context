import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [editingContact, setEditingContact] = useState(null);
	const [showEditForm, setShowEditForm] = useState(false);

	useEffect(() => {
		actions.GetContact();
	}, []);

	const handleEditClick = contact => {
		setEditingContact(contact);
		setShowEditForm(true);
	};

	const handleCancelEdit = () => {
		setEditingContact(null);
		setShowEditForm(false);
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setEditingContact({ ...editingContact, [name]: value });
	};

	const handleEditSubmit = e => {
		e.preventDefault();
		actions.updateContact(editingContact);
		setShowEditForm(false);
	};

	return (
		<div className="container">
			{store.contacts.map((contact, index) => (
				<div className="card mb-3" style={{ maxWidth: "540px" }} key={index}>
					<div className="row g-0">
						<div className="col-md-4">
							<img src="https://www.shutterstock.com/image-vector/contact-icon-vector-illustration-image-260nw-2113299644.jpg" className="img-fluid rounded-start" alt="..." />
						</div>
						<div className="col-md-8">
							<div className="card-body">
								<h5 className="card-title">{contact.full_name}</h5>
								<p className="card-text"><i className="fa-solid fa-location-dot"></i> {contact.address}</p>
								<p className="card-text"><i className="fa-solid fa-envelope"></i> {contact.email}</p>
								<p className="card-text"><i className="fa-solid fa-phone"></i> {contact.phone}</p>
								<button type="button" className="btn btn-primary btn-sm" onClick={() => handleEditClick(contact)}>
									<i className="fa-solid fa-pen-to-square"></i> Edit
								</button>
								<button type="button" className="btn btn-secondary btn-sm mx-5" onClick={() => actions.deleteContact(contact.id)}>
									<i className="fa-solid fa-trash"></i> Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
			{showEditForm && (
				<div className="card mb-3" style={{ maxWidth: "540px" }}>
					<div className="row g-0">
						<div className="col-md-12">
							<form onSubmit={handleEditSubmit}>
								<div className="mb-3">
									<label htmlFor="full_name" className="form-label">Full Name</label>
									<input type="text" className="form-control" id="full_name" name="full_name" value={editingContact.full_name} onChange={handleInputChange} />
								</div>
								<div className="mb-3">
									<label htmlFor="email" className="form-label">Email</label>
									<input type="email" className="form-control" id="email" name="email" value={editingContact.email} onChange={handleInputChange} />
								</div>
								<div className="mb-3">
									<label htmlFor="address" className="form-label">Address</label>
									<input type="text" className="form-control" id="address" name="address" value={editingContact.address} onChange={handleInputChange} />
								</div>
								<div className="mb-3">
									<label htmlFor="phone" className="form-label">Phone</label>
									<input type="text" className="form-control" id="phone" name="phone" value={editingContact.phone} onChange={handleInputChange} />
								</div>
								<button type="submit" className="btn btn-primary">Save</button>
								<button type="button" className="btn btn-secondary mx-3" onClick={handleCancelEdit}>Cancel</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

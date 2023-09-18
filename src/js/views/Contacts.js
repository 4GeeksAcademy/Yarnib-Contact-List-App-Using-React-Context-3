import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		selectedContactId: null // Track the selected contact for deletion
	});
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getContacts();
	}, [store.contacts]);

	// Function to handle contact deletion confirmation
	const handleDeleteConfirmation = (contactId) => {
		setState({ showModal: true, selectedContactId: contactId });
	};

	// Function to delete the selected contact
	const deleteSelectedContact = () => {
		const contactId = state.selectedContactId;
		if (contactId) {
			actions.deleteContact(contactId);
			setState({ showModal: false, selectedContactId: null });
		}
	};

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts.map((contact, index) => (
							<ContactCard
								key={contact.id}
								contact={contact}
								onEdit={() => navigate(`/contacts/${contact.id}`)}
								onDelete={() => handleDeleteConfirmation(contact.id)} // Show confirmation modal
							/>
						))}
					</ul>
				</div>
			</div>
			<Modal
				show={state.showModal}
				onClose={() => setState({ showModal: false, selectedContactId: null })}
				onConfirm={deleteSelectedContact} // Confirm deletion
			/>
		</div>
	);
};

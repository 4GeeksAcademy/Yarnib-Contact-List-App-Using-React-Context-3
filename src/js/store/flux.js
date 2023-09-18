const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			getContacts: () => {
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/yarnib_list")
					.then((response) => {
						if (response.ok) {
							return response.json();
						}
					})
					.then((body) => {
						setStore({
							contacts: body
						});
					});
			},
			// Implement a function to create a new contact
			createContact: (newContact) => {
				newContact.agenda_slug = "yarnib_list"
				fetch("https://playground.4geeks.com/apis/fake/contact", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newContact)
				})
					.then((response) => {
						if (response.ok) {
							return response.json();
						}
					})
					.then((createdContact) => {
						// Update the store with the newly created contact
						setStore({
							contacts: [...getStore().contacts, createdContact]
						});
					});
			},
			// Implement a function to update an existing contact
			updateContact: (contactId, updatedContact) => {
				updatedContact.agenda_slug = "yarnib_list"
				fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updatedContact)
				})
					.then((response) => {
						if (response.ok) {
							return response.json();
						}
					})
					.then((updatedContact) => {
						// Update the store with the updated contact
						const updatedContacts = getStore().contacts.map((contact) =>
							contact.id === contactId ? updatedContact : contact
						);
						setStore({
							contacts: updatedContacts
						});
					});
			},
			// Implement a function to delete a contact
			deleteContact: (contactId) => {
				// Show confirmation modal or ask for confirmation here

				// Send a DELETE request to the API to delete the contact
				fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
					method: "DELETE"
				}).then(() => {
					// Update the store by removing the deleted contact
					const updatedContacts = getStore().contacts.filter((contact) => contact.id !== contactId);
					setStore({
						contacts: updatedContacts
					});
				});
			},
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

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
			contacts:[]
		},
		actions: {
			// Use getActions to call a function within a fuction
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
			},

			GetContact: () => {
				fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/christian_slug`)
					.then((result) => result.json())
					.then((data) => {
						let store = getStore()
						setStore({ ...store, contacts: data });
						console.log("Contacts obtained successfully: ", data);
					})
					.catch((error) => {
						console.log("Error getting contacts: ", error);
					});
			},

			deleteContact: (id) => {
				const actions = getActions();
				fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
					method: "DELETE"
				})
					.then((response) => {
						console.log("Respuesta:", response);
						if (response.ok) {
							actions.GetContact(); // Actualizar contactos después de la eliminación.
							alert("Contacto eliminado exitosamente");
						} else {
							alert("Error al eliminar contacto");
						}
					})
					.catch((error) => {
						console.log("Error:", error);
						alert("Error al eliminar contacto");
					});
			},

			updateContact: async (contact) => {
				const actions= getActions()
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact.id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(contact)
					});

					if (response.ok) {
						const data = await response.json();
						const updatedContactIndex = getStore().contacts.findIndex(c => c.id === data.id);
						const updatedContacts = [...getStore().contacts];
						updatedContacts[updatedContactIndex] = data;
						setStore({ contacts: updatedContacts });
						actions.GetContact();
						alert("Contacto actualizado exitosamente");
					} else {
						alert("Error al actualizar contacto");
					}
				} catch (error) {
					console.log("Error:", error);
					alert("Error al actualizar contacto");
				}
			},
			
			createContact: async (contact) => {
				console.log(contact)
				const actions= getActions()
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(contact)
					});
			
					if (response.ok) {
						actions.GetContact(); 
						alert("Contacto creado exitosamente");
					} else {
						alert("Error al crear contacto");
					}
				} catch (error) {
					alert("Error al crear contacto");
				}
			},

		}
	};
};

export default getState;

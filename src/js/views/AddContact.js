import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const AddContact = () => {
	const params = useParams();
	const history = useNavigate();
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	
	useEffect(() => {
		if("contactId" in params){
			console.log("this is contactid from url", params.contactId);
			fetch(`https://playground.4geeks.com/apis/fake/contact/${params.contactId}`)
				.then(response => response.json())
				.then(data => {
					setFullName(data.full_name);
					setEmail(data.email);
					setPhone(data.phone);
					setAddress(data.address);
				})
				.catch(error => console.error('Error:', error));
		}
	}, []);
	
	const { store, actions } = useContext(Context);
	
	async function addContact(){
		const newContact = {
			full_name: fullName,
			email: email,
			phone: phone,
			address: address,
		};
		if("contactId" in params){
			await actions.updateContact(params.contactId, newContact)
		}else{
			await actions.createContact(newContact);
		}
		history('/');
	}
	
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input type="text" className="form-control" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
					</div>
					<div className="form-group">
						<label>Email</label>
						<input type="email" className="form-control" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input type="phone" className="form-control" placeholder="Enter phone" value={phone} onChange={e => setPhone(e.target.value)} />
					</div>
					<div className="form-group">
						<label>Address</label>
						<input type="text" className="form-control" placeholder="Enter address" value={address} onChange={e => setAddress(e.target.value)} />
					</div>
					<button type="button" onClick={addContact} className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};



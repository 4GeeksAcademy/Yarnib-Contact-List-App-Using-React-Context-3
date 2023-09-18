import React from "react";
import PropTypes from "prop-types";

export const ContactCard = (props) => {
	return (
		<li className="list-group-item">
			<div className="row w-100">
				<div className="col-12 col-sm-6 col-md-3 px-0">
					<img
						src={"https://raw.githubusercontent.com/breatheco-de/exercise-contact-list-context/master/src/img/m101.jpg"}
						alt="Mike Anamendolla"
						className="rounded-circle mx-auto d-block img-fluid"
					/>
				</div>
				<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
					<div className=" float-right">
						<button className="btn" onClick={() => props.onEdit()}>
							<i className="fas fa-pencil-alt mr-3" />
						</button>
						<button className="btn" onClick={() => props.onDelete()}>
							<i className="fas fa-trash-alt" />
						</button>
					</div>
					<label className="name lead">{props.contact && props.contact.full_name}</label>
					<br />
					<i className="fas fa-map-marker-alt text-muted mr-3" />
					<span className="text-muted">{props.contact.address}</span>
					<br />
					<span className="fa fa-phone fa-fw text-muted mr-3" data-toggle="tooltip" title="" data-original-title="(870) 288-4149" />
					<span className="text-muted small">{props.contact.phone}</span>
					<br />
					<span className="fa fa-envelope fa-fw text-muted mr-3" data-toggle="tooltip" title="" />
					<span className="text-muted small text-truncate">{props.contact.email}</span>
				</div>
			</div>
		</li>
	);
};

ContactCard.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	contact: PropTypes.object,
};

ContactCard.defaultProps = {
	onEdit: null,
	onDelete: null,
	contact: null,
};

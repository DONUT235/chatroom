import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class RoomForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			error: '',
		};
	}
	handleChange = ev => {
			const o = {};
			o[ev.target.name] = ev.target.value;
			this.setState(o);
	};
	cancel = () => {
		this.props.toggleForm();
		this.setState({error: ''});
	};
	handleSubmit = ev => {
		ev.preventDefault();
		if((/^[^[\].$#/]+$/).test(this.state.name)) {
			this.props.addChannel(
				this.state.name,
				this.state.description
			);
			this.cancel();
		} else if(this.state.name.length > 0) {
			this.setState({error: 'Room names may not contain [].$#/'});
		} else {
			this.setState({error: 'Room name must not be empty'});
		}
	};
	render() {
		return (
			<div className="RoomForm">
				<form onSubmit={this.handleSubmit}>
					<p>
						<label>Room name</label>
						<input type="text" name="name" onChange={this.handleChange}/>
					</p>
					<p>
						<label>Description</label>
						<input type="text" name="description" onChange={this.handleChange}/>
					</p>
					<div>
						<button type="submit" className={css(style.button)}>Create Room</button>
						<button type="button" onClick={this.cancel} className={css(style.button)}>Cancel</button>
					</div>
				</form>
				<span className={css(style.error)}>{this.state.error}</span>
			</div>
		);
	}
}

const style = StyleSheet.create({
	button: {
		borderRadius: '0.8rem',
		fontSize: '1rem',
		borderWidth:  '0px',
		marginRight: '8px',
		backgroundColor: 'rgb(6, 13, 45)',
		color: 'white',
		':focus': {
			outline: 0,
		},
	},
	error: {
		color: 'red',
	},
});

export default RoomForm;

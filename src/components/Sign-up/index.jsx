import React, { Component } from 'react';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  firstPassword: '',
  secondPassword: '',
};

export default class SignUp extends Component {
  state = { ...INITIAL_STATE };

  handleChangeInputs = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    console.log(this.state);
    e.preventDefault();

    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, email, phone, firstPassword, secondPassword } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Sign up</h2>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChangeInputs}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.handleChangeInputs}
          placeholder="Email"
        />
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={this.handleChangeInputs}
          placeholder="Phone"
        />
        <input
          type="password"
          name="firstPassword"
          value={firstPassword}
          onChange={this.handleChangeInputs}
          placeholder="Password"
        />
        <input
          type="password"
          name="secondPassword"
          value={secondPassword}
          onChange={this.handleChangeInputs}
          placeholder="Password"
        />
        <input type="submit" value="Sign up" />
      </form>
    );
  }
}

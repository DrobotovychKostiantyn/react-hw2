import React, { Component, createRef } from 'react';
import avatar from '../../assets/avatar.png';
import Dropdown from './Dropdown/index';
import s from './userMenu.module.css';

export default class UserMenu extends Component {
  containerRef = createRef();

  state = {
    isDropdownOpen: false,
  };

  componentDidMount() {
    window.addEventListener('click', this.handleWindowClick);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isDropdownOpen !== nextState.isDropdownOpen;
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleWindowClick);
  }

  openDropdown = () => {
    this.setState({
      isDropdownOpen: true,
    });
  };

  closeDropdown = () => {
    this.setState({
      isDropdownOpen: false,
    });
  };

  handleKeyPress = () => {};

  handleWindowClick = ({ target }) => {
    const isTargetInsideContainer = this.containerRef.current.contains(target);

    if (this.state.isDropdownOpen && !isTargetInsideContainer) {
      this.closeDropdown();
    }
  };

  render() {
    const { isDropdownOpen } = this.state;
    return (
      <div
        className={s.userMenu}
        ref={this.containerRef}
        onClick={() => this.openDropdown()}
        role="presentation"
      >
        <img src={avatar} alt="Avatar" className={s.avatar} />
        <p>Bob Ross</p>
        {isDropdownOpen && <Dropdown dropdown={s.dropdown} />}
      </div>
    );
  }
}

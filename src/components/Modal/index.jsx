import React, { Component, createRef } from 'react';
import s from './Modal.module.css';

export default class Modal extends Component {
  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener('click', this.handleBackdropClick);
    window.addEventListener('keydown', this.handleEscapeDown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleBackdropClick);
    window.removeEventListener('keydown', this.handleEscapeDown);
  }

  handleEscapeDown = ({ code }) => {
    if (code !== 'Escape') return;

    this.props.handleCloseClick();
  };

  handleBackdropClick = ({ target }) => {
    if (this.backdropRef.current !== target) return;

    this.props.handleCloseClick();
  };

  render() {
    const { handleCloseClick, children } = this.props;

    return (
      <div className={s.backdrop} ref={this.backdropRef}>
        <div className={s.modal}>
          {children}
          <button type="button" onClick={handleCloseClick}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

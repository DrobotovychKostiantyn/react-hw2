import React, { Component } from 'react';
import Modal from './Modal/index';
import * as Api from './services/api';
import Menu from './Menu/index';
import Loading from './Loading/index';

const date = new Date();

const time = {
  day: date.getDate(),
  month: date.getMonth() + 1,
  year: date.getFullYear(),
};

class App extends Component {
  state = {
    isModalOpenForPost: false,
    isModalOpen: false,
    isModalLoading: false,
    list: [],
    focusListItem: null,
    address: '',
    price: '',
    rating: '',
  };

  handleOpenModal = () => {
    this.setState({
      isModalOpen: true,
      isModalOpenForPost: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
      focusListItem: null,
      isModalOpenForPost: false,
    });
  };

  componentDidMount() {
    Api.getAllList().then(item =>
      this.setState({
        list: item,
      }),
    );
  }

  handleBtnDelete = id => {
    Api.deleteById(id).then(response => {
      if (response.status !== 200) return;
      this.setState(prev => ({
        list: prev.list.filter(el => el.id !== id),
      }));
    });
  };

  handleBtnMore = id => {
    this.setState({
      isModalLoading: true,
    });
    Api.getById(id).then(response => {
      if (response.status !== 200) return;

      this.setState({
        isModalOpen: true,
        isModalLoading: false,
        focusListItem: response.data,
      });
    });
  };

  handleInputValue = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleAddItem = e => {
    e.preventDefault();
    const { address, price, rating } = this.state;

    const value = {
      date: `${time.day}/${time.month}/${time.year}`,
      address,
      price,
      rating,
    };
    Api.addItem(value).then(response => {
      if (response.status !== 201) return;

      Api.getAllList().then(item =>
        this.setState({
          list: item,
          address: null,
          price: null,
          rating: null,
          isModalOpen: false,
          isModalOpenForPost: false,
        }),
      );
    });
  };

  render() {
    const {
      list,
      focusListItem,
      isModalLoading,
      isModalOpenForPost,
      address,
      price,
      rating,
    } = this.state;

    return (
      <div>
        <button type="button" onClick={this.handleOpenModal}>
          Add Item for BD
        </button>
        <Menu
          list={list}
          deleteClick={this.handleBtnDelete}
          moreClick={this.handleBtnMore}
        />

        {isModalOpenForPost && (
          <Modal handleCloseClick={this.handleCloseModal}>
            <form onSubmit={this.handleAddItem}>
              <input
                type="text"
                value={address}
                name="address"
                onChange={this.handleInputValue}
                placeholder="Address"
              />
              <input
                type="number"
                value={price}
                name="price"
                onChange={this.handleInputValue}
                placeholder="Price"
              />
              <input
                type="number"
                value={rating}
                name="rating"
                onChange={this.handleInputValue}
                placeholder="Rating"
              />
              <input type="submit" value="Submit" />
            </form>
          </Modal>
        )}

        {isModalLoading && <Loading />}

        {focusListItem && (
          <Modal handleCloseClick={this.handleCloseModal}>
            {focusListItem && (
              <div>
                <p>Date: {focusListItem.date}</p>
                <p>Price: {focusListItem.price}</p>
                <p>Address: {focusListItem.address}</p>
                <p>Rating: {focusListItem.rating}</p>
              </div>
            )}
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

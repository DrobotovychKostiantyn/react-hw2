import React, { Component } from 'react';

import Table from './TableOrderHistory/index';

import Header from './Header/index';

import FilterMenu from './FilterMenu/index';
import Menu from './Menu/index';

// forms
import SignIn from './Sign-in/index';
import SignUp from './Sign-up/index';

// reviews
import NodeEditor from './NoteEditor/index';
import NodeList from './NodeList/index';

import Modal from './Modal/index';
import * as Api from './services/api';
import History from './History/index';
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
    historyTitles: [],
    listHistory: [],
    focusListItem: null,
    address: '',
    price: '',
    rating: '',
    notes: [],
    menu: [],
    filter: '',
  };

  handleSubmitNodeEditor = (text, rate) => {
    this.setState(prevState => ({
      notes: [{ id: Date.now(), text, rate }, ...prevState.notes],
    }));
  };

  handleChangeFilter = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  filterMenu = filter =>
    this.state.menu.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );

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
    Api.getAllList('history').then(item =>
      this.setState({
        listHistory: item,
      }),
    );
    Api.getAllList('historyTitles').then(item =>
      this.setState({
        historyTitles: item,
      }),
    );
    Api.getAllList('menu').then(item =>
      this.setState({
        menu: item,
      }),
    );
  }

  handleBtnDelete = id => {
    Api.deleteById('history', id).then(response => {
      if (response.status !== 200) return;
      this.setState(prev => ({
        listHistory: prev.listHistory.filter(el => el.id !== id),
      }));
    });
  };

  handleBtnMore = id => {
    this.setState({
      isModalLoading: true,
    });
    Api.getById('history', id).then(response => {
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

    const item = {
      date: `${time.day}/${time.month}/${time.year}`,
      address,
      price,
      rating,
    };
    Api.addItem('history', item).then(response => {
      if (response.status !== 201) return;

      Api.getAllList('history').then(item =>
        this.setState({
          listHistory: item,
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
      listHistory,
      focusListItem,
      isModalLoading,
      isModalOpenForPost,
      address,
      price,
      rating,
      filter,
      notes,
      historyTitles,
    } = this.state;

    const filteredMenu = this.filterMenu(filter);

    return (
      <div>
        <div>
          <Header />
          <hr />
          <Table historyTitles={historyTitles} listHistory={listHistory} />
          <hr />
          <FilterMenu
            filter={filter}
            handleChangeFilter={this.handleChangeFilter}
          />
          <Menu menuList={filteredMenu} />
          <hr />
          <SignIn />
          <SignUp />
          <hr />
          <NodeEditor onSubmit={this.handleSubmitNodeEditor} />
          <NodeList notes={notes} />
        </div>

        <hr />
        <button type="button" onClick={this.handleOpenModal}>
          Add Item for BD
        </button>
        <History
          list={listHistory}
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

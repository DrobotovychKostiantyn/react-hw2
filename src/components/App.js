import React, { Component } from 'react';

import Table from './TableOrderHistory/index';
import Header from './Header/index';
import FilterMenu from './FilterMenu/index';
import Menu from './Menu/index';
import SignIn from './Sign-in/index';
import SignUp from './Sign-up/index';
import NodeEditor from './NoteEditor/index';
import NodeList from './NodeList/index';
import Modal from './Modal/index';
import History from './History/index';
import Loading from './Loading/index';

import * as Api from './services/api';

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

  componentDidMount() {
    Api.getAllList('history').then(list =>
      this.setState({
        listHistory: list,
      }),
    );
    Api.getAllList('historyTitles').then(listTitles =>
      this.setState({
        historyTitles: listTitles,
      }),
    );
    Api.getAllList('menu').then(listMenu =>
      this.setState({
        menu: listMenu,
      }),
    );
  }

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
      isModalLoading: true,
    });
    this.setState({
      isModalLoading: false,
      isModalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleOpenModalForPost = () => {
    this.setState({
      isModalOpenForPost: true,
    });
  };

  handleCloseModalForPost = () => {
    this.setState({
      focusListItem: null,
      isModalOpenForPost: false,
    });
  };

  handleSubmitNodeEditor = (text, rate) => {
    this.setState(prevState => ({
      notes: [{ id: Date.now(), text, rate }, ...prevState.notes],
    }));
  };

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

    const date = new Date();

    const time = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };

    const newItemInList = {
      date: `${time.day}/${time.month}/${time.year}`,
      address,
      price,
      rating,
    };
    Api.addItem('history', newItemInList).then(response => {
      if (response.status !== 201) return;

      Api.getAllList('history').then(allList =>
        this.setState({
          listHistory: allList,
          address: null,
          price: null,
          rating: null,
          isModalOpenForPost: false,
        }),
      );
    });
  };

  render() {
    const {
      listHistory,
      focusListItem,
      isModalOpen,
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
          Open Modal
        </button>

        <hr />
        <button type="button" onClick={this.handleOpenModalForPost}>
          Add Item for BD
        </button>

        {isModalOpen && (
          <Modal handleCloseClick={this.handleCloseModal}>
            <div>
              <p>Fusce egestas elit eget lorem</p>
            </div>
          </Modal>
        )}

        <History
          list={listHistory}
          deleteClick={this.handleBtnDelete}
          moreClick={this.handleBtnMore}
        />

        {isModalOpenForPost && (
          <Modal handleCloseClick={this.handleCloseModalForPost}>
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
          <Modal handleCloseClick={this.handleCloseModalForPost}>
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

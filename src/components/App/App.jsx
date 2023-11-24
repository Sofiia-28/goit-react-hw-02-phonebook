import { Component } from 'react';
import { ContactsForm } from '../ContactsForm/ContactsForm';
import { ContactList } from '../ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from '../Filter/Filter';
import { Wrapper } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newName => {
    const name = {
      ...newName,
      id: nanoid(),
    };
    const isExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newName.name.toLowerCase()
    );
    if (isExist) {
      alert(`${isExist.name} is already in contacts`);
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, name],
        };
      });
    }
  };

  searchFilter = name => {
    this.setState({
      filter: name,
    });
  };

  deleteName = nameId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== nameId),
      };
    });
  };

  getFiltredNames() {
    const { filter, contacts } = this.state;
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  render() {
    const { filter } = this.state;

    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactsForm onAdd={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onSearch={this.searchFilter} />
        <ContactList
          contacts={this.getFiltredNames()}
          onDelete={this.deleteName}
        />
      </Wrapper>
    );
  }
}

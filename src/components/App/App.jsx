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
    this.setState(prevState => {
      const uniqueName = this.state.contacts.find(
        contact => contact.name.toLowerCase() === newName.name.toLowerCase()
      );

      if (uniqueName === undefined) {
        return {
          contacts: [...prevState.contacts, name],
        };
      } else {
        alert(`${uniqueName.name} is already in contacts`);
      }
    });
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

  render() {
    const { contacts, filter } = this.state;

    const visibleNames = contacts.filter(contact => {
      const hasName = contact.name.toLowerCase().includes(filter.toLowerCase());

      return hasName;
    });

    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactsForm onAdd={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onSearch={this.searchFilter} />
        <ContactList contacts={visibleNames} onDelete={this.deleteName} />
      </Wrapper>
    );
  }
}

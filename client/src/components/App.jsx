import React from 'react';
import axios from 'axios';
import style from './styles.css';

import Form from './Form/Form.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'start',
      animal: undefined,
    };

    this.getAnimal = this.getAnimal.bind(this);
    this.addAnimal = this.addAnimal.bind(this);
  }

  componentDidMount() {

  }

  getAnimal(id) {
    axios.get(`/animal/${id}`)
      .then((response) => {
        this.setState({
          animal: response.data.animal,
        });
      })
      .catch((error) => {
        console.log('ERROR: ');
      });
  }

  addAnimal(animal) {
    axios.post('/animal', animal)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('ERROR: ');
      });
  }

  render() {
    const {

    } = this.state;
    return (
      <Form addAnimal={this.addAnimal} />
    );
  }
}

import React from 'react';
import axios from 'axios';
import style from './styles.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    };

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


  render() {
    const {

    } = this.state;
    return (
      <div className={style.app}>
       Zonkey App has loaded!
      </div>
    );
  }
}

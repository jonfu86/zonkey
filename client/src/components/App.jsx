import React from 'react';
import axios from 'axios';
import style from './styles.css';
import Quiz from './Quiz/Quiz.jsx'

import Form from './Form/Form.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: {
        id: 1,
        name: 'zonkey',
        description: 'this is a zonkey',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Zeedonk_800.jpg',
        real: false,
      },
      animalSelection: undefined,
      correctCount: 0,
      totalCount: 0,
      page: 'start',

    };

    this.updateCount = this.updateCount.bind(this);
    this.pickAnimal = this.pickAnimal.bind(this);

  }

  componentDidMount() {
    this.getAnimalCount();
  }

  createAnimalSelection(count) {
    // const { animalCount } = this.state;
    const animalSelection = [];

    for(var i = 1; i <= count; i++) {
      animalSelection.push(i);
    }
    this.setState({
      animalSelection: animalSelection
    })
  }


  pickAnimal() {
    const { animalSelection, totalCount } = this.state;

    if(totalCount === 10) {
      //end quiz
    } else {
      const pick = Math.floor(Math.random() * animalSelection.length) + 1;
      this.getAnimal(pick);
    }
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

  getAnimalCount() {
    // axios.get(`/animalCount`)
    //   .then((response) => {
    //     this.setState({
    //       animalCount: response.data.count,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log('ERROR: ');
    //   });
    this.createAnimalSelection(24);
  }

  updateCount(correct) {
    this.setState( (state) => {
      return {
        totalCount: state.totalCount + 1,
        correctCount: correct ? state.correctCount + 1 : state.correctCount
      }
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
      animal,
      correctCount,
      totalCount
    } = this.state;
    return (
      <div className={style.app}>
        <div className={style.number}>
          {`Number: ${totalCount + 1}`}
        </div>
        <div className={style.score}>
          <span>{`${correctCount}/${totalCount} correct`}</span>
        </div>
        <h1 className={style.title}>Zonkey</h1>

        <Quiz animal={animal} correctCount={correctCount} totalCount={totalCount} updateCount={this.updateCount} pickAnimal={this.pickAnimal}></Quiz>
      </div>
    );
  }
}

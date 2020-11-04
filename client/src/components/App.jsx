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
        // id: 1,
        // name: 'zebra',
        // description: 'this is a zebra',
        // image: 'https://cdn.mos.cms.futurecdn.net/HjFE8NKWuCmgfHCcndJ3rK.jpg',
        // real: false,
        id: undefined,
        name: undefined,
        description: undefined,
        image: undefined,
        real: undefined,
      },
      animalSelection: undefined,
      correctCount: 0,
      totalCount: 0,
      page: 'quiz',

    };

    this.updateCount = this.updateCount.bind(this);
    this.pickAnimal = this.pickAnimal.bind(this);
    this.addAnimal = this.addAnimal.bind(this);
    // this.createAnimalSelection = this.createAnimalSelection.bind(this);

  }

  componentDidMount() {
    // this.getAnimal(1);
    this.getAnimalCount();
  }

  createAnimalSelection(count) {
    const animalSelection = [];

    for (var i = 1; i <= count; i++) {
      animalSelection.push(i);
    }
    this.setState({
      animalSelection: animalSelection
    })
  }


  pickAnimal() {
    const { animalSelection, totalCount } = this.state;

    if (animalSelection.length === 0) {
      //end quiz
      alert('game over');
      // this.setState({ page: 'end' });
    } else {
      const pick = Math.floor(Math.random() * animalSelection.length);
      this.getAnimal(animalSelection[pick]);
    }
  }

  getAnimal(id) {
    axios.get(`/animal/${id}`)
      .then((response) => {
        this.setState((curState) => {

          var index = curState.animalSelection.indexOf(id);
          curState.animalSelection.splice(index, 1);

          return {
            animal: response.data,
            animalSelection: curState.animalSelection
          }

        });
      })
      .catch((error) => {
        console.log('ERROR: ');
      });
  }

  getAnimalCount() {
    axios.get(`/animalCount`)
      .then((response) => {
        this.createAnimalSelection(response.data);
      })
      .then(() => {
        this.pickAnimal();
      })
      .catch((error) => {
        console.log('ERROR: ');
      });

  }

  updateCount(correct) {
    this.setState((state) => {
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
      totalCount,
      page
    } = this.state;

    let load;
    if (page === 'start') {
      load = <Form />;
    } else if (page === 'quiz') {
      load = <Quiz animal={animal} correctCount={correctCount} totalCount={totalCount} updateCount={this.updateCount} pickAnimal={this.pickAnimal} />;
    } else if (page === 'end') {
      load = <End />;
    } else if (page === 'form') {
      load = <Form addAnimal={this.addAnimal} />;
    }

    return (
      <div className={style.app}>
        <div className={style.number}>
          {`Number: ${totalCount + 1}`}
        </div>
        <div className={style.score}>
          <span>{`${correctCount}/${totalCount} correct`}</span>
        </div>
        <h1 className={style.title}>Zonkey</h1>
        {load}

      </div>
    );
  }
}

import React from 'react';
import axios from 'axios';
import style from './styles.css';
import Quiz from './Quiz/Quiz.jsx'

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
      correctCount: 0,
      totalCount: 0

    };
    this.updateCount = this.updateCount.bind(this);

  }

  componentDidMount() {

  }

  pickAnimal(){

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
    axios.get(`/animalCount`)
      .then((response) => {
        this.setState({
          animalCount: response.data.count,
        });
      })
      .catch((error) => {
        console.log('ERROR: ');
      });
  }

  updateCount(correct) {
    console.log('correct ', correct);
    this.setState( (state) => {
      return {
        totalCount: state.totalCount + 1,
        correctCount: correct ? state.correctCount + 1 : state.correctCount
      }
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
          {`Number: ${totalCount}`}
        </div>
        <div className={style.score}>
          <span>{`${correctCount}/${totalCount} correct`}</span>
        </div>
        <h1 className={style.title}>Zonkey</h1>

        <Quiz animal={animal} correctCount={correctCount} totalCount={totalCount} updateCount={this.updateCount}></Quiz>
      </div>
    );
  }
}

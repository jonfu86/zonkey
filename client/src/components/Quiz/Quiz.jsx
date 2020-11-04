import React from 'react';
import style from './styles.css';
import wrong from 'img/wrong.png';
import correct from 'img/correct.png';


export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: undefined
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleButtonClick(e) {
    const { updateCount, animal } = this.props;

    let selection = e.target.innerHTML === 'Real' ? true : false;
    selection = selection === animal.real ? true : false;

    //update overlay and display next button
    this.setState(
      { answer: selection }
    )

    updateCount(selection);


  }

  handleNextClick(e) {
    const { pickAnimal } = this.props;
    pickAnimal();
    this.setState({
      answer: undefined
    })
  }

  render() {
    const {
      animal,
      correctCount,
      totalCount
    } = this.props;

    const {
      answer
    } = this.state;

    let overlay;
    if (answer === true) {
      overlay = <img className={style.overlay} src={correct} />;
    } else if (answer === false) {
      overlay = <img className={style.overlay} src={wrong} />;
    }

    return (
      <div className={style.quiz}>
        {overlay}
        <img src={animal.image} className={style.image} />
        <button className={answer === undefined ? style.hidden : style.nextButton} type="button" onClick={this.handleNextClick}>Next &raquo;</button>
        <div className={style.buttons}>
          <button className={style.fakeButton} disabled={answer !== undefined} type="button" onClick={this.handleButtonClick}>Fake</button>
          <button className={style.realButton} disabled={answer !== undefined} type="button" onClick={this.handleButtonClick}>Real</button>
        </div>
      </div>
    );
  }
}

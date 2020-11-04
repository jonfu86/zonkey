import React from 'react';
import style from './styles.css';

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: undefined
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(e){
    const { updateCount, animal } = this.props;

    let selection = e.target.innerHTML === 'Real' ? true : false ;
    selection = selection === animal.real ? true : false;

    //update overlay and display next button
    this.setState(
      { answer: selection }
    )

    updateCount(selection);


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
    if(answer === true) {
      overlay = <div> CORRECT! </div>;
    } else if (answer === false) {
      overlay = <div> WRONG! </div>;
    }

    return (
      <div className={style.quiz}>
        {overlay}
        <img src={animal.image} className={style.image}/>
        <button className={answer === undefined ? style.hidden : style.nextButton}>Next</button>
        <div className={style.buttons}>
          <button className={style.fakeButton} disabled={answer !== undefined} type="button" onClick={this.handleButtonClick}>Fake</button>
          <button className={style.realButton} disabled={answer !== undefined} type="button" onClick={this.handleButtonClick}>Real</button>
        </div>
      </div>
    );
  }
}

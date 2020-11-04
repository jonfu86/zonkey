import React from 'react';
import style from './styles.css';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      name: undefined,
      description: undefined,
      image: undefined,
      real: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.id]: e.target.value
      }
    )
  }

  handleSubmit(e) {
    const { addAnimal } = this.props;
    addAnimal(this.state);
  }


  render() {
    return (
      <div className={style.form}>
        <label>id</label>
        <input id="id" type="text" onChange={this.handleChange} />
        <label>name</label>
        <input id="name" type="text" onChange={this.handleChange} />
        <label>description</label>
        <input id="description" type="text" onChange={this.handleChange} />
        <label>image</label>
        <input id="image" type="text" onChange={this.handleChange} />
        <label>Does this animal exist?</label>
        <select id="real" type="text" onChange={this.handleChange} >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <button type="button" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getRadio, saveRadio } from "../services/radioService";
import { getGenres } from "../services/genreService";

class NewForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
    dailyRentalRate: Joi.number().max(10).required().label("Rate"),
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateRadios() {
    try {
      const radioId = this.props.match.params.id;
      if (radioId === "new") return;
      const { data: radio } = await getRadio(radioId);
      this.setState({ data: this.mapToViewModel(radio) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    this.populateGenres();
    this.populateRadios();
  }
  mapToViewModel(radio) {
    return {
      _id: radio._id,
      title: radio.title,
      genreId: radio.genre._id,
      numberInStock: radio.numberInStock,
      dailyRentalRate: radio.dailyRentalRate,
    };
  }
  doSubmit = async() => {
    await saveRadio(this.state.data);
    this.props.history.push("/shop");
  };

  render() {
    const { errors: error } = this.state;

    return (
      <div>
        <h1>Radio Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <div className="form-group">
            <label htmlFor="genreId">Genre</label>
            <select
              name="genreId"
              onChange={this.handleChange}
              value={this.state.data.genreId}
              className="form-control"
              id="genreId"
              error={this.state.errors.genreId}
            >
              <option value="" />
              {this.state.genres.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            {error.genreId && (
              <div className="alert alert-danger">{error.genreId}</div>
            )}
          </div>
          {this.renderInput("numberInStock", "Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewForm;

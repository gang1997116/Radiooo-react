import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getRadio} from "../services/radioService";
import { getGenres } from "../services/genreService";

class NewForm extends Form {
  state = {
    data: {
      n: "",
      d: "",
      c: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    i: Joi.string(),
    n: Joi.string().required().label("Title"),
    d: Joi.string().required().label("Genre"),
    c: Joi.string().required().label("Country"),
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres:genres.results });
  }
  async populateRadios() {
    try {
      const radioId = this.props.match.params.id;
      if (radioId === "new") return;
      const { data: radio } = await getRadio(radioId);
      this.setState({ data: this.mapToViewModel(radio.results) });
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
      i: radio.i,
      n: radio.n,
      d: radio.d,
      c: radio.c,
    };
  }
  doSubmit = async() => {
    //await saveRadio(this.state.data);
    this.props.history.push("/shop");
  };

  render() {
    const { errors: error } = this.state;

    return (
      <div>
        <h1>Radio Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("n", "Title")}
          <div className="form-group">
            <label htmlFor="genreId">Genre</label>
            <select
              name="genreId"
              onChange={this.handleChange}
              value={this.state.data.d}
              className="form-control"
              id="genreId"
              error={this.state.errors.d}
            >
              <option value="" />
              {this.state.genres.map((option) => (
                <option key={option.i} value={option.i}>
                  {option.c}
                </option>
              ))}
            </select>
            {error.d && (
              <div className="alert alert-danger">{error.d}</div>
            )}
          </div>
          {this.renderInput("c", "Country")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewForm;

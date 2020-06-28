import React, { Component } from "react";
import { getRadios, deleteRadio } from "../services/radioService";
import { getGenres } from "../services/genreService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import RadiosTable from "./radiosTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class radios extends Component {
  state = {
    radios: [],
    genres: [],
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: radios } = await getRadios();
    this.setState({ radios, genres });
  }

  handleDelete = async (radio) => {
    const originalradios = this.state.radios;
    const radios = this.state.radios.filter((m) => m._id !== radio._id);
    this.setState({ radios });
    try {
      await deleteRadio(radio._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This radio has already been deleted.");
        this.setState({ radios: originalradios });
      }
    }
  };
  handleLike = (radio) => {
    const radios = [...this.state.radios];
    const index = radios.indexOf(radio);
    radios[index] = { ...radios[index] };
    radios[index].liked = !radios[index].liked;
    this.setState({ radios });
    //console.log('like clicked',radio);
  };
  handlePagechange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPagedData = () => {
    const {
      radios: allradios,
      selectedGenre,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allradios;
    if (searchQuery)
      filtered = allradios.filter(
        (m) => m.title.toLowerCase().indexOf(searchQuery.toLowerCase()) === 0
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allradios.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const radios = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, radios: radios };
  };

  render() {
    //const { length: count } = this.state.radios;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    //if (count === 0) return <p>There are no radios in the database</p>;

    const { totalCount, radios } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="/shop/new">
              <button className="btn btn-primary">New Radio</button>
            </Link>
          )}
          <p>Finding {totalCount} radios in the database.</p>
          <input
            className="form-control"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => this.handleSearch(e.currentTarget.value)}
          />
          <RadiosTable
            radios={radios}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePagechange}
          />
        </div>
      </div>
    );
  }
}

export default radios;

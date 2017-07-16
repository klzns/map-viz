import React, { Component } from "react";
import PropTypes from "prop-types";
import ControlBox from "../ControlBox";
import Autocomplete from "../AutoComplete";
import axios from "axios";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      courses: [],
      loading: true
    };

    this.requestToken = null;
  }

  componentDidMount() {
    this.requestToken = axios.CancelToken.source();
    axios("/api/courses", {
      cancelToken: this.requestToken.token
    }).then(response => {
      this.setState({
        loading: false,
        courses: response.data.courses
      });
    });
  }

  componentWillUnmount() {
    if (this.requestToken) {
      this.requestToken.cancel();
    }
  }

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <ControlBox title={"Cursos"}>
        {this.state.loading
          ? "Carregando"
          : <Autocomplete
              value={this.state.value}
              items={this.state.courses}
              onChange={this.handleChange}
            />}
      </ControlBox>
    );
  }
}

Courses.propTypes = {};

export default Courses;

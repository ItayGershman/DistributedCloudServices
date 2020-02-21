import React, { useState, useEffect, Component } from "react";
import AddItem from "./Components/AddItem";
import axios from "axios";
import BackgroundImage from "./images/backgroundimage.png";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import ItemList from "./Components/ItemsList";
import Image from "./Components/Image";

const styles = theme => ({
  text: {
    position: "absolute",
    left: "45.00%",
    top: "54px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "26px",
    lineHeight: "30px",
    textTransform: "uppercase",
    color: "#FFFFFF"
  },
  body: {
    position: "absolute",
    background: "#FD5842",
    width: "100%",
    height: "100%"
  },
  backgroundImage: {
    marginLeft: "100px",
    marginTop: "164px",
    height: "700px",
    backgroundImage: `url('${BackgroundImage}') `,
    width: "90%",
    backgroundRepeat: "no-repeat",
    border: "1px solid #171932",
    boxSizing: "border-box",
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.1)"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
      const items = res.data;
      this.setState({ items });
    });
  }

  onAdd(title, body) {
    axios.post(`https://jsonplaceholder.typicode.com/posts`, { title,body })
    .then(res => {
      this.setState({items : [...this.state.items, res.data]})
    })
    .catch(err =>console.errpr(err));
    }

  onDelete(id) {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => {
      this.setState({items: [...this.state.items.filter(item => item.id !== id)]})})
    .catch(res => console.error(res));
  }

  onEditSubmit(title, id, userId, body) {

    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,{
      title:title,
      id:id,
      userId:userId,
      body:body
    })
    .then(res => this.setState(prevState => ({
      items: prevState.items.map(
        item => item.id !== res.data.id ? item : res.data
      )})))
    .catch(err => console.error(err))
    }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.body}>
        <p className={classes.text}> Itay Gershman</p>

        <div className={classes.backgroundImage}>
          <div style={{ display: "flex" }}>
            <AddItem onAdd={this.onAdd} />
            <Image />
            <ItemList
              {...this.state.items}
              onEditSubmit={this.onEditSubmit}
              onDelete={this.onDelete}
              onChange={this.onChange}
              items={this.state.items}
            />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);

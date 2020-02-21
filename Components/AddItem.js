import React, { Component } from "react";
import { FaPlusCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  fields: {
    width: 327,
    height: 48,
    background: "#FFFFFF",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
    marginTop: 18,
    marginLeft: 17,
    marginRight: 18
  },
  descriptionField: {
    width: 327,
    height: 151,
    background: "#FFFFFF",
    marginTop: 18,
    marginLeft: 17,
    marginRight: 18,
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
    boxSizing: "border-box"
  },
  formBackground: {
    width: 362,
    height: 378,
    marginLeft: 87,
    marginTop: 108,
    background: "rgba(23, 25, 50, 0.6)",
    boxShadow: "0px 4px 14px rgba(23, 25, 50, 0.5)",
    borderRadius: 10
  },
  submit: {
    width: 54,
    height: 54,
    color: "#FD5842",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: 341,
    borderRadius: 50,
    top: 623
  }
});

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onAdd(
      this.titleInput.value,
      this.idInput.value,
      this.userIDInput.value,
      this.bodyInput.value
    );

    this.titleInput.value = "";
    this.idInput.value = "";
    this.userIDInput.value = "";
    this.bodyInput.value = "";
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.onSubmit} className={classes.formBackground}>
        <input className={classes.fields} placeholder="Title" ref={titleInput => (this.titleInput = titleInput)}></input>
        <input className={classes.fields} placeholder="ID" ref={idInput => (this.idInput = idInput)}></input>
        <input className={classes.fields} placeholder="userID" ref={userIDInput => (this.userIDInput = userIDInput)}></input>
        <textarea className={classes.descriptionField} placeholder="Description" ref={bodyInput => (this.bodyInput = bodyInput)}></textarea>
        <FaPlusCircle 
              className={classes.submit}
              type="submit"
              onClick={this.onSubmit}
            />
      </form>
    );
  }
}

AddItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddItem);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import {
  Grid,
  List,
  ListItemSecondaryAction,
  ListItem,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { FaPlusCircle } from "react-icons/fa";

const styles = theme => ({
  list: {
    width: 362,
    height: 378,
    marginLeft: "112px",
    marginTop: 108,
    background: "rgba(23, 25, 50, 0.6)",
    boxShadow: "0px 4px 14px rgba(23, 25, 50, 0.5)",
    borderRadius: 10,
    maxHeight: "100%",
    overflow: "auto"
  },
  delete: {
    color: "#FD5842"
  },
  edit: {
    color: "#FFFFFF"
  },
  text: {
    color: "#FFFFFF"
  },
  line: {
    color: "#FFFFFF",
    width: 362,
    border: "1px solid ",
    marginTop: "10px"
  },
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
    // marginLeft: 87,
    // marginTop: 108,
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
    left: 154,
    borderRadius: 50,
    top: 355
  }
});

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };

    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selected = "";
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onEditSubmit(
      this.titleInput.value,
      this.bodyInput.value
    );
    this.setState({editing: false});
  }

  handleChange(){
      console.log("Change");
  }

  delete() {
    this.props.onDelete(this.selected.id);
  }

  edit() {
    this.setState({ editing: true });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} md={4}>
        <div className={classes.list}>
          <List>
            {this.state.editing ? (
              <form onSubmit={this.onSubmit} className={classes.formBackground}>
                <input
                  className={classes.fields}
                  placeholder="Title"
                  ref={titleInput => (this.titleInput = titleInput)}
                  defaultValue={this.selected.title}
                ></input>
                <input
                  className={classes.fields}
                  placeholder="ID"
                  ref={idInput => (this.idInput = idInput)}
                  value={this.selected.id}
                  onChange={this.handleChange}
                ></input>
                <input
                  className={classes.fields}
                  placeholder="userID"
                  ref={userIDInput => (this.userIDInput = userIDInput)}
                  value={this.selected.userId}
                  onChange={this.handleChange}
                ></input>
                <textarea
                  className={classes.descriptionField}
                  placeholder="Description"
                  ref={bodyInput => (this.bodyInput = bodyInput)}
                  defaultValue={this.selected.body}
                ></textarea>
                <FaPlusCircle
                  className={classes.submit}
                  type="submit"
                  onClick={this.onSubmit}
                />
              </form>
            ) : (
              <div>
                {this.props.items.map(item => {
                  return (
                    <div>
                      <List>
                        <ListItem>
                          <span className={classes.text}>{item.title}</span>
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                              <EditIcon
                                onClick={() => {
                                  this.selected = item;
                                  this.edit();
                                }}
                                className={classes.edit}
                              />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon
                                onClick={() => {
                                  this.selected = item;
                                  this.delete();
                                }}
                                className={classes.delete}
                              />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <div className={classes.line}></div>
                      </List>
                    </div>
                  );
                })}
              </div>
            )}
          </List>
        </div>
      </Grid>
    );
  }
}

ItemList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemList);

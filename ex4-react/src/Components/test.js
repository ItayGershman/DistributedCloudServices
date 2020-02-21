import React, { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  formContainer: {
    maxWidth: "30%",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  input: {
    minWidth: "100%"
  }
});
const professions = ["Other", "Plumber", "Painter", "Electrition"];

const Signup = () => {
  const [post, setPost] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const handleSelect = async value => {
    console.log(value);
  };
  const [initial, setInitial] = useState(true);
  
  // async function postData(){
  //   try {
  //      await fetch( 'https://hands-app.herokuapp.com/user/signup', {
  //       method: 'POST',
  //       body : JSON.stringify({
  //         first_name: firstName,
  //         last_name : lastName,
  //         email: email,
  //         password: password,
  //         location: address,
  //         profession: profession
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8"
  //       }
  //     }).then(response => response.json())
  //     .then(json => console.log(json))
  //   }catch(err){
  //     console.log('error while posting data',err);
  //   }
  // }
  const fetchPost = async () => {
    try {
      const respons = await axios.get(
        "https://hands-app.herokuapp.com/request/showAll"
      );
     console.log(respons)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  },[]);
  console.log(post);

  const handleSubmit = () => {
    let flag = true;
    setInitial(false);
    if (
      !email ||
      email.lastIndexOf("@") === -1 ||
      email.lastIndexOf(".") === -1
    ) {
      console.log("check");
      setValidEmail(true);
      flag = false;
    }
    if (!firstName || !lastName || password.length < 8 || !address) {
      console.log("there is an error");
      flag = false;
    }
    if (flag) {
      console.log("no error");
    }
  };
  const classes = useStyles();
  return (
    <form className={classes.formContainer}>
      <div>
        <TextField
          id="outlined-helperText"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          error={!firstName && !initial}
          helperText={!firstName && !initial ? "first name required" : ""}
        />
        <TextField
          id="outlined-helperText"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          error={!lastName && !initial}
          helperText={!lastName && !initial ? "last name required" : ""}
        />
      </div>
      <div>
        <TextField
          className={classes.input}
          id="outlined-helperText"
          label="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={validEmail}
          helperText={validEmail ? "invalid email!" : ""}
        />
      </div>
      <div>
        <TextField
          className={classes.input}
          id="outlined-helperText"
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          error={password.length < 8 && !initial}
          helperText={
            password.length < 8 && !initial ? "invalid password!" : ""
          }
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <TextField
                className={classes.input}
                id="outlined-helperText"
                label="Location"
                variant="outlined"
                error={!address && !initial}
                helperText={!address && !initial ? "location required" : ""}
                {...getInputProps()}
              />
              <div>
                {suggestions.map(suggestion => {
                  return (
                    <div {...getSuggestionItemProps(suggestion)}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
      <div>
        <FormControl variant="outlined" className={classes.input}>
          <InputLabel> Profession </InputLabel>
          <Select
            native
            labelWidth={80}
            value={profession}
            onChange={e => setProfession(e.target.value)}
            inputProps={{
              name: "profession"
            }}
          >
            <option value="" />
            {professions.map(pro => (
              <option key={pro} value={pro}>
                {pro}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>

      <Button onClick={handleSubmit} variant="contained">
        SIGN UP
      </Button>
    </form>
  );
};

export default Signup;
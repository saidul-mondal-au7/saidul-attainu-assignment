import React, { useState, useContext } from 'react';
import { GlobalContext } from "../../context/GlobalState";
import { v4 as uuid } from "uuid";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const AddUser = () => {
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const { addUser } = useContext(GlobalContext);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      Id: uuid(),
      'Full Name': fullName,
      Country: country,
      'Date of birth': dateOfBirth,
      Email: email
    }
    addUser(newUser);
    history.push("/");
  }

  const AddFullName = (e) => {
    setFullName(e.target.value);
  }
  const AddCountry = (e) => {
    setCountry(e.target.value);
  }
  const AddDateOfBirth = (e) => {
    setDateOfBirth(e.target.value);
  }
  const AddEmail = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div style={{ maxWidth: "30rem", margin: "4rem auto" }}>
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Full Name</Label>
        <Input type="text" value={fullName} onChange={AddFullName} name="fullName" placeholder="Enter Full Name" required></Input>
        <Label>Country</Label>
        <Input type="text" value={country} onChange={AddCountry} name="country" placeholder="Enter Country" required></Input>
        <Label>Date of birth</Label>
        <Input type="date" value={dateOfBirth} onChange={AddDateOfBirth} name="dateOfBirth" placeholder="Enter DOB" required></Input>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={AddEmail} name="email" placeholder="Enter Email" required></Input>
      </FormGroup>
      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
    </div>
  )
}

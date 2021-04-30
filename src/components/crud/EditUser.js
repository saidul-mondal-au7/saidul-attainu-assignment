import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from "../../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const EditUser = (props) => {
  const { editUser, data } = useContext(GlobalContext);
  const [selectedUser, setSelectedUser] = useState({
    Id: '',
    'Full Name': '',
    Country: '',
    'Date of birth': '',
    Email: ''
  })
  const history = useHistory();
  const currentUserId = props.match.params.id;
  // console.log(currentUserId)
  useEffect(() => {
    const userId = currentUserId;
    console.log(userId)
    const selectedUser = data.find(user => user.Id == userId);
    // console.log(selectedUser)
    setSelectedUser(selectedUser);
  }, [currentUserId, data])

  const onChange = (event) => {
    setSelectedUser({ ...selectedUser, [event.target.name]: event.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    editUser(selectedUser);
    history.push("/")
  }

  return (
    <div style={{ maxWidth: "30rem", margin: "4rem auto" }}>
    <Form onSubmit={onSubmit}>
      <FormGroup>
      <Label>Full Name</Label>
      <Input type="text" value={selectedUser['Full Name']} onChange={onChange} name="Full Name" placeholder="Enter Full Name" required></Input>
      <Label>Country</Label>
      <Input type="text" value={selectedUser.Country} onChange={onChange} name="Country" placeholder="Enter Country" required></Input>
      <Label>Date of birth</Label>
      <Input type="date" value={selectedUser['Date of birth']} onChange={onChange} name="Date of birth" placeholder="Enter DOB" required></Input>
      <Label>Email</Label>
      <Input type="email" value={selectedUser.Email} onChange={onChange} name="Email" placeholder="Enter Email" required></Input>
      </FormGroup>
      <Button type="submit">Edit Name</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
    </div>
  )
}
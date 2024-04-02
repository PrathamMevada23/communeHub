import React, { useState, useEffect } from "react";
import { styled, IconButton } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
// import { deleteUser } from "../api";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#36393f",
  // padding: "20px",
});

const Heading = styled("h1")({
  color: "#fff",
  marginBottom: "20px",
});

const Table = styled("table")({
  width: "70%",
  borderCollapse: "collapse",
  marginTop: "20px",
});

const Th = styled("th")({
  padding: "12px",
  backgroundColor: "#212121",
  color: "#fff",
  textAlign: "center",
});

const Td = styled("td")({
  padding: "10px",
  borderBottom: "1px solid #fff",
  color: "#fff",
  textAlign: "center"
});

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userDetails = localStorage.getItem('user');
        const token = userDetails ? JSON.parse(userDetails).token : "";
    
        const response = await axios.get('http://localhost:5002/api/admin/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    
    // Call the function to make the request
    fetchUsers();
  }, []);

  // const deleteUser = async(userId) => {
  //   try{
  //     await axios.delete(`http://localhost:5002/api/users/${userId}`);

  //     setUsers(users.filter(user => user._id !== userId));
  //     console.log("user deleted successfully!");
  //   } catch (error){
  //     console.error("error deleting user:",error);
  //   }
  // }
  
  

  return (
    <Wrapper>
      <Heading>Welcome to Admin Panel</Heading>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Email</Th>
            <Th>Username</Th>
            <Th>Delete</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <Td>{user._id}</Td>
              <Td>{user.email}</Td>
              <Td>{user.username}</Td>
              <Td>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default AdminPanel;

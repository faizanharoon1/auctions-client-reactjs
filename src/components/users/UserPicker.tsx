
import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { User } from '../../models/user-model';
import { useUser } from '../../store/UserContext';

const users:User[] = [
  {  name: 'John' },
  { name: 'Dave' }
];

export function UserPicker() {
      const { user, setUser } = useUser();

  const [selectedUser, setSelectedUser] = React.useState(user.name);


 const handleChange = (event: SelectChangeEvent) => {
 const userName = event.target.value as string; // Explicitly cast the value to string
    setSelectedUser(userName);
    const user = users.find(user => user.name === userName);
    if (user) {
      setUser(user);
    }
  };


  
  return (
     <Box sx={{fontSize:12, height:50,width:110, backgroundColor:"white"}} >
              <FormControl sx={{ m: 1, minWidth:90 }} size="small">
      <InputLabel >Pick a user</InputLabel>
      <Select
        labelId="user-picker-label"
        value={selectedUser}
        label="Pick a user"
        onChange={handleChange}
      >
        <MenuItem value="" disabled>
          Pick a user...
        </MenuItem>
        {users.map(user => (
          <MenuItem key={user.name} value={user.name}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
     {user ? <h2>Current User: {user.name}</h2> : <h2>No user selected</h2>}
     </Box>

  );
};

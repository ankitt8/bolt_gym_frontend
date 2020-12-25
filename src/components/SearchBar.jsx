import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: '0px 10px',
    height: 40,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

}));

export default function SearchBar() {
  const classes = useStyles();
  function searchUser(name) {
    const userList = document.querySelector('.userList').children;
    // console.log(userList);
    Array.from(userList).forEach((userCard) => {
      // eslint-disable-next-line no-param-reassign
      if (!userCard.dataset.name.toLowerCase().includes(name.toLowerCase())) userCard.style.display = 'none';
      // eslint-disable-next-line no-param-reassign
      else userCard.style.display = '';
    });
  }
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search User"
        inputProps={{ 'aria-label': 'search user' }}
        onKeyUp={(e) => searchUser(e.target.value.toLowerCase())}
      />
    </Paper>
  );
}

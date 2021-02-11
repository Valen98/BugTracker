import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import './SortBy.css'

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

function SortBy() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [orderBy, setOrderBy] = useState('createdAt')
    sessionStorage.setItem('sorter', orderBy)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    //TODO: FIX THE ORDERBY IN BugTracker.js
    return (
        <div className="sortButton">
          <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          className="sortButton"
        >
          Order By
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            <ListItemText primary="CreatedAt" onClick={() => setOrderBy('createdAt')} />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemText primary="DueDate" onClick={() => setOrderBy('dueDate')} />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemText primary="User"   onClick={() => setOrderBy('displayName')}/>
          </StyledMenuItem>
        </StyledMenu>
        </div>

    )
    
}

export default SortBy

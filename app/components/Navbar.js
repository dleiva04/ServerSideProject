import '../scss/components/Navbar.scss';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const classes = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nav:{
    display: flex,
  }
}));

const Navbar = () => (
	<AppBar position='static' className={classes.nav}>
		<Toolbar>
			<Typography variant='h6' className={classes.title}>
				News
			</Typography>
			<Button color='inherit'>Login</Button>
		</Toolbar>
	</AppBar>
);

export default Navbar;

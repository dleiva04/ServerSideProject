import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Person from '@material-ui/icons/Person';

import "../scss/components/Navbar.scss";

const Navbar = () => (
	<AppBar position="static" className={'nav'} color="default">
		<Toolbar>
      <img src="../static/sf.png" alt="Solé Fashion" height={35} className={'toolbar'}/>
      {/* <IconButton aria-label="Show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton> */}
      <IconButton aria-label="Show 4 new mails" color="inherit">
            <Person color="primary"/>
        </IconButton>
		</Toolbar>
	</AppBar>
);

export default Navbar;

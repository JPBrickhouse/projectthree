import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography"


function Nav() {
  return (
    <AppBar>
      <ToolBar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          No Alternatives - Just Facts
      </Typography>
        <Button>
          Login
      </Button>
      </ToolBar>
    </AppBar>
  );
}

export default Nav;

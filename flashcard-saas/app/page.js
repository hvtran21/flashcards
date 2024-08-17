

import {
AppBar,
Toolbar,
Typography,
Button
} from "@mui/material";

import {
  SignedIn, SignedOut, UserButton
} from "@clerk/nextjs";


export default function App() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Flashcard SaaS
        </Typography>
        <SignedOut>
          <Button color="inherit" href="/sign-in">
            Login
          </Button>
          <Button color="inherit" href="/sign-up">
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}

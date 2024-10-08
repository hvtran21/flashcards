"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import {
  doc,
  getDoc,
  writeBatch,
  collection,
  addDoc,
} from "firebase/firestore";
import db from "../../utils/firebase";

import { useUser } from "@clerk/nextjs";

export default function Generate() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  const [flippedIndex, setFlippedIndex] = useState(null);

  // handles saving flashcards to the firebase database
  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    if (!user) {
      alert("Please sign in");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
    } catch (error) {
      console.log("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  // function to handle when a user clicks on a flashcard, it'll display the back
  const handleClick = (index) => {
    setFlippedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // handles submit button, using text given in the text box
  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ bgcolor: "white", p: 3 }}>
      {flashcards.length > 0 && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            Save Flashcards
          </Button>
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Save Flashcard Set</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your flashcard set.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Set Name"
                type="text"
                fullWidth
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={saveFlashcards} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4, bgcolor: "white", p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Flashcards
            </Typography>
            <Grid container spacing={2}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    onClick={() => handleClick(index)}
                    sx={{ cursor: "pointer", padding: 2 }}
                  >
                    <CardContent>
                      <Typography variant="h6">
                        {flippedIndex === index ? "Back" : "Front"}:
                      </Typography>
                      <Typography>
                        {flippedIndex === index
                          ? flashcard.back
                          : flashcard.front}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}

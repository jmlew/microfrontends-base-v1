import { Box, Button, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { ChangeEvent, MouseEvent, useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: theme.spacing(2),
  },
  input: {
    display: 'flex',
    flexGrow: 1,
  },
}));

interface CommToAppFormProps {
  onSendMessage: (message: string) => void;
}
export default function CommToAppForm({ onSendMessage }: CommToAppFormProps) {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  function handleMessageChange(event: ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  function handleSubmit(event: MouseEvent) {
    onSendMessage(message);
  }

  return (
    <Box display="flex">
      <TextField
        className={classes.input}
        size="small"
        label="Message to Orange App"
        value={message}
        onChange={handleMessageChange}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={!message}
        onClick={handleSubmit}
      >
        Send Message
      </Button>
    </Box>
  );
}

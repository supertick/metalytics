import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { uploadData } from 'aws-amplify/storage';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

const StyledInput = styled('input')({
  display: 'none', // Hide the actual input
});

function App({ signOut, user }) {
  const [fileData, setFileData] = useState(null);
  const [fileStatus, setFileStatus] = useState(false);

  const uploadFile = async () => {
    if (!fileData) return; // Ensure there is file data to upload

    const filePath = `public/album/${new Date().getFullYear()}/${fileData.name}`;

    try {
      const result = await uploadData({
        path: filePath,
        data: fileData
      }).result;
      console.log('Succeeded: ', result);
      setFileStatus(true);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#b3e5fc' }}>
      <div style={{ textAlign: 'center' }}>
        <img src="/metalytics.jpg" alt="logo" />
        <h1>MFA Light Upload</h1>
        {/*
        <h3>Hello {user.username}</h3>
        */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <label htmlFor="contained-button-file">
            <StyledInput
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => {
                setFileData(e.target.files[0]);
                setFileStatus(false); // Reset upload status on new file selection
              }}
            />
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
          {fileData && (
            <Button variant="contained" color="secondary" onClick={uploadFile}>
              Upload File
            </Button>
          )}
                    <Button variant="contained" color="primary" onClick={signOut}>
            Sign out
          </Button>

        </div>
        {fileStatus && <p>File uploaded successfully</p>}
      </div>
    </div>
  );
  
}

export default withAuthenticator(App);

import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import '../AddDataForm.css';

import {Modal, Box, Typography, TextField, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {toast, ToastContainer} from 'react-toastify';

function AddDataForm({setOpenAddDataForm, openAddDataForm, darkMode}) {
  const [seriennr, setSeriennr] = useState('');
  const [gehortzu, setGehortzu] = useState('');
  const [anlagenID, setAnlagenID] = useState('');
  const [anlagenbez, setAnlagenbez] = useState('');
  const [typModell, setTypModell] = useState('');
  const [hersteller, setHersteller] = useState('');
  const [lieferant, setLieferant] = useState('');
  const [servicestelle, setServicestelle] = useState('');
  const [abteilung, setAbteilung] = useState('');
  const [kostenstelle, setKostenstelle] = useState('');
  const [SLA, setSLA] = useState('');
  const [preisProSLA, setpreisProSLA] = useState('');
  const [status, setStatus] = useState('');
  const [raumbezMT, setRaumbezMT] = useState('');

  const handleSubmitForm = async () => {
    try {
      const reqData = {
        seriennr,
        gehortzu,
        anlagenID,
        anlagenbez,
        typModell,
        hersteller,
        lieferant,
        servicestelle,
        abteilung,
        kostenstelle,
        SLA,
        preisProSLA,
        status,
        raumbezMT
      };
      if (!reqData.anlagenID) {
        return toast.error('Anlagen-ID Should not be empty');
      }
      const response = await axios.post('http://localhost:8080/api/devices', reqData);

      setOpenAddDataForm(false);
      !!response.data && toast.success('Data is added successfully');
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  return (
    <Modal
      open={openAddDataForm}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box className={darkMode ? 'dark-mode data-form' : 'light-mode data-form'}>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            '&:hover svg': {
              cursor: 'pointer',
              color: 'red'
            }
          }}
          onClick={() => setOpenAddDataForm(false)}
        >
          <CloseIcon />
        </Box>
        <Typography variant="h5" className="title">
          Add Data in Device
        </Typography>
        <Box className="form-container">
          <Box className="row">
            <Box className="input-container">
              <TextField
                fullWidth
                label="ANLAGEN-ID"
                name="anlagenID"
                value={anlagenID}
                onChange={(e) => setAnlagenID(e.target.value)}
                margin="normal"
                placeholder="ID"
              />
            </Box>
            <Box className="input-container">
              <TextField
                fullWidth
                label="SERIENNR."
                name="seriennr"
                type="text"
                value={seriennr}
                onChange={(e) => setSeriennr(e.target.value)}
                margin="normal"
                placeholder="Sr.No."
              />
            </Box>
          </Box>
          <Box className="row">
            <Box className="input-container">
              <TextField
                fullWidth
                label="Gehort zu"
                value={gehortzu}
                onChange={(e) => setGehortzu(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
            <Box className="input-container">
              <TextField
                fullWidth
                label="Anlagenbez"
                value={anlagenbez}
                onChange={(e) => setAnlagenbez(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
          </Box>
          <Box className="row">
            <Box className="input-container">
              <TextField
                fullWidth
                label="Typ/Model"
                value={typModell}
                onChange={(e) => setTypModell(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
            <Box className="input-container">
              <TextField
                fullWidth
                label="Hersteller"
                value={hersteller}
                onChange={(e) => setHersteller(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
          </Box>
          <Box className="row">
            <Box className="input-container">
              <TextField
                fullWidth
                label="Lieferant"
                value={lieferant}
                onChange={(e) => setLieferant(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
            <Box className="input-container">
              <TextField
                fullWidth
                label="Servicestelle"
                value={servicestelle}
                onChange={(e) => setServicestelle(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
          </Box>
          <Box className="row">
            <Box className="input-container">
              <TextField
                fullWidth
                label="Abteilung"
                value={abteilung}
                onChange={(e) => setAbteilung(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
            <Box className="input-container">
              <TextField
                fullWidth
                label="Kostenstelle"
                value={kostenstelle}
                onChange={(e) => setKostenstelle(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
          </Box>
          <Box className="row">
            <Box className="input-container">
              <TextField
                fullWidth
                label="SLA"
                value={SLA}
                onChange={(e) => setSLA(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
            <Box className="input-container">
              <TextField
                fullWidth
                label="Preis pro SLA"
                value={preisProSLA}
                onChange={(e) => setpreisProSLA(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
          </Box>
          <Box className="row">
            <Box className="input-container">
              <TextField
                fullWidth
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
            <Box className="input-container">
              <TextField
                fullWidth
                label="Raumbez. MT"
                value={raumbezMT}
                onChange={(e) => setRaumbezMT(e.target.value)}
                margin="normal"
                placeholder="TYPE"
              />
            </Box>
          </Box>
          <Button variant="contained" color="primary" className="submit-button" onClick={handleSubmitForm}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddDataForm;

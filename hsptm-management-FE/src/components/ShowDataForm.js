import React, {useState, useCallback, useEffect} from 'react';
import {TextField, Box, InputLabel, Typography, Card, CardMedia, Button} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';

import axios from 'axios';

function ShowDataForm({deviceIdToShowData, darkMode, allDevicesData}) {
  const [seriennr, setSeriennr] = useState('');
  const [anlagenId, setAnlagenId] = useState('');
  const [anlagenBez, setAnlagenBez] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  const [reminderIsComing, setReminderIsComing] = useState('');
  const [notes, setNotes] = useState('');
  const [deviceData, setDeviceData] = useState('');

  const containerColor = '#333';
  const fieldsColor = '#222';
  const getAndSetData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/devices/${deviceIdToShowData}`);
      const data = response.data.data.device;
      setDeviceData(data);
      setSeriennr(data.seriennr);
      setAnlagenId(data.anlagenID);
      setAnlagenBez(data.anlagenbez);
      setNotes(data?.notes);
      setReminderDate(
        data?.reminders[0]?.time?.length > 2 ? new Date(data?.reminders[0]?.time).toLocaleDateString() : ''
      );
      setReminderIsComing(data.reminders[0].isComing);
    } catch (error) {
      console.log('error', error);
    }
  }, [deviceIdToShowData]);

  useEffect(() => {
    getAndSetData();
  }, [deviceIdToShowData, allDevicesData]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        justifyContent: 'center',
        padding: '55px 15px 56px 15px',
        bgcolor: darkMode ? '#444444' : '#d4d4d4',
        gap: 4,
        position: 'fixed',
        zIndex: 1,
        left: '70%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          gap: '40px',
          padding: '15px',
          bgcolor: darkMode ? containerColor : '#ededed',
          width: '100%'
        }}
      >
        <Box sx={{display: 'flex', gap: '15px', width: '100%'}}>
          <Box sx={{width: '100%'}}>
            <InputLabel style={{fontWeight: '3000px'}}>
              <Typography style={{fontWeight: 'bold', color: darkMode ? 'white' : ''}}>ANLAGEN-ID</Typography>
            </InputLabel>
            <TextField
              size="small"
              value={anlagenId}
              sx={{
                width: '100%',
                backgroundColor: darkMode ? fieldsColor : 'white',
                input: {color: darkMode ? 'white' : 'black'}
              }}
            />
          </Box>
          <Box sx={{width: '100%'}}>
            <InputLabel>
              <Typography style={{fontWeight: 'bold', color: darkMode ? 'white' : ''}}>SERIENNR</Typography>
            </InputLabel>
            <TextField
              size="small"
              value={seriennr}
              sx={{
                width: '100%',
                backgroundColor: darkMode ? fieldsColor : 'white',
                input: {color: darkMode ? 'white' : 'black'}
              }}
            />
          </Box>
        </Box>
        <Box style={{width: '100%'}}>
          <InputLabel>
            <Typography style={{fontWeight: 'bold', color: darkMode ? 'white' : ''}}>ANLAGENBEZ</Typography>
          </InputLabel>
          <TextField
            size="small"
            value={anlagenBez}
            sx={{
              width: '100%',
              backgroundColor: darkMode ? fieldsColor : 'white',
              input: {color: darkMode ? 'white' : 'black'}
            }}
          />
        </Box>
      </Box>

      <Box sx={{width: '100%'}}>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            bgcolor: darkMode ? containerColor : '#ededed',
            padding: '15px',
            borderRadius: '10px',
            width: '100%',
            height: '100%',
            cover: 'fit'
          }}
        >
          {deviceData?.images?.length
            ? deviceData.images?.map((image) => (
                <Card sx={{width: '100%', height: '100px'}}>
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={image?.imageURL ? image?.imageURL : 'https://via.placeholder.com/150'}
                    //onClick={()=>{ image?.imageURL && console.log("---click done",image) }}
                    alt="Image"
                    sx={{
                      backgroundColor: darkMode ? '#2b2b2b' : 'white',
                      color: 'red' // Change the background color here
                    }}
                  />
                </Card>
              ))
            : [1, 2, 3, 4].map((image, index) => (
                <Card sx={{width: '100%', height: '95px'}}>
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image="https://via.placeholder.com/150"
                    alt="Image"
                    sx={{
                      backgroundColor: darkMode ? '#2b2b2b' : 'white'
                    }}
                  />
                </Card>
              ))}
        </Box>
      </Box>

      <Box sx={{width: '100%', height: 'auto'}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            bgcolor: darkMode ? containerColor : '#ededed',
            padding: '23px',
            borderRadius: '10px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '22px',
              width: '50%'
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '50px',
                padding: '5px 40px',
                width: '70%',
                marginBottom: '20px'
              }}
            >
              Reminder
            </Button>
            <Box sx={{width: '100%'}}>
              <InputLabel style={{fontWeight: '100px'}}>
                <Typography style={{fontWeight: 'bold', color: darkMode ? 'white' : '', marginTop: '10px'}}>
                  Date
                </Typography>
              </InputLabel>
              <TextField
                value={reminderDate}
                size="small"
                sx={{
                  width: '100%',
                  backgroundColor: darkMode ? fieldsColor : 'white',
                  input: {color: 'black'}
                }}
              />
            </Box>
            <Box sx={{width: '100%'}}>
              <InputLabel style={{fontWeight: '300px'}}>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '25px',
                    color: darkMode ? 'white' : ''
                  }}
                >
                  Notes
                </Typography>
              </InputLabel>

              <Box sx={{backgroundColor: darkMode ? fieldsColor : 'white'}}>
                <TextField
                  multiline
                  rows={4}
                  value={notes[0]?.content}
                  sx={{
                    '& textarea': {
                      color: darkMode ? 'white' : 'black'
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              width: '50%'
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '50px',
                padding: '4px 30px',
                width: '70%',
                marginBottom: '10px'
              }}
            >
              Lastseen
            </Button>
            <Button
              variant="outlined"
              disabled={!reminderIsComing}
              color="primary"
              sx={{
                width: '100%'
              }}
              startIcon={<PublishIcon />}
            ></Button>
            <Box sx={{width: '100%'}}>
              <Button
                variant="outlined"
                disabled
                color="primary"
                sx={{
                  width: '100%'
                }}
                marginTop="0"
              >
                Save lastseen
              </Button>
            </Box>
            <Box sx={{width: '100%'}}>
              <InputLabel style={{fontWeight: '300px'}}>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '25px',
                    color: darkMode ? 'white' : ''
                  }}
                >
                  Notes
                </Typography>
              </InputLabel>
              <Box sx={{backgroundColor: darkMode ? fieldsColor : 'white'}}>
                <TextField
                  multiline
                  rows={4}
                  value={notes[1]?.content.length ? notes[1]?.content.length : ''}
                  sx={{
                    '& textarea': {
                      color: darkMode ? 'white' : 'black'
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ShowDataForm;

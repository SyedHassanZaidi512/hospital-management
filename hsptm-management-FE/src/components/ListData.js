import React, {useEffect, useState} from 'react';
import {Box, Table, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody} from '@mui/material';
import {If, Then} from 'react-if';

import Loader from './Loader';
import Pagination from './Pagination';

import axios from 'axios';

const tableHeading = [
  {id: 1, title: 'No#'},
  {id: 2, title: 'Anlagen-ID'},
  {id: 3, title: 'Seriennr'},
  {id: 4, title: 'Gehort zu'},
  {id: 5, title: 'Anlagenbez'},
  {id: 6, title: 'Typ/Model'},
  {id: 7, title: 'Hersteller'},
  {id: 8, title: 'Liferant'},
  {id: 9, title: 'Servicetelle'},
  {id: 10, title: 'Abteilung'},
  {id: 11, title: 'Kostenstelle'},
  {id: 12, title: 'SLA'},
  {id: 13, title: 'PreisproSLA'},
  {id: 14, title: 'Status'}
];

function ListData({
  hanldeDoubleClickList,
  allDevicesData,
  setDeviceIdToShowData,
  darkMode,
  isLoading,
  uploadLoading,
  toalDatalength,
  setAllDevicesData,
  tabsValue
}) {
  const [page, setPage] = useState();
  const isData = allDevicesData && allDevicesData.length > 0;
  const tabsColor = '#222';

  const paginate = async (e, _page) => {
    try {
      let response = await axios.get(`http://localhost:8080/api/devices?page=${_page}&itemsPerPage=${20}`);
      setAllDevicesData(response?.data?.data.devices);
    } catch (error) {
      console.log('pagination funtion has erro:', error);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{height: '100vh', width: '100%', marginBottom: '80px', boxShadow: 'none'}}>
        {isData ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              alignItems: 'center'
            }}
          >
            <Box sx={{width: '100%', height: '100vh', overflow: 'auto'}}>
              <Table sx={{minWidth: 60, bgcolor: '#ededed', width: '100%'}} size="small" aria-label="a dense table">
                <TableHead
                  style={{
                    backgroundColor: darkMode ? tabsColor : '#1976d2',
                    color: 'white',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    fontSize: '52px',
                    whiteSpace: 'nowrap',
                    height: '60px'
                  }}
                >
                  <TableRow>
                    {tableHeading.map((heading) => (
                      <TableCell style={{color: 'white', textAlign: 'left'}} key={heading.id}>
                        {heading.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allDevicesData.slice(0, 20).map((device, i) => (
                    <TableRow
                      key={device.id}
                      sx={{
                        '&:last-child td, &:last-child th': {border: 0},
                        bgcolor: darkMode ? '#cccccc' : ''
                      }}
                      onDoubleClick={() => hanldeDoubleClickList(device)}
                      onClick={() => setDeviceIdToShowData(device.id)}
                    >
                      <TableCell align="left">{i + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {device.anlagenID}
                      </TableCell>
                      <TableCell align="left">{device.seriennr}</TableCell>
                      <TableCell align="left">{device.gehortzu}</TableCell>
                      <TableCell align="left">{device.anlagenbez}</TableCell>
                      <TableCell align="left">{device.typModell}</TableCell>
                      <TableCell align="left">{device.hersteller}</TableCell>
                      <TableCell align="left">{device.lieferant}</TableCell>
                      <TableCell align="left">{device.servicestelle}</TableCell>
                      <TableCell align="left">{device.abteilung}</TableCell>
                      <TableCell align="left">{device.kostenstelle}</TableCell>
                      <TableCell align="left">{device.SLA}</TableCell>
                      <TableCell align="left">{device.preisProSLA}</TableCell>
                      <TableCell align="left">{device.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <If condition={tabsValue === 'a'}>
              <Then>
                <Box sx={{height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Pagination count={Math.ceil(toalDatalength / 20 || 20)} onChange={paginate} paginate={paginate} />
                </Box>
              </Then>
            </If>
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: '#cccccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '30%',
              paddingBottom: '40%'
            }}
          >
            <h3>
              {isLoading === true || uploadLoading === true ? <Loader /> : 'No Data To Show Please Add Some Data'}
            </h3>
          </Box>
        )}
      </TableContainer>
    </>
  );
}

export default ListData;

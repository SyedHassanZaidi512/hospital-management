/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {Box} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {toast, ToastContainer} from 'react-toastify';

import ListData from './ListData';
import EditDataForm from './EditDataForm';
import RequestedModal from './RequestedModal';

function Data({allDevicesData, setAllDevicesData, setDeviceIdToShowData, darkMode, isLoading: uploadLoading}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deviceIdToUpdateData, setDeviceIdToUpdateData] = useState('');
  const [tabsValue, setTabsValue] = useState('a');
  const [showRequestedModal, setShowRequestedModal] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_toalDatalength, setTotalDataLength] = useState(100);

  const setAllData = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get('http://localhost:8080/api/devices');
      console.log('resdata', res.data.data.devices);
      setAllDevicesData(res?.data?.data?.devices);
      setTotalDataLength(res?.data?.data.totalLength);
      setIsLoading(false);
    } catch (error) {
      if (error) setIsLoading(false);
      console.log(error);
    }
  };

  const setRequestedData = useCallback(async (value) => {
    try {
      if (value === 'b') {
        let res = await axios.get('http://localhost:8080/api/requested');
        const data = res?.data?.data?.requestedData;
        const onlyRequested = data.length > 0 && data.filter((device) => !(device.isDone === true));
        await setAllDevicesData(onlyRequested);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setDoneData = async (value) => {
    try {
      if (value === 'c') {
        const response = await axios.get('http://localhost:8080/api/done');
        await setAllDevicesData(response?.data?.data?.donesData);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchData = useCallback(async (value) => {
    try {
      switch (value) {
        case 'a':
          setAllData();
          break;
        case 'b':
          setRequestedData(value);
          break;
        case 'c':
          setDoneData(value);
          break;
        default:
          let response = await axios.get('http://localhost:8080/api/devices');
          setAllDevicesData(response.data.data.devices);
          setTotalDataLength(response?.data?.data?.totalLength);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }, []);

  const headerColor = '#333';

  const handleChange = (e, newValue) => {
    setTabsValue(newValue);
    fetchData(newValue);
  };

  const hanldeDoubleClickList = async (device) => {
    setDeviceIdToUpdateData(device?.id);
    if (!device?.isDone && device?.isRequested) {
      await axios.post(`http://localhost:8080/api/done/${device?.id}`, {
        isDone: true
      });
      toast.success('Moved to done');
      return;
    }
    setModalOpen(true);
  };

  useEffect(() => {
    setAllData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '100%',
        marginTop: '0.5px',
        backgroundColor: darkMode ? headerColor : 'background.paper',
        position: 'fixed',
        zIndex: 1,
        color: 'white'
      }}
    >
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <EditDataForm
        open={modalOpen}
        darkMode={darkMode}
        setOpen={setModalOpen}
        deviceIdToUpdateData={deviceIdToUpdateData}
        setShowRequestedModal={setShowRequestedModal}
      />
      <RequestedModal
        showRequestedModal={showRequestedModal}
        setShowRequestedModal={setShowRequestedModal}
        deviceIdToUpdateData={deviceIdToUpdateData}
        isRequested={isRequested}
        setIsRequested={setIsRequested}
        darkMode={darkMode}
      />
      <Tabs
        onChange={handleChange}
        value={tabsValue}
        aria-label="Tabs where each tab needs to be selected manually"
        sx={{
          alignContent: 'center',
          alignItems: 'center',
          bgcolor: darkMode ? headerColor : 'background.paper',
          color: 'white',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <Tab value="a" label="All Devices" sx={{color: darkMode ? 'white' : 'black'}} />
        <Tab value="b" label="All Requested" sx={{color: darkMode ? 'white' : 'black'}} />
        <Tab value="c" label="All Done" sx={{color: darkMode ? 'white' : 'black'}} />
      </Tabs>

      <ListData
        uploadLoading={uploadLoading}
        hanldeDoubleClickList={hanldeDoubleClickList}
        setDeviceIdToShowData={setDeviceIdToShowData}
        allDevicesData={allDevicesData}
        setDeviceIdToUpdateData={setDeviceIdToUpdateData}
        darkMode={darkMode}
        isLoading={isLoading}
        toalDatalength={_toalDatalength}
        setAllDevicesData={setAllDevicesData}
        tabsValue={tabsValue}
      />
    </Box>
  );
}

export default Data;

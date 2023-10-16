import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function MyPagination({count, paginate}) {
  return (
    <Stack spacing={2}>
      <Pagination count={count} boundaryCount={2} color="primary" onChange={(e, page) => paginate(e, page)} />
    </Stack>
  );
}

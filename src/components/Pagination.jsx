import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CustomPagination = ({ count, page, onChange }) => {
  return (
    <Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        size="medium"
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default CustomPagination;

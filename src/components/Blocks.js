import React from 'react';
import Proptypes from 'prop-types';
import {
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";

import { useBlocks } from '../hooks/useBlocks';

function Boxes({ nodeUrl }) {
  const [boxes, loading, error] = useBlocks(nodeUrl);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Something went wrong fetching data</Typography>
  }

  if (boxes.length === 0) {
    return <Typography>Node does not have blocks</Typography>
  }

  return (
    <React.Fragment>
      {
        boxes.map(({ id, attributes }) => (
          <Box
            key={id}
            bgcolor="lightGray"
            marginBottom={2}
            padding={1}
            borderRadius="4px"
          >
            <Typography
              color="primary"
              fontWeigth="600"
              fontSize="10px"
            >
              {`${id}`.padStart(3, '0')}
            </Typography>
            <Typography>{attributes.data}</Typography>
          </Box>
        ))
      }
    </React.Fragment>
  )
}

Boxes.propTypes = {
  nodeUrl: Proptypes.string.isRequired,
};

export default Boxes;
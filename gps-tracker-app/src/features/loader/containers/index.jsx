import styles from './styles';
import React from 'react';
import { Modal, Box } from "@mui/material";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <>
      <Modal id='loaderdiv'
        open={loading}
      >
        <Box style={styles.modalBackground}>
          <Box style={styles.activityIndicatorWrapper}>
            <FontAwesomeIcon icon={faSpinner} size="2x" spin />
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default Loader;
import {showMessage} from 'react-native-flash-message';

export const showWarningMessage = message => {
  showMessage({message: message, type: 'warning'});
};

export const showErrorMessage = message => {
  showMessage({message: message, type: 'danger'});
};

export const showSuccessMessage = message => {
  showMessage({message: message, type: 'success'});
};

import Button, {ButtonProps} from '@mui/material/Button';
import './BlueButton.scss';

function BlueButton({className = '', ...props}: ButtonProps) {
  return (
    <Button
      className={`gradient-btn btn-press ${className}`}
      {...props}
    />
  );
}

export default BlueButton;


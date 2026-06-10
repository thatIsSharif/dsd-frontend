import Button, {ButtonProps} from '@mui/material/Button';
import './BlueBorderButton.scss';

function BlueBorderButton({className = '', ...props}: ButtonProps) {
  return (
    <Button
      className={`btn-press ${className}`}
      {...props}
    />
  );
}

export default BlueBorderButton;

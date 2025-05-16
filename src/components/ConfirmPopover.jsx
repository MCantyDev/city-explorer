import { Button, Popover } from 'react-bootstrap';

function ConfirmPopover({ onConfirm, onCancel, ref, ...props }) {
  return (
    <Popover id="confirm-popover" ref={ref} {...props}>
      <Popover.Body>
        Are you sure?{' '}
        <Button variant="danger" size="sm" onClick={onConfirm}>Yes</Button>{' '}
        <Button variant="secondary" size="sm" onClick={onCancel}>No</Button>
      </Popover.Body>
    </Popover>
  );
}


export default ConfirmPopover;
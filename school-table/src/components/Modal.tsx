import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalProps {
  date: string;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ date, isOpen, handleClose }: ModalProps) => {
  const close = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={close}>
        <DialogContent>
          <DialogTitle>Error</DialogTitle>
          {date}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;

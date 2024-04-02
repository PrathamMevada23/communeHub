import React, { useEffect, useState } from "react";
import { validateMail } from "../../shared/utils/validators"
import { Dialog, DialogTitle, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";  
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputWithLabel from "../../shared/components/InputWithLabel";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/friendsActions";

const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation = () => {}
}) => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFromValid] = useState("");

  const handleSendInvitation = () => {
    sendFriendInvitation({
      targetMailAddress: mail,
    },
    handleCloseDialog
    );
  }
  
  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };

  useEffect(() => {
    setIsFromValid(validateMail(mail));
  }, [mail, setIsFromValid]);

  return (
    <div>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>
            <Typography>Invite a Friend</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography>
                Enter e-mail address of friend which you would like invite
              </Typography>
              <InputWithLabel 
                label="Mail"
                type="text"
                value={mail}
                setValue={setMail}
                placeholder="Enter e-mail addresss"
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CustomPrimaryButton 
              onClick={handleSendInvitation}
              disabled={!isFormValid}
              label="Send"
              additionalStyles={{
                marginLeft: "15px",
                marginRight: "15px",
                marginBottom: "10px",
                marginTop: "0"
              }}
            />
          </DialogActions>
        </Dialog>
    </div>
  );
};

const mapActionsProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsProps)(AddFriendDialog);
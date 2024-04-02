import React, { useState } from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import AddFriendDialog from "./AddFriendDialog";

const additionalStyles = {
    marginTop: '15px',
    marginLeft: '5px',
    width: '68%',
    height: '32px',
    background: '#2AAA8A'
}

const AddFriendButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleOpenAddFriendDialog = () => {
        setIsDialogOpen(true)
    }

    const handleCloseAddFriendDialog = () => {
        setIsDialogOpen(false)
    }

    return (
        <>
            <CustomPrimaryButton 
                additionalStyles={additionalStyles}
                label='Add Friend'
                onClick={handleOpenAddFriendDialog}

            />
            <AddFriendDialog
            isDialogOpen={isDialogOpen}
            closeDialogHandler={handleCloseAddFriendDialog}
            
            />
        </>
    )
}

export default AddFriendButton;

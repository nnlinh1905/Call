import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

//modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import QuizIcon from "@mui/icons-material/Quiz";

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

//Accordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//check
const VsmartPosSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const CallCenterSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const dataSettring = () => {
  const [checkData, setcheckData] = useState("");
  const [CheckVsmartPos, setCheckVsmartPos] = useState(false);
  const [CheckCallCenter, setCheckCallCenter] = useState(false);

  useEffect(() => {
    //console.log("CheckCallCenter " + CheckCallCenter);
  }, [CheckCallCenter]);
  //Modal

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let selectData = (value) => {
    handleOpen();
  };

  let confirmTheChange = () => {
    setcheckData(checkData == "1" ? "0" : "1");
    handleClose();
  };

  return (
    <div className="mt-3 px-3">
      <FormControl className="w-full">
        <FormLabel id="demo-radio-buttons-group-label">
          <div className="flex justify-between item-center border-b border-gray-300 pb-2">
            <span className="font-medium mt-2 px-2">Sử dụng dữ liệu</span>
            <div className="mr-10 w-1/5">
              <Button variant="outlined" className="w-full">
                Cập nhật
              </Button>
            </div>
          </div>
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          className="w-full px-5"
        >
          <div className="mt-4">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="span">VsmartPos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="span">
                  <FormControlLabel
                    control={<VsmartPosSwitch />}
                    label="VsmartPos"
                  />
                  <div className="w-full px-5 py-3">
                    <TextField
                      label="API-VsmartPos"
                      id="outlined-size-small"
                      size="small"
                      className="w-full"
                    />
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            {/* <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>CallCenter</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <FormControlLabel
                    control={<CallCenterSwitch />}
                    label="Call Center"
                  />
                  <div className="w-full px-5 py-3">
                    <TextField
                      label="API-CallCenter"
                      id="outlined-size-small"
                      size="small"
                      className="w-full"
                    />
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion> */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography component="span">KiotViet</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="span">
                  <FormControlLabel
                    control={<CallCenterSwitch />}
                    label="KiotViet"
                  />
                  <div className="w-full px-5 py-3">
                    <TextField
                      label="API-KiotViet"
                      id="outlined-size-small"
                      size="small"
                      className="w-full"
                    />
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </RadioGroup>
      </FormControl>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-xl">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thông báo
          </Typography>
          <Typography
            component="span"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <span className="flex items-center gap-1">
              bạn có chắc muốn đổi sang{" "}
              <span className="flex items-center gap-2 font-semibold">
                {checkData == "0" ? "VsmartPos" : "Call Center"}
                <QuizIcon className="text-red-500" />
              </span>
            </span>
          </Typography>

          <Typography
            component="span"
            id="modal-modal-title"
            sx={{ mt: 2 }}
            className="flex items-center justify-end gap-2"
          >
            <Button
              variant="outlined"
              onClick={() => handleClose()}
              size="small"
            >
              Bỏ qua
            </Button>
            <Button
              variant="contained"
              onClick={() => confirmTheChange()}
              size="small"
            >
              Đồng ý
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default dataSettring;

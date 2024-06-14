import React, { useState } from "react";
import {
    Modal,
    Box,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CustomQuillEditor from "../../quill-editor/QuillEditor";
interface LooseObject {
    [key: string]: any;
}

const Highlight = ({
    open,
    closeForm,
    onConfirm,
}: {
    open: boolean;
    closeForm: any;
    onConfirm: any
}

) => {
    const [highlightText, setHighlightText] = useState("");
    const handleConfirm = () => {
        onConfirm(highlightText);
        closeForm();
    };
    return (
        <Modal open={open} onClose={closeForm}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "30%",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    overflowY: "auto",
                    maxHeight: 700,
                    p: 1,
                    fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                }}
            >
                <div style={{ borderBottom: "1px solid #edeef0", display: "flex", justifyContent: "center" }}>
                    <span style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
                        Điểm nổi bật
                    </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <input type="text" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                        value={highlightText}
                        onChange={(e) => setHighlightText(e.target.value)}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: 10 }}>
                    <Button variant="contained" sx={{ backgroundColor: "#0085DB", color: "white" }} onClick={handleConfirm}>Xác nhận</Button>
                    <Button variant="contained" sx={{ backgroundColor: "#0085DB", color: "white" }} onClick={closeForm}>Đóng</Button>
                </div>
            </Box>
        </Modal>)
};
export default Highlight;
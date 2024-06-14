import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    IconButton,
    Typography,
    Button,
    Link,
} from "@mui/material";
import Add from '@mui/icons-material/AddCircleRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CustomQuillEditor from "../../quill-editor/QuillEditor";
import Highlight from "./highlight";
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ServiceExclusion from "./services-exclusions";
import ServiceIncluded from "./services-included";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { createTourAsync, getTourAsync } from "@/app/redux-store/tour/slice";
import { getLocationAsync, getLocationList } from "@/app/redux-store/location/slice";
import ClearIcon from '@mui/icons-material/Clear';
import { useEdgeStore } from "@/lib/edgestore";
import { FileState, MultiImageDropzone } from "@/component/muti-image-dropzone";

interface LooseObject {
    [key: string]: any;
}

interface LocationItem {
    id: number;
    name: string;
    area: string;
}
const CreateTour = ({
    open,
    closeForm,
    tour_option,
    area
}: {
    open: boolean;
    closeForm: any;
    tour_option: any;
    area: any
}

) => {
    const dispatch = useAppDispatch();
    const locationList: LocationItem[] = useAppSelector(getLocationList);
    const [locationListState, setLocationListState] = useState<LocationItem[]>([]);

    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getLocationAsync())
        }
        asyncCall()
    }, [])
    useEffect(() => {
        if (locationList && area) {
            const locationsInArea = locationList.filter(location => location.area === area);
            setLocationListState(locationsInArea);

        }
    }, [locationList, area]);


    const [isOpen, setIsOpen] = useState(false)
    const [isOpenSE, setIsOpenSE] = useState(false)
    const [isOpenSI, setIsOpenSI] = useState(false)
    const openHighlight = () => {
        setIsOpen(true);
    };
    const closeHighlight = () => {
        setIsOpen(false);
    };
    const openSE = () => {
        setIsOpenSE(true);
    };
    const closeSE = () => {
        setIsOpenSE(false);
    };
    const openSI = () => {
        setIsOpenSI(true);
    };
    const closeSI = () => {
        setIsOpenSI(false);
    };
    const [isShowBasic, setIsShowBasic] = useState(true);
    const [isShowDetail, setIsShowDetail] = useState(true);

    const [data, setData] = useState<LooseObject>({
        tour_option: "",
        area: "",
        title: "",
        slot: 0,
        start_date: "",
        end_date: "",
        start_location: "Buôn Ma Thuột",
        end_location: "",
        highlight: [],
        service_exclusions: [],
        service_included: [],
        images: [],
        itinerary: ""
    });


    useEffect(() => {
        if (tour_option && area) {
            setData({
                ...data,
                tour_option: tour_option,
                area: area
            })
        }
    }, [tour_option, area])

    const handleHighlightConfirm = (highlightText: string) => {
        setData((prevData) => ({
            ...prevData,
            highlight: [...prevData.highlight, highlightText],
        }));
    };
    const handleSIConfirm = (serviceIncludedText: string) => {
        setData((prevData) => ({
            ...prevData,
            service_included: [...prevData.service_included, serviceIncludedText],
        }));
    };

    const handleSEConfirm = (serviceExclusionText: string) => {
        setData((prevData) => ({
            ...prevData,
            service_exclusions: [...prevData.service_exclusions, serviceExclusionText],
        }));
    };

    const handleSave = async () => {
        await dispatch(createTourAsync({ data }));
        await dispatch(getTourAsync())
        alert("Thêm mới thành công!");
        closeForm()
    }
    const handleItineraryChange = (newContent: string) => {
        setData(prevData => ({
            ...prevData,
            itinerary: newContent
        }));
    };

    const handleRemoveItem = (key: string, index: number) => {
        setData(prevData => ({
            ...prevData,
            [key]: prevData[key].filter((_: any, i: number) => i !== index)
        }));
    };

    const [fileStates, setFileStates] = React.useState<FileState[]>([]);
    const [uploadRes, setUploadRes] = React.useState<
        {
            url: string;
            filename: string;
        }[]
    >([]);
    const { edgestore } = useEdgeStore();
    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }
    return (
        <Modal open={open} onClose={closeForm}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "40%",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 5,
                    overflowY: "auto",
                    scrollbarColor: "#edeef0",
                    scrollbarWidth: "none",
                    maxHeight: 700,
                    fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                }}
            >
                <div style={{ borderBottom: "1px solid #edeef0", display: "flex", backgroundColor: "#4287f5" }}>
                    <IconButton sx={{ marginTop: 1.2, position: "absolute", zIndex: 999, top: 45, marginLeft: 2, color: "white", }}
                        onClick={() => {
                            closeForm()
                        }}
                    >
                        <ArrowBackIosIcon sx={{ fontSize: 26, fontWeight: "bold" }} />
                    </IconButton>
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <span style={{ fontSize: 30, fontWeight: "bold", marginTop: 60, color: "white" }}>
                            Thêm Mới
                        </span>
                    </div>
                </div>
                <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 20 }}>
                    <div style={{ marginBottom: 10, color: "black", fontWeight: "bold" }}>
                        {tour_option} &gt;&gt; {area}
                    </div>

                    <div>
                        <div style={{
                            backgroundColor: "#1b71fa", padding: 10, borderRadius: 10, cursor: "pointer",
                            display: "flex", justifyContent: "space-between"
                        }} onClick={() => {
                            setIsShowBasic(!isShowBasic)
                        }}>
                            <span style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>THÔNG TIN CƠ BẢN</span>
                            {isShowBasic ? <ArrowCircleUpOutlinedIcon sx={{ color: "white" }} /> : <ArrowCircleDownOutlinedIcon sx={{ color: "white" }} />}
                        </div>

                        <div style={{ height: isShowBasic ? "auto" : 0, overflow: "hidden", transition: "height ease-in-out", backgroundColor: "#dbe9ff", borderRadius: 10, padding: isShowBasic ? "10px" : 0, marginTop: 5 }}>
                            {isShowBasic && (
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                            <span style={{ fontSize: 16, fontWeight: "bold" }}>Title</span>
                                            <input type="text"
                                                style={{ height: 40, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                                value={data.title}
                                                onChange={(e) => {
                                                    setData({
                                                        ...data,
                                                        title: e.target.value
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                            <span style={{ fontSize: 16, fontWeight: "bold" }}>Slot</span>
                                            <input type="number" style={{ height: 40, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                                value={data.slot}
                                                onChange={(e) => {
                                                    setData({
                                                        ...data,
                                                        slot: e.target.value
                                                    })
                                                }} />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                                        <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                            <span style={{ fontSize: 16, fontWeight: "bold" }}>Điểm Đi</span>
                                            <input type="text" style={{ height: 40, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                                value={data.start_location}
                                                onChange={(e) => {
                                                    setData({
                                                        ...data,
                                                        start_location: e.target.value
                                                    })
                                                }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", width: "47%", }}>
                                            <span style={{ fontSize: 16, fontWeight: "bold" }}>Điểm Đến</span>
                                            <select style={{ border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                                value={data.end_location} onChange={(e) => setData({ ...data, end_location: e.target.value })}>
                                                <option value="">Chọn điểm đến</option>
                                                {locationListState.map((locaion, index) => (
                                                    <option key={index} value={locaion.name}>
                                                        {locaion.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                                        <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                            <span style={{ fontSize: 16, fontWeight: "bold" }}>Ngày Đi</span>
                                            <input type="date" style={{ height: 40, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                                value={data.start_date}
                                                onChange={(e) => {
                                                    setData({
                                                        ...data,
                                                        start_date: e.target.value
                                                    })
                                                }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                            <span style={{ fontSize: 16, fontWeight: "bold" }}>Ngày Về</span>
                                            <input type="date" style={{ height: 40, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                                value={data.end_date}
                                                onChange={(e) => {
                                                    setData({
                                                        ...data,
                                                        end_date: e.target.value
                                                    })
                                                }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div style={{
                            backgroundColor: "#f54949", padding: 10, borderRadius: 10, cursor: "pointer",
                            display: "flex", justifyContent: "space-between"
                        }}
                            onClick={() => {
                                setIsShowDetail(!isShowDetail)
                            }}>
                            <span style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>THÔNG TIN CHI TIẾT</span>
                            {isShowDetail ? <ArrowCircleUpOutlinedIcon sx={{ color: "white" }} /> : <ArrowCircleDownOutlinedIcon sx={{ color: "white" }} />}
                        </div>
                        {isShowDetail && <div style={{ backgroundColor: "#fae6e6", borderRadius: 10, padding: 10, marginTop: 5 }}>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20, justifyContent: "center" }}>
                                <span style={{ fontSize: 16, fontWeight: "bold" }}>Điểm nổi bật
                                    <IconButton onClick={openHighlight}><Add /></IconButton>
                                </span>
                                {Array.isArray(data.highlight) && data.highlight.map((item: any, index: number) => (
                                    <Typography sx={{ marginLeft: 3 }} key={index}>
                                        <FiberManualRecordIcon sx={{ fontSize: 12, marginRight: 2 }} />
                                        {item}
                                        <IconButton style={{ color: "red" }}
                                            onClick={() => handleRemoveItem("highlight", index)}>
                                            <ClearIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Typography>
                                ))}

                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20, justifyContent: "center" }}>
                                <span style={{ fontSize: 16, fontWeight: "bold" }}>Dịch vụ bao gồm
                                    <IconButton onClick={openSI}><Add /></IconButton></span>
                                {Array.isArray(data.service_included) && data.service_included.map((item: any, index: number) => (
                                    <Typography key={index} sx={{ marginLeft: 3, display: "flex", alignItems: "center" }}>
                                        <TaskAltOutlinedIcon sx={{ fontSize: 16, color: "green", marginRight: 2 }} />
                                        {item}
                                        <IconButton style={{ color: "red" }}
                                            onClick={() => handleRemoveItem("service_included", index)}>
                                            <ClearIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Typography>
                                ))}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20, justifyContent: "center" }}>
                                <span style={{ fontSize: 16, fontWeight: "bold" }}>Dịch vụ không bao gồm<IconButton onClick={openSE}><Add /></IconButton></span>
                                {Array.isArray(data.service_exclusions) && data.service_exclusions.map((item: any, index: number) => (
                                    <Typography key={index} sx={{ marginLeft: 3, display: "flex", alignItems: "center" }}>
                                        <CancelOutlinedIcon sx={{ fontSize: 16, color: "red", marginRight: 2 }} />
                                        {item}
                                        <IconButton style={{ color: "red" }}
                                            onClick={() => handleRemoveItem("service_exclusions", index)}>
                                            <ClearIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Typography>
                                ))}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20 }}>
                                <span style={{ fontSize: 16, fontWeight: "bold", }}>Lịch trình</span>
                                <CustomQuillEditor onContentChange={handleItineraryChange} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
                                <span style={{ fontSize: 16, fontWeight: "bold" }}>Hình ảnh</span>
                                <MultiImageDropzone
                                    value={fileStates}
                                    dropzoneOptions={{
                                        maxFiles: 6,
                                        maxSize: 1024 * 1024 * 1,
                                    }}
                                    onChange={setFileStates}
                                    onFilesAdded={async (addedFiles) => {
                                        setFileStates([...fileStates, ...addedFiles]);
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        marginTop: 1,
                                        backgroundColor: "red",
                                        '&:hover': {
                                            backgroundColor: 'red',
                                        },
                                    }}
                                    onClick={async () => {
                                        await Promise.all(
                                            fileStates.map(async (fileState) => {
                                                try {
                                                    if (
                                                        fileState.progress !== 'PENDING' ||
                                                        typeof fileState.file === 'string'
                                                    ) {
                                                        return;
                                                    }
                                                    const res = await edgestore.publicFiles.upload({
                                                        file: fileState.file,
                                                        onProgressChange: async (progress) => {
                                                            updateFileProgress(fileState.key, progress);
                                                            if (progress === 100) {
                                                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                                                updateFileProgress(fileState.key, 'COMPLETE');
                                                                setFileStates([]);
                                                                setData(data => ({
                                                                    ...data,
                                                                    images: [...data.images, res.url]
                                                                }));


                                                            }
                                                        },
                                                    });
                                                    setUploadRes((uploadRes) => [
                                                        ...uploadRes,
                                                        {
                                                            url: res.url,
                                                            filename:
                                                                typeof fileState.file === 'string'
                                                                    ? fileState.file
                                                                    : fileState.file.name,
                                                        },
                                                    ]);


                                                } catch (err) {
                                                    updateFileProgress(fileState.key, 'ERROR');
                                                }
                                            }),
                                        );
                                    }}
                                    disabled={
                                        !fileStates.filter((fileState) => fileState.progress === 'PENDING')
                                            .length
                                    }
                                >
                                    Upload
                                </Button>
                                <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
                                    {data.images.map((imageUrl: string, index: number) => (
                                        <div key={index} style={{ position: "relative", marginRight: 10, marginBottom: 10 }}>
                                            <img src={imageUrl} alt={`Image ${index}`} style={{ width: 180, height: 100, margin: 5, borderRadius: 5 }} />
                                            <ClearIcon style={{ position: "absolute", top: 0, right: 0, borderRadius: "50%", color: "white", marginTop: 5, marginRight: 5, backgroundColor: "#fa5e52" }}
                                                onClick={() => setData(prevData => ({
                                                    ...prevData,
                                                    images: prevData.images.filter((_: any, i: any) => i !== index)
                                                }))} />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        }
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                        <Button variant="contained" onClick={handleSave}>Xác nhận</Button>
                        <Button variant="contained" onClick={closeForm}>Đóng</Button>
                    </div>
                </div>

                <Highlight open={isOpen} closeForm={closeHighlight} onConfirm={handleHighlightConfirm} />

                <ServiceExclusion open={isOpenSE} onConfirm={handleSEConfirm} closeForm={closeSE} />
                <ServiceIncluded open={isOpenSI} onConfirm={handleSIConfirm} closeForm={closeSI} />
            </Box >
        </Modal >)
};
export default CreateTour;
import React, { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import {
    Modal,
    Box,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch } from "@/app/redux-store/hook";
import { createDTTourAsync, deleteDTTourAsync, getTourAsync, updateTourAsync } from "@/app/redux-store/tour/slice";
import Highlight from "./highlight";
import ServiceExclusion from "./services-exclusions";
import ServiceIncluded from "./services-included";
import Add from "@mui/icons-material/Add";
import { FileState, MultiImageDropzone } from "@/component/muti-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

interface LooseObject {
    [key: string]: any;
}

const ViewDetails = ({
    open,
    closeForm,
    travel
}: {
    open: boolean;
    closeForm: any;
    travel: any;
}
) => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState<LooseObject>({
        id: 0,
        tour_option: "",
        area: "",
        title: "",
        slot: 0,
        start_date: "",
        end_date: "",
        start_location: "",
        end_location: "",
        highlights: [],
        services_exclusions: [],
        services_included: [],
        images: [],
        itinerary: ""
    });

    const [dataUpdate, setDataUpdate] = useState<LooseObject>({
        id_tour: 0,
        highlight: [],
        services_exclusions: [],
        service_included: [],
        image: [],
    });
    useEffect(() => {
        if (!open) {
            setData({
                id: 0,
                tour_option: "",
                area: "",
                title: "",
                slot: 0,
                start_date: "",
                end_date: "",
                start_location: "",
                end_location: "",
                highlights: [],
                services_exclusions: [],
                services_included: [],
                images: [],
                itinerary: ""
            });
            setDataUpdate({
                highlight: [],
                services_exclusions: [],
                service_included: [],
                image: [],
            })
        } else {
            setData({
                ...data,
                id: travel.id,
                title: travel.title,
                slot: travel.slot,
                area: travel.area,
                tour_option: travel.tour_option,
                start_date: travel.start_date,
                end_date: travel.end_date,
                start_location: travel.start_location,
                end_location: travel.end_location,
                itinerary: travel.itinerary,
                highlights: [...(travel.highlights ?? [])],
                services_exclusions: [...(travel.services_exclusions ?? [])],
                services_included: [...(travel.services_included ?? [])],
                image: [...(travel.image ?? [])],
            });
            setDataUpdate({
                ...dataUpdate,
                id_tour: travel.id,
            })
        }
    }, [open, travel]);
    const handleItineraryChange = (newContent: string) => {
        setData(prevData => ({
            ...prevData,
            itinerary: newContent
        }));
    };
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ align: [] }],
            [{ color: [] }],
            ["code-block"],
            ["clean"],
        ],
    };

    const quillFormats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
        "align",
        "color",
        "code-block",
    ];

    const deleteTable = async (id: number, table: string) => {
        const isConfirmed = window.confirm("Bạn có muốn xóa không ?");
        if (isConfirmed) {
            await dispatch(deleteDTTourAsync({ id: id, table: table }))
            await dispatch(getTourAsync());
            alert("Xóa thành công!")
            closeForm()
        }
    }

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

    const handleHighlightConfirm = (highlightText: string) => {
        setDataUpdate((prevData) => ({
            ...prevData,
            highlight: [...(prevData.highlight ?? []), highlightText],
        }));
    };
    const handleSIConfirm = (serviceIncludedText: string) => {
        setDataUpdate((prevData) => ({
            ...prevData,
            service_included: [...prevData.service_included, serviceIncludedText],
        }));
    };

    const handleSEConfirm = (serviceExclusionText: string) => {
        setDataUpdate((prevData) => ({
            ...prevData,
            service_exclusions: [...prevData.services_exclusions, serviceExclusionText],
        }));
    };
    const createTable = async () => {
        const userConfirmed = window.confirm("Bạn có chắc xác nhận thay đổi không ?");
        if (userConfirmed) {
            try {
                await dispatch(createDTTourAsync({ dataUpdate }));
                await dispatch(updateTourAsync(data));
                await dispatch(getTourAsync());
                alert("Thay đổi thành công!")
            } catch (error) {
                console.error("Error performing tour operations:", error);
            }
        } else {

        }
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
    const [dataChanged, setDataChanged] = useState(false);




    useEffect(() => {
        if (data.title !== travel.title || data.slot !== travel.slot || data.start_location !== travel.start_location
            || data.end_location !== travel.end_location || data.start_date !== travel.start_date || data.end_date !== travel.end_date
            || data.itinerary !== travel.itinerary) {
            setDataChanged(true)
        } else if (dataUpdate.highlight.length !== 0 || dataUpdate.services_exclusions.length !== 0 || dataUpdate.service_included.length !== 0) {
            setDataChanged(true)
        } else {
            setDataChanged(false)
        }
    }, [data, travel, dataUpdate]);

    return (
        <Modal open={open} onClose={closeForm}>

            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    overflowY: "auto",
                    scrollbarColor: "#edeef0",
                    scrollbarWidth: "none",
                    maxHeight: 700,
                    fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                }}
            >
                <div style={{
                    borderBottom: "1px solid #edeef0", fontSize: 30, display: "flex",
                    justifyContent: "center", paddingTop: 40, backgroundColor: "#4287f5", fontWeight: "bold", color: "white",
                }}>Tour</div>
                <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 20 }}>
                    <div style={{ marginBottom: 10, color: "black", fontWeight: "bold" }}>
                        {travel.tour_option} &gt;&gt; {travel.area}
                    </div>

                    <div>

                        <div style={{ overflow: "hidden", transition: "height ease-in-out", borderRadius: 10, marginTop: 5 }}>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                        <span style={{ fontSize: 16, fontWeight: "bold" }}>Title</span>
                                        <input type="text"
                                            style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
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
                                        <input type="number" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
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
                                        <input type="text" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                            value={data.start_location}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    start_location: e.target.value
                                                })
                                            }} />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                        <span style={{ fontSize: 16, fontWeight: "bold" }}>Điểm Đến</span>
                                        <input type="text" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                            value={data.end_location}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    end_location: e.target.value
                                                })
                                            }} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                                    <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                        <span style={{ fontSize: 16, fontWeight: "bold" }}>Ngày Đi</span>
                                        <input type="date" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
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
                                        <input type="date" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                            value={data.end_date}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    end_date: e.target.value
                                                })
                                            }} />
                                    </div>

                                </div>
                                <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20 }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Lịch trình</span>
                                    <QuillEditor
                                        value={data.itinerary}
                                        onChange={handleItineraryChange}
                                        modules={quillModules}
                                        formats={quillFormats}
                                        className="w-full h-[70%] mt-10 bg-white"
                                        style={{ border: "1px solid #737373", borderRadius: 5 }}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20, justifyContent: "center" }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Điểm nổi bật
                                        <IconButton onClick={openHighlight}><Add /></IconButton></span>
                                    {Array.isArray(travel.highlights) && travel.highlights.map((item: any, index: number) => (
                                        <li style={{ marginLeft: 3 }} key={index}>
                                            {item.content}
                                            <IconButton style={{ color: "red" }}

                                                onClick={() => deleteTable(item.id, "highlight")}>
                                                <ClearIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </li>
                                    ))}
                                    {Array.isArray(dataUpdate.highlight) && dataUpdate.highlight.map((item: any, index: number) => (
                                        <Typography key={index} sx={{ marginLeft: 3, display: "flex", alignItems: "center" }}>
                                            {item}
                                            <IconButton style={{ color: "red" }}
                                            >
                                                <ClearIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Typography>
                                    ))}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20, justifyContent: "center" }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Dịch vụ bao gồm
                                        <IconButton onClick={openSI}><Add /></IconButton></span>
                                    {Array.isArray(travel.services_included) && travel.services_included.map((item: any, index: number) => (
                                        <li style={{ marginLeft: 3 }} key={index}>
                                            {item.content}
                                            <IconButton style={{ color: "red" }}

                                                onClick={() => deleteTable(item.id, "services_included")}>
                                                <ClearIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </li>
                                    ))}
                                    {Array.isArray(dataUpdate.service_included) && dataUpdate.service_included.map((item: any, index: number) => (
                                        <Typography key={index} sx={{ marginLeft: 3, display: "flex", alignItems: "center" }}>
                                            {item}
                                            <IconButton style={{ color: "red" }}
                                            >
                                                <ClearIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Typography>
                                    ))}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20, justifyContent: "center" }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Dịch vụ không bao gồm
                                        <IconButton onClick={openSE}><Add /></IconButton></span>
                                    {Array.isArray(travel.services_exclusions) && travel.services_exclusions.map((item: any, index: number) => (
                                        <li style={{ marginLeft: 3 }} key={index}>
                                            {item.content}
                                            <IconButton style={{ color: "red" }}

                                                onClick={() => deleteTable(item.id, "services_exclusions")}>
                                                <ClearIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </li>
                                    ))}
                                    {Array.isArray(dataUpdate.service_exclusions) && dataUpdate.service_exclusions.map((item: any, index: number) => (
                                        <Typography key={index} sx={{ marginLeft: 3, display: "flex", alignItems: "center" }}>
                                            {item}
                                            <IconButton style={{ color: "red" }}
                                            >
                                                <ClearIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Typography>
                                    ))}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20, justifyContent: "center" }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Hình ảnh </span>
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
                                                                    setDataUpdate(dataUpdate => ({
                                                                        ...dataUpdate,
                                                                        image: [...dataUpdate.image, res.url]
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
                                    <div style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}>
                                        {Array.isArray(travel.image) && travel.image.map((item: any, index: number) => (
                                            <div key={index} style={{ position: "relative", marginRight: 10 }}>
                                                <img src={item.image_url} alt={`lỗi `} style={{ width: 170, height: 100, borderRadius: 5 }} />
                                                <ClearIcon
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 0,
                                                        borderRadius: "50%",
                                                        color: "white",
                                                        marginTop: 5,
                                                        marginRight: 5,
                                                        backgroundColor: "#fa5e52",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        setDataUpdate(dataUpdate => ({
                                                            ...dataUpdate,
                                                            image: dataUpdate.image.filter((_: any, i: any) => i !== index)
                                                        }));
                                                        deleteTable(item.id, "image");
                                                    }}
                                                />

                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}>
                                        {Array.isArray(dataUpdate.image) && dataUpdate.image.map((item: any, index: number) => (
                                            <div key={index} style={{ position: "relative", marginRight: 10 }}>
                                                <img src={item} alt={`lỗi `} style={{ width: 170, height: 100, borderRadius: 5 }} />
                                                <ClearIcon
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 0,
                                                        borderRadius: "50%",
                                                        color: "white",
                                                        marginTop: 5,
                                                        marginRight: 5,
                                                        backgroundColor: "#fa5e52",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        setDataUpdate(dataUpdate => ({
                                                            ...dataUpdate,
                                                            image: dataUpdate.image.filter((_: any, i: any) => i !== index)
                                                        }));
                                                        deleteTable(item.id, "image");
                                                    }}
                                                />

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                        <Button
                            variant="contained"
                            onClick={createTable}
                            disabled={!dataChanged}
                            sx={{
                                backgroundColor: !dataChanged ? "grey" : "primary.main",
                                '&:hover': {
                                    backgroundColor: !dataChanged ? "grey" : "primary.dark",
                                },
                            }}
                        >
                            Xác nhận
                        </Button>
                        <Button variant="contained" onClick={() => {
                            if (dataChanged) {
                                alert("Bạn có thật sự muốn đóng chứ, dữ liệu mới chưa được thêm!!!")
                                closeForm()
                            } else {
                                closeForm()
                            }

                        }}>Đóng</Button>
                    </div>
                </div>
                <Highlight open={isOpen} closeForm={closeHighlight} onConfirm={handleHighlightConfirm} />

                <ServiceExclusion open={isOpenSE} onConfirm={handleSEConfirm} closeForm={closeSE} />
                <ServiceIncluded open={isOpenSI} onConfirm={handleSIConfirm} closeForm={closeSI} />
            </Box >

        </Modal >
    )
};
export default ViewDetails;
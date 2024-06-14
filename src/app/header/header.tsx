import { useEffect, useState } from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { getLocationAsync, getLocationList } from "@/app/redux-store/location/slice";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "@mui/material";
import DehazeIcon from '@mui/icons-material/Dehaze';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
interface LocationItem {
    id: number;
    name: string;
    area: string;
    tour_option: string;
}
const Header = () => {
    const dispatch = useAppDispatch();
    const locationList: LocationItem[] = useAppSelector(getLocationList);
    const [locationTN, setLocationTN] = useState<LocationItem[]>([]);
    const [locationNN, setLocationNN] = useState<LocationItem[]>([]);
    const [locationMB, setLocationMB] = useState<LocationItem[]>([]);
    const [locationMT, setLocationMT] = useState<LocationItem[]>([]);
    const [locationMN, setLocationMN] = useState<LocationItem[]>([]);
    const [locationCA, setLocationCA] = useState<LocationItem[]>([]);

    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getLocationAsync())
        }
        asyncCall()
    }, [])

    useEffect(() => {
        if (locationList) {
            const locationsInMB = locationList.filter(location => location.area === "Miền Bắc");
            setLocationMB(locationsInMB);
            const locationsInMT = locationList.filter(location => location.area === "Miền Trung");
            setLocationMT(locationsInMT);
            const locationsInMN = locationList.filter(location => location.area === "Miền Nam");
            setLocationMN(locationsInMN);
            const locationsInCA = locationList.filter(location => location.area === "Châu Á");
            setLocationCA(locationsInCA);
            const locationsInTN = locationList.filter(location => location.tour_option === "Trong Nước");
            setLocationTN(locationsInTN);
            const locationsInNN = locationList.filter(location => location.tour_option === "Nước Ngoài");
            setLocationNN(locationsInNN);
        }

    }, [locationList]);
    const [isSelectMB, setIsSelectMB] = useState(false);
    const [isSelectMN, setIsSelectMN] = useState(false);
    const [isSelectMT, setIsSelectMT] = useState(false);
    const [isSelect, setIsSelect] = useState<number | null>(null);
    const serviceTravel = ["Dịch Vụ Máy Bay", "Dịch Vụ Khách Sạn", "Dịch Vụ Thuê Xe"]
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

    const [isMenu, setIsMenu] = useState(false)
    const [isSelectTN, setIsSelectTN] = useState(false);
    const [isSelectNN, setIsSelectNN] = useState(false);
    const [isSelectDV, setIsSelectDV] = useState(false);
    return (
        <div>
            <header className="main_header_area" >
                <div className="header-content py-1" style={{ backgroundColor: "#291868" }}>
                    <div className="container d-flex align-items-center justify-content-between">
                        <div className="links">
                            <ul>
                                <li><a href="#" className="white"><LocalPhoneIcon style={{ fontSize: 22 }} /> Hotline: 0964397779</a></li>
                            </ul>
                        </div>
                        <div className="links float-right">
                            <ul>
                                <li><a href="#" className="white"><i className="fab fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#" className="white"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                                <li><a href="#" className="white"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="#" className="white"><i className="fab fa-linkedin " aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {lgUp ? (
                    <div className="header_menu" id="header_menu">
                        <nav className="navbar navbar-default">
                            <div className="container">
                                <div className="navbar-flex d-flex align-items-center justify-content-between w-100" style={{ paddingTop: 25, paddingBottom: 25 }}>

                                    <div className="navbar-header">
                                        <a className="navbar-brand" href="/">
                                            <img style={{ height: 60 }} src="/images/logo/Logo2.png" alt="image" />
                                        </a>
                                    </div>

                                    <div className="navbar-collapse1 d-flex align-items-center" id="bs-example-navbar-collapse-1">
                                        <ul className="nav navbar-nav" id="responsive-menu">
                                            <li className="submenu dropdown">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                                    aria-haspopup="true" aria-expanded="false" style={{ color: "#291868", fontWeight: "bold" }}
                                                >TOUR TRONG NƯỚC</a>
                                                <ul className="dropdown-menu" >
                                                    <li className="submenu dropdown">
                                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                                            aria-haspopup="true" aria-expanded="false"
                                                            style={{ color: !isSelectMB ? "#291868" : "white", fontWeight: "bold", backgroundColor: !isSelectMB ? "white" : "#DB251A" }}
                                                            onMouseEnter={() => {
                                                                setIsSelectMB(true)
                                                            }}
                                                            onMouseLeave={() => {
                                                                setIsSelectMB(false)
                                                            }}>Du lịch Miền Bắc<i
                                                                className="fa fa-angle-right" aria-hidden="true"></i></a>
                                                        <ul className="dropdown-menu" >
                                                            {locationMB.map((item, index: number) => (
                                                                <li key={index}
                                                                    onMouseEnter={() => {
                                                                        setIsSelect(index);
                                                                        setIsSelectMB(true)

                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        setIsSelect(null)
                                                                        setIsSelectMB(false)
                                                                    }}
                                                                    onClick={() => {
                                                                        localStorage.setItem('location', JSON.stringify(item.name));
                                                                    }}
                                                                >
                                                                    <a style={{
                                                                        fontWeight: "bold",
                                                                        color: isSelect === index ? "white" : "#291868",
                                                                        backgroundColor: isSelect === index ? "#DB251A" : "white"
                                                                    }}
                                                                        href="/pages/tour"
                                                                    >
                                                                        Du lịch {item.name}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                    <li className="submenu dropdown">
                                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                                            aria-haspopup="true" aria-expanded="false"
                                                            style={{ color: !isSelectMT ? "#291868" : "white", fontWeight: "bold", backgroundColor: !isSelectMT ? "white" : "#DB251A" }}
                                                            onMouseEnter={() => {
                                                                setIsSelectMT(true)
                                                            }}
                                                            onMouseLeave={() => {
                                                                setIsSelectMT(false)
                                                            }}>Du lịch Miền Trung<i
                                                                className="fa fa-angle-right" aria-hidden="true"></i></a>
                                                        <ul className="dropdown-menu" >
                                                            {locationMT.map((item, index: number) => (
                                                                <li key={index}
                                                                    onMouseEnter={() => {
                                                                        setIsSelect(index);
                                                                        setIsSelectMT(true)
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        setIsSelect(null)
                                                                        setIsSelectMT(false)
                                                                    }}
                                                                    onClick={() => {
                                                                        localStorage.setItem('location', JSON.stringify(item.name));
                                                                        window.location.href = "/pages/tour";
                                                                    }}
                                                                >
                                                                    <a style={{
                                                                        color: isSelect === index ? "white" : "#291868",
                                                                        fontWeight: "bold",
                                                                        backgroundColor: isSelect === index ? "#DB251A" : "white"
                                                                    }}
                                                                        href="/pages/tour"
                                                                    >
                                                                        Du lịch {item.name}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                    <li className="submenu dropdown">
                                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                                            aria-haspopup="true" aria-expanded="false"
                                                            style={{ color: !isSelectMN ? "#291868" : "white", fontWeight: "bold", backgroundColor: !isSelectMN ? "white" : "#DB251A" }}
                                                            onMouseEnter={() => {
                                                                setIsSelectMN(true)
                                                            }}
                                                            onMouseLeave={() => {
                                                                setIsSelectMN(false)
                                                            }}>Du Lịch Miền Nam<i
                                                                className="fa fa-angle-right" aria-hidden="true"></i></a>
                                                        <ul className="dropdown-menu" >
                                                            {locationMN.map((item, index: number) => (
                                                                <li key={index}
                                                                    onMouseEnter={() => {
                                                                        setIsSelect(index);
                                                                        setIsSelectMN(true)
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        setIsSelect(null)
                                                                        setIsSelectMN(false)
                                                                    }}
                                                                    onClick={() => {
                                                                        localStorage.setItem('location', JSON.stringify(item.name));
                                                                    }}>
                                                                    <a style={{
                                                                        color: isSelect === index ? "white" : "#291868",
                                                                        fontWeight: "bold",
                                                                        backgroundColor: isSelect === index ? "#DB251A" : "white"
                                                                    }}
                                                                        href="/pages/tour"
                                                                    >
                                                                        Du lịch {item.name}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="submenu dropdown">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                                    aria-haspopup="true" aria-expanded="false" style={{ color: "#291868", fontWeight: "bold" }}>TOUR NƯỚC NGOÀI</a>
                                                <ul className="dropdown-menu" >
                                                    {locationCA.map((item, index: number) => (
                                                        <li key={index}
                                                            onMouseEnter={() => {
                                                                setIsSelect(index);
                                                            }}
                                                            onMouseLeave={() => {
                                                                setIsSelect(null)
                                                            }}
                                                            onClick={() => {
                                                                localStorage.setItem('location', JSON.stringify(item.name));
                                                            }}
                                                        >
                                                            <a style={{
                                                                color: isSelect === index ? "white" : "#291868",
                                                                fontWeight: "bold",
                                                                backgroundColor: isSelect === index ? "#DB251A" : "white"
                                                            }}
                                                                href="/pages/tour"
                                                            >
                                                                Du lịch {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li className="submenu dropdown">
                                                <a href="/pages/group-tour" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                                    aria-haspopup="true" aria-expanded="false" style={{ color: "#291868", fontWeight: "bold" }}>DU LỊCH ĐOÀN</a>
                                            </li>
                                            <li className="submenu dropdown">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                                    aria-haspopup="true" aria-expanded="false" style={{ color: "#291868", fontWeight: "bold" }}>DỊCH VỤ DU LỊCH</a>
                                                <ul className="dropdown-menu">
                                                    {serviceTravel.map((item, index: number) => (
                                                        <li key={index}
                                                            onMouseEnter={() => {
                                                                setIsSelect(index);
                                                            }}
                                                            onMouseLeave={() => {
                                                                setIsSelect(null)
                                                            }}>

                                                            <a
                                                                href="/"
                                                                style={{
                                                                    color: isSelect === index ? "white" : "#291868",
                                                                    fontWeight: "bold",
                                                                    backgroundColor: isSelect === index ? "#DB251A" : "white"
                                                                }}
                                                            >
                                                                {item}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                ) : (
                    <div>
                        <div className="header_menu" id="header_menu" style={{
                            backgroundColor: "white",
                            height: 60,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            position: "fixed",
                            top: 0,
                            width: "100%",
                            zIndex: 1000
                        }}>
                            <a href="/">
                                <img style={{ height: 50, marginLeft: 5 }} src="/images/logo/Logo2.png" alt="logo" />
                            </a>
                            <button style={{ background: "white", marginRight: 5 }}
                                onClick={() => {
                                    setIsMenu(!isMenu)
                                }}>
                                {isMenu ?
                                    <ClearIcon style={{ fontSize: 38, fontWeight: "bold", color: "#291868" }} />
                                    : <DehazeIcon style={{ fontSize: 38, fontWeight: "bold", color: "#291868" }} />
                                }
                            </button>
                        </div>
                        {isMenu ? (
                            <div style={{
                                width: "100%",
                                height: "auto",
                                position: "fixed",
                                top: 60,
                                zIndex: 999,
                                backgroundColor: "white",
                                overflowY: "auto"
                            }}
                            >
                                <div>
                                    <div style={{
                                        display: "flex", flexDirection: "column",
                                        height: 50, justifyContent: "center", backgroundColor: "white",
                                        borderTop: "1px solid #dedede",

                                    }}
                                        onClick={() => { setIsSelectTN(!isSelectTN) }}
                                    >
                                        <div style={{
                                            display: "flex", justifyContent: "space-between",
                                            backgroundColor: isSelectTN ? "#DB251A" : "white", fontWeight: "bold",
                                            height: 50, alignItems: "center", color: isSelectTN ? "white" : "#291868",
                                        }}>
                                            <span style={{
                                                fontSize: 18, marginLeft: 10,
                                                display: "flex",
                                            }}>Tour Trong Nước</span>
                                            {isSelectTN ? < KeyboardArrowUpIcon style={{ fontSize: 30 }} /> : <KeyboardArrowDownIcon style={{ fontSize: 30 }} />}
                                        </div>
                                    </div>
                                    <div>
                                        {isSelectTN ? (
                                            <div>
                                                <div>
                                                    <div style={{
                                                        display: "flex", flexDirection: "column",
                                                        height: 50, justifyContent: "center", backgroundColor: "white",
                                                        borderTop: "1px solid #dedede"
                                                    }}
                                                        onClick={() => {
                                                            setIsSelectMT(false);
                                                            setIsSelectMN(false);
                                                            setIsSelectMB(!isSelectMB);
                                                        }}
                                                    >
                                                        <div style={{ height: 50, alignItems: "center", display: "flex", justifyContent: "space-between", color: !isSelectMB ? "#291868" : "white", backgroundColor: !isSelectMB ? "white" : "#DB251A" }}>
                                                            <span style={{ fontSize: 18, marginLeft: 20, fontWeight: "bold" }}>Du Lịch Miền Bắc</span>
                                                            {isSelectMB ? < KeyboardArrowUpIcon style={{ fontSize: 30 }} /> : <KeyboardArrowDownIcon style={{ fontSize: 30 }} />}
                                                        </div>
                                                    </div>
                                                    {isSelectMB ? (
                                                        <div>
                                                            {locationMB.map((item, index: number) => (
                                                                <div key={index} style={{
                                                                    display: "flex", flexDirection: "column",
                                                                    height: 50, justifyContent: "center",
                                                                    borderTop: "1px solid #dedede",
                                                                    color: isSelect === index ? "white" : "#291868",
                                                                    backgroundColor: isSelect === index ? "#DB251A" : "white"
                                                                }}
                                                                    onClick={() => {
                                                                        setIsSelect(index);
                                                                        localStorage.setItem('location', JSON.stringify(item.name));
                                                                        window.location.href = "/pages/tour"
                                                                    }}
                                                                >
                                                                    <span style={{ fontSize: 18, marginLeft: 40, fontWeight: "bold" }}>Du Lịch {item.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <div style={{
                                                        display: "flex", flexDirection: "column",
                                                        height: 50, justifyContent: "center", backgroundColor: "white",
                                                        borderTop: "1px solid #dedede"
                                                    }}
                                                        onClick={() => {
                                                            setIsSelectMB(false);
                                                            setIsSelectMN(false);
                                                            setIsSelectMT(!isSelectMT);
                                                        }}
                                                    >
                                                        <div style={{ height: 50, alignItems: "center", display: "flex", justifyContent: "space-between", color: !isSelectMT ? "#291868" : "white", backgroundColor: !isSelectMT ? "white" : "#DB251A" }}>
                                                            <span style={{ fontSize: 18, marginLeft: 20, fontWeight: "bold" }}>Du Lịch Miền Trung</span>
                                                            {isSelectMT ? < KeyboardArrowUpIcon style={{ fontSize: 30 }} /> : <KeyboardArrowDownIcon style={{ fontSize: 30 }} />}
                                                        </div>
                                                    </div>
                                                    {isSelectMT ? (
                                                        <div>
                                                            {locationMT.map((item, index: number) => (
                                                                <div key={index} style={{
                                                                    display: "flex", flexDirection: "column",
                                                                    height: 50, justifyContent: "center",
                                                                    borderTop: "1px solid #dedede",
                                                                    color: isSelect === index ? "white" : "#291868",
                                                                    backgroundColor: isSelect === index ? "#DB251A" : "white"
                                                                }}
                                                                    onClick={() => {
                                                                        setIsSelect(index);
                                                                        localStorage.setItem('location', JSON.stringify(item.name));
                                                                        window.location.href = "/pages/tour"
                                                                    }}
                                                                >
                                                                    <span style={{ fontSize: 18, marginLeft: 40, fontWeight: "bold" }}>Du Lịch {item.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <div style={{
                                                        display: "flex", flexDirection: "column",
                                                        height: 50, justifyContent: "center", backgroundColor: "white",
                                                        borderTop: "1px solid #dedede"
                                                    }}
                                                        onClick={() => {
                                                            setIsSelectMT(false);
                                                            setIsSelectMB(false);
                                                            setIsSelectMN(!isSelectMN);
                                                        }}
                                                    >
                                                        <div style={{ height: 50, alignItems: "center", display: "flex", justifyContent: "space-between", color: !isSelectMN ? "#291868" : "white", backgroundColor: !isSelectMN ? "white" : "#DB251A" }}>
                                                            <span style={{ fontSize: 18, marginLeft: 20, fontWeight: "bold" }}>Du Lịch Miền Nam</span>
                                                            {isSelectMN ? < KeyboardArrowUpIcon style={{ fontSize: 30 }} /> : <KeyboardArrowDownIcon style={{ fontSize: 30 }} />}
                                                        </div>
                                                    </div>
                                                    {isSelectMN ? (
                                                        <div>
                                                            {locationMN.map((item, index: number) => (
                                                                <div key={index} style={{
                                                                    display: "flex", flexDirection: "column",
                                                                    height: 50, justifyContent: "center",
                                                                    color: isSelect === index ? "white" : "#291868",
                                                                    backgroundColor: isSelect === index ? "#DB251A" : "white",
                                                                    borderTop: "1px solid #dedede"
                                                                }}
                                                                    onClick={() => {
                                                                        setIsSelect(index);
                                                                        localStorage.setItem('location', JSON.stringify(item.name));
                                                                        window.location.href = "/pages/tour"
                                                                    }}
                                                                >
                                                                    <span style={{ fontSize: 18, marginLeft: 40, fontWeight: "bold" }}>Du Lịch {item.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>

                                </div>


                                <div>
                                    <div style={{
                                        display: "flex", flexDirection: "column",
                                        height: 50, justifyContent: "center", backgroundColor: "white",
                                        borderTop: "1px solid #dedede",

                                    }}
                                        onClick={() => { setIsSelectNN(!isSelectNN) }}
                                    >
                                        <div style={{
                                            display: "flex", justifyContent: "space-between",
                                            backgroundColor: isSelectNN ? "#DB251A" : "white", fontWeight: "bold",
                                            height: 50, alignItems: "center", color: isSelectNN ? "white" : "#291868",
                                        }}>
                                            <span style={{
                                                fontSize: 18, marginLeft: 10,
                                                display: "flex",
                                            }}>Tour Nước Ngoài</span>
                                            {isSelectNN ? < KeyboardArrowUpIcon style={{ fontSize: 30 }} /> : <KeyboardArrowDownIcon style={{ fontSize: 30 }} />}
                                        </div>
                                    </div>
                                    <div>
                                        {isSelectNN ? (
                                            <div>
                                                {locationNN.map((item, index: number) => (
                                                    <div key={index} style={{
                                                        display: "flex", flexDirection: "column",
                                                        height: 50, justifyContent: "center",
                                                        color: isSelect === index ? "white" : "#291868",
                                                        backgroundColor: isSelect === index ? "#DB251A" : "white",
                                                        borderTop: "1px solid #dedede"
                                                    }}
                                                        onClick={() => {
                                                            setIsSelect(index);
                                                            localStorage.setItem('location', JSON.stringify(item.name));
                                                            window.location.href = "/pages/tour"
                                                        }}
                                                    >
                                                        <span style={{ fontSize: 18, marginLeft: 40, fontWeight: "bold" }}>Du Lịch {item.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}

                                    </div>

                                </div>
                                <div style={{
                                    borderTop: "1px solid #dedede", display: "flex", flexDirection: "column",
                                    height: 50, justifyContent: "center", backgroundColor: "white"
                                }}>
                                    <a href="pages/group-tour" style={{ fontSize: 18, marginLeft: 10, color: "#291868", fontWeight: "bold" }}>Du Lịch Đoàn</a>
                                </div>
                                <div>
                                    <div style={{
                                        display: "flex", flexDirection: "column",
                                        height: 50, justifyContent: "center", backgroundColor: "white",
                                        borderTop: "1px solid #dedede",

                                    }}
                                        onClick={() => { setIsSelectDV(!isSelectDV) }}
                                    >
                                        <div style={{
                                            display: "flex", justifyContent: "space-between",
                                            backgroundColor: isSelectDV ? "#DB251A" : "white", fontWeight: "bold",
                                            height: 50, alignItems: "center", color: isSelectDV ? "white" : "#291868",
                                        }}>
                                            <span style={{
                                                fontSize: 18, marginLeft: 10,
                                                display: "flex",
                                            }}>Dịch Vụ Du Lịch</span>
                                            {isSelectDV ? < KeyboardArrowUpIcon style={{ fontSize: 30 }} /> : <KeyboardArrowDownIcon style={{ fontSize: 30 }} />}
                                        </div>
                                    </div>
                                    <div>
                                        {isSelectDV ? (
                                            <div>
                                                {serviceTravel.map((item, index: number) => (
                                                    <div key={index} style={{
                                                        display: "flex", flexDirection: "column",
                                                        height: 50, justifyContent: "center",
                                                        color: isSelect === index ? "white" : "#291868",
                                                        backgroundColor: isSelect === index ? "#DB251A" : "white",
                                                        borderTop: "1px solid #dedede"
                                                    }}
                                                        onClick={() => {
                                                            setIsSelect(index);
                                                        }}
                                                    >
                                                        <span style={{ fontSize: 18, marginLeft: 40, fontWeight: "bold" }}>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}

                                    </div>

                                </div>
                            </div>
                        ) : null}
                    </div>

                )
                }
            </header >
            <Marquee style={{ color: "#DB251A", border: "1px solid #e8e8e8", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
                <strong>K & T Travel - Uy Tín Chất Lượng Vượt Trội - Tel: (0262) 3 927 927 -
                    Hotline: 0964397779</strong>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            </Marquee>
        </div >
    )
}
export default Header;
import { uniqueId } from "lodash";
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';


const menuItems = [
    {
        id: uniqueId(),
        label: "DASHBOARD",
        items: [
            {
                id: uniqueId(),
                href: "dashboard",
                title: "Dashboard",
                icon: HomeIcon
            }
        ]
    },
    {
        id: uniqueId(),
        label: "TOUR",
        items: [
            {
                id: uniqueId(),
                href: "create",
                title: "Quản lý Tour",
                icon: LocalAirportIcon,
            },
            {
                id: uniqueId(),
                href: "location",
                title: "Quản lý điểm đến",
                icon: LocationOnIcon
            },
            {
                id: uniqueId(),
                href: "location-hot",
                title: "Điểm đến nổi bật",
                icon: StarIcon
            }
        ]
    },
    {
        id: uniqueId(),
        label: "BOOKING",
        items: [
            {
                id: uniqueId(),
                href: "booking",
                title: "Danh sách đặt tour",
                icon: FormatListBulletedIcon
            },
            {
                id: uniqueId(),
                href: "group-tour",
                title: "Danh sách du lịch đoàn",
                icon: FormatListBulletedIcon
            },
            {
                id: uniqueId(),
                href: "support",
                title: "Yêu cầu hỗ trợ",
                icon: SupportAgentIcon
            }
        ]
    },
    {
        id: uniqueId(),
        label: "ACCOUNT",
        items: [
            {
                id: uniqueId(),
                href: "account",
                title: "Quản lý tài khoản",
                icon: ManageAccountsIcon
            },
            {
                id: uniqueId(),
                href: "/",
                title: "Đăng xuất",
                icon: LogoutIcon,
            }
        ]
    }
];

export default menuItems;

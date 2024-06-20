import { useEffect, useState } from "react";
import { Chart, ChartConfiguration } from "chart.js";
import { Typography, useMediaQuery } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { getStatisticalAsync, getStatisticalList } from "@/app/redux-store/statistical/slice";

interface StatisticalItem {
    day: string;
    tour?: { area: string; total: number; }[];
}

const ChartBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const statisticalList: StatisticalItem[] = useAppSelector(getStatisticalList);
    const [statisticalListState, setStatisticalListState] = useState<StatisticalItem[]>([]);

    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getStatisticalAsync());
        };
        asyncCall();
    }, []);

    useEffect(() => {
        if (statisticalList) {
            setStatisticalListState(statisticalList);
        }
    }, [statisticalList]);

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    const [chartInitialized, setChartInitialized] = useState(false);

    useEffect(() => {
        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        if (!ctx) return;

        // Prepare data for the chart
        const labels = statisticalListState.map(item => item.day);
        const dataMB = statisticalListState.map(item => getItemTotalByArea(item, "Miền Bắc"));
        const dataMT = statisticalListState.map(item => getItemTotalByArea(item, "Miền Trung"));
        const dataMN = statisticalListState.map(item => getItemTotalByArea(item, "Miền Nam"));
        const dataNN = statisticalListState.map(item => getItemTotalByArea(item, "Nước Ngoài"));

        const config: ChartConfiguration = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Miền Bắc",
                        data: dataMB,
                        backgroundColor: "#008c2c",
                        borderColor: "#008c2c",
                        borderWidth: 1,
                        barPercentage: 0.8,
                        categoryPercentage: 0.5,
                    },
                    {
                        label: "Miền Trung",
                        data: dataMT,
                        backgroundColor: "#eb4034",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        barPercentage: 0.8,
                        categoryPercentage: 0.5,
                    },
                    {
                        label: "Miền Nam",
                        data: dataMN,
                        backgroundColor: "#7134eb",
                        borderColor: "#7134eb",
                        borderWidth: 1,
                        barPercentage: 0.8,
                        categoryPercentage: 0.5,
                    },
                    {
                        label: "Nước Ngoài",
                        data: dataNN,
                        backgroundColor: "#eb9234",
                        borderColor: "#eb9234",
                        borderWidth: 1,
                        barPercentage: 0.8,
                        categoryPercentage: 0.5,
                    },
                ],
            },
        };

        const myChart = new Chart(ctx, config);
        setChartInitialized(true);

        return () => {
            myChart.destroy();
        };
    }, [chartInitialized, statisticalListState]);

    const getItemTotalByArea = (item: StatisticalItem, area: string): number => {
        const tourItem = item.tour?.find(tour => tour.area === area);
        return tourItem ? tourItem.total : 0;
    };

    if (lgUp) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4" style={{ marginBottom: '1rem' }}>Thống kê tỷ lệ đặt tour trong 1 tuần</Typography>
                <div style={{ border: '1px solid #ccc', borderRadius: '10px', marginTop: '1rem', width: '100%', maxWidth: '1100px', height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <Typography variant="h4">Thống kê tỷ lệ đặt tour trong 1 tuần</Typography>
                <div className="w-[1100px] h-screen flex mx-auto my-auto">
                    <div className='border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto shadow-xl'>
                        <canvas id='myChart'></canvas>
                    </div>
                </div>
            </>
        );
    }
};

export default ChartBar;

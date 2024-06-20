"use client";
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux-store/hook';
import { getBookingAsync, getBookingList } from '@/app/redux-store/booking/slice';
import { getTourAsync, getTourList } from '@/app/redux-store/tour/slice';
import ViewBooking from '../../components/forms/booking/view-detail';

interface TourItem {
    id: number;
    title: string;
    tour_option: string;
    start_date: string;
    end_date: string;
    slot: number;
    itinerary: string;
    area: string;
    start_location: string;
    image: {
        id: number;
        image_url: string;
        id_tour: number;
    }[];
    promotion: number;
}

interface BookingItem {
    id: number;
    name: string;
    email: string;
    phone: number;
    address: string;
    adult: number;
    children: number;
    baby: number;
    newborn: number;
    id_tour: number;
}

const Booking: React.FC = () => {
    const dispatch = useAppDispatch();
    const tourList: TourItem[] = useAppSelector(getTourList);
    const bookingList: BookingItem[] = useAppSelector(getBookingList);
    const [tourListState, setTourListState] = useState<TourItem[]>([]);
    const [id, setId] = useState<number[]>([]);

    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getTourAsync());
            await dispatch(getBookingAsync());
        };
        asyncCall();
    }, []);

    const [count, setCount] = useState<Record<number, number>>({});
    useEffect(() => {
        if (bookingList && bookingList.length > 0) {
            const tourIds = bookingList.map(item => item.id_tour);
            setId(tourIds);
            const bookingCounts: Record<number, number> = {};
            bookingList.forEach(booking => {
                if (bookingCounts[booking.id_tour]) {
                    bookingCounts[booking.id_tour]++;
                } else {
                    bookingCounts[booking.id_tour] = 1;
                }
            });
            setCount(bookingCounts);
        }
    }, [bookingList]);

    useEffect(() => {
        if (tourList && id.length > 0) {
            const toursInBooking = tourList.filter(item => id.includes(item.id));
            setTourListState(toursInBooking);
        }
    }, [tourList, id]);

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    const [isOpen, setIsOpen] = useState(false);
    const [idTour, setIdTour] = useState("")
    const openForm = (idTour: any) => {
        setIsOpen(true)
        setIdTour(idTour)
    }
    const closeForm = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <div style={{ height: 200, display: "flex", justifyContent: "space-between", flexWrap: "wrap", cursor: "pointer" }}>
                {tourListState.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            position: "relative",
                            marginTop: 20,
                            backgroundColor: "white",
                            width: "48%",
                            display: "flex",
                            borderRadius: 10,
                            padding: 20,
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                        }}
                        onClick={() => {
                            openForm(item.id)
                        }}
                    >
                        <div style={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: 20,
                            width: 60,
                            height: 30,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 16,
                        }}>
                            X{count[item.id] || 0}
                        </div>
                        <div>
                            {item.image && item.image.length > 0 && (
                                <img style={{ height: 150, width: 220 }} src={item.image[0].image_url} alt={item.title} />
                            )}
                        </div>
                        <div style={{ marginLeft: 20 }}>
                            <div style={{ fontWeight: "bold", fontSize: 18 }}>
                                {truncateText(item.title, 22)}
                            </div>
                            <div>
                                Từ: <b>{item.start_location}</b>
                            </div>
                            <div>
                                Ngày đi: <b>{item.start_date}</b>
                            </div>
                            <div>
                                Ngày về:  <b>{item.end_date}</b>
                            </div>
                            <div>
                                Số chỗ còn nhận: <b>{item.slot}</b>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ViewBooking open={isOpen} closeForm={closeForm} id_tour={idTour} />
        </div >
    );
};

export default Booking;

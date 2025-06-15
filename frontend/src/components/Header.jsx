import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";
import {
    FaPlaneDeparture,
    FaPlaneArrival,
    FaCar,
    FaHotel,
    FaGlobe,
    FaHeart,
    FaUserCircle,
    FaBars,
    FaQuestionCircle
} from "react-icons/fa";

import axios from "axios";
import LoginSignupModal from "./LoginSignupModal";

export default function Header({ searchData }) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedTab, setSelectedTab] = useState("flight");

    const [airportOptions, setAirportOptions] = useState([]);
    const [departure, setDeparture] = useState(null);
    const [arrival, setArrival] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [passengers, setPassengers] = useState(1);
    const [directOnly, setDirectOnly] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState("");

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        axios
            .get("/api/air", { params: { page: 0, size: 1000 } })
            .then((response) => {
                const allFlights = response.data.content;
                const uniqueAirports = [...new Set(allFlights.map((f) => f.departure))];
                setAirportOptions(
                    uniqueAirports.map((airport) => ({
                        value: airport,
                        label: airport
                    }))
                );
            })
            .catch((error) => {
                console.error("공항 데이터 로드 실패", error);
            });
    }, []);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUserName(userData.name);
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setHamburgerOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = () => {
        if (!departure || !arrival || !startDate) {
            alert(t("header.alertSelectAll"));
            return;
        }
        if (departure.value === arrival.value) {
            alert(t("header.alertSame"));
            return;
        }

        navigate("/airline_search", {
            state: {
                searchData: {
                    departure,
                    arrival,
                    startDate,
                    returnDate,
                    passengers
                }
            }
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserName("");
        navigate("/");
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setHamburgerOpen(false);
    };

    return (
        <div className="bg-[#03284F] text-white p-10 w-full">
            <div className="flex justify-between items-center">
                <div className="text-4xl font-bold flex items-center space-x-2">
                    <a href="/">Shinguair</a>
                </div>
                <div className="space-x-4 flex items-center relative">
                    <FaGlobe />
                    <FaHeart />
                    <FaUserCircle />
                    {!isLoggedIn && (
                        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
                            {t("header.login")}
                        </span>
                    )}
                    {isLoggedIn && <span className="ml-2 font-semibold">{userName}님</span>}
                    <FaBars className="text-xl cursor-pointer" onClick={() => setHamburgerOpen(!hamburgerOpen)} />

                    {hamburgerOpen && (
                        <div ref={menuRef} className="absolute right-0 top-10 w-60 bg-white text-black rounded-xl shadow-lg z-50">
                            <ul className="py-2 text-sm">
                                <li className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer">
                                    <FaPlaneDeparture className="mr-3 text-blue-600" /> {t("header.flight")}
                                </li>
                                <li className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer">
                                    <FaHotel className="mr-3 text-blue-600" /> {t("header.hotel")}
                                </li>
                                <li className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer">
                                    <FaCar className="mr-3 text-blue-600" /> {t("header.rentcar")}
                                </li>
                                <hr className="my-1" />
                                {isLoggedIn && (
                                    <li className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => { navigate("/mypage"); setHamburgerOpen(false); }}>
                                        <FaUserCircle className="mr-3 text-gray-600" /> {t("header.mypage")}
                                    </li>
                                )}
                                {isLoggedIn && (
                                    <li className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer text-red-500" onClick={handleLogout}>
                                        <FaUserCircle className="mr-3" /> {t("header.logout")}
                                    </li>
                                )}
                                <li className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => { navigate("/help"); setHamburgerOpen(false); }}>
                                    <FaQuestionCircle className="mr-3 text-gray-600" /> {t("header.help")}
                                </li>
                                <li className="px-5 py-3 hover:bg-gray-100 flex items-start cursor-pointer">
                                    <FaGlobe className="mr-3 mt-1 text-gray-600" />
                                    <div className="flex flex-col space-y-1">
                                        <span className="font-semibold">{t("header.language")}</span>
                                        <div className="flex gap-4 mt-1">
                                            <button onClick={() => changeLanguage("ko")} className="text-sm hover:underline">한국어</button>
                                            <button onClick={() => changeLanguage("en")} className="text-sm hover:underline">English</button>
                                            <button onClick={() => changeLanguage("ja")} className="text-sm hover:underline">日本語</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-x-2 hidden md:flex mt-6">
                {["flight", "hotel", "rentcar"].map((tab) => (
                    <button key={tab} onClick={() => setSelectedTab(tab)} className={`btn btn-sm ${selectedTab === tab ? "btn-primary" : "btn-outline"}`}>
                        {tab === "flight" && <FaPlaneDeparture />}
                        {tab === "hotel" && <FaHotel />}
                        {tab === "rentcar" && <FaCar />}
                        <span className="ml-1">{t(`header.${tab}`)}</span>
                    </button>
                ))}
            </div>

            {selectedTab === "flight" && (
                <div className="bg-white rounded-xl mt-4 p-4 grid md:grid-cols-7 gap-2 text-black items-end">
                    <div>
                        <div className="text-sm">{t("header.departure")}</div>
                        <Select options={airportOptions} value={departure} onChange={setDeparture} placeholder={t("header.departurePlaceholder")} />
                    </div>
                    <div className="md:col-span-2">
                        <div className="text-sm">{t("header.arrival")}</div>
                        <Select options={airportOptions} value={arrival} onChange={setArrival} placeholder={t("header.arrivalPlaceholder")} />
                    </div>
                    <div>
                        <div className="text-sm">{t("header.startDate")}</div>
                        <div className="border border-gray-300 rounded-md px-3 py-2">
                            <DatePicker selected={startDate} onChange={setStartDate} placeholderText={t("header.datePlaceholder")} className="w-full focus:outline-none bg-transparent" minDate={new Date()} />
                        </div>
                    </div>
                    <div>
                        <div className="text-sm">{t("header.returnDate")}</div>
                        <div className="border border-gray-300 rounded-md px-3 py-2">
                            <DatePicker selected={returnDate} onChange={setReturnDate} placeholderText={t("header.datePlaceholder")} className="w-full focus:outline-none bg-transparent" minDate={startDate || new Date()} />
                        </div>
                    </div>
                    <div>
                        <div className="text-sm">{t("header.passengers")}</div>
                        <input type="number" min="1" value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className="bg-white text-black border border-gray-300 rounded-md px-3 py-2 w-full" />
                    </div>
                    <div>
                        <button className="btn btn-primary w-full py-4 px-6 text-lg font-bold" onClick={handleSearch}>
                            {t("header.search")}
                        </button>
                    </div>
                    <div className="md:col-span-7 flex items-center space-x-2 mt-2">
                        <input type="checkbox" id="directOnly" className="checkbox checkbox-primary checkbox-sm" checked={directOnly} onChange={() => setDirectOnly(!directOnly)} />
                        <label htmlFor="directOnly" className="text-sm text-gray-900 font-semibold">
                            {t("header.directOnly")}
                        </label>
                    </div>

                    {searchData && (
                        <div className="md:col-span-7 mt-4 bg-gray-100 p-4 rounded">
                            {searchData === "empty" ? (
                                <p className="text-red-500">{t("header.noData")}</p>
                            ) : (
                                <div>
                                    {searchData?.departure?.label && (
                                        <p><strong>{t("header.departure")}:</strong> {searchData.departure.label}</p>
                                    )}
                                    {searchData?.arrival?.label && (
                                        <p><strong>{t("header.arrival")}:</strong> {searchData.arrival.label}</p>
                                    )}
                                    {searchData?.startDate && (
                                        <p><strong>{t("header.startDate")}:</strong> {new Date(searchData.startDate).toLocaleDateString()}</p>
                                    )}
                                    {searchData?.returnDate && (
                                        <p><strong>{t("header.returnDate")}:</strong> {new Date(searchData.returnDate).toLocaleDateString()}</p>
                                    )}
                                    {searchData?.passengers && (
                                        <p><strong>{t("header.passengers")}:</strong> {t("header.adult")} {searchData.passengers}{t("header.person")}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <LoginSignupModal
                open={showModal}
                setOpen={setShowModal}
                onLoginSuccess={(name) => {
                    setIsLoggedIn(true);
                    setUserName(name);
                    localStorage.setItem("user", JSON.stringify({ name }));
                }}
            />
        </div>
    );
}

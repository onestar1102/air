import { useLocation } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

export default function AirlineSearch() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const departure = queryParams.get("departure");
    const arrival = queryParams.get("arrival");
    const date = queryParams.get("date");

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(21);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOption, setSortOption] = useState("추천순");
    const [airlineFilter, setAirlineFilter] = useState("전체");

    const [flightList, setFlightList] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [returnFlights, setReturnFlights] = useState([]);
    const [returnSortOption, setReturnSortOption] = useState("출발시간순");

    useEffect(() => {
        if (departure && arrival && date) {
            axios
                .get("/api/air", {
                    params: {
                        departure,
                        arrival,
                        date,
                        page,
                        size,
                    },
                })
                .then((response) => {
                    setFlightList(response.data.content);
                    setTotalPages(response.data.totalPages);
                })
                .catch((error) => {
                    console.error("항공편 데이터 불러오기 실패 : ", error);
                });
        }
    }, [departure, arrival, date, page, size]);

    useEffect(() => {
        setPage(0);
    }, [departure, arrival, date]);

    const airlineList = ["전체", ...new Set((flightList || []).map((f) => f.airlineName))];

    const sortedAndFilteredFlights = useMemo(() => {
        let filtered = [...flightList];
        if (airlineFilter !== "전체") {
            filtered = filtered.filter((flight) => flight.airlineName.startsWith(airlineFilter));
        }
        switch (sortOption) {
            case "가격순":
                filtered.sort((a, b) => a.economyCharge - b.economyCharge);
                break;
            case "출발시간순":
                filtered.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
                break;
            default:
                break;
        }
        return filtered;
    }, [sortOption, airlineFilter, flightList]);

    const sortedReturnFlights = useMemo(() => {
        const sorted = [...returnFlights];
        switch (returnSortOption) {
            case "가격순":
                sorted.sort((a, b) => a.economyCharge - b.economyCharge);
                break;
            case "출발시간순":
                sorted.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
                break;
            default:
                break;
        }
        return sorted;
    }, [returnFlights, returnSortOption]);

    const handleSelectFlight = (flight) => {
        setSelectedFlight(flight);
        const reverseDeparture = flight.arrival;
        const reverseArrival = flight.departure;
        const afterTime = flight.arrivalTime.slice(8); // HHmm
        const flightDate = flight.arrivalTime.slice(0, 8); // yyyyMMdd

        axios
            .get("/api/air/return", {
                params: {
                    departure: reverseDeparture,
                    arrival: reverseArrival,
                    date: flightDate,
                    afterTime,
                    page: 0,
                    size: 10,
                },
            })
            .then((res) => {
                setReturnFlights(res.data.content);
            })
            .catch((err) => {
                console.error("오는편 불러오기 실패", err);
                setReturnFlights([]);
            });
    };

    return (
        <div className="px-6 pt-16 pb-7 max-w-7xl mx-auto font-sans bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#f8fafc] min-h-screen rounded-3xl shadow-inner mt-12 mb-6">
            <div className="mt-[-32px] mb-4">
                <h2 className="text-4xl font-extrabold text-[#03284F] text-center tracking-tight pb-6">
                    항공권 검색 결과
                </h2>
            </div>

            {departure && arrival && date && (
                <>
                    {/* 필터 영역 */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-200 mb-8">
                        <h4 className="text-2xl font-bold text-[#03284F]">가는 편 항공편</h4>
                        <div className="flex flex-wrap gap-3 items-center">
                            {["추천순", "가격순", "출발시간순"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSortOption(option)}
                                    className={`px-4 py-1.5 rounded-full border transition font-medium ${
                                        sortOption === option
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                            <select
                                value={airlineFilter}
                                onChange={(e) => setAirlineFilter(e.target.value)}
                                className="px-3 py-1.5 rounded-full border border-gray-300 bg-white text-gray-700"
                            >
                                {airlineList.map((airline, idx) => (
                                    <option key={idx} value={airline}>
                                        {airline}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 항공편 리스트 */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {sortedAndFilteredFlights.map((flight, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleSelectFlight(flight)}
                                className="cursor-pointer p-6 border border-gray-100 rounded-3xl shadow-lg bg-white hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300"
                            >
                                <p className="font-bold text-lg text-[#03284F] mb-2">
                                    {flight.airlineName} {flight.flightNumber}
                                </p>
                                <p className="text-gray-700">
                                    출발 : {flight.departureTime} | 도착 : {flight.arrivalTime}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {flight.departure} → {flight.arrival}
                                </p>
                                <p className="mt-4 font-extrabold text-blue-600 text-xl">
                                    ₩{flight.economyCharge?.toLocaleString()}
                                </p>

                                {/* 오는 편 리스트 */}
                                {selectedFlight?.flightNumber === flight.flightNumber && (
                                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                        <div className="flex justify-between items-center mb-2">
                                            <h5 className="text-base font-semibold">오는 편</h5>
                                            <select
                                                value={returnSortOption}
                                                onChange={(e) => setReturnSortOption(e.target.value)}
                                                className="text-sm border px-2 py-1 rounded bg-white"
                                            >
                                                <option value="출발시간순">출발시간순</option>
                                                <option value="가격순">가격순</option>
                                            </select>
                                        </div>
                                        {sortedReturnFlights.length > 0 ? (
                                            sortedReturnFlights.map((r, rIdx) => (
                                                <div key={rIdx} className="mb-4">
                                                    <p className="font-medium text-sm">
                                                        {r.airlineName} {r.flightNumber}
                                                    </p>
                                                    <p className="text-sm text-gray-700">
                                                        출발 : {r.departureTime} | 도착 : {r.arrivalTime}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {r.departure} → {r.arrival}
                                                    </p>
                                                    <p className="text-blue-600 font-bold mt-1">
                                                        ₩{r.economyCharge?.toLocaleString()}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-400">오는 편 항공편이 없습니다.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 페이지네이션 */}
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                            className="btn btn-sm"
                        >
                            이전
                        </button>
                        <span className="px-3 py-2 text-sm font-semibold">
              {page + 1} / {totalPages}
            </span>
                        <button
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="btn btn-sm"
                        >
                            다음
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

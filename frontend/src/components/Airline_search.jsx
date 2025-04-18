import { useLocation } from "react-router-dom";
import React, {useState, useMemo, useEffect} from "react";
import axios from "axios";

export default function AirlineSearch() {
  const location = useLocation();
  const searchData = location.state?.searchData;

  const [sortOption, setSortOption] = useState("추천순");
  const [airlineFilter, setAirlineFilter] = useState("전체");
  const [flightList, setFlightList] = useState([]);

  useEffect(() => {
    axios.get("/api/air")
        .then(response => {
          const allFlights = response.data;

        //   출발지와 도착지 일치하는 항공편 필터링
          const filteredFlights = allFlights.filter(flight =>
          flight.departure === searchData.departure.value &&
          flight.arrival === searchData.arrival.value);

          setFlightList(filteredFlights);
        })
        .catch(error => {
          console.error("데이터 불러오기 실패:", error)
        }, [searchData]);
  })

  const airlineList = ["전체", ...new Set(flightList.map(f => f.airlineName))];

  const sortedAndFilteredFlights = useMemo(() => {
    let filtered = [...flightList];
    if (airlineFilter !== "전체") {
      filtered = filtered.filter(flight => flight.airlineName.startsWith(airlineFilter));
    }
    switch (sortOption) {
      case "가격순":
        filtered.sort((a, b) => a.economyCharge - b.economyCharge);
        break;
      case "출발시간순":
        filtered.sort((a, b) => parseInt(a.departureTime.replace(":", "")) - parseInt(b.departureTime.replace(":", "")));
        break;
      default:
        break;
    }
    return filtered;
  }, [sortOption, airlineFilter, flightList]);

  return (
    <div className="px-6 pt-16 pb-7 max-w-7xl mx-auto font-sans bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#f8fafc] min-h-screen rounded-3xl shadow-inner mt-12 mb-6">
      <div className="mt-[-32px] mb-4">
        <h2 className="text-4xl font-extrabold text-[#03284F] text-center tracking-tight pb-6">항공권 검색 결과</h2>
      </div>

      {/* 검색 정보 출력 */}
      {searchData ? (
        <div className="grid md:grid-cols-2 gap-6 bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-12">
          <div className="space-y-4 text-gray-800 text-lg">
            <div className="flex items-center">
              <span className="w-28 font-semibold text-gray-600">출발지</span>
              <span>{searchData.departure.label}</span>
            </div>
            <div className="flex items-center">
              <span className="w-28 font-semibold text-gray-600">도착지</span>
              <span>{searchData.arrival.label}</span>
            </div>
          </div>
          <div className="space-y-4 text-gray-800 text-lg mt-4 md:mt-0">
            <div className="flex items-center">
              <span className="w-28 font-semibold text-gray-600">가는 편</span>
              <span>{new Date(searchData.startDate).toLocaleDateString()}</span>
            </div>
            {searchData.returnDate && (
              <div className="flex items-center">
                <span className="w-28 font-semibold text-gray-600">오는 편</span>
                <span>{new Date(searchData.returnDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="w-28 font-semibold text-gray-600">여행자</span>
              <span>성인 {searchData.passengers}명</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-600 bg-red-50 p-5 rounded-xl shadow border border-red-200 text-center mt-8">
          검색 정보가 없습니다.
        </div>
      )}

      {/* 정렬/필터 + 리스트 */}
      {searchData && (
        <div className="mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-200 mb-8">
            <h4 className="text-2xl font-bold text-[#03284F]">추천 항공편</h4>
            <div className="flex flex-wrap gap-3 items-center">
              {["추천순", "가격순", "출발시간순"].map(option => (
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
                  <option key={idx} value={airline}>{airline}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedAndFilteredFlights.map((flight, idx) => (
                <div
                    key={idx}
                    className="p-6 border border-gray-100 rounded-3xl shadow-lg bg-white hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300"
                >
                  <p className="font-bold text-lg text-[#03284F] mb-2">{flight.airlineName} {flight.flightNumber}</p>
                  <p className="text-gray-700">출발 : {flight.departureTime} | 도착 : {flight.arrivalTime}</p>
                  <p className="text-sm text-gray-500 mt-1">{flight.departure} → {flight.arrival}</p>
                  <p className="mt-4 font-extrabold text-blue-600 text-xl">₩{flight.economyCharge?.toLocaleString()}</p>
                </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

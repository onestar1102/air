package com.air.air.model;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "item")
public class AirItem {
    @XmlElement(name = "vihicleId")
    private String airNumber;

    @XmlElement(name = "airlineNm")
    private String airlineName;

    @XmlElement(name = "depPlandTime") // 예정 출발시각
    private String departureTime;

    @XmlElement(name = "arrPlandTime") // 실제 출발시각
    private String arrivalTime;
    @XmlElement(name = "arrAirportNm")
    private String arrival;
    @XmlElement(name = "depAirportNm")
    private String departure;

    public String getAirNumber() {
        return airNumber;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public String getArrival() {
        return arrival;
    }

    public String getDeparture() {
        return departure;
    }
}
//API 응답받을 DTO

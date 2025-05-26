package com.air.air.model;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Getter;

@Getter // ✅ 모든 필드에 대해 getter 자동 생성 (Lombok)
@XmlRootElement(name = "item")
// ✅ 이 클래스는 XML의 <item> 요소와 매핑됨 (JAXB: Java XML Binding)
public class AirItem {

    @XmlElement(name = "vihicleId")
    // ✅ <vihicleId> 항목을 airNumber 필드로 매핑 (항공편 번호, 예: "KE123")
    private String airNumber;

    @XmlElement(name = "airlineNm")
    // ✅ <airlineNm> 항목을 airlineName 필드로 매핑 (항공사 이름, 예: "대한항공")
    private String airlineName;

    @XmlElement(name = "economyCharge")
    // ✅ <economyCharge> 항목을 economyCharge 필드로 매핑 (일반석 요금)
    private Integer economyCharge;

    @XmlElement(name = "prestigeCharge")
    // ✅ <prestigeCharge> 항목을 prestigeCharge 필드로 매핑 (프레스티지석 요금)
    private Integer prestigeCharge;

    @XmlElement(name = "depPlandTime")
    // ✅ <depPlandTime> 항목을 departureTime 필드로 매핑 (예정 출발 시각, 예: "202505271300")
    private String departureTime;

    @XmlElement(name = "arrPlandTime")
    // ✅ <arrPlandTime> 항목을 arrivalTime 필드로 매핑 (예정 도착 시각)
    private String arrivalTime;

    @XmlElement(name = "arrAirportNm")
    // ✅ <arrAirportNm> 항목을 arrival 필드로 매핑 (도착지 공항 이름, 예: "김포공항")
    private String arrival;

    @XmlElement(name = "depAirportNm")
    // ✅ <depAirportNm> 항목을 departure 필드로 매핑 (출발지 공항 이름, 예: "인천공항")
    private String departure;

    // ✅ JAXB는 private 필드만 매핑하므로, 명시적으로 getter들을 선언해주는 것이 안전
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

    public Integer getEconomyCharge() {
        return economyCharge;
    }

    public Integer getPrestigeCharge() {
        return prestigeCharge;
    }
}

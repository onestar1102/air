package com.air.air.model;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "item")
public class AirItem{
    @XmlElement(name = "airFln")
    private String airNumber;

    @XmlElement(name = "arrivedkor")
    private String arrival;

    @XmlElement(name = "std") // 예정 출발시각
    private String departureTime;

    @XmlElement(name = "etd") // 실제 출발시각
    private String arrivalTime;
}

//API 응답받을 DTO

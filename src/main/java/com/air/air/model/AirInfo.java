package com.air.air.model;
import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@XmlRootElement(name = "response")
@XmlAccessorType(XmlAccessType.FIELD)
public class AirInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String flightNumber;
    private String departure;
    private String arrival;
    private String departureTime;
    private String arrivalTime;
    private int seatsAvailable;
    private String airlineName;
    private Integer economyCharge;
    private Integer prestigeCharge;

}



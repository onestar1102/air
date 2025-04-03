package com.air.air.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

import java.util.List;

public class AirResponse {
    @XmlElement(name = "body")
    private Body body;

    public Body getBody(){
        return body;
    }

    @Data
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Body {
        @XmlElement(name = "items")
        private Items items;

        public Items getItems(){
            return items;
        }
    }

    @Data
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Items {
        @XmlElement(name = "item")
        private List<AirItem> itemList;

        public List<AirItem> getItemList(){
            return itemList;
        }
    }
}

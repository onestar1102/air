package com.air.air.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

import java.util.List;

@XmlRootElement(name = "response")
// ✅ XML 최상위 루트 요소인 <response>에 해당하는 클래스
@XmlAccessorType(XmlAccessType.FIELD)
// ✅ 필드 기반 접근: getter/setter가 아닌 실제 필드를 기준으로 XML 매핑
public class AirResponse {

    @XmlElement(name = "body")
    // ✅ <response> 내부의 <body> 요소 매핑
    private Body body;

    public Body getBody() {
        return body;
    }

    // ✅ <body> 하위 요소를 매핑하는 내부 클래스
    @Data
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Body {

        @XmlElement(name = "items")
        // ✅ <body> 내부의 <items> 요소 매핑
        private Items items;

        public Items getItems() {
            return items;
        }
    }

    // ✅ <items> 하위 요소를 매핑하는 내부 클래스
    @Data
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class Items {

        @XmlElement(name = "item")
        // ✅ <items> 내부의 <item> 다수 요소를 List<AirItem>으로 매핑
        private List<AirItem> itemList;

        public List<AirItem> getItemList() {
            return itemList;
        }
    }
}

import React, { useEffect, useState, useCallback } from "react";
import { OlaMaps } from '../../OlaMapsWebSDKNew/index';
import '../../assets/styles/map.css';

export default function App() {
    const olaMaps = new OlaMaps({
        apiKey: import.meta.env.VITE_OLA_MAP_API_KEY,
    });


    const [lat, setLat] = useState(75.9952);
    const [long, setLong] = useState(11.3214);


    useEffect(() => {
        const myMap = olaMaps.init({
            style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
            container: 'map',
            center: [lat, long],
            zoom: 10,
        });

        const geolocate = olaMaps.addGeolocateControls({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true,
        })

        myMap.addControl(geolocate)

        myMap.on('load', () => {
            geolocate.trigger()
            olaMaps
            .addMarker({color: 'red',})
            .setLngLat([lat, long])
            .addTo(myMap)
        })
    }, []);

    return (
        <div style={{ padding: "0px", fontFamily: "Arial, sans-serif" }}>
            <div id="map" style={{ width: "100%", height: "100%", minHeight: "100vh" }}></div>
        </div>
    );
}
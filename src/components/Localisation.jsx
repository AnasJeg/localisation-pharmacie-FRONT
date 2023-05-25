import React, { useEffect, useState } from 'react';

const Localisation = () => {
    const [map, setMap] = useState(null);
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        // Load the Google Maps API script
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBC7TrnSJ6ZvaNUaspY6zbmOAbrz5PFF04&callback=initMap";;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.addEventListener('load', initializeMap);

        return () => {
            script.removeEventListener('load', initializeMap);
        };
    }, []);

    useEffect(() => {
        // Fetch pharmacies data from the API
        fetch('http://localhost:8080/pharmacies/')
            .then((response) => response.json())
            .then((data) => {
                setPharmacies(data);
            })
            .catch((error) => {
                console.error('Error fetching pharmacies:', error);
            });
    }, []);

    const initializeMap = () => {
        const mapOptions = {
            center: { lat: 31.7945, lng: -7.0849 }, // Set your desired center coordinates
            zoom: 10, // Set the initial zoom level
        };

        const newMap = new window.google.maps.Map(document.getElementById('map'), mapOptions);
        setMap(newMap);
    };

    const clearMarkers = () => {
        // Remove all markers from the map
        if (map && map.markers) {
            map.markers.forEach((marker) => {
                marker.setMap(null);
            });
        }
    };

    useEffect(() => {
        if (map && pharmacies && pharmacies.length > 0) {
            // Clear existing markers
            clearMarkers();

            // Create new markers for each pharmacy
            pharmacies.forEach((pharmacy) => {
                const markerOptions = {
                    position: { lat: pharmacy.lat, lng: pharmacy.log }, // Use the pharmacy's latitude and longitude
                    map: map,
                    title: pharmacy.nom, // Set the marker title as the pharmacy's name
                };

                const marker = new window.google.maps.Marker(markerOptions);

                // Add click event listener to the marker
                marker.addListener('click', () => {
                    // Handle marker click event, e.g., display additional information
                    console.log(`Clicked marker: ${pharmacy.nom}`);
                });
            });
        }
    }, [map, pharmacies]);

    return <div id="map" style={{ width: '50%', height: '900px', marginLeft:'710px' , marginTop:'3rem' , borderRadius: '3rem' }}></div>;
};

export default Localisation;
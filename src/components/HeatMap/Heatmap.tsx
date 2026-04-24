import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

type MapLevel = "country" | "state" | "municipality";
type MapCategory = "coverage" | "infrastructure" | "vulnerability";

type FeatureData = {
  id: string;
  name: string;
  coords: { lat: number; lng: number };
  coverage: number;
  infrastructure: number;
  vulnerability: number;
};

const containerStyle = {
  width: "100%",
  height: "500px",
};

// 📍 límites de México
const mexicoBounds = {
  north: 32.7,
  south: 14.5,
  west: -118.5,
  east: -86.5,
};

const center = {
  lat: 23.6345,
  lng: -102.5528,
};

const getColor = (value: number) => {
  if (value >= 2.3) return "#22c55e";
  if (value >= 1) return "#eab308";
  return "#ef4444";
};

// 🧪 DATA FAKE (ahora con coordenadas reales-ish)
const fakeCountryData: FeatureData[] = [
  {
    id: "cdmx",
    name: "CDMX",
    coords: { lat: 19.4326, lng: -99.1332 },
    coverage: 3.2,
    infrastructure: 2.8,
    vulnerability: 0.9,
  },
  {
    id: "jalisco",
    name: "Jalisco",
    coords: { lat: 20.6597, lng: -103.3496 },
    coverage: 2.1,
    infrastructure: 1.5,
    vulnerability: 1.2,
  },
  {
    id: "oaxaca",
    name: "Oaxaca",
    coords: { lat: 17.0732, lng: -96.7266 },
    coverage: 0.8,
    infrastructure: 0.7,
    vulnerability: 2.5,
  },
];

const fakeStateData: FeatureData[] = [
  {
    id: "mun1",
    name: "Municipio 1",
    coords: { lat: 18.9, lng: -99.2 },
    coverage: 2.5,
    infrastructure: 2.0,
    vulnerability: 1.0,
  },
  {
    id: "mun2",
    name: "Municipio 2",
    coords: { lat: 18.7, lng: -99.0 },
    coverage: 1.5,
    infrastructure: 1.2,
    vulnerability: 1.8,
  },
];

const Heatmap: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDIV8GmFwVmXRCcndKsdf5NddQWg1HvwP4",
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const [level, setLevel] = useState<MapLevel>("country");
  const [category, setCategory] = useState<MapCategory>("coverage");
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const getData = () => {
    if (level === "country") return fakeCountryData;
    if (level === "state") return fakeStateData;
    return fakeStateData;
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // limpiar
    map.data.forEach((f) => map.data.remove(f));

    // crear "zonas clickeables" (círculos grandes simulando áreas)
    getData().forEach((item) => {
      const circle = new google.maps.Circle({
        center: item.coords,
        radius: level === "country" ? 200000 : 80000,
        fillColor: getColor(item[category]),
        fillOpacity: 0.6,
        strokeColor: "#000",
        strokeWeight: 1,
        map,
      });

      // CLICK
      circle.addListener("click", () => {
        if (level === "country") {
          setLevel("state");
          map.panTo(item.coords);
          map.setZoom(6);
        } else if (level === "state") {
          setLevel("municipality");
          map.panTo(item.coords);
          map.setZoom(8);
        } else {
          setSelectedPoint(item.coords);
        }
      });
    });
  }, [level, category]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div>
      {/* CONTROLES */}
      <div style={{ marginBottom: 10 }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as MapCategory)}
        >
          <option value="coverage">Cobertura Médica</option>
          <option value="infrastructure">Infraestructura</option>
          <option value="vulnerability">Vulnerabilidad</option>
        </select>

        <button onClick={() => setLevel("country")}>Reset</button>
      </div>

      {/* MAPA */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={(map) => (mapRef.current = map)}
        options={{
          restriction: {
            latLngBounds: mexicoBounds,
            strictBounds: true,
          },
          disableDefaultUI: true,
          zoomControl: false,
          gestureHandling: "none", // 🔥 NO mover mapa
        }}
      />

      {/* PIN FINAL */}
      {selectedPoint && (
        <div style={{ marginTop: 10 }}>
          📍 {selectedPoint.lat}, {selectedPoint.lng}
        </div>
      )}

      {/* LEYENDA */}
      <div style={{ marginTop: 20 }}>
        <strong>Escala:</strong>
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{ color: "#22c55e" }}>● Bueno (&gt;= 2.3)</span>
          <span style={{ color: "#eab308" }}>● Riesgo</span>
          <span style={{ color: "#ef4444" }}>● Crítico</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;

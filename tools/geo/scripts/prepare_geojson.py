import json
from pathlib import Path
from typing import Any

import geopandas as gpd


GEO_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = Path(__file__).resolve().parents[3]

INPUT_DIR = GEO_ROOT / "raw"
OUTPUT_DIR = REPO_ROOT / "public" / "geo"
OUTPUT_MUNICIPALITIES_DIR = OUTPUT_DIR / "municipalities"

STATE_SIMPLIFY_TOLERANCE = 0.005
MUNICIPALITY_SIMPLIFY_TOLERANCE = 0.002
COORDINATE_PRECISION = 5


def ensure_output_dirs() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_MUNICIPALITIES_DIR.mkdir(parents=True, exist_ok=True)


def round_coordinate_value(value: Any) -> Any:
    if isinstance(value, float):
        return round(value, COORDINATE_PRECISION)

    return value


def round_coordinates(coordinates: Any) -> Any:
    if isinstance(coordinates, (int, float)):
        return round_coordinate_value(coordinates)

    if isinstance(coordinates, list):
        return [round_coordinates(item) for item in coordinates]

    if isinstance(coordinates, tuple):
        return [round_coordinates(item) for item in coordinates]

    return coordinates


def compact_geojson_payload(payload: dict[str, Any]) -> dict[str, Any]:
    payload.pop("bbox", None)
    payload.pop("crs", None)
    payload.pop("name", None)

    for feature in payload.get("features", []):
        feature.pop("bbox", None)
        feature.pop("id", None)

        properties = feature.get("properties") or {}
        feature["properties"] = {
            key: value
            for key, value in properties.items()
            if value is not None and value != ""
        }

        geometry = feature.get("geometry")
        if geometry and "coordinates" in geometry:
            geometry["coordinates"] = round_coordinates(geometry["coordinates"])

    return payload


def write_compact_geojson(gdf: gpd.GeoDataFrame, output_file: Path) -> None:
    payload = json.loads(gdf.to_json(drop_id=True, na="drop"))
    compact_payload = compact_geojson_payload(payload)
    output_file.write_text(
        json.dumps(compact_payload, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )


def normalize_states(gdf: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    normalized = gdf.to_crs(epsg=4326).rename(
        columns={
            "CVEGEO": "code",
            "NOMGEO": "name",
        }
    )

    normalized = normalized[["code", "name", "geometry"]].copy()
    normalized["geometry"] = normalized["geometry"].simplify(
        tolerance=STATE_SIMPLIFY_TOLERANCE,
        preserve_topology=True,
    )

    return normalized


def normalize_municipalities(gdf: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    normalized = gdf.to_crs(epsg=4326).rename(
        columns={
            "CVEGEO": "code",
            "CVE_ENT": "stateCode",
            "CVE_MUN": "municipalityCode",
            "NOMGEO": "name",
        }
    )

    normalized = normalized[
        ["code", "stateCode", "municipalityCode", "name", "geometry"]
    ].copy()
    normalized["geometry"] = normalized["geometry"].simplify(
        tolerance=MUNICIPALITY_SIMPLIFY_TOLERANCE,
        preserve_topology=True,
    )

    return normalized


def is_states_shapefile(input_file: Path, gdf: gpd.GeoDataFrame) -> bool:
    columns = set(gdf.columns)

    return input_file.stem == "00ent" or (
        {"CVEGEO", "NOMGEO"}.issubset(columns)
        and "CVE_ENT" not in columns
        and "CVE_MUN" not in columns
    )


def is_municipalities_shapefile(gdf: gpd.GeoDataFrame) -> bool:
    return {"CVEGEO", "CVE_ENT", "CVE_MUN", "NOMGEO"}.issubset(gdf.columns)


def write_states(input_file: Path, gdf: gpd.GeoDataFrame) -> None:
    output_file = OUTPUT_DIR / "mexico-states.geojson"
    write_compact_geojson(normalize_states(gdf), output_file)
    print(f"Estados: {input_file} -> {output_file}")


def write_municipalities_by_state(input_file: Path, gdf: gpd.GeoDataFrame) -> None:
    municipalities = normalize_municipalities(gdf)

    for state_code, state_municipalities in municipalities.groupby("stateCode"):
        output_file = OUTPUT_MUNICIPALITIES_DIR / f"{state_code}.geojson"
        write_compact_geojson(state_municipalities, output_file)
        print(f"Municipios: {input_file} -> {output_file}")


def convert_shapefile(input_file: Path) -> None:
    gdf = gpd.read_file(input_file)

    if is_states_shapefile(input_file, gdf):
        write_states(input_file, gdf)
        return

    if is_municipalities_shapefile(gdf):
        write_municipalities_by_state(input_file, gdf)
        return

    print(f"Omitido: {input_file} no parece capa de estados ni municipios.")


def convert_all_raw() -> None:
    ensure_output_dirs()

    shapefiles = sorted(INPUT_DIR.rglob("*.shp"))

    if not shapefiles:
        raise FileNotFoundError(f"No se encontraron shapefiles en {INPUT_DIR}")

    for input_file in shapefiles:
        convert_shapefile(input_file)

    print("GeoJSON generado correctamente.")


if __name__ == "__main__":
    convert_all_raw()

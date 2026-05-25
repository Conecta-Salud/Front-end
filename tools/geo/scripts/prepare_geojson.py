from pathlib import Path

import geopandas as gpd


GEO_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = Path(__file__).resolve().parents[3]

INPUT_DIR = GEO_ROOT / "raw"
OUTPUT_DIR = REPO_ROOT / "public" / "geo"
OUTPUT_MUNICIPALITIES_DIR = OUTPUT_DIR / "municipalities"

STATE_SIMPLIFY_TOLERANCE = 0.005
MUNICIPALITY_SIMPLIFY_TOLERANCE = 0.002


def ensure_output_dirs() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_MUNICIPALITIES_DIR.mkdir(parents=True, exist_ok=True)


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
    normalize_states(gdf).to_file(output_file, driver="GeoJSON")
    print(f"Estados: {input_file} -> {output_file}")


def write_municipalities_by_state(input_file: Path, gdf: gpd.GeoDataFrame) -> None:
    municipalities = normalize_municipalities(gdf)

    for state_code, state_municipalities in municipalities.groupby("stateCode"):
        output_file = OUTPUT_MUNICIPALITIES_DIR / f"{state_code}.geojson"
        state_municipalities.to_file(output_file, driver="GeoJSON")
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

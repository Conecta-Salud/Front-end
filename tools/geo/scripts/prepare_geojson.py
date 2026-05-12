import geopandas as gpd
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

INPUT_DIR = ROOT / "raw_geo"
OUTPUT_DIR = ROOT / "public" / "geo"
OUTPUT_MUNICIPALITIES_DIR = OUTPUT_DIR / "municipalities"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_MUNICIPALITIES_DIR.mkdir(parents=True, exist_ok=True)

def prepare_states():
    input_file = INPUT_DIR / "mg_2025_integrado" / "conjunto_de_datos" / "00ent.shp"
    output_file = OUTPUT_DIR / "mexico-states.geojson"

    gdf = gpd.read_file(input_file)

    gdf = gdf.to_crs(epsg=4326)

    gdf = gdf.rename(columns={
        "CVEGEO": "code",
        "NOMGEO": "name",
    })

    gdf = gdf[["code", "name", "geometry"]]

    gdf["geometry"] = gdf["geometry"].simplify(
        tolerance=0.005,
        preserve_topology=True
    )

    gdf.to_file(output_file, driver="GeoJSON")

def prepare_morelos_municipalities():
    input_file = INPUT_DIR / "17_morelos" / "conjunto_de_datos" / "17mun.shp"
    output_file = OUTPUT_MUNICIPALITIES_DIR / "17.geojson"

    gdf = gpd.read_file(input_file)

    gdf = gdf.to_crs(epsg=4326)

    gdf = gdf.rename(columns={
        "CVEGEO": "code",
        "CVE_ENT": "stateCode",
        "CVE_MUN": "municipalityCode",
        "NOMGEO": "name",
    })

    gdf = gdf[["code", "stateCode", "municipalityCode", "name", "geometry"]]

    gdf["geometry"] = gdf["geometry"].simplify(
        tolerance=0.002,
        preserve_topology=True
    )

    gdf.to_file(output_file, driver="GeoJSON")

if __name__ == "__main__":
    prepare_states()
    prepare_morelos_municipalities()
    print("GeoJSON generado correctamente.")
import axios from 'axios';
import GeoJSON from "ol/format/GeoJSON";
import { Geometry, Point } from 'ol/geom';
import "ol/ol.css";
import { fromLonLat } from 'ol/proj';
import { VectorSourceEvent } from 'ol/source/Vector';
import { Data, PlotHoverEvent } from 'plotly.js';
import { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { RFeature, RInteraction, RLayerTile, RLayerVector, RMap, ROSM, RStyle } from 'rlayers';
import { RView } from 'rlayers/RMap';
import './App.css';

function App() {
  const [ plot, setPlot ] = useState<{plotData: any, plot: Data[]} | null>();
  const [ point,setPoint ] = useState<number[] | null>(null);
  const [ line, setLine ] = useState<number[][] | null>(null)
  const [view, setView] = useState<RView>({
    center: [-4904902.249118038, -2247490.9587757173],
    zoom: 15,
  });
  const [loading, setLoading] = useState(false);

  const plotComp = useRef<any>();

  function generateSeriesX(end: number, resolution: number): number[] {
    const array: number[] = [];

    for (let i = 0; i <= end; i += resolution) {
      array.push(i);
    }

    return array;
  }

  function makePlot(data: any) {
    var y_1 = data.elevations.map((e: any) => e.elevation);
    var x_1 = generateSeriesX(y_1.length, data.resolution);

    var y_2 = data.elevations.map((e: any) => e.elevation - 20);
    var x_2 = generateSeriesX(y_2.length, data.resolution);

    const hovertemplate = "Distância: %{x} m, Altitude: %{y}m <extra></extra>";

    setPlot({
      plotData: data,
      plot: [
        {
          x: x_1,
          y: y_1,
          name: "MDS de mentira",
          type: "scatter",
          fill: "tozeroy",
          hovertemplate: hovertemplate,
          hoverinfo: "x+y",
        },
        {
          x: x_2,
          y: y_2,
          name: "MDT",
          type: "scatter",
          fill: "tozeroy",
          hovertemplate: hovertemplate,
          hoverinfo: "x+y",
        },
      ],
    });
  }

  function handleHover(e: Readonly<PlotHoverEvent>) {
    if (e.points.length > 0) {
      setPoint(
        plot?.plotData.elevations[e.points[0].pointIndex].point.coordinates
      );
    } else {
      setPoint(null);
    }
  }

  async function getPerfil(noRetry?: number): Promise<any> {
    try {
      return (
        await axios.post(
          "https://perfil.apps.geo360.topocart.dev.br/perfil",
          {
            line: line,
            mdt: "ribeirao_neves_mdt",
          },
          {
            headers: {
              Authorization: "Bearer 8e43e938c44b38f147860a5ea7a3d966",
            },
          }
        )
      ).data;
    } catch (error) {
      noRetry = noRetry ? noRetry + 1 : 1;
      console.log(error);
      if (noRetry < 10) {
        return await getPerfil(noRetry);
      } else {
        console.log(":(");
      }
    }
  }

  useEffect(() => {
    if (line) {
      setLoading(true);
      getPerfil().then((data) => {
        makePlot(data);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [line]);

  return (
    <>
      <div className="container">
        {loading && (
          <div className="spinner-container" role="status" aria-live="polite">
            <div className="spinner"></div>
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <div className="inner-container">
          <RMap
            width={"100%"}
            height={"100%"}
            initial={view}
            view={[view, setView]}
          >
            <ROSM />

            <RLayerTile
              properties={{ label: "MDT de RbN" }}
              url="https://tiles.geo360.com.br/dados/ribeiraodasneves/mdt/{z}/{x}/{y}.png"
            />

            {line && (
              <RLayerVector
                features={new GeoJSON({
                  featureProjection: "EPSG:3857",
                }).readFeatures({
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: line,
                  },
                })}
              >
                <RStyle.RStyle>
                  <RStyle.RStroke color="#ff0000" width={5} />
                  <RStyle.RFill color="transparent" />
                </RStyle.RStyle>
              </RLayerVector>
            )}

            {point && (
              <RLayerVector>
                <RFeature geometry={new Point(fromLonLat(point))}>
                  <RStyle.RStyle>
                    <RStyle.RCircle radius={10}>
                      <RStyle.RFill color="red" />
                    </RStyle.RCircle>
                  </RStyle.RStyle>
                </RFeature>
              </RLayerVector>
            )}

            <RLayerVector
              onAddFeature={(e: VectorSourceEvent<Geometry>) => {
                var line: any = e.feature?.getGeometry();
                setLine(line.getCoordinates());
              }}
            >
              <RStyle.RStyle>
                <RStyle.RStroke color="red" width={3} />
                <RStyle.RFill color="rgba(0, 0, 0, 0.75)" />
              </RStyle.RStyle>

              <RInteraction.RDraw type={"LineString"} />
            </RLayerVector>
          </RMap>
        </div>
        <div className="inner-container">
          <Plot
            ref={plotComp}
            data={plot ? plot.plot : []}
            onHover={handleHover}
            onUnhover={() => setPoint([])}
            className="plot"
            layout={{
              title: "Perfil",
              autosize: true,
              yaxis: {
                range: plot?.plotData
                  ? [
                      Math.min(
                        ...plot?.plotData.elevations.map(
                          (e: any) => e.elevation as number
                        )
                      ) - 30,
                      Math.max(
                        ...plot?.plotData.elevations.map(
                          (e: any) => e.elevation as number
                        )
                      ) + 10,
                    ]
                  : [],
              },
            }}
          />
        </div>
      </div>
      <div className="github">
        <a
          href="https://github.com/paschendale/react-plotly-rlayers"
          target="_blank"
          rel="noreferrer"
        >
          paschendale/react-plotly-rlayers on Github
        </a>
      </div>
    </>
  );
}

export default App;
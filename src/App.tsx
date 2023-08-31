import { fromLonLat } from 'ol/proj';
import './App.css';
import Plot from 'react-plotly.js';
import { RFeature, RLayerVector, RMap, ROSM, RStyle } from 'rlayers';
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";
import { Data, PlotHoverEvent } from 'plotly.js';
import { useEffect, useRef, useState } from 'react';
import { RView } from 'rlayers/RMap';
import { Point } from 'ol/geom';

function App() {
  const [plot,setPlot] = useState<Data[]>([]);
  const [view, setView] = useState<RView>({ center: [-4904902.249118038,-2247490.9587757173], zoom: 15 });
  const [point,setPoint] = useState<any>([-44.067498558,-19.788058701]);

  const plotComp = useRef<any>()

  function generateSeriesX(end: number, resolution: number): number[] {
    const array: number[] = [];

    for (let i = 0; i <= end; i += resolution) {
        array.push(i);
    }

    return array;
  }

  function makePlot() {
    var y_1 = mock.elevations.map(e => e.elevation);
    var x_1 = generateSeriesX(y_1.length, mock.resolution);

    var y_2 = mock.elevations.map(e => e.elevation - 20);
    var x_2 = generateSeriesX(y_2.length, mock.resolution);

    const hovertemplate = "Distância: %{x} m, Altitude: %{y}m <extra></extra>";

    setPlot([
      {
        x: x_1,
        y: y_1,
        name: 'MDS',
        type: 'scatter',
        fill: 'tozeroy',
        hovertemplate: hovertemplate,
        hoverinfo: 'x+y',
      },
      {
        x: x_2,
        y: y_2,
        name: 'MDT',
        type: 'scatter',
        fill: 'tozeroy',
        hovertemplate: hovertemplate,
        hoverinfo: 'x+y',
      }
    ]);
  }

  function handleHover(e: Readonly<PlotHoverEvent>) {
    if (e.points.length > 0) {

      setPoint(mock.elevations[e.points[0].pointIndex].point.coordinates)
    } else {

      setPoint(null)
    }
  }

  useEffect(() => {
    makePlot()
  },[])

  return (
    <div className='container'>
      <div className="inner-container">
        <RMap 
          width={"100%"} 
          height={"100%"} 
          initial={view}
          view={[view, setView]}
        >
          <ROSM />
          <RLayerVector
           features={new GeoJSON({
             featureProjection: "EPSG:3857",
           }).readFeatures(mockLine)}
          >
            <RStyle.RStyle>
              <RStyle.RStroke color="#ff0000" width={5} />
              <RStyle.RFill color="transparent" />
            </RStyle.RStyle>
          </RLayerVector>

          <RLayerVector> 
            <RFeature
              geometry={new Point(fromLonLat(point))}
            >
              <RStyle.RStyle>
                <RStyle.RCircle radius={10}>
                  <RStyle.RFill color="red" />
                </RStyle.RCircle>
              </RStyle.RStyle>
            </RFeature>
          </RLayerVector>

        </RMap>
      </div>
      <div className="inner-container">
        <Plot
          ref={plotComp}
          data={plot}
          onHover={handleHover}
          onUnhover={() => setPoint([])}
          className='plot'
          layout={ {
            title: 'Perfil',
            autosize: true,
            yaxis: {
              range: [Math.min(...mock.elevations.map(e => e.elevation as number))-30,Math.max(...mock.elevations.map(e => e.elevation as number))+10]
            }
          } }
          />
      </div>
    </div>
  );
}

export default App;

var mockLine = {
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-44.067498558,-19.788058701],
      [-44.052709292,-19.777989454]
    ]
  }
}

var mock = {
  "resolution": 1,
  "elevations": [
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067498558,
                  -19.788058701
              ]
          },
          "elevation": 823.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067490811,
                  -19.788053426
              ]
          },
          "elevation": 824.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067483064,
                  -19.788048152
              ]
          },
          "elevation": 824.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067475317,
                  -19.788042877
              ]
          },
          "elevation": 824.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067467569,
                  -19.788037602
              ]
          },
          "elevation": 824.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067459822,
                  -19.788032328
              ]
          },
          "elevation": 824.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067452075,
                  -19.788027053
              ]
          },
          "elevation": 824.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067444328,
                  -19.788021779
              ]
          },
          "elevation": 824.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067436581,
                  -19.788016504
              ]
          },
          "elevation": 824.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067428834,
                  -19.788011229
              ]
          },
          "elevation": 824.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067421087,
                  -19.788005955
              ]
          },
          "elevation": 824.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06741334,
                  -19.78800068
              ]
          },
          "elevation": 824.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067405592,
                  -19.787995406
              ]
          },
          "elevation": 824.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067397845,
                  -19.787990131
              ]
          },
          "elevation": 824.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067390098,
                  -19.787984856
              ]
          },
          "elevation": 824.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067382351,
                  -19.787979582
              ]
          },
          "elevation": 824.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067374604,
                  -19.787974307
              ]
          },
          "elevation": 824.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067366857,
                  -19.787969032
              ]
          },
          "elevation": 824.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06735911,
                  -19.787963758
              ]
          },
          "elevation": 824.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067351362,
                  -19.787958483
              ]
          },
          "elevation": 824.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067343615,
                  -19.787953209
              ]
          },
          "elevation": 824.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067335868,
                  -19.787947934
              ]
          },
          "elevation": 824.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067328121,
                  -19.787942659
              ]
          },
          "elevation": 824.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067320374,
                  -19.787937385
              ]
          },
          "elevation": 824.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067312627,
                  -19.78793211
              ]
          },
          "elevation": 824.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06730488,
                  -19.787926835
              ]
          },
          "elevation": 824.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067297133,
                  -19.787921561
              ]
          },
          "elevation": 824.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067289385,
                  -19.787916286
              ]
          },
          "elevation": 824.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067281638,
                  -19.787911012
              ]
          },
          "elevation": 824.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067273891,
                  -19.787905737
              ]
          },
          "elevation": 824.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067266144,
                  -19.787900462
              ]
          },
          "elevation": 824.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067258397,
                  -19.787895188
              ]
          },
          "elevation": 824.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06725065,
                  -19.787889913
              ]
          },
          "elevation": 824.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067242903,
                  -19.787884639
              ]
          },
          "elevation": 824.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067235156,
                  -19.787879364
              ]
          },
          "elevation": 824.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067227408,
                  -19.787874089
              ]
          },
          "elevation": 824.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067219661,
                  -19.787868815
              ]
          },
          "elevation": 824.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067211914,
                  -19.78786354
              ]
          },
          "elevation": 825.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067204167,
                  -19.787858265
              ]
          },
          "elevation": 825.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06719642,
                  -19.787852991
              ]
          },
          "elevation": 825.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067188673,
                  -19.787847716
              ]
          },
          "elevation": 825.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067180926,
                  -19.787842442
              ]
          },
          "elevation": 825.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067173179,
                  -19.787837167
              ]
          },
          "elevation": 825.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067165431,
                  -19.787831892
              ]
          },
          "elevation": 825.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067157684,
                  -19.787826618
              ]
          },
          "elevation": 825.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067149937,
                  -19.787821343
              ]
          },
          "elevation": 825.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06714219,
                  -19.787816068
              ]
          },
          "elevation": 825.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067134443,
                  -19.787810794
              ]
          },
          "elevation": 825.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067126696,
                  -19.787805519
              ]
          },
          "elevation": 825.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067118949,
                  -19.787800245
              ]
          },
          "elevation": 826.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067111202,
                  -19.78779497
              ]
          },
          "elevation": 826.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067103454,
                  -19.787789695
              ]
          },
          "elevation": 827.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067095707,
                  -19.787784421
              ]
          },
          "elevation": 827.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06708796,
                  -19.787779146
              ]
          },
          "elevation": 827.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067080213,
                  -19.787773872
              ]
          },
          "elevation": 828.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067072466,
                  -19.787768597
              ]
          },
          "elevation": 828.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067064719,
                  -19.787763322
              ]
          },
          "elevation": 828.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067056972,
                  -19.787758048
              ]
          },
          "elevation": 829.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067049225,
                  -19.787752773
              ]
          },
          "elevation": 829.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067041477,
                  -19.787747498
              ]
          },
          "elevation": 829.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06703373,
                  -19.787742224
              ]
          },
          "elevation": 830.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067025983,
                  -19.787736949
              ]
          },
          "elevation": 830.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067018236,
                  -19.787731675
              ]
          },
          "elevation": 830.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067010489,
                  -19.7877264
              ]
          },
          "elevation": 830.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.067002742,
                  -19.787721125
              ]
          },
          "elevation": 830.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066994995,
                  -19.787715851
              ]
          },
          "elevation": 831
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066987248,
                  -19.787710576
              ]
          },
          "elevation": 831.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0669795,
                  -19.787705301
              ]
          },
          "elevation": 831.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066971753,
                  -19.787700027
              ]
          },
          "elevation": 831.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066964006,
                  -19.787694752
              ]
          },
          "elevation": 831.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066956259,
                  -19.787689478
              ]
          },
          "elevation": 831.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066948512,
                  -19.787684203
              ]
          },
          "elevation": 831.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066940765,
                  -19.787678928
              ]
          },
          "elevation": 831.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066933018,
                  -19.787673654
              ]
          },
          "elevation": 832.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06692527,
                  -19.787668379
              ]
          },
          "elevation": 832.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066917523,
                  -19.787663105
              ]
          },
          "elevation": 832.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066909776,
                  -19.78765783
              ]
          },
          "elevation": 832.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066902029,
                  -19.787652555
              ]
          },
          "elevation": 832.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066894282,
                  -19.787647281
              ]
          },
          "elevation": 832.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066886535,
                  -19.787642006
              ]
          },
          "elevation": 832.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066878788,
                  -19.787636731
              ]
          },
          "elevation": 832.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066871041,
                  -19.787631457
              ]
          },
          "elevation": 832.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066863293,
                  -19.787626182
              ]
          },
          "elevation": 833.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066855546,
                  -19.787620908
              ]
          },
          "elevation": 833.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066847799,
                  -19.787615633
              ]
          },
          "elevation": 833.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066840052,
                  -19.787610358
              ]
          },
          "elevation": 833.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066832305,
                  -19.787605084
              ]
          },
          "elevation": 833.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066824558,
                  -19.787599809
              ]
          },
          "elevation": 833.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066816811,
                  -19.787594534
              ]
          },
          "elevation": 833.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066809064,
                  -19.78758926
              ]
          },
          "elevation": 834.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066801316,
                  -19.787583985
              ]
          },
          "elevation": 834.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066793569,
                  -19.787578711
              ]
          },
          "elevation": 834.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066785822,
                  -19.787573436
              ]
          },
          "elevation": 834.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066778075,
                  -19.787568161
              ]
          },
          "elevation": 834.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066770328,
                  -19.787562887
              ]
          },
          "elevation": 834.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066762581,
                  -19.787557612
              ]
          },
          "elevation": 835.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066754834,
                  -19.787552338
              ]
          },
          "elevation": 835.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066747087,
                  -19.787547063
              ]
          },
          "elevation": 835.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066739339,
                  -19.787541788
              ]
          },
          "elevation": 835.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066731592,
                  -19.787536514
              ]
          },
          "elevation": 835.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066723845,
                  -19.787531239
              ]
          },
          "elevation": 835.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066716098,
                  -19.787525964
              ]
          },
          "elevation": 836.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066708351,
                  -19.78752069
              ]
          },
          "elevation": 836.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066700604,
                  -19.787515415
              ]
          },
          "elevation": 836.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066692857,
                  -19.787510141
              ]
          },
          "elevation": 836.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06668511,
                  -19.787504866
              ]
          },
          "elevation": 836.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066677362,
                  -19.787499591
              ]
          },
          "elevation": 837.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066669615,
                  -19.787494317
              ]
          },
          "elevation": 837.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066661868,
                  -19.787489042
              ]
          },
          "elevation": 837.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066654121,
                  -19.787483768
              ]
          },
          "elevation": 837.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066646374,
                  -19.787478493
              ]
          },
          "elevation": 837.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066638627,
                  -19.787473218
              ]
          },
          "elevation": 838.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06663088,
                  -19.787467944
              ]
          },
          "elevation": 838.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066623133,
                  -19.787462669
              ]
          },
          "elevation": 838.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066615385,
                  -19.787457394
              ]
          },
          "elevation": 838.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066607638,
                  -19.78745212
              ]
          },
          "elevation": 838.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066599891,
                  -19.787446845
              ]
          },
          "elevation": 838.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066592144,
                  -19.787441571
              ]
          },
          "elevation": 839.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066584397,
                  -19.787436296
              ]
          },
          "elevation": 839.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06657665,
                  -19.787431021
              ]
          },
          "elevation": 839.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066568903,
                  -19.787425747
              ]
          },
          "elevation": 839.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066561156,
                  -19.787420472
              ]
          },
          "elevation": 839.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066553408,
                  -19.787415197
              ]
          },
          "elevation": 840.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066545661,
                  -19.787409923
              ]
          },
          "elevation": 840.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066537914,
                  -19.787404648
              ]
          },
          "elevation": 840.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066530167,
                  -19.787399374
              ]
          },
          "elevation": 840.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06652242,
                  -19.787394099
              ]
          },
          "elevation": 841.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066514673,
                  -19.787388824
              ]
          },
          "elevation": 841.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066506926,
                  -19.78738355
              ]
          },
          "elevation": 841.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066499178,
                  -19.787378275
              ]
          },
          "elevation": 841.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066491431,
                  -19.787373001
              ]
          },
          "elevation": 842.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066483684,
                  -19.787367726
              ]
          },
          "elevation": 842.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066475937,
                  -19.787362451
              ]
          },
          "elevation": 842.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06646819,
                  -19.787357177
              ]
          },
          "elevation": 842.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066460443,
                  -19.787351902
              ]
          },
          "elevation": 842.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066452696,
                  -19.787346627
              ]
          },
          "elevation": 842.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066444949,
                  -19.787341353
              ]
          },
          "elevation": 843.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066437201,
                  -19.787336078
              ]
          },
          "elevation": 843.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066429454,
                  -19.787330804
              ]
          },
          "elevation": 843.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066421707,
                  -19.787325529
              ]
          },
          "elevation": 843.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06641396,
                  -19.787320254
              ]
          },
          "elevation": 843.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066406213,
                  -19.78731498
              ]
          },
          "elevation": 844.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066398466,
                  -19.787309705
              ]
          },
          "elevation": 844.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066390719,
                  -19.78730443
              ]
          },
          "elevation": 844.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066382972,
                  -19.787299156
              ]
          },
          "elevation": 844.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066375224,
                  -19.787293881
              ]
          },
          "elevation": 844.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066367477,
                  -19.787288607
              ]
          },
          "elevation": 844.65
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06635973,
                  -19.787283332
              ]
          },
          "elevation": 844.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066351983,
                  -19.787278057
              ]
          },
          "elevation": 844.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066344236,
                  -19.787272783
              ]
          },
          "elevation": 845.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066336489,
                  -19.787267508
              ]
          },
          "elevation": 845.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066328742,
                  -19.787262234
              ]
          },
          "elevation": 845.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066320995,
                  -19.787256959
              ]
          },
          "elevation": 845.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066313247,
                  -19.787251684
              ]
          },
          "elevation": 846.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0663055,
                  -19.78724641
              ]
          },
          "elevation": 846.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066297753,
                  -19.787241135
              ]
          },
          "elevation": 846.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066290006,
                  -19.78723586
              ]
          },
          "elevation": 846.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066282259,
                  -19.787230586
              ]
          },
          "elevation": 846.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066274512,
                  -19.787225311
              ]
          },
          "elevation": 847.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066266765,
                  -19.787220037
              ]
          },
          "elevation": 847.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066259018,
                  -19.787214762
              ]
          },
          "elevation": 847.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06625127,
                  -19.787209487
              ]
          },
          "elevation": 847.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066243523,
                  -19.787204213
              ]
          },
          "elevation": 847.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066235776,
                  -19.787198938
              ]
          },
          "elevation": 848.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066228029,
                  -19.787193663
              ]
          },
          "elevation": 848.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066220282,
                  -19.787188389
              ]
          },
          "elevation": 848.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066212535,
                  -19.787183114
              ]
          },
          "elevation": 848.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066204788,
                  -19.78717784
              ]
          },
          "elevation": 848.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066197041,
                  -19.787172565
              ]
          },
          "elevation": 849.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066189293,
                  -19.78716729
              ]
          },
          "elevation": 849.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066181546,
                  -19.787162016
              ]
          },
          "elevation": 849.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066173799,
                  -19.787156741
              ]
          },
          "elevation": 849.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066166052,
                  -19.787151467
              ]
          },
          "elevation": 849.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066158305,
                  -19.787146192
              ]
          },
          "elevation": 849.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066150558,
                  -19.787140917
              ]
          },
          "elevation": 849.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066142811,
                  -19.787135643
              ]
          },
          "elevation": 850.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066135064,
                  -19.787130368
              ]
          },
          "elevation": 850.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066127316,
                  -19.787125093
              ]
          },
          "elevation": 850.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066119569,
                  -19.787119819
              ]
          },
          "elevation": 850.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066111822,
                  -19.787114544
              ]
          },
          "elevation": 850.7
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066104075,
                  -19.78710927
              ]
          },
          "elevation": 850.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066096328,
                  -19.787103995
              ]
          },
          "elevation": 851.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066088581,
                  -19.78709872
              ]
          },
          "elevation": 851.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066080834,
                  -19.787093446
              ]
          },
          "elevation": 851.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066073086,
                  -19.787088171
              ]
          },
          "elevation": 851.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066065339,
                  -19.787082896
              ]
          },
          "elevation": 851.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066057592,
                  -19.787077622
              ]
          },
          "elevation": 851.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066049845,
                  -19.787072347
              ]
          },
          "elevation": 852.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066042098,
                  -19.787067073
              ]
          },
          "elevation": 852.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066034351,
                  -19.787061798
              ]
          },
          "elevation": 852.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066026604,
                  -19.787056523
              ]
          },
          "elevation": 852.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066018857,
                  -19.787051249
              ]
          },
          "elevation": 852.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066011109,
                  -19.787045974
              ]
          },
          "elevation": 852.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.066003362,
                  -19.7870407
              ]
          },
          "elevation": 853.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065995615,
                  -19.787035425
              ]
          },
          "elevation": 853.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065987868,
                  -19.78703015
              ]
          },
          "elevation": 853.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065980121,
                  -19.787024876
              ]
          },
          "elevation": 853.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065972374,
                  -19.787019601
              ]
          },
          "elevation": 853.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065964627,
                  -19.787014326
              ]
          },
          "elevation": 853.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06595688,
                  -19.787009052
              ]
          },
          "elevation": 854.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065949132,
                  -19.787003777
              ]
          },
          "elevation": 854.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065941385,
                  -19.786998503
              ]
          },
          "elevation": 854.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065933638,
                  -19.786993228
              ]
          },
          "elevation": 854.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065925891,
                  -19.786987953
              ]
          },
          "elevation": 854.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065918144,
                  -19.786982679
              ]
          },
          "elevation": 854.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065910397,
                  -19.786977404
              ]
          },
          "elevation": 854.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06590265,
                  -19.786972129
              ]
          },
          "elevation": 854.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065894903,
                  -19.786966855
              ]
          },
          "elevation": 855.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065887155,
                  -19.78696158
              ]
          },
          "elevation": 855.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065879408,
                  -19.786956306
              ]
          },
          "elevation": 855.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065871661,
                  -19.786951031
              ]
          },
          "elevation": 855.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065863914,
                  -19.786945756
              ]
          },
          "elevation": 855.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065856167,
                  -19.786940482
              ]
          },
          "elevation": 855.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06584842,
                  -19.786935207
              ]
          },
          "elevation": 856
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065840673,
                  -19.786929933
              ]
          },
          "elevation": 856.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065832926,
                  -19.786924658
              ]
          },
          "elevation": 856.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065825178,
                  -19.786919383
              ]
          },
          "elevation": 856.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065817431,
                  -19.786914109
              ]
          },
          "elevation": 856.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065809684,
                  -19.786908834
              ]
          },
          "elevation": 856.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065801937,
                  -19.786903559
              ]
          },
          "elevation": 856.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06579419,
                  -19.786898285
              ]
          },
          "elevation": 856.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065786443,
                  -19.78689301
              ]
          },
          "elevation": 856.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065778696,
                  -19.786887736
              ]
          },
          "elevation": 857.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065770949,
                  -19.786882461
              ]
          },
          "elevation": 857.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065763201,
                  -19.786877186
              ]
          },
          "elevation": 857.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065755454,
                  -19.786871912
              ]
          },
          "elevation": 857.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065747707,
                  -19.786866637
              ]
          },
          "elevation": 857.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06573996,
                  -19.786861362
              ]
          },
          "elevation": 857.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065732213,
                  -19.786856088
              ]
          },
          "elevation": 857.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065724466,
                  -19.786850813
              ]
          },
          "elevation": 857.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065716719,
                  -19.786845539
              ]
          },
          "elevation": 857.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065708971,
                  -19.786840264
              ]
          },
          "elevation": 858.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065701224,
                  -19.786834989
              ]
          },
          "elevation": 858.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065693477,
                  -19.786829715
              ]
          },
          "elevation": 858.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06568573,
                  -19.78682444
              ]
          },
          "elevation": 858.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065677983,
                  -19.786819166
              ]
          },
          "elevation": 858.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065670236,
                  -19.786813891
              ]
          },
          "elevation": 858.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065662489,
                  -19.786808616
              ]
          },
          "elevation": 858.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065654742,
                  -19.786803342
              ]
          },
          "elevation": 858.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065646994,
                  -19.786798067
              ]
          },
          "elevation": 859.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065639247,
                  -19.786792792
              ]
          },
          "elevation": 859.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0656315,
                  -19.786787518
              ]
          },
          "elevation": 859.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065623753,
                  -19.786782243
              ]
          },
          "elevation": 859.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065616006,
                  -19.786776969
              ]
          },
          "elevation": 859.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065608259,
                  -19.786771694
              ]
          },
          "elevation": 859.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065600512,
                  -19.786766419
              ]
          },
          "elevation": 859.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065592765,
                  -19.786761145
              ]
          },
          "elevation": 859.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065585017,
                  -19.78675587
              ]
          },
          "elevation": 859.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06557727,
                  -19.786750595
              ]
          },
          "elevation": 859.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065569523,
                  -19.786745321
              ]
          },
          "elevation": 859.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065561776,
                  -19.786740046
              ]
          },
          "elevation": 859.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065554029,
                  -19.786734772
              ]
          },
          "elevation": 859.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065546282,
                  -19.786729497
              ]
          },
          "elevation": 859.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065538535,
                  -19.786724222
              ]
          },
          "elevation": 859.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065530788,
                  -19.786718948
              ]
          },
          "elevation": 859.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06552304,
                  -19.786713673
              ]
          },
          "elevation": 859.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065515293,
                  -19.786708399
              ]
          },
          "elevation": 859.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065507546,
                  -19.786703124
              ]
          },
          "elevation": 858.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065499799,
                  -19.786697849
              ]
          },
          "elevation": 858.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065492052,
                  -19.786692575
              ]
          },
          "elevation": 858.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065484305,
                  -19.7866873
              ]
          },
          "elevation": 858.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065476558,
                  -19.786682025
              ]
          },
          "elevation": 858.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065468811,
                  -19.786676751
              ]
          },
          "elevation": 858.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065461063,
                  -19.786671476
              ]
          },
          "elevation": 858.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065453316,
                  -19.786666202
              ]
          },
          "elevation": 857.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065445569,
                  -19.786660927
              ]
          },
          "elevation": 857.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065437822,
                  -19.786655652
              ]
          },
          "elevation": 857.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065430075,
                  -19.786650378
              ]
          },
          "elevation": 857.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065422328,
                  -19.786645103
              ]
          },
          "elevation": 857.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065414581,
                  -19.786639829
              ]
          },
          "elevation": 856.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065406834,
                  -19.786634554
              ]
          },
          "elevation": 856.92
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065399086,
                  -19.786629279
              ]
          },
          "elevation": 856.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065391339,
                  -19.786624005
              ]
          },
          "elevation": 856.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065383592,
                  -19.78661873
              ]
          },
          "elevation": 856.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065375845,
                  -19.786613455
              ]
          },
          "elevation": 855.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065368098,
                  -19.786608181
              ]
          },
          "elevation": 855.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065360351,
                  -19.786602906
              ]
          },
          "elevation": 855.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065352604,
                  -19.786597632
              ]
          },
          "elevation": 855.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065344857,
                  -19.786592357
              ]
          },
          "elevation": 854.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065337109,
                  -19.786587082
              ]
          },
          "elevation": 854.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065329362,
                  -19.786581808
              ]
          },
          "elevation": 854.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065321615,
                  -19.786576533
              ]
          },
          "elevation": 854.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065313868,
                  -19.786571258
              ]
          },
          "elevation": 854.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065306121,
                  -19.786565984
              ]
          },
          "elevation": 853.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065298374,
                  -19.786560709
              ]
          },
          "elevation": 853.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065290627,
                  -19.786555435
              ]
          },
          "elevation": 853.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065282879,
                  -19.78655016
              ]
          },
          "elevation": 853.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065275132,
                  -19.786544885
              ]
          },
          "elevation": 853.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065267385,
                  -19.786539611
              ]
          },
          "elevation": 852.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065259638,
                  -19.786534336
              ]
          },
          "elevation": 852.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065251891,
                  -19.786529062
              ]
          },
          "elevation": 852.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065244144,
                  -19.786523787
              ]
          },
          "elevation": 852.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065236397,
                  -19.786518512
              ]
          },
          "elevation": 852.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06522865,
                  -19.786513238
              ]
          },
          "elevation": 852.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065220902,
                  -19.786507963
              ]
          },
          "elevation": 852.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065213155,
                  -19.786502688
              ]
          },
          "elevation": 852.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065205408,
                  -19.786497414
              ]
          },
          "elevation": 852.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065197661,
                  -19.786492139
              ]
          },
          "elevation": 852.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065189914,
                  -19.786486865
              ]
          },
          "elevation": 852.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065182167,
                  -19.78648159
              ]
          },
          "elevation": 852.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06517442,
                  -19.786476315
              ]
          },
          "elevation": 853.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065166673,
                  -19.786471041
              ]
          },
          "elevation": 853.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065158925,
                  -19.786465766
              ]
          },
          "elevation": 853.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065151178,
                  -19.786460491
              ]
          },
          "elevation": 853.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065143431,
                  -19.786455217
              ]
          },
          "elevation": 853.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065135684,
                  -19.786449942
              ]
          },
          "elevation": 854.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065127937,
                  -19.786444668
              ]
          },
          "elevation": 854.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06512019,
                  -19.786439393
              ]
          },
          "elevation": 854.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065112443,
                  -19.786434118
              ]
          },
          "elevation": 854.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065104696,
                  -19.786428844
              ]
          },
          "elevation": 854.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065096948,
                  -19.786423569
              ]
          },
          "elevation": 854.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065089201,
                  -19.786418295
              ]
          },
          "elevation": 854.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065081454,
                  -19.78641302
              ]
          },
          "elevation": 854.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065073707,
                  -19.786407745
              ]
          },
          "elevation": 854.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06506596,
                  -19.786402471
              ]
          },
          "elevation": 854.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065058213,
                  -19.786397196
              ]
          },
          "elevation": 854.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065050466,
                  -19.786391921
              ]
          },
          "elevation": 854.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065042719,
                  -19.786386647
              ]
          },
          "elevation": 854.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065034971,
                  -19.786381372
              ]
          },
          "elevation": 854.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065027224,
                  -19.786376098
              ]
          },
          "elevation": 854.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065019477,
                  -19.786370823
              ]
          },
          "elevation": 854.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06501173,
                  -19.786365548
              ]
          },
          "elevation": 854.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.065003983,
                  -19.786360274
              ]
          },
          "elevation": 853.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064996236,
                  -19.786354999
              ]
          },
          "elevation": 853.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064988489,
                  -19.786349724
              ]
          },
          "elevation": 853.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064980742,
                  -19.78634445
              ]
          },
          "elevation": 853.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064972994,
                  -19.786339175
              ]
          },
          "elevation": 853.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064965247,
                  -19.786333901
              ]
          },
          "elevation": 852.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0649575,
                  -19.786328626
              ]
          },
          "elevation": 852.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064949753,
                  -19.786323351
              ]
          },
          "elevation": 852.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064942006,
                  -19.786318077
              ]
          },
          "elevation": 852.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064934259,
                  -19.786312802
              ]
          },
          "elevation": 851.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064926512,
                  -19.786307528
              ]
          },
          "elevation": 851.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064918765,
                  -19.786302253
              ]
          },
          "elevation": 851.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064911017,
                  -19.786296978
              ]
          },
          "elevation": 850.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06490327,
                  -19.786291704
              ]
          },
          "elevation": 850.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064895523,
                  -19.786286429
              ]
          },
          "elevation": 850.65
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064887776,
                  -19.786281154
              ]
          },
          "elevation": 850.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064880029,
                  -19.78627588
              ]
          },
          "elevation": 849.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064872282,
                  -19.786270605
              ]
          },
          "elevation": 849.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064864535,
                  -19.786265331
              ]
          },
          "elevation": 849.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064856787,
                  -19.786260056
              ]
          },
          "elevation": 849.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06484904,
                  -19.786254781
              ]
          },
          "elevation": 849.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064841293,
                  -19.786249507
              ]
          },
          "elevation": 848.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064833546,
                  -19.786244232
              ]
          },
          "elevation": 848.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064825799,
                  -19.786238957
              ]
          },
          "elevation": 847.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064818052,
                  -19.786233683
              ]
          },
          "elevation": 848.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064810305,
                  -19.786228408
              ]
          },
          "elevation": 847.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064802558,
                  -19.786223134
              ]
          },
          "elevation": 848.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06479481,
                  -19.786217859
              ]
          },
          "elevation": 847.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064787063,
                  -19.786212584
              ]
          },
          "elevation": 847.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064779316,
                  -19.78620731
              ]
          },
          "elevation": 848.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064771569,
                  -19.786202035
              ]
          },
          "elevation": 848.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064763822,
                  -19.786196761
              ]
          },
          "elevation": 848.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064756075,
                  -19.786191486
              ]
          },
          "elevation": 847.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064748328,
                  -19.786186211
              ]
          },
          "elevation": 847.7
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064740581,
                  -19.786180937
              ]
          },
          "elevation": 847.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064732833,
                  -19.786175662
              ]
          },
          "elevation": 847.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064725086,
                  -19.786170387
              ]
          },
          "elevation": 847.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064717339,
                  -19.786165113
              ]
          },
          "elevation": 847.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064709592,
                  -19.786159838
              ]
          },
          "elevation": 847.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064701845,
                  -19.786154564
              ]
          },
          "elevation": 847.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064694098,
                  -19.786149289
              ]
          },
          "elevation": 847.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064686351,
                  -19.786144014
              ]
          },
          "elevation": 847.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064678604,
                  -19.78613874
              ]
          },
          "elevation": 847.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064670856,
                  -19.786133465
              ]
          },
          "elevation": 847.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064663109,
                  -19.78612819
              ]
          },
          "elevation": 848.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064655362,
                  -19.786122916
              ]
          },
          "elevation": 848.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064647615,
                  -19.786117641
              ]
          },
          "elevation": 848.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064639868,
                  -19.786112367
              ]
          },
          "elevation": 848.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064632121,
                  -19.786107092
              ]
          },
          "elevation": 849.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064624374,
                  -19.786101817
              ]
          },
          "elevation": 849.7
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064616627,
                  -19.786096543
              ]
          },
          "elevation": 850.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064608879,
                  -19.786091268
              ]
          },
          "elevation": 850.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064601132,
                  -19.786085994
              ]
          },
          "elevation": 850.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064593385,
                  -19.786080719
              ]
          },
          "elevation": 850.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064585638,
                  -19.786075444
              ]
          },
          "elevation": 851.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064577891,
                  -19.78607017
              ]
          },
          "elevation": 851.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064570144,
                  -19.786064895
              ]
          },
          "elevation": 851.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064562397,
                  -19.78605962
              ]
          },
          "elevation": 852.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06455465,
                  -19.786054346
              ]
          },
          "elevation": 852.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064546902,
                  -19.786049071
              ]
          },
          "elevation": 852.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064539155,
                  -19.786043797
              ]
          },
          "elevation": 853.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064531408,
                  -19.786038522
              ]
          },
          "elevation": 853.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064523661,
                  -19.786033247
              ]
          },
          "elevation": 853.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064515914,
                  -19.786027973
              ]
          },
          "elevation": 853.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064508167,
                  -19.786022698
              ]
          },
          "elevation": 854.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06450042,
                  -19.786017423
              ]
          },
          "elevation": 854.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064492673,
                  -19.786012149
              ]
          },
          "elevation": 854.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064484925,
                  -19.786006874
              ]
          },
          "elevation": 855.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064477178,
                  -19.7860016
              ]
          },
          "elevation": 855.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064469431,
                  -19.785996325
              ]
          },
          "elevation": 855.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064461684,
                  -19.78599105
              ]
          },
          "elevation": 855.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064453937,
                  -19.785985776
              ]
          },
          "elevation": 856.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06444619,
                  -19.785980501
              ]
          },
          "elevation": 856.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064438443,
                  -19.785975227
              ]
          },
          "elevation": 856.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064430695,
                  -19.785969952
              ]
          },
          "elevation": 857.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064422948,
                  -19.785964677
              ]
          },
          "elevation": 857.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064415201,
                  -19.785959403
              ]
          },
          "elevation": 857.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064407454,
                  -19.785954128
              ]
          },
          "elevation": 857.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064399707,
                  -19.785948853
              ]
          },
          "elevation": 857.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06439196,
                  -19.785943579
              ]
          },
          "elevation": 858.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064384213,
                  -19.785938304
              ]
          },
          "elevation": 858.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064376466,
                  -19.78593303
              ]
          },
          "elevation": 858.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064368718,
                  -19.785927755
              ]
          },
          "elevation": 859.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064360971,
                  -19.78592248
              ]
          },
          "elevation": 859.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064353224,
                  -19.785917206
              ]
          },
          "elevation": 859.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064345477,
                  -19.785911931
              ]
          },
          "elevation": 859.92
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06433773,
                  -19.785906656
              ]
          },
          "elevation": 860.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064329983,
                  -19.785901382
              ]
          },
          "elevation": 860.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064322236,
                  -19.785896107
              ]
          },
          "elevation": 860.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064314489,
                  -19.785890833
              ]
          },
          "elevation": 860.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064306741,
                  -19.785885558
              ]
          },
          "elevation": 860.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064298994,
                  -19.785880283
              ]
          },
          "elevation": 860.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064291247,
                  -19.785875009
              ]
          },
          "elevation": 860.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0642835,
                  -19.785869734
              ]
          },
          "elevation": 861.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064275753,
                  -19.78586446
              ]
          },
          "elevation": 861.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064268006,
                  -19.785859185
              ]
          },
          "elevation": 861.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064260259,
                  -19.78585391
              ]
          },
          "elevation": 862.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064252512,
                  -19.785848636
              ]
          },
          "elevation": 862.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064244764,
                  -19.785843361
              ]
          },
          "elevation": 863.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064237017,
                  -19.785838086
              ]
          },
          "elevation": 863.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06422927,
                  -19.785832812
              ]
          },
          "elevation": 864.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064221523,
                  -19.785827537
              ]
          },
          "elevation": 864.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064213776,
                  -19.785822263
              ]
          },
          "elevation": 864.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064206029,
                  -19.785816988
              ]
          },
          "elevation": 865.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064198282,
                  -19.785811713
              ]
          },
          "elevation": 865.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064190535,
                  -19.785806439
              ]
          },
          "elevation": 865.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064182787,
                  -19.785801164
              ]
          },
          "elevation": 865.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06417504,
                  -19.785795889
              ]
          },
          "elevation": 866.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064167293,
                  -19.785790615
              ]
          },
          "elevation": 866.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064159546,
                  -19.78578534
              ]
          },
          "elevation": 866.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064151799,
                  -19.785780066
              ]
          },
          "elevation": 866.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064144052,
                  -19.785774791
              ]
          },
          "elevation": 867.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064136305,
                  -19.785769516
              ]
          },
          "elevation": 867.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064128558,
                  -19.785764242
              ]
          },
          "elevation": 867.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06412081,
                  -19.785758967
              ]
          },
          "elevation": 868.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064113063,
                  -19.785753693
              ]
          },
          "elevation": 868.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064105316,
                  -19.785748418
              ]
          },
          "elevation": 868.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064097569,
                  -19.785743143
              ]
          },
          "elevation": 868.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064089822,
                  -19.785737869
              ]
          },
          "elevation": 869.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064082075,
                  -19.785732594
              ]
          },
          "elevation": 869.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064074328,
                  -19.785727319
              ]
          },
          "elevation": 869.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064066581,
                  -19.785722045
              ]
          },
          "elevation": 869.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064058833,
                  -19.78571677
              ]
          },
          "elevation": 869.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064051086,
                  -19.785711496
              ]
          },
          "elevation": 870.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064043339,
                  -19.785706221
              ]
          },
          "elevation": 870.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064035592,
                  -19.785700946
              ]
          },
          "elevation": 870.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064027845,
                  -19.785695672
              ]
          },
          "elevation": 870.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064020098,
                  -19.785690397
              ]
          },
          "elevation": 870.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064012351,
                  -19.785685123
              ]
          },
          "elevation": 871.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.064004603,
                  -19.785679848
              ]
          },
          "elevation": 871.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063996856,
                  -19.785674573
              ]
          },
          "elevation": 871.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063989109,
                  -19.785669299
              ]
          },
          "elevation": 871.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063981362,
                  -19.785664024
              ]
          },
          "elevation": 871.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063973615,
                  -19.785658749
              ]
          },
          "elevation": 871.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063965868,
                  -19.785653475
              ]
          },
          "elevation": 871.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063958121,
                  -19.7856482
              ]
          },
          "elevation": 871.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063950374,
                  -19.785642926
              ]
          },
          "elevation": 871.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063942626,
                  -19.785637651
              ]
          },
          "elevation": 871.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063934879,
                  -19.785632376
              ]
          },
          "elevation": 871.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063927132,
                  -19.785627102
              ]
          },
          "elevation": 871.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063919385,
                  -19.785621827
              ]
          },
          "elevation": 871.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063911638,
                  -19.785616552
              ]
          },
          "elevation": 871.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063903891,
                  -19.785611278
              ]
          },
          "elevation": 871.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063896144,
                  -19.785606003
              ]
          },
          "elevation": 871.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063888397,
                  -19.785600729
              ]
          },
          "elevation": 871.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063880649,
                  -19.785595454
              ]
          },
          "elevation": 871.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063872902,
                  -19.785590179
              ]
          },
          "elevation": 871.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063865155,
                  -19.785584905
              ]
          },
          "elevation": 871.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063857408,
                  -19.78557963
              ]
          },
          "elevation": 871.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063849661,
                  -19.785574356
              ]
          },
          "elevation": 870.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063841914,
                  -19.785569081
              ]
          },
          "elevation": 870.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063834167,
                  -19.785563806
              ]
          },
          "elevation": 870.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06382642,
                  -19.785558532
              ]
          },
          "elevation": 870.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063818672,
                  -19.785553257
              ]
          },
          "elevation": 870.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063810925,
                  -19.785547982
              ]
          },
          "elevation": 870.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063803178,
                  -19.785542708
              ]
          },
          "elevation": 870.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063795431,
                  -19.785537433
              ]
          },
          "elevation": 870.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063787684,
                  -19.785532159
              ]
          },
          "elevation": 869.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063779937,
                  -19.785526884
              ]
          },
          "elevation": 869.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06377219,
                  -19.785521609
              ]
          },
          "elevation": 869.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063764443,
                  -19.785516335
              ]
          },
          "elevation": 869.65
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063756695,
                  -19.78551106
              ]
          },
          "elevation": 869.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063748948,
                  -19.785505785
              ]
          },
          "elevation": 869.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063741201,
                  -19.785500511
              ]
          },
          "elevation": 869.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063733454,
                  -19.785495236
              ]
          },
          "elevation": 868.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063725707,
                  -19.785489962
              ]
          },
          "elevation": 868.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06371796,
                  -19.785484687
              ]
          },
          "elevation": 868.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063710213,
                  -19.785479412
              ]
          },
          "elevation": 868.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063702466,
                  -19.785474138
              ]
          },
          "elevation": 867.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063694718,
                  -19.785468863
              ]
          },
          "elevation": 867.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063686971,
                  -19.785463589
              ]
          },
          "elevation": 867.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063679224,
                  -19.785458314
              ]
          },
          "elevation": 867.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063671477,
                  -19.785453039
              ]
          },
          "elevation": 866.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06366373,
                  -19.785447765
              ]
          },
          "elevation": 866.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063655983,
                  -19.78544249
              ]
          },
          "elevation": 866.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063648236,
                  -19.785437215
              ]
          },
          "elevation": 866.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063640489,
                  -19.785431941
              ]
          },
          "elevation": 865.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063632741,
                  -19.785426666
              ]
          },
          "elevation": 865.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063624994,
                  -19.785421392
              ]
          },
          "elevation": 865.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063617247,
                  -19.785416117
              ]
          },
          "elevation": 865
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0636095,
                  -19.785410842
              ]
          },
          "elevation": 864.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063601753,
                  -19.785405568
              ]
          },
          "elevation": 864.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063594006,
                  -19.785400293
              ]
          },
          "elevation": 864.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063586259,
                  -19.785395018
              ]
          },
          "elevation": 864.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063578511,
                  -19.785389744
              ]
          },
          "elevation": 863.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063570764,
                  -19.785384469
              ]
          },
          "elevation": 863.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063563017,
                  -19.785379195
              ]
          },
          "elevation": 863.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06355527,
                  -19.78537392
              ]
          },
          "elevation": 863.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063547523,
                  -19.785368645
              ]
          },
          "elevation": 863.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063539776,
                  -19.785363371
              ]
          },
          "elevation": 863.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063532029,
                  -19.785358096
              ]
          },
          "elevation": 862.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063524282,
                  -19.785352822
              ]
          },
          "elevation": 862.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063516534,
                  -19.785347547
              ]
          },
          "elevation": 862.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063508787,
                  -19.785342272
              ]
          },
          "elevation": 862.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06350104,
                  -19.785336998
              ]
          },
          "elevation": 861.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063493293,
                  -19.785331723
              ]
          },
          "elevation": 861.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063485546,
                  -19.785326448
              ]
          },
          "elevation": 860.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063477799,
                  -19.785321174
              ]
          },
          "elevation": 860.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063470052,
                  -19.785315899
              ]
          },
          "elevation": 860.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063462305,
                  -19.785310625
              ]
          },
          "elevation": 859.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063454557,
                  -19.78530535
              ]
          },
          "elevation": 859.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06344681,
                  -19.785300075
              ]
          },
          "elevation": 859.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063439063,
                  -19.785294801
              ]
          },
          "elevation": 858.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063431316,
                  -19.785289526
              ]
          },
          "elevation": 858.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063423569,
                  -19.785284251
              ]
          },
          "elevation": 858.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063415822,
                  -19.785278977
              ]
          },
          "elevation": 857.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063408075,
                  -19.785273702
              ]
          },
          "elevation": 857.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063400328,
                  -19.785268428
              ]
          },
          "elevation": 856.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06339258,
                  -19.785263153
              ]
          },
          "elevation": 856.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063384833,
                  -19.785257878
              ]
          },
          "elevation": 856.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063377086,
                  -19.785252604
              ]
          },
          "elevation": 856.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063369339,
                  -19.785247329
              ]
          },
          "elevation": 856.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063361592,
                  -19.785242055
              ]
          },
          "elevation": 856.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063353845,
                  -19.78523678
              ]
          },
          "elevation": 856.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063346098,
                  -19.785231505
              ]
          },
          "elevation": 856.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063338351,
                  -19.785226231
              ]
          },
          "elevation": 856.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063330603,
                  -19.785220956
              ]
          },
          "elevation": 855.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063322856,
                  -19.785215681
              ]
          },
          "elevation": 855.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063315109,
                  -19.785210407
              ]
          },
          "elevation": 855.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063307362,
                  -19.785205132
              ]
          },
          "elevation": 855.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063299615,
                  -19.785199858
              ]
          },
          "elevation": 855
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063291868,
                  -19.785194583
              ]
          },
          "elevation": 854.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063284121,
                  -19.785189308
              ]
          },
          "elevation": 854.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063276374,
                  -19.785184034
              ]
          },
          "elevation": 854.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063268626,
                  -19.785178759
              ]
          },
          "elevation": 854.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063260879,
                  -19.785173484
              ]
          },
          "elevation": 854.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063253132,
                  -19.78516821
              ]
          },
          "elevation": 853.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063245385,
                  -19.785162935
              ]
          },
          "elevation": 853.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063237638,
                  -19.785157661
              ]
          },
          "elevation": 853.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063229891,
                  -19.785152386
              ]
          },
          "elevation": 853.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063222144,
                  -19.785147111
              ]
          },
          "elevation": 853.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063214396,
                  -19.785141837
              ]
          },
          "elevation": 853.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063206649,
                  -19.785136562
              ]
          },
          "elevation": 853.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063198902,
                  -19.785131288
              ]
          },
          "elevation": 853.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063191155,
                  -19.785126013
              ]
          },
          "elevation": 853.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063183408,
                  -19.785120738
              ]
          },
          "elevation": 852.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063175661,
                  -19.785115464
              ]
          },
          "elevation": 852.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063167914,
                  -19.785110189
              ]
          },
          "elevation": 852.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063160167,
                  -19.785104914
              ]
          },
          "elevation": 852.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063152419,
                  -19.78509964
              ]
          },
          "elevation": 851.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063144672,
                  -19.785094365
              ]
          },
          "elevation": 851.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063136925,
                  -19.785089091
              ]
          },
          "elevation": 851.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063129178,
                  -19.785083816
              ]
          },
          "elevation": 850.92
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063121431,
                  -19.785078541
              ]
          },
          "elevation": 850.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063113684,
                  -19.785073267
              ]
          },
          "elevation": 850.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063105937,
                  -19.785067992
              ]
          },
          "elevation": 850.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06309819,
                  -19.785062717
              ]
          },
          "elevation": 850.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063090442,
                  -19.785057443
              ]
          },
          "elevation": 849.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063082695,
                  -19.785052168
              ]
          },
          "elevation": 849.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063074948,
                  -19.785046894
              ]
          },
          "elevation": 849.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063067201,
                  -19.785041619
              ]
          },
          "elevation": 848.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063059454,
                  -19.785036344
              ]
          },
          "elevation": 848.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063051707,
                  -19.78503107
              ]
          },
          "elevation": 848.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06304396,
                  -19.785025795
              ]
          },
          "elevation": 847.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063036213,
                  -19.785020521
              ]
          },
          "elevation": 847.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063028465,
                  -19.785015246
              ]
          },
          "elevation": 847.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063020718,
                  -19.785009971
              ]
          },
          "elevation": 847.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063012971,
                  -19.785004697
              ]
          },
          "elevation": 846.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.063005224,
                  -19.784999422
              ]
          },
          "elevation": 846.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062997477,
                  -19.784994147
              ]
          },
          "elevation": 846.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06298973,
                  -19.784988873
              ]
          },
          "elevation": 845.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062981983,
                  -19.784983598
              ]
          },
          "elevation": 846.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062974236,
                  -19.784978324
              ]
          },
          "elevation": 846.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062966488,
                  -19.784973049
              ]
          },
          "elevation": 845.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062958741,
                  -19.784967774
              ]
          },
          "elevation": 846
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062950994,
                  -19.7849625
              ]
          },
          "elevation": 845.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062943247,
                  -19.784957225
              ]
          },
          "elevation": 845.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0629355,
                  -19.78495195
              ]
          },
          "elevation": 845.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062927753,
                  -19.784946676
              ]
          },
          "elevation": 845.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062920006,
                  -19.784941401
              ]
          },
          "elevation": 845.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062912259,
                  -19.784936127
              ]
          },
          "elevation": 845.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062904511,
                  -19.784930852
              ]
          },
          "elevation": 845.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062896764,
                  -19.784925577
              ]
          },
          "elevation": 845.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062889017,
                  -19.784920303
              ]
          },
          "elevation": 845.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06288127,
                  -19.784915028
              ]
          },
          "elevation": 845.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062873523,
                  -19.784909754
              ]
          },
          "elevation": 845.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062865776,
                  -19.784904479
              ]
          },
          "elevation": 844.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062858029,
                  -19.784899204
              ]
          },
          "elevation": 844.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062850282,
                  -19.78489393
              ]
          },
          "elevation": 844.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062842534,
                  -19.784888655
              ]
          },
          "elevation": 844.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062834787,
                  -19.78488338
              ]
          },
          "elevation": 844.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06282704,
                  -19.784878106
              ]
          },
          "elevation": 844.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062819293,
                  -19.784872831
              ]
          },
          "elevation": 844.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062811546,
                  -19.784867557
              ]
          },
          "elevation": 844.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062803799,
                  -19.784862282
              ]
          },
          "elevation": 844.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062796052,
                  -19.784857007
              ]
          },
          "elevation": 844.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062788304,
                  -19.784851733
              ]
          },
          "elevation": 844
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062780557,
                  -19.784846458
              ]
          },
          "elevation": 843.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06277281,
                  -19.784841183
              ]
          },
          "elevation": 844.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062765063,
                  -19.784835909
              ]
          },
          "elevation": 843.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062757316,
                  -19.784830634
              ]
          },
          "elevation": 843.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062749569,
                  -19.78482536
              ]
          },
          "elevation": 843.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062741822,
                  -19.784820085
              ]
          },
          "elevation": 843.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062734075,
                  -19.78481481
              ]
          },
          "elevation": 842.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062726327,
                  -19.784809536
              ]
          },
          "elevation": 842.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06271858,
                  -19.784804261
              ]
          },
          "elevation": 842.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062710833,
                  -19.784798987
              ]
          },
          "elevation": 842.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062703086,
                  -19.784793712
              ]
          },
          "elevation": 842.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062695339,
                  -19.784788437
              ]
          },
          "elevation": 841.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062687592,
                  -19.784783163
              ]
          },
          "elevation": 841.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062679845,
                  -19.784777888
              ]
          },
          "elevation": 841.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062672098,
                  -19.784772613
              ]
          },
          "elevation": 841.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06266435,
                  -19.784767339
              ]
          },
          "elevation": 841.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062656603,
                  -19.784762064
              ]
          },
          "elevation": 841.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062648856,
                  -19.78475679
              ]
          },
          "elevation": 840.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062641109,
                  -19.784751515
              ]
          },
          "elevation": 840.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062633362,
                  -19.78474624
              ]
          },
          "elevation": 840.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062625615,
                  -19.784740966
              ]
          },
          "elevation": 840.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062617868,
                  -19.784735691
              ]
          },
          "elevation": 840.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062610121,
                  -19.784730417
              ]
          },
          "elevation": 839.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062602373,
                  -19.784725142
              ]
          },
          "elevation": 839.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062594626,
                  -19.784719867
              ]
          },
          "elevation": 839.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062586879,
                  -19.784714593
              ]
          },
          "elevation": 839.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062579132,
                  -19.784709318
              ]
          },
          "elevation": 838.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062571385,
                  -19.784704043
              ]
          },
          "elevation": 838.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062563638,
                  -19.784698769
              ]
          },
          "elevation": 838.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062555891,
                  -19.784693494
              ]
          },
          "elevation": 838.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062548144,
                  -19.78468822
              ]
          },
          "elevation": 838.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062540396,
                  -19.784682945
              ]
          },
          "elevation": 838.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062532649,
                  -19.78467767
              ]
          },
          "elevation": 838.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062524902,
                  -19.784672396
              ]
          },
          "elevation": 837.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062517155,
                  -19.784667121
              ]
          },
          "elevation": 838
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062509408,
                  -19.784661846
              ]
          },
          "elevation": 837.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062501661,
                  -19.784656572
              ]
          },
          "elevation": 837.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062493914,
                  -19.784651297
              ]
          },
          "elevation": 837.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062486167,
                  -19.784646023
              ]
          },
          "elevation": 837.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062478419,
                  -19.784640748
              ]
          },
          "elevation": 837.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062470672,
                  -19.784635473
              ]
          },
          "elevation": 837.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062462925,
                  -19.784630199
              ]
          },
          "elevation": 837.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062455178,
                  -19.784624924
              ]
          },
          "elevation": 837.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062447431,
                  -19.78461965
              ]
          },
          "elevation": 837.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062439684,
                  -19.784614375
              ]
          },
          "elevation": 837.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062431937,
                  -19.7846091
              ]
          },
          "elevation": 837.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06242419,
                  -19.784603826
              ]
          },
          "elevation": 837.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062416442,
                  -19.784598551
              ]
          },
          "elevation": 836.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062408695,
                  -19.784593276
              ]
          },
          "elevation": 836.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062400948,
                  -19.784588002
              ]
          },
          "elevation": 836.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062393201,
                  -19.784582727
              ]
          },
          "elevation": 836.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062385454,
                  -19.784577453
              ]
          },
          "elevation": 836.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062377707,
                  -19.784572178
              ]
          },
          "elevation": 836.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06236996,
                  -19.784566903
              ]
          },
          "elevation": 836.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062362212,
                  -19.784561629
              ]
          },
          "elevation": 835.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062354465,
                  -19.784556354
              ]
          },
          "elevation": 835.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062346718,
                  -19.784551079
              ]
          },
          "elevation": 835.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062338971,
                  -19.784545805
              ]
          },
          "elevation": 835.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062331224,
                  -19.78454053
              ]
          },
          "elevation": 835.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062323477,
                  -19.784535256
              ]
          },
          "elevation": 835.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06231573,
                  -19.784529981
              ]
          },
          "elevation": 835.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062307983,
                  -19.784524706
              ]
          },
          "elevation": 835.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062300235,
                  -19.784519432
              ]
          },
          "elevation": 835.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062292488,
                  -19.784514157
              ]
          },
          "elevation": 835.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062284741,
                  -19.784508883
              ]
          },
          "elevation": 835.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062276994,
                  -19.784503608
              ]
          },
          "elevation": 835
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062269247,
                  -19.784498333
              ]
          },
          "elevation": 835
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0622615,
                  -19.784493059
              ]
          },
          "elevation": 834.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062253753,
                  -19.784487784
              ]
          },
          "elevation": 834.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062246006,
                  -19.784482509
              ]
          },
          "elevation": 834.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062238258,
                  -19.784477235
              ]
          },
          "elevation": 834.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062230511,
                  -19.78447196
              ]
          },
          "elevation": 834.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062222764,
                  -19.784466686
              ]
          },
          "elevation": 834.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062215017,
                  -19.784461411
              ]
          },
          "elevation": 834.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06220727,
                  -19.784456136
              ]
          },
          "elevation": 834.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062199523,
                  -19.784450862
              ]
          },
          "elevation": 834.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062191776,
                  -19.784445587
              ]
          },
          "elevation": 834.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062184029,
                  -19.784440312
              ]
          },
          "elevation": 834.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062176281,
                  -19.784435038
              ]
          },
          "elevation": 834.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062168534,
                  -19.784429763
              ]
          },
          "elevation": 834.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062160787,
                  -19.784424489
              ]
          },
          "elevation": 834.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06215304,
                  -19.784419214
              ]
          },
          "elevation": 834.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062145293,
                  -19.784413939
              ]
          },
          "elevation": 834.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062137546,
                  -19.784408665
              ]
          },
          "elevation": 833.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062129799,
                  -19.78440339
              ]
          },
          "elevation": 833.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062122052,
                  -19.784398116
              ]
          },
          "elevation": 833.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062114304,
                  -19.784392841
              ]
          },
          "elevation": 833.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062106557,
                  -19.784387566
              ]
          },
          "elevation": 833.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06209881,
                  -19.784382292
              ]
          },
          "elevation": 833.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062091063,
                  -19.784377017
              ]
          },
          "elevation": 833.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062083316,
                  -19.784371742
              ]
          },
          "elevation": 833.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062075569,
                  -19.784366468
              ]
          },
          "elevation": 833.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062067822,
                  -19.784361193
              ]
          },
          "elevation": 833.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062060075,
                  -19.784355919
              ]
          },
          "elevation": 833.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062052327,
                  -19.784350644
              ]
          },
          "elevation": 833.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06204458,
                  -19.784345369
              ]
          },
          "elevation": 833.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062036833,
                  -19.784340095
              ]
          },
          "elevation": 833.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062029086,
                  -19.78433482
              ]
          },
          "elevation": 832.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062021339,
                  -19.784329545
              ]
          },
          "elevation": 832.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062013592,
                  -19.784324271
              ]
          },
          "elevation": 832.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.062005845,
                  -19.784318996
              ]
          },
          "elevation": 832.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061998098,
                  -19.784313722
              ]
          },
          "elevation": 832.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06199035,
                  -19.784308447
              ]
          },
          "elevation": 832.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061982603,
                  -19.784303172
              ]
          },
          "elevation": 832.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061974856,
                  -19.784297898
              ]
          },
          "elevation": 832.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061967109,
                  -19.784292623
              ]
          },
          "elevation": 832.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061959362,
                  -19.784287349
              ]
          },
          "elevation": 832.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061951615,
                  -19.784282074
              ]
          },
          "elevation": 832.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061943868,
                  -19.784276799
              ]
          },
          "elevation": 832.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06193612,
                  -19.784271525
              ]
          },
          "elevation": 832.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061928373,
                  -19.78426625
              ]
          },
          "elevation": 832.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061920626,
                  -19.784260975
              ]
          },
          "elevation": 832.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061912879,
                  -19.784255701
              ]
          },
          "elevation": 832.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061905132,
                  -19.784250426
              ]
          },
          "elevation": 832.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061897385,
                  -19.784245152
              ]
          },
          "elevation": 832.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061889638,
                  -19.784239877
              ]
          },
          "elevation": 832.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061881891,
                  -19.784234602
              ]
          },
          "elevation": 832.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061874143,
                  -19.784229328
              ]
          },
          "elevation": 832.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061866396,
                  -19.784224053
              ]
          },
          "elevation": 832.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061858649,
                  -19.784218778
              ]
          },
          "elevation": 832.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061850902,
                  -19.784213504
              ]
          },
          "elevation": 832.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061843155,
                  -19.784208229
              ]
          },
          "elevation": 832.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061835408,
                  -19.784202955
              ]
          },
          "elevation": 831.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061827661,
                  -19.78419768
              ]
          },
          "elevation": 831.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061819914,
                  -19.784192405
              ]
          },
          "elevation": 831.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061812166,
                  -19.784187131
              ]
          },
          "elevation": 831.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061804419,
                  -19.784181856
              ]
          },
          "elevation": 831.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061796672,
                  -19.784176582
              ]
          },
          "elevation": 831.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061788925,
                  -19.784171307
              ]
          },
          "elevation": 831.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061781178,
                  -19.784166032
              ]
          },
          "elevation": 831.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061773431,
                  -19.784160758
              ]
          },
          "elevation": 831.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061765684,
                  -19.784155483
              ]
          },
          "elevation": 831.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061757937,
                  -19.784150208
              ]
          },
          "elevation": 831.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061750189,
                  -19.784144934
              ]
          },
          "elevation": 831.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061742442,
                  -19.784139659
              ]
          },
          "elevation": 831.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061734695,
                  -19.784134385
              ]
          },
          "elevation": 831.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061726948,
                  -19.78412911
              ]
          },
          "elevation": 831.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061719201,
                  -19.784123835
              ]
          },
          "elevation": 831.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061711454,
                  -19.784118561
              ]
          },
          "elevation": 831.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061703707,
                  -19.784113286
              ]
          },
          "elevation": 831.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06169596,
                  -19.784108011
              ]
          },
          "elevation": 831.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061688212,
                  -19.784102737
              ]
          },
          "elevation": 830.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061680465,
                  -19.784097462
              ]
          },
          "elevation": 830.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061672718,
                  -19.784092188
              ]
          },
          "elevation": 830.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061664971,
                  -19.784086913
              ]
          },
          "elevation": 830.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061657224,
                  -19.784081638
              ]
          },
          "elevation": 830.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061649477,
                  -19.784076364
              ]
          },
          "elevation": 830.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06164173,
                  -19.784071089
              ]
          },
          "elevation": 830.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061633983,
                  -19.784065815
              ]
          },
          "elevation": 830.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061626235,
                  -19.78406054
              ]
          },
          "elevation": 830.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061618488,
                  -19.784055265
              ]
          },
          "elevation": 830.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061610741,
                  -19.784049991
              ]
          },
          "elevation": 830.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061602994,
                  -19.784044716
              ]
          },
          "elevation": 830.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061595247,
                  -19.784039441
              ]
          },
          "elevation": 830.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0615875,
                  -19.784034167
              ]
          },
          "elevation": 830.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061579753,
                  -19.784028892
              ]
          },
          "elevation": 830.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061572006,
                  -19.784023618
              ]
          },
          "elevation": 830.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061564258,
                  -19.784018343
              ]
          },
          "elevation": 830.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061556511,
                  -19.784013068
              ]
          },
          "elevation": 829.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061548764,
                  -19.784007794
              ]
          },
          "elevation": 829.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061541017,
                  -19.784002519
              ]
          },
          "elevation": 829.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06153327,
                  -19.783997244
              ]
          },
          "elevation": 829.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061525523,
                  -19.78399197
              ]
          },
          "elevation": 829.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061517776,
                  -19.783986695
              ]
          },
          "elevation": 829.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061510028,
                  -19.783981421
              ]
          },
          "elevation": 829.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061502281,
                  -19.783976146
              ]
          },
          "elevation": 829.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061494534,
                  -19.783970871
              ]
          },
          "elevation": 829.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061486787,
                  -19.783965597
              ]
          },
          "elevation": 829.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06147904,
                  -19.783960322
              ]
          },
          "elevation": 829.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061471293,
                  -19.783955048
              ]
          },
          "elevation": 829.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061463546,
                  -19.783949773
              ]
          },
          "elevation": 829.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061455799,
                  -19.783944498
              ]
          },
          "elevation": 829.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061448051,
                  -19.783939224
              ]
          },
          "elevation": 829.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061440304,
                  -19.783933949
              ]
          },
          "elevation": 829.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061432557,
                  -19.783928674
              ]
          },
          "elevation": 829.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06142481,
                  -19.7839234
              ]
          },
          "elevation": 828.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061417063,
                  -19.783918125
              ]
          },
          "elevation": 828.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061409316,
                  -19.783912851
              ]
          },
          "elevation": 828.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061401569,
                  -19.783907576
              ]
          },
          "elevation": 828.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061393822,
                  -19.783902301
              ]
          },
          "elevation": 828.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061386074,
                  -19.783897027
              ]
          },
          "elevation": 828.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061378327,
                  -19.783891752
              ]
          },
          "elevation": 828.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06137058,
                  -19.783886477
              ]
          },
          "elevation": 828.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061362833,
                  -19.783881203
              ]
          },
          "elevation": 828.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061355086,
                  -19.783875928
              ]
          },
          "elevation": 828.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061347339,
                  -19.783870654
              ]
          },
          "elevation": 828.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061339592,
                  -19.783865379
              ]
          },
          "elevation": 828.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061331845,
                  -19.783860104
              ]
          },
          "elevation": 828.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061324097,
                  -19.78385483
              ]
          },
          "elevation": 827.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06131635,
                  -19.783849555
              ]
          },
          "elevation": 827.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061308603,
                  -19.783844281
              ]
          },
          "elevation": 827.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061300856,
                  -19.783839006
              ]
          },
          "elevation": 827.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061293109,
                  -19.783833731
              ]
          },
          "elevation": 827.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061285362,
                  -19.783828457
              ]
          },
          "elevation": 827.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061277615,
                  -19.783823182
              ]
          },
          "elevation": 827.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061269868,
                  -19.783817907
              ]
          },
          "elevation": 827.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06126212,
                  -19.783812633
              ]
          },
          "elevation": 827.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061254373,
                  -19.783807358
              ]
          },
          "elevation": 827.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061246626,
                  -19.783802084
              ]
          },
          "elevation": 827.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061238879,
                  -19.783796809
              ]
          },
          "elevation": 827.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061231132,
                  -19.783791534
              ]
          },
          "elevation": 827.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061223385,
                  -19.78378626
              ]
          },
          "elevation": 827.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061215638,
                  -19.783780985
              ]
          },
          "elevation": 826.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061207891,
                  -19.783775711
              ]
          },
          "elevation": 826.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061200143,
                  -19.783770436
              ]
          },
          "elevation": 826.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061192396,
                  -19.783765161
              ]
          },
          "elevation": 826.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061184649,
                  -19.783759887
              ]
          },
          "elevation": 826.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061176902,
                  -19.783754612
              ]
          },
          "elevation": 826.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061169155,
                  -19.783749337
              ]
          },
          "elevation": 826.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061161408,
                  -19.783744063
              ]
          },
          "elevation": 826.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061153661,
                  -19.783738788
              ]
          },
          "elevation": 826.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061145914,
                  -19.783733514
              ]
          },
          "elevation": 826.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061138166,
                  -19.783728239
              ]
          },
          "elevation": 826.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061130419,
                  -19.783722964
              ]
          },
          "elevation": 826
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061122672,
                  -19.78371769
              ]
          },
          "elevation": 825.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061114925,
                  -19.783712415
              ]
          },
          "elevation": 825.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061107178,
                  -19.78370714
              ]
          },
          "elevation": 825.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061099431,
                  -19.783701866
              ]
          },
          "elevation": 825.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061091684,
                  -19.783696591
              ]
          },
          "elevation": 825.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061083936,
                  -19.783691317
              ]
          },
          "elevation": 825.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061076189,
                  -19.783686042
              ]
          },
          "elevation": 825.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061068442,
                  -19.783680767
              ]
          },
          "elevation": 825.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061060695,
                  -19.783675493
              ]
          },
          "elevation": 825.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061052948,
                  -19.783670218
              ]
          },
          "elevation": 825.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061045201,
                  -19.783664944
              ]
          },
          "elevation": 825.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061037454,
                  -19.783659669
              ]
          },
          "elevation": 825.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061029707,
                  -19.783654394
              ]
          },
          "elevation": 825.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061021959,
                  -19.78364912
              ]
          },
          "elevation": 824.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061014212,
                  -19.783643845
              ]
          },
          "elevation": 824.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.061006465,
                  -19.78363857
              ]
          },
          "elevation": 824.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060998718,
                  -19.783633296
              ]
          },
          "elevation": 824.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060990971,
                  -19.783628021
              ]
          },
          "elevation": 824.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060983224,
                  -19.783622747
              ]
          },
          "elevation": 824.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060975477,
                  -19.783617472
              ]
          },
          "elevation": 824.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06096773,
                  -19.783612197
              ]
          },
          "elevation": 824.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060959982,
                  -19.783606923
              ]
          },
          "elevation": 824.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060952235,
                  -19.783601648
              ]
          },
          "elevation": 823.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060944488,
                  -19.783596373
              ]
          },
          "elevation": 823.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060936741,
                  -19.783591099
              ]
          },
          "elevation": 823.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060928994,
                  -19.783585824
              ]
          },
          "elevation": 823.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060921247,
                  -19.78358055
              ]
          },
          "elevation": 823.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0609135,
                  -19.783575275
              ]
          },
          "elevation": 823.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060905753,
                  -19.78357
              ]
          },
          "elevation": 823.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060898005,
                  -19.783564726
              ]
          },
          "elevation": 823.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060890258,
                  -19.783559451
              ]
          },
          "elevation": 823.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060882511,
                  -19.783554177
              ]
          },
          "elevation": 823.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060874764,
                  -19.783548902
              ]
          },
          "elevation": 822.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060867017,
                  -19.783543627
              ]
          },
          "elevation": 822.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06085927,
                  -19.783538353
              ]
          },
          "elevation": 822.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060851523,
                  -19.783533078
              ]
          },
          "elevation": 822.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060843776,
                  -19.783527803
              ]
          },
          "elevation": 822.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060836028,
                  -19.783522529
              ]
          },
          "elevation": 822.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060828281,
                  -19.783517254
              ]
          },
          "elevation": 822.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060820534,
                  -19.78351198
              ]
          },
          "elevation": 822.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060812787,
                  -19.783506705
              ]
          },
          "elevation": 822.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06080504,
                  -19.78350143
              ]
          },
          "elevation": 822.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060797293,
                  -19.783496156
              ]
          },
          "elevation": 822.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060789546,
                  -19.783490881
              ]
          },
          "elevation": 822.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060781799,
                  -19.783485606
              ]
          },
          "elevation": 822.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060774051,
                  -19.783480332
              ]
          },
          "elevation": 822.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060766304,
                  -19.783475057
              ]
          },
          "elevation": 821.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060758557,
                  -19.783469783
              ]
          },
          "elevation": 821.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06075081,
                  -19.783464508
              ]
          },
          "elevation": 821.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060743063,
                  -19.783459233
              ]
          },
          "elevation": 821.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060735316,
                  -19.783453959
              ]
          },
          "elevation": 821.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060727569,
                  -19.783448684
              ]
          },
          "elevation": 821.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060719821,
                  -19.78344341
              ]
          },
          "elevation": 821.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060712074,
                  -19.783438135
              ]
          },
          "elevation": 821.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060704327,
                  -19.78343286
              ]
          },
          "elevation": 821.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06069658,
                  -19.783427586
              ]
          },
          "elevation": 820.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060688833,
                  -19.783422311
              ]
          },
          "elevation": 820.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060681086,
                  -19.783417036
              ]
          },
          "elevation": 820.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060673339,
                  -19.783411762
              ]
          },
          "elevation": 820.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060665592,
                  -19.783406487
              ]
          },
          "elevation": 820.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060657844,
                  -19.783401213
              ]
          },
          "elevation": 820.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060650097,
                  -19.783395938
              ]
          },
          "elevation": 820.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06064235,
                  -19.783390663
              ]
          },
          "elevation": 820.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060634603,
                  -19.783385389
              ]
          },
          "elevation": 820.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060626856,
                  -19.783380114
              ]
          },
          "elevation": 819.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060619109,
                  -19.783374839
              ]
          },
          "elevation": 819.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060611362,
                  -19.783369565
              ]
          },
          "elevation": 819.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060603615,
                  -19.78336429
              ]
          },
          "elevation": 819.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060595867,
                  -19.783359016
              ]
          },
          "elevation": 819.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06058812,
                  -19.783353741
              ]
          },
          "elevation": 819.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060580373,
                  -19.783348466
              ]
          },
          "elevation": 819.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060572626,
                  -19.783343192
              ]
          },
          "elevation": 819.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060564879,
                  -19.783337917
              ]
          },
          "elevation": 819.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060557132,
                  -19.783332643
              ]
          },
          "elevation": 819.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060549385,
                  -19.783327368
              ]
          },
          "elevation": 818.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060541638,
                  -19.783322093
              ]
          },
          "elevation": 818.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06053389,
                  -19.783316819
              ]
          },
          "elevation": 818.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060526143,
                  -19.783311544
              ]
          },
          "elevation": 818.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060518396,
                  -19.783306269
              ]
          },
          "elevation": 818.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060510649,
                  -19.783300995
              ]
          },
          "elevation": 818.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060502902,
                  -19.78329572
              ]
          },
          "elevation": 818.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060495155,
                  -19.783290446
              ]
          },
          "elevation": 818.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060487408,
                  -19.783285171
              ]
          },
          "elevation": 818.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060479661,
                  -19.783279896
              ]
          },
          "elevation": 817.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060471913,
                  -19.783274622
              ]
          },
          "elevation": 817.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060464166,
                  -19.783269347
              ]
          },
          "elevation": 817.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060456419,
                  -19.783264072
              ]
          },
          "elevation": 817.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060448672,
                  -19.783258798
              ]
          },
          "elevation": 817.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060440925,
                  -19.783253523
              ]
          },
          "elevation": 817.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060433178,
                  -19.783248249
              ]
          },
          "elevation": 817.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060425431,
                  -19.783242974
              ]
          },
          "elevation": 817.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060417684,
                  -19.783237699
              ]
          },
          "elevation": 817.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060409936,
                  -19.783232425
              ]
          },
          "elevation": 817.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060402189,
                  -19.78322715
              ]
          },
          "elevation": 816.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060394442,
                  -19.783221876
              ]
          },
          "elevation": 816.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060386695,
                  -19.783216601
              ]
          },
          "elevation": 816.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060378948,
                  -19.783211326
              ]
          },
          "elevation": 816.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060371201,
                  -19.783206052
              ]
          },
          "elevation": 816.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060363454,
                  -19.783200777
              ]
          },
          "elevation": 816.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060355707,
                  -19.783195502
              ]
          },
          "elevation": 816.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060347959,
                  -19.783190228
              ]
          },
          "elevation": 816.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060340212,
                  -19.783184953
              ]
          },
          "elevation": 816.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060332465,
                  -19.783179679
              ]
          },
          "elevation": 816.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060324718,
                  -19.783174404
              ]
          },
          "elevation": 815.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060316971,
                  -19.783169129
              ]
          },
          "elevation": 815.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060309224,
                  -19.783163855
              ]
          },
          "elevation": 815.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060301477,
                  -19.78315858
              ]
          },
          "elevation": 815.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060293729,
                  -19.783153305
              ]
          },
          "elevation": 815.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060285982,
                  -19.783148031
              ]
          },
          "elevation": 815.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060278235,
                  -19.783142756
              ]
          },
          "elevation": 815.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060270488,
                  -19.783137482
              ]
          },
          "elevation": 815.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060262741,
                  -19.783132207
              ]
          },
          "elevation": 815.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060254994,
                  -19.783126932
              ]
          },
          "elevation": 814.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060247247,
                  -19.783121658
              ]
          },
          "elevation": 814.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0602395,
                  -19.783116383
              ]
          },
          "elevation": 814.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060231752,
                  -19.783111109
              ]
          },
          "elevation": 814.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060224005,
                  -19.783105834
              ]
          },
          "elevation": 814.7
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060216258,
                  -19.783100559
              ]
          },
          "elevation": 814.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060208511,
                  -19.783095285
              ]
          },
          "elevation": 814.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060200764,
                  -19.78309001
              ]
          },
          "elevation": 814.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060193017,
                  -19.783084735
              ]
          },
          "elevation": 814.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06018527,
                  -19.783079461
              ]
          },
          "elevation": 814.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060177523,
                  -19.783074186
              ]
          },
          "elevation": 814.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060169775,
                  -19.783068912
              ]
          },
          "elevation": 814.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060162028,
                  -19.783063637
              ]
          },
          "elevation": 814.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060154281,
                  -19.783058362
              ]
          },
          "elevation": 814.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060146534,
                  -19.783053088
              ]
          },
          "elevation": 814.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060138787,
                  -19.783047813
              ]
          },
          "elevation": 814.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06013104,
                  -19.783042538
              ]
          },
          "elevation": 814.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060123293,
                  -19.783037264
              ]
          },
          "elevation": 813.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060115546,
                  -19.783031989
              ]
          },
          "elevation": 813.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060107798,
                  -19.783026715
              ]
          },
          "elevation": 813.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060100051,
                  -19.78302144
              ]
          },
          "elevation": 813.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060092304,
                  -19.783016165
              ]
          },
          "elevation": 813.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060084557,
                  -19.783010891
              ]
          },
          "elevation": 813.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06007681,
                  -19.783005616
              ]
          },
          "elevation": 813.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060069063,
                  -19.783000342
              ]
          },
          "elevation": 813.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060061316,
                  -19.782995067
              ]
          },
          "elevation": 813.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060053569,
                  -19.782989792
              ]
          },
          "elevation": 813.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060045821,
                  -19.782984518
              ]
          },
          "elevation": 813.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060038074,
                  -19.782979243
              ]
          },
          "elevation": 813.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060030327,
                  -19.782973968
              ]
          },
          "elevation": 813.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.06002258,
                  -19.782968694
              ]
          },
          "elevation": 813.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060014833,
                  -19.782963419
              ]
          },
          "elevation": 813.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.060007086,
                  -19.782958145
              ]
          },
          "elevation": 813.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059999339,
                  -19.78295287
              ]
          },
          "elevation": 813.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059991592,
                  -19.782947595
              ]
          },
          "elevation": 812.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059983844,
                  -19.782942321
              ]
          },
          "elevation": 812.92
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059976097,
                  -19.782937046
              ]
          },
          "elevation": 812.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05996835,
                  -19.782931771
              ]
          },
          "elevation": 812.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059960603,
                  -19.782926497
              ]
          },
          "elevation": 812.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059952856,
                  -19.782921222
              ]
          },
          "elevation": 812.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059945109,
                  -19.782915948
              ]
          },
          "elevation": 812.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059937362,
                  -19.782910673
              ]
          },
          "elevation": 812.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059929615,
                  -19.782905398
              ]
          },
          "elevation": 812.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059921867,
                  -19.782900124
              ]
          },
          "elevation": 812.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05991412,
                  -19.782894849
              ]
          },
          "elevation": 812.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059906373,
                  -19.782889575
              ]
          },
          "elevation": 812.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059898626,
                  -19.7828843
              ]
          },
          "elevation": 812.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059890879,
                  -19.782879025
              ]
          },
          "elevation": 812.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059883132,
                  -19.782873751
              ]
          },
          "elevation": 812.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059875385,
                  -19.782868476
              ]
          },
          "elevation": 812.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059867637,
                  -19.782863201
              ]
          },
          "elevation": 812.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05985989,
                  -19.782857927
              ]
          },
          "elevation": 812.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059852143,
                  -19.782852652
              ]
          },
          "elevation": 812.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059844396,
                  -19.782847378
              ]
          },
          "elevation": 812.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059836649,
                  -19.782842103
              ]
          },
          "elevation": 812.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059828902,
                  -19.782836828
              ]
          },
          "elevation": 812.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059821155,
                  -19.782831554
              ]
          },
          "elevation": 812.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059813408,
                  -19.782826279
              ]
          },
          "elevation": 812.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05980566,
                  -19.782821005
              ]
          },
          "elevation": 812.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059797913,
                  -19.78281573
              ]
          },
          "elevation": 812
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059790166,
                  -19.782810455
              ]
          },
          "elevation": 811.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059782419,
                  -19.782805181
              ]
          },
          "elevation": 811.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059774672,
                  -19.782799906
              ]
          },
          "elevation": 811.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059766925,
                  -19.782794631
              ]
          },
          "elevation": 811.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059759178,
                  -19.782789357
              ]
          },
          "elevation": 811.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059751431,
                  -19.782784082
              ]
          },
          "elevation": 811.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059743683,
                  -19.782778808
              ]
          },
          "elevation": 811.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059735936,
                  -19.782773533
              ]
          },
          "elevation": 810.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059728189,
                  -19.782768258
              ]
          },
          "elevation": 810.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059720442,
                  -19.782762984
              ]
          },
          "elevation": 810.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059712695,
                  -19.782757709
              ]
          },
          "elevation": 810.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059704948,
                  -19.782752434
              ]
          },
          "elevation": 810.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059697201,
                  -19.78274716
              ]
          },
          "elevation": 810.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059689454,
                  -19.782741885
              ]
          },
          "elevation": 810.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059681706,
                  -19.782736611
              ]
          },
          "elevation": 809.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059673959,
                  -19.782731336
              ]
          },
          "elevation": 809.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059666212,
                  -19.782726061
              ]
          },
          "elevation": 809.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059658465,
                  -19.782720787
              ]
          },
          "elevation": 809.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059650718,
                  -19.782715512
              ]
          },
          "elevation": 809.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059642971,
                  -19.782710238
              ]
          },
          "elevation": 809.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059635224,
                  -19.782704963
              ]
          },
          "elevation": 809.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059627477,
                  -19.782699688
              ]
          },
          "elevation": 809.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059619729,
                  -19.782694414
              ]
          },
          "elevation": 809.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059611982,
                  -19.782689139
              ]
          },
          "elevation": 809.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059604235,
                  -19.782683864
              ]
          },
          "elevation": 809.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059596488,
                  -19.78267859
              ]
          },
          "elevation": 809.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059588741,
                  -19.782673315
              ]
          },
          "elevation": 809.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059580994,
                  -19.782668041
              ]
          },
          "elevation": 809.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059573247,
                  -19.782662766
              ]
          },
          "elevation": 809.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0595655,
                  -19.782657491
              ]
          },
          "elevation": 809.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059557752,
                  -19.782652217
              ]
          },
          "elevation": 809.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059550005,
                  -19.782646942
              ]
          },
          "elevation": 809.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059542258,
                  -19.782641667
              ]
          },
          "elevation": 809.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059534511,
                  -19.782636393
              ]
          },
          "elevation": 809.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059526764,
                  -19.782631118
              ]
          },
          "elevation": 809.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059519017,
                  -19.782625844
              ]
          },
          "elevation": 809.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05951127,
                  -19.782620569
              ]
          },
          "elevation": 809.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059503523,
                  -19.782615294
              ]
          },
          "elevation": 809.92
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059495775,
                  -19.78261002
              ]
          },
          "elevation": 810.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059488028,
                  -19.782604745
              ]
          },
          "elevation": 810.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059480281,
                  -19.782599471
              ]
          },
          "elevation": 810.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059472534,
                  -19.782594196
              ]
          },
          "elevation": 810.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059464787,
                  -19.782588921
              ]
          },
          "elevation": 810.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05945704,
                  -19.782583647
              ]
          },
          "elevation": 810.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059449293,
                  -19.782578372
              ]
          },
          "elevation": 810.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059441545,
                  -19.782573097
              ]
          },
          "elevation": 810.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059433798,
                  -19.782567823
              ]
          },
          "elevation": 810.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059426051,
                  -19.782562548
              ]
          },
          "elevation": 810.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059418304,
                  -19.782557274
              ]
          },
          "elevation": 810.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059410557,
                  -19.782551999
              ]
          },
          "elevation": 811.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05940281,
                  -19.782546724
              ]
          },
          "elevation": 811.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059395063,
                  -19.78254145
              ]
          },
          "elevation": 811.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059387316,
                  -19.782536175
              ]
          },
          "elevation": 811.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059379568,
                  -19.7825309
              ]
          },
          "elevation": 811.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059371821,
                  -19.782525626
              ]
          },
          "elevation": 811.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059364074,
                  -19.782520351
              ]
          },
          "elevation": 811.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059356327,
                  -19.782515077
              ]
          },
          "elevation": 811.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05934858,
                  -19.782509802
              ]
          },
          "elevation": 811
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059340833,
                  -19.782504527
              ]
          },
          "elevation": 811
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059333086,
                  -19.782499253
              ]
          },
          "elevation": 811
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059325339,
                  -19.782493978
              ]
          },
          "elevation": 811.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059317591,
                  -19.782488704
              ]
          },
          "elevation": 811
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059309844,
                  -19.782483429
              ]
          },
          "elevation": 810.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059302097,
                  -19.782478154
              ]
          },
          "elevation": 810.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05929435,
                  -19.78247288
              ]
          },
          "elevation": 810.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059286603,
                  -19.782467605
              ]
          },
          "elevation": 810.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059278856,
                  -19.78246233
              ]
          },
          "elevation": 810.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059271109,
                  -19.782457056
              ]
          },
          "elevation": 810.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059263362,
                  -19.782451781
              ]
          },
          "elevation": 810.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059255614,
                  -19.782446507
              ]
          },
          "elevation": 810.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059247867,
                  -19.782441232
              ]
          },
          "elevation": 810.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05924012,
                  -19.782435957
              ]
          },
          "elevation": 810.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059232373,
                  -19.782430683
              ]
          },
          "elevation": 810.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059224626,
                  -19.782425408
              ]
          },
          "elevation": 810.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059216879,
                  -19.782420133
              ]
          },
          "elevation": 810.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059209132,
                  -19.782414859
              ]
          },
          "elevation": 811
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059201385,
                  -19.782409584
              ]
          },
          "elevation": 811.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059193637,
                  -19.78240431
              ]
          },
          "elevation": 811.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05918589,
                  -19.782399035
              ]
          },
          "elevation": 811.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059178143,
                  -19.78239376
              ]
          },
          "elevation": 811.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059170396,
                  -19.782388486
              ]
          },
          "elevation": 811.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059162649,
                  -19.782383211
              ]
          },
          "elevation": 811.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059154902,
                  -19.782377937
              ]
          },
          "elevation": 811.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059147155,
                  -19.782372662
              ]
          },
          "elevation": 811.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059139408,
                  -19.782367387
              ]
          },
          "elevation": 811.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05913166,
                  -19.782362113
              ]
          },
          "elevation": 811.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059123913,
                  -19.782356838
              ]
          },
          "elevation": 811.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059116166,
                  -19.782351563
              ]
          },
          "elevation": 811.65
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059108419,
                  -19.782346289
              ]
          },
          "elevation": 811.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059100672,
                  -19.782341014
              ]
          },
          "elevation": 811.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059092925,
                  -19.78233574
              ]
          },
          "elevation": 811.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059085178,
                  -19.782330465
              ]
          },
          "elevation": 811.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059077431,
                  -19.78232519
              ]
          },
          "elevation": 811.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059069683,
                  -19.782319916
              ]
          },
          "elevation": 811.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059061936,
                  -19.782314641
              ]
          },
          "elevation": 811.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059054189,
                  -19.782309366
              ]
          },
          "elevation": 811.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059046442,
                  -19.782304092
              ]
          },
          "elevation": 811.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059038695,
                  -19.782298817
              ]
          },
          "elevation": 811.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059030948,
                  -19.782293543
              ]
          },
          "elevation": 811.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059023201,
                  -19.782288268
              ]
          },
          "elevation": 811.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059015453,
                  -19.782282993
              ]
          },
          "elevation": 811.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.059007706,
                  -19.782277719
              ]
          },
          "elevation": 811.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058999959,
                  -19.782272444
              ]
          },
          "elevation": 811.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058992212,
                  -19.78226717
              ]
          },
          "elevation": 811.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058984465,
                  -19.782261895
              ]
          },
          "elevation": 811.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058976718,
                  -19.78225662
              ]
          },
          "elevation": 811.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058968971,
                  -19.782251346
              ]
          },
          "elevation": 811.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058961224,
                  -19.782246071
              ]
          },
          "elevation": 811.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058953476,
                  -19.782240796
              ]
          },
          "elevation": 811.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058945729,
                  -19.782235522
              ]
          },
          "elevation": 811.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058937982,
                  -19.782230247
              ]
          },
          "elevation": 811.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058930235,
                  -19.782224973
              ]
          },
          "elevation": 811.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058922488,
                  -19.782219698
              ]
          },
          "elevation": 811.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058914741,
                  -19.782214423
              ]
          },
          "elevation": 811.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058906994,
                  -19.782209149
              ]
          },
          "elevation": 811.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058899247,
                  -19.782203874
              ]
          },
          "elevation": 811.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058891499,
                  -19.782198599
              ]
          },
          "elevation": 811.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058883752,
                  -19.782193325
              ]
          },
          "elevation": 811.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058876005,
                  -19.78218805
              ]
          },
          "elevation": 811.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058868258,
                  -19.782182776
              ]
          },
          "elevation": 811.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058860511,
                  -19.782177501
              ]
          },
          "elevation": 811.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058852764,
                  -19.782172226
              ]
          },
          "elevation": 811.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058845017,
                  -19.782166952
              ]
          },
          "elevation": 811.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05883727,
                  -19.782161677
              ]
          },
          "elevation": 811.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058829522,
                  -19.782156403
              ]
          },
          "elevation": 811.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058821775,
                  -19.782151128
              ]
          },
          "elevation": 811.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058814028,
                  -19.782145853
              ]
          },
          "elevation": 811.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058806281,
                  -19.782140579
              ]
          },
          "elevation": 811.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058798534,
                  -19.782135304
              ]
          },
          "elevation": 811.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058790787,
                  -19.782130029
              ]
          },
          "elevation": 811.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05878304,
                  -19.782124755
              ]
          },
          "elevation": 811.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058775293,
                  -19.78211948
              ]
          },
          "elevation": 811.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058767545,
                  -19.782114206
              ]
          },
          "elevation": 812
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058759798,
                  -19.782108931
              ]
          },
          "elevation": 812.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058752051,
                  -19.782103656
              ]
          },
          "elevation": 812.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058744304,
                  -19.782098382
              ]
          },
          "elevation": 812.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058736557,
                  -19.782093107
              ]
          },
          "elevation": 812.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05872881,
                  -19.782087832
              ]
          },
          "elevation": 812.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058721063,
                  -19.782082558
              ]
          },
          "elevation": 812.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058713316,
                  -19.782077283
              ]
          },
          "elevation": 812.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058705568,
                  -19.782072009
              ]
          },
          "elevation": 812.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058697821,
                  -19.782066734
              ]
          },
          "elevation": 812.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058690074,
                  -19.782061459
              ]
          },
          "elevation": 812.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058682327,
                  -19.782056185
              ]
          },
          "elevation": 812.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05867458,
                  -19.78205091
              ]
          },
          "elevation": 812.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058666833,
                  -19.782045636
              ]
          },
          "elevation": 812.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058659086,
                  -19.782040361
              ]
          },
          "elevation": 812.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058651338,
                  -19.782035086
              ]
          },
          "elevation": 812.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058643591,
                  -19.782029812
              ]
          },
          "elevation": 812.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058635844,
                  -19.782024537
              ]
          },
          "elevation": 812.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058628097,
                  -19.782019262
              ]
          },
          "elevation": 812.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05862035,
                  -19.782013988
              ]
          },
          "elevation": 812.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058612603,
                  -19.782008713
              ]
          },
          "elevation": 812.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058604856,
                  -19.782003439
              ]
          },
          "elevation": 812.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058597109,
                  -19.781998164
              ]
          },
          "elevation": 812.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058589361,
                  -19.781992889
              ]
          },
          "elevation": 812.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058581614,
                  -19.781987615
              ]
          },
          "elevation": 812.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058573867,
                  -19.78198234
              ]
          },
          "elevation": 812.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05856612,
                  -19.781977066
              ]
          },
          "elevation": 812.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058558373,
                  -19.781971791
              ]
          },
          "elevation": 812.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058550626,
                  -19.781966516
              ]
          },
          "elevation": 812.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058542879,
                  -19.781961242
              ]
          },
          "elevation": 812.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058535132,
                  -19.781955967
              ]
          },
          "elevation": 813.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058527384,
                  -19.781950692
              ]
          },
          "elevation": 813.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058519637,
                  -19.781945418
              ]
          },
          "elevation": 813.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05851189,
                  -19.781940143
              ]
          },
          "elevation": 813.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058504143,
                  -19.781934869
              ]
          },
          "elevation": 813.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058496396,
                  -19.781929594
              ]
          },
          "elevation": 813.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058488649,
                  -19.781924319
              ]
          },
          "elevation": 813.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058480902,
                  -19.781919045
              ]
          },
          "elevation": 813.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058473155,
                  -19.78191377
              ]
          },
          "elevation": 813.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058465407,
                  -19.781908495
              ]
          },
          "elevation": 813.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05845766,
                  -19.781903221
              ]
          },
          "elevation": 813.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058449913,
                  -19.781897946
              ]
          },
          "elevation": 813.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058442166,
                  -19.781892672
              ]
          },
          "elevation": 813.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058434419,
                  -19.781887397
              ]
          },
          "elevation": 813.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058426672,
                  -19.781882122
              ]
          },
          "elevation": 813.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058418925,
                  -19.781876848
              ]
          },
          "elevation": 813.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058411178,
                  -19.781871573
              ]
          },
          "elevation": 813.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05840343,
                  -19.781866299
              ]
          },
          "elevation": 813.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058395683,
                  -19.781861024
              ]
          },
          "elevation": 813.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058387936,
                  -19.781855749
              ]
          },
          "elevation": 813.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058380189,
                  -19.781850475
              ]
          },
          "elevation": 813.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058372442,
                  -19.7818452
              ]
          },
          "elevation": 813.92
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058364695,
                  -19.781839925
              ]
          },
          "elevation": 813.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058356948,
                  -19.781834651
              ]
          },
          "elevation": 814
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058349201,
                  -19.781829376
              ]
          },
          "elevation": 814.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058341453,
                  -19.781824102
              ]
          },
          "elevation": 814.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058333706,
                  -19.781818827
              ]
          },
          "elevation": 814.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058325959,
                  -19.781813552
              ]
          },
          "elevation": 814.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058318212,
                  -19.781808278
              ]
          },
          "elevation": 814.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058310465,
                  -19.781803003
              ]
          },
          "elevation": 814.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058302718,
                  -19.781797728
              ]
          },
          "elevation": 814.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058294971,
                  -19.781792454
              ]
          },
          "elevation": 814.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058287224,
                  -19.781787179
              ]
          },
          "elevation": 814.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058279476,
                  -19.781781905
              ]
          },
          "elevation": 814.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058271729,
                  -19.78177663
              ]
          },
          "elevation": 814.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058263982,
                  -19.781771355
              ]
          },
          "elevation": 814.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058256235,
                  -19.781766081
              ]
          },
          "elevation": 814.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058248488,
                  -19.781760806
              ]
          },
          "elevation": 814.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058240741,
                  -19.781755532
              ]
          },
          "elevation": 814.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058232994,
                  -19.781750257
              ]
          },
          "elevation": 814.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058225246,
                  -19.781744982
              ]
          },
          "elevation": 814.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058217499,
                  -19.781739708
              ]
          },
          "elevation": 814.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058209752,
                  -19.781734433
              ]
          },
          "elevation": 814.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058202005,
                  -19.781729158
              ]
          },
          "elevation": 814.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058194258,
                  -19.781723884
              ]
          },
          "elevation": 814.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058186511,
                  -19.781718609
              ]
          },
          "elevation": 814.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058178764,
                  -19.781713335
              ]
          },
          "elevation": 814.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058171017,
                  -19.78170806
              ]
          },
          "elevation": 814.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058163269,
                  -19.781702785
              ]
          },
          "elevation": 814.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058155522,
                  -19.781697511
              ]
          },
          "elevation": 814.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058147775,
                  -19.781692236
              ]
          },
          "elevation": 814.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058140028,
                  -19.781686961
              ]
          },
          "elevation": 814.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058132281,
                  -19.781681687
              ]
          },
          "elevation": 815.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058124534,
                  -19.781676412
              ]
          },
          "elevation": 815.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058116787,
                  -19.781671138
              ]
          },
          "elevation": 815.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05810904,
                  -19.781665863
              ]
          },
          "elevation": 815.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058101292,
                  -19.781660588
              ]
          },
          "elevation": 815.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058093545,
                  -19.781655314
              ]
          },
          "elevation": 815.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058085798,
                  -19.781650039
              ]
          },
          "elevation": 815.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058078051,
                  -19.781644765
              ]
          },
          "elevation": 815.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058070304,
                  -19.78163949
              ]
          },
          "elevation": 815.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058062557,
                  -19.781634215
              ]
          },
          "elevation": 815.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05805481,
                  -19.781628941
              ]
          },
          "elevation": 815.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058047063,
                  -19.781623666
              ]
          },
          "elevation": 815.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058039315,
                  -19.781618391
              ]
          },
          "elevation": 815.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058031568,
                  -19.781613117
              ]
          },
          "elevation": 815.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058023821,
                  -19.781607842
              ]
          },
          "elevation": 815.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058016074,
                  -19.781602568
              ]
          },
          "elevation": 815.92
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.058008327,
                  -19.781597293
              ]
          },
          "elevation": 815.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05800058,
                  -19.781592018
              ]
          },
          "elevation": 815.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057992833,
                  -19.781586744
              ]
          },
          "elevation": 816.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057985086,
                  -19.781581469
              ]
          },
          "elevation": 816.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057977338,
                  -19.781576194
              ]
          },
          "elevation": 816.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057969591,
                  -19.78157092
              ]
          },
          "elevation": 816.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057961844,
                  -19.781565645
              ]
          },
          "elevation": 816.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057954097,
                  -19.781560371
              ]
          },
          "elevation": 816.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05794635,
                  -19.781555096
              ]
          },
          "elevation": 816.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057938603,
                  -19.781549821
              ]
          },
          "elevation": 816.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057930856,
                  -19.781544547
              ]
          },
          "elevation": 816.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057923109,
                  -19.781539272
              ]
          },
          "elevation": 816.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057915361,
                  -19.781533998
              ]
          },
          "elevation": 816.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057907614,
                  -19.781528723
              ]
          },
          "elevation": 816.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057899867,
                  -19.781523448
              ]
          },
          "elevation": 816.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05789212,
                  -19.781518174
              ]
          },
          "elevation": 816.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057884373,
                  -19.781512899
              ]
          },
          "elevation": 816.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057876626,
                  -19.781507624
              ]
          },
          "elevation": 816.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057868879,
                  -19.78150235
              ]
          },
          "elevation": 817.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057861132,
                  -19.781497075
              ]
          },
          "elevation": 817.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057853384,
                  -19.781491801
              ]
          },
          "elevation": 817.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057845637,
                  -19.781486526
              ]
          },
          "elevation": 817.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05783789,
                  -19.781481251
              ]
          },
          "elevation": 817.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057830143,
                  -19.781475977
              ]
          },
          "elevation": 817.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057822396,
                  -19.781470702
              ]
          },
          "elevation": 818.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057814649,
                  -19.781465427
              ]
          },
          "elevation": 818.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057806902,
                  -19.781460153
              ]
          },
          "elevation": 819.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057799154,
                  -19.781454878
              ]
          },
          "elevation": 819.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057791407,
                  -19.781449604
              ]
          },
          "elevation": 819.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05778366,
                  -19.781444329
              ]
          },
          "elevation": 819.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057775913,
                  -19.781439054
              ]
          },
          "elevation": 820.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057768166,
                  -19.78143378
              ]
          },
          "elevation": 820.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057760419,
                  -19.781428505
              ]
          },
          "elevation": 821.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057752672,
                  -19.781423231
              ]
          },
          "elevation": 821.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057744925,
                  -19.781417956
              ]
          },
          "elevation": 821.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057737177,
                  -19.781412681
              ]
          },
          "elevation": 822.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05772943,
                  -19.781407407
              ]
          },
          "elevation": 822.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057721683,
                  -19.781402132
              ]
          },
          "elevation": 822.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057713936,
                  -19.781396857
              ]
          },
          "elevation": 823.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057706189,
                  -19.781391583
              ]
          },
          "elevation": 823.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057698442,
                  -19.781386308
              ]
          },
          "elevation": 823.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057690695,
                  -19.781381034
              ]
          },
          "elevation": 823.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057682948,
                  -19.781375759
              ]
          },
          "elevation": 823.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0576752,
                  -19.781370484
              ]
          },
          "elevation": 823.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057667453,
                  -19.78136521
              ]
          },
          "elevation": 823.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057659706,
                  -19.781359935
              ]
          },
          "elevation": 823.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057651959,
                  -19.78135466
              ]
          },
          "elevation": 823.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057644212,
                  -19.781349386
              ]
          },
          "elevation": 823.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057636465,
                  -19.781344111
              ]
          },
          "elevation": 823.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057628718,
                  -19.781338837
              ]
          },
          "elevation": 823.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057620971,
                  -19.781333562
              ]
          },
          "elevation": 823.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057613223,
                  -19.781328287
              ]
          },
          "elevation": 823.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057605476,
                  -19.781323013
              ]
          },
          "elevation": 823.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057597729,
                  -19.781317738
              ]
          },
          "elevation": 824.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057589982,
                  -19.781312464
              ]
          },
          "elevation": 824.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057582235,
                  -19.781307189
              ]
          },
          "elevation": 824.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057574488,
                  -19.781301914
              ]
          },
          "elevation": 824.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057566741,
                  -19.78129664
              ]
          },
          "elevation": 824.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057558994,
                  -19.781291365
              ]
          },
          "elevation": 824.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057551246,
                  -19.78128609
              ]
          },
          "elevation": 824.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057543499,
                  -19.781280816
              ]
          },
          "elevation": 824.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057535752,
                  -19.781275541
              ]
          },
          "elevation": 824.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057528005,
                  -19.781270267
              ]
          },
          "elevation": 824.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057520258,
                  -19.781264992
              ]
          },
          "elevation": 824.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057512511,
                  -19.781259717
              ]
          },
          "elevation": 824.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057504764,
                  -19.781254443
              ]
          },
          "elevation": 824.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057497017,
                  -19.781249168
              ]
          },
          "elevation": 824.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057489269,
                  -19.781243893
              ]
          },
          "elevation": 824.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057481522,
                  -19.781238619
              ]
          },
          "elevation": 825.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057473775,
                  -19.781233344
              ]
          },
          "elevation": 825.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057466028,
                  -19.78122807
              ]
          },
          "elevation": 825.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057458281,
                  -19.781222795
              ]
          },
          "elevation": 825.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057450534,
                  -19.78121752
              ]
          },
          "elevation": 825.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057442787,
                  -19.781212246
              ]
          },
          "elevation": 825.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05743504,
                  -19.781206971
              ]
          },
          "elevation": 825.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057427292,
                  -19.781201697
              ]
          },
          "elevation": 825.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057419545,
                  -19.781196422
              ]
          },
          "elevation": 825.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057411798,
                  -19.781191147
              ]
          },
          "elevation": 825.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057404051,
                  -19.781185873
              ]
          },
          "elevation": 825.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057396304,
                  -19.781180598
              ]
          },
          "elevation": 825.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057388557,
                  -19.781175323
              ]
          },
          "elevation": 825.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05738081,
                  -19.781170049
              ]
          },
          "elevation": 825.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057373062,
                  -19.781164774
              ]
          },
          "elevation": 825.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057365315,
                  -19.7811595
              ]
          },
          "elevation": 826.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057357568,
                  -19.781154225
              ]
          },
          "elevation": 826.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057349821,
                  -19.78114895
              ]
          },
          "elevation": 826.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057342074,
                  -19.781143676
              ]
          },
          "elevation": 826.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057334327,
                  -19.781138401
              ]
          },
          "elevation": 826.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05732658,
                  -19.781133126
              ]
          },
          "elevation": 826.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057318833,
                  -19.781127852
              ]
          },
          "elevation": 826.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057311085,
                  -19.781122577
              ]
          },
          "elevation": 826.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057303338,
                  -19.781117303
              ]
          },
          "elevation": 826.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057295591,
                  -19.781112028
              ]
          },
          "elevation": 826.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057287844,
                  -19.781106753
              ]
          },
          "elevation": 826.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057280097,
                  -19.781101479
              ]
          },
          "elevation": 826.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05727235,
                  -19.781096204
              ]
          },
          "elevation": 826.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057264603,
                  -19.78109093
              ]
          },
          "elevation": 827.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057256856,
                  -19.781085655
              ]
          },
          "elevation": 827.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057249108,
                  -19.78108038
              ]
          },
          "elevation": 827.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057241361,
                  -19.781075106
              ]
          },
          "elevation": 827.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057233614,
                  -19.781069831
              ]
          },
          "elevation": 827.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057225867,
                  -19.781064556
              ]
          },
          "elevation": 827.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05721812,
                  -19.781059282
              ]
          },
          "elevation": 827.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057210373,
                  -19.781054007
              ]
          },
          "elevation": 827.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057202626,
                  -19.781048733
              ]
          },
          "elevation": 827.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057194879,
                  -19.781043458
              ]
          },
          "elevation": 827.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057187131,
                  -19.781038183
              ]
          },
          "elevation": 827.98
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057179384,
                  -19.781032909
              ]
          },
          "elevation": 828.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057171637,
                  -19.781027634
              ]
          },
          "elevation": 828.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05716389,
                  -19.78102236
              ]
          },
          "elevation": 828.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057156143,
                  -19.781017085
              ]
          },
          "elevation": 828.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057148396,
                  -19.78101181
              ]
          },
          "elevation": 828.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057140649,
                  -19.781006536
              ]
          },
          "elevation": 828.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057132902,
                  -19.781001261
              ]
          },
          "elevation": 828.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057125154,
                  -19.780995986
              ]
          },
          "elevation": 829.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057117407,
                  -19.780990712
              ]
          },
          "elevation": 829.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05710966,
                  -19.780985437
              ]
          },
          "elevation": 829.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057101913,
                  -19.780980163
              ]
          },
          "elevation": 829.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057094166,
                  -19.780974888
              ]
          },
          "elevation": 829.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057086419,
                  -19.780969613
              ]
          },
          "elevation": 829.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057078672,
                  -19.780964339
              ]
          },
          "elevation": 829.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057070925,
                  -19.780959064
              ]
          },
          "elevation": 830.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057063177,
                  -19.780953789
              ]
          },
          "elevation": 830.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05705543,
                  -19.780948515
              ]
          },
          "elevation": 830.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057047683,
                  -19.78094324
              ]
          },
          "elevation": 831.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057039936,
                  -19.780937966
              ]
          },
          "elevation": 831.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057032189,
                  -19.780932691
              ]
          },
          "elevation": 831.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057024442,
                  -19.780927416
              ]
          },
          "elevation": 831.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057016695,
                  -19.780922142
              ]
          },
          "elevation": 832.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.057008948,
                  -19.780916867
              ]
          },
          "elevation": 832.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0570012,
                  -19.780911593
              ]
          },
          "elevation": 832.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056993453,
                  -19.780906318
              ]
          },
          "elevation": 832.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056985706,
                  -19.780901043
              ]
          },
          "elevation": 833.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056977959,
                  -19.780895769
              ]
          },
          "elevation": 833.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056970212,
                  -19.780890494
              ]
          },
          "elevation": 833.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056962465,
                  -19.780885219
              ]
          },
          "elevation": 834.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056954718,
                  -19.780879945
              ]
          },
          "elevation": 834.6
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05694697,
                  -19.78087467
              ]
          },
          "elevation": 834.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056939223,
                  -19.780869396
              ]
          },
          "elevation": 835.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056931476,
                  -19.780864121
              ]
          },
          "elevation": 835.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056923729,
                  -19.780858846
              ]
          },
          "elevation": 835.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056915982,
                  -19.780853572
              ]
          },
          "elevation": 836.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056908235,
                  -19.780848297
              ]
          },
          "elevation": 836.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056900488,
                  -19.780843022
              ]
          },
          "elevation": 836.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056892741,
                  -19.780837748
              ]
          },
          "elevation": 836.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056884993,
                  -19.780832473
              ]
          },
          "elevation": 836.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056877246,
                  -19.780827199
              ]
          },
          "elevation": 836.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056869499,
                  -19.780821924
              ]
          },
          "elevation": 836.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056861752,
                  -19.780816649
              ]
          },
          "elevation": 837.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056854005,
                  -19.780811375
              ]
          },
          "elevation": 837.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056846258,
                  -19.7808061
              ]
          },
          "elevation": 837.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056838511,
                  -19.780800826
              ]
          },
          "elevation": 837.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056830764,
                  -19.780795551
              ]
          },
          "elevation": 837.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056823016,
                  -19.780790276
              ]
          },
          "elevation": 837.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056815269,
                  -19.780785002
              ]
          },
          "elevation": 837.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056807522,
                  -19.780779727
              ]
          },
          "elevation": 838.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056799775,
                  -19.780774452
              ]
          },
          "elevation": 838.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056792028,
                  -19.780769178
              ]
          },
          "elevation": 838.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056784281,
                  -19.780763903
              ]
          },
          "elevation": 838.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056776534,
                  -19.780758629
              ]
          },
          "elevation": 838.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056768787,
                  -19.780753354
              ]
          },
          "elevation": 838.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056761039,
                  -19.780748079
              ]
          },
          "elevation": 838.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056753292,
                  -19.780742805
              ]
          },
          "elevation": 838.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056745545,
                  -19.78073753
              ]
          },
          "elevation": 838.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056737798,
                  -19.780732255
              ]
          },
          "elevation": 838.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056730051,
                  -19.780726981
              ]
          },
          "elevation": 838.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056722304,
                  -19.780721706
              ]
          },
          "elevation": 838.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056714557,
                  -19.780716432
              ]
          },
          "elevation": 838.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05670681,
                  -19.780711157
              ]
          },
          "elevation": 838.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056699062,
                  -19.780705882
              ]
          },
          "elevation": 838.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056691315,
                  -19.780700608
              ]
          },
          "elevation": 838.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056683568,
                  -19.780695333
              ]
          },
          "elevation": 838.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056675821,
                  -19.780690059
              ]
          },
          "elevation": 838.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056668074,
                  -19.780684784
              ]
          },
          "elevation": 838.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056660327,
                  -19.780679509
              ]
          },
          "elevation": 838.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05665258,
                  -19.780674235
              ]
          },
          "elevation": 838.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056644833,
                  -19.78066896
              ]
          },
          "elevation": 838.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056637085,
                  -19.780663685
              ]
          },
          "elevation": 838.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056629338,
                  -19.780658411
              ]
          },
          "elevation": 838.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056621591,
                  -19.780653136
              ]
          },
          "elevation": 838.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056613844,
                  -19.780647862
              ]
          },
          "elevation": 839.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056606097,
                  -19.780642587
              ]
          },
          "elevation": 839.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05659835,
                  -19.780637312
              ]
          },
          "elevation": 839.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056590603,
                  -19.780632038
              ]
          },
          "elevation": 839.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056582856,
                  -19.780626763
              ]
          },
          "elevation": 839.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056575108,
                  -19.780621488
              ]
          },
          "elevation": 839.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056567361,
                  -19.780616214
              ]
          },
          "elevation": 839.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056559614,
                  -19.780610939
              ]
          },
          "elevation": 839.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056551867,
                  -19.780605665
              ]
          },
          "elevation": 840.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05654412,
                  -19.78060039
              ]
          },
          "elevation": 840.19
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056536373,
                  -19.780595115
              ]
          },
          "elevation": 840.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056528626,
                  -19.780589841
              ]
          },
          "elevation": 840.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056520878,
                  -19.780584566
              ]
          },
          "elevation": 840.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056513131,
                  -19.780579292
              ]
          },
          "elevation": 841.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056505384,
                  -19.780574017
              ]
          },
          "elevation": 841.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056497637,
                  -19.780568742
              ]
          },
          "elevation": 841.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05648989,
                  -19.780563468
              ]
          },
          "elevation": 841.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056482143,
                  -19.780558193
              ]
          },
          "elevation": 842.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056474396,
                  -19.780552918
              ]
          },
          "elevation": 842.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056466649,
                  -19.780547644
              ]
          },
          "elevation": 842.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056458901,
                  -19.780542369
              ]
          },
          "elevation": 843.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056451154,
                  -19.780537095
              ]
          },
          "elevation": 843.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056443407,
                  -19.78053182
              ]
          },
          "elevation": 843.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05643566,
                  -19.780526545
              ]
          },
          "elevation": 843.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056427913,
                  -19.780521271
              ]
          },
          "elevation": 844.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056420166,
                  -19.780515996
              ]
          },
          "elevation": 844.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056412419,
                  -19.780510721
              ]
          },
          "elevation": 844.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056404672,
                  -19.780505447
              ]
          },
          "elevation": 845.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056396924,
                  -19.780500172
              ]
          },
          "elevation": 845.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056389177,
                  -19.780494898
              ]
          },
          "elevation": 845.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05638143,
                  -19.780489623
              ]
          },
          "elevation": 845.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056373683,
                  -19.780484348
              ]
          },
          "elevation": 845.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056365936,
                  -19.780479074
              ]
          },
          "elevation": 846.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056358189,
                  -19.780473799
              ]
          },
          "elevation": 846.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056350442,
                  -19.780468525
              ]
          },
          "elevation": 846.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056342695,
                  -19.78046325
              ]
          },
          "elevation": 846.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056334947,
                  -19.780457975
              ]
          },
          "elevation": 846.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0563272,
                  -19.780452701
              ]
          },
          "elevation": 846.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056319453,
                  -19.780447426
              ]
          },
          "elevation": 846.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056311706,
                  -19.780442151
              ]
          },
          "elevation": 847.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056303959,
                  -19.780436877
              ]
          },
          "elevation": 847.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056296212,
                  -19.780431602
              ]
          },
          "elevation": 847.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056288465,
                  -19.780426328
              ]
          },
          "elevation": 848.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056280718,
                  -19.780421053
              ]
          },
          "elevation": 848.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05627297,
                  -19.780415778
              ]
          },
          "elevation": 848.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056265223,
                  -19.780410504
              ]
          },
          "elevation": 848.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056257476,
                  -19.780405229
              ]
          },
          "elevation": 849.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056249729,
                  -19.780399954
              ]
          },
          "elevation": 849.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056241982,
                  -19.78039468
              ]
          },
          "elevation": 849.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056234235,
                  -19.780389405
              ]
          },
          "elevation": 849.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056226488,
                  -19.780384131
              ]
          },
          "elevation": 849.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056218741,
                  -19.780378856
              ]
          },
          "elevation": 849.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056210993,
                  -19.780373581
              ]
          },
          "elevation": 849.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056203246,
                  -19.780368307
              ]
          },
          "elevation": 849.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056195499,
                  -19.780363032
              ]
          },
          "elevation": 850.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056187752,
                  -19.780357758
              ]
          },
          "elevation": 850.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056180005,
                  -19.780352483
              ]
          },
          "elevation": 850.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056172258,
                  -19.780347208
              ]
          },
          "elevation": 850.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056164511,
                  -19.780341934
              ]
          },
          "elevation": 850.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056156763,
                  -19.780336659
              ]
          },
          "elevation": 850.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056149016,
                  -19.780331384
              ]
          },
          "elevation": 851
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056141269,
                  -19.78032611
              ]
          },
          "elevation": 851.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056133522,
                  -19.780320835
              ]
          },
          "elevation": 851.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056125775,
                  -19.780315561
              ]
          },
          "elevation": 851.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056118028,
                  -19.780310286
              ]
          },
          "elevation": 851.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056110281,
                  -19.780305011
              ]
          },
          "elevation": 852.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056102534,
                  -19.780299737
              ]
          },
          "elevation": 852.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056094786,
                  -19.780294462
              ]
          },
          "elevation": 852.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056087039,
                  -19.780289187
              ]
          },
          "elevation": 852.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056079292,
                  -19.780283913
              ]
          },
          "elevation": 853.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056071545,
                  -19.780278638
              ]
          },
          "elevation": 853.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056063798,
                  -19.780273364
              ]
          },
          "elevation": 853.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056056051,
                  -19.780268089
              ]
          },
          "elevation": 853.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056048304,
                  -19.780262814
              ]
          },
          "elevation": 853.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056040557,
                  -19.78025754
              ]
          },
          "elevation": 853.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056032809,
                  -19.780252265
              ]
          },
          "elevation": 853.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056025062,
                  -19.780246991
              ]
          },
          "elevation": 853.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056017315,
                  -19.780241716
              ]
          },
          "elevation": 853.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056009568,
                  -19.780236441
              ]
          },
          "elevation": 853.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.056001821,
                  -19.780231167
              ]
          },
          "elevation": 853.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055994074,
                  -19.780225892
              ]
          },
          "elevation": 853.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055986327,
                  -19.780220617
              ]
          },
          "elevation": 853.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05597858,
                  -19.780215343
              ]
          },
          "elevation": 853.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055970832,
                  -19.780210068
              ]
          },
          "elevation": 854.03
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055963085,
                  -19.780204794
              ]
          },
          "elevation": 854.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055955338,
                  -19.780199519
              ]
          },
          "elevation": 854.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055947591,
                  -19.780194244
              ]
          },
          "elevation": 854.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055939844,
                  -19.78018897
              ]
          },
          "elevation": 854.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055932097,
                  -19.780183695
              ]
          },
          "elevation": 854.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05592435,
                  -19.78017842
              ]
          },
          "elevation": 854.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055916603,
                  -19.780173146
              ]
          },
          "elevation": 855.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055908855,
                  -19.780167871
              ]
          },
          "elevation": 855.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055901108,
                  -19.780162597
              ]
          },
          "elevation": 855.25
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055893361,
                  -19.780157322
              ]
          },
          "elevation": 855.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055885614,
                  -19.780152047
              ]
          },
          "elevation": 855.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055877867,
                  -19.780146773
              ]
          },
          "elevation": 856.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05587012,
                  -19.780141498
              ]
          },
          "elevation": 856.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055862373,
                  -19.780136224
              ]
          },
          "elevation": 856.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055854626,
                  -19.780130949
              ]
          },
          "elevation": 857.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055846878,
                  -19.780125674
              ]
          },
          "elevation": 857.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055839131,
                  -19.7801204
              ]
          },
          "elevation": 857.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055831384,
                  -19.780115125
              ]
          },
          "elevation": 858.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055823637,
                  -19.78010985
              ]
          },
          "elevation": 858.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05581589,
                  -19.780104576
              ]
          },
          "elevation": 858.78
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055808143,
                  -19.780099301
              ]
          },
          "elevation": 859.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055800396,
                  -19.780094027
              ]
          },
          "elevation": 859.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055792649,
                  -19.780088752
              ]
          },
          "elevation": 859.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055784901,
                  -19.780083477
              ]
          },
          "elevation": 859.62
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055777154,
                  -19.780078203
              ]
          },
          "elevation": 859.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055769407,
                  -19.780072928
              ]
          },
          "elevation": 860
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05576166,
                  -19.780067654
              ]
          },
          "elevation": 860.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055753913,
                  -19.780062379
              ]
          },
          "elevation": 860.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055746166,
                  -19.780057104
              ]
          },
          "elevation": 860.65
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055738419,
                  -19.78005183
              ]
          },
          "elevation": 860.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055730671,
                  -19.780046555
              ]
          },
          "elevation": 860.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055722924,
                  -19.78004128
              ]
          },
          "elevation": 861.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055715177,
                  -19.780036006
              ]
          },
          "elevation": 861.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05570743,
                  -19.780030731
              ]
          },
          "elevation": 861.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055699683,
                  -19.780025457
              ]
          },
          "elevation": 861.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055691936,
                  -19.780020182
              ]
          },
          "elevation": 861.7
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055684189,
                  -19.780014907
              ]
          },
          "elevation": 861.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055676442,
                  -19.780009633
              ]
          },
          "elevation": 862.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055668694,
                  -19.780004358
              ]
          },
          "elevation": 862.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055660947,
                  -19.779999083
              ]
          },
          "elevation": 862.39
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0556532,
                  -19.779993809
              ]
          },
          "elevation": 862.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055645453,
                  -19.779988534
              ]
          },
          "elevation": 862.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055637706,
                  -19.77998326
              ]
          },
          "elevation": 863.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055629959,
                  -19.779977985
              ]
          },
          "elevation": 863.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055622212,
                  -19.77997271
              ]
          },
          "elevation": 863.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055614465,
                  -19.779967436
              ]
          },
          "elevation": 863.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055606717,
                  -19.779962161
              ]
          },
          "elevation": 863.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05559897,
                  -19.779956887
              ]
          },
          "elevation": 864.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055591223,
                  -19.779951612
              ]
          },
          "elevation": 864.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055583476,
                  -19.779946337
              ]
          },
          "elevation": 864.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055575729,
                  -19.779941063
              ]
          },
          "elevation": 864.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055567982,
                  -19.779935788
              ]
          },
          "elevation": 864.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055560235,
                  -19.779930513
              ]
          },
          "elevation": 864.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055552488,
                  -19.779925239
              ]
          },
          "elevation": 864.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05554474,
                  -19.779919964
              ]
          },
          "elevation": 863.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055536993,
                  -19.77991469
              ]
          },
          "elevation": 863.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055529246,
                  -19.779909415
              ]
          },
          "elevation": 863.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055521499,
                  -19.77990414
              ]
          },
          "elevation": 862.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055513752,
                  -19.779898866
              ]
          },
          "elevation": 862.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055506005,
                  -19.779893591
              ]
          },
          "elevation": 861.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055498258,
                  -19.779888316
              ]
          },
          "elevation": 859.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055490511,
                  -19.779883042
              ]
          },
          "elevation": 859.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055482763,
                  -19.779877767
              ]
          },
          "elevation": 858.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055475016,
                  -19.779872493
              ]
          },
          "elevation": 858.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055467269,
                  -19.779867218
              ]
          },
          "elevation": 856.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055459522,
                  -19.779861943
              ]
          },
          "elevation": 856.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055451775,
                  -19.779856669
              ]
          },
          "elevation": 856.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055444028,
                  -19.779851394
              ]
          },
          "elevation": 855.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055436281,
                  -19.77984612
              ]
          },
          "elevation": 856.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055428534,
                  -19.779840845
              ]
          },
          "elevation": 856.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055420786,
                  -19.77983557
              ]
          },
          "elevation": 856.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055413039,
                  -19.779830296
              ]
          },
          "elevation": 857.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055405292,
                  -19.779825021
              ]
          },
          "elevation": 857.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055397545,
                  -19.779819746
              ]
          },
          "elevation": 857.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055389798,
                  -19.779814472
              ]
          },
          "elevation": 857.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055382051,
                  -19.779809197
              ]
          },
          "elevation": 858.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055374304,
                  -19.779803923
              ]
          },
          "elevation": 858.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055366557,
                  -19.779798648
              ]
          },
          "elevation": 858.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055358809,
                  -19.779793373
              ]
          },
          "elevation": 859.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055351062,
                  -19.779788099
              ]
          },
          "elevation": 860.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055343315,
                  -19.779782824
              ]
          },
          "elevation": 860.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055335568,
                  -19.779777549
              ]
          },
          "elevation": 860.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055327821,
                  -19.779772275
              ]
          },
          "elevation": 861.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055320074,
                  -19.779767
              ]
          },
          "elevation": 861.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055312327,
                  -19.779761726
              ]
          },
          "elevation": 861.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055304579,
                  -19.779756451
              ]
          },
          "elevation": 861.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055296832,
                  -19.779751176
              ]
          },
          "elevation": 860.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055289085,
                  -19.779745902
              ]
          },
          "elevation": 860.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055281338,
                  -19.779740627
              ]
          },
          "elevation": 860.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055273591,
                  -19.779735353
              ]
          },
          "elevation": 860.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055265844,
                  -19.779730078
              ]
          },
          "elevation": 860.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055258097,
                  -19.779724803
              ]
          },
          "elevation": 860.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05525035,
                  -19.779719529
              ]
          },
          "elevation": 859.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055242602,
                  -19.779714254
              ]
          },
          "elevation": 858.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055234855,
                  -19.779708979
              ]
          },
          "elevation": 858.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055227108,
                  -19.779703705
              ]
          },
          "elevation": 857.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055219361,
                  -19.77969843
              ]
          },
          "elevation": 856.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055211614,
                  -19.779693156
              ]
          },
          "elevation": 856.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055203867,
                  -19.779687881
              ]
          },
          "elevation": 855.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05519612,
                  -19.779682606
              ]
          },
          "elevation": 855.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055188373,
                  -19.779677332
              ]
          },
          "elevation": 854.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055180625,
                  -19.779672057
              ]
          },
          "elevation": 854.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055172878,
                  -19.779666782
              ]
          },
          "elevation": 854.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055165131,
                  -19.779661508
              ]
          },
          "elevation": 854.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055157384,
                  -19.779656233
              ]
          },
          "elevation": 853.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055149637,
                  -19.779650959
              ]
          },
          "elevation": 853.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05514189,
                  -19.779645684
              ]
          },
          "elevation": 853.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055134143,
                  -19.779640409
              ]
          },
          "elevation": 853.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055126396,
                  -19.779635135
              ]
          },
          "elevation": 853.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055118648,
                  -19.77962986
              ]
          },
          "elevation": 853.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055110901,
                  -19.779624586
              ]
          },
          "elevation": 853.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055103154,
                  -19.779619311
              ]
          },
          "elevation": 852.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055095407,
                  -19.779614036
              ]
          },
          "elevation": 851.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05508766,
                  -19.779608762
              ]
          },
          "elevation": 851.65
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055079913,
                  -19.779603487
              ]
          },
          "elevation": 850.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055072166,
                  -19.779598212
              ]
          },
          "elevation": 850.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055064419,
                  -19.779592938
              ]
          },
          "elevation": 849.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055056671,
                  -19.779587663
              ]
          },
          "elevation": 848.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055048924,
                  -19.779582389
              ]
          },
          "elevation": 848.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055041177,
                  -19.779577114
              ]
          },
          "elevation": 848.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05503343,
                  -19.779571839
              ]
          },
          "elevation": 848.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055025683,
                  -19.779566565
              ]
          },
          "elevation": 848.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055017936,
                  -19.77956129
              ]
          },
          "elevation": 849.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055010189,
                  -19.779556015
              ]
          },
          "elevation": 850.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.055002442,
                  -19.779550741
              ]
          },
          "elevation": 850.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054994694,
                  -19.779545466
              ]
          },
          "elevation": 851.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054986947,
                  -19.779540192
              ]
          },
          "elevation": 851.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0549792,
                  -19.779534917
              ]
          },
          "elevation": 851.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054971453,
                  -19.779529642
              ]
          },
          "elevation": 851.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054963706,
                  -19.779524368
              ]
          },
          "elevation": 851.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054955959,
                  -19.779519093
              ]
          },
          "elevation": 851.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054948212,
                  -19.779513819
              ]
          },
          "elevation": 851.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054940465,
                  -19.779508544
              ]
          },
          "elevation": 851.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054932717,
                  -19.779503269
              ]
          },
          "elevation": 851.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05492497,
                  -19.779497995
              ]
          },
          "elevation": 851.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054917223,
                  -19.77949272
              ]
          },
          "elevation": 852.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054909476,
                  -19.779487445
              ]
          },
          "elevation": 852.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054901729,
                  -19.779482171
              ]
          },
          "elevation": 852.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054893982,
                  -19.779476896
              ]
          },
          "elevation": 853.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054886235,
                  -19.779471622
              ]
          },
          "elevation": 853.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054878487,
                  -19.779466347
              ]
          },
          "elevation": 854.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05487074,
                  -19.779461072
              ]
          },
          "elevation": 854.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054862993,
                  -19.779455798
              ]
          },
          "elevation": 854.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054855246,
                  -19.779450523
              ]
          },
          "elevation": 855.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054847499,
                  -19.779445248
              ]
          },
          "elevation": 855.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054839752,
                  -19.779439974
              ]
          },
          "elevation": 856.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054832005,
                  -19.779434699
              ]
          },
          "elevation": 856.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054824258,
                  -19.779429425
              ]
          },
          "elevation": 857.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05481651,
                  -19.77942415
              ]
          },
          "elevation": 857.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054808763,
                  -19.779418875
              ]
          },
          "elevation": 858
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054801016,
                  -19.779413601
              ]
          },
          "elevation": 858.68
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054793269,
                  -19.779408326
              ]
          },
          "elevation": 859.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054785522,
                  -19.779403052
              ]
          },
          "elevation": 859.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054777775,
                  -19.779397777
              ]
          },
          "elevation": 859.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054770028,
                  -19.779392502
              ]
          },
          "elevation": 860.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054762281,
                  -19.779387228
              ]
          },
          "elevation": 861.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054754533,
                  -19.779381953
              ]
          },
          "elevation": 861.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054746786,
                  -19.779376678
              ]
          },
          "elevation": 862.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054739039,
                  -19.779371404
              ]
          },
          "elevation": 862.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054731292,
                  -19.779366129
              ]
          },
          "elevation": 862.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054723545,
                  -19.779360855
              ]
          },
          "elevation": 862.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054715798,
                  -19.77935558
              ]
          },
          "elevation": 861.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054708051,
                  -19.779350305
              ]
          },
          "elevation": 861.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054700304,
                  -19.779345031
              ]
          },
          "elevation": 861.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054692556,
                  -19.779339756
              ]
          },
          "elevation": 860.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054684809,
                  -19.779334481
              ]
          },
          "elevation": 860.88
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054677062,
                  -19.779329207
              ]
          },
          "elevation": 860.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054669315,
                  -19.779323932
              ]
          },
          "elevation": 860.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054661568,
                  -19.779318658
              ]
          },
          "elevation": 860.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054653821,
                  -19.779313383
              ]
          },
          "elevation": 859.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054646074,
                  -19.779308108
              ]
          },
          "elevation": 859.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054638327,
                  -19.779302834
              ]
          },
          "elevation": 859.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054630579,
                  -19.779297559
              ]
          },
          "elevation": 859.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054622832,
                  -19.779292285
              ]
          },
          "elevation": 858.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054615085,
                  -19.77928701
              ]
          },
          "elevation": 858.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054607338,
                  -19.779281735
              ]
          },
          "elevation": 858.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054599591,
                  -19.779276461
              ]
          },
          "elevation": 858.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054591844,
                  -19.779271186
              ]
          },
          "elevation": 858.13
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054584097,
                  -19.779265911
              ]
          },
          "elevation": 857.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05457635,
                  -19.779260637
              ]
          },
          "elevation": 857.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054568602,
                  -19.779255362
              ]
          },
          "elevation": 857.84
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054560855,
                  -19.779250088
              ]
          },
          "elevation": 858.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054553108,
                  -19.779244813
              ]
          },
          "elevation": 858.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054545361,
                  -19.779239538
              ]
          },
          "elevation": 859.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054537614,
                  -19.779234264
              ]
          },
          "elevation": 859.7
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054529867,
                  -19.779228989
              ]
          },
          "elevation": 859.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05452212,
                  -19.779223714
              ]
          },
          "elevation": 860.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054514373,
                  -19.77921844
              ]
          },
          "elevation": 860.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054506625,
                  -19.779213165
              ]
          },
          "elevation": 861
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054498878,
                  -19.779207891
              ]
          },
          "elevation": 861.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054491131,
                  -19.779202616
              ]
          },
          "elevation": 861.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054483384,
                  -19.779197341
              ]
          },
          "elevation": 861.83
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054475637,
                  -19.779192067
              ]
          },
          "elevation": 862.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05446789,
                  -19.779186792
              ]
          },
          "elevation": 862.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054460143,
                  -19.779181518
              ]
          },
          "elevation": 862.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054452395,
                  -19.779176243
              ]
          },
          "elevation": 862.65
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054444648,
                  -19.779170968
              ]
          },
          "elevation": 862.65
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054436901,
                  -19.779165694
              ]
          },
          "elevation": 862.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054429154,
                  -19.779160419
              ]
          },
          "elevation": 863.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054421407,
                  -19.779155144
              ]
          },
          "elevation": 863.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05441366,
                  -19.77914987
              ]
          },
          "elevation": 863.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054405913,
                  -19.779144595
              ]
          },
          "elevation": 863.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054398166,
                  -19.779139321
              ]
          },
          "elevation": 863.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054390418,
                  -19.779134046
              ]
          },
          "elevation": 863.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054382671,
                  -19.779128771
              ]
          },
          "elevation": 863.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054374924,
                  -19.779123497
              ]
          },
          "elevation": 863.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054367177,
                  -19.779118222
              ]
          },
          "elevation": 863.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05435943,
                  -19.779112948
              ]
          },
          "elevation": 863.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054351683,
                  -19.779107673
              ]
          },
          "elevation": 863.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054343936,
                  -19.779102398
              ]
          },
          "elevation": 863.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054336189,
                  -19.779097124
              ]
          },
          "elevation": 863.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054328441,
                  -19.779091849
              ]
          },
          "elevation": 863.9
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054320694,
                  -19.779086574
              ]
          },
          "elevation": 863.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054312947,
                  -19.7790813
              ]
          },
          "elevation": 863.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0543052,
                  -19.779076025
              ]
          },
          "elevation": 863.99
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054297453,
                  -19.779070751
              ]
          },
          "elevation": 864.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054289706,
                  -19.779065476
              ]
          },
          "elevation": 864.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054281959,
                  -19.779060201
              ]
          },
          "elevation": 864.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054274212,
                  -19.779054927
              ]
          },
          "elevation": 864.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054266464,
                  -19.779049652
              ]
          },
          "elevation": 864.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054258717,
                  -19.779044377
              ]
          },
          "elevation": 864.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05425097,
                  -19.779039103
              ]
          },
          "elevation": 864.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054243223,
                  -19.779033828
              ]
          },
          "elevation": 864.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054235476,
                  -19.779028554
              ]
          },
          "elevation": 864.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054227729,
                  -19.779023279
              ]
          },
          "elevation": 864.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054219982,
                  -19.779018004
              ]
          },
          "elevation": 864.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054212235,
                  -19.77901273
              ]
          },
          "elevation": 863.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054204487,
                  -19.779007455
              ]
          },
          "elevation": 863
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05419674,
                  -19.779002181
              ]
          },
          "elevation": 861.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054188993,
                  -19.778996906
              ]
          },
          "elevation": 861.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054181246,
                  -19.778991631
              ]
          },
          "elevation": 860.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054173499,
                  -19.778986357
              ]
          },
          "elevation": 859.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054165752,
                  -19.778981082
              ]
          },
          "elevation": 859.15
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054158005,
                  -19.778975807
              ]
          },
          "elevation": 858.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054150258,
                  -19.778970533
              ]
          },
          "elevation": 858.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05414251,
                  -19.778965258
              ]
          },
          "elevation": 857
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054134763,
                  -19.778959984
              ]
          },
          "elevation": 856.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054127016,
                  -19.778954709
              ]
          },
          "elevation": 855.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054119269,
                  -19.778949434
              ]
          },
          "elevation": 854.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054111522,
                  -19.77894416
              ]
          },
          "elevation": 854.27
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054103775,
                  -19.778938885
              ]
          },
          "elevation": 853.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054096028,
                  -19.77893361
              ]
          },
          "elevation": 852.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054088281,
                  -19.778928336
              ]
          },
          "elevation": 851.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054080533,
                  -19.778923061
              ]
          },
          "elevation": 850.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054072786,
                  -19.778917787
              ]
          },
          "elevation": 850.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054065039,
                  -19.778912512
              ]
          },
          "elevation": 849.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054057292,
                  -19.778907237
              ]
          },
          "elevation": 849.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054049545,
                  -19.778901963
              ]
          },
          "elevation": 848.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054041798,
                  -19.778896688
              ]
          },
          "elevation": 848.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054034051,
                  -19.778891414
              ]
          },
          "elevation": 847.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054026303,
                  -19.778886139
              ]
          },
          "elevation": 847.17
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054018556,
                  -19.778880864
              ]
          },
          "elevation": 846.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054010809,
                  -19.77887559
              ]
          },
          "elevation": 845.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.054003062,
                  -19.778870315
              ]
          },
          "elevation": 845.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053995315,
                  -19.77886504
              ]
          },
          "elevation": 844.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053987568,
                  -19.778859766
              ]
          },
          "elevation": 844.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053979821,
                  -19.778854491
              ]
          },
          "elevation": 843.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053972074,
                  -19.778849217
              ]
          },
          "elevation": 843.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053964326,
                  -19.778843942
              ]
          },
          "elevation": 843.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053956579,
                  -19.778838667
              ]
          },
          "elevation": 843.16
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053948832,
                  -19.778833393
              ]
          },
          "elevation": 843.24
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053941085,
                  -19.778828118
              ]
          },
          "elevation": 843.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053933338,
                  -19.778822843
              ]
          },
          "elevation": 842.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053925591,
                  -19.778817569
              ]
          },
          "elevation": 842.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053917844,
                  -19.778812294
              ]
          },
          "elevation": 842.81
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053910097,
                  -19.77880702
              ]
          },
          "elevation": 842.8
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053902349,
                  -19.778801745
              ]
          },
          "elevation": 842.66
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053894602,
                  -19.77879647
              ]
          },
          "elevation": 842.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053886855,
                  -19.778791196
              ]
          },
          "elevation": 842.92
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053879108,
                  -19.778785921
              ]
          },
          "elevation": 843.32
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053871361,
                  -19.778780647
              ]
          },
          "elevation": 843.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053863614,
                  -19.778775372
              ]
          },
          "elevation": 844.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053855867,
                  -19.778770097
              ]
          },
          "elevation": 844.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05384812,
                  -19.778764823
              ]
          },
          "elevation": 844.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053840372,
                  -19.778759548
              ]
          },
          "elevation": 844.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053832625,
                  -19.778754273
              ]
          },
          "elevation": 845.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053824878,
                  -19.778748999
              ]
          },
          "elevation": 845.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053817131,
                  -19.778743724
              ]
          },
          "elevation": 845.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053809384,
                  -19.77873845
              ]
          },
          "elevation": 846.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053801637,
                  -19.778733175
              ]
          },
          "elevation": 846.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05379389,
                  -19.7787279
              ]
          },
          "elevation": 846.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053786143,
                  -19.778722626
              ]
          },
          "elevation": 847.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053778395,
                  -19.778717351
              ]
          },
          "elevation": 847.52
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053770648,
                  -19.778712076
              ]
          },
          "elevation": 847.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053762901,
                  -19.778706802
              ]
          },
          "elevation": 847.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053755154,
                  -19.778701527
              ]
          },
          "elevation": 848.36
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053747407,
                  -19.778696253
              ]
          },
          "elevation": 848.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05373966,
                  -19.778690978
              ]
          },
          "elevation": 849.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053731913,
                  -19.778685703
              ]
          },
          "elevation": 849.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053724166,
                  -19.778680429
              ]
          },
          "elevation": 849.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053716418,
                  -19.778675154
              ]
          },
          "elevation": 849.92
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053708671,
                  -19.77866988
              ]
          },
          "elevation": 850.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053700924,
                  -19.778664605
              ]
          },
          "elevation": 850.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053693177,
                  -19.77865933
              ]
          },
          "elevation": 850.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05368543,
                  -19.778654056
              ]
          },
          "elevation": 851.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053677683,
                  -19.778648781
              ]
          },
          "elevation": 851.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053669936,
                  -19.778643506
              ]
          },
          "elevation": 851.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053662188,
                  -19.778638232
              ]
          },
          "elevation": 852.18
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053654441,
                  -19.778632957
              ]
          },
          "elevation": 852.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053646694,
                  -19.778627683
              ]
          },
          "elevation": 852.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053638947,
                  -19.778622408
              ]
          },
          "elevation": 852.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0536312,
                  -19.778617133
              ]
          },
          "elevation": 853.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053623453,
                  -19.778611859
              ]
          },
          "elevation": 853.33
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053615706,
                  -19.778606584
              ]
          },
          "elevation": 853.71
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053607959,
                  -19.778601309
              ]
          },
          "elevation": 853.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053600211,
                  -19.778596035
              ]
          },
          "elevation": 854.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053592464,
                  -19.77859076
              ]
          },
          "elevation": 854.44
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053584717,
                  -19.778585486
              ]
          },
          "elevation": 854.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05357697,
                  -19.778580211
              ]
          },
          "elevation": 855.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053569223,
                  -19.778574936
              ]
          },
          "elevation": 855.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053561476,
                  -19.778569662
              ]
          },
          "elevation": 855.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053553729,
                  -19.778564387
              ]
          },
          "elevation": 855.95
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053545982,
                  -19.778559113
              ]
          },
          "elevation": 856.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053538234,
                  -19.778553838
              ]
          },
          "elevation": 856.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053530487,
                  -19.778548563
              ]
          },
          "elevation": 857.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05352274,
                  -19.778543289
              ]
          },
          "elevation": 857.01
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053514993,
                  -19.778538014
              ]
          },
          "elevation": 857.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053507246,
                  -19.778532739
              ]
          },
          "elevation": 857.64
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053499499,
                  -19.778527465
              ]
          },
          "elevation": 857.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053491752,
                  -19.77852219
              ]
          },
          "elevation": 858.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053484005,
                  -19.778516916
              ]
          },
          "elevation": 858.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053476257,
                  -19.778511641
              ]
          },
          "elevation": 858.87
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05346851,
                  -19.778506366
              ]
          },
          "elevation": 859.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053460763,
                  -19.778501092
              ]
          },
          "elevation": 859.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053453016,
                  -19.778495817
              ]
          },
          "elevation": 860.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053445269,
                  -19.778490542
              ]
          },
          "elevation": 861.08
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053437522,
                  -19.778485268
              ]
          },
          "elevation": 861.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053429775,
                  -19.778479993
              ]
          },
          "elevation": 861.67
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053422028,
                  -19.778474719
              ]
          },
          "elevation": 862.4
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05341428,
                  -19.778469444
              ]
          },
          "elevation": 862.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053406533,
                  -19.778464169
              ]
          },
          "elevation": 863.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053398786,
                  -19.778458895
              ]
          },
          "elevation": 863.73
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053391039,
                  -19.77845362
              ]
          },
          "elevation": 864.55
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053383292,
                  -19.778448346
              ]
          },
          "elevation": 865.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053375545,
                  -19.778443071
              ]
          },
          "elevation": 865.93
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053367798,
                  -19.778437796
              ]
          },
          "elevation": 866.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053360051,
                  -19.778432522
              ]
          },
          "elevation": 867.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053352303,
                  -19.778427247
              ]
          },
          "elevation": 867.58
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053344556,
                  -19.778421972
              ]
          },
          "elevation": 868.21
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053336809,
                  -19.778416698
              ]
          },
          "elevation": 868.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053329062,
                  -19.778411423
              ]
          },
          "elevation": 868.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053321315,
                  -19.778406149
              ]
          },
          "elevation": 868.57
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053313568,
                  -19.778400874
              ]
          },
          "elevation": 868.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053305821,
                  -19.778395599
              ]
          },
          "elevation": 868.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053298074,
                  -19.778390325
              ]
          },
          "elevation": 868.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053290326,
                  -19.77838505
              ]
          },
          "elevation": 868.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053282579,
                  -19.778379775
              ]
          },
          "elevation": 868.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053274832,
                  -19.778374501
              ]
          },
          "elevation": 868.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053267085,
                  -19.778369226
              ]
          },
          "elevation": 868.47
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053259338,
                  -19.778363952
              ]
          },
          "elevation": 868.43
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053251591,
                  -19.778358677
              ]
          },
          "elevation": 868.49
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053243844,
                  -19.778353402
              ]
          },
          "elevation": 868.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053236096,
                  -19.778348128
              ]
          },
          "elevation": 868.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053228349,
                  -19.778342853
              ]
          },
          "elevation": 868.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053220602,
                  -19.778337579
              ]
          },
          "elevation": 868.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053212855,
                  -19.778332304
              ]
          },
          "elevation": 868.04
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053205108,
                  -19.778327029
              ]
          },
          "elevation": 867.79
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053197361,
                  -19.778321755
              ]
          },
          "elevation": 867.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053189614,
                  -19.77831648
              ]
          },
          "elevation": 867.45
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053181867,
                  -19.778311205
              ]
          },
          "elevation": 867.09
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053174119,
                  -19.778305931
              ]
          },
          "elevation": 866.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053166372,
                  -19.778300656
              ]
          },
          "elevation": 866.63
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053158625,
                  -19.778295382
              ]
          },
          "elevation": 866.53
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053150878,
                  -19.778290107
              ]
          },
          "elevation": 866.29
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053143131,
                  -19.778284832
              ]
          },
          "elevation": 866.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053135384,
                  -19.778279558
              ]
          },
          "elevation": 866.07
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053127637,
                  -19.778274283
              ]
          },
          "elevation": 865.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05311989,
                  -19.778269009
              ]
          },
          "elevation": 865.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053112142,
                  -19.778263734
              ]
          },
          "elevation": 865.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053104395,
                  -19.778258459
              ]
          },
          "elevation": 865.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053096648,
                  -19.778253185
              ]
          },
          "elevation": 865.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053088901,
                  -19.77824791
              ]
          },
          "elevation": 865.38
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053081154,
                  -19.778242635
              ]
          },
          "elevation": 865.34
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053073407,
                  -19.778237361
              ]
          },
          "elevation": 865.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05306566,
                  -19.778232086
              ]
          },
          "elevation": 865.12
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053057913,
                  -19.778226812
              ]
          },
          "elevation": 864.86
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053050165,
                  -19.778221537
              ]
          },
          "elevation": 864.56
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053042418,
                  -19.778216262
              ]
          },
          "elevation": 864.37
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053034671,
                  -19.778210988
              ]
          },
          "elevation": 864.14
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053026924,
                  -19.778205713
              ]
          },
          "elevation": 863.97
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053019177,
                  -19.778200438
              ]
          },
          "elevation": 863.91
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05301143,
                  -19.778195164
              ]
          },
          "elevation": 863.75
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.053003683,
                  -19.778189889
              ]
          },
          "elevation": 863.51
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052995936,
                  -19.778184615
              ]
          },
          "elevation": 863.23
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052988188,
                  -19.77817934
              ]
          },
          "elevation": 863.11
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052980441,
                  -19.778174065
              ]
          },
          "elevation": 862.89
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052972694,
                  -19.778168791
              ]
          },
          "elevation": 862.76
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052964947,
                  -19.778163516
              ]
          },
          "elevation": 862.41
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.0529572,
                  -19.778158242
              ]
          },
          "elevation": 862.28
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052949453,
                  -19.778152967
              ]
          },
          "elevation": 861.96
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052941706,
                  -19.778147692
              ]
          },
          "elevation": 861.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052933959,
                  -19.778142418
              ]
          },
          "elevation": 861.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052926211,
                  -19.778137143
              ]
          },
          "elevation": 861.59
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052918464,
                  -19.778131868
              ]
          },
          "elevation": 861.54
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052910717,
                  -19.778126594
              ]
          },
          "elevation": 861.3
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05290297,
                  -19.778121319
              ]
          },
          "elevation": 861.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052895223,
                  -19.778116045
              ]
          },
          "elevation": 861.06
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052887476,
                  -19.77811077
              ]
          },
          "elevation": 860.82
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052879729,
                  -19.778105495
              ]
          },
          "elevation": 860.74
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052871982,
                  -19.778100221
              ]
          },
          "elevation": 860.5
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052864234,
                  -19.778094946
              ]
          },
          "elevation": 860.42
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052856487,
                  -19.778089671
              ]
          },
          "elevation": 860.26
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05284874,
                  -19.778084397
              ]
          },
          "elevation": 860.02
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052840993,
                  -19.778079122
              ]
          },
          "elevation": 859.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052833246,
                  -19.778073848
              ]
          },
          "elevation": 859.69
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052825499,
                  -19.778068573
              ]
          },
          "elevation": 859.61
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052817752,
                  -19.778063298
              ]
          },
          "elevation": 859.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052810004,
                  -19.778058024
              ]
          },
          "elevation": 859.35
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052802257,
                  -19.778052749
              ]
          },
          "elevation": 859.1
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05279451,
                  -19.778047475
              ]
          },
          "elevation": 858.85
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052786763,
                  -19.7780422
              ]
          },
          "elevation": 858.72
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052779016,
                  -19.778036925
              ]
          },
          "elevation": 858.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052771269,
                  -19.778031651
              ]
          },
          "elevation": 858.46
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052763522,
                  -19.778026376
              ]
          },
          "elevation": 858.2
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052755775,
                  -19.778021101
              ]
          },
          "elevation": 857.94
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052748027,
                  -19.778015827
              ]
          },
          "elevation": 857.77
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.05274028,
                  -19.778010552
              ]
          },
          "elevation": 857.48
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052732533,
                  -19.778005278
              ]
          },
          "elevation": 857.31
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052724786,
                  -19.778000003
              ]
          },
          "elevation": 857.22
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052717039,
                  -19.777994728
              ]
          },
          "elevation": 857.05
      },
      {
          "point": {
              "type": "Point",
              "coordinates": [
                  -44.052709292,
                  -19.777989454
              ]
          },
          "elevation": 856.83
      }
  ]
}

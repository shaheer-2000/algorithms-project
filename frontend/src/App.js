import { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Components/Graphs';
import IndexPage from './Components/Pages/IndexPage';
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// const elements = {
// 	nodes: [
// 		{
// 			data: {
// 				id: 'a',
// 			},
// 			position: {
// 				x: 360,
// 				y: 44
// 			},

// 		},
// 		{
// 			data: {
// 				id: 'b',
// 			},
// 			position: {
// 				x: 700,
// 				y: 34
// 			}
// 		},
// 		{
// 			data: {
// 				id: 'c',
// 			},
// 			position: {
// 				x: 15,
// 				y: 60
// 			}
// 		},
// 	],
// 	edges: [
// 		{
// 			data: {
// 				id: 'ab',
// 				source: 'a',
// 				target: 'b',
// 				weight: '3'
// 			}
// 		},
// 		{
// 			data: {
// 				id: 'abc',
// 				source: 'a',
// 				target: 'b',
// 				weight: '5'
// 			}
// 		}
// 	],
// };

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexGrow: 1,
    height: "500px"
  },
  tabs: {
    width: "200px"
  }
}));

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
}));

function App() {
  const [input, setinput] = useState(10);
  const [algo, setalgo] = useState();
  const [elements, setElements] = useState({});
  // const inputTypes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const classes = useStyles();
  const classes2 = useStyles2();
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    console.log(value2);
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(`http://163.47.9.21:8001/inputs/${(value+1)*10}`);
      setElements((elements) => ({
        nodes: [
          ...(res.data.nodes.map((node) => ({
            data: {
              id: node.data.id,
            },   
            position: {
              x: node.data.position.x,
              y: node.data.position.y
            }
          })))
        ],
        edges: [
          ...res.data.edges
        ]
      }));
    })();
  }, [value, value2])

  return (
    <div style={{display: "flex", flexDirection: "column", flexWrap: "wrap", height: "400px", alignItems: "flex-start", justifyContent: "flex-start"}}>
      <div style={{width: "200px", marginTop: "65px"}}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab label="Input 10" />
          <Tab label="Input 20" />
          <Tab label="Input 30" />
          <Tab label="Input 40" />
          <Tab label="Input 50" />
          <Tab label="Input 60" />
          <Tab label="Input 70" />
          <Tab label="Input 80" />
          <Tab label="Input 90" />
          <Tab label="Input 100" />
        </Tabs>
      </div>
      <div style={{width: "900px", marginLeft: "-80px"}}>
        <Tabs
          value={value2}
          onChange={handleChange2}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          className={classes2.tabs}
        >
          <Tab label="Prims" />
          <Tab label="Kruskal" />
          <Tab label="Dijkstra" />
          <Tab label="Bellman Ford" />
          <Tab label="Floyd Warshall" />
          <Tab label="Clustering Coefficient" />
          <Tab label="Borůvka" />
        </Tabs>
        
      </div>
      <div style={{height: "400px", position: "absolute", left: "222px", top: "70px"}}>
        <Graph 
          containerId="cy" 
          containerStyle={
            {
              width: '75vw',
              height: '80vh',
              display: 'block',
              border: '1px solid #00c'
            }
          }
          elements={(() => { console.log(elements); return elements; })()}
          elementStyles={
            {
              nodes: {
                'background-color': '#666',
                'label': 'data(id)',
                'text-valign': 'center',
                'border-style': 'double',
                "border-color": '#000',
                "border-width": '3px'
              },
              edges: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'label': 'data(weight)'
              }
            }
          }
          cytoscapeSettings={
            {
              zoomingEnabled: false,
              autoLock: true
            }
          }
          layoutSettings={
            {
              name: 'preset'
            }
          }
        />
      </div>
    </div>
  );
}

export default App;

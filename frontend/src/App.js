import { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Components/Graphs';
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Skeleton from '@mui/material/Skeleton';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, List, ListItem } from '@material-ui/core';

const GRAPH_WIDTH = "75vw";
const GRAPH_HEIGHT = "80vh";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexGrow: 1,
    height: "500px"
  },
  tabs: {
    width: "200px"
  },
  graphLoader: {
    minHeight: GRAPH_HEIGHT,
    minWidth: GRAPH_WIDTH
  },
  mainContainer: {
    display: "flex", 
    flexDirection: "column", 
    flexWrap: "wrap", 
    height: "400px", 
    alignItems: "flex-start", 
    justifyContent: "flex-start"
  }
}));

const nodeCounts = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const algorithms = ['prims', 'kruskal', 'dijkstra', 'bellman-ford', 'floyd-warshall', 'clustering-coefficient', 'boruvka'];

const URL = 'http://localhost:8001';

const DEFAULT_NODE_COUNT = 10;
const DEFAULT_ALGORITHM = false;

function App() {
  const [nodeCount, setNodeCount] = useState(DEFAULT_NODE_COUNT);
  const [algorithm, setAlgorithm] = useState(DEFAULT_ALGORITHM)
  const [currentGraphData, setCurrentGraphData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [globalCC, setGlobalCC] = useState(0);
  const [ccDialogIsOpen, setCCDialogIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      setIsLoading((isLoading) => true);

      for (let n of nodeCounts) {
        let res = localStorage.getItem(n);
        if (!res) {
          res = await axios.get(`${URL}/inputs/${n}`);

          res = {
            nodes: [
              ...res.data.nodes
            ],
            edges: [
              ...res.data.edges
            ]
          };

          localStorage.setItem(n, JSON.stringify(res));
        } else {
          res = JSON.parse(res);
        }

        if (n === DEFAULT_NODE_COUNT) {
          setCurrentGraphData((currentGraphData) => ({
            nodes: res.nodes,
            edges: res.edges
          }));
        }
      }

      setIsLoading((isLoading) => false);
    })();
  }, []);

  const handleNodeCountTab = (e, v) => {
    setIsLoading(true);
    setCurrentGraphData((currentGraphData) => JSON.parse(localStorage.getItem(v)));
    setNodeCount(v);
    // reset algorithm to remove indicator from tab
    setAlgorithm(DEFAULT_ALGORITHM);
    setIsLoading(false);
  };

  const handleCCDialogClose = () => {
    setCCDialogIsOpen(false);
    setAlgorithm(DEFAULT_ALGORITHM);
  };

  const handleAlgorithmTab = async (e, v) => {
    setIsLoading(true);
    const algoResultId = `${nodeCount}-${v}`;
    let res = localStorage.getItem(algoResultId);

    // TODO: check how clustering-coeff and boruvka work
    // have switch here just in case some work differently
    switch (v) {
      case 'clustering-coefficient':
        if (!res) {
          res = await axios.get(`${URL}/algorithms/${v}/${nodeCount}`);
          res = res.data;
          localStorage.setItem(algoResultId, JSON.stringify(res));
        } else {
          res = JSON.parse(res);
        }

        setGlobalCC(res.globalCC);
        setCCDialogIsOpen(true);
        break;

      default:
      case 'prims':
        if (!res) {
          res = await axios.get(`${URL}/algorithms/${v}/${nodeCount}`);
          // TODO: check how clustering-coeff and boruvka work
          res = {
            nodes: [
              ...res.data.nodes
            ],
            edges: [
              ...res.data.edges
            ]
          };
    
          localStorage.setItem(algoResultId, JSON.stringify(res));
        } else {
          res = JSON.parse(res);
        }

        setCurrentGraphData((currentGraphData) => res);
        break;
    }

    setAlgorithm(v);
    setIsLoading(false);
  };

  return (
    <div className={classes.mainContainer}>
      
      <div style={{width: "200px", marginTop: "65px" }}>
        <Tabs
          textColor="secondary"
          indicatorColor="primary"
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleNodeCountTab}
          value={nodeCount}
        >
          { 
            nodeCounts.map((n) => <Tab label={`Input-${n}`} value={n} />)
          }
        </Tabs>
      </div>

      <div style={{width: "900px", marginLeft: '-80px'}}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="secondary"
          value={algorithm}
          onChange={handleAlgorithmTab}
        >
          { 
            algorithms.map((a) => <Tab label={a.toUpperCase()} value={a} />)
          }
        </Tabs>
      </div>

      <div style={{height: "400px", position: "absolute", left: "222px", top: "70px"}}> 
        { isLoading ? 
          <Skeleton variant="rectangular" className={classes.graphLoader} /> : 
          <Graph 
            containerId="cy" 
            containerStyle={
              {
                width: GRAPH_WIDTH,
                height: GRAPH_HEIGHT,
                display: 'block',
                border: '1px solid #00c'
              }
            }
            elements={currentGraphData}
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
        }
      </div>

      <Dialog
        open={ccDialogIsOpen}
        onClose={handleCCDialogClose}
      >
        <DialogTitle>Global Clustering Co-efficient</DialogTitle>
        <List>
          <ListItem>Global CC: {globalCC.toFixed(2)}</ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default App;

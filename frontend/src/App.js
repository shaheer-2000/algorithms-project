import { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Components/Graphs';
import IndexPage from './Components/Pages/IndexPage';
import { Container } from '@mui/material';

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

function App() {
  const [elements, setElements] = useState({});
  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:8000/inputs/20');
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
  }, [])

  return (
    <Container maxWidth="xl" xs={12} style={{ marginLeft: '0', marginRight: '0', paddingLeft: '0', paddingRight: '0'}}>
      <Graph 
        containerId="cy" 
        containerStyle={
          {
            width: '75vw',
            height: '75vh',
            display: 'block',
            border: '1px solid #000'
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
    </Container>
  );
}

export default App;

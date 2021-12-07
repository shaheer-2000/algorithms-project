import React, { useEffect, useState, useRef } from 'react';
import cytoscape from 'cytoscape';

export default function DirectedMultigraph(props) {
	const cy = useRef(null);
	const container = useRef();
	// const [mstNodes, setMstNodes] = useState(null);
	// const [renderCount, setRenderCount] = useState(0);

	/* const aniPlay = (cy) => {
		cy.$('[id = "a"]').animation({
			style: {
			  'background-color': 'red'
			},
			duration: 1000
		  }).play();
		cy.edges('[id = "ab"]').animation({
			style: {
			  'line-color': 'red',
			  'target-arrow-color': 'red'
			},
			duration: 1000
		  }).play();
		cy.$('[id = "b"]').animation({
		style: {
			'background-color': 'red'
		},
		duration: 1000
		}).play();
		cy.$('[id = "a"]').forEach((node) => {
			console.log(node);
		})
		cy.$('[id = "c"]').animation({
			style: {
				'opacity': '0'
			},
			duration: 1000
		}).play();
		setTimeout(() => cy.remove(cy.$('[id = "c"]')), 2000);
		cy.$('[id = "abc"]').animation({
			style: {
				'opacity': '0'
			},
			duration: 1000
		}).play();
		setTimeout(() => cy.remove(cy.$('[id = "abc"]')), 2000);
		cy.center();
		cy.resize();
	} */

	useEffect(() => {
		if (container.current) {
			cy.current = cytoscape({
				container: document.getElementById(container.current.id),
		
				elements: props.elements,
		
				style: [
					{
						selector: 'node',
						style: props.elementStyles.nodes
					},
					{
						selector: 'edge',
						style: props.elementStyles.edges
					}
				],

				...props.cytoscapeSettings,

				layout: props.layoutSettings
			});

			cy.current.center();

			/* cy.current.nodes().on('click', function (e) {
				const targetNode = e.target;
	
				setMstNodes((mstNodes) => (mstNodes ?? cy.current.collection()).union(targetNode));
				// setRenderCount(count => count + 1);
			}); */

			// setRenderCount(count => count + 1);
		}

		// setRenderCount(count => count + 1);

		return () => {};
	}, [props.elements, props.elementStyles, props.cytoscapeSettings, props.layoutSettings]);

	/* <button onClick={() => aniPlay(cy.current)}>Animate</button> */
	/* <ul>{Array.from(mstNodes ?? []).map((node) => <li key={node.id()}>{node.id()}</li>)}</ul>
	<span>Render Count: {renderCount}</span> */

	return (
		<div id={props.containerId} style={props.containerStyle} ref={container}>
		</div>
	);
}
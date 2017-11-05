import React, { Component } from 'react';
import MapView from '../lib';

const center = {lat:40.6700,lng: -73.9400};
const zoom = 7;
const zoomControl = false;

const markers = [{
	position: {lat:40.6700,lng: -73.9400},
  	title: 'Sample Title 1',
  	icon: 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/restaurant.png'
},{
	position:{lat:45.6900,lng: -78.9900},
  	title: 'Click to zoom 2'
},
{
	position:{lat:40.6900,lng: -73.9900},
  	title: 'Click to zoom 2'
},{
	position:{lat:41.6900,lng: -77.9900},
  	title: 'Click to zoom 2'
},
{
	position:{lat:42.6900,lng: -76.9900},
  	title: 'Click to zoom 2'
},{
	position:{lat:40.6900,lng: -75.9900},
  	title: 'Click to zoom 2'
},
{
	position:{lat:43.6900,lng: -74.9900},
  	title: 'Click to zoom 2'
},{
	position:{lat:40.6900,lng: -71.9900},
  	title: 'Click to zoom 2'
},
{
	position:{lat:46.6900,lng: -72.9900},
  	title: 'Click to zoom 2'
}];

class ItemView extends Component {
	render(){
		const listItems = markers.map((item) =>
		    <li><p>{item.title}</p><span>{item.position.lat},{item.position.lng}</span></li>
		);
		return (<div><ul>{listItems}</ul></div>);
	}
}

const itemViewComp = <ItemView markers={markers} />

const App = () => (
  <div>
    <MapView childComponent={itemViewComp} markers={markers}  center={center} zoom={zoom} listItemView="true" theme="dark" language="FR" zoomControl="true" fullscreenControl="false" />
  </div>
);

export default App;

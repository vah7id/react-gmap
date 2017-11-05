# React Google Map Component

This component help you to using google maps in your react application easily. It has list items view option which show all markers as list item beside the map and usable for kind of directory listings applications.

## Getting Started

`npm install react-ggmap` or `yarn add react-ggmap`

## Usage

After Install you can use it in your components :   

```
import MapComponent from 'react-ggmap'

<MapComponent center={center} childComponent={itemViewComp} markers={markers} zoom={zoom} listItemView="true" theme="dark" language="FR" zoomControl="true"/>

```
   

## Options

You can use all of google maps api options in your initializing component.
Also I consider some other options for add markers, styling and list item view for map component.

### markers:  
it should be array of json data for positions like below :   

```
const markers = [{
	position: {lat:40.6700,lng: -73.9400},
  	title: 'Sample Title 1',
  	icon: 'path/restaurant.png'
}]
```

   
### theme:  

I used built-in themes in my component for map skin. you can use these keywords as theme :   
"dark","blue","desert","water"

### childComponent   

If you want to have list item view in beside of the map component you should first create your child component which having map and markers as props and pass it as childComponent to MapComponent. Check out the example below :

```

class ItemView extends Component {
	render(){
		const listItems = this.props.markers.map((item) =>
		    <li><p>{item.title}</p><span>{item.position.lat},{item.position.lng}</span></li>
		);
		return (<div><ul>{listItems}</ul></div>);
	}
}

const itemViewComp = <ItemView />

const App = () => (
  <div>
    <MapView childComponent={itemViewComp} markers={markers} center={center} zoom={zoom} listItemView="true" />
  </div>
);

```   

  

### listItemView   

You can show or hide the list items view with this boolean parameter.
  


## Licence   

MIT Licensed. Copyright (c) Vahid Taghizadeh 2017.


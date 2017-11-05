import React, { Component } from 'react'

import GoogleMapsLoader from 'google-maps';

import './Map.scss';

GoogleMapsLoader.VERSION = '3.14';

const toBoolean = (bool) => {
  if (bool === 'false') bool = false
  return !!bool
}

class MapView extends Component {
 
  constructor(){
    super()
    this.state = {
      map: Array(9).fill(null),
      markers: [],
      infowindow: false,
      listItemView: false
    }

  }

  componentDidMount(){
  	var _height = window.getComputedStyle(document.querySelector(".MapView")).height;
  	document.getElementById('map').style.height = _height;
  }

  componentWillMount(){

  	var self = this;

  	if(self.props.client)
  		GoogleMapsLoader.CLIENT = self.props.client;

  	if(self.props.libraries)
  		GoogleMapsLoader.LIBRARIES = self.props.libraries

  	if(self.props.language)
  		GoogleMapsLoader.LANGUAGE = self.props.language;

  	if(self.props.region)
  		GoogleMapsLoader.REGION = self.props.region;

  	if(self.props.key)
		GoogleMapsLoader.KEY = self.props.key;


	GoogleMapsLoader.load(function(google) {

		self.state.infowindow = new google.maps.InfoWindow();

		const center = self.props.center ? self.props.center : {lat:40.6700,lng: -73.9400};  
		const zoom  = self.props.zoom ? self.props.zoom : 10;
		const mapTypeControl = self.props.mapTypeControl ? self.props.mapTypeControl : true;

		const mapTypeControlOptions = self.props.mapTypeControlOptions ? self.props.mapTypeControlOptions : {};
	    const zoomControl = self.props.zoomControl ? self.props.zoomControl : true;
	    const zoomControlOptions = self.props.zoomControlOptions ? self.props.zoomControlOptions : {};
	    const scaleControl = self.props.scaleControl ? self.props.scaleControl : true;
	    const streetViewControl = self.props.streetViewControl ? streetViewControl : true;
	    const streetViewControlOptions = self.props.streetViewControlOptions ? self.props.streetViewControlOptions : {};
	    const fullscreenControl = self.props.fullscreenControl ? self.props.fullscreenControl : true;
	    const disableDefaultUI = self.props.disableDefaultUI ? self.props.disableDefaultUI : false;
	    const scrollwheel = self.props.scrollwheel ? self.props.scrollwheel : false;
	    const panControl = self.props.panControl ? self.props.panControl : false;
	    const minZoom = self.props.minZoom ? self.props.minZoom : null;
	    const maxZoom = self.props.minZoom ? self.props.maxZoom : null;
	    const gestureHandling = self.props.gestureHandling ? self.props.gestureHandling : '';
	    const listItemView = self.props.listItemView ? self.props.listItemView : true;
	   
	    self.setState({'listItemView': toBoolean(listItemView) });
	    self.setState({'childComponent': self.props.childComponent })

    	var styles = self.props.styles ? self.props.styles : [];

	    if(self.props.theme){

	    	switch ( self.props.theme ){
	    		case 'desert': 
	    			styles = [{"elementType":"labels","stylers":[{"visibility":"off"},{"color":"#f49f53"}]},{"featureType":"landscape","stylers":[{"color":"#f9ddc5"},{"lightness":-7}]},{"featureType":"road","stylers":[{"color":"#813033"},{"lightness":43}]},{"featureType":"poi.business","stylers":[{"color":"#645c20"},{"lightness":38}]},{"featureType":"water","stylers":[{"color":"#1994bf"},{"saturation":-69},{"gamma":0.99},{"lightness":43}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#f19f53"},{"weight":1.3},{"visibility":"on"},{"lightness":16}]},{"featureType":"poi.business"},{"featureType":"poi.park","stylers":[{"color":"#645c20"},{"lightness":39}]},{"featureType":"poi.school","stylers":[{"color":"#a95521"},{"lightness":35}]},{},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#813033"},{"lightness":38},{"visibility":"off"}]},{},{},{},{},{},{},{},{},{},{},{},{"elementType":"labels"},{"featureType":"poi.sports_complex","stylers":[{"color":"#9e5916"},{"lightness":32}]},{},{"featureType":"poi.government","stylers":[{"color":"#9e5916"},{"lightness":46}]},{"featureType":"transit.station","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","stylers":[{"color":"#813033"},{"lightness":22}]},{"featureType":"transit","stylers":[{"lightness":38}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#f19f53"},{"lightness":-10}]},{},{},{}];
	    		case 'blue':
	    			styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]}]
	    		case 'water': 
	    			styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
	    		case 'dark':
	    			styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]

	    		default:
	    			if(self.props.styles)
	    				styles = self.props.styles

	    	}

	    }


		var mapElement = document.getElementById('map');

		var mapOptions = {
		    zoom: zoom,
		    scrollwheel: scrollwheel,
		    panControl: panControl,
		    center: center,
		    gestureHandling: gestureHandling,
		    maxZoom: maxZoom,
		    minZoom: minZoom,
		    mapTypeControl: mapTypeControl,
		    mapTypeControlOptions: mapTypeControlOptions,
		    zoomControl: toBoolean(zoomControl),
		    zoomControlOptions: zoomControlOptions,
		    scaleControl: toBoolean(scaleControl),
		    streetViewControl: toBoolean(streetViewControl),
		    streetViewControlOptions: streetViewControlOptions,
		    fullscreenControl: toBoolean(fullscreenControl),
		    disableDefaultUI: toBoolean(disableDefaultUI),
		    styles: styles		
		 };

		self.state.map = new google.maps.Map(mapElement, mapOptions);
		
		self.setState({'map': self.state.map })


		var markers = self.props.markers;

		for( var i in markers ){
			
			var item = markers[i];

			var _markers = markers;

			_markers[i] = new google.maps.Marker({
	          position: item.position,
	          map: self.state.map,
	          title: item.title,
	          icon: item.icon
	        });

			self.setState({ 'markers': _markers });


	        google.maps.event.addListener(self.state.markers[i],'click', (function(marker,i){
	        	
	        	return function() {  
		        	
		        	if(self.state.infowindow)
	        			self.state.infowindow.close();

				    self.state.map.setCenter(marker.position);
				    self.state.infowindow.setContent(marker.title);               
				  	self.state.infowindow.open(self.state.map, self.state.markers[i]);   
				  }

	        }(self.state.markers[i],i)));
		}
	

	});
  
  }


  render() {
  	console.log(this.props)
  	const childrenWithProps = React.Children.map(this.state.childComponent,
     (child) => React.cloneElement(child, {
       map: this.state.map,
       markers: this.props.markers
     })
    );

  	return (
	  <div className="MapView">
	    <div id="map"></div>
	    { this.state.listItemView ? 

	    	<div id="listItemsView">
	    		{childrenWithProps}
	    	</div> : null 

	    }
	  </div>
	  );
  }

}

export default MapView;

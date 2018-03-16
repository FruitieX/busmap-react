import React, { Component } from 'react';

import { indexToHue } from './utils/routes';
import hsl from 'hsl-to-hex';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, OverlayView } from "react-google-maps"
import { MarkerStyle, MarkerText, MarkerSubText } from './Marker';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 60.1700423, lng: 24.9340991 }}
  >
    {props.children}
  </GoogleMap>
))

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

export default class Map extends Component {
  renderMarkers = () =>
    this.props.markers
      .filter(marker => marker.lat && marker.lng)
      .map((marker, index) =>
        <OverlayView
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={getPixelPositionOffset}
          position={marker}
          key={marker.veh}
        >
          <MarkerStyle hue={indexToHue(this.props.lines.indexOf(marker.desi), this.props.lines.length)}>
            <MarkerText numberOfLines={1}>{marker.desi}</MarkerText>
            <MarkerSubText numberOfLines={1}>{marker.dest}</MarkerSubText>
          </MarkerStyle>
        </OverlayView>
      );

  // TODO: this is bad, prolly gets redrawn every time
  renderPolylines = () => {
    //console.log('drawing polylines', Object.keys(this.props.polylines));

    const polylines = [];

    Object.entries(this.props.polylines)
      .forEach(([shortName, polyline]) => {
        const index = this.props.lines.indexOf(shortName);
        const color = indexToHue(index, this.props.lines.length);
        const hexColor = `hsla(${color}, 70%, 50%, 0.7)`;

        polylines.push(
          <Polyline
            path={polyline}
            key={index}
            options={{
              strokeColor: hexColor,
              strokeWidth: 4,
            }}
          />
        )
      })

    return polylines;
  }

  render() {
    return (
      <MyMapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAptYb9QxBM9905ZkKHCzD-jH3no0rDw5E"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ position: 'absolute', top: 30, width: '100%', height: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      >
        {this.renderMarkers()}
        {this.renderPolylines()}
      </MyMapComponent>
    );
  }
}

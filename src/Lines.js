import React from 'react';
import ReactAutocomplete from 'react-autocomplete';

import styled from 'styled-components/primitives';
import { MarkerButtonComponent } from './Marker';

const BusNumber = styled.Text`
  padding-left: 8px;
  font-size: 32px;
  width: 100px;
  text-align: center;
`;
const BusDest = styled.Text`
  flex: 1;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 20px;
`;
const NoLines = styled.Text`
  color: #777;
  padding-left: 12px;
`;
/*
const Suggestion = styled.Touchable`
  background-color: ${props => props.isSelected ? 'lightgray' : 'white'};
`;
*/

export default class Autocomplete extends React.PureComponent {
  state = {
    search: '',
  };

  changeHandler = e => {
    if(this.scroll) this.scroll.scrollLeft = 0;
    this.setState({ search: e.target.value })
  };
  submitHandler = lineId => {
    if (!lineId || !lineId.length) return;

    this.setState({ search: '' });

    const routeIndex = this.props.availableRoutes
      .findIndex(line => line.shortName.toLowerCase() === lineId.toLowerCase());

    if (routeIndex === -1) {
      return;
    }

    if (this.input) {
      this.input.blur();
    }

    this.props.addLine(this.props.availableRoutes[routeIndex].shortName);
  };

  /*
  renderItem = ({ shortName, longName }, isSelected) => (
    <Suggestion key={shortName} isSelected={isSelected} onPress={this.submitHandler(shortName)}>
      <BusNumber numberOfLines={1}>{shortName}</BusNumber>
      <BusDest numberOfLines={2}>{longName}</BusDest>
    </Suggestion>
  )
  */

  renderSelectedLines = () => {
    const lines = this.props.lines.map((lineId, index) =>
      <MarkerButtonComponent
        lineId={lineId}
        onPress={this.props.removeLine}
        key={lineId}
        index={index}
        numLines={this.props.lines.length}
      />
    );

    if (!lines.length) {
      return [<NoLines key="nolines">(No lines selected)</NoLines>];
    }

    return lines;
  }

  renderItem = ({ shortName, longName }, isHighlighted) =>
    <div key={shortName} style={{ background: isHighlighted ? 'lightgray' : 'white', display: 'flex' }}>
      <BusNumber numberOfLines={1}>{shortName}</BusNumber>
      <BusDest numberOfLines={2}>{longName}</BusDest>
    </div>

  findLines = () => {
    if (!this.state.search.length) {
      return [];
    }

    const search = this.state.search.toLowerCase()

    const lines = this.props.availableRoutes
      .filter(line => !line.shortName.toLowerCase().indexOf(search))
      .sort((a, b) => a.shortName.length - b.shortName.length);

    if (!lines.length) {
      return [{
        shortName: '-',
        longName: 'No search results'
      }];
    }
    return lines;
  }

  saveRef = (input) => {
    this.input = input;
  };

  getItemValue = item => item.shortName;

  onMenuVisibilityChange = isOpen => !isOpen && this.setState({ search: '' });
  onBlur = () => this.setState({ search: '' });

  setScrollRef = scroll => this.scroll = scroll;

  render() {
    return (
      <div style={{ minHeight: 30, position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div ref={this.setScrollRef} style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', zIndex: 1, overflowX: this.state.search !== '' ? 'hidden' : 'auto' }}>
          <ReactAutocomplete
            items={this.findLines()}
            getItemValue={this.getItemValue}
            renderItem={this.renderItem}
            value={this.state.search}
            onChange={this.changeHandler}
            onSelect={this.submitHandler}
            onMenuVisibilityChange={this.onMenuVisibilityChange}
            open={this.state.search !== ''}
            inputProps={{ placeholder: 'Enter bus line number', onBlur: this.onBlur }}
            ref={this.saveRef}
            wrapperStyle={{ zIndex: 10 }}
            menuStyle={{ position: 'absolute', height: 220, maxHeight: '80vh', maxWidth: 500, backgroundColor: 'white', overflow: 'auto', left: 0, top: 30, boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 0.1)', }}
          />
          {this.renderSelectedLines()}
        </div>
      </div>
    );
  }
}

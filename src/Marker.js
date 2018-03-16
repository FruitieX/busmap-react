import React from 'react';
import styled from 'styled-components/primitives';
import styledWeb from 'styled-components';
import { indexToHue } from './utils/routes';
import { Touchable } from 'react-primitives';

export const MarkerText = styled.Text`
  color: black;
  font-size: 18;
`;

export const MarkerSubText = styled.Text`
  color: black;
  font-size: 12;
`;

export const MarkerStyle = styled.View`
  background-color: hsla(${props => props.hue || 0}, 70%, 50%, 0.5);
  border-radius: 4;
  width: 60;
  align-items: center;
`;

export const MarkerButton = styled.View`
  background-color: hsla(${props => props.hue || 0}, 75%, 50%, 0.5);
  border-radius: 4px;
  width: 60px;
  align-items: center;
  margin: 4px;
`;

export class MarkerButtonComponent extends React.Component {
  pressHandler = () => this.props.onPress(this.props.lineId);

  render = () =>
    <Touchable onPress={this.pressHandler}>
      <MarkerButton hue={indexToHue(this.props.index, this.props.numLines)}>
        <MarkerText>{this.props.lineId}</MarkerText>
      </MarkerButton>
    </Touchable>;
}

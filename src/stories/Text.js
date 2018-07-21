import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Text from '../components/Text';
import View from '../components/View';

storiesOf('Texts', module)
  .add('local', () => {
    return (
      <View container direction="column">
        <Text type="h1">{`H1 - I'm a title, trying to be descriptive!`}</Text>
        <Text type="h2">{`H2 - I'm a title, trying to be descriptive!`}</Text>
        <Text type="h3">{`H3 - I'm a title, trying to be descriptive!`}</Text>
        <Text type="h4">{`H4 - I'm a title, trying to be descriptive!`}</Text>
        <Text type="h5">{`H4 - I'm a title, trying to be descriptive!`}</Text>
        <Text type="p1">{`P1 - I'm a title, trying to be descriptive!`}</Text>
        <Text type="p2">{`P2 - I'm a title, trying to be descriptive!`}</Text>
        <Text type="p3">{`P3 - I'm a title, trying to be descriptive!`}</Text>
        <Text type="p4">{`P4 - I'm a title, trying to be descriptive!`}</Text>
        <Text type="p5">{`P5 - I'm a title, trying to be descriptive!`}</Text>
        <Text type="span">{`span - I'm a title, trying to be descriptive!`}</Text>
      </View>
    );
  });

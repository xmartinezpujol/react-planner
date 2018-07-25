import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import Button from '../components/Button';

const optionsTemplate = {
  login: 'facebook',
  default: 'default',
  outlined: 'outlined',
  link: 'link',
};
const optionsBorder = {
  night: 'night',
  consumer: 'consumer',
  business: 'business',
  positive: 'positive',
  temporary: 'temporary',
  negative: 'negative',
};

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('default',
    withInfo(`
      <p>This a Button component.</p>
    `)(() => {
      const defaultTeamplate = 'default';
      const defaultborderColor = 'black';

      const label = 'Theme';
      const label2 = 'Border Color';

      const template = select(label, optionsTemplate, defaultTeamplate);
      const borderColor = select(label2, optionsBorder, defaultborderColor);

      return (
        <Button
          className="btn-default"
          border={boolean('Border', true)}
          color={borderColor}
          bordercolor={borderColor}
          bold={boolean('Bold', true)}
          disabled={boolean('Disabled', false)}
          uppercase={boolean('Uppercase', true)}
          template={template}
          onClick={action('clicked')}
          noanim={boolean('No Animation', false)}
        >
          {text('text 1', 'Button')}
        </Button>
      );
    }))
  .add('with icon', () => {
    const defaultTeamplate = 'default';
    const defaultborderColor = 'black';

    const label = 'Theme';
    const label2 = 'Border Color';

    const template = select(label, optionsTemplate, defaultTeamplate);
    const borderColor = select(label2, optionsBorder, defaultborderColor);

    return (
      <Button
        iFont={text('Icon Font', 'fa')}
        icon={text('Icon name', 'bomb')}
        iconSize={number('Icon fontSize', 22)}
        iconWidth={number('Icon width (for paddings)', 40)}
        border={boolean('Border', true)}
        color={borderColor}
        bordercolor={borderColor}
        bold={boolean('Bold', true)}
        disabled={boolean('Disabled', false)}
        uppercase={boolean('Uppercase', true)}
        template={template}
        onClick={action('clicked')}
        noanim={boolean('No Animation', false)}
      >
        {text('text 1', 'Button')}
      </Button>
    );
  })
  .add('with icon only', () => {
    const defaultTeamplate = 'default';
    const defaultborderColor = 'black';

    const label = 'Theme';
    const label2 = 'Border Color';

    const template = select(label, optionsTemplate, defaultTeamplate);
    const borderColor = select(label2, optionsBorder, defaultborderColor);

    return (
      <Button
        iFont={text('Icon Font', 'fa')}
        icon={text('Icon name (FA)', 'comment')}
        iconSize={number('Icon fontSize', 20)}
        style={{ padding: '0px 17px' }}
        border={boolean('Border', true)}
        shape="round"
        color={borderColor}
        bordercolor={borderColor}
        bold={boolean('Bold', true)}
        disabled={boolean('Disabled', false)}
        uppercase={boolean('Uppercase', true)}
        template={template}
        onClick={action('clicked')}
        noanim={boolean('No Animation', false)}
      />
    );
  });
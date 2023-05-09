import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions'
import {Story} from "@storybook/blocks";
import {EditableSpan} from '../EditableSpan';

const meta: Meta<typeof EditableSpan> =
    {
        title: 'TODOLISTS/EditableSpan',
        component: EditableSpan,
        tags: ['autodocs'],
        args: {
            value: 'Start value123',
            onChange: action('onChange')
        },
        // argTypes: {
        //     onChange: {
        //         description: 'Value changed',
        //     },
        // }
    }

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
    args: {
    }
}
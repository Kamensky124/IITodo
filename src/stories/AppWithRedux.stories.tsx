import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions'
import {Story} from "@storybook/blocks";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";



const meta: Meta<typeof AppWithRedux> =
    {
        title: 'TODOLISTS/AppWithRedux',
        component: AppWithRedux,
        tags: ['autodocs'],
        decorators: [ReduxStoreProviderDecorator],
        args: {},
        argTypes: {}
    }

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {};

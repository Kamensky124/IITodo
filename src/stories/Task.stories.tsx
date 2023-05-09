import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions'
import {Story} from "@storybook/blocks";
import {Task} from "../Task";

const meta: Meta<typeof Task> =
    {
        title: 'TODOLISTS/Task',
        component: Task,
        tags: ['autodocs'],
        args: {
            // changeTaskStatus: action('changeTaskStatus'),
            // changeTaskTitle: action('changeTaskTitle'),
            // removeTask: action('removeTask'),
            task: {id: 'asdfasfsdf', title: 'jsqewdsaddwefdsfdsfdsf', isDone: false},
            todolistId: 'sdfsdfsdf'
        },
        argTypes: {
            changeTaskStatus: {
                description: 'Button clicked inside form',
                action: 'changeTaskStatus' //- 2 вариант
                // }
            },
            changeTaskTitle: {
                description: 'Button clicked inside form',
                action: 'changeTaskTitle' //- 2 вариант
                // }
            },
            removeTask: {
                description: 'Button clicked inside form',
                action: 'removeTask' //- 2 вариант
                // }
            },
        }
    }

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
};

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: 'asdfasfsdf', title: 'htmhbmhmbhmbml', isDone: false},
    }
}
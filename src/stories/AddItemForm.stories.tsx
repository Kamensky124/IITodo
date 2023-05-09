import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions'
import {Story} from "@storybook/blocks";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import TextField from "@mui/material/TextField/TextField";

const meta: Meta<typeof AddItemForm> =
    {
        title: 'TODOLISTS/AddItemForm',
        component: AddItemForm,
        tags: ['autodocs'],
        argTypes: {
            addItem: {
                description: 'Button clicked inside form',
                action: 'clicked' //- 2 вариант
                // }
            },
        }
    }

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// const writeMessage = action("Button AddItem was pressed")

export const AddItemFormStory:
    Story = {
    args: {
        addItem: action('Mouse button clicked inside form')
    }
}

// для варианта с render нужно в TSX файл обязательно
export const AddItemFormWithErrorStory = (args:AddItemFormPropsType)  => {
        let [title, setTitle] = useState("")
        let [error, setError] = useState<string | null>('error')
        const addItem = () => {
            if (title.trim() !== "") {
                args.addItem(title);
                setTitle("");
            } else {
                setError("Title is required");
            }
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) {
                setError(null);
            }
            if (e.charCode === 13) {
                addItem();
            }
        }

        return <div>
            <TextField variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label="Title"
                       helperText={error}
            />
            <IconButton color="primary" onClick={addItem}>
                <AddBox />
            </IconButton>
        </div>
}
import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    count: number;
    title: string;
}

const initialState: CounterState = {
    count: 0,
    title: 'YARC - Yet Another React Counter (with Redux Toolkit)'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += action.payload;
        },
        decrement: (state, action) => {
            state.count -= action.payload;
        },
    }
})

export const { increment, decrement } = counterSlice.actions;
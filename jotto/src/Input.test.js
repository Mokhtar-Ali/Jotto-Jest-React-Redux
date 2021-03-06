import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../test/testUtils.js'
import Input from './Input'


const setup = (success=false, secretWord='party') => {
    return shallow(<Input success={success} secretWord={secretWord}/>)
}

describe('render', () => {
    describe('success is true', () => {
        let wrapper
        beforeEach(() => {
            wrapper = setup(true)
        })
        test('renders without error', () => {
            const inputComponent = findByTestAttr(wrapper, 'component-input')
            expect(inputComponent.length).toBe(1)
        })
        test('input box does not show', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box')
            expect(inputBox.exists()).toBe(false)
        })
        test('submit botton does not show', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button')
            expect(submitButton.exists()).toBe(false)
        })
    })
    describe('success is false', () => {
        let wrapper
        beforeEach(() => {
            wrapper = setup(false)
        })
        test('renders without error', () => {
            const inputComponent = findByTestAttr(wrapper, 'component-input')
            expect(inputComponent.length).toBe(1)
        })
        test('input box shows', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box')
            expect(inputBox.exists()).toBe(true)
        })
        test('submit botton shows', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button')
            expect(submitButton.exists()).toBe(true)
        })
    })
})



test('does not throw warning with expected props', () => {
    checkProps(Input, {secretWord: 'party'})
}) 

describe('state controlled input field', () => {
    let mockSetCurrentGuess;
    let wrapper;
    let originalUseState;
    beforeEach(() => {
        mockSetCurrentGuess = jest.fn();
        originalUseState = React.useState
        React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
        wrapper = setup() 
    })
    afterEach = (() => {
        React.useState = originalUseState
    })
    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box')

        const mockEvent = { target: {value: 'train'}}
        inputBox.simulate("change", mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenLastCalledWith('train')
    })
    test('field is cleared upon submit button clicked', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button')

        submitButton.simulate('click', {preventDefault () {}})
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
    })
})
import App from "../App";
import {describe, expect, test} from '@jest/globals';
import { render } from "@testing-library/react";

/************ Any Required Set Up or Mocking to be done ************/


// mocking function of scrollTo
window.scrollTo = jest.fn();

// clear mock calls, instances, contexts and results before every test
afterAll(() => {
    jest.clearAllMocks;
})


/************ Tests Below Here ************/

// basic test to see if the component renders
test('render UserProfile component', ()=>{
    render(<App/>);
});
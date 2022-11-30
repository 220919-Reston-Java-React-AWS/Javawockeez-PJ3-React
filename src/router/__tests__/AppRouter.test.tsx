import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {AppRoutes} from '../AppRoutes'
import {MemoryRouter} from 'react-router-dom'


/************ Any Required Set Up or Mocking to be done ************/

// mocking function of scrollTo
window.scrollTo = jest.fn();

// clear mock calls, instances, contexts and results before every test
afterAll(() => {
    jest.clearAllMocks;
})


/************ Tests Below Here ************/

test('landing on a bad page', () => {
    const badRoute = '/some/bad/route'
  
    // use <MemoryRouter> when you want to manually control the history
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <AppRoutes />
      </MemoryRouter>,
    )
  
    // verify navigation to "Error" route
    expect(document.getElementById('Error'))
})
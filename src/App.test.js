import react from 'react'
import { render, fireEvent, waitFor, waitForElement , screen, mount} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import Navbar from './Components/Navbar'
 
describe("render home page dengan benar", () => {

  test('renders app', () => {
    const { getByTestId } = render(<App />);
  
    expect(getByTestId(/app/i));
  });

  test('check Explore text', () => {
    const { getAllByText } = render(<App />);
    const exploreText = getAllByText(/Explore/i);
    expect(exploreText).toEqual(expect.any(Array));
  });

  test('check My Pokemon List text', () => {
    const { getAllByText } = render(<App />);
    const exploreText = getAllByText(/My Pokemon List/i);
    expect(exploreText).toEqual(expect.any(Array));
  });

  test('renders navbar', () => {
    const { getByTestId } = render(<Navbar />);
  
    expect(getByTestId("explore")).toHaveTextContent("Explore");
  });

  test('renders navbar', () => {
    const { getByTestId } = render(<Navbar />);
  
    expect(getByTestId("list")).toHaveTextContent("My Pokemon List");
  });
})

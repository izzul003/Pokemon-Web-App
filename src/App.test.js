import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import Home from './Pages/Home'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import * as ReactDOM from 'react-dom'

test('renders the correct content', () => {
  const root = document.createElement("div");
  ReactDOM.render(<Home />, root);

  expect(root.querySelector("button").textContent).toBe("Load More")
});

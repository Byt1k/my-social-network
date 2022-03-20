import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from "react-dom";

test('renders learn react link', () => {
  render(<App />);
  const mainRole = screen.getByRole(/preloader/i);
  expect(mainRole).toBeInTheDocument();
});

test('rendered without crashed', () => {
  let div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
})


import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Author from './Author';

describe('Author', () => {
  it('shows a distinct profile for the selected author id', () => {
    render(
      <MemoryRouter initialEntries={['/author/2']}>
        <Routes>
          <Route path="/author/:id" element={<Author />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Lori Hart')).toBeInTheDocument();
  });
});

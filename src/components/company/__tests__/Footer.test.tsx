import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('should render company name', () => {
    render(<Footer name="Test Company" />);
    expect(screen.getByText(/Test Company/)).toBeInTheDocument();
  });

  it('should render current year', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer name="Test Company" />);
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('should render copyright text', () => {
    render(<Footer name="Test Company" />);
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  it('should render tagline', () => {
    render(<Footer name="Test Company" />);
    expect(screen.getByText(/Building the future, one hire at a time/)).toBeInTheDocument();
  });

  it('should use fallback name when name is empty', () => {
    render(<Footer name="" />);
    expect(screen.getByText(/Company/)).toBeInTheDocument();
  });

  it('should have contentinfo role', () => {
    const { container } = render(<Footer name="Test Company" />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveAttribute('role', 'contentinfo');
  });
});

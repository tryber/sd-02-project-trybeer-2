import React from 'react';
import { render } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import Provider from '../context/TrybeerContext';

const index = 0;

const product = {
  id: 1,
  name: 'Skol',
  price: 3.33,
  urlImage: 'localhost:3001/Skol',
}

describe('test product card component', () => {
  test('if product card component is rendering correctly', () => {
    const { queryByTestId } = render(
      <Provider>
        <ProductCard product={product} index={index} />
      </Provider>
    );
    expect(queryByTestId(`${index}-product-img`)).toBeInTheDocument();
    expect(queryByTestId(`${index}-product-img`).tagName).toBe('IMG');
    expect(queryByTestId(`${index}-product-name`)).toBeInTheDocument();
    expect(queryByTestId(`${index}-product-name`).tagName).toBe('H5');
    expect(queryByTestId(`${index}-product-price`)).toBeInTheDocument();
    expect(queryByTestId(`${index}-product-price`).tagName).toBe('SPAN');
  });
});

import { mockProducts } from '@/data/mockProducts';

// Environment variables
const SHOPIFY_API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2025-07';
const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const SHOPIFY_STOREFRONT_URL = SHOPIFY_STORE_DOMAIN 
  ? `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`
  : '';

// GraphQL Queries
export const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

// API Request Handler
export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  // Use mock data if enabled or if credentials are missing
  if (USE_MOCK_DATA || !SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    console.log('Using mock data for products');
    return getMockData(query, variables);
  }

  try {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      console.error(`Shopify API error: ${response.status}`);
      console.log('Falling back to mock data');
      return getMockData(query, variables);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error(`Shopify GraphQL errors:`, data.errors);
      console.log('Falling back to mock data');
      return getMockData(query, variables);
    }

    return data;
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    console.log('Falling back to mock data');
    return getMockData(query, variables);
  }
}

// Mock Data Handler
function getMockData(query: string, variables: Record<string, unknown>) {
  // Simulate async behavior
  return new Promise((resolve) => {
    setTimeout(() => {
      if (query.includes('productByHandle')) {
        // Return single product by handle
        const handle = variables.handle as string;
        const product = mockProducts.find(p => p.node.handle === handle);
        resolve({
          data: {
            productByHandle: product ? product.node : null
          }
        });
      } else {
        // Return products list
        const first = (variables.first as number) || mockProducts.length;
        resolve({
          data: {
            products: {
              edges: mockProducts.slice(0, first)
            }
          }
        });
      }
    }, 300); // Simulate network delay
  });
}

// Check if using mock data
export function isUsingMockData(): boolean {
  return USE_MOCK_DATA || !SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN;
}

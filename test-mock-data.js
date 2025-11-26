// Quick test to verify mock data is available
import { mockProducts } from './src/data/mockProducts';

console.log('=== Mock Products Test ===');
console.log(`Total products: ${mockProducts.length}`);
console.log('\nProduct titles:');
mockProducts.forEach((product, index) => {
  console.log(`${index + 1}. ${product.node.title} - $${product.node.priceRange.minVariantPrice.amount}`);
});
console.log('\n=== Test Complete ===');

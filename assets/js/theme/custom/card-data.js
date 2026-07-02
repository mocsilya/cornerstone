/**
 * Variant data on product listings
*/
import clientCardData from './client/client-card-data';

export default function (key, productIdArray) {
  const allProductVariants = [];
  let arrayLength = productIdArray.length;
  fetch('/graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        query:`query productById {
            site {
              products(first: ${arrayLength}, entityIds: [${String(productIdArray)}]) {
                edges {
                  node {
                    name
                    sku
                    entityId
                    variants(first: 99) {
                      edges {
                        node {
						  isPurchasable
					      defaultImage {
						    urlOriginal
						  }
                          sku
                          entityId
                          inventory {
                            isInStock
                          }
						  options {
						    edges {
						      node {
						        displayName
						        entityId
						        values {
						          edges {
						            node {
						              entityId
						              label
						            }
						          }
						        }
						      }
						    }
						  }
                          prices(includeTax: true) {
                            price {
                              value
                              formatted
                            }
                            salePrice {
                              value
                              formatted
                            }
							basePrice {
							  value
							  formatted
							}
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
      }),
  })
  .then(res => res.json())
  .then(function(response) {
      if (response) {
        const products = response.data.site.products.edges;
        products.forEach(product => {
          //const indexOfInhoud = product.node.variants.edges[0].node.options.edges.findIndex(
            //(edge) => edge.node.displayName.toLowerCase() === 'size',
			  //);
          //if (indexOfInhoud < 0) return;

          const variants = product.node.variants.edges;
          const mappedVariants = variants.map((variant) => {
		  //if (!variant.node) return;
		  //const label = variant.node.options.edges[indexOfInhoud].node.values.edges[0].node.label;
		  const options = variant.node.options;
		  
		  return {
                prices: variant.node.prices,
                defaultImage: variant.node.defaultImage,
			    isPurchasable: variant.node.isPurchasable,
                inventory: variant.node.inventory.isInStock,
                //label,
                sku: variant.node.sku,
                options,
            };
          });
          const obj = {
            id: product.node.entityId,
            productName: product.node.name,
            productVariant: mappedVariants
          }
		  
          allProductVariants.push(obj);
		  
        })
     }
     return allProductVariants;
  })
  .then(data => {
    //console.log('[data]: ', data);
	clientCardData(data);
  });
}
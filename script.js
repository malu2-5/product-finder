const products = [
  { id: 1, name: 'Alpha Keyboard', status: 'IN STOCK', price: 2499 },
  { id: 2, name: 'Beta Mouse', status: 'OUT OF STOCK', price: 1299 },
  { id: 3, name: 'Gamma Headset', status: 'IN STOCK', price: 3499 }
];

let displayedProducts = [...products];
let debounceTimer = null;

function renderProducts(list) {
  $('#products').empty();

  list.forEach(product => {
    const statusClass =
      product.status === 'IN STOCK' ? 'in-stock' : 'out-stock';

    $('#products').append(`
      <div class="product-card">
        <h3>${product.name}</h3>
        <span class="badge ${statusClass}">${product.status}</span>
        <div class="product-price">
          <p>Price: USD ${product.price}</p>
        </div>
      </div>
    `);
  });
}

renderProducts(displayedProducts);

$('#search').on('input', function () {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const query = $(this).val().toLowerCase();

    const filtered = displayedProducts.filter(p =>
      p.name.toLowerCase().includes(query)
    );

    renderProducts(filtered);
  }, 300);
});

$('#products').on('click', '.toggle-btn', function () {
  $(this).siblings('.details').slideToggle();
});

$('#loadMore').on('click', function () {
  $('#loadMore').text('Loading...');

  setTimeout(() => {
    const newProducts = [
      { id: 4, name: 'Delta Monitor', status: 'IN STOCK', price: 8999 },
      { id: 5, name: 'Epsilon Speaker', status: 'OUT OF STOCK', price: 4999 }
    ];

    displayedProducts = displayedProducts.concat(newProducts);
    renderProducts(displayedProducts);

    $('#loadMore').text('Load More');
  }, 800);
});

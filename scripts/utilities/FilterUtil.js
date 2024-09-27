export function matchesFilterByInput(item) {
  const filterValue = filterInput.value.toLowerCase();
  return (
    item.categoryName.toLowerCase().includes(filterValue) ||
    item.categoryBrand.toLowerCase().includes(filterValue)
  );
}

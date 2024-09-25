export function inputContains(item) {
  const filterValue = filterInput.value.toLowerCase();
  return (
    item.categoryName.toLowerCase().includes(filterValue) ||
    item.categoryBrand.toLowerCase().includes(filterValue)
  );
}

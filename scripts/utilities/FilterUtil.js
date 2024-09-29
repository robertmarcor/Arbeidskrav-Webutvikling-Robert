/**
 * Creates an array of fields to match input against used with JavaScript Array filter()
 * @param  {...string} fields
 * @returns true if field includes filterValue provided by user through inputField
 */
export function matchFieldsToInput(...fields) {
  return (item) => {
    const filterValue = filterInput.value.toLowerCase();
    return fields.some((field) =>
      item[field].toLowerCase().includes(filterValue)
    );
  };
}

export function getFilterInputField(functionToRun) {
  const filterInput = document.getElementById("filterInput");
  if (filterInput) {
    filterInput.addEventListener("input", functionToRun);
  } else {
    console.log("No Input field for filter present");
    /* Should ther be one? add if missing maybe? */
  }
}

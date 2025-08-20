// searchBar.js
export function filterItems(items, searchTerm, fields = []) {
    if (!searchTerm) return items;
    const term = searchTerm.trim().toLowerCase();
  
    return items.filter(item =>
      fields.some(field => {
        let value = item[field];
        if (Array.isArray(value)) value = value.join(", ");
        if (typeof value === "number") value = value.toString();
        if (!value) return false;
        return value.toLowerCase().includes(term);
      })
    );
  }
  
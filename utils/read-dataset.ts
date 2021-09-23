const fs = require('fs');
const Papa = require('papaparse');

export const readCSV = async () => {
  const csvFile = fs.readFileSync('./resources/dataset.csv')
  const csvData = csvFile.toString()  
  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: true,
      complete: results => {
        const dataset = results.data.filter(({id}) => id.length !== 0)
        dataset.sort(function(a, b) {
          return a.id - b.id;
        })
        resolve(dataset);
      }
    });
  });
};

export function paginator(items, current_page, per_page_items) {
	let page = current_page || 0,
	per_page = per_page_items || 10,
	offset = page * per_page,

	paginatedItems = items.slice(offset).slice(0, per_page_items)

	return paginatedItems;
}
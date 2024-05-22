const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
];

function searchData() {
    let fromY = Number(document.getElementById("fromY").value);
    let toY = Number(document.getElementById("toY").value);

    fromY = fromY ? Number(fromY) : -Infinity;
    toY = toY ? Number(toY) : Infinity;

    let filteredCompanies = companies.filter(company => company.start >= fromY && company.start <= toY);

    let companyNames = filteredCompanies.map(company => company.name);
    let rootDiv = document.getElementById('root');
    rootDiv.innerHTML = '';
    let list = document.createElement('ol');
    for (let name of companyNames) {
        let li = document.createElement('li');
        li.textContent = name;
        list.appendChild(li);
    }
    rootDiv.appendChild(list);
}

function showData() {
    let companyNames = companies.map(company => company.name);
    let rootDiv = document.getElementById('root');
    rootDiv.innerHTML = '';
    let list = document.createElement('ol');
    for (let name of companyNames) {
        let li = document.createElement('li');
        li.textContent = name;
        list.appendChild(li);
    }
    rootDiv.appendChild(list);
}
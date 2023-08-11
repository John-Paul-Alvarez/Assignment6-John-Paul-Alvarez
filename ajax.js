/*********************************************************************************
*  BTI225 – Assignment 6 
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ____John Paul Alvarez_____ Student ID: __187724216____ Date: ___08/11/2023_______
*
*********************************************************************************/

function makeRequest() {
    const countriesTable = document.getElementById("countriesTable");
    fetch("https://restcountries.com/v3.1/independent?status=true")
        .then(response => response.json())
        .then(data => {
            const independentCountries = data.filter(country => country.independent);
            let counter = 1;
            const countriesRows = independentCountries.map(country => {
                const nativeNames = country.name.nativeName;
                const nativeCommon = nativeNames ? Object.values(nativeNames)[0].common || "N/A" : "N/A";
                const row = `
                <tr>
                    <td>${counter}</td>
                    <td><img src="${country.flags.png}" alt="${country.name.common} Flag" width="32" height="32"></td>
                    <td>${country.coatOfArms ? `<img src="${country.coatOfArms.png}" alt="${country.name.common} Coat of Arms" width="32" height="32">` : ""}</td>
                    <td>${nativeCommon}</td>
                    <td>${country.capital}</td>
                    <td>${country.subregion}</td>
                </tr>`;
                counter++;
                return row;
            }).join("");
            const table = `
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Flag</th>
                            <th>Coat of Arms</th>
                            <th>Native Name</th>
                            <th>Capital</th>
                            <th>(Sub) Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${countriesRows}
                    </tbody>
                </table>
            `;
            countriesTable.innerHTML = table;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

window.onload = function () {
    makeRequest();
}

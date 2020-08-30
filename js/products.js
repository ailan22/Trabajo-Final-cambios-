const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant. Vendidos";
const ORDER_BY_PRICE_MAX = "Precio_Max";
const ORDER_BY_PRICE_MIN = "Precio_Min";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice;
var maxPrice;


//Ordena alfabéticamente, por relevancia y precio.
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }

            return 0;
        });
    } else if (criteria === ORDER_BY_PRICE_MAX) {
        result = array.sort(function(a, b) {
            let acost = parseInt(a.cost);
            let bcost = parseInt(b.cost);

            if (acost > bcost) { return -1; }
            if (acost < bcost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PRICE_MIN) {
        result = array.sort(function(a, b) {
            let acost = parseInt(a.cost);
            let bcost = parseInt(b.cost);

            if (acost < bcost) { return -1; }
            if (acost > bcost) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let producto = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(producto.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(producto.cost) <= maxPrice))) {

            htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + producto.name + `</h4>
                        <small class="text-muted">` + producto.soldCount + ` vendidos </small>
                    </div>
                    <div>` + "Precio: " + producto.currency + " " + producto.cost + `</div>
                    <p class="mb-1">` + producto.description + `</p>
                </div>
            </div>
        </div>
        `
        }
    }
    document.getElementsByClassName("container p-5")[0].innerHTML = htmlContentToAppend;
}

function showProductsListFilterName(name) {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let producto = currentProductsArray[i];

        if (producto.name.toLowerCase().includes(name.toLowerCase())) {

            htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + producto.name + `</h4>
                        <small class="text-muted">` + producto.soldCount + ` vendidos </small>
                    </div>
                    <div>` + "Precio: " + producto.currency + " " + producto.cost + `</div>
                    <p class="mb-1">` + producto.description + `</p>
                </div>
            </div>
        </div>
        `
        }
    }
    if (htmlContentToAppend == "") {
        htmlContentToAppend = "No hay ningún elemento nombrado:" + "  " + name;
    }
    document.getElementsByClassName("container p-5")[0].innerHTML = htmlContentToAppend;
}


function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenadas
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("sortByPriceMax").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PRICE_MAX);
    });

    document.getElementById("sortByPriceMin").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PRICE_MIN);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    //Obtengo el mínimo y máximo de los precios.
    document.getElementById("rangeFilterCount").addEventListener("click", function() {

        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
        }

        showProductsList();
    });

    document.getElementById("searching").addEventListener("keyup", function() {
        var name = document.getElementById("searching").value;
        if (name != "") {
            showProductsListFilterName(name);
        } else {
            showProductsList();
        }
    });
});
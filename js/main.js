import { Data } from "./models.js"

const tablero = document.createElement("table")

window.onload = () => {
    start();
};

const start = () => {
    tablero.className = "tablero";
    document.querySelector("body")
        .appendChild(tablero);
    
    setHead();
    createBoard();
};

const setHead = () => {
    tablero.createTHead();

    fetch("data.json")
        .then(res => res.json())
        .then(data => setHeadNumbers(data));
};

/**
 * @param {Data} data 
 */
const setHeadNumbers = (data) => {
    // Se tiene que considerar que de la forma en la forma en la que vienen los datos (que es una matriz), cada fila sera una columna y cada columna una fila. Esto es debido a que 
    data.cols.forEach((col, colIndex) => {
        // Sin esto los datos se colocaran al reves
        col = col.reverse();

        col.forEach((value, index) => {
            // Creo una nueva fila si el set de columnas que viene tiene mas elementos que filas actuales
            while (tablero.tHead.rows.length < col.length) {
                const row = tablero.tHead.insertRow(index);
                Array.from(Array(40)).forEach(n => row.insertCell(n));
            }
        
            const cell = tablero.tHead.rows[
                tablero.tHead.rows.length - index - 1
            ].cells[colIndex];
            cell.innerText = value;
        });
    });
};

const createBoard = () => {
    for (let r = 0; r < 40; r++) {
        const row = createRow(r);
        
        for (let c = 0; c < 40; c++) {
            createCell(row, c);
        }
    }
};

const createRow = currentItter => {
    const row = tablero.insertRow();

    if (currentItter % 5 == 0)
        row.className = "fila-gruesa";
    
    return row;
};

/**
 * @param {HTMLTableRowElement} row - The row
 * @param {number} currentItter - The current itteration
 */
const createCell = (row, currentItter) => {
    const cell = row.insertCell();
    cell.oncontextmenu = (e) => {
        e.preventDefault();
    };
    cell.onclick = () => {
        cell.classList.remove("equis");

        if (cell.classList.contains("cuadro"))
            cell.classList.remove("cuadro");
        else
            cell.classList.add("cuadro");
    };
    cell.onauxclick = (e) => {
        e.preventDefault();
        cell.classList.remove("cuadro");

        if (cell.classList.contains("equis")) {
            cell.classList.remove("equis");
        }
        else {
            cell.classList.add("equis");
        }
    };
    cell.className = "celda";

    if (currentItter % 5 == 0)
        cell.classList.add("celda-gruesa");
    
    return cell;
};

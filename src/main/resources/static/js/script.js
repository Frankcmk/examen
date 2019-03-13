let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
let jsonCitas = JSON.parse(document.getElementById("infoJson").getAttribute("value"));

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                console.log("JSON: " + jsonCitas);
                for(var z = 0; z < jsonCitas.length; z++) {
                    var obj = jsonCitas[z];
                    var d = new Date(obj.fechacita);

                    if (date == d.getDate() && month == d.getMonth() && year == d.getFullYear()) {

                        var btn = document.createElement("BUTTON");
                        var t = document.createTextNode("CITA");       // Create a text node
                        btn.appendChild(t);
                        var att = document.createAttribute("onclick");// Create a "href" attribute
                        att.value = "imprimir(" + obj.asunto + ", " + obj.hora +  ", " + obj.fecha + ", " + obj.doctor + ")";// Set the value of the href attribute
                        btn.setAttributeNode(att);
                        cell.appendChild(btn);
                        break;
                    }
                }

                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

/*function imprimir(asunto, hora, fecha, doctor) {

    for(var i = 0; i < jsonCitas.length; i++) {
        var obj = jsonCitas[i];
        if(asunto === obj.asunto && hora === obj.hora && fecha === obj.fecha && doctor === obj.doctor){
            var d = new Date(obj.fechacita);
            alert( "Cita el: " + d.getDate() + " de " + d.getMonth() + " del " + d.getFullYear() + " a las "+ d.getHours() +":" + d.getMinutes() + "\n" +
                "Asunto: " + obj.asunto + "\n" +
                "Con el doctor: " + obj.doctor);
        }
    }


}*/
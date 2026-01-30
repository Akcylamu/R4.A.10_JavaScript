function tabGen() {
    var A_tab = [];
    for (var i = 0; i < 20; i++) {
        A_tab.push(Math.floor(Math.random()*50)-10);
    }
    return A_tab;
}

function showTab(A_tab) {
    var I_ind = 0;
    setInterval(() => {
        if (-10 <= A_tab[I_ind] && A_tab[I_ind] <= 0) {
            document.getElementById("message").innerHTML = "Brr brr patapim, un peu froid ce matin, mets ta cagoule !";
            document.getElementById("message").setAttribute("class", "shown");
            document.getElementById("output").setAttribute("class", "blue");
        } else if (0 < A_tab[I_ind] && A_tab[I_ind] <= 20) {
            document.getElementById("message").setAttribute("class", "hidden");
            document.getElementById("output").setAttribute("class", "green");
        } else if (20 < A_tab[I_ind] && A_tab[I_ind] <= 30) {
            document.getElementById("message").setAttribute("class", "hidden");
            document.getElementById("output").setAttribute("class", "orange");
        } else if (30 < A_tab[I_ind] && A_tab[I_ind] <= 40) {
            document.getElementById("message").innerHTML = "Caliente ! Vamos a la playa, ho hoho hoho !";
            document.getElementById("message").setAttribute("class", "shown");
            document.getElementById("output").setAttribute("class", "red");
        }
        document.getElementById("output").innerHTML = A_tab[I_ind].toString() + " °C";
        if (I_ind < A_tab.length - 1) {
            I_ind++;
        } else {
            I_ind = 0;
        }
    }, 2000);
}

document.getElementById("output").innerHTML = "températures";
showTab(tabGen());
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
        switch (A_tab[I_ind]) {
            case -10 <= A_tab[I_ind] <= 0:
                document.getElementById("output").setAttribute("class", "blue");
                break;
            case 0 < A_tab[I_ind] <= 20:
                document.getElementById("output").setAttribute("class", "green");
                break;
            case 20 < A_tab[I_ind] <= 30:
                document.getElementById("output").setAttribute("class", "orange");
                break;
            case 30 < A_tab[I_ind] <= 40:
                document.getElementById("output").setAttribute("class", "red");
                break;
        }
        document.getElementById("output").innerHTML = A_tab[I_ind].toString();
        if (I_ind < A_tab.length - 1) {
            I_ind++;
        } else {
            I_ind = 0;
        }
    }, 1000);
}

document.getElementById("output").innerHTML = "températures";
showTab(tabGen());
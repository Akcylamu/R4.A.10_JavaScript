class Tabs {
  constructor() {
    var A_tab = [];
    for (var i = 0; i < 20; i++) {
        A_tab.push(Math.floor(Math.random()*50)-10);
    }
    this.A_tab = A_tab;
  }

  showTab() {
    document.getElementById("output").innerHTML = "températures";
    var I_ind = 0;
    setInterval(() => {
        if (-10 <= this.A_tab[I_ind] && this.A_tab[I_ind] <= 0) {
            document.getElementById("output").setAttribute("class", "blue");
            document.getElementById("message").setAttribute("class", "shown");
            document.getElementById("message").innerHTML = "Brr brr patapim, un peu froid ce matin, mets ta cagoule !";
        } else if (0 < this.A_tab[I_ind] && this.A_tab[I_ind] <= 20) {
            document.getElementById("output").setAttribute("class", "green");
            document.getElementById("message").setAttribute("class", "hidden");
            document.getElementById("message").innerHTML = "";
        } else if (20 < this.A_tab[I_ind] && this.A_tab[I_ind] <= 30) {
            document.getElementById("output").setAttribute("class", "orange");
            document.getElementById("message").setAttribute("class", "hidden");
            document.getElementById("message").innerHTML = "";
        } else if (30 < this.A_tab[I_ind] && this.A_tab[I_ind] <= 40) {
            document.getElementById("output").setAttribute("class", "red");
            document.getElementById("message").setAttribute("class", "shown");
            document.getElementById("message").innerHTML = "Caliente ! Vamos a la playa, ho hoho hoho !";
        }
        document.getElementById("output").innerHTML = this.A_tab[I_ind].toString() + " °C";
        if (I_ind < this.A_tab.length - 1) {
            I_ind++;
        } else {
            I_ind = 0;
        }
    }, 3000);
  }

  showHistory() {
    fetch('history.json')
      .then(response => response.json())
      .then(data => {
        const historyTable = document.getElementById('table').getElementsByTagName('tbody')[0];
        data.capteurs.forEach(capteur => {
          const row = document.createElement('tr');
          const typeCell = document.createElement('td');
          const valeurCell = document.createElement('td');
          const dateCell = document.createElement('td');
          typeCell.textContent = capteur.Nom;
          valeurCell.textContent = capteur.Valeur + " °C";
          dateCell.textContent = new Date(capteur.Timestamp * 1000).toLocaleString('fr-FR');
          row.appendChild(typeCell);
          row.appendChild(valeurCell);
          row.appendChild(dateCell);
          historyTable.appendChild(row);
        });
      });
  }
}

'use strict';

class TabsManual {
  constructor(groupNode) {
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    this.setSelectedTab(this.firstTab);
  }

  setSelectedTab(currentTab) {
    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        this.tabpanels[i].classList.remove('is-hidden');
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        this.tabpanels[i].classList.add('is-hidden');
      }
    }
  }

  moveFocusToTab(currentTab) {
    currentTab.focus();
  }

  moveFocusToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.moveFocusToTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index - 1]);
    }
  }

  moveFocusToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.moveFocusToTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.moveFocusToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.moveFocusToTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.moveFocusToTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  // Since this example uses buttons for the tabs, the click onr also is activated
  // with the space and enter keys
  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}

// Initialize tablist

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].manual');
  for (var i = 0; i < tablists.length; i++) {
    new TabsManual(tablists[i]);
  }
});

new Tabs().showTab();
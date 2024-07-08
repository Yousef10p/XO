function starter() {
    let storedWord = document.getElementById("h1button");
    let temp = document.getElementsByClassName("grid-container");
    let turnh1 = document.getElementById("turn")
    if (storedWord.innerHTML == 'Start Game') {
        temp[0].style.display = 'grid';
        storedWord.innerHTML = 'End Game';
    }
    else if (storedWord.innerHTML == 'End Game') {
        clear();
        temp[0].style.display = 'none';
        storedWord.innerHTML = 'Start Game';
        turnh1.style.display = 'none';
        return;
    }

    ValueToBeSet = Math.floor(Math.random() * 2);//0 = x, 1 = o
    if (ValueToBeSet == 0) {
        turnh1.innerHTML = 'X Plays';
        turnh1.style.color = 'red';
        turnh1.style.display = 'block';
    }
    else {
        turnh1.innerHTML = 'O Plays';
        turnh1.style.color = 'blue';
        turnh1.style.display = 'block';
    }
}

function clear() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            XOarray[i][j] = -1;
        }
    }

    let x = document.getElementsByClassName('blocks');
    for (let i of x) {
        i.style.backgroundImage = 'url("")'
    }

    for (let i = 0; i < 6; i++) {
        Queue[i] = -1;
    }
    front = rare = 0;
    pulled = null;
    counter = 0;
    ValueToBeSet = -100;
}

function Enqeue(position) {
    Queue[rare] = position;
    rare++;
    rare = rare % 6;
}

function Dequeue() {
    let temp = Queue[front];
    front++;
    front = front % 6;
    return temp;
}

function setValue(position) {
    let imageString = null;
    let position1 = parseInt(position[1],10);
    let position2 = parseInt(position[2],10);
    if (ValueToBeSet == 0) {
        imageString = 'url("X.png")';
    }
    else {
        imageString = 'url("O.png")';
    }

    XOarray[position1][position2] = ValueToBeSet;
    document.getElementById(position).style.backgroundImage = imageString;
    Enqeue(position);
    counter++;    

    if (checkWin() && ValueToBeSet == 0) {
        alert('X won');
        starter();
        return;
    }
    else if (checkWin() && ValueToBeSet == 1) {
        alert('O won');
        starter();
        return;
    }

    if (counter >= 6) {
        if (counter != 6) {
            document.getElementById(pulled).style.backgroundImage = "url('')";
        }
        pulled = Dequeue();
        document.getElementById(pulled).style.backgroundImage = "url('9.jpg')"
        let tempi = parseInt(pulled[1], 10);
        let tempj = parseInt(pulled[2], 10);;
        XOarray[tempi][tempj] = -1;
    }

    if (ValueToBeSet == 0) {
        document.getElementById("turn").innerHTML = 'O plays';
        ValueToBeSet = 1;
        document.getElementById("turn").style.color = 'blue';
    }
    else {
        document.getElementById("turn").innerHTML = 'X plays'
        ValueToBeSet = 0;
        document.getElementById("turn").style.color = 'red';
    }
}


function checkWin() {
    let check = true;
    //case check rows...
    for (let i = 0; i < 3; i++) {
        check = true;
        for (let j = 0; j < 3; j++) {
            if (XOarray[i][j] != ValueToBeSet) {
                check = false;
                break;
            }
        }
        if (check) return true;
    }

    //case check columns...
    check = true;
    for (let i = 0; i < 3; i++) {
        check = true;
        for (let j = 0; j < 3; j++) {
            if (XOarray[j][i] != ValueToBeSet) {
                check = false;
                break;
            }
        }
        if (check) return true;
    }

    //case check main dignoal...
    check = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i == j && XOarray[i][j] != ValueToBeSet) {
                check = false;
                break;
            }
            else if (i != j) continue;
        }
        if (check && i == 2) return true;
    }
    //case check other dignoal...
    check = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i + j == 2 && XOarray[i][j] != ValueToBeSet) {
                check = false;
                break;
            }
            else if (i + j != 2) continue;
        }
        if (check && i == 2) return true;
    }


    return false; //he didn't won
}
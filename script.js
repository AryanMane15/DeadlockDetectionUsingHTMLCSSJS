let cars = [];
let spots = [];

const carImages = ["car.png"];

function addCar() {
  const carName = document.getElementById("carName").value;
  if (carName) {
    cars.push(carName);
    document.getElementById("carName").value = "";
    updateCarList();
    updateParkingLot();
  }
}

function addSpot() {
  const spotName = document.getElementById("spotName").value;
  if (spotName) {
    spots.push(spotName);
    document.getElementById("spotName").value = "";
    updateSpotList();
    updateParkingLot();
  }
}

function updateCarList() {
  const carList = document.getElementById("carList");
  carList.innerHTML = cars
    .map(
      (c, index) => `
        <li class="list-group-item">
            ${c} 
            <button type="button" class="btn btn-danger" style="float: right" onclick="removeCar('${c}', ${index})">Remove</button>
        </li>
    `
    )
    .join("");
}

function updateSpotList() {
  const spotListWrapper = document.getElementById("parkingLotWrapper");
  spotListWrapper.classList.add("showparkinglot");
  const spotList = document.getElementById("spotList");
  spotList.innerHTML = spots
    .map((s) => `<li class="list-group-item">${s}</li>`)
    .join("");
}

function updateParkingLot() {
  const parkingLot = document.getElementById("parkingLot");
  parkingLot.innerHTML = "";
  for (let i = 0; i < spots.length; i++) {
    const spotDiv = document.createElement("div");
    spotDiv.className = "spot";
    spotDiv.innerText = "P";
    parkingLot.appendChild(spotDiv);

    if (cars[i]) {
      const carDiv = document.createElement("img");
      carDiv.className = "car entering";
      carDiv.src = carImages[0];
      spotDiv.appendChild(carDiv);

      setTimeout(() => {
        carDiv.classList.add("parked");
      }, 2000);
    }
  }
}

function checkDeadlock() {
  const parkedCars = cars.length;
  const availableSpots = spots.length;

  if (parkedCars > availableSpots) {
    const deadlockstatus = document.getElementById("deadlockStatus");
    deadlockstatus.classList.add("showdeadlockstatus");
    deadlockstatus.classList.remove("alert-success");
    deadlockstatus.classList.add("alert-danger");
    deadlockstatus.innerText = "Deadlock detected: Not enough spots!";
  } else {
    const deadlockstatus = document.getElementById("deadlockStatus");
    deadlockstatus.classList.add("showdeadlockstatus");
    deadlockstatus.classList.remove("alert-danger");
    deadlockstatus.classList.add("alert-success");
    deadlockstatus.innerText = "No deadlock detected.";
  }
}

function removeCar(carName, carIndex) {
  if (carIndex > -1) {
    const carDiv = document.querySelectorAll(".car")[carIndex];
    carDiv.classList.remove("parked", "entering");
    carDiv.classList.add("leaving");

    setTimeout(() => {
      cars.splice(carIndex, 1);
      updateParkingLot();
      checkDeadlock();
    }, 500);
  }
}

function onClickExample() {
  window.open(
    "file:///D:/USER%20PROFILE/Downloads/New%20folder1/osy%20folder/example.html"
  );
}

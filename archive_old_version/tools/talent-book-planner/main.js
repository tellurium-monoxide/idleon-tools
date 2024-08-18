const tryToParse = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};
const parseIfNeeded = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

function lookIntoLocalStorage() {
  const raw_data = localStorage.getItem("IEsaveData");

  if (raw_data) {
    console.log("Found save data in local storage")
    document.querySelector("#raw_data").value = raw_data
    parseSaveData(raw_data)
  }

}



async function onSubmit() {

  input_data = document.querySelector("#raw_data").value

  let raw_data = ""
  if (tryToParse(input_data) && "Meals" in tryToParse(input_data)) {
    console.log("found raw IE data")
    raw_data = input_data
    parseSaveData(raw_data)

  } else if (tryToParse(input_data) && "serverVars" in tryToParse(input_data)) {
    console.log("found IT data")
    save_data = JSON.parse(input_data)["data"]
    parseSaveData(save_data)
  } else {
    console.log("assuming character name")
    let name = input_data.toLowerCase()
    const cdn_location = 'https://cdn.idleonefficiency.com'
    try {
      const res = await fetch(`${cdn_location}/profiles/${input_data}.json`, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      });
      if (res.ok) {
        const save_data = await res.json();
        const raw_data = JSON.stringify(save_data);
        // console.log(save_data);
        parseSaveData(raw_data)
      }
      return undefined;
    }
    catch (e) {
      console.debug(e);
    }
  }
}

function onClear() {
  document.querySelector("#raw_data").value = ""
}


function parseSaveData(raw_data) {

  save_data = JSON.parse(raw_data)

  localStorage.setItem("IEsaveData", raw_data);

  let booking_status = new AccountBookingStatus()
  booking_status.initFromSaveData(save_data)
  // cooking_data.fillDocumentInputForm()

  // computeMealOptimalOrder(cooking_data)

}


function computeFromInputForm() {
  // let cooking_data = new CookingData()
  // cooking_data.initFromInputForm()

  // computeMealOptimalOrder(cooking_data)
}





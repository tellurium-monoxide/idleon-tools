

function run_local_tool(raw_data) {

  save_data = JSON.parse(raw_data)

  localStorage.setItem("IEsaveData", raw_data);

  let booking_status = new AccountBookingStatus()
  booking_status.initFromSaveData(save_data)
  // cooking_data.fillDocumentInputForm()

  // computeMealOptimalOrder(cooking_data)

}







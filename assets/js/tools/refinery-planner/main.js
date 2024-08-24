
function run_local_tool(raw_data) {

    save_data = JSON.parse(raw_data)

    localStorage.setItem("IEsaveData", raw_data);

    let refinery = new Refinery(save_data)
    refinery.processRefineryRanks()

    refinery.showRefinery()
    refinery.showResources()
    refinery.createCalculatorTimeToMakeAmounts()
    refinery.createCalculatorBreakPoint()

    document.refinery = refinery

}


function button_calc_from_save(event) {
    if (document.refinery) {
        document.refinery.refinerySpeed.parseSaveData()
        document.refinery.processRefineryRanks()

    }

}
function button_calc_from_inputs(event) {
    if (document.refinery) {
        document.refinery.refinerySpeed.readFromSpeedInputForm()
        document.refinery.processRefineryRanks()
    }
}
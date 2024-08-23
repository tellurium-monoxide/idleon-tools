
function run_local_tool(raw_data) {

    save_data = JSON.parse(raw_data)

    localStorage.setItem("IEsaveData", raw_data);

    let refinery = new Refinery()
    refinery.initFromSaveData(save_data)

    refinery.showRefinery()
    refinery.showResources()
    refinery.createCalculatorTimeToMakeAmounts()
    refinery.createCalculatorBreakPoint()

    document.refinery = refinery

}
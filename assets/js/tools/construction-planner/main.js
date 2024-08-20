

function run_local_tool(raw_data) {

    save_data = JSON.parse(raw_data)

    localStorage.setItem("IEsaveData", raw_data);

    let construction_state = new ConstructionState()
    construction_state.initFromSaveData(save_data)
    construction_state.showBuildings()

}
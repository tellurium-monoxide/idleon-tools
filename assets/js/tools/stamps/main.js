function run_local_tool(raw_data) {

    save_data = JSON.parse(raw_data)

    localStorage.setItem("IEsaveData", raw_data);


    make_stamp_table("combat")
    make_stamp_table("skill")
    make_stamp_table("misc")


    let stamp_planner = new StampPlanner(save_data)

}


function make_stamp_table(cat) {
    let tbl = ""

    tbl += `<table class="stamp-table">`

    tbl += `<tr>`
    let id = 0
    for (let [stampKey, stampData] of Object.entries(DATA_STAMPS[cat])) {
        // console.log(stampData)
        id++

        tbl += `<td>`
        // tbl += `${stampData.displayName}`
        tbl += `<img src="${GET_STAMP_ICON(stampData.displayName)}" style="height:72px;width:72px;" />`
        tbl += `</td>`

        tbl += `<td id="${stampData.rawName}">`
        tbl += `</td>`

        if (id % 4 == 0) {

            tbl += `</tr>`
            tbl += `<tr>`
        }

    }

    tbl += `</tr>`
    tbl += `</table>`

    let el = document.getElementById(`tab-stamps-${cat}`)
    el.innerHTML = tbl
}
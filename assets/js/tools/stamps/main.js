function run_local_tool(raw_data) {

    save_data = JSON.parse(raw_data)

    localStorage.setItem("IEsaveData", raw_data);


    // make_stamp_table("combat")
    // make_stamp_table("skill")
    // make_stamp_table("misc")
    make_stamp_tables()

    let stamp_planner = new StampPlanner(save_data)

}


function make_stamp_tables() {
    let tbl = ""

    tbl += `<table class="stamp-table">`

    tbl += `<tr>`
    let id = 0
    let stamps_this_row = 8
    let row = 0

    let row_html = ""
    while (stamps_this_row > 0) {
        tbl += row_html
        row_html = ""
        stamps_this_row = 0
        for (let cat of ["combat", "skill", "misc"]) {
            for (let col = 0; col < 4; col++) {
                let id = 4 * row + col
                let stampData = DATA_STAMPS[cat][id]
                if (stampData) {
                    console.log(stampData)
                    stamps_this_row += 1
                    row_html += `<td id="${stampData.rawName}">`
                    // tbl += `${stampData.displayName}`
                    row_html += `<img src="${GET_STAMP_ICON(stampData.displayName)}" style="height:72px;width:72px;" />`
                    row_html += `</td>`
                } else {
                    row_html += `<td class="empty"></td>`
                }
            }
            if (cat != "misc") {
                row_html += `<td class="sep"></td>`
            }
        }
        row += 1
        tbl += `</tr>`
        tbl += `<tr>`
    }

    tbl += `</tr>`
    tbl += `</table>`


    let el = document.getElementById(`stamps`)
    el.innerHTML = tbl
}
function make_stamp_table(cat) {
    let tbl = ""

    tbl += `<table class="stamp-table">`

    tbl += `<tr>`
    let id = 0
    for (let [stampKey, stampData] of Object.entries(DATA_STAMPS[cat])) {
        // console.log(stampData)
        id++

        tbl += `<td id="${stampData.rawName}">`
        // tbl += `${stampData.displayName}`
        tbl += `<img src="${GET_STAMP_ICON(stampData.displayName)}" style="height:72px;width:72px;" />`
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
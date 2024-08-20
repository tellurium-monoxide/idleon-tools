function lookIntoLocalStorage() {
    const raw_data = localStorage.getItem("IEsaveData");

    if (document.querySelector("#raw_data")) {
        if (raw_data) {
            console.log("Found save data in local storage")

            document.querySelector("#raw_data").value = raw_data
            run_local_tool(raw_data)
        }
    }

}


async function onSubmit() {

    input_data = document.querySelector("#raw_data").value

    let raw_data = ""
    if (tryToParse(input_data) && "Meals" in tryToParse(input_data)) {
        console.log("found raw IE data")
        raw_data = input_data
        run_local_tool(raw_data)

    } else if (tryToParse(input_data) && "serverVars" in tryToParse(input_data)) {
        console.log("found IT data")
        save_data = JSON.parse(input_data)["data"]
        run_local_tool(save_data)
    } else {
        console.log("assuming character name")
        let name = input_data.toLowerCase()
        const cdn_location = 'https://cdn.idleonefficiency.com'
        const full_link = `${cdn_location}/profiles/${input_data}.json`
        console.log("full_link")
        console.log(full_link)
        try {
            const res = await fetch(full_link, {
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            });
            if (res.ok) {
                const save_data = await res.json();
                const raw_data = JSON.stringify(save_data);
                // console.log(save_data);
                run_local_tool(raw_data)
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
function onInputFromClip() {
    navigator.clipboard
        .readText()
        .then((clipText) => {
            document.querySelector("#raw_data").value = clipText;
            run_local_tool(clipText);
        });
}
async function onCopySave() {
    input_data = document.querySelector("#raw_data").value
    await navigator.clipboard.writeText(input_data);
}

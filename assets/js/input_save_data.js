


async function lookIntoLocalStorage() {
    const raw_data = localStorage.getItem("IEsaveData");

    if (raw_data) {
        console.log("Found save data in local storage")
        if (document.querySelector("#raw_data")) {

            document.querySelector("#raw_data").value = raw_data

            await onSubmit();

        }
    }

}


async function onSubmit() {

    let input_data = document.querySelector("#raw_data").value

    let raw_data = ""
    if (tryToParse(input_data) && "Meals" in tryToParse(input_data)) {
        console.log("found raw IE data")

        localStorage.setItem("IEsaveData", input_data);

        raw_data = input_data
        let save_data = parse_save_data_two_levels(raw_data)
        console.log("save_data")
        console.log(save_data)

        const event = new CustomEvent("run_tool", { detail: save_data });
        document.dispatchEvent(event);
        // run_local_tool(save_data)

    } else if (tryToParse(input_data) && "serverVars" in tryToParse(input_data)) {
        console.log("found IT data")
        save_data = JSON.parse(input_data)["data"]
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
                const save_data_ = await res.json();
                const raw_data = JSON.stringify(save_data_);
                // console.log(save_data);
                let save_data = parse_save_data_two_levels(raw_data)
                run_local_tool(save_data)
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
async function onInputFromClip() {

    clipText = await navigator.clipboard.readText()
    document.querySelector("#raw_data").value = clipText;
    await onSubmit();
}
async function onCopySave() {
    input_data = document.querySelector("#raw_data").value
    await navigator.clipboard.writeText(input_data);
}


// because the save data contains items that are not recognized as js objects with a single parse
const parse_save_data_two_levels = str => {
    try {
        let parsed = JSON.parse(str);
        for ([key, value] of Object.entries(parsed)) {
            let parsed2 = tryToParse(value)
            if (parsed2) {
                parsed[key] = parsed2
            }
        }
        return parsed;
    } catch (e) {
        return null;
    }
};


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

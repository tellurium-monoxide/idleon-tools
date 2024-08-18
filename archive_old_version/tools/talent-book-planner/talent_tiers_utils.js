
function isTiered(talent_name, class_name) {
    for (let TIER of TALENT_TIERS) {
        for (let talent_in_tier of Object.entries(TIER.list)) {
            if (talent_name == talent_in_tier[0] || TALENT_UNBOOKABLE.includes(talent_name)) {
                let subclasses = getClassList(class_name)
                let restrict = talent_in_tier[1].class_restrict
                if (!restrict || subclasses.includes(restrict)) {
                    return true;
                }
            }
        }
    }
    return false;

}


function displayTiers() {
    let max_tier = TALENT_TIERS.length

    let tabs = $("#tabs-all-tiers").tabs();
    tabs.find("div").remove();
    tabs.find("li").remove();
    for (let tier = 0; tier < max_tier; tier++) {


        // add tier tab
        let tier_name = `Tier ${tier + 1}` + (TALENT_TIERS[tier].name ? " : " : "") + (TALENT_TIERS[tier].name || "")
        let li = `<li><a href='#tab_tier_display${tier}'>${tier_name}</a> </li>`

        let content = ""
        content += `<p style="text-align:center;">`
        if (tier < max_tier) {
            content += `${TALENT_TIERS[tier].purpose}`

        } else {
            content += `Bad or not yet added to a tier or not needed because maxed on another char`
        }
        content += `</p>`
        content += `<table class="tiered_talents">`
        content += `<tr>`
        content += `<th>Talent</th>`
        content += `<th>Purpose</th>`
        content += `<th>Is global?</th>`
        content += `<th>Class</th>`
        content += `</tr>`

        for (let tiered_talent of Object.entries(TALENT_TIERS[tier].list)) {

            let global = tiered_talent[1].global ? "yes" : "no"
            let class_restrict = tiered_talent[1].class_restrict || ""
            content += `<tr>`
            content += `<td>${FormatWords(tiered_talent[0])}</td>`
            content += `<td>${tiered_talent[1].purpose}</td>`
            content += `<td>${global}</td>`
            content += `<td>${FormatWords(class_restrict)}</td>`
            content += `</tr>`
        }

        content += `</table>`



        tabs.find("#tabs-all-tiers-nav").append(li);
        tabs.append(`<div id="tab_tier_display${tier}">` + content + "</div>");
        tabs.tabs("refresh");
        tabs.tabs("option", "heightStyle", "auto");
        tabs.tabs("option", "active", 0);


    }


}
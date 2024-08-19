
function onReady() {
    createMealTable();
    createKitchenTable();
    $("#to_ladle_tab").on("click", function (e) {
        $("#tab_header_world4").click();
        $("#tab_header_world4_cooking").click();
        $("#tab_header_cooking_ladles").click();
    });

}
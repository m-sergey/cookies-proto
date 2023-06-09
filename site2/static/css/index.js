function openSite1() {

    if($("#isExchange").is(":checked")) {
        var jqxhr = $.get( $("#url").val() + "/exchange", function(data) {
            window.open($("#url").val() + "/restricted",'_blank').focus();
          })
            .fail(function( jqXHR, textStatus, errorThrown ) {
                console.log("jqXHR", jqXHR);
                console.log("textStatus", textStatus);
                console.log("errorThrown", errorThrown);
                alert( "error: " + textStatus );
            });
    } else {
        window.open($("#url").val() + "/restricted",'_blank').focus();
    }
}

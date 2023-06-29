function openSite1() {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", $("#url").val() + "/exchange", true);
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // Request finished. Do processing here.
            console.log("Success");
            window.open($("#url").val() + "/restricted",'_blank').focus();
        }
    };

    xhr.send();

    // if($("#isExchange").is(":checked")) {
    //     var jqxhr = $.get( $("#url").val() + "/exchange", function(data) {
    //         window.open($("#url").val() + "/restricted",'_blank').focus();
    //       })
    //         .fail(function( jqXHR, textStatus, errorThrown ) {
    //             console.log("jqXHR", jqXHR);
    //             console.log("textStatus", textStatus);
    //             console.log("errorThrown", errorThrown);
    //             alert( "error: " + textStatus );
    //         });
    // } else {
    //     window.open($("#url").val() + "/restricted",'_blank').focus();
    // }
}

var wpc_unit = "m";

function wpCalc(){
    // Initialise the wallpaper calculator
    $("#unit").bind("change",function(){
       wpSetUnit();
    });
    $("#reset").bind("click",function(){
       wpReset();
    });
    $("#estimate").bind("click",function(){
       wpEstimate();
    });
}

function wpSetUnit(){
    if($("#unit").val() == "m"){
        wpc_unit = "m";
        $(".u_m").html("m");
        $(".u_c").html("cm");
        $("#qu_m").html("10m (33ft)");
    } else {
        wpc_unit = "i";
        $(".u_m").html("ft");
        $(".u_c").html("in");
        $("#qu_m").html("33ft (10m)");
    }
}

function wpReset(){
    $("#height_m").attr("value","");
    $("#height_c").attr("value","");
    $("#length1_m").attr("value","");
    $("#length1_c").attr("value","");
    $("#length2_m").attr("value","");
    $("#length2_c").attr("value","");
    $("#length3_m").attr("value","");
    $("#length3_c").attr("value","");
    $("#length4_m").attr("value","");
    $("#length4_c").attr("value","");
    $("#repeat").attr("value","");
    $("#width").attr("value","");
    $("#res").attr("value","");
}

function wpEstimate(){
    // Validate input
    wpTidy();
    var validates = wpValidate();
    if(!validates){
        alert("Please enter a wall height, at least one wall length, the roll repeat and roll width - ensuring only whole numbers are used.");
    } else {
        var conv = 3.2808399;
        var height = 0;
        var repeat = 0;
        var width = 0;
        var length1 = 0;
        var length2 = 0;
        var length3 = 0;
        var length4 = 0;
        var c_multiplier = 100;

        if($("#unit").val() == "i"){
            c_multiplier = 12;
        }

        // Height
        if($("#height_m").val() != ""){ height += Number($("#height_m").val());}
        if($("#height_c").val() != ""){ height += Number(($("#height_c").val()/c_multiplier));}

        // Repeat
        if($("#repeat").val() != ""){ repeat += Number($("#repeat").val()/c_multiplier);}

        // Width
        if($("#width").val() != ""){ width += Number($("#width").val()/c_multiplier);}

        // Length
        if($("#length1_m").val() != ""){ length1 += Number($("#length1_m").val());}
        if($("#length1_c").val() != ""){ length1 += Number(($("#length1_c").val()/c_multiplier));}
        if($("#length2_m").val() != ""){ length2 += Number($("#length2_m").val());}
        if($("#length2_c").val() != ""){ length2 += Number(($("#length2_c").val()/c_multiplier));}
        if($("#length3_m").val() != ""){ length3 += Number($("#length3_m").val());}
        if($("#length3_c").val() != ""){ length3 += Number(($("#length3_c").val()/c_multiplier));}
        if($("#length4_m").val() != ""){ length4 += Number($("#length4_m").val());}
        if($("#length4_c").val() != ""){ length4 += Number(($("#length4_c").val()/c_multiplier));}

        length1 = Math.abs(length1);
        length2 = Math.abs(length2);
        length3 = Math.abs(length3);
        length4 = Math.abs(length4);

        var columns = 0;
        var column_height = 0;
        var totallength = 0;
        var rolls = 0;

        // Now convert imperial to metric if necessary
        if($("#unit").val() == "i"){
            height = height/conv;
            repeat = repeat/conv;
            width = width/conv;
            length1 = length1/conv;
            length2 = length2/conv;
            length3 = length3/conv;
            length4 = length4/conv;
        }
        
        // Now calculate number of columns for lengths 1 to 4
        if(length1 > 0) {
        	columns = columns + Math.ceil(length1/width);
        }
        if(length2 > 0) {
        	columns = columns + Math.ceil(length2/width);
        }
        if(length3 > 0) {
        	columns = columns + Math.ceil(length3/width);
        }
        if(length4 > 0) {
        	columns = columns + Math.ceil(length4/width);
        }
            
        // Now get actual column height
        if(repeat > 0) {
        	column_height = Math.ceil(height/repeat)*repeat;
        } else {
        	column_height = height;
        }
            
        // Now get total length of wallpaper required
        totalLength = (column_height * columns);

        rolls = Math.ceil(totalLength/10);

        $("#res").attr("value",rolls);
    }
    return false;
}

function wpIsInt(val){
    return !isNaN(val)&&parseInt(val)==val;
}

function wpTidy(){
    $("#height_m").attr("value",trim($("#height_m").val()));
    $("#height_c").attr("value",trim($("#height_c").val()));
    $("#length1_m").attr("value",trim($("#length1_m").val()));
    $("#length1_c").attr("value",trim($("#length1_c").val()));
    $("#length2_m").attr("value",trim($("#length2_m").val()));
    $("#length2_c").attr("value",trim($("#length2_c").val()));
    $("#length3_m").attr("value",trim($("#length3_m").val()));
    $("#length3_c").attr("value",trim($("#length3_c").val()));
    $("#length4_m").attr("value",trim($("#length4_m").val()));
    $("#length4_c").attr("value",trim($("#length4_c").val()));
    $("#repeat").attr("value",trim($("#repeat").val()));
    $("#width").attr("value",trim($("#width").val()));
}

function wpValidate(){
    // Validate input
    var validates = true;
    if($("#height_m").val() != "" && !wpIsInt($("#height_m").val())){
        validates = false;
    }
    if($("#height_c").val() != "" && !wpIsInt($("#height_c").val())){
        validates = false;
    }
    if($("#length1_m").val() != "" && !wpIsInt($("#length1_m").val())){
        validates = false;
    }
    if($("#length1_c").val() != "" && !wpIsInt($("#length1_c").val())){
        validates = false;
    }
    if($("#length2_m").val() != "" && !wpIsInt($("#length2_m").val())){
        validates = false;
    }
    if($("#length2_c").val() != "" && !wpIsInt($("#length2_c").val())){
        validates = false;
    }
    if($("#length3_m").val() != "" && !wpIsInt($("#length3_m").val())){
        validates = false;
    }
    if($("#length3_c").val() != "" && !wpIsInt($("#length3_c").val())){
        validates = false;
    }
    if($("#length4_m").val() != "" && !wpIsInt($("#length4_m").val())){
        validates = false;
    }
    if($("#length4_c").val() != "" && !wpIsInt($("#length4_c").val())){
        validates = false;
    }
    if($("#repeat").val() != "" && !wpIsInt($("#repeat").val())){
        validates = false;
    }
    if($("#width").val() != "" && !wpIsInt($("#width").val())){
        validates = false;
    }

    if(validates){
        // Now make sure we have at least a height and 1 length, plus the repeat and width
        if($("#height_m").val() == "" && $("#height_c").val() == ""){
            validates = false;
        }
        if($("#repeat").val() == ""){
            validates = false;
        }
        if($("#width").val() == ""){
            validates = false;
        }
        if(($("#length1_m").val() == "" && $("#length1_c").val() == "") &&
            ($("#length2_m").val() == "" && $("#length2_c").val() == "") &&
            ($("#length3_m").val() == "" && $("#length3_c").val() == "") &&
            ($("#length4_m").val() == "" && $("#length4_c").val() == "")){
            validates = false;
        }
    }
    return validates;
}




/**
 * Extra Trim Functions
 */
function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
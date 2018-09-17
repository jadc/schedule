// who needs well documented comments anyway?

var block = 0;
var f = "h:mm:ss A";

var now = moment().format(f);
var day = moment().day();

function highlight(s){
    if(s === 0){return;}

    $("tbody tr td").css({
        "background-color":"rgb(20,20,20)",
        "color":"white",
        "font-weight":"100" 
    });

    if(day == 6 || day == 7){
        block = 0;
        return;
    }else {
        if(day == 4){
            $("#block4 td:nth-child(2)").css({
                "background-color":"rgb(200,200,200)",
                "color":"black",
                "font-weight":"900"
            });
        }else{
            $("#block" + s + " td:nth-child(" + (day + 1) + ")").css({
                "background-color":"rgb(200,200,200)",
                "color":"black",
                "font-weight":"900"
            });
        }
    }

    

    $("#blank").css("background-color","rgb(15,15,15)");
} 

function updateTime(){ 
    // set time
    now = moment().format(f);
    day = moment().day();
    console.log("It is " + day + " my dudes.");

    $(".time").text(now); 

    if(block == 0){
        $(".subject").text("There is no school right now."); 
        return;
    }
    if(block == 4){
        $(".subject").text("It is currently lunch block."); 
        return;
    }
    if(block !== 0 && block != 4){
        if(block > 4){
            $(".subject").text("It is currently block " + (block - 1) + ".");
        }else{
            $(".subject").text("It is currently block " + block + ".");
        }
        return;
    }
}

function blockSwitch(block, from, to){
    if(now.isBetween( moment(from, f), moment(to, f) )){
        console.log("Block " + block);
        highlight(block);
    }
}

var refreshedAt = moment().format(f);

function update(){
    
    //block 1
    if(moment().isBetween(  moment("8:30:00 AM", f),  moment("9:24:59 AM", f)  )){
        block = 1;
    }
    //block 2
    else if(moment().isBetween(  moment("9:25:00 AM", f),  moment("10:24:59 AM", f)  )){
        block = 2;
    }
    //block 3
    else if(moment().isBetween(  moment("10:25:00 AM", f),  moment("11:24:59 AM", f)  )){
        block = 3;
    }
    //block 4 (lunch)
    else if(moment().isBetween(  moment("11:25:00 AM", f),  moment("12:09:59 PM", f)  )){
        block = 4;
    }
    //block 5
    else if(moment().isBetween(  moment("12:10:00 PM", f),  moment("1:09:59 PM", f)  )){
        block = 5;
    }
    //block 6
    else if(moment().isBetween(  moment("1:10:00 PM", f),  moment("2:04:59 PM", f)  )){
        block = 6;
    }
    //block 7
    else if(moment().isBetween(  moment("2:05:00 PM", f),  moment("3:00:00 PM", f)  )){
        block = 7;
    }
    //no block
    else {
        block = 0;
    }

    highlight(block);
    updateTime();
    
    // DEBUG //
    $(".version").html(`
    Build: 2.0.1
    <br/>
    Last commit: December 8th, 2017
    <br/>
    Refreshed at `+refreshedAt+`
    <br/>
    Block `+block+`/7
    <br/>
    Day `+day+`/7
    `);
}

$(document).ready(function(){ 
  setInterval(update, 1000); 
  updateTime();

  /**** DEBUG ****/
  
  $("*").dblclick(function(){ $(".version").show(); });
  $(".version").click(function(){ $(this).hide() });

  /***************/
});

/**/


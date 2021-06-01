function reset() {
    var y = $("#sel")
    y.onchange(function () {
        switch (y.val()) {
            case "aadhar":
                $('#dataform').attr("action", '/Aadhar');
                $('#name').css("display",'block');
                $('#fname').css("display","none");
                $('#mname').css("display","none");      
                $('#dob').css("display","block");
                $('#bg').css("display","none");
                $('#address').css("display","block");
                $('#expiry').css("display","none");
                break;
            case 'license':
                $('#dataform').attr("action", '/License');
                $('#name').css("display",'block');
                $('#fname').css("display","none");
                $('#mname').css("display","none");
                $('#dob').css("display","block");
                $('#bg').css("display","none");
                $('#address').css("display","block");
                $('#expiry').css("display","block");
                break;
            case 'birth':
                $('#dataform').attr("action", '/Birth');
                $('#name').css("display",'block');
                $('#fname').css("display","block");
                $('#mname').css("display","block");
                $('#dob').css("display","block");
                $('#bg').css("display","block");
                $('#address').css("display","block");
                $('#expiry').css("display","block");
                break;
            default:
                    $('#name').css("display",'none');
                    $('#fname').css("display","none");
                    $('#mname').css("display","none");        
                    $('#dob').css("display","none");
                    $('#bg').css("display","none");
                    $('#address').css("display","none");
                    $('#expiry').css("display","none");
                break;
        }
    })
}
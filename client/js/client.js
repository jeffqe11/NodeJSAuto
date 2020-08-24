//validate form with jquery.validation library
var form = $("#formAutoFi");
jQuery.validator.setDefaults({
  debug: true,
  success: "valid",
});
form.validate({
  rules: {
    csvFile: {
      required: true,
      extension: "csv",
    },
  },
});

//when input file change show correct file info
$(".custom-file-input").on("change", function () {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  if (this.files.length > 0) {
    $("#uploadButton").prop("disabled", false);
  }
});

//when form submit, send data to /api/autos with csv and provider name
$("#formAutoFi").submit(function (e) {
  //only send data if form is correct

  var formCSV = this;

  if (form.valid()) {
    //send request with csv and provider name
    $.ajax({
      url: "/api/autos",
      type: "POST",
      data: new FormData(this),
      processData: false,
      contentType: false,
      success: function () {
        //when the server return success
        $.notify("Sucess!! go to /api/autos to see results.", "success");
        //reset and clean form  to start again
        $(".custom-file-input")
          .siblings(".custom-file-label")
          .addClass("selected")
          .html("");
        formCSV.reset();
      },
      error: function () {
        //in case of error
        $.notify("Error, please try again, verify your file data.");
      },
    });
  }

  return false;
});

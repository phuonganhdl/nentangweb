$(document).ready(function() {
  $.validator.addMethod("validatePhone", function(value, element) {
    return this.optional(element) || /^0\d{9}$/.test(value);
  }, "Phone number must start with 0 and have exactly 10 digits");

  $("#addEmployeeForm").validate({
    onfocusout: false,
    onkeyup: false,
    onclick: false,
    rules: {
      name: {
        required: true,
        maxlength: 50
      },
      email: {
        required: true,
        email: true,
        maxlength: 50
      },
      address: {
        required: true,
        maxlength: 100
      },
      phone: {
        required: true,
        validatePhone: true,
        minlength: 10,
        maxlength: 10
      }
    },
    messages: {
      name: {
        required: "Name is required",
        maxlength: "Please enter a maximum of 50 characters"
      },
      email: {
        required: "Email is required",
        email: "Please enter a valid email address",
        maxlength: "Please enter a maximum of 50 characters"
      },
      address: {
        required: "Address is required",
        maxlength: "Please enter a maximum of 100 characters"
      },
      phone: {
        required: "Phone number is required",
        validatePhone: "Phone number must start with 0 and have exactly 10 digits",
        minlength: "Phone number must be exactly 10 digits",
        maxlength: "Phone number must be exactly 10 digits"
      }
    },
    errorElement: "div",
    errorClass: "invalid-feedback",
    highlight: function(element) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function(element) {
      $(element).removeClass("is-invalid");
    },
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },
    submitHandler: function(form) {
      alert("Data is valid! Employee added successfully.");
      form.reset();
      $("#addEmployeeModal").modal("hide");
    }
  });
});
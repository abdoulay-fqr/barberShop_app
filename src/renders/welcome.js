document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const field1 = document.getElementById("field1").value;
  const field2 = document.getElementById("field2").value;
  console.log("Form submitted:", { field1, field2 });
  alert("Form submitted successfully!");
});

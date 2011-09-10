myname = "global";
function func() {
  alert(myname);
  var myname = "local";
  alert(myname);
}

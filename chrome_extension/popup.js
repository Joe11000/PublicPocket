var element_1 = "<button type='button'>Save Page</button>"
var element_2 = "<img src='images/ajax-loader.gif'>"

var sendLocationViaAjax = function()
{
  if($('.container > button').size() > 0)
    $('button').replaceWith(element_2);
  else
    return;

  var here = document.URL
  var url = "http://cors-test-101.herokuapp.com/users/new" // var url = "http://localhost:3000/users";
  xhr = $.ajax({
    type: "get",
    url: url,
    data: {'location': here},
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  })
    .done(function()
    {
      console.log(arguments[0])
      $('.container > img').replaceWith(element_1)
            });
}

$(function()
{
  $('#submit').click(function(e)
  {
    sendLocationViaAjax();
  });
});